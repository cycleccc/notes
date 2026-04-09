import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'

type DeckMeta = {
  title: string
  slug: string
  summary: string
  date: string | null
  year: string | null
  href: string
  presenterHref: string
  overviewHref: string
  entryHref: string
  sourceDir: string
  readmePath: string
  updatedAt: string
}

function normalizeBase(input: string) {
  let base = input.trim()
  if (!base.startsWith('/'))
    base = `/${base}`
  if (!base.endsWith('/'))
    base = `${base}/`
  return base
}

function stripQuotes(value: string) {
  const v = value.trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
    return v.slice(1, -1)
  return v
}

function stripHtml(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractFrontmatter(markdown: string) {
  if (!markdown.startsWith('---'))
    return null
  const end = markdown.indexOf('\n---', 3)
  if (end === -1)
    return null
  return markdown.slice(3, end).trim()
}

function extractTitle(markdown: string, fallback: string) {
  const fm = extractFrontmatter(markdown)
  if (fm) {
    const match = fm.match(/^\s*title:\s*(.+)\s*$/m)
    if (match?.[1])
      return stripQuotes(match[1])
  }
  const h1 = markdown.match(/^\s*#\s+(.+)\s*$/m)?.[1]
  if (h1)
    return h1.trim()
  return fallback
}

function extractSummary(markdown: string) {
  const body = markdown.replace(/^---[\s\S]*?\n---\n?/, '')
  const div = body.match(/<div[^>]*text-xl[^>]*>([\s\S]*?)<\/div>/i)?.[1]
  if (div)
    return stripHtml(div)

  const quote = body.match(/^>\s+(.+)$/m)?.[1]
  if (quote)
    return stripHtml(quote)

  const paragraph = body
    .split(/\n{2,}/)
    .map(chunk => stripHtml(chunk))
    .find(chunk => chunk && !chunk.startsWith('#'))

  return paragraph || '技术分享 deck。'
}

function extractDate(slug: string, markdown: string) {
  const fromSlug = slug.match(/^(\d{4}-\d{2}-\d{2})\b/)?.[1]
  if (fromSlug)
    return fromSlug

  const fromBody = markdown.match(/\b(20\d{2}-\d{2}-\d{2})\b/)?.[1]
  if (fromBody)
    return fromBody

  const fromYear = markdown.match(/\b(20\d{2})\b/)?.[1]
  return fromYear || null
}

function compareDecks(a: DeckMeta, b: DeckMeta) {
  const ad = a.date || ''
  const bd = b.date || ''
  if (ad && bd && ad !== bd)
    return bd.localeCompare(ad)
  if (ad !== bd)
    return bd ? 1 : -1
  return a.title.localeCompare(b.title)
}

async function getDecks() {
  const cwd = process.cwd()
  const packageFiles = (await fg('decks/*/src/package.json', {
    cwd,
    onlyFiles: true,
  })).sort()

  const decks = await Promise.all(packageFiles.map(async (file) => {
    const deckRoot = dirname(dirname(file))
    const sourceDir = resolve(cwd, deckRoot, 'src')
    const packagePath = resolve(cwd, file)
    const slidesPath = resolve(sourceDir, 'slides.md')
    const readmePath = resolve(cwd, deckRoot, 'README.md')

    const [pkgRaw, slidesRaw, stat] = await Promise.all([
      fs.readFile(packagePath, 'utf-8'),
      fs.readFile(slidesPath, 'utf-8'),
      fs.stat(slidesPath),
    ])

    const pkg = JSON.parse(pkgRaw)
    const command = String(pkg.scripts?.build || '')
    const baseToken = command.match(/ (\S*)$/)?.[1]
    if (!baseToken)
      throw new Error(`Missing build base in ${file}`)

    const base = normalizeBase(baseToken)
    const slug = base.replace(/^\/|\/$/g, '')
    const title = extractTitle(slidesRaw, slug)
    const summary = extractSummary(slidesRaw)
    const date = extractDate(slug, slidesRaw)

    return {
      title,
      slug,
      summary,
      date,
      year: date?.slice(0, 4) || null,
      href: `/slides/${slug}/index.html#/1`,
      presenterHref: `/slides/${slug}/index.html#/presenter/1`,
      overviewHref: `/slides/${slug}/index.html#/overview`,
      entryHref: `/slides/${slug}/index.html#/entry`,
      sourceDir: deckRoot,
      readmePath: readmePath.replace(`${cwd}/`, ''),
      updatedAt: stat.mtime.toISOString(),
    } satisfies DeckMeta
  }))

  return decks.sort(compareDecks)
}

function getOutputPath() {
  const outputIndex = process.argv.findIndex(arg => arg === '--output' || arg === '-o')
  if (outputIndex === -1)
    return null
  return process.argv[outputIndex + 1] || null
}

const payload = JSON.stringify(await getDecks(), null, 2)
const outputPath = getOutputPath()

if (outputPath) {
  await fs.mkdir(dirname(resolve(process.cwd(), outputPath)), { recursive: true })
  await fs.writeFile(resolve(process.cwd(), outputPath), `${payload}\n`, 'utf-8')
}
else {
  process.stdout.write(`${payload}\n`)
}
