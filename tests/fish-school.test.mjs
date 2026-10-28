import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'
import { OFFICIAL_FISH_PROFILE } from '../src/client/fish-profile.js'
import { advanceFishSchool, createFishStates, createFishWorld } from '../src/client/fish-school.js'
import { fishBodyHalfDepth, fishVisualPose } from '../src/client/fish-drawing.js'

const root = resolve(import.meta.dirname, '..')
const fixedRandom = () => 0.5

function meanPairDistance(fishes) {
  let total = 0
  let pairs = 0
  for (let left = 0; left < fishes.length; left += 1) {
    for (let right = left + 1; right < fishes.length; right += 1) {
      total += Math.hypot(fishes[left].x - fishes[right].x, fishes[left].y - fishes[right].y)
      pairs += 1
    }
  }
  return pairs === 0 ? 0 : total / pairs
}

function preyOnly(fishes) {
  return fishes.filter((fish) => fish.role === 'prey')
}

test('fish population mixes one predator, a tight school and a gold pair', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const predators = fishes.filter((fish) => fish.role === 'predator')
  const prey = preyOnly(fishes)
  const school = prey.filter((fish) => fish.group === 'school')
  const pair = prey.filter((fish) => fish.group === 'pair')

  assert.equal(predators.length, 1)
  assert.ok(school.length >= 8, 'the schooling group must stay a real shoal')
  assert.equal(pair.length, 2)
  assert.ok(predators[0].length > Math.max(...prey.map((fish) => fish.length)))
  assert.ok(new Set(fishes.map((fish) => fish.length)).size >= 6, 'fish must vary in size')
  assert.ok(fishes.every((fish) => fish.length > 0 && fish.speed > 0))
  assert.equal(OFFICIAL_FISH_PROFILE.frameInterval, 1000 / 30)
  assert.equal(OFFICIAL_FISH_PROFILE.maxPixelRatio, 2)
  assert.equal(OFFICIAL_FISH_PROFILE.mouseAvoidRadius, 150)
  assert.equal(OFFICIAL_FISH_PROFILE.fluidRadius, 0.065)
  assert.equal(OFFICIAL_FISH_PROFILE.fluidStrength, 0.55)
  assert.ok(OFFICIAL_FISH_PROFILE.schooling.fleeRadius > OFFICIAL_FISH_PROFILE.schooling.separationRadius)
  assert.ok(OFFICIAL_FISH_PROFILE.predation.huntRadius > OFFICIAL_FISH_PROFILE.predation.biteRadius)
  assert.equal(predators[0].bars.length, 6)
  assert.ok(OFFICIAL_FISH_PROFILE.predation.huntGroups.includes('school'))
  assert.ok(!OFFICIAL_FISH_PROFILE.predation.huntGroups.includes('pair'))
  assert.ok(OFFICIAL_FISH_PROFILE.feeding.maxPreyLength < OFFICIAL_FISH_PROFILE.predation.newPredatorLength)
  assert.ok(OFFICIAL_FISH_PROFILE.shrimp.count > 0)
  assert.ok(OFFICIAL_FISH_PROFILE.schooling.pointerScareRadius > OFFICIAL_FISH_PROFILE.schooling.pointerFleeRadius)
  assert.ok(OFFICIAL_FISH_PROFILE.schooling.panicCohesionScale < 1)
})

test('a calm fish wanders deterministically and keeps its cruise speed', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const fish = preyOnly(fishes)[0]
  fish.wanderRemaining = 0
  const values = [1, 0]
  const random = () => values.shift() ?? 0.5

  advanceFishSchool([fish], { active: false }, 1000, 700, 1 / 30, random)

  assert.notEqual(fish.targetHeading, fish.initialHeading)
  assert.ok(fish.wanderRemaining >= OFFICIAL_FISH_PROFILE.wanderMinSeconds)
  assert.ok(Math.abs(fish.speed - fish.cruiseSpeed) < 1e-9)
  assert.ok(Math.abs(Math.hypot(fish.vx, fish.vy) - fish.speed) < 1e-9)
})

test('fish reflect back into the viewport after crossing a boundary', () => {
  const fishes = createFishStates(400, 300, fixedRandom)
  const fish = preyOnly(fishes)[0]
  const margin = fish.length * 0.5 + OFFICIAL_FISH_PROFILE.boundaryPadding
  fish.x = 400 - margin + 8
  fish.y = 150
  fish.heading = 0
  fish.targetHeading = 0

  advanceFishSchool([fish], { active: false }, 400, 300, 0.05, fixedRandom)

  assert.ok(fish.x <= 400 - margin)
  assert.ok(fish.vx < 0)
})

test('mouse moving into the school triggers a panic and scatters the shoal', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const school = fishes.filter((fish) => fish.group === 'school')
  const pointer = {
    x: school.reduce((sum, fish) => sum + fish.x, 0) / school.length,
    y: school.reduce((sum, fish) => sum + fish.y, 0) / school.length,
    active: true,
  }
  const before = school.reduce((sum, fish) => sum + Math.hypot(fish.x - pointer.x, fish.y - pointer.y), 0) / school.length

  for (let step = 0; step < 10; step += 1) {
    advanceFishSchool(fishes, pointer, 1000, 700, 1 / 30, fixedRandom)
  }

  for (const fish of school) {
    assert.ok(fish.panic > 0, `${fish.id} should panic`)
    assert.ok(fish.startle > 0, `${fish.id} should startle`)
    assert.ok(fish.speed > fish.cruiseSpeed, `${fish.id} should burst away`)
  }
  const after = school.reduce((sum, fish) => sum + Math.hypot(fish.x - pointer.x, fish.y - pointer.y), 0) / school.length
  assert.ok(after > before, `the shoal should scatter (${before} -> ${after})`)
})

test('a distant mouse leaves the school calm and cruising', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const school = fishes.filter((fish) => fish.group === 'school')
  const pointer = { x: -600, y: -600, active: true }

  advanceFishSchool(fishes, pointer, 1000, 700, 1 / 30, fixedRandom)

  for (const fish of school) {
    assert.equal(fish.panic, 0)
    assert.ok(Math.abs(fish.speed - fish.cruiseSpeed) < 1e-9)
  }
})

test('schooling fish pull together and align instead of drifting apart', () => {
  const fishes = createFishStates(1000, 700, fixedRandom).filter((fish) => fish.group === 'school')
  fishes.forEach((fish, index) => {
    fish.x = 380 + (index % 3) * 140
    fish.y = 260 + Math.floor(index / 3) * 150
    fish.heading = 0
    fish.targetHeading = 0
    fish.wanderRemaining = 99
  })
  const before = meanPairDistance(fishes)

  for (let step = 0; step < 120; step += 1) {
    advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30)
  }

  const after = meanPairDistance(fishes)
  assert.ok(after < before * 0.85, `shoal spread ${before} -> ${after}`)
})

test('the predator bites a nearby smaller fish and creates one effect', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const predator = fishes.find((fish) => fish.role === 'predator')
  const prey = fishes.find((fish) => fish.group === 'school')
  predator.x = 500
  predator.y = 350
  predator.heading = 0
  predator.targetHeading = 0
  predator.satiety = 0
  prey.x = predator.x + 17
  prey.y = predator.y
  prey.heading = 0
  prey.targetHeading = 0
  for (const other of preyOnly(fishes)) {
    if (other === prey) continue
    other.x = 900
    other.y = 80 + other.length
  }
  const effects = []

  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom, OFFICIAL_FISH_PROFILE, effects)

  assert.equal(prey.eaten, true)
  assert.ok(predator.satiety >= OFFICIAL_FISH_PROFILE.predation.satietySeconds)
  assert.ok(predator.length > 68, 'a meal makes the predator grow')
  assert.equal(predator.hunger, 0)
  assert.equal(effects.length, 1)
  assert.equal(effects[0].maxLife, OFFICIAL_FISH_PROFILE.predation.effectSeconds)
})

test('the predator ignores the larger gold pair', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const predator = fishes.find((fish) => fish.role === 'predator')
  const gold = fishes.find((fish) => fish.group === 'pair')
  predator.x = 500
  predator.y = 350
  predator.heading = 0
  predator.targetHeading = 0
  predator.satiety = 0
  gold.x = 515
  gold.y = 350
  for (const fish of fishes) {
    if (fish === predator || fish === gold) continue
    fish.x = 900
    fish.y = 80 + fish.length
  }

  for (let step = 0; step < 20; step += 1) {
    advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom)
  }

  assert.equal(gold.eaten, false)
})

test('the gold pair keeps its distance without collapsing into one fish', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const pair = fishes.filter((fish) => fish.group === 'pair')
  const predator = fishes.find((fish) => fish.role === 'predator')
  predator.satiety = 99
  pair[0].x = 300
  pair[0].y = 350
  pair[0].heading = 0
  pair[0].targetHeading = 0
  pair[1].x = 314
  pair[1].y = 350
  pair[1].heading = 0
  pair[1].targetHeading = 0

  for (let step = 0; step < 60; step += 1) {
    advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom)
  }

  const distance = Math.hypot(pair[0].x - pair[1].x, pair[0].y - pair[1].y)
  assert.ok(distance > 24, `pair must not overlap (got ${distance})`)
  assert.ok(distance < 160, `pair must stay together (got ${distance})`)
})

test('an eaten fish respawns at the edge and fades back in', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const predator = fishes.find((fish) => fish.role === 'predator')
  const prey = fishes.find((fish) => fish.group === 'school')
  predator.satiety = 99
  prey.eaten = true
  prey.respawnTimer = 0
  prey.length = 44

  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom)

  assert.equal(prey.eaten, false)
  assert.equal(prey.fade, 0)
  assert.equal(prey.length, prey.baseLength, 'a respawned small fish returns to its base size')
  assert.ok(prey.speed === prey.cruiseSpeed)
  const margin = prey.length * 0.5 + OFFICIAL_FISH_PROFILE.boundaryPadding
  assert.ok(prey.x >= margin - 1 && prey.x <= 1000 - margin + 1)
  assert.ok(prey.y >= margin - 1 && prey.y <= 700 - margin + 1)

  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom)
  assert.ok(prey.fade > 0)
})

test('a small fish panics and turns away from a hunting predator', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const predator = fishes.find((fish) => fish.role === 'predator')
  const prey = fishes.find((fish) => fish.group === 'school')
  predator.x = 500
  predator.y = 350
  predator.heading = 0
  predator.targetHeading = 0
  predator.satiety = 0
  prey.x = predator.x + 55
  prey.y = predator.y
  prey.heading = 0
  prey.targetHeading = 0
  for (const other of preyOnly(fishes)) {
    if (other === prey) continue
    other.x = 900
    other.y = 80 + other.length
  }
  const awayX = prey.x - predator.x
  const awayY = prey.y - predator.y

  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom)

  assert.equal(prey.eaten, false)
  assert.ok(prey.panic > 0)
  assert.ok(prey.vx * awayX + prey.vy * awayY > 0, 'fleeing velocity must point away')
})

test('the predator sprints at prey and the prey startles away', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const predator = fishes.find((fish) => fish.role === 'predator')
  const prey = fishes.find((fish) => fish.group === 'school')
  predator.x = 500
  predator.y = 350
  predator.heading = 0
  predator.targetHeading = 0
  predator.satiety = 0
  prey.x = 600
  prey.y = 350
  prey.heading = 0
  prey.targetHeading = 0

  advanceFishSchool([predator, prey], { active: false }, 1000, 700, 1 / 30, fixedRandom)

  assert.ok(predator.speed > predator.cruiseSpeed * 1.05, 'hunting should accelerate into a sprint')
  assert.ok(prey.startle > 0, 'a nearby predator should startle the prey')
  assert.ok(prey.panic > 0)
  assert.ok(prey.speed > prey.cruiseSpeed, 'startled prey should burst away')
})

test('a starving predator becomes a carcass and a young successor arrives', () => {
  const fishes = createFishStates(1000, 700, fixedRandom)
  const world = createFishWorld(1000, 700, fixedRandom)
  const predator = fishes.find((fish) => fish.role === 'predator')
  for (const fish of fishes) {
    if (fish.role === 'prey') {
      fish.x = 900
      fish.y = 80 + fish.length
    }
  }
  predator.x = 120
  predator.y = 120
  predator.hunger = OFFICIAL_FISH_PROFILE.predation.starvationSeconds + 1

  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom, OFFICIAL_FISH_PROFILE, [], world)

  assert.equal(predator.dead, true)
  assert.equal(world.corpses.length, 1)
  assert.equal(world.successorTimer, 0)
  assert.equal(world.successorScheduled, false)

  world.corpses.length = 0
  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom, OFFICIAL_FISH_PROFILE, [], world)
  assert.ok(world.successorTimer > 0)
  assert.equal(world.successorScheduled, true)

  const steps = Math.ceil(OFFICIAL_FISH_PROFILE.predation.successorDelaySeconds * 30) + 2
  for (let step = 0; step < steps; step += 1) {
    advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom, OFFICIAL_FISH_PROFILE, [], world)
  }

  assert.equal(predator.dead, false)
  assert.equal(predator.length, OFFICIAL_FISH_PROFILE.predation.newPredatorLength)
  assert.equal(world.successorScheduled, false)
})

test('small fish eat shrimp and grow, while the big fish ignores shrimp', () => {
  const fishes = createFishStates(1000, 700, fixedRandom).filter((fish) => fish.role === 'prey')
  const world = createFishWorld(1000, 700, fixedRandom)
  const fish = fishes.find((candidate) => candidate.group === 'school')
  const shrimp = { id: 'shrimp-test', size: 9, baseHeading: 0, heading: 0, phase: 0, alive: true, respawnTimer: 0, x: 512, y: 350 }
  world.shrimps = [shrimp]
  fish.x = 500
  fish.y = 350
  const before = fish.length

  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom, OFFICIAL_FISH_PROFILE, [], world)

  assert.equal(shrimp.alive, false)
  assert.ok(fish.length > before, 'eating a shrimp should grow a small fish')

  const predator = createFishStates(1000, 700, fixedRandom).find((candidate) => candidate.role === 'predator')
  const predatorWorld = createFishWorld(1000, 700, fixedRandom)
  const bait = { id: 'shrimp-bait', size: 9, baseHeading: 0, heading: 0, phase: 0, alive: true, respawnTimer: 0, x: 505, y: 350 }
  predatorWorld.shrimps = [bait]
  predator.x = 500
  predator.y = 350
  for (let step = 0; step < 3; step += 1) {
    advanceFishSchool([predator], { active: false }, 1000, 700, 1 / 30, fixedRandom, OFFICIAL_FISH_PROFILE, [], predatorWorld)
  }
  assert.equal(bait.alive, true, 'the predator must not eat shrimp')
})

test('the school scavenges a carcass and grows on the bites', () => {
  const fishes = createFishStates(1000, 700, fixedRandom).filter((fish) => fish.role === 'prey')
  const world = createFishWorld(1000, 700, fixedRandom)
  world.shrimps = []
  const fish = fishes.find((candidate) => candidate.group === 'school')
  const predatorSpec = OFFICIAL_FISH_PROFILE.fish.find((spec) => spec.role === 'predator')
  world.corpses = [{
    x: 500,
    y: 350,
    heading: 0,
    length: 68,
    biomass: 2,
    maxBiomass: 2,
    phase: 0,
    palette: predatorSpec.palette,
    bars: predatorSpec.bars,
  }]
  fish.x = 515
  fish.y = 350
  const before = fish.length

  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom, OFFICIAL_FISH_PROFILE, [], world)

  assert.ok(world.corpses[0].biomass < 2)
  assert.ok(fish.length > before, 'a carcass bite should grow a small fish')

  world.corpses[0].biomass = 1
  fish.x = 515
  fish.y = 350
  fish.biteCooldown = 0
  advanceFishSchool(fishes, { active: false }, 1000, 700, 1 / 30, fixedRandom, OFFICIAL_FISH_PROFILE, [], world)
  assert.equal(world.corpses.length, 0)
})

test('fish body profile stays a slender, deepest-behind-the-head silhouette', () => {
  const deepest = fishBodyHalfDepth(0.42)
  assert.ok(deepest > 0.08 && deepest < 0.13, 'body depth must stay fish-like')
  assert.ok(fishBodyHalfDepth(0.02) < deepest * 0.35, 'snout must taper')
  assert.ok(fishBodyHalfDepth(0.98) < deepest * 0.3, 'peduncle must narrow')
  assert.equal(fishBodyHalfDepth(-4), fishBodyHalfDepth(0))
  assert.equal(fishBodyHalfDepth(4), fishBodyHalfDepth(1))
})

test('a side-view fish points its nose along the travel heading without rolling over', () => {
  const headings = [0, 0.3, Math.PI / 2, 2.2, Math.PI, 3.9, -Math.PI / 2, -2.4, -0.8, 5.9]
  for (const heading of headings) {
    const pose = fishVisualPose(heading)
    const noseX = pose.mirrored ? -Math.cos(pose.rotation) : Math.cos(pose.rotation)
    const noseY = pose.mirrored ? -Math.sin(pose.rotation) : Math.sin(pose.rotation)

    assert.ok(Math.abs(noseX - Math.cos(heading)) < 1e-9, `nose x follows heading ${heading}`)
    assert.ok(Math.abs(noseY - Math.sin(heading)) < 1e-9, `nose y follows heading ${heading}`)
    assert.ok(Math.abs(pose.rotation) <= Math.PI / 2 + 1e-9)
    assert.equal(pose.mirrored, Math.cos(heading) < 0)
  }

  assert.equal(fishVisualPose(Math.PI).mirrored, true)
  assert.ok(Math.abs(fishVisualPose(Math.PI).rotation) < 1e-9, 'leftward travel stays upright')
})

test('fish renderer owns canvas, shoaling/predation logic and reduced-motion cleanup', async () => {
  const source = await readFile(resolve(root, 'src/client/fish-school.js'), 'utf8')
  const drawing = await readFile(resolve(root, 'src/client/fish-drawing.js'), 'utf8')
  assert.match(source, /getContext\('2d'\)/)
  assert.match(source, /drawOfficialFish\(context, fish\)/)
  assert.match(source, /collectSchoolGroups/)
  assert.match(source, /nearestPrey/)
  assert.match(source, /nearestPredator/)
  assert.match(source, /bitePrey/)
  assert.match(source, /respawnPrey/)
  assert.match(source, /panic/)
  assert.match(source, /interactionSources\.updateFishSource\(0, predator/)
  assert.match(source, /interactionSources\.updateFishSource\(1, school/)
  assert.match(source, /fish\.tailFrequency \* FULL_TURN/)
  assert.match(source, /drawBiteEffects/)
  assert.match(source, /createFishWorld/)
  assert.match(source, /killPredator/)
  assert.match(source, /revivePredator/)
  assert.match(source, /drawShrimp/)
  assert.match(source, /drawFishCorpse/)
  assert.match(source, /startle/)
  assert.match(source, /pointerScareRadius/)
  assert.match(source, /pointerEscapeWeight/)
  assert.match(drawing, /buildFishSpine/)
  assert.match(drawing, /fishBodyHalfDepth/)
  assert.match(drawing, /drawCaudalFin/)
  assert.match(drawing, /drawDorsalFin/)
  assert.match(drawing, /drawAnalFin/)
  assert.match(drawing, /drawPectoralFin/)
  assert.match(drawing, /drawFishEye/)
  assert.match(drawing, /drawFishBars/)
  assert.match(drawing, /bodyDepthScale/)
  assert.match(drawing, /baseOpacity/)
  assert.match(source, /personalSpaceFactor|separationStrength/)
  assert.match(drawing, /new Path2D\(\)/)
  assert.match(source, /IntersectionObserver/)
  assert.match(source, /requestAnimationFrame/)
  assert.match(source, /window\.cancelAnimationFrame\(frame\)/)
  assert.match(source, /interactionSources\.clearFishSources\(\)/)
  assert.match(source, /canvas\.remove\(\)/)
  assert.match(source, /width >= profile\.minWidth/)
})
