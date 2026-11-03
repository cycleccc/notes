import { spawnSync } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Keep decks with a newer Slidev version on their own frozen dependencies.
const [baseInput] = process.argv.slice(2)
if (!baseInput || !/^\/[a-z0-9-]+\/$/.test(baseInput))
  throw new Error('Expected a deck base such as /2026-11-03-pi-agent/')

const prefix = value => value?.trim().replace(/^\/*|\/*$/g, '') || ''
const base = `/${[prefix(process.env.SITE_BASE), prefix(process.env.SLIDES_MOUNT), prefix(baseInput)].filter(Boolean).join('/')}/`
const outDir = fileURLToPath(new URL(`../dist${baseInput}`, import.meta.url))
await mkdir(outDir, { recursive: true })

// Invoke the installed JS entry directly so this also works on Windows without npm/npx.
const cli = resolve('node_modules/@slidev/cli/bin/slidev.mjs')
const result = spawnSync(process.execPath, [cli, 'build', 'slides.md', '--base', base, '--out', outDir], {
  stdio: 'inherit',
})
if (result.error) throw result.error
process.exit(result.status ?? 1)
