import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'

const packageFiles = (await fg('*/src/package.json', {
  cwd: process.cwd(),
  onlyFiles: true,
})).sort()

const bases = (await Promise.all(
  packageFiles.map(async (file) => {
    const talkRoot = dirname(dirname(file))
    const json = JSON.parse(await fs.readFile(resolve(process.cwd(), file), 'utf-8'))

    const command = json.scripts?.build
    if (!command)
      return
    const base = command.match(/ (\S*)$/)?.[1]
    if (!base)
      return

    return {
      dir: talkRoot,
      base,
    }
  }),
))
  .filter(Boolean) as Array<{ dir: string, base: string }>

const redirects = bases
  .flatMap(({ base, dir }) => {
    return [
      `
[[redirects]]
from = "/${dir}"
to = "${base}"
status = 302`,
      `
[[redirects]]
from = "${base}*"
to = "${base}index.html"
status = 200`,
    ]
  })
  .join('\n')

const content = `
[build]
publish = "dist"
command = "pnpm run build"

[build.environment]
NODE_VERSION = "22"

${redirects}
`

await fs.writeFile('netlify.toml', content.trim() + '\n', 'utf-8')
