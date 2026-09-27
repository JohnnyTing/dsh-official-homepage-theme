import z from '@deepseek-ai/schemastery'

// DSH persists volatile Config fields in the active profile's Cordis patch.
export const Config = z.object({
  enabled: z.boolean().default(true).description('流体效果').volatile(),
  fishEnabled: z.boolean().default(true).description('小鱼游动').volatile(),
  gridEnabled: z.boolean().default(true).description('弹性网格').volatile(),
  intensity: z.number().min(0.18).max(1).default(0.86).description('流体交互强度').volatile(),
})

export function apply(ctx) {
  ctx.inject(['settings'], child => {
    if (typeof child.settings.register === 'function') {
      child.settings.register('dsh-official-homepage-theme', z.object({
        enabled: z.boolean().default(true),
        fishEnabled: z.boolean().default(true),
        gridEnabled: z.boolean().default(true),
        intensity: z.number().min(0.18).max(1).default(0.86),
      }))
    } else {
      child.effect(() => child.settings.configure({ auto: false }, ctx.fiber))
    }
  })
}
