import { defineConfig } from 'astro/config'

function normalizeBase(input = '/') {
  if (!input || input === '/')
    return '/'
  let base = input.trim()
  if (!base.startsWith('/'))
    base = `/${base}`
  if (!base.endsWith('/'))
    base = `${base}/`
  return base
}

export default defineConfig({
  output: 'static',
  base: normalizeBase(process.env.SITE_BASE || '/'),
  trailingSlash: 'always',
})
