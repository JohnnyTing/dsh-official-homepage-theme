import { OFFICIAL_FLUID_PROFILE } from './fluid-profile.js'
import {
  FLOW_FRAGMENT_SHADER,
  FLUID_FRAGMENT_SHADER,
  FLUID_VERTEX_SHADER,
} from './fluid-shaders.js'

const TARGET_FRAME_INTERVAL = 1000 / 30
const MIN_INTERACTION_WEIGHT = 0.0005

function clampFluid(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16) / 255)
}

/**
 * Advances the pointer state using the same two-stage smoothing as the Harness
 * homepage. The controlled mutation avoids per-frame allocations.
 */
export function advancePointerMotion(motion, target, profile = OFFICIAL_FLUID_PROFILE) {
  motion.x += (target.x - motion.x) * profile.mouseSmoothing
  motion.y += (target.y - motion.y) * profile.mouseSmoothing
  motion.vx += ((target.x - motion.x) * 0.5 - motion.vx) * profile.mouseVelocity
  motion.vy += ((target.y - motion.y) * 0.5 - motion.vy) * profile.mouseVelocity
  const interactionTarget = target.inside ? 1 : 0
  motion.interaction += (interactionTarget - motion.interaction) * profile.interactionSmoothing
  if (!target.inside && motion.interaction < MIN_INTERACTION_WEIGHT) motion.interaction = 0
  return motion
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Unknown shader compile error'
    gl.deleteShader(shader)
    throw new Error(message)
  }
  return shader
}

function createProgram(gl, fragmentSource) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, FLUID_VERTEX_SHADER)
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || 'Unknown program link error'
    gl.deleteProgram(program)
    throw new Error(message)
  }
  return program
}

function getUniforms(gl, program, names) {
  return Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)]))
}

function createFlowTarget(gl, width, height) {
  const texture = gl.createTexture()
  const framebuffer = gl.createFramebuffer()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    gl.deleteFramebuffer(framebuffer)
    gl.deleteTexture(texture)
    throw new Error('Unable to allocate the Harness fluid flow map')
  }
  gl.clearColor(0, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return { texture, framebuffer }
}

function createWebGLRenderer(
  canvas,
  profile = OFFICIAL_FLUID_PROFILE,
) {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: 'low-power',
  })
  if (gl === null) return null

  const flowProgram = createProgram(gl, FLOW_FRAGMENT_SHADER)
  const fluidProgram = createProgram(gl, FLUID_FRAGMENT_SHADER)
  const flowUniforms = getUniforms(gl, flowProgram, ['u_previous', 'u_decay'])
  flowUniforms.u_emitters = gl.getUniformLocation(flowProgram, 'u_emitters[0]')
  flowUniforms.u_velocities = gl.getUniformLocation(flowProgram, 'u_velocities[0]')
  flowUniforms.u_radii = gl.getUniformLocation(flowProgram, 'u_radii[0]')
  flowUniforms.u_strengths = gl.getUniformLocation(flowProgram, 'u_strengths[0]')
  const fluidUniforms = getUniforms(gl, fluidProgram, [
    'u_flow', 'u_time', 'u_resolution', 'u_scale', 'u_offset', 'u_grain',
    'u_distortBoost', 'u_swirlBoost', 'u_glowIntensity', 'u_glowColor1',
    'u_glowColor2', 'u_glowColor3', 'u_color1', 'u_color2', 'u_color3',
    'u_color4', 'u_color5', 'u_lightPos', 'u_lightCore', 'u_lightHalo',
    'u_vignette', 'u_bloomThreshold', 'u_bloomRange', 'u_bloomStrength',
    'u_intensity',
  ])
  const fluidColors = profile.colors.map(hexToRgb)
  const glowColors = profile.glowColors.map(hexToRgb)
  let width = 0
  let height = 0
  let pixelRatio = 1
  let flowWidth = 0
  let flowHeight = 0
  let targets = []
  let readIndex = 0
  const emitterPositions = new Float32Array(6)
  const emitterVelocities = new Float32Array(6)
  const emitterRadii = new Float32Array(3)
  const emitterStrengths = new Float32Array(3)

  const deleteTargets = () => {
    for (const target of targets) {
      gl.deleteFramebuffer(target.framebuffer)
      gl.deleteTexture(target.texture)
    }
    targets = []
  }

  const resize = () => {
    const nextWidth = Math.max(1, window.innerWidth)
    const nextHeight = Math.max(1, window.innerHeight)
    const nextRatio = Math.min(window.devicePixelRatio || 1, profile.maxPixelRatio)
    const nextCanvasWidth = Math.round(nextWidth * nextRatio)
    const nextCanvasHeight = Math.round(nextHeight * nextRatio)
    const nextFlowWidth = Math.max(1, Math.round(nextCanvasWidth * profile.flowScale))
    const nextFlowHeight = Math.max(1, Math.round(nextCanvasHeight * profile.flowScale))
    if (
      nextWidth === width
      && nextHeight === height
      && nextRatio === pixelRatio
      && nextFlowWidth === flowWidth
      && nextFlowHeight === flowHeight
    ) return

    width = nextWidth
    height = nextHeight
    pixelRatio = nextRatio
    flowWidth = nextFlowWidth
    flowHeight = nextFlowHeight
    canvas.width = nextCanvasWidth
    canvas.height = nextCanvasHeight
    deleteTargets()
    targets = [
      createFlowTarget(gl, flowWidth, flowHeight),
      createFlowTarget(gl, flowWidth, flowHeight),
    ]
    readIndex = 0
    canvas.dataset.renderer = 'webgl2'
    canvas.dataset.flowSize = `${flowWidth}x${flowHeight}`
    canvas.dataset.pixelRatio = String(pixelRatio)
  }

  const render = (time, motion, sources, intensity) => {
    resize()
    const writeIndex = 1 - readIndex
    const interaction = motion.interaction * intensity

    emitterPositions[0] = motion.x
    emitterPositions[1] = motion.y
    emitterVelocities[0] = motion.vx
    emitterVelocities[1] = motion.vy
    emitterRadii[0] = sources[0].fluidRadius
    emitterStrengths[0] = sources[0].fluidStrength * interaction
    for (let index = 1; index < 3; index += 1) {
      const source = sources[index]
      const offset = index * 2
      emitterPositions[offset] = source.x
      emitterPositions[offset + 1] = 1 - source.y
      emitterVelocities[offset] = source.vx
      emitterVelocities[offset + 1] = -source.vy
      emitterRadii[index] = source.fluidRadius
      emitterStrengths[index] = source.active
        ? source.fluidStrength * intensity
        : 0
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, targets[writeIndex].framebuffer)
    gl.viewport(0, 0, flowWidth, flowHeight)
    gl.useProgram(flowProgram)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, targets[readIndex].texture)
    gl.uniform1i(flowUniforms.u_previous, 0)
    gl.uniform2fv(flowUniforms.u_emitters, emitterPositions)
    gl.uniform2fv(flowUniforms.u_velocities, emitterVelocities)
    gl.uniform1fv(flowUniforms.u_radii, emitterRadii)
    gl.uniform1fv(flowUniforms.u_strengths, emitterStrengths)
    gl.uniform1f(flowUniforms.u_decay, profile.decay)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    readIndex = writeIndex

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.useProgram(fluidProgram)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, targets[readIndex].texture)
    gl.uniform1i(fluidUniforms.u_flow, 0)
    gl.uniform1f(fluidUniforms.u_time, time * 0.001 * profile.speed)
    gl.uniform2f(fluidUniforms.u_resolution, canvas.width, canvas.height)
    gl.uniform1f(fluidUniforms.u_scale, profile.scale)
    gl.uniform2f(fluidUniforms.u_offset, profile.offsetX, profile.offsetY)
    gl.uniform1f(fluidUniforms.u_grain, profile.grain)
    gl.uniform1f(fluidUniforms.u_distortBoost, profile.distortBoost)
    gl.uniform1f(fluidUniforms.u_swirlBoost, profile.swirlBoost)
    gl.uniform1f(fluidUniforms.u_glowIntensity, profile.glowIntensity)
    gl.uniform3fv(fluidUniforms.u_glowColor1, glowColors[0])
    gl.uniform3fv(fluidUniforms.u_glowColor2, glowColors[1])
    gl.uniform3fv(fluidUniforms.u_glowColor3, glowColors[2])
    gl.uniform3fv(fluidUniforms.u_color1, fluidColors[0])
    gl.uniform3fv(fluidUniforms.u_color2, fluidColors[1])
    gl.uniform3fv(fluidUniforms.u_color3, fluidColors[2])
    gl.uniform3fv(fluidUniforms.u_color4, fluidColors[3])
    gl.uniform3fv(fluidUniforms.u_color5, fluidColors[4])
    const lightX = profile.lightX
      + (motion.x - profile.lightX) * profile.lightFollow * motion.interaction
    gl.uniform2f(fluidUniforms.u_lightPos, lightX, profile.lightY)
    gl.uniform1f(fluidUniforms.u_lightCore, profile.lightCore)
    gl.uniform1f(fluidUniforms.u_lightHalo, profile.lightHalo)
    gl.uniform1f(fluidUniforms.u_vignette, profile.vignette)
    gl.uniform1f(fluidUniforms.u_bloomThreshold, profile.bloomThreshold)
    gl.uniform1f(fluidUniforms.u_bloomRange, profile.bloomRange)
    gl.uniform1f(fluidUniforms.u_bloomStrength, profile.bloomStrength)
    gl.uniform1f(fluidUniforms.u_intensity, intensity)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const clear = () => {
    for (const target of targets) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer)
      gl.clearColor(0, 0.5, 0.5, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  return {
    render,
    clear,
    destroy: () => {
      deleteTargets()
      gl.deleteProgram(flowProgram)
      gl.deleteProgram(fluidProgram)
    },
  }
}

function makePointerFieldCanvas() {
  const canvas = document.createElement('canvas')
  canvas.className = 'dsh-harness-official-field'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.appendChild(canvas)
  return canvas
}

export function createOfficialPointerField(reducedMotion, interactionSources) {
  const canvas = makePointerFieldCanvas()
  let renderer = null
  try {
    renderer = createWebGLRenderer(canvas)
  } catch {
    renderer = null
  }
  if (renderer === null) {
    canvas.remove()
    return {
      setEnabled() {},
      setIntensity() {},
      getDiagnostics: () => ({
        activeEmitterCount: interactionSources?.getActiveCount?.() ?? 0,
        renderer: 'none',
        enabled: false,
      }),
      destroy() {},
    }
  }

  const target = { x: 0.5, y: 0.5, inside: false }
  const motion = { x: target.x, y: target.y, vx: 0, vy: 0, interaction: 0 }
  let intensity = 0.86
  let enabled = false
  let frame = 0
  let lastFrameTime = 0
  let renderedFrames = 0
  let startedAt = performance.now()

  const syncPointerTarget = () => {
    const pointer = interactionSources.getSources()[0]
    target.x = pointer.x
    target.y = 1 - pointer.y
    target.inside = pointer.active
  }

  const schedule = () => {
    if (enabled && frame === 0) frame = window.requestAnimationFrame(render)
  }

  function render(time) {
    frame = 0
    if (!enabled) return
    if (time - lastFrameTime < TARGET_FRAME_INTERVAL) {
      schedule()
      return
    }
    lastFrameTime = time - ((time - lastFrameTime) % TARGET_FRAME_INTERVAL)
    syncPointerTarget()
    advancePointerMotion(motion, target)
    renderer.render(time, motion, interactionSources.getSources(), intensity)
    renderedFrames += 1
    if (!reducedMotion) schedule()
  }

  return {
    setEnabled: (value) => {
      const wasEnabled = enabled
      enabled = value
      canvas.toggleAttribute('data-disabled', !enabled)
      if (enabled) {
        if (!wasEnabled) {
          renderedFrames = 0
          startedAt = performance.now()
        }
        schedule()
      }
      else {
        window.cancelAnimationFrame(frame)
        frame = 0
        target.inside = false
        renderer.clear()
      }
    },
    setIntensity: (value) => {
      intensity = clampFluid(Number(value) || 0.86, 0.18, 1)
      schedule()
    },
    getDiagnostics: () => ({
      elapsed: performance.now() - startedAt,
      activeEmitterCount: interactionSources.getActiveCount(),
      enabled,
      flowSize: canvas.dataset.flowSize || '',
      intensity,
      interaction: motion.interaction,
      pointerInside: target.inside,
      renderedFrames,
      renderer: canvas.dataset.renderer || 'none',
      velocity: { x: motion.vx, y: motion.vy },
    }),
    destroy: () => {
      window.cancelAnimationFrame(frame)
      renderer.destroy()
      canvas.remove()
    },
  }
}
