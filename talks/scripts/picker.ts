import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import fg from 'fast-glob'
import prompts from 'prompts'
import { x } from 'tinyexec'

async function startPicker(args: string[]) {
  const root = fileURLToPath(new URL('..', import.meta.url))

  const packageFiles = (await fg('*/src/package.json', {
    cwd: root,
    onlyFiles: true,
  })).sort((a, b) => b.localeCompare(a))

  const folders = await Promise.all(packageFiles.map(async (file) => {
    const folder = file.split('/')[0]
    const readme = await fs.readFile(new URL(`../${folder}/README.md`, import.meta.url), 'utf-8').catch(() => '')
    const title = readme.match(/^# (.*)/)?.[1].trim() || ''
    return {
      title: title ? `${folder} | ${title}` : folder,
      value: folder,
    } as const
  }))

  const result = args.includes('-y')
    ? { folder: folders[0]?.value }
    : await prompts([
        {
          type: 'select',
          name: 'folder',
          message: 'Pick a talk',
          choices: folders,
        },
      ])

  args = args.filter(arg => arg !== '-y')

  if (!result.folder)
    return

  await x('pnpm', ['run', ...args], {
    nodeOptions: {
      cwd: new URL(`../${result.folder}/src`, import.meta.url),
      stdio: 'inherit',
    },
  })
}

await startPicker(process.argv.slice(2))
