# dsh-official-homepage-theme

[English](README_EN.md) | 中文

`dsh-official-homepage-theme` 是一个面向DSH Web的[DeepSeek Harness官方首页主题](https://www.deepseek.com/harness/en/)插件，在不改变DSH页面结构与交互的前提下，提供流体背景、鼠标弹性网格和双小鱼动态效果。

![预览gif](https://raw.githubusercontent.com/JohnnyTing/dsh-official-homepage-theme/main/static/preview.gif)
![预览图](https://raw.githubusercontent.com/JohnnyTing/dsh-official-homepage-theme/main/static/preview.png)
![设置页](https://raw.githubusercontent.com/JohnnyTing/dsh-official-homepage-theme/main/static/settings.png)


## 功能

- 深蓝渐变、半透明玻璃表面和主题 token；
- 程序化流体背景与鼠标交互效果；
- Canvas2D 鼠标弹性网格；
- 两条自主游动、会避让鼠标的小鱼；
- 效果开关与强度设置；
- `prefers-reduced-motion`、粗指针设备和页面可见性适配；
- 卸载时清理动画、事件、DOM 与图形资源。

## 安装

安装并启用：

```bash
dsh plugin --profile web add dsh-official-homepage-theme
```

### 从 GitHub 安装

直接安装 GitHub 仓库中的最新版本：

```bash
dsh plugin --profile web add github:JohnnyTing/dsh-official-homepage-theme
```

本地开发时使用绝对路径：

```bash
dsh plugin --profile web add /absolute/path/to/dsh-official-homepage-theme
```

该包携带 DSH bundle 配置，安装时会自动加入 profile 并加载主题；完成后刷新或重启 DSH Web。

## 卸载

```bash
dsh plugin --profile web remove dsh-official-homepage-theme
```

## 本地开发

```bash
npm run check
```

该命令会先生成 `lib/`，再执行所有测试。也可以分别执行：

```bash
npm run build
npm run test
```
`lib/*` 为生成产物，不要直接编辑。

## 更新版本
```bash
npm run version:set -- 1.0.3
```

## 目录

```text
src/       # 插件源码
scripts/   # 构建脚本
lib/       # 构建产物
tests/     # 自动化测试
```
