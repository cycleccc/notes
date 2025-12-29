import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { x } from 'tinyexec'

const [baseInput, ...args] = process.argv.slice(2)
if (!baseInput)
  throw new Error('Missing base argument, e.g. /2025/ai-review/')

const normalizeBase = (base: string) => {
  if (!base.startsWith('/'))
    base = `/${base}`
  if (!base.endsWith('/'))
    base = `${base}/`
  return base
}

const normalizePrefix = (prefix: string) => {
  prefix = prefix.trim()
  if (!prefix)
    return ''
  if (!prefix.startsWith('/'))
    prefix = `/${prefix}`
  if (prefix.endsWith('/'))
    prefix = prefix.slice(0, -1)
  return prefix
}

const base = normalizeBase(baseInput)
const urlBase = `${normalizePrefix(process.env.TALKS_URL_PREFIX || '')}${base}`

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

await x('npx', ['slidev', 'build', '--base', urlBase, '--out', `../../dist${base}`, ...args], {
  nodeOptions: {
    cwd,
    stdio: 'inherit',
  },
})
