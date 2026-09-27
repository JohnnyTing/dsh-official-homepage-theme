import test from 'node:test'
import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'
import { createHostSettingsForm } from '../src/client/settings.js'
import { inject } from '../src/client/index.js'

const modules = process.env.DSH_RUNTIME_MODULES
for (const service of ['configForms', 'settingsScope', 'absent']) {
  test(`client activates with ${service} using actual Cordis dependency injection`, { skip: !modules }, async () => {
    const { Context } = await import(pathToFileURL(join(modules, '@deepseek-ai/cordis/lib/index.js')).href)
    const ctx = new Context()
    const snapshot = { status: 'ready', mode: 'host', writable: true, value: { enabled: false } }
    const form = { getSnapshot: () => snapshot, subscribe: () => () => {}, mutate: async () => true }
    if (service !== 'absent') ctx.provide(service, service === 'configForms' ? { get: () => form } : { bind: () => form })
    ctx.provide('slots', {})
    let adapter
    const fiber = ctx.plugin({ inject, apply(child) { adapter = createHostSettingsForm(child, 'dsh-official-homepage-theme') } })
    try {
      await fiber
      assert.ok(adapter, 'theme root must activate even without either settings service')
      await new Promise(resolve => setImmediate(resolve))
      assert.equal(adapter.getSnapshot().status, service === 'absent' ? 'unavailable' : 'ready')
      assert.equal(await adapter.mutate([]), service !== 'absent')
      await adapter.destroy()
    } finally { await ctx.fiber.dispose() }
  })
}
