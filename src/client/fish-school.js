import { OFFICIAL_FISH_PROFILE } from './fish-profile.js'
import { drawOfficialFish, drawShrimp, drawFishCorpse } from './fish-drawing.js'

const FULL_TURN = Math.PI * 2

function clampFish(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function normalizeAngle(angle) {
  let normalized = angle
  while (normalized > Math.PI) normalized -= FULL_TURN
  while (normalized < -Math.PI) normalized += FULL_TURN
  return normalized
}

function steerAngle(current, target, maxStep) {
  return current + clampFish(normalizeAngle(target - current), -maxStep, maxStep)
}

function randomWanderSeconds(random, profile) {
  return profile.wanderMinSeconds
    + random() * (profile.wanderMaxSeconds - profile.wanderMinSeconds)
}

function randomBetween(random, min, max) {
  return min + random() * (max - min)
}

function isPrey(fish) {
  return fish.role === 'prey' && !fish.eaten
}

function isPredator(fish) {
  return fish.role === 'predator'
}

function isLivingPredator(fish) {
  return fish.role === 'predator' && !fish.dead
}

export function createFishStates(width, height, random = Math.random, profile = OFFICIAL_FISH_PROFILE) {
  return profile.fish.map((specification, index) => ({
    ...specification,
    x: width * specification.initialX,
    y: height * specification.initialY,
    vx: Math.cos(specification.initialHeading) * specification.speed,
    vy: Math.sin(specification.initialHeading) * specification.speed,
    heading: specification.initialHeading,
    targetHeading: specification.initialHeading,
    turnRate: 0,
    tailPhase: index * Math.PI * 0.7,
    baseLength: specification.length,
    cruiseSpeed: specification.speed,
    speed: specification.speed,
    panic: 0,
    startle: 0,
    hunger: specification.role === 'predator' ? profile.predation.initialHungerSeconds : 0,
    satiety: 0,
    gulp: 0,
    biteCooldown: 0,
    dead: false,
    eaten: false,
    respawnTimer: 0,
    fade: 1,
    wanderRemaining: randomWanderSeconds(random, profile),
    active: false,
  }))
}

function avoidanceScale(distance, radius, weight) {
  if (distance >= radius || distance <= 0.001) return 0
  return (1 - distance / radius) * weight / distance
}

function applyHardBoundary(fish, width, height, profile) {
  const margin = fish.length * 0.5 + profile.boundaryPadding
  const maxX = Math.max(margin, width - margin)
  const maxY = Math.max(margin, height - margin)

  if (fish.x < margin) {
    fish.x = margin + (margin - fish.x)
    fish.heading = Math.PI - fish.heading
    fish.targetHeading = fish.heading
  } else if (fish.x > maxX) {
    fish.x = maxX - (fish.x - maxX)
    fish.heading = Math.PI - fish.heading
    fish.targetHeading = fish.heading
  }

  if (fish.y < margin) {
    fish.y = margin + (margin - fish.y)
    fish.heading = -fish.heading
    fish.targetHeading = fish.heading
  } else if (fish.y > maxY) {
    fish.y = maxY - (fish.y - maxY)
    fish.heading = -fish.heading
    fish.targetHeading = fish.heading
  }
  fish.heading = normalizeAngle(fish.heading)
  fish.targetHeading = normalizeAngle(fish.targetHeading)
}

/* Cohesion and alignment are per group, so the blue school and the gold pair
   keep their own shape instead of blending into one blob. */
function collectSchoolGroups(fishes) {
  const groups = new Map()
  for (const fish of fishes) {
    if (!isPrey(fish)) continue
    let stats = groups.get(fish.group)
    if (stats === undefined) {
      stats = { x: 0, y: 0, cos: 0, sin: 0, count: 0 }
      groups.set(fish.group, stats)
    }
    stats.x += fish.x
    stats.y += fish.y
    stats.cos += Math.cos(fish.heading)
    stats.sin += Math.sin(fish.heading)
    stats.count += 1
  }
  for (const stats of groups.values()) {
    stats.x /= stats.count
    stats.y /= stats.count
    const magnitude = Math.hypot(stats.cos, stats.sin)
    if (magnitude > 0.0001) {
      stats.cos /= magnitude
      stats.sin /= magnitude
    } else {
      stats.cos = 1
      stats.sin = 0
    }
  }
  return groups
}

function nearestPrey(predator, fishes, radius, huntGroups) {
  let nearest = null
  let nearestDistance = radius
  for (const fish of fishes) {
    if (!isPrey(fish)) continue
    if (huntGroups !== undefined && !huntGroups.includes(fish.group)) continue
    const distance = Math.hypot(fish.x - predator.x, fish.y - predator.y)
    if (distance < nearestDistance) {
      nearest = fish
      nearestDistance = distance
    }
  }
  return nearest
}

function nearestPredator(fish, fishes, radius) {
  let nearest = null
  let nearestDistance = radius
  for (const other of fishes) {
    if (!isLivingPredator(other)) continue
    const distance = Math.hypot(fish.x - other.x, fish.y - other.y)
    if (distance < nearestDistance) {
      nearest = other
      nearestDistance = distance
    }
  }
  return nearest
}

function nearestShrimp(fish, shrimps, radius) {
  let nearest = null
  let nearestDistance = radius
  for (const shrimp of shrimps) {
    if (!shrimp.alive) continue
    const distance = Math.hypot(shrimp.x - fish.x, shrimp.y - fish.y)
    if (distance < nearestDistance) {
      nearest = shrimp
      nearestDistance = distance
    }
  }
  return nearest
}

function nearestCorpse(fish, corpses, radius) {
  let nearest = null
  let nearestDistance = radius
  for (const corpse of corpses) {
    if (corpse.biomass <= 0) continue
    const distance = Math.hypot(corpse.x - fish.x, corpse.y - fish.y)
    if (distance < nearestDistance) {
      nearest = corpse
      nearestDistance = distance
    }
  }
  return nearest
}

function respawnPrey(fish, fishes, width, height, random, profile) {
  const margin = fish.length * 0.5 + profile.boundaryPadding + 8
  const maxX = Math.max(margin, width - margin)
  const maxY = Math.max(margin, height - margin)
  const predator = fishes.find(isLivingPredator) ?? null
  /* Re-enter near the remaining members of the same group, but keep well
     clear of the predator. That lets a shoal recover instead of leaving one
     fish crossing the whole viewport on its own. */
  let mates = 0
  let mateX = 0
  let mateY = 0
  for (const other of fishes) {
    if (other === fish || !isPrey(other) || other.group !== fish.group) continue
    mates += 1
    mateX += other.x
    mateY += other.y
  }
  if (mates > 0) {
    mateX /= mates
    mateY /= mates
  }

  let spawnRotation = Math.PI / 2
  let spawnX = margin + random() * (maxX - margin)
  let spawnY = margin
  let bestScore = -Infinity
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const edge = Math.floor(random() * 4)
    const x = edge === 1 || edge === 3 ? (edge === 1 ? maxX : margin) : margin + random() * (maxX - margin)
    const y = edge === 0 || edge === 2 ? (edge === 0 ? margin : maxY) : margin + random() * (maxY - margin)
    const predatorDistance = predator === null ? 2000 : Math.hypot(x - predator.x, y - predator.y)
    const mateDistance = mates > 0 ? Math.hypot(x - mateX, y - mateY) : 0
    const score = predatorDistance - mateDistance * 0.65
    if (score > bestScore) {
      bestScore = score
      spawnX = x
      spawnY = y
      spawnRotation = edge === 0 ? Math.PI / 2 : edge === 1 ? Math.PI : edge === 2 ? -Math.PI / 2 : 0
    }
  }
  fish.x = spawnX
  fish.y = spawnY
  fish.length = fish.baseLength ?? fish.length
  fish.heading = spawnRotation

  fish.heading = normalizeAngle(fish.heading + (random() - 0.5) * 0.5)
  fish.targetHeading = fish.heading
  fish.vx = Math.cos(fish.heading) * fish.cruiseSpeed
  fish.vy = Math.sin(fish.heading) * fish.cruiseSpeed
  fish.speed = fish.cruiseSpeed
  fish.turnRate = 0
  fish.panic = 0
  fish.startle = 0
  fish.gulp = 0
  fish.biteCooldown = 0
  fish.eaten = false
  fish.fade = 0
  fish.respawnTimer = 0
  fish.wanderRemaining = randomWanderSeconds(random, profile)
  fish.tailPhase += random() * FULL_TURN
}

function bitePrey(predator, prey, random, profile, effects) {
  prey.eaten = true
  prey.fade = 0
  prey.respawnTimer = randomBetween(random, profile.predation.respawnMinSeconds, profile.predation.respawnMaxSeconds)
  predator.satiety = profile.predation.satietySeconds
  predator.hunger = 0
  predator.gulp = 1
  predator.length = Math.min(
    profile.predation.maxLength,
    predator.length + profile.predation.growthPerMeal,
  )
  if (effects !== null) {
    effects.push({
      x: prey.x,
      y: prey.y,
      life: 0,
      maxLife: profile.predation.effectSeconds,
      size: prey.length * 0.32,
    })
  }
}

function growPrey(fish, amount, profile) {
  fish.length = Math.min(profile.feeding.maxPreyLength, fish.length + amount)
}

function spawnShrimp(shrimp, width, height, random) {
  const margin = 16
  shrimp.x = margin + random() * Math.max(1, width - margin * 2)
  shrimp.y = margin + random() * Math.max(1, height - margin * 2)
  shrimp.baseHeading = random() * FULL_TURN
  shrimp.heading = shrimp.baseHeading
  shrimp.phase = random() * FULL_TURN
  shrimp.alive = true
  shrimp.respawnTimer = 0
}

function createShrimpStates(width, height, random, profile) {
  return Array.from({ length: profile.shrimp.count }, (_, index) => {
    const shrimp = {
      id: `shrimp-${index}`,
      size: profile.shrimp.length * (0.8 + random() * 0.4),
      baseHeading: 0,
      heading: 0,
      phase: 0,
      alive: true,
      respawnTimer: 0,
    }
    spawnShrimp(shrimp, width, height, random)
    return shrimp
  })
}

export function createFishWorld(width, height, random = Math.random, profile = OFFICIAL_FISH_PROFILE) {
  return {
    shrimps: createShrimpStates(width, height, random, profile),
    corpses: [],
    successorTimer: 0,
    successorScheduled: false,
  }
}

function advanceShrimp(shrimps, delta, width, height, random, profile) {
  const margin = 16
  for (const shrimp of shrimps) {
    if (!shrimp.alive) {
      shrimp.respawnTimer -= delta
      if (shrimp.respawnTimer <= 0) spawnShrimp(shrimp, width, height, random)
      continue
    }
    shrimp.phase += delta * 1.6
    shrimp.heading = shrimp.baseHeading + Math.sin(shrimp.phase) * 0.6
    shrimp.x += Math.cos(shrimp.heading) * profile.shrimp.speed * delta
    shrimp.y += Math.sin(shrimp.heading) * profile.shrimp.speed * delta
    if (shrimp.x < margin || shrimp.x > width - margin) {
      shrimp.baseHeading = Math.PI - shrimp.baseHeading
      shrimp.x = clampFish(shrimp.x, margin, Math.max(margin, width - margin))
    }
    if (shrimp.y < margin || shrimp.y > height - margin) {
      shrimp.baseHeading = -shrimp.baseHeading
      shrimp.y = clampFish(shrimp.y, margin, Math.max(margin, height - margin))
    }
  }
}

function killPredator(predator, world, random, profile, effects) {
  predator.dead = true
  predator.fade = 0
  predator.speed = 0
  predator.panic = 0
  predator.satiety = 0
  predator.gulp = 0
  if (world !== null) {
    const biomass = Math.max(
      profile.feeding.corpseMinBiomass,
      Math.round(predator.length * profile.feeding.corpseBitesPerLength),
    )
    world.corpses.push({
      x: predator.x,
      y: predator.y,
      heading: predator.heading,
      length: predator.length,
      biomass,
      maxBiomass: biomass,
      phase: random() * FULL_TURN,
      palette: profile.corpse.palette,
      bars: predator.bars,
    })
    world.successorTimer = 0
    world.successorScheduled = false
  }
  if (effects !== null) {
    effects.push({
      x: predator.x,
      y: predator.y,
      life: 0,
      maxLife: 0.9,
      size: predator.length * 0.45,
    })
  }
}

function revivePredator(predator, fishes, width, height, random, profile) {
  const length = profile.predation.newPredatorLength
  const margin = length * 0.5 + profile.boundaryPadding + 8
  const maxX = Math.max(margin, width - margin)
  const maxY = Math.max(margin, height - margin)
  /* Arrive on the edge nearest the shoal, so the young predator has a fair
     chance to find food instead of starving on the far side of the tank. */
  let preyCount = 0
  let preyX = width * 0.5
  let preyY = height * 0.5
  for (const fish of fishes) {
    if (!isPrey(fish)) continue
    preyCount += 1
    preyX += fish.x
    preyY += fish.y
  }
  if (preyCount > 0) {
    preyX /= preyCount + 1
    preyY /= preyCount + 1
  }
  const edges = [preyX, width - preyX, preyY, height - preyY]
  let edge = 0
  for (let candidate = 1; candidate < edges.length; candidate += 1) {
    if (edges[candidate] < edges[edge]) edge = candidate
  }
  if (edge === 0) {
    predator.x = margin
    predator.y = clampFish(preyY + (random() - 0.5) * height * 0.2, margin, maxY)
    predator.heading = 0
  } else if (edge === 1) {
    predator.x = maxX
    predator.y = clampFish(preyY + (random() - 0.5) * height * 0.2, margin, maxY)
    predator.heading = Math.PI
  } else if (edge === 2) {
    predator.x = clampFish(preyX + (random() - 0.5) * width * 0.2, margin, maxX)
    predator.y = margin
    predator.heading = Math.PI / 2
  } else {
    predator.x = clampFish(preyX + (random() - 0.5) * width * 0.2, margin, maxX)
    predator.y = maxY
    predator.heading = -Math.PI / 2
  }
  predator.length = length
  predator.dead = false
  predator.hunger = 0
  predator.satiety = 0
  predator.panic = 0
  predator.startle = 0
  predator.gulp = 0
  predator.fade = 0
  predator.speed = predator.cruiseSpeed
  predator.turnRate = 0
  predator.targetHeading = predator.heading
  predator.wanderRemaining = randomWanderSeconds(random, profile)
}

export function advanceFishSchool(
  fishes,
  pointer,
  width,
  height,
  deltaSeconds,
  random = Math.random,
  profile = OFFICIAL_FISH_PROFILE,
  effects = null,
  world = null,
) {
  const delta = clampFish(deltaSeconds, 0, 0.05)
  const schooling = profile.schooling
  const predation = profile.predation
  const feeding = profile.feeding

  if (effects !== null) {
    for (let index = effects.length - 1; index >= 0; index -= 1) {
      effects[index].life += delta
      if (effects[index].life >= effects[index].maxLife) effects.splice(index, 1)
    }
  }

  if (world !== null) {
    advanceShrimp(world.shrimps, delta, width, height, random, profile)
    for (const corpse of world.corpses) corpse.phase += delta * 0.6
    if (world.successorTimer > 0) {
      world.successorTimer -= delta
      if (world.successorTimer <= 0) {
        const predator = fishes.find(isPredator)
        if (predator !== undefined && predator.dead) {
          revivePredator(predator, fishes, width, height, random, profile)
          world.successorTimer = 0
          world.successorScheduled = false
        }
      }
    } else if (world.corpses.length === 0 && !world.successorScheduled) {
      /* Let the shoal finish the carcass before a new big fish moves in. */
      const predator = fishes.find(isPredator)
      if (predator !== undefined && predator.dead) {
        world.successorTimer = profile.predation.successorDelaySeconds
        world.successorScheduled = true
      }
    }
  }

  const groups = collectSchoolGroups(fishes)
  let pointerScare = false
  if (pointer?.active === true) {
    const school = groups.get('school')
    pointerScare = school !== undefined
      && Math.hypot(pointer.x - school.x, pointer.y - school.y) < schooling.pointerScareRadius
  }

  for (let index = 0; index < fishes.length; index += 1) {
    const fish = fishes[index]

    if (fish.eaten) {
      fish.respawnTimer -= delta
      fish.fade = 0
      if (fish.respawnTimer <= 0) respawnPrey(fish, fishes, width, height, random, profile)
      continue
    }
    if (fish.dead) continue

    fish.fade = Math.min(1, fish.fade + delta / predation.fadeSeconds)
    fish.gulp = Math.max(0, fish.gulp - delta * predation.gulpDecay)
    fish.biteCooldown = Math.max(0, fish.biteCooldown - delta)
    fish.wanderRemaining -= delta
    if (fish.wanderRemaining <= 0) {
      fish.targetHeading = normalizeAngle(
        fish.heading + (random() - 0.5) * profile.wanderAngle,
      )
      fish.wanderRemaining = randomWanderSeconds(random, profile)
    }

    const hunting = fish.role === 'predator'
    let target = null
    let targetDistance = 0

    if (hunting) {
      fish.hunger += delta
      if (fish.satiety > 0) {
        fish.satiety = Math.max(0, fish.satiety - delta)
      } else {
        target = nearestPrey(fish, fishes, predation.huntRadius, predation.huntGroups)
        if (target !== null) {
          targetDistance = Math.hypot(target.x - fish.x, target.y - fish.y)
        }
      }
    }

    let desiredX = Math.cos(fish.targetHeading)
    let desiredY = Math.sin(fish.targetHeading)
    /* A mild level-swimming pull keeps a side-view school from standing on its
       tail all the time without breaking nose-to-travel alignment. */
    desiredX += (Math.cos(fish.heading) < 0 ? -1 : 1)
      * schooling.horizontalBias
      * (hunting ? 0.6 : 1)

    if (hunting && target !== null) {
      const distance = Math.max(0.001, targetDistance)
      desiredX = ((target.x - fish.x) / distance) * 3.4
      desiredY = ((target.y - fish.y) / distance) * 3.4
    }

    let threat = null
    let food = null
    if (!hunting) {
      const pointerDistance = pointer?.active === true
        ? Math.hypot(fish.x - pointer.x, fish.y - pointer.y)
        : Infinity
      const pointerFleeing = pointerDistance < schooling.pointerFleeRadius
      const pointerScared = pointerScare && fish.group === 'school'
      threat = nearestPredator(fish, fishes, schooling.fleeRadius)
      if (threat !== null) {
        if (fish.panic <= 0) fish.startle = schooling.startleSeconds
        fish.panic = schooling.panicSeconds
      }
      if (pointerFleeing || pointerScared) {
        /* Keep the burst alive while the mouse is close, so the school really
           darts away instead of only twitching for two frames. */
        fish.startle = Math.max(fish.startle, schooling.startleSeconds)
        fish.panic = Math.max(fish.panic, schooling.pointerPanicSeconds)
      }
      if (threat === null && !pointerFleeing && !pointerScared) {
        fish.panic = Math.max(0, fish.panic - delta)
      }
      fish.startle = Math.max(0, fish.startle - delta)

      /* A panicking school drops cohesion so the fish really scatter instead
         of fleeing as one tight knot. */
      const panicScale = fish.panic > 0 ? schooling.panicCohesionScale : 1
      const stats = groups.get(fish.group)
      const paired = fish.group === 'pair'
      const alignmentWeight = (paired ? schooling.pairAlignmentWeight : schooling.alignmentWeight) * panicScale
      const cohesionWeight = (paired ? schooling.pairCohesionWeight : schooling.cohesionWeight) * panicScale
      if (stats !== undefined && stats.count > 1) {
        desiredX += stats.cos * alignmentWeight
        desiredY += stats.sin * alignmentWeight
        const toCentreX = stats.x - fish.x
        const toCentreY = stats.y - fish.y
        const centreDistance = Math.hypot(toCentreX, toCentreY)
        if (centreDistance > 1) {
          /* A straggler must feel a stronger pull than a fish already inside
             the shoal, otherwise wander slowly shreds the school. */
          const cohesionScale = Math.max(0.15, Math.min(2.2, centreDistance / 70))
          desiredX += (toCentreX / centreDistance) * cohesionWeight * cohesionScale
          desiredY += (toCentreY / centreDistance) * cohesionWeight * cohesionScale
        }
      }

      for (let otherIndex = 0; otherIndex < fishes.length; otherIndex += 1) {
        if (otherIndex === index) continue
        const other = fishes[otherIndex]
        if (!isPrey(other)) continue
        const dx = fish.x - other.x
        const dy = fish.y - other.y
        const distance = Math.hypot(dx, dy)
        if (distance <= 0.001) continue
        const personalSpace = Math.max(
          12,
          (fish.length + other.length) * 0.5 * schooling.personalSpaceFactor,
        )
        let weight = 0
        if (distance < personalSpace) {
          /* Soft-but-steep repulsion, so two fish can never swallow each other. */
          weight = (personalSpace / distance - 1) * schooling.separationStrength
        } else if (distance < schooling.separationRadius) {
          weight = (1 - distance / schooling.separationRadius) * schooling.separationWeight * 2
        }
        if (weight > 0) {
          desiredX += (dx / distance) * weight
          desiredY += (dy / distance) * weight
        }
      }

      if (threat !== null) {
        const dx = fish.x - threat.x
        const dy = fish.y - threat.y
        const distance = Math.max(0.001, Math.hypot(dx, dy))
        const weight = (1 - distance / schooling.fleeRadius) ** 2 * schooling.fleeWeight / distance
        desiredX += dx * weight
        desiredY += dy * weight
      }

      /* A hungry shoal feeds only when it is not running from predator or mouse. */
      if (threat === null && fish.panic <= 0 && world !== null) {
        const corpse = nearestCorpse(fish, world.corpses, feeding.corpseDetectRadius)
        if (corpse !== null) {
          /* Carrion is the big prize: drop the shrimp hunt and converge. */
          food = { kind: 'corpse', entity: corpse, distance: Math.hypot(corpse.x - fish.x, corpse.y - fish.y) }
        } else {
          const shrimp = nearestShrimp(fish, world.shrimps, feeding.shrimpDetectRadius)
          if (shrimp !== null) {
            food = { kind: 'shrimp', entity: shrimp, distance: Math.hypot(shrimp.x - fish.x, shrimp.y - fish.y) }
          }
        }
        if (food !== null) {
          const distance = Math.max(0.001, food.distance)
          const entity = food.entity
          desiredX += ((entity.x - fish.x) / distance) * feeding.foodWeight
          desiredY += ((entity.y - fish.y) / distance) * feeding.foodWeight
        }
      }
    }

    const margin = fish.length * 0.5 + profile.boundaryPadding
    const lookAhead = profile.boundaryLookAhead
    if (fish.x < margin + lookAhead) {
      desiredX += (1 - (fish.x - margin) / lookAhead) * profile.boundaryWeight
    } else if (fish.x > width - margin - lookAhead) {
      desiredX -= (1 - (width - margin - fish.x) / lookAhead) * profile.boundaryWeight
    }
    if (fish.y < margin + lookAhead) {
      desiredY += (1 - (fish.y - margin) / lookAhead) * profile.boundaryWeight
    } else if (fish.y > height - margin - lookAhead) {
      desiredY -= (1 - (height - margin - fish.y) / lookAhead) * profile.boundaryWeight
    }

    if (pointer?.active) {
      const dx = fish.x - pointer.x
      const dy = fish.y - pointer.y
      const distance = Math.max(0.001, Math.hypot(dx, dy))
      if (!hunting) {
        if (distance < schooling.pointerFleeRadius) {
          const weight = (1 - distance / schooling.pointerFleeRadius) ** 2 * schooling.pointerFleeWeight / distance
          desiredX += dx * weight
          desiredY += dy * weight
        }
        if (pointerScare && fish.group === 'school') {
          desiredX += (dx / distance) * schooling.pointerEscapeWeight
          desiredY += (dy / distance) * schooling.pointerEscapeWeight
        }
      }
      const scale = avoidanceScale(
        distance,
        profile.mouseAvoidRadius,
        profile.mouseAvoidWeight,
      )
      desiredX += dx * scale
      desiredY += dy * scale
    }

    const desiredHeading = Math.atan2(desiredY, desiredX)
    const previousHeading = fish.heading
    const turnLimit = (fish.maxTurnRate ?? profile.maxTurnRate)
      * (!hunting && fish.panic > 0 ? schooling.fleeTurnBoost : 1)
    fish.heading = steerAngle(fish.heading, desiredHeading, turnLimit * delta)
    fish.turnRate = clampFish(
      normalizeAngle(fish.heading - previousHeading) / Math.max(delta, 1 / 240),
      -8,
      8,
    )

    let targetSpeed = fish.cruiseSpeed
    let acceleration = 3
    if (hunting) {
      if (target !== null && targetDistance < predation.sprintRadius) {
        targetSpeed = fish.cruiseSpeed * predation.sprintSpeed
        acceleration = predation.sprintAcceleration
      }
    } else if (fish.panic > 0) {
      targetSpeed = fish.cruiseSpeed
        * (fish.startle > 0 ? schooling.startleSpeedBoost : schooling.panicSpeedBoost)
      acceleration = fish.startle > 0 ? 8 : 4
    } else if (food !== null) {
      targetSpeed = fish.cruiseSpeed * feeding.rushSpeed
    }
    fish.speed += (targetSpeed - fish.speed) * Math.min(1, delta * acceleration)
    fish.vx = Math.cos(fish.heading) * fish.speed
    fish.vy = Math.sin(fish.heading) * fish.speed
    fish.x += fish.vx * delta
    fish.y += fish.vy * delta
    applyHardBoundary(fish, width, height, profile)
    fish.vx = Math.cos(fish.heading) * fish.speed
    fish.vy = Math.sin(fish.heading) * fish.speed
    fish.tailPhase += delta * fish.tailFrequency * FULL_TURN
      * (0.9 + 0.25 * (fish.speed / Math.max(1, fish.cruiseSpeed)))

    if (hunting && target !== null && !target.eaten) {
      const biteDistance = predation.biteRadius + target.length * predation.biteLengthFactor
      const mouthX = fish.x + Math.cos(fish.heading) * fish.length * 0.42
      const mouthY = fish.y + Math.sin(fish.heading) * fish.length * 0.42
      if (Math.hypot(target.x - mouthX, target.y - mouthY) <= biteDistance) {
        bitePrey(fish, target, random, profile, effects)
      }
    }

    if (hunting && fish.hunger >= predation.starvationSeconds) {
      killPredator(fish, world, random, profile, effects)
      continue
    }

    if (!hunting && food !== null && world !== null) {
      const entity = food.entity
      if (food.kind === 'shrimp') {
        if (entity.alive) {
          const distance = Math.hypot(entity.x - fish.x, entity.y - fish.y)
          const eatDistance = fish.length * 0.3 + entity.size
          if (distance <= eatDistance) {
            entity.alive = false
            entity.respawnTimer = randomBetween(
              random,
              profile.shrimp.respawnMinSeconds,
              profile.shrimp.respawnMaxSeconds,
            )
            growPrey(fish, feeding.growthPerShrimp, profile)
          }
        }
      } else if (entity.biomass > 0 && fish.biteCooldown <= 0) {
        const distance = Math.hypot(entity.x - fish.x, entity.y - fish.y)
        const biteDistance = entity.length * feeding.corpseBiteRadiusFactor + fish.length * 0.25
        if (distance <= biteDistance) {
          entity.biomass -= 1
          fish.biteCooldown = feeding.corpseBiteCooldown
          growPrey(fish, feeding.growthPerBite, profile)
          if (entity.biomass <= 0) {
            const corpseIndex = world.corpses.indexOf(entity)
            if (corpseIndex !== -1) world.corpses.splice(corpseIndex, 1)
          }
        }
      }
    }
  }
  return fishes
}

function drawBiteEffects(context, effects) {
  for (const effect of effects) {
    const progress = Math.min(1, effect.life / effect.maxLife)
    const radius = effect.size + progress * 20
    context.globalAlpha = (1 - progress) * 0.55
    context.strokeStyle = '#dff2ff'
    context.lineWidth = 1.1
    context.beginPath()
    context.arc(effect.x, effect.y, radius, 0, FULL_TURN)
    context.stroke()
    context.beginPath()
    context.arc(effect.x, effect.y, radius * 0.55, 0, FULL_TURN)
    context.stroke()
  }
  context.globalAlpha = 1
}

function makeFishCanvas() {
  const canvas = document.createElement('canvas')
  canvas.className = 'dsh-harness-official-fish'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.appendChild(canvas)
  return canvas
}

export function createOfficialFishSchool(
  reducedMotion,
  interactionSources,
  profile = OFFICIAL_FISH_PROFILE,
  random = Math.random,
) {
  const canvas = makeFishCanvas()
  const context = canvas.getContext('2d')
  if (context === null) {
    canvas.remove()
    return {
      setEnabled() {},
      getDiagnostics: () => ({
        activeEmitterCount: interactionSources.getActiveCount(),
        fishCount: 0,
        renderer: 'none',
        enabled: false,
      }),
      destroy() {},
    }
  }

  const finePointerQuery = window.matchMedia?.('(hover: hover) and (pointer: fine)')
  let fishes = []
  let world = null
  let bites = []
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
  const pointer = { x: 0, y: 0, active: false }

  const canShow = () => (
    enabled
    && width >= profile.minWidth
    && finePointerQuery?.matches !== false
  )
  const canAnimate = () => canShow() && visible && pageVisible && !reducedMotion

  const draw = () => {
    context.clearRect(0, 0, width, height)
    if (!canShow()) return
    if (world !== null) {
      for (const shrimp of world.shrimps) {
        if (shrimp.alive) drawShrimp(context, shrimp, profile.shrimp.palette)
      }
      for (const corpse of world.corpses) drawFishCorpse(context, corpse)
    }
    for (const fish of fishes) {
      if (!fish.dead) drawOfficialFish(context, fish)
    }
    drawBiteEffects(context, bites)
  }

  const publish = (active) => {
    let predator = null
    let preyCount = 0
    let centreX = 0
    let centreY = 0
    let velocityX = 0
    let velocityY = 0

    for (const fish of fishes) {
      const alive = active && !fish.eaten && !fish.dead
      fish.active = alive
      if (fish.role === 'predator') {
        if (alive) predator = fish
        continue
      }
      if (fish.eaten) continue
      preyCount += 1
      centreX += fish.x
      centreY += fish.y
      velocityX += fish.vx
      velocityY += fish.vy
    }

    if (predator !== null) interactionSources.updateFishSource(0, predator, width, height)
    const school = {
      x: preyCount > 0 ? centreX / preyCount : width * 0.5,
      y: preyCount > 0 ? centreY / preyCount : height * 0.5,
      vx: preyCount > 0 ? velocityX / preyCount : 0,
      vy: preyCount > 0 ? velocityY / preyCount : 0,
      active: active && preyCount > 0,
    }
    interactionSources.updateFishSource(1, school, width, height)
    interactionSources.commitFishSources()
  }

  const stopSources = () => {
    for (const fish of fishes) fish.active = false
    bites.length = 0
    interactionSources.clearFishSources()
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
    if (fishes.length === 0) fishes = createFishStates(width, height, random, profile)
    if (world === null) world = createFishWorld(width, height, random, profile)
    for (const fish of fishes) {
      if (fish.eaten || fish.dead) continue
      const margin = fish.length * 0.5 + profile.boundaryPadding
      fish.x = clampFish(fish.x, margin, Math.max(margin, width - margin))
      fish.y = clampFish(fish.y, margin, Math.max(margin, height - margin))
    }
    for (const shrimp of world.shrimps) {
      shrimp.x = clampFish(shrimp.x, 16, Math.max(16, width - 16))
      shrimp.y = clampFish(shrimp.y, 16, Math.max(16, height - 16))
    }
    for (const corpse of world.corpses) {
      corpse.x = clampFish(corpse.x, 16, Math.max(16, width - 16))
      corpse.y = clampFish(corpse.y, 16, Math.max(16, height - 16))
    }
    canvas.dataset.pixelRatio = String(pixelRatio)
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
    const deltaSeconds = lastFrameTime === 0 ? profile.frameInterval / 1000 : (time - lastFrameTime) / 1000
    lastFrameTime = time - ((time - lastFrameTime) % profile.frameInterval)
    const pointerSource = interactionSources.getSources()[0]
    pointer.x = pointerSource.x * width
    pointer.y = pointerSource.y * height
    pointer.active = pointerSource.active
    advanceFishSchool(fishes, pointer, width, height, deltaSeconds, random, profile, bites, world)
    publish(true)
    draw()
    renderedFrames += 1
    schedule()
  }

  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      resizeTimer = 0
      if (rebuild()) {
        if (canAnimate()) publish(true)
        else stopSources()
      }
      schedule()
    }, profile.resizeDelay)
  }
  const onVisibilityChange = () => {
    pageVisible = document.visibilityState === 'visible'
    if (!pageVisible) {
      window.cancelAnimationFrame(frame)
      frame = 0
      stopSources()
    } else schedule()
  }
  const onPointerCapabilityChange = () => {
    if (!canShow()) stopSources()
    draw()
    schedule()
  }
  const observer = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting !== false
      if (!visible) {
        window.cancelAnimationFrame(frame)
        frame = 0
        stopSources()
      } else schedule()
    })
    : null

  rebuild()
  observer?.observe(canvas)
  window.addEventListener('resize', onResize, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange, { passive: true })
  finePointerQuery?.addEventListener?.('change', onPointerCapabilityChange)

  return {
    setEnabled: (value) => {
      enabled = value === true
      canvas.toggleAttribute('data-disabled', !enabled)
      if (canShow()) {
        draw()
        if (reducedMotion) stopSources()
        else schedule()
      } else {
        window.cancelAnimationFrame(frame)
        frame = 0
        stopSources()
        context.clearRect(0, 0, width, height)
      }
    },
    getDiagnostics: () => {
      const predator = fishes.find(isPredator) ?? null
      return {
        activeEmitterCount: interactionSources.getActiveCount(),
        alivePreyCount: fishes.reduce((count, fish) => count + (isPrey(fish) ? 1 : 0), 0),
        aliveShrimpCount: world === null ? 0 : world.shrimps.reduce((count, shrimp) => count + (shrimp.alive ? 1 : 0), 0),
        biteEffectCount: bites.length,
        corpseCount: world === null ? 0 : world.corpses.length,
        enabled,
        fishCount: fishes.length,
        fishes: fishes.map((fish) => ({
          id: fish.id,
          role: fish.role,
          group: fish.group,
          length: Math.round(fish.length * 10) / 10,
          x: Math.round(fish.x * 10) / 10,
          y: Math.round(fish.y * 10) / 10,
          vx: Math.round(fish.vx * 10) / 10,
          vy: Math.round(fish.vy * 10) / 10,
          speed: Math.round(fish.speed * 10) / 10,
          hunger: Math.round(fish.hunger * 10) / 10,
          dead: fish.dead,
          eaten: fish.eaten,
        })),
        mobileHidden: width < profile.minWidth || finePointerQuery?.matches === false,
        pixelRatio,
        predatorHunger: predator === null ? null : Math.round(predator.hunger * 10) / 10,
        predatorLength: predator === null ? null : Math.round(predator.length * 10) / 10,
        reducedMotion,
        renderedFrames,
        renderer: 'canvas2d',
        running: frame !== 0,
        visible: visible && pageVisible,
      }
    },
    destroy: () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      finePointerQuery?.removeEventListener?.('change', onPointerCapabilityChange)
      observer?.disconnect()
      window.clearTimeout(resizeTimer)
      window.cancelAnimationFrame(frame)
      stopSources()
      bites = []
      world = null
      canvas.remove()
    },
  }
}
