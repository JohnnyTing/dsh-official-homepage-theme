import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import * as theme from '../src/index.js'

const modules = process.env.DSH_LEGACY_MODULES
test('legacy host settings persist across restarts without browser storage', { skip: !modules }, async () => {
  const load = name => import(pathToFileURL(join(modules, '@deepseek-ai', name, 'lib/index.js')).href)
  const { Context } = await load('cordis')
  const provider = await load('dsh-settings-file')
  const dir = await mkdtemp(join(tmpdir(), 'theme-legacy-'))
  let ctx
  const start = async () => {
    const root = new Context()
    await root.plugin(provider.default, { path: join(dir, 'settings.yaml'), watch: false })
    await root.plugin(theme)
    await new Promise(resolve => setImmediate(resolve))
    return root
  }
  try {
    ctx = await start()
    const ns = 'dsh-official-homepage-theme'
    assert.equal(ctx.settings.get(ns).enabled, true)
    await ctx.settings.update(ns, { enabled: false, gridEnabled: false, fishEnabled: false, intensity: 0.42 })
    await ctx.fiber.dispose()
    ctx = await start()
    assert.deepEqual(ctx.settings.get(ns), { enabled: false, gridEnabled: false, fishEnabled: false, intensity: 0.42 })
  } finally {
    await ctx?.fiber.dispose()
    await rm(dir, { recursive: true, force: true })
  }
})
