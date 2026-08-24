import { OFFICIAL_FISH_PROFILE } from './fish-profile.js'
import { drawOfficialFish } from './fish-drawing.js'

function clampFish(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function normalizeAngle(angle) {
  let normalized = angle
  while (normalized > Math.PI) normalized -= Math.PI * 2
  while (normalized < -Math.PI) normalized += Math.PI * 2
  return normalized
}

function steerAngle(current, target, maxStep) {
  return current + clampFish(normalizeAngle(target - current), -maxStep, maxStep)
}

function randomWanderSeconds(random, profile) {
  return profile.wanderMinSeconds
    + random() * (profile.wanderMaxSeconds - profile.wanderMinSeconds)
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
    tailPhase: index * Math.PI,
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

export function advanceFishSchool(
  fishes,
  pointer,
  width,
  height,
  deltaSeconds,
  random = Math.random,
  profile = OFFICIAL_FISH_PROFILE,
) {
  const delta = clampFish(deltaSeconds, 0, 0.05)

  for (let index = 0; index < fishes.length; index += 1) {
    const fish = fishes[index]
    fish.wanderRemaining -= delta
    if (fish.wanderRemaining <= 0) {
      fish.targetHeading = normalizeAngle(
        fish.heading + (random() - 0.5) * profile.wanderAngle,
      )
      fish.wanderRemaining = randomWanderSeconds(random, profile)
    }

    let desiredX = Math.cos(fish.targetHeading)
    let desiredY = Math.sin(fish.targetHeading)
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
      const scale = avoidanceScale(
        Math.hypot(dx, dy),
        profile.mouseAvoidRadius,
        profile.mouseAvoidWeight,
      )
      desiredX += dx * scale
      desiredY += dy * scale
    }

    for (let otherIndex = 0; otherIndex < fishes.length; otherIndex += 1) {
      if (otherIndex === index) continue
      const other = fishes[otherIndex]
      const dx = fish.x - other.x
      const dy = fish.y - other.y
      const scale = avoidanceScale(
        Math.hypot(dx, dy),
        profile.separationRadius,
        profile.separationWeight,
      )
      desiredX += dx * scale
      desiredY += dy * scale
    }

    const desiredHeading = Math.atan2(desiredY, desiredX)
    fish.heading = steerAngle(fish.heading, desiredHeading, profile.maxTurnRate * delta)
    fish.vx = Math.cos(fish.heading) * fish.speed
    fish.vy = Math.sin(fish.heading) * fish.speed
    fish.x += fish.vx * delta
    fish.y += fish.vy * delta
    applyHardBoundary(fish, width, height, profile)
    fish.vx = Math.cos(fish.heading) * fish.speed
    fish.vy = Math.sin(fish.heading) * fish.speed
    fish.tailPhase += delta * profile.tailFrequency * Math.PI * 2
  }
  return fishes
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
    for (const fish of fishes) drawOfficialFish(context, fish)
  }

  const publish = (active) => {
    for (let index = 0; index < fishes.length; index += 1) {
      fishes[index].active = active
      interactionSources.updateFishSource(index, fishes[index], width, height)
    }
    interactionSources.commitFishSources()
  }

  const stopSources = () => {
    for (const fish of fishes) fish.active = false
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
    for (const fish of fishes) {
      const margin = fish.length * 0.5 + profile.boundaryPadding
      fish.x = clampFish(fish.x, margin, Math.max(margin, width - margin))
      fish.y = clampFish(fish.y, margin, Math.max(margin, height - margin))
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
    advanceFishSchool(fishes, pointer, width, height, deltaSeconds, random, profile)
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
    getDiagnostics: () => ({
      activeEmitterCount: fishes.reduce((count, fish) => count + (fish.active ? 1 : 0), 0),
      enabled,
      fishCount: fishes.length,
      fishes: fishes.map((fish) => ({
        id: fish.id,
        x: Math.round(fish.x * 10) / 10,
        y: Math.round(fish.y * 10) / 10,
        vx: Math.round(fish.vx * 10) / 10,
        vy: Math.round(fish.vy * 10) / 10,
      })),
      mobileHidden: width < profile.minWidth || finePointerQuery?.matches === false,
      pixelRatio,
      reducedMotion,
      renderedFrames,
      renderer: 'canvas2d',
      running: frame !== 0,
      visible: visible && pageVisible,
    }),
    destroy: () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      finePointerQuery?.removeEventListener?.('change', onPointerCapabilityChange)
      observer?.disconnect()
      window.clearTimeout(resizeTimer)
      window.cancelAnimationFrame(frame)
      stopSources()
      canvas.remove()
    },
  }
}
