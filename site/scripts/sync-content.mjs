import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import process from 'node:process'

const root = process.cwd()
const slidesDir = resolve(root, '../slides')
const generatedFile = resolve(root, 'src/generated/talks.json')
const slidesPublicDir = resolve(root, 'public/slides')
const builtSlidesDir = resolve(slidesDir, 'dist')

await fs.mkdir(dirname(generatedFile), { recursive: true })

execFileSync('pnpm', [
  '--dir',
  slidesDir,
  'run',
  'metadata',
  '--',
  '--output',
  '../site/src/generated/talks.json',
], {
  stdio: 'inherit',
})

await fs.rm(slidesPublicDir, { recursive: true, force: true })

try {
  await fs.access(builtSlidesDir)
  await fs.cp(builtSlidesDir, slidesPublicDir, { recursive: true })
}
catch {
  await fs.mkdir(slidesPublicDir, { recursive: true })
}
