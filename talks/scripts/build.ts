import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { x } from 'tinyexec'

const [base, ...args] = process.argv.slice(2)
if (!base)
  throw new Error('Missing base argument, e.g. /2025/ai-review/')

const cwd = process.cwd()
const root = fileURLToPath(new URL('..', import.meta.url))

const dirDist = join(root, 'dist', `.${base}`)
const dirStale = join(root, 'dist-stale', `.${base}`)

if (existsSync(dirStale)) {
  if (!existsSync(dirDist))
    await fs.mkdir(dirname(dirDist), { recursive: true })
  else
    await fs.rm(dirDist, { recursive: true })
  await fs.cp(dirStale, dirDist, { recursive: true })
  process.exit(0)
}

await fs.mkdir(dirname(dirDist), { recursive: true })

await x('npx', ['slidev', 'build', '--base', base, '--out', `../../dist${base}`, ...args], {
  nodeOptions: {
    cwd,
    stdio: 'inherit',
  },
})
