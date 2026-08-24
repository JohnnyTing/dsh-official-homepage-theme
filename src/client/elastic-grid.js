import { OFFICIAL_ELASTIC_GRID_PROFILE } from './elastic-grid-profile.js'

function clampGrid(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function createElasticGridNodes(width, height, profile = OFFICIAL_ELASTIC_GRID_PROFILE) {
  const columns = Math.max(2, Math.floor(width / profile.spacing) + 1)
  const rows = Math.max(2, Math.floor(height / profile.spacing) + 1)
  const offsetX = (width - (columns - 1) * profile.spacing) / 2
  const offsetY = (height - (rows - 1) * profile.spacing) / 2
  const nodes = new Array(columns * rows)

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = offsetX + column * profile.spacing
      const y = offsetY + row * profile.spacing
      nodes[row * columns + column] = { baseX: x, baseY: y, x, y, vx: 0, vy: 0 }
    }
  }

  return { columns, nodes, rows }
}

export function advanceElasticGrid(
  nodes,
  sources,
  width,
  height,
  profile = OFFICIAL_ELASTIC_GRID_PROFILE,
) {
  let maxMovement = 0
  let maxVelocity = 0

  for (const node of nodes) {
    let forceX = 0
    let forceY = 0
    for (const source of sources) {
      if (!source.active) continue
      const radius = source.gridRadius
      const repulsion = source.gridStrength
      const dx = node.x - source.x * width
      const dy = node.y - source.y * height
      const distance = Math.hypot(dx, dy)
      if (distance < radius) {
        const strength = repulsion * (1 - distance / radius)
        if (distance > 0.001) {
          forceX += dx / distance * strength
          forceY += dy / distance * strength
        }
      }
    }

    node.vx = (node.vx + (node.baseX - node.x) * profile.spring + forceX) * profile.damping
    node.vy = (node.vy + (node.baseY - node.y) * profile.spring + forceY) * profile.damping
    const previousX = node.x
    const previousY = node.y
    node.x += node.vx
    node.y += node.vy

    const displacementX = node.x - node.baseX
    const displacementY = node.y - node.baseY
    const displacement = Math.hypot(displacementX, displacementY)
    if (displacement > profile.maxDisplacement) {
      const scale = profile.maxDisplacement / displacement
      node.x = node.baseX + displacementX * scale
      node.y = node.baseY + displacementY * scale
      node.vx *= 0.5
      node.vy *= 0.5
    }

    maxMovement = Math.max(maxMovement, Math.hypot(node.x - previousX, node.y - previousY))
    maxVelocity = Math.max(maxVelocity, Math.hypot(node.vx, node.vy))
  }

  return { maxMovement, maxVelocity }
}

function makeElasticGridCanvas() {
  const canvas = document.createElement('canvas')
  canvas.className = 'dsh-harness-official-elastic-grid'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.appendChild(canvas)
  return canvas
}

export function createOfficialElasticGrid(
  reducedMotion,
  interactionSources,
  profile = OFFICIAL_ELASTIC_GRID_PROFILE,
) {
  const canvas = makeElasticGridCanvas()
  const context = canvas.getContext('2d')
  if (context === null) {
    canvas.remove()
    return {
      setEnabled() {},
      getDiagnostics: () => ({
        activeEmitterCount: interactionSources.getActiveCount(),
        renderer: 'none',
        enabled: false,
      }),
      destroy() {},
    }
  }

  const finePointerQuery = window.matchMedia?.('(hover: hover) and (pointer: fine)')
  let grid = { columns: 0, nodes: [], rows: 0 }
  let width = 0
  let height = 0
  let pixelRatio = 1
  let enabled = false
  let visible = true
  let pageVisible = document.visibilityState === 'visible'
  let frame = 0
  let resizeTimer = 0
  let lastFrameTime = 0
  let renderedFrames = 0
  let stableFrames = 0

  const canAnimate = () => (
    enabled
    && visible
    && pageVisible
    && !reducedMotion
    && width >= profile.minWidth
    && finePointerQuery?.matches !== false
  )

  const draw = () => {
    context.clearRect(0, 0, width, height)
    if (!enabled || width < profile.minWidth) return

    context.save()
    context.lineWidth = profile.lineWidth
    context.strokeStyle = `rgba(255, 255, 255, ${profile.lineOpacity})`
    context.beginPath()
    for (let row = 0; row < grid.rows; row += 1) {
      for (let column = 0; column < grid.columns; column += 1) {
        const index = row * grid.columns + column
        const node = grid.nodes[index]
        if (column + 1 < grid.columns) {
          const right = grid.nodes[index + 1]
          context.moveTo(node.x, node.y)
          context.lineTo(right.x, right.y)
        }
        if (row + 1 < grid.rows) {
          const below = grid.nodes[index + grid.columns]
          context.moveTo(node.x, node.y)
          context.lineTo(below.x, below.y)
        }
      }
    }
    context.stroke()

    const sources = interactionSources.getSources()
    for (const node of grid.nodes) {
      let proximity = 0
      for (const source of sources) {
        if (!source.active) continue
        const radius = source.gridRadius
        proximity = Math.max(
          proximity,
          1 - clampGrid(Math.hypot(node.x - source.x * width, node.y - source.y * height) / radius),
        )
      }
      const eased = proximity * proximity * (3 - 2 * proximity)
      const radius = profile.pointRadius + (profile.activePointRadius - profile.pointRadius) * eased
      const opacity = profile.pointOpacity + (profile.activePointOpacity - profile.pointOpacity) * eased
      context.fillStyle = `rgba(255, 255, 255, ${opacity})`
      context.fillRect(node.x - radius, node.y - radius, radius * 2, radius * 2)
    }
    context.restore()
  }

  const rebuild = () => {
    const nextWidth = Math.max(1, window.innerWidth)
    const nextHeight = Math.max(1, window.innerHeight)
    const nextPixelRatio = Math.min(window.devicePixelRatio || 1, profile.maxPixelRatio)
    if (nextWidth === width && nextHeight === height && nextPixelRatio === pixelRatio) return false
    width = nextWidth
    height = nextHeight
    pixelRatio = nextPixelRatio
    canvas.width = Math.round(width * pixelRatio)
    canvas.height = Math.round(height * pixelRatio)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    grid = createElasticGridNodes(width, height, profile)
    canvas.dataset.gridSize = `${grid.columns}x${grid.rows}`
    canvas.dataset.pixelRatio = String(pixelRatio)
    stableFrames = 0
    draw()
    return true
  }

  const schedule = () => {
    if (canAnimate() && frame === 0) frame = window.requestAnimationFrame(render)
  }

  function render(time) {
    frame = 0
    if (!canAnimate()) return
    if (time - lastFrameTime < profile.frameInterval) {
      schedule()
      return
    }
    lastFrameTime = time - ((time - lastFrameTime) % profile.frameInterval)
    const activity = advanceElasticGrid(
      grid.nodes,
      interactionSources.getSources(),
      width,
      height,
      profile,
    )
    draw()
    renderedFrames += 1
    const isStill = activity.maxVelocity < profile.sleepVelocity
      && activity.maxMovement < profile.sleepMovement
    stableFrames = isStill ? stableFrames + 1 : 0
    if (stableFrames < profile.sleepFrames) schedule()
  }

  const onSourcesChanged = () => {
    stableFrames = 0
    schedule()
  }
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      resizeTimer = 0
      if (rebuild()) schedule()
    }, profile.resizeDelay)
  }
  const onVisibilityChange = () => {
    pageVisible = document.visibilityState === 'visible'
    if (pageVisible) schedule()
  }
  const onPointerCapabilityChange = () => {
    draw()
  }
  const observer = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting !== false
      if (visible) schedule()
    })
    : null

  rebuild()
  observer?.observe(canvas)
  window.addEventListener('resize', onResize, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange, { passive: true })
  finePointerQuery?.addEventListener?.('change', onPointerCapabilityChange)
  const unsubscribeSources = interactionSources.subscribe(onSourcesChanged)

  return {
    setEnabled: (value) => {
      enabled = value === true
      canvas.toggleAttribute('data-disabled', !enabled)
      if (enabled) {
        stableFrames = 0
        draw()
        schedule()
      } else {
        window.cancelAnimationFrame(frame)
        frame = 0
        context.clearRect(0, 0, width, height)
      }
    },
    getDiagnostics: () => ({
      enabled,
      gridSize: canvas.dataset.gridSize || '',
      activeEmitterCount: interactionSources.getActiveCount(),
      pixelRatio,
      pointerInside: interactionSources.getSources()[0].active,
      renderedFrames,
      renderer: 'canvas2d',
      running: frame !== 0,
      visible: visible && pageVisible,
    }),
    destroy: () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      finePointerQuery?.removeEventListener?.('change', onPointerCapabilityChange)
      unsubscribeSources()
      observer?.disconnect()
      window.clearTimeout(resizeTimer)
      window.cancelAnimationFrame(frame)
      canvas.remove()
    },
  }
}
