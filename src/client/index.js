import { OFFICIAL_HARNESS_THEME_CSS } from './theme.css.js'
import { createOfficialInteractionSources } from './interaction-sources.js'
import { createOfficialPointerField } from './pointer-field.js'
import { createOfficialElasticGrid } from './elastic-grid.js'
import { createOfficialFishSchool } from './fish-school.js'

const PLUGIN_ID = 'dsh-official-homepage-theme'
const STYLE_SELECTOR = 'style[data-plugin-css="dsh-official-homepage-theme/theme.css"]'
const SETTINGS_KEY = 'dsh.harness-official.pointer-effects.v1'
const DEFAULT_SETTINGS = Object.freeze({
  enabled: true,
  fishEnabled: true,
  gridEnabled: true,
  intensity: 0.86,
})

export const inject = ['slots']

export const OFFICIAL_HARNESS_TOKENS = Object.freeze({
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

export function apply(ctx) {
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
