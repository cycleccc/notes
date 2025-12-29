import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'

type Talk = {
  title: string
  slug: string
  href: string
  presenterHref: string
  overviewHref: string
  entryHref: string
  date?: string
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

function extractFrontmatter(markdown: string) {
  if (!markdown.startsWith('---'))
    return null
  const end = markdown.indexOf('\n---', 3)
  if (end === -1)
    return null
  const fm = markdown.slice(3, end).trim()
  return fm
}

function extractTitle(markdown: string, fallback: string) {
  const fm = extractFrontmatter(markdown)
  if (fm) {
    const m = fm.match(/^\s*title:\s*(.+)\s*$/m)
    if (m?.[1])
      return stripQuotes(m[1])
  }
  const h1 = markdown.match(/^\s*#\s+(.+)\s*$/m)?.[1]
  if (h1)
    return h1.trim()
  return fallback
}

function extractDateFromSlug(slug: string) {
  const m = slug.match(/^(\d{4}-\d{2}-\d{2})\b/)
  return m?.[1]
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function compareTalks(a: Talk, b: Talk) {
  const ad = a.date || ''
  const bd = b.date || ''
  if (ad && bd && ad !== bd)
    return bd.localeCompare(ad)
  if (ad !== bd)
    return bd ? 1 : -1
  return a.title.localeCompare(b.title)
}

async function fileExists(path: string) {
  try {
    await fs.access(path)
    return true
  }
  catch {
    return false
  }
}

async function getTalks() {
  const cwd = process.cwd()
  const distDir = resolve(cwd, 'dist')

  const packageFiles = (await fg('*/src/package.json', {
    cwd,
    onlyFiles: true,
  })).sort()

  const talks: Talk[] = []
  for (const file of packageFiles) {
    const talkRoot = dirname(dirname(file))
    const talkSrcDir = resolve(cwd, talkRoot, 'src')
    const json = JSON.parse(await fs.readFile(resolve(cwd, file), 'utf-8'))

    const command = String(json.scripts?.build || '')
    const baseToken = command.match(/ (\S*)$/)?.[1]
    if (!baseToken)
      continue

    const base = normalizeBase(baseToken)
    const slug = base.replace(/^\/|\/$/g, '')

    const builtIndex = resolve(distDir, slug, 'index.html')
    if (!(await fileExists(builtIndex)))
      continue

    const slidesPath = resolve(talkSrcDir, 'slides.md')
    const slides = await fs.readFile(slidesPath, 'utf-8')
    const title = extractTitle(slides, slug)

    talks.push({
      title,
      slug,
      date: extractDateFromSlug(slug),
      href: `./${slug}/#/1`,
      presenterHref: `./${slug}/#/presenter/1`,
      overviewHref: `./${slug}/#/overview`,
      entryHref: `./${slug}/#/entry`,
    })
  }

  talks.sort(compareTalks)
  return talks
}

function renderIndexHtml(talks: Talk[]) {
  const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ')

  const cards = talks.map((t) => {
    const title = escapeHtml(t.title)
    const slug = escapeHtml(t.slug)
    const date = t.date ? `<span class="badge">${escapeHtml(t.date)}</span>` : ''

    return `
      <article class="card" data-title="${title.toLowerCase()}" data-slug="${slug.toLowerCase()}">
        <div class="card-head">
          <div class="card-title">${title}</div>
          <div class="card-meta">
            ${date}
            <span class="badge mono">${slug}</span>
          </div>
        </div>
        <div class="card-actions">
          <a class="btn primary" href="${t.href}">播放</a>
          <a class="btn" href="${t.presenterHref}">讲者模式</a>
          <a class="btn" href="${t.overviewHref}">总览</a>
          <a class="btn ghost" href="${t.entryHref}">入口</a>
        </div>
      </article>
    `
  }).join('\n')

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark light" />
  <title>Talks</title>
  <style>
    :root{
      --bg: #0b0f1a;
      --panel: rgba(255,255,255,.06);
      --panel2: rgba(255,255,255,.10);
      --text: rgba(255,255,255,.92);
      --muted: rgba(255,255,255,.66);
      --border: rgba(255,255,255,.12);
      --shadow: 0 18px 60px rgba(0,0,0,.45);
      --primary: #60a5fa;
      --primary2: #34d399;
      --danger: #fb7185;
      --radius: 18px;
    }
    html[data-theme="light"]{
      --bg: #f7f8fc;
      --panel: rgba(0,0,0,.04);
      --panel2: rgba(0,0,0,.06);
      --text: rgba(0,0,0,.88);
      --muted: rgba(0,0,0,.58);
      --border: rgba(0,0,0,.10);
      --shadow: 0 16px 48px rgba(17,24,39,.12);
      --primary: #2563eb;
      --primary2: #059669;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
      color:var(--text);
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(96,165,250,.35), transparent 60%),
        radial-gradient(900px 600px at 90% -20%, rgba(52,211,153,.30), transparent 55%),
        radial-gradient(900px 700px at 55% 120%, rgba(251,113,133,.18), transparent 60%),
        var(--bg);
      min-height:100vh;
    }
    a{color:inherit;text-decoration:none}
    .wrap{max-width:1100px;margin:0 auto;padding:28px 18px 56px}
    .topbar{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      margin-bottom:22px;
    }
    .brand{
      display:flex;
      align-items:center;
      gap:10px;
      font-weight:800;
      letter-spacing:.2px;
    }
    .dot{
      width:11px;height:11px;border-radius:999px;
      background: linear-gradient(135deg, var(--primary), var(--primary2));
      box-shadow: 0 0 0 6px rgba(96,165,250,.12);
    }
    .top-actions{display:flex;gap:10px;align-items:center}
    .pill{
      background:var(--panel);
      border:1px solid var(--border);
      border-radius:999px;
      padding:8px 10px;
      color:var(--muted);
      font-size:12px;
    }
    .toggle{
      cursor:pointer;
      background:var(--panel);
      border:1px solid var(--border);
      border-radius:999px;
      padding:8px 12px;
      color:var(--text);
      font-size:12px;
      transition: transform .15s ease, background .15s ease, border-color .15s ease;
    }
    .toggle:hover{transform:translateY(-1px);background:var(--panel2)}

    .hero{
      border:1px solid var(--border);
      background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
      border-radius: calc(var(--radius) + 6px);
      box-shadow: var(--shadow);
      padding:22px 18px;
      overflow:hidden;
      position:relative;
    }
    .hero:before{
      content:"";
      position:absolute; inset:-1px;
      background: radial-gradient(700px 260px at 20% 0%, rgba(96,165,250,.18), transparent 55%),
                  radial-gradient(700px 260px at 85% 0%, rgba(52,211,153,.14), transparent 55%);
      pointer-events:none;
    }
    .hero-inner{position:relative}
    .h1{font-size:26px;line-height:1.12;margin:0 0 8px;font-weight:900}
    .sub{margin:0;color:var(--muted);font-size:14px}
    .search-row{
      display:flex;
      gap:10px;
      margin-top:14px;
      align-items:center;
      flex-wrap:wrap;
    }
    .search{
      flex:1;
      min-width:220px;
      background:rgba(0,0,0,.18);
      border:1px solid var(--border);
      border-radius:12px;
      padding:10px 12px;
      color:var(--text);
      outline:none;
    }
    html[data-theme="light"] .search{background:rgba(255,255,255,.75)}
    .hint{color:var(--muted);font-size:12px}

    .grid{
      margin-top:18px;
      display:grid;
      grid-template-columns: repeat(12, 1fr);
      gap:14px;
    }
    .card{
      grid-column: span 6;
      border:1px solid var(--border);
      border-radius: var(--radius);
      background: var(--panel);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 28px rgba(0,0,0,.18);
      padding:16px 14px;
      display:flex;
      flex-direction:column;
      gap:12px;
      transition: transform .15s ease, background .15s ease, border-color .15s ease;
    }
    .card:hover{transform:translateY(-2px);background:var(--panel2);border-color:rgba(255,255,255,.18)}
    html[data-theme="light"] .card:hover{border-color:rgba(0,0,0,.14)}
    .card-title{font-weight:900;letter-spacing:.2px}
    .card-meta{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
    .badge{
      font-size:12px;
      color:var(--muted);
      border:1px solid var(--border);
      background: rgba(0,0,0,.14);
      padding:4px 8px;
      border-radius:999px;
    }
    html[data-theme="light"] .badge{background: rgba(255,255,255,.85)}
    .mono{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace}
    .card-actions{display:flex;gap:10px;flex-wrap:wrap}
    .btn{
      display:inline-flex;align-items:center;justify-content:center;
      padding:9px 12px;
      border-radius:12px;
      border:1px solid var(--border);
      background: rgba(0,0,0,.12);
      color:var(--text);
      font-size:13px;
      transition: transform .15s ease, background .15s ease, border-color .15s ease;
    }
    html[data-theme="light"] .btn{background: rgba(255,255,255,.7)}
    .btn:hover{transform:translateY(-1px);background:var(--panel2)}
    .btn.primary{
      border-color: rgba(96,165,250,.55);
      background: linear-gradient(135deg, rgba(96,165,250,.32), rgba(52,211,153,.20));
    }
    .btn.ghost{color:var(--muted)}

    .footer{
      margin-top:22px;
      color:var(--muted);
      font-size:12px;
      display:flex;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
    }
    .footer a{color:inherit;text-decoration:underline;text-decoration-color:rgba(255,255,255,.25)}
    html[data-theme="light"] .footer a{text-decoration-color:rgba(0,0,0,.25)}

    @media (max-width: 900px){ .card{grid-column: span 12} }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="topbar">
      <div class="brand"><span class="dot"></span><span>Talks</span></div>
      <div class="top-actions">
        <div class="pill"><span class="mono">${escapeHtml(updatedAt)}</span> 更新</div>
        <button class="toggle" id="themeToggle" type="button">切换主题</button>
      </div>
    </div>

    <section class="hero" aria-label="Talks">
      <div class="hero-inner">
        <h1 class="h1">PPT / Slides</h1>
        <p class="sub">搜索并打开 Slidev 分享（播放 / 讲者模式 / 总览）。</p>
        <div class="search-row">
          <input class="search" id="search" placeholder="搜索标题或 slug…（比如：git / 2025-12-26）" />
          <div class="hint">共 <span id="count">${talks.length}</span> 个</div>
        </div>
      </div>
    </section>

    <section class="grid" id="grid" aria-label="Talk list">
${cards}
    </section>

    <div class="footer">
      <div>Built with <a href="https://sli.dev/">Slidev</a>.</div>
      <div><span class="mono">Tip:</span> 讲者模式需要双屏更爽。</div>
    </div>
  </div>

  <script>
    (function () {
      var root = document.documentElement;
      var key = "talks.theme";
      function apply(theme) {
        if (theme) root.setAttribute("data-theme", theme);
        else root.removeAttribute("data-theme");
      }
      var stored = localStorage.getItem(key);
      if (stored === "light" || stored === "dark") apply(stored);
      else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) apply("light");
      var toggle = document.getElementById("themeToggle");
      toggle && toggle.addEventListener("click", function () {
        var current = root.getAttribute("data-theme");
        var next = current === "light" ? "dark" : "light";
        apply(next);
        localStorage.setItem(key, next);
      });

      var input = document.getElementById("search");
      var grid = document.getElementById("grid");
      var count = document.getElementById("count");
      function update() {
        var q = (input && input.value || "").trim().toLowerCase();
        var cards = grid ? grid.querySelectorAll(".card") : [];
        var shown = 0;
        for (var i = 0; i < cards.length; i++) {
          var el = cards[i];
          var hay = (el.getAttribute("data-title") || "") + " " + (el.getAttribute("data-slug") || "");
          var ok = !q || hay.indexOf(q) !== -1;
          el.style.display = ok ? "" : "none";
          if (ok) shown++;
        }
        if (count) count.textContent = String(shown);
      }
      input && input.addEventListener("input", update);
    })();
  </script>
</body>
</html>
`
}

async function main() {
  const cwd = process.cwd()
  const distDir = resolve(cwd, 'dist')
  await fs.mkdir(distDir, { recursive: true })

  const talks = await getTalks()
  const html = renderIndexHtml(talks)

  await fs.writeFile(resolve(distDir, 'index.html'), html, 'utf-8')
  await fs.writeFile(resolve(distDir, '.nojekyll'), '', 'utf-8')
}

await main()
