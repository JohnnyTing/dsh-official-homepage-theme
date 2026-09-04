import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'
import { OFFICIAL_HARNESS_TOKENS } from '../src/client/index.js'
import { OFFICIAL_HARNESS_THEME_CSS } from '../src/client/theme.css.js'

const root = resolve(import.meta.dirname, '..')

test('generated browser entry registers the official harness theme module', async () => {
  const client = await readFile(resolve(root, 'lib/client.js'), 'utf8')
  const bundlePreview = await readFile(resolve(root, 'tests/fixtures/bundle-preview.html'), 'utf8')
  assert.match(client, /window\.__ModuleLoader__\.load\(\{ id: 'dsh-official-homepage-theme'/)
  assert.match(client, /factory: \(require\) =>/)
  assert.match(client, /module\.exports = \{ apply, inject \}/)
  assert.doesNotMatch(client, /^import\s/m)
  assert.match(client, /function makePointerFieldCanvas\(\)/)
  assert.match(client, /function makeFishCanvas\(\)/)
  assert.match(client, /function makeElasticGridCanvas\(\)/)
  assert.match(client, /function drawOfficialFish\(context, fish\)/)
  assert.doesNotMatch(client, /function makeCanvas\(\)/)
  assert.match(bundlePreview, /src="\.\.\/\.\.\/lib\/client\.js"/)
  assert.match(bundlePreview, /window\.__themePlugin\.apply\(context\)/)
})

test('package exposes a self-installing DSH bundle', async () => {
  const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
  const patch = await readFile(resolve(root, 'cordis.patch.yml'), 'utf8')

  assert.equal(manifest.private, undefined)
  assert.equal(manifest.publishConfig.access, 'public')
  assert.equal(manifest.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(manifest.files.includes('cordis.patch.yml'))
  assert.match(patch, /id: dsh-official-homepage-theme/)
  assert.match(patch, /name: dsh-official-homepage-theme/)
})

test('theme contains scoped visual layer and pointer controls', async () => {
  const client = await readFile(resolve(root, 'lib/client.js'), 'utf8')
  assert.match(client, /data-dsh-harness-official-theme/)
  assert.match(client, /dsh-harness-official-bg/)
  assert.match(client, /dsh-harness-official-field/)
  assert.match(client, /dsh-harness-official-fish/)
  assert.match(client, /dsh-harness-official-settings/)
  assert.match(client, /data-dsh-harness-official-settings/)
  assert.match(client, /prefers-reduced-motion: reduce/)
  assert.match(client, /pointermove/)
  assert.match(client, /pointerdown/)
  assert.match(client, /pointerleave/)
  assert.match(client, /requestAnimationFrame/)
  assert.match(client, /getContext\('webgl2'/)
  assert.match(client, /getContext\('2d'\)/)
  assert.doesNotMatch(client, /createCanvasRenderer|drawFallbackFluid/)
  assert.match(client, /流体效果/)
  assert.match(client, /弹性网格/)
  assert.match(client, /小鱼游动/)
  assert.match(client, /React\.createElement\('span', null, '启用'\)/)
  assert.doesNotMatch(client, /启用鼠标弹性网格/)
  assert.match(client, /流体持续缓慢流动，并随鼠标方向、速度和位置产生水波、卷曲、光照与渐进恢复。/)
})

test('theme keeps tabs and user bubbles on the harness palette', () => {
  assert.equal(OFFICIAL_HARNESS_TOKENS['--dsw-alias-state-business-primary'], '#79a9ed')
  assert.equal(OFFICIAL_HARNESS_TOKENS['--dsw-specific-bubble'], 'rgba(16, 42, 70, 0.9)')
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /\[aria-selected='true'\]:not\(\[role='tab'\]\)/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /\[role='tab'\]:focus-visible \{[\s\S]*?outline-color: rgba\(121, 169, 237, 0\.48\)/)
  assert.doesNotMatch(OFFICIAL_HARNESS_THEME_CSS, /outline: 2px solid rgba\(214, 233, 255, 0\.9\)/)
})

test('theme keeps code block banners on the dark harness palette', () => {
  assert.equal(OFFICIAL_HARNESS_TOKENS['--dsw-alias-markdown-code-block-banner'], '#0a1a30')
})

test('model provider editors inherit a dark module surface without tinting nested headers', () => {
  assert.equal(OFFICIAL_HARNESS_TOKENS['--dsw-alias-bg-module-platform'], '#183653')
  assert.match(
    OFFICIAL_HARNESS_THEME_CSS,
    /\[role='dialog'\] > \[class\$='_content'\] > \[class\$='_header'\]/,
  )
  assert.doesNotMatch(OFFICIAL_HARNESS_THEME_CSS, /\[class\*='header'\]/)
  assert.doesNotMatch(OFFICIAL_HARNESS_THEME_CSS, /\[class\*='Header'\]/)
})

test('selected navigation and session rows do not get a pale inset frame', () => {
  const selectedRule = OFFICIAL_HARNESS_THEME_CSS.match(
    /\[aria-selected='true'\]:not\(\[role='tab'\]\),[\s\S]*?\[aria-current='true'\] \{([\s\S]*?)\}/,
  )

  assert.ok(selectedRule, 'expected the shared selected-state rule to exist')
  assert.doesNotMatch(selectedRule[1], /box-shadow|inset\s+3px/)
})

test('dsh-market selected category pill stays on the dark harness palette', () => {
  const selectedMarketPillRule = OFFICIAL_HARNESS_THEME_CSS.match(
    /button\[data-chip='1'\]\[class\*='_active_'\] \{([\s\S]*?)\}/,
  )

  assert.ok(selectedMarketPillRule, 'expected the dsh-market selected category rule to exist')
  assert.match(selectedMarketPillRule[1], /background: rgba\(105, 154, 218, 0\.18\) !important/)
  assert.match(selectedMarketPillRule[1], /box-shadow: inset 0 0 0 1px rgba\(164, 199, 243, 0\.38\) !important/)
  assert.doesNotMatch(selectedMarketPillRule[1], /rgb\(235, 238, 242\)|#ebeef2/)
})

test('composer command trigger stays dark across dsh command labels', () => {
  assert.match(
    OFFICIAL_HARNESS_THEME_CSS,
    /\[data-composer-seat\] button\[aria-label='命令'\]\[aria-haspopup='listbox'\]/,
  )
  assert.match(
    OFFICIAL_HARNESS_THEME_CSS,
    /\[data-composer-seat\] button\[aria-label='指令'\]\[aria-haspopup='listbox'\]/,
  )

  const commandRule = OFFICIAL_HARNESS_THEME_CSS.match(
    /\[data-composer-seat\] button\[aria-label='命令'\][\s\S]*?\[data-composer-seat\] button\[aria-label='指令'\][^{]*\{([\s\S]*?)\}/,
  )
  assert.ok(commandRule, 'expected one scoped rule for legacy and current command labels')
  assert.match(commandRule[1], /background: linear-gradient/)
  assert.doesNotMatch(commandRule[1], /#f5f6f7|rgb\(245,\s*246,\s*247\)/)
})

test('blank-session chrome stays transparent while the input card blocks the fluid layer', () => {
  const structuralComposerRule = OFFICIAL_HARNESS_THEME_CSS.match(
    /html\[data-dsh-harness-official-theme\] \[class\*='composer'\] \{([^}]*)\}/,
  )
  const inputCardRule = OFFICIAL_HARNESS_THEME_CSS.match(
    /\[data-composer-seat\] \[class\*='_card'\],[\s\S]*?\[data-composer-seat\] \[class\*='Card'\] \{([^}]*)\}/,
  )

  assert.equal(structuralComposerRule, null, 'composer layout wrappers must not receive a glass panel')
  assert.ok(inputCardRule, 'expected a rule scoped to the real composer card')
  const background = inputCardRule[1].match(/background:\s*([^;]+);/)
  assert.ok(background, 'expected the composer card to own a background')
  assert.doesNotMatch(background[1], /rgba\(|transparent/)
})

test('theme keeps the Harness badge text visible on its light plate', () => {
  assert.equal(OFFICIAL_HARNESS_TOKENS['--dsw-alias-label-primary'], '#f5f9ff')
  assert.equal(OFFICIAL_HARNESS_TOKENS['--dsw-alias-label-primary-inverted'], '#102641')
})

test('pointer field uses a bounded flow map instead of expanding ripple queues', async () => {
  const client = await readFile(resolve(root, 'lib/client.js'), 'utf8')
  assert.match(client, /u_previous/)
  assert.match(client, /u_emitters/)
  assert.match(client, /u_velocities/)
  assert.match(client, /u_strengths/)
  assert.match(client, /u_decay/)
  assert.match(client, /u_lightPos/)
  assert.match(client, /u_bloomStrength/)
  assert.match(client, /u_glowColor1/)
  assert.match(client, /fluidNoise/)
  assert.match(client, /curlish/)
  assert.match(client, /TARGET_FRAME_INTERVAL = 1000 \/ 30/)
  assert.match(client, /pointerleave/)
  assert.match(client, /visibilitychange/)
  assert.doesNotMatch(client, /time - lastMoveTime < 170/)
  assert.doesNotMatch(client, /drawRipples|\bripples\b|lastRippleDistance/)
})

test('fluid renderer follows the official WebGL2-only failure path', async () => {
  const pointerSource = await readFile(resolve(root, 'src/client/pointer-field.js'), 'utf8')
  const previewSource = await readFile(resolve(root, 'tests/fixtures/fluid-preview.html'), 'utf8')
  assert.doesNotMatch(pointerSource, /getContext\('2d'\)/)
  assert.doesNotMatch(pointerSource, /createCanvasRenderer|drawFallbackFluid|trailCanvas/)
  assert.match(pointerSource, /if \(renderer === null\) \{\s*canvas\.remove\(\)\s*return \{/)
  assert.equal([...pointerSource.matchAll(/makePointerFieldCanvas\(\)/g)].length, 2)
  assert.match(previewSource, /parameters\.has\('no-webgl'\)/)
  assert.doesNotMatch(previewSource, /parameters\.has\('fallback'\)/)
})

test('theme relies on the procedural fluid canvas instead of static blurred blobs', () => {
  assert.doesNotMatch(OFFICIAL_HARNESS_THEME_CSS, /\.dsh-harness-official-bg span:nth-child/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /\.dsh-harness-official-field \{[\s\S]*?opacity: 1/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /mask-image: linear-gradient\(rgba\(0, 0, 0, 0\.99\)/)
})

test('theme does not leave a second static grid behind the elastic canvas', () => {
  assert.doesNotMatch(OFFICIAL_HARNESS_THEME_CSS, /body::after/)
  assert.doesNotMatch(OFFICIAL_HARNESS_THEME_CSS, /background-size: 82px 82px/)
})

test('pointer field renders beneath host content without screen blending', () => {
  const fieldRules = [...OFFICIAL_HARNESS_THEME_CSS.matchAll(
    /\.dsh-harness-official-field \{([\s\S]*?)\}/g,
  )]
  const fieldRule = fieldRules.find((match) => /z-index: 0/.test(match[1]))

  assert.ok(fieldRule, 'expected the pointer field rule to exist')
  assert.match(fieldRule[1], /z-index: 0/)
  assert.doesNotMatch(fieldRule[1], /mix-blend-mode:\s*screen/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /body \{[\s\S]*?isolation: isolate/)

  const rootRule = OFFICIAL_HARNESS_THEME_CSS.match(/#root \{([\s\S]*?)\}/)
  assert.ok(rootRule, 'expected the host root stacking rule to exist')
  assert.match(rootRule[1], /position: relative/)
  assert.match(rootRule[1], /z-index: 10/)
  assert.match(rootRule[1], /background: transparent/)
  assert.doesNotMatch(rootRule[1], /(?:backdrop-)?filter|\btransform\b|\bperspective\b|\bcontain\b/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /\[class\*='centerCol'\] \[class\$='_root'\]/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /\[class\*='_markdown_'\][\s\S]*?text-shadow:/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /\[class\*='viewArea'\] \[class\*='_scroll'\][\s\S]*?linear-gradient/)
})

test('elastic grid is layered between the fluid field and host content', () => {
  const gridRule = [...OFFICIAL_HARNESS_THEME_CSS.matchAll(
    /\.dsh-harness-official-elastic-grid \{([\s\S]*?)\}/g,
  )].find((match) => /z-index: 5/.test(match[1]))
  assert.ok(gridRule, 'expected the elastic grid layer rule to exist')
  assert.match(gridRule[1], /z-index: 5/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /\.dsh-harness-official-elastic-grid[\s\S]*?pointer-events: none/)
})

test('fish layer sits between fluid and elastic grid without intercepting input', () => {
  const fishRule = [...OFFICIAL_HARNESS_THEME_CSS.matchAll(
    /\.dsh-harness-official-fish \{([\s\S]*?)\}/g,
  )].find((match) => /z-index: 2/.test(match[1]))
  assert.ok(fishRule, 'expected the autonomous fish layer rule')
  assert.match(fishRule[1], /z-index: 2/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /\.dsh-harness-official-fish[\s\S]*?pointer-events: none/)
  assert.match(OFFICIAL_HARNESS_THEME_CSS, /@media \(max-width: 767px\)[\s\S]*?\.dsh-harness-official-fish/)
})

test('settings migrate autonomous fish to enabled and expose an independent toggle', async () => {
  const source = await readFile(resolve(root, 'src/client/index.js'), 'utf8')
  assert.match(source, /fishEnabled: value\?\.fishEnabled !== false/)
  assert.match(source, /checked: settings\.fishEnabled/)
  assert.match(source, /fish\.setEnabled\(value\.fishEnabled\)/)
})

test('theme does not override host dialog layout structure', async () => {
  const client = await readFile(resolve(root, 'lib/client.js'), 'utf8')
  assert.doesNotMatch(client, /\[role='dialog'\] \[class\*='_panel'\]/)
  assert.doesNotMatch(client, /\[role='dialog'\] \[class\*='_nav'\]/)
  assert.doesNotMatch(client, /\[role='dialog'\] \[class\*='_content'\]/)
  assert.doesNotMatch(client, /\[role='dialog'\]:has\(\[data-dsh-harness-official-settings\]\)/)
  assert.doesNotMatch(client, /min-width: min\(720px, calc\(100vw - 32px\)\)/)
})

test('sidebar theme does not trap fixed settings overlays', () => {
  const sidebarRule = OFFICIAL_HARNESS_THEME_CSS.match(
    /\[class\*='sidebarCol'\] \{([\s\S]*?)\}/,
  )

  assert.ok(sidebarRule, 'expected the sidebar theme rule to exist')
  assert.doesNotMatch(sidebarRule[1], /(?:backdrop-)?filter|\btransform\b|\bperspective\b|\bcontain\b/)
})

test('sidebar keeps one translucent veil so the fluid field remains visible', () => {
  const sidebarRule = OFFICIAL_HARNESS_THEME_CSS.match(
    /\[class\*='sidebarCol'\] \{([\s\S]*?)\}/,
  )
  const sidebarContentRule = OFFICIAL_HARNESS_THEME_CSS.match(
    /\[class\*='sidebarCol'\] \[class\*='_root '\],[\s\S]*?\[class\*='sidebarCol'\] \[class\$='_root'\] \{([\s\S]*?)\}/,
  )

  assert.ok(sidebarRule, 'expected the outer sidebar veil to exist')
  const background = sidebarRule[1].match(/background:\s*([^;]+);/)
  assert.ok(background, 'expected the outer sidebar to own a background')
  const alphas = [...background[1].matchAll(/rgba\([^)]*,\s*(0?\.\d+)\)/g)]
    .map((match) => Number(match[1]))
  assert.ok(alphas.length >= 2, 'expected a translucent gradient veil')
  assert.ok(alphas.every((alpha) => alpha <= 0.68), 'sidebar veil must reveal the fluid field')
  assert.ok(sidebarContentRule, 'expected the full-height host sidebar root override')
  assert.match(sidebarContentRule[1], /background-color: transparent/)
  assert.match(sidebarContentRule[1], /background-image: none/)
  assert.doesNotMatch(OFFICIAL_HARNESS_THEME_CSS, /\[class\*='sidebar'\],/)
  assert.doesNotMatch(OFFICIAL_HARNESS_THEME_CSS, /\[class\*='Sidebar'\],/)
})

test('settings dialog uses a full-width content column on narrow viewports', () => {
  const mobileRule = OFFICIAL_HARNESS_THEME_CSS.match(/@media \(max-width: 640px\) \{([\s\S]*?)\n\}/)
  assert.ok(mobileRule, 'expected narrow settings layout rules')
  assert.match(mobileRule[1], /\[role='dialog'\]\[class\$='_panel'\] \{[\s\S]*?flex-direction: column/)
  assert.match(mobileRule[1], /\[class\$='_navList'\] \{[\s\S]*?overflow-x: auto/)
  assert.match(mobileRule[1], /\[class\$='_content'\] \{[\s\S]*?width: 100%/)
})
