import assert from 'node:assert/strict'
import test from 'node:test'
import { createSettingsController, DEFAULT_SETTINGS } from '../src/client/settings.js'

function hostForm(value = DEFAULT_SETTINGS) {
  let snapshot = { status: 'ready', mode: 'host', writable: true, value }
  const listeners = new Set()
  const form = {
    getSnapshot: () => snapshot,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener) },
    publish: update => { snapshot = { ...snapshot, ...update }; for (const listener of listeners) listener() },
    async mutate(ops) {
      const next = { ...snapshot.value }
      for (const op of ops) next[op.path[0]] = op.value
      form.publish({ value: next })
      return true
    },
    listenerCount: () => listeners.size,
  }
  return form
}

test('loads defaults from plugin config without consulting browser storage', () => {
  const form = hostForm()
  const controller = createSettingsController(form)
  assert.deepEqual(controller.get().value, DEFAULT_SETTINGS)
  assert.equal(controller.get().editable, true)
  controller.destroy()
  assert.equal(form.listenerCount(), 0)
})

test('all four preferences survive a fresh client controller using host config', async () => {
  const form = hostForm()
  const first = createSettingsController(form)
  const saved = { enabled: false, fishEnabled: false, gridEnabled: false, intensity: 0.42 }
  assert.equal(await first.set(saved), true)
  first.destroy()
  const restarted = createSettingsController(form)
  assert.deepEqual(restarted.get().value, saved)
  restarted.destroy()
})

test('loading, unavailable and memory-only forms never write default values to host', async () => {
  for (const update of [
    { status: 'loading', value: undefined },
    { status: 'unavailable' },
    { mode: 'memory' },
    { writable: false },
  ]) {
    const form = hostForm()
    form.publish(update)
    form.mutate = () => { throw new Error('must not write') }
    const controller = createSettingsController(form)
    assert.equal(controller.get().editable, false)
    assert.equal(await controller.set({ enabled: false }), false)
    controller.destroy()
  }
})

test('previews a pending write and rolls back with visible failure on refusal', async () => {
  const form = hostForm()
  let settle
  form.mutate = () => new Promise(resolve => { settle = resolve })
  const controller = createSettingsController(form)
  const pending = controller.set({ enabled: false })
  assert.equal(controller.get().value.enabled, false)
  assert.equal(controller.get().saving, true)
  assert.equal(controller.get().editable, true)
  settle(false)
  assert.equal(await pending, false)
  assert.equal(controller.get().value.enabled, true)
  assert.match(controller.get().error, /保存失败/)
  assert.equal(controller.get().editable, true)
  controller.destroy()
})

test('transport failure is reported and subsequent saves still work', async () => {
  const form = hostForm()
  const mutate = form.mutate
  form.mutate = async () => { throw new Error('offline') }
  const controller = createSettingsController(form)
  assert.equal(await controller.set({ gridEnabled: false }), false)
  assert.match(controller.get().error, /保存失败/)
  form.mutate = mutate
  assert.equal(await controller.set({ gridEnabled: false }), true)
  assert.equal(controller.get().error, '')
  assert.equal(controller.get().value.gridEnabled, false)
  controller.destroy()
})

test('rapid slider changes retain the latest preview until ordered host writes settle', async () => {
  const form = hostForm()
  const pending = []
  form.mutate = ops => new Promise(resolve => pending.push(() => {
    const next = { ...form.getSnapshot().value }
    for (const op of ops) next[op.path[0]] = op.value
    form.publish({ value: next })
    resolve(true)
  }))
  const controller = createSettingsController(form)
  const first = controller.set({ intensity: 0.3 })
  const latest = controller.set({ intensity: 0.7 })
  assert.equal(controller.get().value.intensity, 0.7)
  pending[0]()
  await first
  assert.equal(controller.get().value.intensity, 0.7)
  assert.equal(controller.get().saving, true)
  pending[1]()
  await latest
  assert.equal(controller.get().value.intensity, 0.7)
  assert.equal(controller.get().saving, false)
  controller.destroy()
})

test('external config updates propagate and teardown removes subscriptions', () => {
  const form = hostForm()
  const controller = createSettingsController(form)
  let notifications = 0
  controller.subscribe(() => { notifications++ })
  form.publish({ value: { ...DEFAULT_SETTINGS, fishEnabled: false } })
  assert.equal(controller.get().value.fishEnabled, false)
  assert.equal(notifications, 1)
  controller.destroy()
  form.publish({ value: DEFAULT_SETTINGS })
  assert.equal(notifications, 1)
})
