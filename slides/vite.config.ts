import MarkdownItMagicLink from 'markdown-it-magic-link'
import { defineConfig } from 'vite'
import '@slidev/cli'

export default defineConfig({
  slidev: {
    markdown: {
      markdownItSetup(md) {
        md.use(MarkdownItMagicLink, {
          linksMap: {
            Slidev: 'https://sli.dev',
            Gitea: 'https://gitea.com',
            Git: 'https://git-scm.com',
            SVN: 'https://subversion.apache.org',
            UnoCSS: 'https://github.com/unocss/unocss',
            Shiki: 'https://github.com/shikijs/shiki',
          },
        })
      },
    },
  },
})
