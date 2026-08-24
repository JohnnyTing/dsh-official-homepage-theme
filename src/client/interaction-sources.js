import { OFFICIAL_ELASTIC_GRID_PROFILE } from './elastic-grid-profile.js'
import { OFFICIAL_FISH_PROFILE } from './fish-profile.js'
import { OFFICIAL_FLUID_PROFILE } from './fluid-profile.js'

export const OFFICIAL_INTERACTION_SOURCE_COUNT = 3

function clampInteraction(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function makeSource(id, kind, fluidRadius, fluidStrength, gridRadius, gridStrength) {
  return {
    id,
    kind,
    x: 0.5,
    y: 0.5,
    vx: 0,
    vy: 0,
    active: false,
    fluidRadius,
    fluidStrength,
    gridRadius,
    gridStrength,
  }
}

/**
 * Owns the single browser pointer lifecycle shared by every decorative layer.
 * Sources use top-left normalized viewport coordinates and stable object slots.
 */
export function createOfficialInteractionSources(reducedMotion) {
  const sources = [
    makeSource(
      'pointer',
      'pointer',
      OFFICIAL_FLUID_PROFILE.mouseRadius,
      OFFICIAL_FLUID_PROFILE.mouseStrength,
      OFFICIAL_ELASTIC_GRID_PROFILE.pointerRadius,
      OFFICIAL_ELASTIC_GRID_PROFILE.repulsion,
    ),
    makeSource(
      'fish-a',
      'fish',
      OFFICIAL_FISH_PROFILE.fluidRadius,
      OFFICIAL_FLUID_PROFILE.mouseStrength * OFFICIAL_FISH_PROFILE.fluidStrength,
      OFFICIAL_ELASTIC_GRID_PROFILE.fishRadius,
      OFFICIAL_ELASTIC_GRID_PROFILE.fishRepulsion,
    ),
    makeSource(
      'fish-b',
      'fish',
      OFFICIAL_FISH_PROFILE.fluidRadius,
      OFFICIAL_FLUID_PROFILE.mouseStrength * OFFICIAL_FISH_PROFILE.fluidStrength,
      OFFICIAL_ELASTIC_GRID_PROFILE.fishRadius,
      OFFICIAL_ELASTIC_GRID_PROFILE.fishRepulsion,
    ),
  ]
  const listeners = new Set()
  const finePointerQuery = window.matchMedia?.('(hover: hover) and (pointer: fine)')
  let destroyed = false

  const notify = () => {
    if (destroyed) return
    for (const listener of listeners) listener(sources)
  }
  const canTrackPointer = () => !reducedMotion && finePointerQuery?.matches !== false
  const setPointer = (event) => {
    const pointer = sources[0]
    pointer.x = clampInteraction(event.clientX / Math.max(1, window.innerWidth))
    pointer.y = clampInteraction(event.clientY / Math.max(1, window.innerHeight))
    pointer.active = canTrackPointer()
    notify()
  }
  const stopPointer = () => {
    const pointer = sources[0]
    if (!pointer.active) return
    pointer.active = false
    notify()
  }
  const onVisibilityChange = () => {
    if (document.visibilityState !== 'visible') stopPointer()
  }
  const onPointerCapabilityChange = () => {
    if (!canTrackPointer()) stopPointer()
  }

  window.addEventListener('pointermove', setPointer, { passive: true })
  window.addEventListener('pointerdown', setPointer, { passive: true })
  window.addEventListener('pointerleave', stopPointer, { passive: true })
  window.addEventListener('pointercancel', stopPointer, { passive: true })
  window.addEventListener('blur', stopPointer, { passive: true })
  document.documentElement.addEventListener('pointerleave', stopPointer, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange, { passive: true })
  finePointerQuery?.addEventListener?.('change', onPointerCapabilityChange)

  return {
    getSources: () => sources,
    getActiveCount: () => {
      let count = 0
      for (const source of sources) count += source.active ? 1 : 0
      return count
    },
    updateFishSource: (index, fish, width, height) => {
      const source = sources[index + 1]
      if (source === undefined) return
      source.x = clampInteraction(fish.x / Math.max(1, width))
      source.y = clampInteraction(fish.y / Math.max(1, height))
      source.vx = fish.vx / Math.max(1, width)
      source.vy = fish.vy / Math.max(1, height)
      source.active = fish.active === true
    },
    commitFishSources: notify,
    clearFishSources: () => {
      let changed = false
      for (let index = 1; index < sources.length; index += 1) {
        changed ||= sources[index].active
        sources[index].active = false
        sources[index].vx = 0
        sources[index].vy = 0
      }
      if (changed) notify()
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    },
    destroy: () => {
      destroyed = true
      window.removeEventListener('pointermove', setPointer)
      window.removeEventListener('pointerdown', setPointer)
      window.removeEventListener('pointerleave', stopPointer)
      window.removeEventListener('pointercancel', stopPointer)
      window.removeEventListener('blur', stopPointer)
      document.documentElement.removeEventListener('pointerleave', stopPointer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      finePointerQuery?.removeEventListener?.('change', onPointerCapabilityChange)
      listeners.clear()
    },
  }
}
