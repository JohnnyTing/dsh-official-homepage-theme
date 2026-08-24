const freezeColors = (colors) => Object.freeze([...colors])

/**
 * Parameters measured from the current DeepSeek Harness homepage fluid layer.
 * Keeping them together makes visual tuning explicit and prevents shader magic
 * numbers from drifting away from the interaction model.
 */
export const OFFICIAL_FLUID_PROFILE = Object.freeze({
  frameInterval: 1000 / 30,
  flowScale: 0.25,
  maxPixelRatio: 1.5,
  mouseRadius: 0.09,
  mouseStrength: 1.8,
  mouseSmoothing: 0.1,
  mouseVelocity: 0.2,
  interactionSmoothing: 0.16,
  decay: 0.925,
  distortBoost: 2.2,
  swirlBoost: 0.8,
  glowIntensity: 0.13,
  glowColors: freezeColors(['#fff7d1', '#538dca', '#2d448b']),
  speed: 0.28,
  scale: 1.77,
  offsetX: -1.24,
  offsetY: -0.48,
  grain: 0.005,
  colors: freezeColors(['#000000', '#1a3870', '#204a7e', '#eed8aa', '#000000']),
  lightX: 0.89,
  lightY: 0.46,
  lightCore: 0.14,
  lightHalo: 0.2,
  lightFollow: 0.63,
  vignette: 0.38,
  bloomThreshold: 0.61,
  bloomRange: 0.18,
  bloomStrength: 0.4,
})
