export const DEFAULT_SETTINGS = Object.freeze({
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
export function createHostSettingsForm(ctx, entryId) {
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
export function createSettingsController(form) {
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
    snapshot = Object.freeze({
      value: preview ?? normalizeSettings(ready ? host.value : DEFAULT_SETTINGS),
      ready,
      loading: host.status === 'loading',
      editable: ready && host.mode === 'host' && host.writable,
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
        if (!accepted && current === generation) error = '设置保存失败，请重试。'
        return accepted
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
