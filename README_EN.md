# DSH Official Homepage Theme

English | [中文](README.md)

`dsh-official-homepage-theme` brings the [official DeepSeek Harness homepage](https://www.deepseek.com/harness/en/) look to DSH Web without changing the page structure or interactions. It includes a fluid background, a pointer-reactive elastic grid, and two animated fish.

![Theme preview](https://raw.githubusercontent.com/JohnnyTing/dsh-official-homepage-theme/main/static/preview.gif)
![Theme screenshot](https://raw.githubusercontent.com/JohnnyTing/dsh-official-homepage-theme/main/static/preview.png)
![Settings screenshot](https://raw.githubusercontent.com/JohnnyTing/dsh-official-homepage-theme/main/static/settings.png)

## Features

- Deep-blue gradients, translucent glass surfaces, and theme tokens.
- A procedural fluid background that responds to pointer movement.
- A Canvas2D elastic grid.
- Two autonomous fish that avoid the pointer.
- Controls for enabling effects and adjusting their intensity.
- Support for `prefers-reduced-motion`, coarse pointers, and page visibility changes.
- Cleanup of animations, event listeners, DOM nodes, and graphic resources on unload.

## Requirements

- DSH `>=0.1.0-rc.1`.
- The DSH Web profile.

## Install

Install the published package:

```bash
dsh plugin --profile web add dsh-official-homepage-theme
```

### Install from GitHub

Install the latest repository version directly from GitHub:

```bash
dsh plugin --profile web add github:JohnnyTing/dsh-official-homepage-theme
```

After installation, refresh or restart DSH Web to load the theme. The package includes the built `lib/` files required by DSH.

## Local development

Use an absolute path when installing a local checkout:

```bash
dsh plugin --profile web add /absolute/path/to/dsh-official-homepage-theme
```

Build and run the tests:

```bash
npm run check
```

Or run the commands separately:

```bash
npm run build
npm run test
```

`lib/` contains generated files and should not be edited directly.

## Uninstall

```bash
dsh plugin --profile web remove dsh-official-homepage-theme
```

## Project layout

```text
src/       # Plugin source code
scripts/   # Build scripts
lib/       # Generated build output
tests/     # Automated tests
```
