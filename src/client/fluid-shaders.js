export const FLUID_VERTEX_SHADER = `#version 300 es
precision highp float;
out vec2 v_uv;

void main() {
  vec2 positions[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  vec2 position = positions[gl_VertexID];
  v_uv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

export const FLOW_FRAGMENT_SHADER = `#version 300 es
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

export const FLUID_FRAGMENT_SHADER = `#version 300 es
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
