import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const usage = 'Usage: npm run version:set -- <semver> [--dry-run]'
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/
const args = process.argv.slice(2)
const dryRunIndex = args.indexOf('--dry-run')
const dryRun = dryRunIndex !== -1

if (dryRun) args.splice(dryRunIndex, 1)

const [version, ...extraArgs] = args

if (!version || extraArgs.length > 0 || !semverPattern.test(version)) {
  console.error(usage)
  process.exitCode = 1
} else {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const versionFiles = ['package.json', 'dsh.plugin.json']
  const updates = await Promise.all(versionFiles.map(async (file) => {
    const filePath = path.join(rootDir, file)
    const manifest = JSON.parse(await readFile(filePath, 'utf8'))

    if (typeof manifest.version !== 'string') {
      throw new Error(`${file} does not contain a string version field`)
    }

    return { file, filePath, manifest, previousVersion: manifest.version }
  }))

  for (const update of updates) {
    if (update.previousVersion === version) {
      console.log(`Already set ${update.file} to ${version}`)
      continue
    }

    update.manifest.version = version
    const message = `${update.file}: ${update.previousVersion} -> ${version}`

    if (dryRun) {
      console.log(`Would update ${message}`)
      continue
    }

    await writeFile(update.filePath, `${JSON.stringify(update.manifest, null, 2)}\n`)
    console.log(`Updated ${message}`)
  }
}
