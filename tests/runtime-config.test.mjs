import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import test from 'node:test'

// Point this at the target DSH installation's node_modules. Uses an isolated
// profile and only the Loader/settings services; no Web server or user config.
const modules = process.env.DSH_RUNTIME_MODULES

test('real DSH Config saves all preferences to its profile and reloads after restart', {
  skip: !modules && 'Set DSH_RUNTIME_MODULES to a DSH >=0.1.7-rc.2 node_modules directory',
}, async () => {
  const entry = name => join(modules, '@deepseek-ai', name, 'lib/index.js')
  const { boot, readProfilePatches } = await import(pathToFileURL(entry('dsh-app-boot')).href)
  const temp = await mkdtemp(join(tmpdir(), 'theme-config-test-'))
  let ctx
  try {
    const dir = join(temp, 'profile')
    const home = join(temp, 'home')
    await mkdir(dir)
    await mkdir(home)
    await writeFile(join(dir, 'package.json'), JSON.stringify({ name: 'theme-config-test', private: true, dsh: { profile: { bundles: [] } } }))
    const base = join(temp, 'cordis.yml')
    await writeFile(base, '[]\n')
    const id = 'dsh-official-homepage-theme'
    const patchPath = join(dir, 'cordis.patch.yml')
    await writeFile(patchPath, JSON.stringify([{ insert: [
      { id: 'config-editor', name: pathToFileURL(entry('dsh-config-editor')).href },
      { id: 'settings', name: pathToFileURL(entry('dsh-settings')).href },
      { id, name: pathToFileURL(resolve(import.meta.dirname, '../lib/index.js')).href },
    ] }]))
    const installAnchor = join(modules, '@deepseek-ai/dsh/package.json')
    const profile = { name: 'theme-config-test', dir, patchPath, installAnchor, cwd: temp, home, startedBundles: [], overlays: [], telemetryDisabledEnv: undefined }
    const start = () => boot('theme-config-test', base, readProfilePatches(profile.name, profile), host => host.provide('profileContext', profile), pathToFileURL(installAnchor).href)
    ctx = await start()
    const describe = () => ctx.settings.describe().find(row => row.ns === id)
    const first = describe()
    assert.ok(first, 'theme Config must be discovered by actual Loader/settings')
    assert.deepEqual(first.value, { enabled: true, fishEnabled: true, gridEnabled: true, intensity: 0.86 })
    const saved = { enabled: false, fishEnabled: false, gridEnabled: false, intensity: 0.42 }
    await ctx.settings.mutate(id, Object.entries(saved).map(([field, value]) => ({ op: 'set', path: [field], value })), first.revision)
    assert.deepEqual(describe().value, saved)
    assert.match(await readFile(patchPath, 'utf8'), /intensity: 0\.42/)
    await assert.rejects(ctx.settings.mutate(id, [{ op: 'set', path: ['intensity'], value: 2 }], describe().revision))
    await ctx.fiber.dispose()
    ctx = undefined
    ctx = await start()
    assert.deepEqual(describe().value, saved)
  } finally {
    await ctx?.fiber.dispose()
    await rm(temp, { recursive: true, force: true })
  }
})
