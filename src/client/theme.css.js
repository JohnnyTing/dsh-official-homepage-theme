export const OFFICIAL_HARNESS_THEME_CSS = String.raw`
html[data-dsh-harness-official-theme] {
  --dsh-harness-official-intensity: 0.86;
  color-scheme: dark;
  background: #071323;
}

html[data-dsh-harness-official-theme] body {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  color: var(--dsw-alias-label-primary);
  background: #071323 !important;
}

html[data-dsh-harness-official-theme] #root {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  background: transparent !important;
}

html[data-dsh-harness-official-theme] body::before {
  position: fixed;
  content: '';
  inset: 0;
  pointer-events: none;
}

html[data-dsh-harness-official-theme] body::before {
  z-index: -2;
  background-image:
    radial-gradient(980px 520px at 66% -4%, rgba(195, 216, 220, 0.34), transparent 60%),
    radial-gradient(760px 460px at 18% 20%, rgba(44, 97, 156, 0.42), transparent 68%),
    radial-gradient(640px 420px at 54% 52%, rgba(56, 104, 155, 0.22), transparent 72%),
    radial-gradient(560px 400px at 100% 70%, rgba(219, 221, 203, 0.15), transparent 64%),
    linear-gradient(180deg, #15375e 0%, #0d2949 42%, #071626 100%);
}

html[data-dsh-harness-official-theme] .dsh-harness-official-bg,
html[data-dsh-harness-official-theme] .dsh-harness-official-field,
html[data-dsh-harness-official-theme] .dsh-harness-official-fish,
html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-bg {
  z-index: -1;
  overflow: hidden;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-field {
  z-index: 0;
  opacity: 1;
  -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.91) 8.98%, transparent 100%);
  mask-image: linear-gradient(rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0.91) 8.98%, transparent 100%);
  transition: opacity 180ms ease;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {
  z-index: 5;
  opacity: 1;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.78) 58%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.78) 58%, transparent 100%);
  transition: opacity 180ms ease;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-fish {
  z-index: 2;
  opacity: 1;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.84) 64%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.84) 64%, transparent 100%);
  transition: opacity 180ms ease;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-fish[data-disabled] {
  opacity: 0;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid[data-disabled] {
  opacity: 0;
}

html[data-dsh-harness-official-theme][data-dsh-harness-official-pointer-disabled] .dsh-harness-official-field {
  opacity: 0 !important;
}


html[data-dsh-harness-official-theme] [class*='frame'],
html[data-dsh-harness-official-theme] [class*='centerCol'],
html[data-dsh-harness-official-theme] main {
  background-color: transparent !important;
}

html[data-dsh-harness-official-theme] [class*='centerCol'] [class$='_root'] {
  background-color: transparent !important;
}

html[data-dsh-harness-official-theme] [class*='centerCol'] > *,
html[data-dsh-harness-official-theme] main > * {
  border-color: rgba(215, 233, 255, 0.065) !important;
}

html[data-dsh-harness-official-theme] [class*='_markdown_'],
html[data-dsh-harness-official-theme] [class*='flowItem'] {
  text-shadow: 0 1px 4px rgba(0, 7, 20, 0.72), 0 0 12px rgba(0, 7, 20, 0.38);
}

html[data-dsh-harness-official-theme] [class*='viewArea'] [class*='_scroll'] {
  background: linear-gradient(180deg, rgba(3, 13, 27, 0.28), rgba(3, 13, 27, 0.42)) !important;
}

html[data-dsh-harness-official-theme] ::selection {
  color: #071323;
  background: #d7e8ff;
}

html[data-dsh-harness-official-theme] :focus-visible {
  outline: 1px solid rgba(121, 169, 237, 0.62) !important;
  outline-offset: 2px;
}

html[data-dsh-harness-official-theme] [class*='sidebarCol'] {
  background: linear-gradient(180deg, rgba(6, 20, 39, 0.48), rgba(3, 13, 27, 0.62)) !important;
  border-color: rgba(205, 224, 249, 0.16) !important;
  box-shadow: inset -1px 0 rgba(255, 255, 255, 0.045), 20px 0 70px rgba(0, 11, 30, 0.18) !important;
}

html[data-dsh-harness-official-theme] [class*='sidebarCol'] [class*='_root '],
html[data-dsh-harness-official-theme] [class*='sidebarCol'] [class$='_root'] {
  background-color: transparent !important;
  background-image: none !important;
}

html[data-dsh-harness-official-theme] [role='dialog'] > [class$='_content'] > [class$='_header'],
html[data-dsh-harness-official-theme] [class*='titlebar'],
html[data-dsh-harness-official-theme] [class*='topbar'] {
  background: rgba(9, 27, 51, 0.34) !important;
  border-color: rgba(210, 230, 255, 0.14) !important;
  backdrop-filter: blur(18px) saturate(120%);
}

html[data-dsh-harness-official-theme] [class*='detailsCol'],
html[data-dsh-harness-official-theme] [class*='details'],
html[data-dsh-harness-official-theme] [class*='Details'] {
  background: linear-gradient(180deg, rgba(12, 32, 58, 0.78), rgba(5, 16, 31, 0.9)) !important;
  border-color: rgba(203, 223, 250, 0.14) !important;
  backdrop-filter: blur(20px) saturate(120%);
}

html[data-dsh-harness-official-theme] [data-composer-seat] [class*='_card'],
html[data-dsh-harness-official-theme] [data-composer-seat] [class*='Card'] {
  color: #eef6ff !important;
  background: linear-gradient(145deg, #1f3654, #09192f) !important;
  border-color: rgba(225, 237, 255, 0.14) !important;
  box-shadow: 0 18px 48px rgba(0, 5, 18, 0.28), inset 0 1px rgba(255, 255, 255, 0.07) !important;
}

html[data-dsh-harness-official-theme] [role='dialog'],
html[data-dsh-harness-official-theme] [class*='popover'],
html[data-dsh-harness-official-theme] [class*='menu'],
html[data-dsh-harness-official-theme] [class*='dropdown'] {
  color: #eef6ff !important;
  background: linear-gradient(145deg, rgba(32, 55, 84, 0.78), rgba(12, 29, 51, 0.9)) !important;
  border-color: rgba(225, 237, 255, 0.14) !important;
  box-shadow: 0 24px 70px rgba(0, 5, 18, 0.34), inset 0 1px rgba(255, 255, 255, 0.07) !important;
  backdrop-filter: blur(24px) saturate(128%);
}


html[data-dsh-harness-official-theme] [class*='composer'] textarea,
html[data-dsh-harness-official-theme] [class*='composer'] input,
html[data-dsh-harness-official-theme] textarea,
html[data-dsh-harness-official-theme] input,
html[data-dsh-harness-official-theme] select {
  color: #f5f9ff !important;
  caret-color: #d5e8ff;
}

html[data-dsh-harness-official-theme] [class*='composer'] textarea,
html[data-dsh-harness-official-theme] [class*='composer'] input {
  background: transparent !important;
  border-color: transparent !important;
}

html[data-dsh-harness-official-theme] textarea::placeholder,
html[data-dsh-harness-official-theme] input::placeholder {
  color: rgba(193, 208, 228, 0.72) !important;
}

html[data-dsh-harness-official-theme] button,
html[data-dsh-harness-official-theme] [role='button'] {
  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, color 160ms ease;
}

html[data-dsh-harness-official-theme] button:hover:not(:disabled),
html[data-dsh-harness-official-theme] [role='button']:hover {
  background-color: rgba(183, 211, 247, 0.14) !important;
  border-color: rgba(225, 239, 255, 0.26) !important;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(2, 12, 32, 0.18);
}

html[data-dsh-harness-official-theme] button:active:not(:disabled),
html[data-dsh-harness-official-theme] [role='button']:active {
  transform: translateY(1px) scale(0.995);
}

html[data-dsh-harness-official-theme] [aria-selected='true']:not([role='tab']),
html[data-dsh-harness-official-theme] [aria-current='true'] {
  color: #f7fbff !important;
  background: linear-gradient(135deg, rgba(97, 132, 171, 0.46), rgba(44, 79, 121, 0.42)) !important;
}

html[data-dsh-harness-official-theme] [role='tab'] {
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

html[data-dsh-harness-official-theme] button[role='tab']:hover:not(:disabled) {
  background: rgba(105, 154, 218, 0.08) !important;
}

html[data-dsh-harness-official-theme] [role='tab']:focus-visible {
  outline-color: rgba(121, 169, 237, 0.48) !important;
  outline-offset: 3px;
}

html[data-dsh-harness-official-theme] button[data-chip='1'][class*='_active_'] {
  color: #f7fbff !important;
  background: rgba(105, 154, 218, 0.18) !important;
  border-color: transparent !important;
  box-shadow: inset 0 0 0 1px rgba(164, 199, 243, 0.38) !important;
}

html[data-dsh-harness-official-theme] [data-slot='settings.general.item'] button[class$='_selector'],
html[data-dsh-harness-official-theme] [data-slot='settings.general.item'] button[class*='_themeCube'][aria-pressed='true'],
html[data-dsh-harness-official-theme] [aria-label='命令'][aria-haspopup='listbox'] {
  color: #f6fbff !important;
  background: linear-gradient(145deg, rgba(92, 119, 151, 0.74), rgba(38, 75, 120, 0.84)) !important;
  border: 1px solid rgba(224, 238, 255, 0.28) !important;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.14), 0 10px 28px rgba(0, 10, 31, 0.26) !important;
}

html[data-dsh-harness-official-theme] [class*='home'],
html[data-dsh-harness-official-theme] [class*='Home'],
html[data-dsh-harness-official-theme] [class*='welcome'],
html[data-dsh-harness-official-theme] [class*='Welcome'] {
  background-color: transparent !important;
  background-image: none !important;
}

html[data-dsh-harness-official-theme] [class*='composer']::before,
html[data-dsh-harness-official-theme] [class*='composer']::after {
  opacity: 0.16 !important;
}

html[data-dsh-harness-official-theme] pre,
html[data-dsh-harness-official-theme] .md-code-block {
  overflow: hidden;
  color: #eef6ff !important;
  background: linear-gradient(145deg, rgba(32, 52, 75, 0.78), rgba(12, 29, 51, 0.88)) !important;
  border: 1px solid rgba(224, 237, 255, 0.15) !important;
  border-radius: 16px;
  box-shadow: 0 22px 56px rgba(0, 6, 20, 0.32), inset 0 1px rgba(255, 255, 255, 0.07) !important;
}

html[data-dsh-harness-official-theme] pre code,
html[data-dsh-harness-official-theme] code {
  color: inherit !important;
}

html[data-dsh-harness-official-theme] :not(pre) > code {
  color: #d8eaff !important;
  background: rgba(137, 174, 220, 0.17) !important;
  border: 1px solid rgba(205, 225, 250, 0.12) !important;
}


html[data-dsh-harness-official-theme] .dsh-harness-official-settings {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) auto;
  gap: 12px 20px;
  align-items: center;
  width: 100%;
  min-width: 0;
  padding: 16px 0;
  border-top: 1px solid rgba(210, 229, 255, 0.14);
}

html[data-dsh-harness-official-theme] .dsh-harness-official-copy {
  display: grid;
  gap: 4px;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-copy strong {
  color: #f2f8ff;
  font-size: 14px;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-copy span,
html[data-dsh-harness-official-theme] .dsh-harness-official-range span {
  color: rgba(195, 212, 234, 0.82);
  font-size: 12px;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #e9f4ff;
  cursor: pointer;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-switch input {
  width: 16px;
  height: 16px;
  accent-color: #c6defe;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-range {
  display: grid;
  grid-column: 1 / -1;
  gap: 8px;
}

html[data-dsh-harness-official-theme] .dsh-harness-official-range input {
  width: min(360px, 100%);
  accent-color: #d5e8ff;
}

html[data-dsh-harness-official-theme] ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

html[data-dsh-harness-official-theme] ::-webkit-scrollbar-track {
  background: rgba(5, 14, 27, 0.72);
}

html[data-dsh-harness-official-theme] ::-webkit-scrollbar-thumb {
  background: linear-gradient(#496d96, #28486e);
  border: 2px solid rgba(5, 14, 27, 0.72);
  border-radius: 999px;
}

@media (max-width: 640px) {
  html[data-dsh-harness-official-theme] [role='dialog'][class$='_panel'] {
    flex-direction: column;
  }

  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_nav'] {
    flex: 0 0 auto;
    width: 100%;
  }

  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_navTitle'] {
    display: none;
  }

  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_navList'] {
    flex-direction: row;
    overflow-x: auto;
    padding: 10px 12px 8px;
  }

  html[data-dsh-harness-official-theme] [role='dialog'] [class*='_navCell'] {
    flex: 0 0 auto;
    width: auto;
    min-width: 96px;
    white-space: nowrap;
  }

  html[data-dsh-harness-official-theme] [role='dialog'] [class$='_content'] {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  html[data-dsh-harness-official-theme] .dsh-harness-official-settings {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px), (hover: none), (pointer: coarse) {
  html[data-dsh-harness-official-theme] .dsh-harness-official-fish,
  html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  html[data-dsh-harness-official-theme] .dsh-harness-official-field,
  html[data-dsh-harness-official-theme] .dsh-harness-official-fish,
  html[data-dsh-harness-official-theme] .dsh-harness-official-elastic-grid,
  html[data-dsh-harness-official-theme] button,
  html[data-dsh-harness-official-theme] [role='button'] {
    transition: none;
  }
}
`
