import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'
import { OFFICIAL_FLUID_PROFILE } from '../src/client/fluid-profile.js'
import { advancePointerMotion } from '../src/client/pointer-field.js'

const root = resolve(import.meta.dirname, '..')

test('official fluid profile keeps the measured homepage parameters', () => {
  assert.equal(OFFICIAL_FLUID_PROFILE.frameInterval, 1000 / 30)
  assert.equal(OFFICIAL_FLUID_PROFILE.flowScale, 0.25)
  assert.equal(OFFICIAL_FLUID_PROFILE.maxPixelRatio, 1.5)
  assert.equal(OFFICIAL_FLUID_PROFILE.mouseRadius, 0.09)
  assert.equal(OFFICIAL_FLUID_PROFILE.mouseStrength, 1.8)
  assert.equal(OFFICIAL_FLUID_PROFILE.mouseSmoothing, 0.1)
  assert.equal(OFFICIAL_FLUID_PROFILE.mouseVelocity, 0.2)
  assert.equal(OFFICIAL_FLUID_PROFILE.decay, 0.925)
  assert.equal(OFFICIAL_FLUID_PROFILE.lightFollow, 0.63)
  assert.deepEqual(OFFICIAL_FLUID_PROFILE.glowColors, ['#fff7d1', '#538dca', '#2d448b'])
})

test('pointer motion smooths position, derives velocity and eases interaction weight', () => {
  const motion = { x: 0.5, y: 0.5, vx: 0, vy: 0, interaction: 0 }
  advancePointerMotion(motion, { x: 0.9, y: 0.1, inside: true })

  assert.equal(motion.x, 0.54)
  assert.ok(Math.abs(motion.y - 0.46) < Number.EPSILON)
  assert.ok(motion.vx > 0)
  assert.ok(motion.vy < 0)
  assert.ok(motion.interaction > 0)

  const activeWeight = motion.interaction
  advancePointerMotion(motion, { x: 0.9, y: 0.1, inside: false })
  assert.ok(motion.interaction < activeWeight)
  assert.ok(motion.interaction >= 0)
})

test('fluid shader includes full-field distortion, glow, bloom and movable light', async () => {
  const shaders = await readFile(resolve(root, 'src/client/fluid-shaders.js'), 'utf8')
  assert.match(shaders, /suv \+= flowDir \* influence/)
  assert.match(shaders, /swirlAngle/)
  assert.match(shaders, /glowMix/)
  assert.match(shaders, /u_bloomThreshold/)
  assert.match(shaders, /u_lightPos/)
  assert.match(shaders, /octave < 1/)
  assert.doesNotMatch(shaders, /whiteMask/)
})

test('flowmap combines exactly three emitters and decays history once per pass', async () => {
  const shaders = await readFile(resolve(root, 'src/client/fluid-shaders.js'), 'utf8')
  const pointerSource = await readFile(resolve(root, 'src/client/pointer-field.js'), 'utf8')

  assert.match(shaders, /const int EMITTER_COUNT = 3/)
  assert.match(shaders, /uniform vec2 u_emitters\[EMITTER_COUNT\]/)
  assert.match(shaders, /uniform float u_strengths\[EMITTER_COUNT\]/)
  assert.equal([...shaders.matchAll(/previous\.r \*= u_decay/g)].length, 1)
  assert.match(pointerSource, /new Float32Array\(6\)/)
  assert.match(pointerSource, /source\.fluidRadius/)
  assert.match(pointerSource, /source\.active[\s\S]*?source\.fluidStrength/)
})

test('shared interaction source owns pointer lifecycle and all renderer diagnostics expose emitters', async () => {
  const pointerSource = await readFile(resolve(root, 'src/client/pointer-field.js'), 'utf8')
  const interactionSource = await readFile(resolve(root, 'src/client/interaction-sources.js'), 'utf8')
  assert.match(interactionSource, /OFFICIAL_INTERACTION_SOURCE_COUNT = 3/)
  assert.match(interactionSource, /fluidRadius/)
  assert.match(interactionSource, /gridStrength/)
  assert.match(interactionSource, /document\.documentElement\.addEventListener\('pointerleave'/)
  assert.match(interactionSource, /document\.documentElement\.removeEventListener\('pointerleave'/)
  assert.match(pointerSource, /activeEmitterCount:/)
  assert.doesNotMatch(pointerSource, /addEventListener\('pointermove'/)
})
