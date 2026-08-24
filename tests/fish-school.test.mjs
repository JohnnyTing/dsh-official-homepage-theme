import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'
import { OFFICIAL_FISH_PROFILE } from '../src/client/fish-profile.js'
import { advanceFishSchool, createFishStates } from '../src/client/fish-school.js'

const root = resolve(import.meta.dirname, '..')
const fixedRandom = () => 0.5

test('fish profile creates exactly two distinct bounded fish', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)

  assert.equal(fishes.length, 2)
  assert.deepEqual(fishes.map((fish) => fish.length), [44, 38])
  assert.deepEqual(fishes.map((fish) => fish.speed), [34, 42])
  assert.equal(OFFICIAL_FISH_PROFILE.frameInterval, 1000 / 30)
  assert.equal(OFFICIAL_FISH_PROFILE.maxPixelRatio, 1.5)
  assert.equal(OFFICIAL_FISH_PROFILE.mouseAvoidRadius, 150)
  assert.equal(OFFICIAL_FISH_PROFILE.separationRadius, 90)
  assert.equal(OFFICIAL_FISH_PROFILE.fluidRadius, 0.065)
  assert.equal(OFFICIAL_FISH_PROFILE.fluidStrength, 0.55)
})

test('fish wander deterministically and preserve configured speed', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const fish = fishes[0]
  fish.wanderRemaining = 0
  const values = [1, 0]
  const random = () => values.shift() ?? 0.5

  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, random)

  assert.notEqual(fish.targetHeading, fish.initialHeading)
  assert.ok(Math.abs(Math.hypot(fish.vx, fish.vy) - fish.speed) < 1e-9)
  assert.ok(fish.wanderRemaining >= OFFICIAL_FISH_PROFILE.wanderMinSeconds)
})

test('fish reflect back into the viewport after crossing a boundary', () => {
  const fishes = createFishStates(400, 300, fixedRandom)
  const fish = fishes[0]
  const margin = fish.length * 0.5 + OFFICIAL_FISH_PROFILE.boundaryPadding
  fish.x = 400 - margin + 8
  fish.heading = 0
  fish.targetHeading = 0

  advanceFishSchool(fishes, { active: false }, 400, 300, 0.05, fixedRandom)

  assert.ok(fish.x <= 400 - margin)
  assert.ok(fish.vx < 0)
})

test('nearby mouse gently turns a fish away without changing its speed', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const fish = fishes[0]
  const originalSpeed = Math.hypot(fish.vx, fish.vy)

  advanceFishSchool(fishes, {
    x: fish.x + 40,
    y: fish.y,
    active: true,
  }, 1000, 700, 0.05, fixedRandom)

  assert.ok(Math.abs(fish.heading - fish.initialHeading) > 0.01)
  assert.ok(Math.abs(Math.hypot(fish.vx, fish.vy) - originalSpeed) < 1e-9)
})

test('close fish steer apart instead of remaining overlapped', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  fishes[0].x = 500
  fishes[0].y = 350
  fishes[0].heading = 0
  fishes[0].targetHeading = 0
  fishes[1].x = 500
  fishes[1].y = 365
  fishes[1].heading = 0
  fishes[1].targetHeading = 0

  advanceFishSchool(fishes, { active: false }, 1000, 700, 0.05, fixedRandom)

  assert.ok(fishes[0].heading < 0)
  assert.ok(fishes[1].heading > 0)
})

test('fish renderer owns canvas, responsive lifecycle and reduced-motion source cleanup', async () => {
  const source = await readFile(resolve(root, 'src/client/fish-school.js'), 'utf8')
  const drawing = await readFile(resolve(root, 'src/client/fish-drawing.js'), 'utf8')
  assert.match(source, /getContext\('2d'\)/)
  assert.match(source, /drawOfficialFish\(context, fish\)/)
  assert.match(drawing, /drawFishTail/)
  assert.match(drawing, /drawFishRearFins/)
  assert.match(drawing, /drawFishPectoralFin/)
  assert.match(drawing, /drawFishFaceAndDetails/)
  assert.match(drawing, /context\.arc\(eyeX/)
  assert.match(drawing, /Gill cover and lateral line/)
  assert.match(drawing, /curved mouth/)
  assert.match(drawing, /tailAngle \* 0\.72/)
  assert.match(source, /IntersectionObserver/)
  assert.match(source, /requestAnimationFrame/)
  assert.match(source, /window\.cancelAnimationFrame\(frame\)/)
  assert.match(source, /interactionSources\.clearFishSources\(\)/)
  assert.match(source, /canvas\.remove\(\)/)
  assert.match(source, /width >= profile\.minWidth/)
})
