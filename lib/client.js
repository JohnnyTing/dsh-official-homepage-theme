window.__ModuleLoader__.load({ id: 'dsh-official-homepage-theme', factory: (require) => {
var module = { exports: {} };
var exports = module.exports;
const OFFICIAL_HARNESS_THEME_CSS = "\nhtml[data-dsh-harness-official-theme] {\n  --dsh-harness-official-intensity: 0.86;\n  color-scheme: dark;\n  background: #071323;\n}\n\nhtml[data-dsh-harness-official-theme] body {\n  position: relative;\n  isolation: isolate;\n  min-height: 100vh;\n  color: var(--dsw-alias-label-primary);\n  background: #071323 !important;\n}\n\nhtml[data-dsh-harness-official-theme] #root {\n  position: relative;\n  z-index: 10;\n  min-height: 100vh;\n  background: transparent !important;\n}\n\nhtml[data-dsh-harness-official-theme] body::before {\n  position: fixed;\n  content: '';\n  inset: 0;\n  pointer-events: none;\n}\n\nhtml[data-dsh-harness-official-theme] body::before {\n  z-index: -2;\n  background-image:\n    radial-gradient(980px 520px at 66% -4%, rgba(195, 216, 220, 0.34), transparent 60%),\n    radial-gradient(760px 460px at 18% 20%, rgba(44, 97, 156, 0.42), transparent 68%),\n    radial-gradient(640px 420px at 54% 52%, rgba(56, 104, 155, 0.22), transparent 72%),\n    radial-gradient(560px 400px at 100% 70%, rgba(219, 221, 203, 0.15), transparent 64%),\n    linear-gradient(180deg, #15375e 0%, #0d2949 42%, #071626 100%);\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-bg,\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-field,\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-fish,\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {\n  position: fixed;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-bg {\n  z-index: -1;\n  overflow: hidden;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-field {\n  z-index: 0;\n  opacity: 1;\n  -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.91) 8.98%, transparent 100%);\n  mask-image: linear-gradient(rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.91) 8.98%, transparent 100%);\n  transition: opacity 180ms ease;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {\n  z-index: 5;\n  opacity: 1;\n  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.78) 58%, transparent 100%);\n  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.78) 58%, transparent 100%);\n  transition: opacity 180ms ease;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-fish {\n  z-index: 2;\n  opacity: 1;\n  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.84) 64%, transparent 100%);\n  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.84) 64%, transparent 100%);\n  transition: opacity 180ms ease;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-fish[data-disabled] {\n  opacity: 0;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid[data-disabled] {\n  opacity: 0;\n}\n\nhtml[data-dsh-harness-official-theme][data-dsh-harness-official-pointer-disabled] .dsh-harness-official-field {\n  opacity: 0 !important;\n}\n\n\nhtml[data-dsh-harness-official-theme] [class*='frame'],\nhtml[data-dsh-harness-official-theme] [class*='centerCol'],\nhtml[data-dsh-harness-official-theme] main {\n  background-color: transparent !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='centerCol'] [class$='_root'] {\n  background-color: transparent !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='centerCol'] > *,\nhtml[data-dsh-harness-official-theme] main > * {\n  border-color: rgba(215, 233, 255, 0.065) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='_markdown_'],\nhtml[data-dsh-harness-official-theme] [class*='flowItem'] {\n  text-shadow: 0 1px 4px rgba(0, 7, 20, 0.72), 0 0 12px rgba(0, 7, 20, 0.38);\n}\n\nhtml[data-dsh-harness-official-theme] [class*='viewArea'] [class*='_scroll'] {\n  background: linear-gradient(180deg, rgba(3, 13, 27, 0.28), rgba(3, 13, 27, 0.42)) !important;\n}\n\nhtml[data-dsh-harness-official-theme] ::selection {\n  color: #071323;\n  background: #d7e8ff;\n}\n\nhtml[data-dsh-harness-official-theme] :focus-visible {\n  outline: 1px solid rgba(121, 169, 237, 0.62) !important;\n  outline-offset: 2px;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='sidebarCol'] {\n  background: linear-gradient(180deg, rgba(6, 20, 39, 0.48), rgba(3, 13, 27, 0.62)) !important;\n  border-color: rgba(205, 224, 249, 0.16) !important;\n  box-shadow: inset -1px 0 rgba(255, 255, 255, 0.045), 20px 0 70px rgba(0, 11, 30, 0.18) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='sidebarCol'] [class*='_root '],\nhtml[data-dsh-harness-official-theme] [class*='sidebarCol'] [class$='_root'] {\n  background-color: transparent !important;\n  background-image: none !important;\n}\n\nhtml[data-dsh-harness-official-theme] [role='dialog'] > [class$='_content'] > [class$='_header'],\nhtml[data-dsh-harness-official-theme] [class*='titlebar'],\nhtml[data-dsh-harness-official-theme] [class*='topbar'] {\n  background: rgba(9, 27, 51, 0.34) !important;\n  border-color: rgba(210, 230, 255, 0.14) !important;\n  backdrop-filter: blur(18px) saturate(120%);\n}\n\nhtml[data-dsh-harness-official-theme] [class*='detailsCol'],\nhtml[data-dsh-harness-official-theme] [class*='details'],\nhtml[data-dsh-harness-official-theme] [class*='Details'] {\n  background: linear-gradient(180deg, rgba(12, 32, 58, 0.78), rgba(5, 16, 31, 0.9)) !important;\n  border-color: rgba(203, 223, 250, 0.14) !important;\n  backdrop-filter: blur(20px) saturate(120%);\n}\n\nhtml[data-dsh-harness-official-theme] [data-composer-seat] [class*='_card'],\nhtml[data-dsh-harness-official-theme] [data-composer-seat] [class*='Card'] {\n  color: #eef6ff !important;\n  background: linear-gradient(145deg, #1f3654, #09192f) !important;\n  border-color: rgba(225, 237, 255, 0.14) !important;\n  box-shadow: 0 18px 48px rgba(0, 5, 18, 0.28), inset 0 1px rgba(255, 255, 255, 0.07) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [role='dialog'],\nhtml[data-dsh-harness-official-theme] [class*='popover'],\nhtml[data-dsh-harness-official-theme] [class*='menu'],\nhtml[data-dsh-harness-official-theme] [class*='dropdown'] {\n  color: #eef6ff !important;\n  background: linear-gradient(145deg, rgba(32, 55, 84, 0.78), rgba(12, 29, 51, 0.9)) !important;\n  border-color: rgba(225, 237, 255, 0.14) !important;\n  box-shadow: 0 24px 70px rgba(0, 5, 18, 0.34), inset 0 1px rgba(255, 255, 255, 0.07) !important;\n  backdrop-filter: blur(24px) saturate(128%);\n}\n\n\nhtml[data-dsh-harness-official-theme] [class*='composer'] textarea,\nhtml[data-dsh-harness-official-theme] [class*='composer'] input,\nhtml[data-dsh-harness-official-theme] textarea,\nhtml[data-dsh-harness-official-theme] input,\nhtml[data-dsh-harness-official-theme] select {\n  color: #f5f9ff !important;\n  caret-color: #d5e8ff;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='composer'] textarea,\nhtml[data-dsh-harness-official-theme] [class*='composer'] input {\n  background: transparent !important;\n  border-color: transparent !important;\n}\n\nhtml[data-dsh-harness-official-theme] textarea::placeholder,\nhtml[data-dsh-harness-official-theme] input::placeholder {\n  color: rgba(193, 208, 228, 0.72) !important;\n}\n\nhtml[data-dsh-harness-official-theme] button,\nhtml[data-dsh-harness-official-theme] [role='button'] {\n  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, color 160ms ease;\n}\n\nhtml[data-dsh-harness-official-theme] button:hover:not(:disabled),\nhtml[data-dsh-harness-official-theme] [role='button']:hover {\n  background-color: rgba(183, 211, 247, 0.14) !important;\n  border-color: rgba(225, 239, 255, 0.26) !important;\n  box-shadow: inset 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(2, 12, 32, 0.18);\n}\n\nhtml[data-dsh-harness-official-theme] button:active:not(:disabled),\nhtml[data-dsh-harness-official-theme] [role='button']:active {\n  transform: translateY(1px) scale(0.995);\n}\n\nhtml[data-dsh-harness-official-theme] [aria-selected='true']:not([role='tab']),\nhtml[data-dsh-harness-official-theme] [aria-current='true'] {\n  color: #f7fbff !important;\n  background: linear-gradient(135deg, rgba(97, 132, 171, 0.46), rgba(44, 79, 121, 0.42)) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [role='tab'] {\n  background: transparent !important;\n  border-color: transparent !important;\n  box-shadow: none !important;\n}\n\nhtml[data-dsh-harness-official-theme] button[role='tab']:hover:not(:disabled) {\n  background: rgba(105, 154, 218, 0.08) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [role='tab']:focus-visible {\n  outline-color: rgba(121, 169, 237, 0.48) !important;\n  outline-offset: 3px;\n}\n\nhtml[data-dsh-harness-official-theme] button[data-chip='1'][class*='_active_'] {\n  color: #f7fbff !important;\n  background: rgba(105, 154, 218, 0.18) !important;\n  border-color: transparent !important;\n  box-shadow: inset 0 0 0 1px rgba(164, 199, 243, 0.38) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [data-slot='settings.general.item'] button[class$='_selector'],\nhtml[data-dsh-harness-official-theme] [data-slot='settings.general.item'] button[class*='_themeCube'][aria-pressed='true'],\nhtml[data-dsh-harness-official-theme] [aria-label='命令'][aria-haspopup='listbox'] {\n  color: #f6fbff !important;\n  background: linear-gradient(145deg, rgba(92, 119, 151, 0.74), rgba(38, 75, 120, 0.84)) !important;\n  border: 1px solid rgba(224, 238, 255, 0.28) !important;\n  box-shadow: inset 0 1px rgba(255, 255, 255, 0.14), 0 10px 28px rgba(0, 10, 31, 0.26) !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='home'],\nhtml[data-dsh-harness-official-theme] [class*='Home'],\nhtml[data-dsh-harness-official-theme] [class*='welcome'],\nhtml[data-dsh-harness-official-theme] [class*='Welcome'] {\n  background-color: transparent !important;\n  background-image: none !important;\n}\n\nhtml[data-dsh-harness-official-theme] [class*='composer']::before,\nhtml[data-dsh-harness-official-theme] [class*='composer']::after {\n  opacity: 0.16 !important;\n}\n\nhtml[data-dsh-harness-official-theme] pre,\nhtml[data-dsh-harness-official-theme] .md-code-block {\n  overflow: hidden;\n  color: #eef6ff !important;\n  background: linear-gradient(145deg, rgba(32, 52, 75, 0.78), rgba(12, 29, 51, 0.88)) !important;\n  border: 1px solid rgba(224, 237, 255, 0.15) !important;\n  border-radius: 16px;\n  box-shadow: 0 22px 56px rgba(0, 6, 20, 0.32), inset 0 1px rgba(255, 255, 255, 0.07) !important;\n}\n\nhtml[data-dsh-harness-official-theme] pre code,\nhtml[data-dsh-harness-official-theme] code {\n  color: inherit !important;\n}\n\nhtml[data-dsh-harness-official-theme] :not(pre) > code {\n  color: #d8eaff !important;\n  background: rgba(137, 174, 220, 0.17) !important;\n  border: 1px solid rgba(205, 225, 250, 0.12) !important;\n}\n\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-settings {\n  display: grid;\n  grid-template-columns: minmax(240px, 1fr) auto;\n  gap: 12px 20px;\n  align-items: center;\n  width: 100%;\n  min-width: 0;\n  padding: 16px 0;\n  border-top: 1px solid rgba(210, 229, 255, 0.14);\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-copy {\n  display: grid;\n  gap: 4px;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-copy strong {\n  color: #f2f8ff;\n  font-size: 14px;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-copy span,\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-range span {\n  color: rgba(195, 212, 234, 0.82);\n  font-size: 12px;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-switch {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: #e9f4ff;\n  cursor: pointer;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-switch input {\n  width: 16px;\n  height: 16px;\n  accent-color: #c6defe;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-range {\n  display: grid;\n  grid-column: 1 / -1;\n  gap: 8px;\n}\n\nhtml[data-dsh-harness-official-theme] .dsh-harness-official-range input {\n  width: min(360px, 100%);\n  accent-color: #d5e8ff;\n}\n\nhtml[data-dsh-harness-official-theme] ::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n\nhtml[data-dsh-harness-official-theme] ::-webkit-scrollbar-track {\n  background: rgba(5, 14, 27, 0.72);\n}\n\nhtml[data-dsh-harness-official-theme] ::-webkit-scrollbar-thumb {\n  background: linear-gradient(#496d96, #28486e);\n  border: 2px solid rgba(5, 14, 27, 0.72);\n  border-radius: 999px;\n}\n\n@media (max-width: 640px) {\n  html[data-dsh-harness-official-theme] [role='dialog'][class$='_panel'] {\n    flex-direction: column;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_nav'] {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_navTitle'] {\n    display: none;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_navList'] {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 10px 12px 8px;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class*='_navCell'] {\n    flex: 0 0 auto;\n    width: auto;\n    min-width: 96px;\n    white-space: nowrap;\n  }\n\n  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_content'] {\n    flex: 1 1 auto;\n    width: 100%;\n    min-width: 0;\n    min-height: 0;\n  }\n\n  html[data-dsh-harness-official-theme] .dsh-harness-official-settings {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 767px), (hover: none), (pointer: coarse) {\n  html[data-dsh-harness-official-theme] .dsh-harness-official-fish,\n  html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {\n    display: none;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  html[data-dsh-harness-official-theme] .dsh-harness-official-field,\n  html[data-dsh-harness-official-theme] .dsh-harness-official-fish,\n  html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid,\n  html[data-dsh-harness-official-theme] button,\n  html[data-dsh-harness-official-theme] [role='button'] {\n    transition: none;\n  }\n}\n";
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

const freezeFish = (fish) => Object.freeze({ ...fish })

const OFFICIAL_FISH_PROFILE = Object.freeze({
  frameInterval: 1000 / 30,
  maxPixelRatio: 1.5,
  minWidth: 768,
  resizeDelay: 150,
  boundaryPadding: 12,
  boundaryLookAhead: 72,
  boundaryWeight: 2.8,
  mouseAvoidRadius: 150,
  mouseAvoidWeight: 2.4,
  separationRadius: 90,
  separationWeight: 1.5,
  maxTurnRate: 1.9,
  wanderAngle: Math.PI * 0.9,
  wanderMinSeconds: 1.4,
  wanderMaxSeconds: 3.4,
  tailFrequency: 2.2,
  fluidRadius: 0.065,
  fluidStrength: 0.55,
  fish: Object.freeze([
    freezeFish({
      id: 'fish-a',
      length: 44,
      speed: 34,
      color: '#8fc7ff',
      accentColor: '#e7f6ff',
      detailColor: '#173754',
      opacity: 0.72,
      initialX: 0.28,
      initialY: 0.34,
      initialHeading: 0.2,
    }),
    freezeFish({
      id: 'fish-b',
      length: 38,
      speed: 42,
      color: '#fff0c2',
      accentColor: '#fffbea',
      detailColor: '#594c2e',
      opacity: 0.66,
      initialX: 0.72,
      initialY: 0.62,
      initialHeading: Math.PI + 0.25,
    }),
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

function drawFishTail(context, fish, length, bodyHeight) {
  const tailAngle = Math.sin(fish.tailPhase) * 0.34

  context.save()
  context.translate(-length * 0.34, 0)
  context.rotate(tailAngle * 0.48)
  context.globalAlpha = fish.opacity * 0.88
  context.fillStyle = fish.color

  // The narrow caudal peduncle moves with the body before the fin bends again.
  context.beginPath()
  context.moveTo(length * 0.03, -bodyHeight * 0.3)
  context.bezierCurveTo(-length * 0.08, -bodyHeight * 0.22, -length * 0.15, -bodyHeight * 0.16, -length * 0.2, -bodyHeight * 0.1)
  context.lineTo(-length * 0.2, bodyHeight * 0.1)
  context.bezierCurveTo(-length * 0.15, bodyHeight * 0.16, -length * 0.08, bodyHeight * 0.22, length * 0.03, bodyHeight * 0.3)
  context.closePath()
  context.fill()

  context.translate(-length * 0.19, 0)
  context.rotate(tailAngle * 0.72)

  // Two asymmetric lobes and a clear fork make the tail read as a real fin.
  context.beginPath()
  context.moveTo(0, 0)
  context.bezierCurveTo(-length * 0.08, -length * 0.08, -length * 0.2, -length * 0.3, -length * 0.34, -length * 0.27)
  context.bezierCurveTo(-length * 0.3, -length * 0.12, -length * 0.24, -length * 0.04, -length * 0.14, 0)
  context.bezierCurveTo(-length * 0.24, length * 0.04, -length * 0.3, length * 0.12, -length * 0.34, length * 0.27)
  context.bezierCurveTo(-length * 0.2, length * 0.3, -length * 0.08, length * 0.08, 0, 0)
  context.closePath()
  context.fill()

  context.globalAlpha = fish.opacity * 0.28
  context.strokeStyle = fish.accentColor
  context.lineWidth = Math.max(0.7, length * 0.012)
  context.beginPath()
  context.moveTo(-length * 0.03, 0)
  context.quadraticCurveTo(-length * 0.18, -length * 0.1, -length * 0.3, -length * 0.22)
  context.moveTo(-length * 0.03, 0)
  context.quadraticCurveTo(-length * 0.18, length * 0.1, -length * 0.3, length * 0.22)
  context.stroke()
  context.restore()
}

function drawFishRearFins(context, fish, length, bodyHeight) {
  context.fillStyle = fish.color
  context.globalAlpha = fish.opacity * 0.56

  context.beginPath()
  context.moveTo(-length * 0.12, -bodyHeight * 0.72)
  context.bezierCurveTo(-length * 0.08, -length * 0.31, length * 0.12, -length * 0.29, length * 0.17, -bodyHeight * 0.52)
  context.quadraticCurveTo(length * 0.03, -bodyHeight * 0.64, -length * 0.12, -bodyHeight * 0.72)
  context.fill()

  context.beginPath()
  context.moveTo(-length * 0.08, bodyHeight * 0.68)
  context.quadraticCurveTo(-length * 0.01, length * 0.25, length * 0.11, bodyHeight * 0.55)
  context.quadraticCurveTo(length * 0.01, bodyHeight * 0.68, -length * 0.08, bodyHeight * 0.68)
  context.fill()
}

function drawFishBody(context, fish, length, bodyHeight) {
  context.globalAlpha = fish.opacity
  context.fillStyle = fish.color
  context.shadowColor = fish.color
  context.shadowBlur = length * 0.24
  context.beginPath()
  context.moveTo(-length * 0.38, 0)
  context.bezierCurveTo(-length * 0.2, -bodyHeight * 0.96, length * 0.25, -bodyHeight * 1.05, length * 0.5, -bodyHeight * 0.08)
  context.quadraticCurveTo(length * 0.53, 0, length * 0.5, bodyHeight * 0.08)
  context.bezierCurveTo(length * 0.25, bodyHeight * 1.05, -length * 0.2, bodyHeight * 0.96, -length * 0.38, 0)
  context.fill()

  context.shadowBlur = 0
  context.globalAlpha = fish.opacity * 0.34
  context.fillStyle = fish.accentColor
  context.beginPath()
  context.moveTo(-length * 0.2, -bodyHeight * 0.42)
  context.bezierCurveTo(length * 0.02, -bodyHeight * 0.82, length * 0.31, -bodyHeight * 0.62, length * 0.43, -bodyHeight * 0.16)
  context.bezierCurveTo(length * 0.19, -bodyHeight * 0.42, -length * 0.02, -bodyHeight * 0.2, -length * 0.2, -bodyHeight * 0.42)
  context.fill()
}

function drawFishPectoralFin(context, fish, length, bodyHeight) {
  const finWave = Math.sin(fish.tailPhase + Math.PI * 0.35) * length * 0.025
  context.globalAlpha = fish.opacity * 0.58
  context.fillStyle = fish.accentColor
  context.beginPath()
  context.moveTo(length * 0.04, bodyHeight * 0.12)
  context.bezierCurveTo(-length * 0.04, bodyHeight * 0.38, -length * 0.13, length * 0.24 + finWave, length * 0.12, bodyHeight * 0.47)
  context.quadraticCurveTo(length * 0.18, bodyHeight * 0.25, length * 0.04, bodyHeight * 0.12)
  context.fill()

  context.globalAlpha = fish.opacity * 0.3
  context.strokeStyle = fish.detailColor
  context.lineWidth = Math.max(0.65, length * 0.01)
  context.beginPath()
  context.moveTo(length * 0.055, bodyHeight * 0.17)
  context.quadraticCurveTo(length * 0.01, bodyHeight * 0.42, -length * 0.07, length * 0.18 + finWave)
  context.stroke()
}

function drawFishFaceAndDetails(context, fish, length, bodyHeight) {
  const detailWidth = Math.max(0.8, length * 0.014)
  context.shadowBlur = 0
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.strokeStyle = fish.detailColor
  context.lineWidth = detailWidth

  // Gill cover and lateral line keep the head distinct from the body.
  context.globalAlpha = fish.opacity * 0.64
  context.beginPath()
  context.moveTo(length * 0.22, -bodyHeight * 0.52)
  context.quadraticCurveTo(length * 0.14, 0, length * 0.22, bodyHeight * 0.55)
  context.moveTo(length * 0.14, bodyHeight * 0.25)
  context.quadraticCurveTo(-length * 0.08, bodyHeight * 0.08, -length * 0.29, bodyHeight * 0.12)
  context.stroke()

  // A short curved mouth remains visible without turning the fish into a cartoon.
  context.globalAlpha = fish.opacity * 0.82
  context.beginPath()
  context.moveTo(length * 0.42, bodyHeight * 0.08)
  context.quadraticCurveTo(length * 0.48, bodyHeight * 0.2, length * 0.505, bodyHeight * 0.08)
  context.stroke()

  const eyeX = length * 0.32
  const eyeY = -bodyHeight * 0.28
  const eyeRadius = Math.max(2.1, length * 0.041)
  context.globalAlpha = Math.min(1, fish.opacity + 0.24)
  context.fillStyle = fish.accentColor
  context.beginPath()
  context.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = fish.detailColor
  context.beginPath()
  context.arc(eyeX + eyeRadius * 0.18, eyeY + eyeRadius * 0.08, eyeRadius * 0.56, 0, Math.PI * 2)
  context.fill()

  context.globalAlpha = 0.92
  context.fillStyle = '#ffffff'
  context.beginPath()
  context.arc(eyeX + eyeRadius * 0.37, eyeY - eyeRadius * 0.22, Math.max(0.55, eyeRadius * 0.18), 0, Math.PI * 2)
  context.fill()
}

/** Draws one detailed, glowing fish in local screen coordinates. */
function drawOfficialFish(context, fish) {
  const length = fish.length
  const bodyHeight = length * 0.19

  context.save()
  context.translate(fish.x, fish.y)
  context.rotate(fish.heading)
  drawFishTail(context, fish, length, bodyHeight)
  drawFishRearFins(context, fish, length, bodyHeight)
  drawFishBody(context, fish, length, bodyHeight)
  drawFishPectoralFin(context, fish, length, bodyHeight)
  drawFishFaceAndDetails(context, fish, length, bodyHeight)
  context.restore()
}


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

function createFishStates(width, height, random = Math.random, profile = OFFICIAL_FISH_PROFILE) {
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

function advanceFishSchool(
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


const PLUGIN_ID = 'dsh-official-homepage-theme'
const STYLE_SELECTOR = 'style[data-plugin-css="dsh-official-homepage-theme/theme.css"]'
const SETTINGS_KEY = 'dsh.harness-official.pointer-effects.v1'
const DEFAULT_SETTINGS = Object.freeze({
  enabled: true,
  fishEnabled: true,
  gridEnabled: true,
  intensity: 0.86,
})

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

function normalizeSettings(value) {
  const intensity = Number(value?.intensity)
  return Object.freeze({
    enabled: value?.enabled !== false,
    fishEnabled: value?.fishEnabled !== false,
    gridEnabled: value?.gridEnabled !== false,
    intensity: Number.isFinite(intensity) ? Math.min(1, Math.max(0.18, intensity)) : DEFAULT_SETTINGS.intensity
  })
}

function readSettings() {
  try {
    const saved = window.localStorage.getItem(SETTINGS_KEY)
    if (saved !== null) return normalizeSettings(JSON.parse(saved))
  } catch {}
  return DEFAULT_SETTINGS
}

function createSettingsController() {
  let settings = readSettings()
  const listeners = new Set()
  const notify = () => { for (const listener of listeners) listener() }
  const persist = () => {
    try { window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)) } catch {}
  }

  return {
    get: () => settings,
    set: (update) => {
      settings = normalizeSettings({ ...settings, ...update })
      persist()
      notify()
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    }
  }
}

function installPointerEffects(settings) {
  const root = document.documentElement
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  const interactionSources = createOfficialInteractionSources(reducedMotion)
  const field = createOfficialPointerField(reducedMotion, interactionSources)
  const fish = createOfficialFishSchool(reducedMotion, interactionSources)
  const grid = createOfficialElasticGrid(reducedMotion, interactionSources)

  const applySettings = () => {
    const value = settings.get()
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
  const settings = React.useSyncExternalStore(props.pointer.subscribe, props.pointer.get, props.pointer.get)
  const intensityPercent = Math.round(settings.intensity * 100)
  return React.createElement('section', { className: 'dsh-harness-official-settings', 'data-dsh-harness-official-settings': '' },
    React.createElement('div', { className: 'dsh-harness-official-copy' },
      React.createElement('strong', null, '流体效果'),
      React.createElement('span', null, '流体持续缓慢流动，并随鼠标方向、速度和位置产生水波、卷曲、光照与渐进恢复。')
    ),
    React.createElement('label', { className: 'dsh-harness-official-switch' },
      React.createElement('input', {
        type: 'checkbox',
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
        disabled: !settings.enabled,
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
        checked: settings.gridEnabled,
        onChange: (event) => { props.pointer.set({ gridEnabled: event.target.checked }) }
      }),
      React.createElement('span', null, '启用')
    ),
    React.createElement('div', { className: 'dsh-harness-official-copy' },
      React.createElement('strong', null, '小鱼游动'),
      React.createElement('span', null, '两条发光小鱼会随机游动、触边返回，并像鼠标一样扰动流体与弹性网格。')
    ),
    React.createElement('label', { className: 'dsh-harness-official-switch' },
      React.createElement('input', {
        type: 'checkbox',
        checked: settings.fishEnabled,
        onChange: (event) => { props.pointer.set({ fishEnabled: event.target.checked }) }
      }),
      React.createElement('span', null, '启用')
    )
  )
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
    const tokens = installTokenOverrides()
    const pointer = createSettingsController()
    const stopPointerEffects = installPointerEffects(pointer)
    document.documentElement.setAttribute('data-dsh-harness-official-theme', '')
    ctx.on('theme/change', () => { queueMicrotask(tokens.applyTokens) })
    ctx.slots.inject('settings.general.item', () => ctx.slots.register({
      name: 'settings.general.item',
      id: 'harness-official-pointer-effects',
      order: 18,
      inject: () => ({ pointer })
    }, OfficialPointerRow))

    return () => {
      stopPointerEffects()
      stopBackground()
      style?.remove()
      tokens.restore()
      document.documentElement.removeAttribute('data-dsh-harness-official-theme')
    }
  }, 'harness-official-theme: fluid, elastic grid and autonomous fish')
}

module.exports = { apply, inject };
return module.exports; } });
