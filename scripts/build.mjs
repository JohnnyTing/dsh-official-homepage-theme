import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const clientPath = resolve(root, 'src/client/index.js')
const client = await readFile(clientPath, 'utf8')
const fluidProfile = await readFile(resolve(root, 'src/client/fluid-profile.js'), 'utf8')
const fluidShaders = await readFile(resolve(root, 'src/client/fluid-shaders.js'), 'utf8')
const pointerField = await readFile(resolve(root, 'src/client/pointer-field.js'), 'utf8')
const interactionSources = await readFile(resolve(root, 'src/client/interaction-sources.js'), 'utf8')
const fishProfile = await readFile(resolve(root, 'src/client/fish-profile.js'), 'utf8')
const fishDrawing = await readFile(resolve(root, 'src/client/fish-drawing.js'), 'utf8')
const fishSchool = await readFile(resolve(root, 'src/client/fish-school.js'), 'utf8')
const elasticGridProfile = await readFile(resolve(root, 'src/client/elastic-grid-profile.js'), 'utf8')
const elasticGrid = await readFile(resolve(root, 'src/client/elastic-grid.js'), 'utf8')

const transformModule = (source) => source
  .replace(/^import[\s\S]*?from '[^']+'\n/gm, '')
  .replace(/export const /g, 'const ')
  .replace(/export function /g, 'function ')

const transformed = transformModule(client)
const transformedFluidProfile = transformModule(fluidProfile)
const transformedFluidShaders = transformModule(fluidShaders)
const transformedPointerField = transformModule(pointerField)
const transformedInteractionSources = transformModule(interactionSources)
const transformedFishProfile = transformModule(fishProfile)
const transformedFishDrawing = transformModule(fishDrawing)
const transformedFishSchool = transformModule(fishSchool)
const transformedElasticGridProfile = transformModule(elasticGridProfile)
const transformedElasticGrid = transformModule(elasticGrid)

const output = [
  "window.__ModuleLoader__.load({ id: 'dsh-official-homepage-theme', factory: (require) => {",
  'var module = { exports: {} };',
  'var exports = module.exports;',
  `const OFFICIAL_HARNESS_THEME_CSS = ${JSON.stringify((await import(resolve(root, 'src/client/theme.css.js'))).OFFICIAL_HARNESS_THEME_CSS)};`,
  transformedFluidProfile,
  transformedFluidShaders,
  transformedFishProfile,
  transformedElasticGridProfile,
  transformedInteractionSources,
  transformedPointerField,
  transformedFishDrawing,
  transformedFishSchool,
  transformedElasticGrid,
  transformed,
  'module.exports = { apply, inject };',
  'return module.exports; } });',
  '',
].join('\n')

await mkdir(resolve(root, 'lib'), { recursive: true })
await writeFile(resolve(root, 'lib/client.js'), output)
await writeFile(resolve(root, 'lib/index.js'), await readFile(resolve(root, 'src/index.js'), 'utf8'))
