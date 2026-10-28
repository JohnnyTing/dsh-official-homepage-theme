window.__ModuleLoader__.load({ id: 'dsh-official-homepage-theme', factory: (require) => {
var module = { exports: {} };
var exports = module.exports;
const OFFICIAL_HARNESS_THEME_CSS = "\nhtml[data-dsh-harness-official-theme] {\n  --dsh-harness-official-intensity: 0.86;\n  /* The host presenter writes the resolved scheme inline, so the replica needs\n     the important flag to keep native scrollbars and form controls dark. */\n  color-scheme: dark !important;\n  background: #071323;\n}\n\nhtml[data-dsh-harness-official-theme] body {\n  position: relative;\n  isolation: isolate;\n  min-height: 100vh;\n  color: var(--dsw-alias-label-primary);\n  background: #071323 !important;\n}\n\nhtml[data-dsh-harness-official-theme] #root {\n  position: relative;\n  z-index: 10;\n  min-height: 100vh;\n  background: transparent !important;\n}\n\nhtml[data-dsh-harness-official-theme] body::before {\n  position: fixed;\n  content: '';\n  inset: 0;\n  pointer-events: none;\n}\n\nhtml[data-dsh-harness-official-theme] body::before {\n  z-index: -2;\n  background-image:\n    radial-gradient(980px 520px at 66% -4%, rgba(195, 216, 220, 0.34), transparent 60%),\n    radial-gradient(760px 460px at 18% 20%, rgba(44, 97, 156, 0.42), transparent 68%),\n    radial-gradient(640px 420px at 54% 52%, rgba(56, 104, 155, 0.22), transparent 72%),\n    radial-gradient(560px 400px at 100% 70%, rgba(219, 221, 203, 0.15), transparent 64%),\n    linear-gradient(180deg, #15375e 0%, #0d2949 42%, #071626 100%);\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-bg,\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-field,\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-fish,\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {\n  position: fixed;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  /* The desktop shell marks every direct body child no-drag, and app-region\n     ignores pointer-events. A viewport-sized decorative layer would cancel\n     every window-drag strip under it (plus the macOS double-click-title\n     zoom), so opt out with the neutral value: initial computes to none,\n     unlike the subtractive no-drag. The flag is required because the\n     shell's body > :not(#root) selector carries an id. */\n  -webkit-app-region: initial !important;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-bg {\n  z-index: -1;\n  overflow: hidden;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-field {\n  z-index: 0;\n  opacity: 1;\n  -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.91) 8.98%, transparent 100%);\n  mask-image: linear-gradient(rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.91) 8.98%, transparent 100%);\n  transition: opacity 180ms ease;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {\n  z-index: 5;\n  opacity: 1;\n  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.78) 58%, transparent 100%);\n  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.78) 58%, transparent 100%);\n  transition: opacity 180ms ease;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-fish {\n  z-index: 2;\n  opacity: 1;\n  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.84) 64%, transparent 100%);\n  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.84) 64%, transparent 100%);\n  transition: opacity 180ms ease;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-fish[data-disabled] {\n  opacity: 0;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid[data-disabled] {\n  opacity: 0;\n}\n\nhtml[data-dsh-harness-official-theme][data-dsh-harness-official-pointer-disabled] .dsh-harness-official-field {\n  opacity: 0 !important;\n}\n\n\nhtml[data-dsh-harness-official-theme] [class*='frame'],\nhtml[data-dsh-harness-official-theme] [class*='centerCol'],\nhtml[data-dsh-harness-official-theme] main {\n  background-color: transparent !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='centerCol'] [class$='_root'] {\n  background-color: transparent !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='centerCol'] > *,\nhtml[data-dsh-harness-official-theme] main > * {\n  border-color: rgba(215, 233, 255, 0.065) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='_markdown_'],\nhtml[data-dsh-harness-official-theme] [class*='flowItem'] {\n  text-shadow: 0 1px 4px rgba(0, 7, 20, 0.72), 0 0 12px rgba(0, 7, 20, 0.38);\n}\n\nhtml[data-dsh-harness-official-theme] [class*='viewArea'] [class*='_scroll'] {\n  background: linear-gradient(180deg, rgba(3, 13, 27, 0.28), rgba(3, 13, 27, 0.42)) !important;\n}\n\nhtml[data-dsh-harness-official-theme] ::selection {\n  color: #071323;\n  background: #d7e8ff;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='sidebarCol'] {\n  background: linear-gradient(180deg, rgba(6, 20, 39, 0.48), rgba(3, 13, 27, 0.62)) !important;\n  border-color: rgba(205, 224, 249, 0.16) !important;\n  box-shadow: inset -1px 0 rgba(255, 255, 255, 0.045), 20px 0 70px rgba(0, 11, 30, 0.18) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='sidebarCol'] [class*='_root '],\nhtml[data-dsh-harness-official-theme] [class*='sidebarCol'] [class$='_root'] {\n  background-color: transparent !important;\n  background-image: none !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='_splitRow_'] > [class*='_divider_']:hover::after {\n  background: linear-gradient(\n    to bottom,\n    transparent,\n    rgba(121, 169, 237, 0.28) 50%,\n    transparent\n  ) center / 1px 100% no-repeat !important;\n}\n\nhtml[data-dsh-harness-official-theme] [role='dialog'] > [class$='_content'] > [class$='_header'],\nhtml[data-dsh-harness-official-theme] [class*='titlebar'],\nhtml[data-dsh-harness-official-theme] [class*='topbar'] {\n  background: rgba(9, 27, 51, 0.34) !important;\n  border-color: rgba(210, 230, 255, 0.14) !important;\n  backdrop-filter: blur(18px) saturate(120%);\n}\n\nhtml[data-dsh-harness-official-theme] [class*='detailsCol'],\nhtml[data-dsh-harness-official-theme] [class*='details'],\nhtml[data-dsh-harness-official-theme] [class*='Details'] {\n  background: linear-gradient(180deg, rgba(12, 32, 58, 0.78), rgba(5, 16, 31, 0.9)) !important;\n  border-color: rgba(203, 223, 250, 0.14) !important;\n  backdrop-filter: blur(20px) saturate(120%);\n}\n\nhtml[data-dsh-harness-official-theme] [data-composer-seat] [class*='_card'],\nhtml[data-dsh-harness-official-theme] [data-composer-seat] [class*='Card'] {\n  color: #eef6ff !important;\n  background: linear-gradient(145deg, #1f3654, #09192f) !important;\n  border-color: rgba(225, 237, 255, 0.14) !important;\n  box-shadow: 0 18px 48px rgba(0, 5, 18, 0.28), inset 0 1px rgba(255, 255, 255, 0.07) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [role='dialog'],\nhtml[data-dsh-harness-official-theme] [class*='popover'],\nhtml[data-dsh-harness-official-theme] [role='menu'],\nhtml[data-dsh-harness-official-theme] [class*='dropdown'] {\n  color: #eef6ff !important;\n  background: linear-gradient(145deg, rgba(32, 55, 84, 0.78), rgba(12, 29, 51, 0.9)) !important;\n  border-color: rgba(225, 237, 255, 0.14) !important;\n  box-shadow: 0 24px 70px rgba(0, 5, 18, 0.34), inset 0 1px rgba(255, 255, 255, 0.07) !important;\n  backdrop-filter: blur(24px) saturate(128%);\n}\n\n\nhtml[data-dsh-harness-official-theme] [class*='composer'] textarea,\nhtml[data-dsh-harness-official-theme] [class*='composer'] input,\nhtml[data-dsh-harness-official-theme] textarea,\nhtml[data-dsh-harness-official-theme] input,\nhtml[data-dsh-harness-official-theme] select {\n  color: #f5f9ff !important;\n  caret-color: #d5e8ff;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='composer'] textarea,\nhtml[data-dsh-harness-official-theme] [class*='composer'] input {\n  background: transparent !important;\n  border-color: transparent !important;\n}\n\nhtml[data-dsh-harness-official-theme] textarea::placeholder,\nhtml[data-dsh-harness-official-theme] input::placeholder {\n  color: rgba(193, 208, 228, 0.72) !important;\n}\n\nhtml[data-dsh-harness-official-theme] button,\nhtml[data-dsh-harness-official-theme] [role='button'] {\n  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, color 160ms ease;\n}\n\nhtml[data-dsh-harness-official-theme] button:hover:not(:disabled),\nhtml[data-dsh-harness-official-theme] [role='button']:hover {\n  background-color: rgba(183, 211, 247, 0.14) !important;\n  border-color: rgba(225, 239, 255, 0.26) !important;\n  box-shadow: inset 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(2, 12, 32, 0.18);\n}\n\n/* The sidebar wordmark is a full-width, borderless button. Keep the shared\n   button hover treatment from painting a rectangle behind the artwork. */\nhtml[data-dsh-harness-official-theme] [class*='_logoRow'] > button[class*='_brand']:hover:not(:disabled) {\n  background: transparent !important;\n  border-color: transparent !important;\n  box-shadow: none !important;\n}\n\nhtml[data-dsh-harness-official-theme] button:active:not(:disabled),\nhtml[data-dsh-harness-official-theme] [role='button']:active {\n  transform: translateY(1px) scale(0.995);\n}\n\nhtml[data-dsh-harness-official-theme] [aria-selected='true']:not([role='tab']),\nhtml[data-dsh-harness-official-theme] [aria-current='true'] {\n  color: #f7fbff !important;\n  background: linear-gradient(135deg, rgba(97, 132, 171, 0.46), rgba(44, 79, 121, 0.42)) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [role='tab'] {\n  background: transparent !important;\n  border-color: transparent !important;\n  box-shadow: none !important;\n}\n\nhtml[data-dsh-harness-official-theme] button[role='tab']:hover:not(:disabled) {\n  background: rgba(105, 154, 218, 0.08) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [role='tab']:focus-visible {\n  outline-color: rgba(121, 169, 237, 0.48) !important;\n  outline-offset: 3px;\n}\n\nhtml[data-dsh-harness-official-theme] button[data-chip='1'][class*='_active_'] {\n  color: #f7fbff !important;\n  background: rgba(105, 154, 218, 0.18) !important;\n  border-color: transparent !important;\n  box-shadow: inset 0 0 0 1px rgba(164, 199, 243, 0.38) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [data-composer-card] button[class$='_add'],\nhtml[data-dsh-harness-official-theme] [data-slot='settings.general.item'] button[class$='_selector'],\nhtml[data-dsh-harness-official-theme] [data-slot='settings.general.item'] button[class*='_themeCube'][aria-pressed='true'] {\n  color: #f6fbff !important;\n  background: linear-gradient(145deg, rgba(92, 119, 151, 0.74), rgba(38, 75, 120, 0.84)) !important;\n  border: 1px solid rgba(224, 238, 255, 0.28) !important;\n  box-shadow: inset 0 1px rgba(255, 255, 255, 0.14), 0 10px 28px rgba(0, 10, 31, 0.26) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='home'],\nhtml[data-dsh-harness-official-theme] [class*='Home'],\nhtml[data-dsh-harness-official-theme] [class*='welcome'],\nhtml[data-dsh-harness-official-theme] [class*='Welcome'] {\n  background-color: transparent !important;\n  background-image: none !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='composer']::before,\nhtml[data-dsh-harness-official-theme] [class*='composer']::after {\n  opacity: 0.16 !important;\n}\n\nhtml[data-dsh-harness-official-theme] pre,\nhtml[data-dsh-harness-official-theme] .md-code-block {\n  overflow: hidden;\n  color: #eef6ff !important;\n  background: linear-gradient(145deg, rgba(32, 52, 75, 0.78), rgba(12, 29, 51, 0.88)) !important;\n  border: 1px solid rgba(224, 237, 255, 0.15) !important;\n  border-radius: 16px;\n  box-shadow: 0 22px 56px rgba(0, 6, 20, 0.32), inset 0 1px rgba(255, 255, 255, 0.07) !important;\n}\n\nhtml[data-dsh-harness-official-theme] pre code,\nhtml[data-dsh-harness-official-theme] code {\n  color: inherit !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='_markdown_'] :not(pre) > code {\n  color: #d8eaff !important;\n  background: rgba(137, 174, 220, 0.17) !important;\n  border: 1px solid rgba(205, 225, 250, 0.12) !important;\n}\n\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-settings {\n  display: grid;\n  grid-template-columns: minmax(240px, 1fr) auto;\n  gap: 12px 20px;\n  align-items: center;\n  width: 100%;\n  min-width: 0;\n  padding: 16px 0;\n  border-top: 1px solid rgba(210, 229, 255, 0.14);\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-copy {\n  display: grid;\n  gap: 4px;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-copy strong {\n  color: #f2f8ff;\n  font-size: 14px;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-copy span,\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-range span {\n  color: rgba(195, 212, 234, 0.82);\n  font-size: 12px;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-switch {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: #e9f4ff;\n  cursor: pointer;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-switch input {\n  width: 16px;\n  height: 16px;\n  accent-color: #c6defe;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-range {\n  display: grid;\n  grid-column: 1 / -1;\n  gap: 8px;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-range input {\n  width: min(360px, 100%);\n  accent-color: #d5e8ff;\n}\n\nhtml[data-dsh-harness-official-theme] ::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n\nhtml[data-dsh-harness-official-theme] ::-webkit-scrollbar-track {\n  background: rgba(5, 14, 27, 0.72);\n}\n\nhtml[data-dsh-harness-official-theme] ::-webkit-scrollbar-thumb {\n  background: linear-gradient(#496d96, #28486e);\n  border: 2px solid rgba(5, 14, 27, 0.72);\n  border-radius: 999px;\n}\n\n@media (max-width: 640px) {\n  html[data-dsh-harness-official-theme] [role='dialog'][class$='_panel'] {\n    flex-direction: column;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_nav'] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_navTitle'] {\n    display: none;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_navList'] {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 10px 12px 8px;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class*='_navCell'] {\n    flex: 0 0 auto;\n    width: auto;\n    min-width: 96px;\n    white-space: nowrap;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_content'] {\n    flex: 1 1 auto;\n    width: 100%;\n    min-width: 0;\n    min-height: 0;\n  }\n\n  html[data-dsh-harness-official-theme] .dsh-harness-official-settings {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 767px), (hover: none), (pointer: coarse) {\n  html[data-dsh-harness-official-theme] .dsh-harness-official-fish,\n  html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {\n    display: none;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  html[data-dsh-harness-official-theme] .dsh-harness-official-field,\n  html[data-dsh-harness-official-theme] .dsh-harness-official-fish,\n  html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid,\n  html[data-dsh-harness-official-theme] button,\n  html[data-dsh-harness-official-theme] [role='button'] {\n    transition: none;\n  }\n}\n";
const freezeColors = (colors) => Object.freeze([...colors])

/**
 * Parameters measured from the current DeepSeek Harness homepage fluid layer.
 * Keeping them together makes visual tuning explicit and prevents shader magic
 * numbers from drifting away from the interaction model.
 */
const OFFICIAL_FLUID_PROFILE = Object.freeze({
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

const FLUID_VERTEX_SHADER = `#version 300 es
precision highp float;
out vec2 v_uv;

void main() {
  vec2 positions[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  vec2 position = positions[gl_VertexID];
  v_uv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

const FLOW_FRAGMENT_SHADER = `#version 300 es
precision highp float;
const int EMITTER_COUNT = 3;
uniform sampler2D u_previous;
uniform vec2 u_emitters[EMITTER_COUNT];
uniform vec2 u_velocities[EMITTER_COUNT];
uniform float u_radii[EMITTER_COUNT];
uniform float u_strengths[EMITTER_COUNT];
uniform float u_decay;
in vec2 v_uv;
out vec4 out_color;

void main() {
  vec4 previous = texture(u_previous, v_uv);
  previous.r *= u_decay;
  previous.gb = mix(vec2(0.5), previous.gb, u_decay);

  for (int emitterIndex = 0; emitterIndex < EMITTER_COUNT; emitterIndex += 1) {
    float radius = u_radii[emitterIndex];
    float strength = u_strengths[emitterIndex];
    float distanceToEmitter = distance(v_uv, u_emitters[emitterIndex]);
    float influence = exp(
      -distanceToEmitter * distanceToEmitter / max(0.0001, radius * radius * 0.5)
    );
    influence = max(0.0, influence - 0.01);

    float speed = length(u_velocities[emitterIndex]);
    float presenceStrength = strength * 0.3;
    float velocityBonus = min(speed * 3.0, 0.7) * strength;
    float totalStrength = presenceStrength + velocityBonus;

    previous.r = max(previous.r, influence * totalStrength);
    float directionBlend = influence * min(totalStrength, 0.4) * 0.3;
    previous.g = mix(
      previous.g,
      clamp(u_velocities[emitterIndex].x * 2.0 + 0.5, 0.0, 1.0),
      directionBlend
    );
    previous.b = mix(
      previous.b,
      clamp(u_velocities[emitterIndex].y * 2.0 + 0.5, 0.0, 1.0),
      directionBlend
    );
  }
  out_color = previous;
}`

const FLUID_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D u_flow;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_scale;
uniform vec2 u_offset;
uniform float u_grain;
uniform float u_distortBoost;
uniform float u_swirlBoost;
uniform float u_glowIntensity;
uniform vec3 u_glowColor1;
uniform vec3 u_glowColor2;
uniform vec3 u_glowColor3;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform vec3 u_color5;
uniform vec2 u_lightPos;
uniform float u_lightCore;
uniform float u_lightHalo;
uniform float u_vignette;
uniform float u_bloomThreshold;
uniform float u_bloomRange;
uniform float u_bloomStrength;
uniform float u_intensity;
in vec2 v_uv;
out vec4 out_color;

vec3 mod289(vec3 value) {
  return value - floor(value * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 value) {
  return value - floor(value * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 value) {
  return mod289(((value * 34.0) + 1.0) * value);
}

vec4 taylorInvSqrt(vec4 value) {
  return 1.79284291400159 - 0.85373472095314 * value;
}

float simplexNoise(vec3 value) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 cell = floor(value + dot(value, C.yyy));
  vec3 x0 = value - cell + dot(cell, C.xxx);
  vec3 stepMask = step(x0.yzx, x0.xyz);
  vec3 inverseMask = 1.0 - stepMask;
  vec3 i1 = min(stepMask.xyz, inverseMask.zxy);
  vec3 i2 = max(stepMask.xyz, inverseMask.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  cell = mod289(cell);
  vec4 permutation = permute(
    permute(
      permute(cell.z + vec4(0.0, i1.z, i2.z, 1.0))
      + cell.y + vec4(0.0, i1.y, i2.y, 1.0)
    ) + cell.x + vec4(0.0, i1.x, i2.x, 1.0)
  );
  float scale = 0.142857142857;
  vec3 ns = scale * D.wyz - D.xzx;
  vec4 j = permutation - 49.0 * floor(permutation * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 normalization = taylorInvSqrt(vec4(
    dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)
  ));
  p0 *= normalization.x;
  p1 *= normalization.y;
  p2 *= normalization.z;
  p3 *= normalization.w;
  vec4 falloff = max(0.6 - vec4(
    dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)
  ), 0.0);
  falloff *= falloff;
  return 42.0 * dot(falloff * falloff, vec4(
    dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)
  ));
}

float hash21(vec2 point) {
  vec3 value = fract(vec3(point.xyx) * 0.1031);
  value += dot(value, value.yzx + 33.33);
  return fract((value.x + value.y) * value.z);
}

float fbm(vec3 point) {
  float value = 0.0;
  float amplitude = 0.6;
  vec3 shift = vec3(100.0);
  for (int octave = 0; octave < 1; octave += 1) {
    value += amplitude * simplexNoise(point);
    point = point * 2.0 + shift;
    amplitude *= 0.4;
  }
  return value;
}

float fluidNoise(vec2 uv, float time) {
  float n1 = fbm(vec3(uv * 0.6, time * 0.06));
  float n2 = fbm(vec3(uv * 0.6 + 5.2, time * 0.06 + 1.3));
  vec2 firstWarp = vec2(n1, n2) * 0.6;
  float n3 = fbm(vec3((uv + firstWarp) * 0.7 + 1.7, time * 0.05 + 3.1));
  float n4 = fbm(vec3((uv + firstWarp) * 0.7 + 9.2, time * 0.05 + 5.7));
  vec2 secondWarp = vec2(n3, n4) * 0.5;
  return fbm(vec3((uv + firstWarp + secondWarp) * 0.5, time * 0.04));
}

vec2 curlish(vec2 uv, float time) {
  float epsilon = 0.02;
  float center = simplexNoise(vec3(uv * 0.8, time));
  float dx = simplexNoise(vec3((uv + vec2(epsilon, 0.0)) * 0.8, time));
  float dy = simplexNoise(vec3((uv + vec2(0.0, epsilon)) * 0.8, time));
  return vec2(-(dy - center) / epsilon, (dx - center) / epsilon) * 0.003;
}

void main() {
  float aspect = u_resolution.x / max(1.0, u_resolution.y);
  vec2 uv = v_uv;
  vec2 suv = vec2(uv.x * aspect, uv.y) * u_scale + u_offset;
  vec4 flow = texture(u_flow, uv);
  float influence = flow.r;
  vec2 flowDir = (flow.gb - 0.5) * 2.0;

  suv += flowDir * influence * u_distortBoost * 0.8;
  float swirlAngle = influence * u_swirlBoost * 2.5;
  float cosine = cos(swirlAngle);
  float sine = sin(swirlAngle);
  vec2 anchor = vec2(uv.x * aspect, uv.y) * u_scale;
  vec2 delta = suv - anchor;
  suv += (mat2(cosine, sine, -sine, cosine) * delta - delta) * influence;

  vec2 curl = curlish(suv, u_time * 0.04);
  vec2 distortedUv = suv + curl * 12.0;
  float fluid = fluidNoise(distortedUv, u_time);
  float swirl = simplexNoise(vec3(distortedUv * 0.8 + fluid * 1.5, u_time * 0.035)) * 0.5 + 0.5;
  float noiseValue = fluid * 0.5 + 0.5;

  vec3 color = mix(u_color1, u_color2, smoothstep(0.2, 0.5, noiseValue));
  color = mix(color, u_color3, smoothstep(0.35, 0.65, noiseValue + swirl * 0.25));
  color = mix(color, u_color4, smoothstep(0.6, 0.85, swirl) * 0.55);
  color = mix(color, u_color5, smoothstep(0.5, 0.8, noiseValue * swirl) * 0.35);

  float glow = smoothstep(0.0, 0.8, influence);
  float glowNoise = simplexNoise(vec3(distortedUv * 1.5, u_time * 0.08)) * 0.5 + 0.5;
  float glowDistance = smoothstep(0.0, 1.0, influence);
  vec3 glowMix = mix(u_glowColor3, u_glowColor2, glowDistance);
  glowMix = mix(glowMix, u_glowColor1, glowDistance * glowNoise);
  color = mix(color, glowMix, glow * u_glowIntensity * u_intensity);

  if (u_grain > 0.0) {
    vec2 flowOffset = (distortedUv - suv) * u_resolution.y;
    vec2 grainCell = floor((gl_FragCoord.xy + flowOffset) / 5.0);
    color += (hash21(grainCell) * 2.0 - 1.0) * u_grain;
  }

  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float bloom = smoothstep(
    u_bloomThreshold - u_bloomRange,
    u_bloomThreshold + u_bloomRange,
    luminance
  );
  color += (color * 0.85 + vec3(0.15, 0.145, 0.13))
    * bloom * u_bloomStrength * mix(0.72, 1.0, u_intensity);

  float lightDistance = length((uv - u_lightPos) * vec2(aspect, 1.0));
  float lightCore = exp(-lightDistance * lightDistance * 4.5);
  float lightHalo = exp(-lightDistance * 1.8);
  color += vec3(1.0, 0.97, 0.9) * lightCore * u_lightCore * u_intensity;
  color += vec3(0.72, 0.8, 1.0) * lightHalo * u_lightHalo * u_intensity;

  float vignette = 1.0 - smoothstep(0.35, 0.75, length(uv - 0.5));
  color = mix(color * (1.0 - u_vignette), color, vignette);
  out_color = vec4(color, 1.0);
}`

const freezePalette = (palette) => Object.freeze({ ...palette })

const freezeFish = (fish) => Object.freeze({
  ...fish,
  palette: freezePalette(fish.palette),
  bars: fish.bars ? Object.freeze([...fish.bars]) : undefined,
})

const SCHOOL_BLUE = {
  back: '#12334d',
  upper: '#2f6392',
  flank: '#6aa4cf',
  sheen: '#8fbfdc',
  belly: '#b7d6e8',
  fin: '#5b93bd',
  finEdge: '#a8d0e8',
  rim: '#cfe9f8',
  detail: '#0b2237',
  eye: '#061019',
  iris: '#bfe2fb',
}

const SCHOOL_TEAL = {
  back: '#123a48',
  upper: '#2f7185',
  flank: '#67b3c2',
  sheen: '#94d4dd',
  belly: '#c4e7ec',
  fin: '#5aa3b2',
  finEdge: '#a7dbe3',
  rim: '#d6f3f8',
  detail: '#0a2630',
  eye: '#041014',
  iris: '#c9f0f5',
}

const GOLD_DEEP = {
  back: '#544216',
  upper: '#8a6f34',
  flank: '#cdaa55',
  sheen: '#d3b76a',
  belly: '#ddc98f',
  fin: '#b99a50',
  finEdge: '#e0cb8c',
  rim: '#f7e7b3',
  detail: '#332711',
  eye: '#140d03',
  iris: '#f5dc9a',
}

const GOLD_LIGHT = {
  back: '#5f4c1c',
  upper: '#9a7c3c',
  flank: '#d8b866',
  sheen: '#e3ca83',
  belly: '#ead8a4',
  fin: '#c6a75c',
  finEdge: '#ecd9a0',
  rim: '#faedc2',
  detail: '#382b13',
  eye: '#150e04',
  iris: '#f7e2a8',
}

/* A perch-like predator: olive back, bronze flank and dark vertical bars. */
const PREDATOR = {
  back: '#1c2b1c',
  upper: '#4d5b2c',
  flank: '#a99a5e',
  sheen: '#cfc489',
  belly: '#e3dbb6',
  fin: '#7c7c45',
  finEdge: '#bdb580',
  rim: '#d5cf9c',
  detail: '#141c11',
  eye: '#080c06',
  iris: '#d4cb7a',
  bar: '#1a291b',
}

const SCHOOL_PALETTES = Object.freeze([SCHOOL_BLUE, SCHOOL_TEAL])
const GOLD_PALETTES = Object.freeze([GOLD_DEEP, GOLD_LIGHT])

function schoolFish(id, index, length, speed, tailFrequency, swimAmplitude, palette, initialX, initialY, initialHeading) {
  return freezeFish({
    id,
    role: 'prey',
    group: 'school',
    length,
    speed,
    maxTurnRate: 2.5,
    tailFrequency,
    swimAmplitude,
    opacity: 0.85 + index * 0.005,
    palette,
    initialX,
    initialY,
    initialHeading,
  })
}

function goldFish(id, index, length, speed, tailFrequency, swimAmplitude, palette, initialX, initialY, initialHeading) {
  return freezeFish({
    id,
    role: 'prey',
    group: 'pair',
    length,
    speed,
    maxTurnRate: 2.05,
    tailFrequency,
    swimAmplitude,
    opacity: 0.9,
    bodyDepthScale: 1.04,
    palette,
    initialX,
    initialY,
    initialHeading,
  })
}

const OFFICIAL_FISH_PROFILE = Object.freeze({
  frameInterval: 1000 / 30,
  maxPixelRatio: 2,
  minWidth: 768,
  resizeDelay: 150,
  boundaryPadding: 12,
  boundaryLookAhead: 72,
  boundaryWeight: 2.8,
  mouseAvoidRadius: 150,
  mouseAvoidWeight: 2.4,
  maxTurnRate: 1.9,
  wanderAngle: Math.PI * 0.55,
  wanderMinSeconds: 1.4,
  wanderMaxSeconds: 3.4,
  tailFrequency: 2.2,
  fluidRadius: 0.065,
  fluidStrength: 0.55,
  schooling: Object.freeze({
    separationRadius: 38,
    separationWeight: 1,
    personalSpaceFactor: 0.72,
    separationStrength: 8,
    alignmentWeight: 1.2,
    cohesionWeight: 0.9,
    pairAlignmentWeight: 1.35,
    pairCohesionWeight: 1,
    horizontalBias: 0.4,
    fleeRadius: 160,
    fleeWeight: 4.6,
    panicSeconds: 1.5,
    panicSpeedBoost: 1.35,
    startleSeconds: 0.45,
    startleSpeedBoost: 1.85,
    fleeTurnBoost: 1.5,
    pointerScareRadius: 260,
    pointerFleeRadius: 170,
    pointerFleeWeight: 8,
    pointerEscapeWeight: 4,
    pointerPanicSeconds: 1.8,
    panicCohesionScale: 0.05,
  }),
  predation: Object.freeze({
    huntRadius: 340,
    huntGroups: Object.freeze(['school']),
    biteRadius: 15,
    biteLengthFactor: 0.16,
    satietySeconds: 5,
    gulpDecay: 1.4,
    respawnMinSeconds: 4,
    respawnMaxSeconds: 7,
    sprintSpeed: 1.8,
    sprintRadius: 280,
    sprintAcceleration: 6,
    starvationSeconds: 20,
    initialHungerSeconds: 8,
    growthPerMeal: 3,
    maxLength: 96,
    successorDelaySeconds: 12,
    newPredatorLength: 56,
    fadeSeconds: 0.8,
    effectSeconds: 0.55,
  }),
  feeding: Object.freeze({
    foodWeight: 1.8,
    growthPerShrimp: 0.45,
    growthPerBite: 1,
    maxPreyLength: 46,
    rushSpeed: 1.45,
    shrimpDetectRadius: 150,
    shrimpEatFactor: 0.55,
    corpseDetectRadius: 900,
    corpseBiteRadiusFactor: 0.35,
    corpseBiteCooldown: 0.6,
    corpseBitesPerLength: 0.16,
    corpseMinBiomass: 6,
  }),
  shrimp: Object.freeze({
    count: 7,
    length: 14,
    speed: 9,
    respawnMinSeconds: 7,
    respawnMaxSeconds: 12,
    palette: Object.freeze({
      body: '#e2bd94',
      shell: '#f6e2c4',
      detail: '#4a321c',
      eye: '#1a1008',
    }),
  }),
  corpse: Object.freeze({
    palette: Object.freeze({
      back: '#303532',
      upper: '#62665a',
      flank: '#aaa995',
      sheen: '#cbc8b5',
      belly: '#dedbca',
      fin: '#818575',
      finEdge: '#bab8a6',
      rim: '#d1ceb9',
      detail: '#1c1f1a',
      eye: '#0f110d',
      iris: '#aaa995',
      bar: '#252924',
    }),
  }),
  fish: Object.freeze([
    freezeFish({
      id: 'predator',
      role: 'predator',
      group: 'predator',
      length: 68,
      speed: 50,
      maxTurnRate: 2.35,
      tailFrequency: 1.7,
      swimAmplitude: 0.045,
      bodyDepthScale: 1.32,
      opacity: 0.95,
      palette: PREDATOR,
      bars: [0.28, 0.38, 0.48, 0.58, 0.68, 0.78],
      initialX: 0.62,
      initialY: 0.32,
      initialHeading: 2.6,
    }),

    schoolFish('school-1', 0, 30, 38, 3.0, 0.088, SCHOOL_PALETTES[0], 0.3, 0.5, 0.2),
    schoolFish('school-2', 1, 28, 41, 3.25, 0.094, SCHOOL_PALETTES[1], 0.34, 0.44, 0.8),
    schoolFish('school-3', 2, 33, 36, 2.9, 0.084, SCHOOL_PALETTES[0], 0.27, 0.57, -0.4),
    schoolFish('school-4', 3, 27, 42, 3.35, 0.096, SCHOOL_PALETTES[1], 0.37, 0.55, 1.2),
    schoolFish('school-5', 4, 35, 35, 2.85, 0.082, SCHOOL_PALETTES[0], 0.24, 0.43, -0.8),
    schoolFish('school-6', 5, 29, 40, 3.15, 0.09, SCHOOL_PALETTES[1], 0.32, 0.63, 0.5),
    schoolFish('school-7', 6, 32, 37, 3.05, 0.086, SCHOOL_PALETTES[0], 0.29, 0.36, -0.2),
    schoolFish('school-8', 7, 26, 40, 3.2, 0.092, SCHOOL_PALETTES[1], 0.35, 0.6, 1.0),
    schoolFish('school-9', 8, 34, 35, 2.95, 0.084, SCHOOL_PALETTES[0], 0.39, 0.48, 0.4),

    goldFish('pair-1', 0, 44, 34, 2.3, 0.07, GOLD_PALETTES[0], 0.72, 0.64, 2.9),
    goldFish('pair-2', 1, 39, 36, 2.4, 0.072, GOLD_PALETTES[1], 0.77, 0.7, 3.2),
  ]),
})

const OFFICIAL_ELASTIC_GRID_PROFILE = Object.freeze({
  spacing: 90,
  lineWidth: 0.5,
  lineOpacity: 0.08,
  pointOpacity: 0.08,
  pointRadius: 1,
  activePointOpacity: 0.28,
  activePointRadius: 2.2,
  pointerRadius: 140,
  repulsion: 2.8,
  fishRadius: 90,
  fishRepulsion: 1.4,
  spring: 0.05,
  damping: 0.85,
  maxDisplacement: 38,
  sleepVelocity: 0.01,
  sleepMovement: 0.01,
  sleepFrames: 4,
  frameInterval: 1000 / 30,
  maxPixelRatio: 2,
  resizeDelay: 150,
  minWidth: 768,
})


const OFFICIAL_INTERACTION_SOURCE_COUNT = 3

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
function createOfficialInteractionSources(reducedMotion) {
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
      'fish-predator',
      'fish',
      OFFICIAL_FISH_PROFILE.fluidRadius,
      OFFICIAL_FLUID_PROFILE.mouseStrength * OFFICIAL_FISH_PROFILE.fluidStrength,
      OFFICIAL_ELASTIC_GRID_PROFILE.fishRadius,
      OFFICIAL_ELASTIC_GRID_PROFILE.fishRepulsion,
    ),
    makeSource(
      'fish-school',
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
function advancePointerMotion(motion, target, profile = OFFICIAL_FLUID_PROFILE) {
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

function createOfficialPointerField(reducedMotion, interactionSources) {
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

const TAU = Math.PI * 2

/* Every fish is drawn in a local frame where +x points at the snout, +y points
   at the belly and the caller has already translated to the fish and rotated
   by its heading. Lengths below are fractions of `fish.length`; at the 44 px
   size used on the homepage that is the only scale where anatomy still reads,
   so the silhouette and the shading carry most of the realism. */
const SNOUT_X = 0.5
const PEDUNCLE_X = -0.44
const BODY_SPAN = SNOUT_X - PEDUNCLE_X
const BODY_SAMPLES = 36
/* One body wave runs from the head to the tail. The phase lag makes the tail
   answer the head instead of the whole fish wagging as one rigid piece. */
const BODY_WAVE = 4

/* Half body depth as a fraction of the body length, from the snout (0) to the
   caudal peduncle (1). The deepest point sits just behind the head, and the
   taper into a narrow peduncle gives the tail fin a real joint to hang from. */
const BODY_DEPTH_PROFILE = Object.freeze([
  [0, 0.007],
  [0.02, 0.022],
  [0.06, 0.054],
  [0.12, 0.081],
  [0.2, 0.097],
  [0.3, 0.107],
  [0.42, 0.112],
  [0.55, 0.106],
  [0.66, 0.095],
  [0.77, 0.076],
  [0.86, 0.059],
  [0.93, 0.042],
  [1, 0.029],
])

function withAlpha(hex, alpha) {
  const value = parseInt(hex.slice(1), 16)
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`
}

function cubicHermite(start, startSlope, end, endSlope, t) {
  const squared = t * t
  const cubed = squared * t
  return (2 * cubed - 3 * squared + 1) * start
    + (cubed - 2 * squared + t) * startSlope
    + (-2 * cubed + 3 * squared) * end
    + (cubed - squared) * endSlope
}

/** Half body depth (as a fraction of body length) at `progress` from snout to peduncle. */
function fishBodyHalfDepth(progress) {
  const anchored = Math.min(1, Math.max(0, progress))
  const keys = BODY_DEPTH_PROFILE
  let index = 0
  while (index < keys.length - 2 && anchored > keys[index + 1][0]) index += 1
  const start = keys[index]
  const end = keys[index + 1]
  const span = end[0] - start[0]
  const previous = keys[Math.max(0, index - 1)]
  const next = keys[Math.min(keys.length - 1, index + 2)]
  const local = span === 0 ? 0 : (anchored - start[0]) / span
  const startSlope = index === 0 ? 0 : ((end[1] - previous[1]) / (end[0] - previous[0])) * span
  const endSlope = index + 1 === keys.length - 1
    ? 0
    : ((next[1] - start[1]) / (next[0] - start[0])) * span
  const depth = cubicHermite(start[1], startSlope, end[1], endSlope, local)
  return Math.min(0.13, Math.max(0.005, depth))
}

/* The swimming wave: the tail sweeps the most, the head barely moves, and the
   offset lags along the body so a travelling S-curve is visible mid-stroke. */
function fishSpineWave(progress, phase) {
  const envelope = 0.09 + 0.91 * progress ** 1.2
  return envelope * Math.sin(phase - BODY_WAVE * progress)
}

function buildFishSpine(fish, length) {
  const amplitude = length * (fish.swimAmplitude ?? 0.058)
  const depthScale = fish.bodyDepthScale ?? 1
  const points = []

  for (let index = 0; index <= BODY_SAMPLES; index += 1) {
    const progress = index / BODY_SAMPLES
    points.push({
      progress,
      x: (SNOUT_X - BODY_SPAN * progress) * length,
      y: amplitude * fishSpineWave(progress, fish.tailPhase),
      halfDepth: length * fishBodyHalfDepth(progress) * depthScale,
    })
  }

  for (let index = 0; index < points.length; index += 1) {
    const point = points[index]
    const previous = points[Math.max(0, index - 1)]
    const next = points[Math.min(points.length - 1, index + 1)]
    let tangentX = next.x - previous.x
    let tangentY = next.y - previous.y
    const magnitude = Math.hypot(tangentX, tangentY) || 1
    tangentX /= magnitude
    tangentY /= magnitude
    /* Central differences make the normals follow the bent spine. The dorsal
       (up) normal is all that is needed: the ventral side is its mirror. */
    point.tangentX = tangentX
    point.tangentY = tangentY
    point.normalX = -tangentY
    point.normalY = tangentX
    point.dorsal = {
      x: point.x + point.normalX * point.halfDepth,
      y: point.y + point.normalY * point.halfDepth,
    }
    point.ventral = {
      x: point.x - point.normalX * point.halfDepth,
      y: point.y - point.normalY * point.halfDepth,
    }
  }

  return points
}

/* Quadratic midpoint smoothing keeps the sampled silhouette smooth even when a
   fish is inspected at several times its rendered size. */
function traceSmoothSegment(target, points, startWithMove) {
  if (points.length === 0) return
  if (startWithMove) target.moveTo(points[0].x, points[0].y)
  else target.lineTo(points[0].x, points[0].y)
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index]
    const next = points[index + 1]
    target.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2)
  }
  const last = points[points.length - 1]
  target.lineTo(last.x, last.y)
}

function buildBodyPath(spine, length) {
  const dorsal = spine.map((point) => point.dorsal)
  const ventral = spine.map((point) => point.ventral).reverse()
  const tail = spine[spine.length - 1]
  const path = new Path2D()

  traceSmoothSegment(path, dorsal, true)
  /* A short round peduncle cap instead of a point: the tail fin then reads as
     a joint rather than a triangle glued onto the body. */
  path.quadraticCurveTo(tail.x - length * 0.006, tail.y, ventral[0].x, ventral[0].y)
  traceSmoothSegment(path, ventral, false)
  /* Rounded snout: the outline bulges forward past the last spine sample and
     closes without a flat cut at the mouth. */
  path.quadraticCurveTo(
    length * (SNOUT_X + 0.005),
    spine[0].y,
    dorsal[0].x,
    dorsal[0].y,
  )
  path.closePath()
  return path
}

function drawCaudalFin(context, fish, spine, length) {
  const palette = fish.palette
  const tail = spine[spine.length - 1]
  const direction = Math.atan2(tail.tangentY, tail.tangentX)
  /* The fin trails the peduncle slightly; that lag is what makes a tail beat
     look like water pushing back on the fin instead of a rigid hinge. */
  const lag = Math.sin(fish.tailPhase - BODY_WAVE - 0.5) * 0.12
  const halfDepth = length * 0.032 * (fish.bodyDepthScale ?? 1)

  context.save()
  context.translate(tail.x, tail.y)
  context.rotate(direction + lag)
  /* Tuck the fin root into the peduncle so no dark seam opens at the joint. */
  context.translate(-length * 0.014, 0)

  /* Design frame: +x points away from the body and +y is dorsal. The fork is
     shallow with pointed lobes, which keeps it a fin instead of a fan. */
  const fin = new Path2D()
  fin.moveTo(0, halfDepth)
  fin.bezierCurveTo(length * 0.02, length * 0.058, length * 0.07, length * 0.092, length * 0.148, length * 0.108)
  fin.bezierCurveTo(length * 0.164, length * 0.112, length * 0.17, length * 0.104, length * 0.165, length * 0.092)
  fin.bezierCurveTo(length * 0.146, length * 0.062, length * 0.126, length * 0.034, length * 0.104, length * 0.008)
  fin.bezierCurveTo(length * 0.127, -length * 0.028, length * 0.147, -length * 0.056, length * 0.16, -length * 0.082)
  fin.bezierCurveTo(length * 0.167, -length * 0.094, length * 0.162, -length * 0.102, length * 0.147, -length * 0.098)
  fin.bezierCurveTo(length * 0.08, -length * 0.073, length * 0.022, -length * 0.048, 0, -halfDepth)
  fin.closePath()

  const membrane = context.createLinearGradient(0, 0, length * 0.17, 0)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.84))
  membrane.addColorStop(0.55, withAlpha(palette.fin, 0.64))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.4))
  context.globalAlpha = fish.opacity
  context.fillStyle = membrane
  context.fill(fin)
  context.strokeStyle = withAlpha(palette.finEdge, 0.12)
  context.lineWidth = Math.max(0.4, length * 0.008)
  context.stroke(fin)

  if (length >= 24) {
    /* Rays stay inside the membrane, so they read as fin structure rather
       than as a wire fan floating behind the fish. */
    const rayFade = context.createLinearGradient(0, 0, length * 0.17, 0)
    rayFade.addColorStop(0, withAlpha(palette.finEdge, 0.32))
    rayFade.addColorStop(1, withAlpha(palette.finEdge, 0.03))
    context.clip(fin)
    context.globalAlpha = fish.opacity * 0.5
    context.strokeStyle = rayFade
    context.lineWidth = Math.max(0.32, length * 0.006)
    for (let ray = 1; ray <= 9; ray += 1) {
      const spread = (ray / 10) * 2 - 1
      context.beginPath()
      context.moveTo(length * 0.012, spread * halfDepth * 0.55)
      context.quadraticCurveTo(
        length * 0.12,
        spread * length * 0.07,
        length * 0.168,
        spread * length * 0.104,
      )
      context.stroke()
    }
  }

  context.restore()
}

function drawDorsalFin(context, fish, spine, length) {
  const palette = fish.palette
  const from = Math.round(0.55 * BODY_SAMPLES)
  const to = Math.round(0.75 * BODY_SAMPLES)
  const height = length * 0.14
  const base = []
  const edge = []
  for (let index = from; index <= to; index += 1) {
    const point = spine[index]
    const progress = (index - from) / (to - from)
    /* Zero at both ends of the base, tallest in the rear third, and swept back
       along the body tangent so a turning fish keeps the fin attached. */
    const shape = Math.sin(Math.PI * Math.min(1, progress ** 1.35)) ** 0.85
    base.push({
      x: point.dorsal.x - point.normalX * length * 0.008,
      y: point.dorsal.y - point.normalY * length * 0.008,
    })
    const sway = Math.sin(fish.tailPhase - 0.6) * length * 0.005 * shape
    edge.push({
      x: point.dorsal.x + point.normalX * height * shape + point.tangentX * (length * 0.02 * shape + sway),
      y: point.dorsal.y + point.normalY * height * shape + point.tangentY * (length * 0.02 * shape + sway),
    })
  }

  context.beginPath()
  traceSmoothSegment(context, base, true)
  traceSmoothSegment(context, edge.slice().reverse(), false)
  context.closePath()

  const membrane = context.createLinearGradient(0, base[0].y, 0, base[0].y - height)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.74))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.36))
  context.globalAlpha = fish.opacity
  context.fillStyle = membrane
  context.fill()
  context.strokeStyle = withAlpha(palette.finEdge, 0.12)
  context.lineWidth = Math.max(0.35, length * 0.007)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.22
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.3, length * 0.006)
  context.beginPath()
  traceSmoothSegment(context, base, true)
  context.stroke()
  /* The trailing ray is the firmest, and the rays fade toward the outer edge. */
  context.globalAlpha = fish.opacity * 0.5
  context.strokeStyle = withAlpha(palette.finEdge, 0.42)
  context.beginPath()
  context.moveTo(edge[edge.length - 1].x, edge[edge.length - 1].y)
  context.lineTo(base[base.length - 1].x, base[base.length - 1].y)
  context.stroke()

  if (length >= 24) {
    context.globalAlpha = fish.opacity * 0.2
    context.strokeStyle = withAlpha(palette.finEdge, 0.85)
    context.lineWidth = Math.max(0.3, length * 0.006)
    for (let ray = 1; ray <= 6; ray += 1) {
      const position = Math.round((ray / 7) * (base.length - 1))
      context.beginPath()
      context.moveTo(base[position].x, base[position].y)
      context.lineTo(edge[position].x, edge[position].y)
      context.stroke()
    }
  }
}

function drawAnalFin(context, fish, spine, length) {
  const palette = fish.palette
  const from = Math.round(0.72 * BODY_SAMPLES)
  const to = Math.round(0.9 * BODY_SAMPLES)
  const height = length * 0.1
  const base = []
  const edge = []
  for (let index = from; index <= to; index += 1) {
    const point = spine[index]
    const progress = (index - from) / (to - from)
    const shape = Math.sin(Math.PI * Math.min(1, progress ** 1.3)) ** 0.85
    base.push({
      x: point.ventral.x + point.normalX * length * 0.008,
      y: point.ventral.y + point.normalY * length * 0.008,
    })
    const sway = Math.sin(fish.tailPhase - 0.6) * length * 0.004 * shape
    edge.push({
      x: point.ventral.x - point.normalX * height * shape + point.tangentX * (length * 0.012 * shape + sway),
      y: point.ventral.y - point.normalY * height * shape + point.tangentY * (length * 0.012 * shape + sway),
    })
  }

  context.beginPath()
  traceSmoothSegment(context, base, true)
  traceSmoothSegment(context, edge.slice().reverse(), false)
  context.closePath()

  const membrane = context.createLinearGradient(0, base[0].y, 0, base[0].y + height)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.7))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.32))
  context.globalAlpha = fish.opacity
  context.fillStyle = membrane
  context.fill()
  context.strokeStyle = withAlpha(palette.finEdge, 0.1)
  context.lineWidth = Math.max(0.3, length * 0.006)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.2
  context.strokeStyle = palette.detail
  context.beginPath()
  traceSmoothSegment(context, base, true)
  context.stroke()
}

function drawPelvicFin(context, fish, spine, length) {
  const palette = fish.palette
  const anchor = spine[Math.round(0.45 * BODY_SAMPLES)]
  context.save()
  context.translate(
    anchor.ventral.x + anchor.normalX * length * 0.008,
    anchor.ventral.y + anchor.normalY * length * 0.008,
  )
  context.rotate(Math.PI * 0.74 + Math.sin(fish.tailPhase * 1.2) * 0.08)
  context.beginPath()
  context.moveTo(0, 0)
  context.quadraticCurveTo(length * 0.03, length * 0.02, length * 0.072, length * 0.006)
  context.quadraticCurveTo(length * 0.048, -length * 0.012, 0, 0)
  context.closePath()
  const membrane = context.createLinearGradient(0, 0, length * 0.072, 0)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.68))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.3))
  context.globalAlpha = fish.opacity * 0.8
  context.fillStyle = membrane
  context.fill()
  context.globalAlpha = fish.opacity * 0.18
  context.strokeStyle = withAlpha(palette.finEdge, 0.6)
  context.lineWidth = Math.max(0.26, length * 0.004)
  context.stroke()
  context.restore()
}

function drawPectoralFin(context, fish, spine, length) {
  const palette = fish.palette
  const anchor = spine[Math.round(0.25 * BODY_SAMPLES)]
  const scull = Math.sin(fish.tailPhase * 1.15 + 0.6) * 0.22
  context.save()
  context.translate(anchor.x - anchor.normalX * anchor.halfDepth * 0.25, anchor.y - anchor.normalY * anchor.halfDepth * 0.25)
  context.rotate(Math.PI - 0.5 + scull)

  context.beginPath()
  context.moveTo(0, 0)
  context.quadraticCurveTo(length * 0.05, length * 0.03, length * 0.098, length * 0.008)
  context.quadraticCurveTo(length * 0.054, -length * 0.009, 0, 0)
  context.closePath()

  const membrane = context.createLinearGradient(0, 0, length * 0.098, 0)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.56))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.22))
  context.globalAlpha = fish.opacity * 0.85
  context.fillStyle = membrane
  context.fill()
  context.globalAlpha = fish.opacity * 0.16
  context.strokeStyle = withAlpha(palette.finEdge, 0.9)
  context.lineWidth = Math.max(0.3, length * 0.006)
  context.beginPath()
  context.moveTo(length * 0.012, 0)
  context.quadraticCurveTo(length * 0.048, length * 0.016, length * 0.09, length * 0.006)
  context.moveTo(length * 0.012, 0)
  context.quadraticCurveTo(length * 0.048, -length * 0.005, length * 0.088, length * 0.002)
  context.stroke()
  context.restore()
}

function drawFishBody(context, fish, spine, bodyPath, length) {
  const palette = fish.palette
  const depth = length * 0.112 * (fish.bodyDepthScale ?? 1)
  const gradient = context.createLinearGradient(0, -depth, 0, depth)
  gradient.addColorStop(0, palette.back)
  gradient.addColorStop(0.42, palette.upper)
  gradient.addColorStop(0.7, palette.flank)
  gradient.addColorStop(0.86, palette.sheen)
  gradient.addColorStop(1, palette.belly)

  context.save()
  context.globalAlpha = Math.min(1, (fish.baseOpacity ?? fish.opacity) + 0.3) * (fish.fade ?? 1)
  context.fillStyle = gradient
  context.fill(bodyPath)

  /* A soft specular patch on the upper flank and a grounded belly shadow give
     the flat outline the volume of a lit, rounded body. */
  context.clip(bodyPath)
  const sheen = context.createRadialGradient(
    length * 0.04, -depth * 0.5, 0,
    length * 0.04, -depth * 0.5, length * 0.36,
  )
  sheen.addColorStop(0, withAlpha(palette.sheen, 0.1))
  sheen.addColorStop(1, withAlpha(palette.sheen, 0))
  context.fillStyle = sheen
  context.fillRect(-length * 0.8, -length * 0.2, length * 1.6, length * 0.4)

  const shadow = context.createLinearGradient(0, depth * 0.15, 0, depth)
  shadow.addColorStop(0, withAlpha(palette.detail, 0))
  shadow.addColorStop(1, withAlpha(palette.detail, 0.16))
  context.fillStyle = shadow
  context.fillRect(-length * 0.8, -length * 0.2, length * 1.6, length * 0.6)
  context.restore()

  /* A faint dark contour separates the countershaded body from bright water,
     the way ambient occlusion does around a real fish. */
  context.save()
  context.globalAlpha = fish.opacity * 0.2
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.4, length * 0.009)
  context.stroke(bodyPath)
  context.restore()

  /* A thin rim light picks the back out of the dark water; the belly instead
     sinks into the background, exactly like a countershaded fish. */
  context.save()
  context.globalAlpha = fish.opacity * 0.1
  context.strokeStyle = palette.rim
  context.lineWidth = Math.max(0.4, length * 0.006)
  context.lineCap = 'round'
  context.beginPath()
  traceSmoothSegment(context, spine.map((point) => point.dorsal), true)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.1
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.35, length * 0.007)
  context.beginPath()
  traceSmoothSegment(context, spine.map((point) => point.ventral), true)
  context.stroke()
  context.restore()
}

function drawFishBars(context, fish, spine, bodyPath, length) {
  const barColor = fish.palette.bar
  if (barColor === undefined || fish.bars === undefined) return

  context.save()
  context.clip(bodyPath)
  context.strokeStyle = withAlpha(barColor, 0.6)
  context.lineWidth = Math.max(0.9, length * 0.028)
  context.globalAlpha = fish.opacity * 0.55
  for (const progress of fish.bars) {
    const index = Math.min(BODY_SAMPLES - 2, Math.max(2, Math.round(progress * BODY_SAMPLES)))
    const point = spine[index]
    const halfDepth = point.halfDepth * 0.95
    context.beginPath()
    context.moveTo(point.x + point.normalX * halfDepth, point.y + point.normalY * halfDepth)
    context.quadraticCurveTo(
      point.x + point.tangentX * length * 0.012,
      point.y + point.tangentY * length * 0.012,
      point.x - point.normalX * halfDepth,
      point.y - point.normalY * halfDepth,
    )
    context.stroke()
  }
  context.restore()
}

function drawFishDetails(context, fish, spine, length) {
  const palette = fish.palette
  const line = Math.max(0.45, length * 0.012)
  context.lineCap = 'round'
  context.lineJoin = 'round'

  /* Operculum: a curved plate edge just behind the head, forward of the
     pectoral fin, so the head reads as separate from the trunk. */
  const coverTop = spine[Math.round(0.225 * BODY_SAMPLES)].dorsal
  const coverBottom = spine[Math.round(0.27 * BODY_SAMPLES)].ventral
  context.globalAlpha = fish.opacity * 0.3
  context.strokeStyle = palette.detail
  context.lineWidth = line * 0.7
  context.beginPath()
  context.moveTo(coverTop.x, coverTop.y)
  context.quadraticCurveTo(length * 0.265, spine[Math.round(0.245 * BODY_SAMPLES)].y, coverBottom.x, coverBottom.y)
  context.stroke()

  /* A thin plate highlight just behind that seam suggests a lit operculum. */
  context.globalAlpha = fish.opacity * 0.1
  context.strokeStyle = palette.rim
  context.lineWidth = line * 0.55
  context.beginPath()
  context.moveTo(length * 0.255, coverTop.y + length * 0.004)
  context.quadraticCurveTo(length * 0.272, spine[Math.round(0.245 * BODY_SAMPLES)].y, length * 0.242, coverBottom.y - length * 0.004)
  context.stroke()

  /* A soft lateral band along the flank: minnows read as banded fish far
     more readily than as a plain metallic capsule. */
  const band = []
  for (let index = 4; index <= BODY_SAMPLES - 2; index += 2) {
    const point = spine[index]
    band.push({
      x: point.x + point.normalX * point.halfDepth * 0.12,
      y: point.y + point.normalY * point.halfDepth * 0.12,
    })
  }
  context.globalAlpha = fish.opacity * 0.2
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.8, length * 0.026)
  context.beginPath()
  traceSmoothSegment(context, band, true)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.28
  context.lineWidth = Math.max(0.32, length * 0.007)
  context.beginPath()
  traceSmoothSegment(context, band, true)
  context.stroke()

  /* Lateral line: the faint seam that runs from the gill to the tail. */
  const lateral = []
  for (let index = Math.round(0.36 * BODY_SAMPLES); index <= BODY_SAMPLES - 3; index += 2) {
    const point = spine[index]
    lateral.push({
      x: point.x + point.normalX * point.halfDepth * 0.2,
      y: point.y + point.normalY * point.halfDepth * 0.2,
    })
  }
  context.globalAlpha = fish.opacity * 0.2
  context.strokeStyle = withAlpha(palette.detail, 0.8)
  context.lineWidth = line * 0.7
  context.beginPath()
  traceSmoothSegment(context, lateral, true)
  context.stroke()

  /* Mouth: the jaws meet at the very tip of the snout, with a short crease
     that opens slightly downward instead of a cartoon smile. */
  const snout = spine[1]
  context.globalAlpha = fish.opacity * 0.72
  context.strokeStyle = palette.detail
  context.lineWidth = line * 0.95
  context.beginPath()
  context.moveTo(length * 0.489, snout.y - length * 0.004)
  context.quadraticCurveTo(length * 0.501, snout.y + length * 0.006, length * 0.474, snout.y + length * 0.017)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.14
  context.strokeStyle = palette.rim
  context.lineWidth = line * 0.7
  context.beginPath()
  context.moveTo(length * 0.492, snout.y + length * 0.006)
  context.quadraticCurveTo(length * 0.489, snout.y + length * 0.013, length * 0.478, snout.y + length * 0.018)
  context.stroke()

  /* A short gape shows the predator actually swallowing the smaller fish. */
  if ((fish.gulp ?? 0) > 0.35) {
    context.globalAlpha = fish.opacity * 0.72
    context.fillStyle = palette.detail
    context.beginPath()
    context.ellipse(
      length * 0.474,
      snout.y + length * 0.004,
      length * 0.045,
      length * 0.027 * (fish.gulp ?? 1),
      0,
      0,
      TAU,
    )
    context.fill()
  }
}

function drawFishEye(context, fish, spine, length) {
  const palette = fish.palette
  const head = spine[Math.round(0.1 * BODY_SAMPLES)]
  const eyeX = head.x
  const eyeY = head.y + head.normalY * head.halfDepth * 0.24
  const radius = Math.max(0.8, length * 0.026)

  /* Dark socket, dark eyeball, thin bright iris ring and one specular dot:
     a real fish eye is mostly black, never a white ball with a black pupil. */
  context.save()
  context.globalAlpha = fish.opacity * 0.28
  context.fillStyle = withAlpha(palette.detail, 0.5)
  context.beginPath()
  context.arc(eyeX, eyeY, radius * 1.14, 0, TAU)
  context.fill()

  context.globalAlpha = Math.min(1, (fish.baseOpacity ?? fish.opacity) + 0.2) * (fish.fade ?? 1)
  context.fillStyle = palette.eye
  context.beginPath()
  context.arc(eyeX, eyeY, radius, 0, TAU)
  context.fill()

  context.strokeStyle = withAlpha(palette.iris, 0.2)
  context.lineWidth = Math.max(0.35, radius * 0.22)
  context.beginPath()
  context.arc(eyeX, eyeY, radius * 0.7, 0, TAU)
  context.stroke()

  context.fillStyle = 'rgba(255, 255, 255, 0.62)'
  context.beginPath()
  context.arc(eyeX + radius * 0.26, eyeY - radius * 0.3, Math.max(0.28, radius * 0.2), 0, TAU)
  context.fill()
  context.restore()
}

function wrapAngle(angle) {
  let wrapped = angle
  while (wrapped > Math.PI) wrapped -= TAU
  while (wrapped < -Math.PI) wrapped += TAU
  return wrapped
}

/**
 * Maps a travel heading onto the visible pose of a side-view sprite. Leftward
 * travel is mirrored so the fish stays upright, and the visible pitch is the
 * travel direction itself: the nose always points where the fish is going,
 * including steep climbs and dives.
 */
function fishVisualPose(heading) {
  const normalized = wrapAngle(heading)
  const mirrored = Math.cos(normalized) < 0
  return {
    mirrored,
    rotation: mirrored ? wrapAngle(normalized - Math.PI) : normalized,
  }
}

/** Draws one lit, anatomically shaded fish in local screen coordinates. */
function drawOfficialFish(context, fish) {
  const fade = fish.fade ?? 1
  if (fade <= 0.01) return
  const visual = fade < 0.999 ? { ...fish, opacity: fish.opacity * fade, baseOpacity: fish.opacity, fade } : fish
  const length = visual.length
  const spine = buildFishSpine(visual, length)
  const bodyPath = buildBodyPath(spine, length)
  const bank = Math.min(0.6, Math.max(-0.6, (visual.turnRate ?? 0) * 0.11))
  const gulp = visual.gulp ?? 0
  const pose = fishVisualPose(visual.heading)
  const yaw = Math.sin(visual.tailPhase - 0.7) * 0.045

  context.save()
  context.translate(visual.x, visual.y)
  context.rotate(pose.rotation + yaw)
  if (pose.mirrored) context.scale(-1, 1)
  if (visual.bellyUp) context.scale(1, -1)
  /* Turning fish roll away from the camera, so the body foreshortens before
     the heading has finished changing. */
  if (bank !== 0) context.scale(1, 1 - Math.abs(bank) * 0.18)
  /* Swallowing a smaller fish gives the body one short forward gulp. */
  if (gulp > 0.01) context.scale(1 + gulp * 0.06, 1 - gulp * 0.05)
  context.translate(0, Math.sin(visual.tailPhase + 0.9) * length * 0.006)

  drawSprintWake(context, visual, length)
  drawCaudalFin(context, visual, spine, length)
  drawFishBody(context, visual, spine, bodyPath, length)
  drawFishBars(context, visual, spine, bodyPath, length)
  drawDorsalFin(context, visual, spine, length)
  drawAnalFin(context, visual, spine, length)
  drawPelvicFin(context, visual, spine, length)
  drawFishDetails(context, visual, spine, length)
  drawPectoralFin(context, visual, spine, length)
  drawFishEye(context, visual, spine, length)
  context.restore()
}


function drawSprintWake(context, fish, length) {
  if (fish.cruiseSpeed === undefined || fish.speed <= fish.cruiseSpeed * 1.15) return
  const intensity = Math.min(1.4, fish.speed / fish.cruiseSpeed - 1)
  const palette = fish.palette
  context.save()
  context.globalAlpha = Math.min(0.4, intensity * 0.3)
  context.strokeStyle = palette.finEdge
  context.lineWidth = Math.max(0.5, length * 0.01)
  context.lineCap = 'round'
  for (let line = 0; line < 3; line += 1) {
    const offset = (line - 1) * length * 0.07
    context.beginPath()
    context.moveTo(-length * 0.56, offset)
    context.lineTo(-length * (0.72 + line * 0.06), offset * 0.45)
    context.stroke()
  }
  context.restore()
}

/** Small drifting prawn: curved shell, tail fan and long antennae. */
function drawShrimp(context, shrimp, palette) {
  const length = shrimp.size
  context.save()
  context.translate(shrimp.x, shrimp.y)
  context.rotate(shrimp.heading)

  context.globalAlpha = 0.9
  context.fillStyle = palette.body
  context.beginPath()
  context.moveTo(length * 0.4, -length * 0.06)
  context.bezierCurveTo(length * 0.34, -length * 0.22, length * 0.08, -length * 0.26, -length * 0.12, -length * 0.18)
  context.bezierCurveTo(-length * 0.32, -length * 0.1, -length * 0.42, -length * 0.02, -length * 0.42, length * 0.04)
  context.bezierCurveTo(-length * 0.24, length * 0.16, length * 0.04, length * 0.22, length * 0.22, length * 0.1)
  context.bezierCurveTo(length * 0.34, length * 0.04, length * 0.42, -length * 0.02, length * 0.4, -length * 0.06)
  context.closePath()
  context.fill()
  context.strokeStyle = palette.shell
  context.globalAlpha = 0.35
  context.lineWidth = Math.max(0.3, length * 0.02)
  context.stroke()

  /* Tail fan. */
  context.globalAlpha = 0.7
  context.fillStyle = palette.shell
  context.beginPath()
  context.moveTo(-length * 0.38, length * 0.02)
  context.lineTo(-length * 0.68, -length * 0.16)
  context.lineTo(-length * 0.6, length * 0.02)
  context.lineTo(-length * 0.66, length * 0.16)
  context.closePath()
  context.fill()

  /* Walking legs. */
  context.globalAlpha = 0.55
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.3, length * 0.018)
  for (let leg = 0; leg < 3; leg += 1) {
    const x = length * (0.14 - leg * 0.13)
    context.beginPath()
    context.moveTo(x, length * 0.15)
    context.lineTo(x - length * 0.05, length * 0.36)
    context.stroke()
  }

  /* Long feelers. */
  context.globalAlpha = 0.6
  context.strokeStyle = palette.shell
  context.lineWidth = Math.max(0.3, length * 0.02)
  context.beginPath()
  context.moveTo(length * 0.36, -length * 0.04)
  context.quadraticCurveTo(length * 0.7, -length * 0.3, length * 0.82, -length * 0.08)
  context.moveTo(length * 0.36, length * 0.02)
  context.quadraticCurveTo(length * 0.62, length * 0.26, length * 0.5, length * 0.34)
  context.stroke()

  /* Dark eye and a bright glint. */
  context.globalAlpha = 0.95
  context.fillStyle = palette.eye
  context.beginPath()
  context.arc(length * 0.28, -length * 0.05, Math.max(0.55, length * 0.075), 0, TAU)
  context.fill()
  context.globalAlpha = 0.8
  context.fillStyle = palette.shell
  context.beginPath()
  context.arc(length * 0.305, -length * 0.075, Math.max(0.2, length * 0.024), 0, TAU)
  context.fill()
  context.restore()
}

/** A belly-up predator carcass that the school can scavenge. */
function drawFishCorpse(context, corpse) {
  const biomassRatio = corpse.maxBiomass > 0 ? corpse.biomass / corpse.maxBiomass : 0
  drawOfficialFish(context, {
    x: corpse.x,
    y: corpse.y + Math.sin(corpse.phase) * 1.2,
    heading: corpse.heading + Math.sin(corpse.phase * 0.7) * 0.04,
    length: corpse.length * (0.62 + 0.38 * biomassRatio),
    tailPhase: 0,
    speed: 0,
    cruiseSpeed: 0,
    turnRate: 0,
    gulp: 0,
    bellyUp: true,
    opacity: 0.5 + 0.35 * biomassRatio,
    palette: corpse.palette,
    bars: corpse.bars,
    bodyDepthScale: 1.32,
    swimAmplitude: 0,
  })
}


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

function createFishStates(width, height, random = Math.random, profile = OFFICIAL_FISH_PROFILE) {
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

function createFishWorld(width, height, random = Math.random, profile = OFFICIAL_FISH_PROFILE) {
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

function advanceFishSchool(
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

function createOfficialFishSchool(
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


function clampGrid(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function createElasticGridNodes(width, height, profile = OFFICIAL_ELASTIC_GRID_PROFILE) {
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

function advanceElasticGrid(
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

function createOfficialElasticGrid(
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

const DEFAULT_SETTINGS = Object.freeze({
  enabled: true,
  fishEnabled: true,
  gridEnabled: true,
  intensity: 0.86,
})

function normalizeSettings(value) {
  const intensity = Number(value?.intensity)
  return Object.freeze({
    enabled: value?.enabled !== false,
    fishEnabled: value?.fishEnabled !== false,
    gridEnabled: value?.gridEnabled !== false,
    intensity: Number.isFinite(intensity) ? Math.min(1, Math.max(0.18, intensity)) : DEFAULT_SETTINGS.intensity,
  })
}

// Optional service children must not block the theme's root fiber at startup.
function createHostSettingsForm(ctx, entryId) {
  const listeners = new Set()
  const forms = new Map()
  const unavailable = Object.freeze({ status: 'unavailable', mode: 'host', writable: false })
  const current = () => forms.get('configForms') ?? forms.get('settingsScope')
  const notify = () => { for (const listener of listeners) listener() }
  const disposers = ['configForms', 'settingsScope'].map(service => ctx.inject([service], child => {
    child.effect(() => {
      const form = service === 'configForms'
        ? child.configForms.get(entryId)
        : child.settingsScope.bind({ namespace: entryId })
      forms.set(service, form)
      const off = form.subscribe(notify)
      notify()
      return () => {
        off()
        forms.delete(service)
        notify()
      }
    })
  }))
  return {
    getSnapshot: () => current()?.getSnapshot() ?? unavailable,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener) },
    mutate: ops => current()?.mutate(ops) ?? Promise.resolve(false),
    destroy: () => { listeners.clear(); return Promise.all(disposers.map(fiber => fiber.dispose())) },
  }
}

// The host owns persistence, revision checks and reconnect synchronization.
// Never seed its config from browser storage or write defaults during loading.
function createSettingsController(form) {
  const listeners = new Set()
  let saving = false
  let generation = 0
  let preview
  let error = ''
  let disposed = false
  let snapshot
  const sync = () => {
    if (disposed) return
    const host = form.getSnapshot()
    const ready = host.status === 'ready' && host.value !== undefined
    // DSH 0.2.1 dropped `mode` from ConfigFormSnapshot and leaves `writable` as
    // the only authority, while older hosts still report `mode: 'memory'` for
    // process-local scopes. Treat an absent mode as host-backed.
    const hostBacked = host.mode === undefined || host.mode === 'host'
    snapshot = Object.freeze({
      value: preview ?? normalizeSettings(ready ? host.value : DEFAULT_SETTINGS),
      ready,
      loading: host.status === 'loading',
      editable: ready && hostBacked && host.writable,
      saving,
      error,
    })
    for (const listener of listeners) listener()
  }
  const unsubscribe = form.subscribe(sync)
  sync()

  return {
    get: () => snapshot,
    subscribe: listener => {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    },
    set: async update => {
      if (disposed || !snapshot.editable) return false
      const fields = Object.keys(DEFAULT_SETTINGS).filter(field => Object.hasOwn(update, field))
      if (fields.length === 0) return false
      preview = normalizeSettings({ ...snapshot.value, ...update })
      const ops = fields.map(field => ({ op: 'set', path: [field], value: preview[field] }))
      const current = ++generation
      saving = true
      error = ''
      sync()
      try {
        const accepted = await form.mutate(ops)
        // Legacy settingsScope hosts (DSH < 0.1.7) resolve without a verdict,
        // so only an explicit refusal may be reported as a failed save.
        if (accepted === false && current === generation) error = '设置保存失败，请重试。'
        return accepted !== false
      } catch {
        if (current === generation) error = '设置保存失败，请检查连接后重试。'
        return false
      } finally {
        if (current === generation) {
          preview = undefined
          saving = false
          sync()
        }
      }
    },
    destroy: () => {
      disposed = true
      unsubscribe()
      listeners.clear()
    },
  }
}


const PLUGIN_ID = 'dsh-official-homepage-theme'
const STYLE_SELECTOR = 'style[data-plugin-css="dsh-official-homepage-theme/theme.css"]'
const DARK_PALETTE_ATTRIBUTE = 'data-ds-dark-theme'

const inject = ['slots']

const OFFICIAL_HARNESS_TOKENS = Object.freeze({
  '--dsw-alias-bg-base': '#071323',
  '--dsw-alias-bg-layer-1': '#0a1a30',
  '--dsw-alias-bg-layer-2': '#102641',
  '--dsw-alias-bg-layer-3': '#183653',
  '--dsw-alias-bg-module-platform': '#183653',
  '--dsw-alias-bg-overlay': '#0f2744',
  '--dsw-alias-bg-mask-1': 'rgba(1, 7, 18, 0.74)',
  '--dsw-alias-bg-mask-2': 'rgba(4, 13, 28, 0.54)',
  '--dsw-alias-border-l1': 'rgba(210, 229, 255, 0.14)',
  '--dsw-alias-border-l2': 'rgba(220, 236, 255, 0.22)',
  '--dsw-alias-border-l3': 'rgba(231, 242, 255, 0.32)',
  '--dsw-alias-brand-primary': '#f3f8ff',
  '--dsw-alias-brand-primary-new-colorprimary-new-color': '#c8dfff',
  '--dsw-alias-brand-text': '#f6fbff',
  '--dsw-alias-label-primary': '#f5f9ff',
  '--dsw-alias-label-primary-inverted': '#102641',
  '--dsw-alias-label-secondary': '#c4d3e6',
  '--dsw-alias-label-tertiary': '#8fa4bf',
  '--dsw-alias-label-caption': '#9eb2cc',
  '--dsw-alias-markdown-code-block-banner': '#0a1a30',
  '--dsw-alias-state-business-primary': '#79a9ed',
  '--dsw-alias-state-business-tertiary': 'rgba(91, 146, 212, 0.24)',
  '--dsw-alias-button-primary-fill': '#6c8fb9',
  '--dsw-alias-button-primary-hover': '#84a8d3',
  '--dsw-alias-button-elevated-fill': '#17314f',
  '--dsw-alias-button-floating-fill': '#122942',
  '--dsw-alias-button-floating-hover': '#203d61',
  '--dsw-alias-interactive-bg-hover': 'rgba(197, 220, 251, 0.12)',
  '--dsw-alias-interactive-bg-active': 'rgba(209, 228, 253, 0.18)',
  '--dsw-alias-interactive-bg-hover-solid': '#1f4167',
  '--dsw-alias-scrollbar-bg-l1': '#244361',
  '--dsw-alias-scrollbar-bg-l2': '#345a7d',
  '--dsw-alias-scrollbar-hover-l1': '#5b7fa7',
  '--dsw-alias-scrollbar-hover-l2': '#779ac1',
  '--dsw-alias-tooltip-bg': '#16314f',
  '--dsw-alias-toast-bg': '#16314f',
  '--dsw-specific-bubble': 'rgba(16, 42, 70, 0.9)',
  '--dsw-specific-bubble-highlight': 'rgba(49, 83, 122, 0.92)',
  '--dsw-specific-sidebar-fill': '#08182c'
})

function isBrowser() {
  return typeof document !== 'undefined' && typeof window !== 'undefined'
}

function installStyle() {
  const existing = document.querySelector(STYLE_SELECTOR)
  if (existing !== null) return existing

  const style = document.createElement('style')
  style.dataset.plugin = PLUGIN_ID
  style.dataset.pluginCss = `${PLUGIN_ID}/theme.css`
  style.textContent = OFFICIAL_HARNESS_THEME_CSS
  document.head.appendChild(style)
  return style
}

function installBackgroundLayer() {
  const layer = document.createElement('div')
  layer.className = 'dsh-harness-official-bg'
  layer.setAttribute('aria-hidden', 'true')
  document.body.appendChild(layer)
  return () => { layer.remove() }
}

function installPointerEffects(settings) {
  const root = document.documentElement
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  const interactionSources = createOfficialInteractionSources(reducedMotion)
  const field = createOfficialPointerField(reducedMotion, interactionSources)
  const fish = createOfficialFishSchool(reducedMotion, interactionSources)
  const grid = createOfficialElasticGrid(reducedMotion, interactionSources)

  const applySettings = () => {
    const value = settings.get().value
    root.toggleAttribute('data-dsh-harness-official-pointer-disabled', !value.enabled)
    root.style.setProperty('--dsh-harness-official-intensity', String(value.intensity))
    field.setIntensity(value.intensity)
    field.setEnabled(value.enabled)
    fish.setEnabled(value.fishEnabled)
    grid.setEnabled(value.gridEnabled)
  }

  applySettings()
  const unsubscribe = settings.subscribe(applySettings)
  return () => {
    unsubscribe()
    field.destroy()
    grid.destroy()
    fish.destroy()
    interactionSources.destroy()
    root.style.removeProperty('--dsh-harness-official-intensity')
    root.removeAttribute('data-dsh-harness-official-pointer-disabled')
  }
}

function OfficialPointerRow(props) {
  const React = require('react')
  const state = React.useSyncExternalStore(props.pointer.subscribe, props.pointer.get, props.pointer.get)
  const settings = state.value
  const message = state.error || (state.saving ? '正在保存…' : state.loading ? '正在读取设置…' : !state.editable ? '插件配置暂不可用，无法保存设置。' : '')
  const intensityPercent = Math.round(settings.intensity * 100)
  return React.createElement('section', { className: 'dsh-harness-official-settings', 'data-dsh-harness-official-settings': '' },
    message ? React.createElement('div', { role: state.error ? 'alert' : 'status', style: { gridColumn: '1 / -1' } }, message) : null,
    React.createElement('div', { className: 'dsh-harness-official-copy' },
      React.createElement('strong', null, '流体效果'),
      React.createElement('span', null, '流体持续缓慢流动，并随鼠标方向、速度和位置产生水波、卷曲、光照与渐进恢复。')
    ),
    React.createElement('label', { className: 'dsh-harness-official-switch' },
      React.createElement('input', {
        type: 'checkbox',
        disabled: !state.editable,
        checked: settings.enabled,
        onChange: (event) => { props.pointer.set({ enabled: event.target.checked }) }
      }),
      React.createElement('span', null, '启用')
    ),
    React.createElement('label', { className: 'dsh-harness-official-range' },
      React.createElement('span', null, `流体交互强度 ${intensityPercent}%`),
      React.createElement('input', {
        type: 'range',
        min: '18',
        max: '100',
        step: '1',
        value: intensityPercent,
        disabled: !settings.enabled || !state.editable,
        onChange: (event) => { props.pointer.set({ intensity: Number(event.target.value) / 100 }) }
      })
    ),
    React.createElement('div', { className: 'dsh-harness-official-copy' },
      React.createElement('strong', null, '弹性网格'),
      React.createElement('span', null, '鼠标靠近时推开方形节点并拉伸连线，离开后通过弹簧与阻尼自然回弹。')
    ),
    React.createElement('label', { className: 'dsh-harness-official-switch' },
      React.createElement('input', {
        type: 'checkbox',
        disabled: !state.editable,
        checked: settings.gridEnabled,
        onChange: (event) => { props.pointer.set({ gridEnabled: event.target.checked }) }
      }),
      React.createElement('span', null, '启用')
    ),
    React.createElement('div', { className: 'dsh-harness-official-copy' },
      React.createElement('strong', null, '小鱼游动'),
      React.createElement('span', null, '小鱼群会结伴游动、抢食小虾并躲避大鱼；鼠标靠近鱼群会惊散它们。大鱼会冲刺捕食并长大，饿久了会死亡，尸体由小鱼分食。')
    ),
    React.createElement('label', { className: 'dsh-harness-official-switch' },
      React.createElement('input', {
        type: 'checkbox',
        disabled: !state.editable,
        checked: settings.fishEnabled,
        onChange: (event) => { props.pointer.set({ fishEnabled: event.target.checked }) }
      }),
      React.createElement('span', null, '启用')
    )
  )
}

/**
 * Pin the host to its dark palette while the replica is applied.
 *
 * The host theme presenter resolves the light/dark palette from the user's
 * appearance preference and only records it as `body[data-ds-dark-theme]`.
 * The official homepage replica is always dark but restates a hand-picked
 * slice of the palette, so a light host appearance leaks the remaining light
 * tokens into chrome the theme never mentions - `--dsw-specific-selector`
 * painted the composer's attachment trigger as a white sphere, and
 * `--dsw-specific-tip` whitened the goal and todo docks. Re-assert the dark
 * palette for as long as the theme is applied, then hand the host's own
 * choice back on dispose.
 */
function installDarkPaletteLock() {
  const body = document.body
  const wasDark = body.hasAttribute(DARK_PALETTE_ATTRIBUTE)
  const applyPalette = () => {
    if (!body.hasAttribute(DARK_PALETTE_ATTRIBUTE)) body.setAttribute(DARK_PALETTE_ATTRIBUTE, '')
  }

  applyPalette()
  const observer = new MutationObserver(applyPalette)
  observer.observe(body, { attributes: true, attributeFilter: [DARK_PALETTE_ATTRIBUTE] })

  return {
    applyPalette,
    restore: () => {
      observer.disconnect()
      if (!wasDark) body.removeAttribute(DARK_PALETTE_ATTRIBUTE)
    }
  }
}

function installTokenOverrides() {
  const targets = [document.documentElement, document.body]
  const previous = new Map()
  const applyTokens = () => {
    for (const target of targets) {
      for (const [name, value] of Object.entries(OFFICIAL_HARNESS_TOKENS)) {
        const key = `${target === document.body ? 'body' : 'root'}:${name}`
        if (!previous.has(key)) {
          previous.set(key, {
            target,
            name,
            value: target.style.getPropertyValue(name),
            priority: target.style.getPropertyPriority(name)
          })
        }
        target.style.setProperty(name, value)
      }
    }
  }

  applyTokens()
  return {
    applyTokens,
    restore: () => {
      for (const value of previous.values()) value.target.style.setProperty(value.name, value.value, value.priority)
    }
  }
}

function apply(ctx) {
  if (!isBrowser()) return

  ctx.effect(() => {
    const style = installStyle()
    const stopBackground = installBackgroundLayer()
    const palette = installDarkPaletteLock()
    const tokens = installTokenOverrides()
    const form = createHostSettingsForm(ctx, PLUGIN_ID)
    const pointer = createSettingsController(form)
    const stopPointerEffects = installPointerEffects(pointer)
    document.documentElement.setAttribute('data-dsh-harness-official-theme', '')
    /* The presenter rewrites the body palette attribute on every theme change;
       re-assert the replica's palette after it settled for this revision. */
    ctx.on('theme/change', () => {
      queueMicrotask(() => {
        palette.applyPalette()
        tokens.applyTokens()
      })
    })
    ctx.slots.inject('settings.general.item', () => ctx.slots.register({
      name: 'settings.general.item',
      id: 'harness-official-pointer-effects',
      order: 18,
      inject: () => ({ pointer })
    }, OfficialPointerRow))

    return () => {
      stopPointerEffects()
      pointer.destroy()
      form.destroy()
      stopBackground()
      style?.remove()
      tokens.restore()
      palette.restore()
      document.documentElement.removeAttribute('data-dsh-harness-official-theme')
    }
  }, 'harness-official-theme: fluid, elastic grid and autonomous fish')
}

module.exports = { apply, inject };
return module.exports; } });
