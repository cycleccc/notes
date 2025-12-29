---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
layout: center
glowSeed: 6
title: AI Review + Git/SVN 推行方案
exportFilename: AI-Review-Gitea-Hooks-Git-SVN-slidev-exported
monaco: true
---

<div class="text-5xl font-bold gradient-text mb-6">
AI Review + Git/SVN 推行方案
</div>

<div class="text-xl opacity-80 mb-10">
用 <span class="font-mono">Gitea hooks</span> 做提交门禁；用 <span class="font-mono">refs/ai-reviewed/*</span> 记录“已评审”；再把 Git 提交同步到 SVN。
</div>

<div class="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-0>
    <div class="text-4xl mb-3">🛡️</div>
    <div class="font-mono text-sm">pre-receive 门禁</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-200>
    <div class="text-4xl mb-3">🏷️</div>
    <div class="font-mono text-sm">marker refs</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-400>
    <div class="text-4xl mb-3">🔔</div>
    <div class="font-mono text-sm">飞书通知</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-600>
    <div class="text-4xl mb-3">🔁</div>
    <div class="font-mono text-sm">git-svn 同步</div>
  </div>
</div>

<div class="abs-br m-6 flex gap-2 opacity-60">
  <div class="text-sm">cycleccc</div>
  <div class="text-sm">•</div>
  <div class="text-sm">2025</div>
</div>

---
layout: center
---

# 关键结论

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">✅ 质量门禁：不合格直接拦截</div>
    <div class="text-sm opacity-80 leading-relaxed">
      <span class="font-mono">pre-receive</span> 触发 AI Review；只有标为 <span class="font-mono">CONFIRMED</span> 的明确问题才会拦截。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">🏷️ 通过标记：写到独立 ref</div>
    <div class="text-sm opacity-80 leading-relaxed">
      <span class="font-mono">post-receive</span> 写 <span class="font-mono">refs/ai-reviewed/&lt;branch&gt;</span>，规避 quarantine 阶段不能写 refs 的限制。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-400>
    <div class="text-lg font-semibold mb-2">🔁 push 通过后自动同步 SVN</div>
    <div class="text-sm opacity-80 leading-relaxed">
      本地 wrapper：push 通过后自动 <span class="font-mono">git svn rebase/dcommit</span>，SVN 提交人仍是本人。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-600>
    <div class="text-lg font-semibold mb-2">📊 评分归一化：避免 0/100 过于极端</div>
    <div class="text-sm opacity-80 leading-relaxed">
      评分只用于展示/通知；是否拦截只看规则（<span class="font-mono">minScore</span> + <span class="font-mono">CONFIRMED</span>）。
    </div>
  </div>
</div>

---
layout: center
---

# 背景与目标

<div class="grid grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
  <div v-click="1" class="text-center" transition duration-500 forward:delay-0>
    <div class="text-6xl mb-6">🗂️</div>
    <div class="text-xl font-semibold mb-3 gradient-text">SVN 为主</div>
    <div class="text-sm opacity-75 leading-relaxed">
      管理层仍看 SVN 记录<br/>
      研发日常更想用 Git
    </div>
  </div>
  <div v-click="1" class="text-center" transition duration-500 forward:delay-200>
    <div class="text-6xl mb-6">🧑‍💻</div>
    <div class="text-xl font-semibold mb-3 gradient-text">减少手动步骤</div>
    <div class="text-sm opacity-75 leading-relaxed">
      让“质量检查/同步 SVN”自动化<br/>
      失败直接给可执行的原因
    </div>
  </div>
  <div v-click="1" class="text-center" transition duration-500 forward:delay-400>
    <div class="text-6xl mb-6">🛡️</div>
    <div class="text-xl font-semibold mb-3 gradient-text">质量门禁</div>
    <div class="text-sm opacity-75 leading-relaxed">
      不合格直接拦截<br/>
      降低主分支风险
    </div>
  </div>
</div>

---
layout: center
---

# 关键约束：为什么要分两段

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-12">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">🚧 pre-receive quarantine</div>
    <div class="text-sm opacity-80 leading-relaxed">
      quarantine 阶段 <span class="font-mono">不能写 refs/tags</span>，否则 push 会失败。<br/>
      所以通过标记必须放到 <span class="font-mono">post-receive</span>。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">🧷 Git 没有原生 post-push</div>
    <div class="text-sm opacity-80 leading-relaxed">
      客户端要用 wrapper（或 CI）补 post-push；这里选本地脚本。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-400>
    <div class="text-lg font-semibold mb-2">👤 SVN 提交人由账号决定</div>
    <div class="text-sm opacity-80 leading-relaxed">
      如果服务器用统一账号写 SVN，作者会都变成同一个人；<br/>
      所以 <span class="font-mono">git svn dcommit</span> 必须在开发者本地跑。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-600>
    <div class="text-lg font-semibold mb-2">📌 大 diff / 不涉及目标语言</div>
    <div class="text-sm opacity-80 leading-relaxed">
      只评审指定 paths；diff 太大默认放行，但会记录并提示拆分。
    </div>
  </div>
</div>

---
layout: two-cols-header
class: e2e-flow
---

# 端到端流程：一条命令跑通

::left::

```mermaid
%%{init: {"flowchart": {"nodeSpacing": 24, "rankSpacing": 22}, "themeVariables": {"fontSize": "14px"}} }%%
flowchart TD
  A["开发者：git psvn"] --> B["git push"] --> C["Gitea pre-receive：AI Review"]
  C -->|fail| D["拒绝 push + 通知"]
  C -->|pass| E["Gitea post-receive：写 refs/ai-reviewed/{branch}"]
  subgraph AFTER
    direction LR
    F["飞书通知（读日志）"]
    G["本地检查 marker"] --> H["git svn rebase/dcommit"]
  end
  style AFTER fill:transparent,stroke:transparent,color:transparent
  E --> F
  E --> G
```

::right::

<v-clicks>

- 统一入口：`git psvn`
- 拦截条件：只认 `CONFIRMED`
- “通过标记”：`refs/ai-reviewed/*`

</v-clicks>

---
layout: center
---

# 核心机制 1：只拦 CONFIRMED

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-3">规则</div>
    <ul class="text-sm opacity-80 leading-relaxed space-y-2">
      <li><span class="font-mono">CONFIRMED:</span> 有明确证据的问题（可拦截）</li>
      <li><span class="font-mono">RISK:</span> 风险/信息不足（只提示，不拦截）</li>
      <li>没有 <span class="font-mono">CONFIRMED</span>：即使模型给了 <span class="font-mono">pass=false</span>，也不拦截，只提示</li>
    </ul>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-3">为什么</div>
    <div class="text-sm opacity-80 leading-relaxed">
      拦截只针对可复核的问题，减少误杀；<br/>
      其它建议放到通知里，后续再迭代规则/提示词。
    </div>
  </div>
</div>

---
layout: two-cols
class: mechanism-2
---

# 核心机制 2：证据要求

<div class="glass p-5 rounded-2xl mt-4">
  <div class="text-lg font-semibold mb-2">为什么要“证据”</div>
  <div class="text-sm opacity-75 leading-relaxed">
    让可拦截的问题能复核，减少误杀和争议。
  </div>
</div>

<div class="glass p-5 rounded-2xl mt-3">
  <div class="text-lg font-semibold mb-2">证据格式（任一即可）</div>
  <div class="space-y-2 text-sm opacity-80 leading-relaxed">
    <div v-click class="metric-card p-3">
      <div class="font-semibold mb-1">方式 A：精确定位</div>
      <div class="font-mono text-xs opacity-75">path/to/file.ts:123 或 path/to/file.ts#L123</div>
    </div>
    <div v-click class="metric-card p-3">
      <div class="font-semibold mb-1">方式 B：引用 diff 片段</div>
      <div class="opacity-75 text-xs">直接贴 diff（用反引号包起来）</div>
    </div>
    <div v-click class="metric-card p-3">
      <div class="font-semibold mb-1">自动降级</div>
      <div class="opacity-75 text-xs">缺少证据的 <span class="font-mono">CONFIRMED</span> 会被自动降级为 <span class="font-mono">RISK</span></div>
    </div>
  </div>
</div>

::right::

<div class="glass p-5 rounded-2xl mt-4">
  <div class="text-lg font-semibold mb-2">实现原则</div>
  <ul class="text-sm opacity-80 leading-relaxed space-y-1">
    <li>缺少证据的 <span class="font-mono">CONFIRMED</span> 自动降级为 <span class="font-mono">RISK</span></li>
    <li>拦截必须可复核：给文件/行号或贴 diff 片段</li>
    <li>结果落日志；通知/复盘直接读日志</li>
  </ul>
  <div class="text-xs opacity-70 mt-3">相关脚本在附录</div>
</div>

---
layout: center
---

# 准入规则 + 跳过策略

<v-clicks>

- 门禁：`CONFIRMED` + `minScore`
- 评分：`AI_REVIEW_SCORE_MODE`（只用于展示/通知）

</v-clicks>

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-3">放行规则</div>
    <ul class="text-sm opacity-80 leading-relaxed space-y-2">
      <li>不改 JS/TS：直接放行（可记录）</li>
      <li>diff 太大：默认放行，但提示拆分（可记录）</li>
      <li>紧急：提交信息带 <span class="font-mono">[ai-review:force]</span> 可强制放行（默认关闭，按需开启）</li>
    </ul>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-3">设计思路</div>
    <div class="text-sm opacity-80 leading-relaxed">
      拦截要严格，但日常流程尽量不打扰；更多细节放到通知和复盘里再优化。
    </div>
  </div>
</div>

---
layout: two-cols
---

# 核心机制 3：marker refs（可选）

<v-clicks>

- push 通过后，`post-receive` 写 marker：`refs/ai-reviewed/{branch} -> {newrev}`
- marker 只是标记：写失败不影响 push，只影响二次校验

</v-clicks>

::right::

<div class="glass p-6 rounded-2xl mt-6">
  <div class="text-lg font-semibold mb-3">写 marker 的关键命令</div>
  <pre class="slidev-code text-sm"><code>git update-ref refs/ai-reviewed/&lt;branch&gt; &lt;newrev&gt;</code></pre>
  <div class="text-sm opacity-75 leading-relaxed mt-4">
    marker 写失败不影响 push，只会跳过二次校验。
  </div>
  <div class="text-xs opacity-70 mt-4">完整脚本在附录</div>
</div>

---
layout: two-cols
---

## 环境前置：为什么要推行 WSL

<div class="grid grid-cols-3 gap-6 max-w-6xl mx-auto mt-8 auto-rows-fr">
  <div v-click="1" class="tech-card text-center flex flex-col gap-3 justify-center" transition duration-500>
    <div class="text-5xl">🪟</div>
    <div class="text-lg font-semibold">Windows 只负责 IDE</div>
    <div class="text-sm opacity-70 leading-relaxed">
      编辑 / 调试 / GUI 工具<br/>
      终端不强制统一
    </div>
  </div>
  <div v-click="1" class="tech-card text-center flex flex-col gap-3 justify-center glow-animation" transition duration-500 forward:delay-200>
    <div class="text-5xl">🐧</div>
    <div class="text-lg font-semibold gradient-text">WSL 负责命令行层</div>
    <div class="text-sm opacity-70 leading-relaxed">
      bash + Unix 工具链<br/>
      <span class="font-mono">git svn</span> / wrapper 一次写好，团队通用
    </div>
  </div>
  <div v-click="1" class="tech-card text-center flex flex-col gap-3 justify-center" transition duration-500 forward:delay-400>
    <div class="text-5xl">🏭</div>
    <div class="text-lg font-semibold">贴近 CI / 生产</div>
    <div class="text-sm opacity-70 leading-relaxed">
      Linux 行为更一致<br/>
      减少“只在 Win 出问题”
    </div>
  </div>
</div>

<div v-click="2" class="mt-10 text-center text-lg opacity-80">
没有 WSL：<span class="font-mono">git psvn</span> 很难统一推广，最后还是回到手动同步 SVN
</div>

::right::

<div v-click="2" class="glass p-6 rounded-2xl mt-2" transition duration-500>
  <div class="text-lg font-semibold mb-4">WSL 解决的是“能不能推广”</div>
  <div class="grid grid-cols-2 gap-4">
    <div v-click="2" class="metric-card" transition duration-500>
      <div class="font-semibold mb-1">✅ 可复制</div>
      <div class="text-sm opacity-70">安装/脚本/排障路径统一</div>
    </div>
    <div v-click="2" class="metric-card" transition duration-500 forward:delay-200>
      <div class="font-semibold mb-1">✅ 可自动化</div>
      <div class="text-sm opacity-70">一套命令走通（也更适合脚本/AI）</div>
    </div>
    <div v-click="2" class="metric-card" transition duration-500 forward:delay-400>
      <div class="font-semibold mb-1">✅ 更少分裂</div>
      <div class="text-sm opacity-70">减少 PowerShell/Git Bash 分裂</div>
    </div>
    <div v-click="2" class="metric-card" transition duration-500 forward:delay-600>
      <div class="font-semibold mb-1">✅ 更少重启</div>
      <div class="text-sm opacity-70">依赖/环境变量更好管</div>
    </div>
  </div>
</div>

---
layout: center
---

# 对比：同一件事，两套路径

<div class="grid grid-cols-2 gap-8 max-w-6xl mx-auto mt-10">
<div class="glass p-6 rounded-2xl">
  <div class="text-xl font-semibold mb-4">🪟 Windows 原生（常见问题）</div>
  <div class="space-y-3 text-sm opacity-80">
    <div v-click="1" class="metric-card flex items-center justify-between gap-4" transition duration-400>
      <div class="font-semibold">SVN 提交 / 同步</div>
      <div class="font-mono text-xs op75">慢且不稳（实际体验）</div>
    </div>
    <div v-click="1" class="metric-card flex items-center justify-between gap-4" transition duration-400 forward:delay-200>
      <div class="font-semibold">装 PostgreSQL / 语言依赖</div>
      <div class="font-mono text-xs op75">GUI 多步 + 环境变量 + 重启</div>
    </div>
    <div v-click="1" class="metric-card flex items-center justify-between gap-4" transition duration-400 forward:delay-400>
      <div class="font-semibold">脚本/AI 跑命令</div>
      <div class="font-mono text-xs op75">默认 Linux 语义 -> 先报错再修</div>
    </div>
    <div v-click="1" class="metric-card flex items-center justify-between gap-4" transition duration-400 forward:delay-600>
      <div class="font-semibold">工具链差异</div>
      <div class="font-mono text-xs op75">PowerShell/Git Bash/MSYS2</div>
    </div>
    <div v-click="1" class="metric-card flex items-center justify-between gap-4" transition duration-400 forward:delay-800>
      <div class="font-semibold">编码/路径差异</div>
      <div class="font-mono text-xs op75">更容易遇到编码/路径坑</div>
    </div>
  </div>
</div>

<div class="glass p-6 rounded-2xl">
  <div class="text-xl font-semibold mb-4">🐧 WSL（团队可复制的最短命令行路径）</div>
  <div class="space-y-3">
    <div v-click="2" class="metric-card" transition duration-400>
      <div class="flex items-center justify-between">
        <div class="font-semibold">SVN 同步（统一入口）</div>
        <div class="font-mono text-xs op75">git-svn</div>
      </div>
      <pre class="mt-2 text-xs opacity-80">git psvn</pre>
    </div>
    <div v-click="2" class="metric-card" transition duration-400 forward:delay-200>
      <div class="flex items-center justify-between">
        <div class="font-semibold">装 PostgreSQL（举例）</div>
        <div class="font-mono text-xs op75">apt</div>
      </div>
      <pre class="mt-2 text-xs opacity-80">sudo apt-get update
sudo apt-get install -y postgresql</pre>
    </div>
    <div v-click="2" class="metric-card" transition duration-400 forward:delay-400>
      <div class="flex items-center justify-between">
        <div class="font-semibold">装 ffmpeg（举例）</div>
        <div class="font-mono text-xs op75">apt</div>
      </div>
      <pre class="mt-2 text-xs opacity-80">sudo apt-get install -y ffmpeg</pre>
    </div>
    <div v-click="3" class="text-sm opacity-70 leading-relaxed">
      关键点：把操作变成可重复执行的命令，自动化工具才能稳定执行
    </div>
  </div>
</div>
</div>

---
layout: two-cols
class: wsl-boundary
---

# WSL 的边界与绕法

<div class="glass p-5 rounded-2xl mt-4">
  <div class="text-lg font-semibold mb-2">实践中常见的两个问题</div>
  <div class="space-y-2 text-sm opacity-80 leading-relaxed">
    <div v-click class="metric-card p-3">
      <div class="font-semibold mb-1">小程序 / 微信开发者工具热更新</div>
      <div class="opacity-75 text-xs">很多工具只盯 Windows 路径；产物放在 WSL 文件系统可能监听不到</div>
    </div>
    <div v-click class="metric-card p-3">
      <div class="font-semibold mb-1">局域网访问（手机/同网段设备访问）</div>
      <div class="opacity-75 text-xs">WSL2 默认是 NAT 网络，外部设备未必能直连 WSL 的端口</div>
    </div>
  </div>
</div>

<div v-click class="mt-3 text-sm opacity-70">
排查方式：先判断「文件系统监听」还是「网络转发」
</div>

<div v-click class="mt-3 glass p-3 rounded-2xl">
  <div class="text-sm font-semibold mb-2">其它坑（速记）</div>
  <ul class="text-xs opacity-75 leading-relaxed space-y-1">
    <li>• 仓库尽量别放 <span class="font-mono">/mnt/c</span>（IO 慢、监听不稳）</li>
    <li>• 代理/VPN：配置和排障写文档，少“只在我电脑不行”</li>
    <li>• 权限/大小写：尽早暴露边界问题，贴近 CI/生产</li>
  </ul>
</div>

::right::

<div class="glass p-5 rounded-2xl mt-4">
  <div class="text-lg font-semibold mb-2">处理方式（举例）</div>

  <div v-click class="text-sm opacity-75 mb-2">① 让产物落到 Windows 目录（以 Taro 为例）</div>

  <pre class="mt-2 slidev-code text-xs"><code># WSL (Linux)
export TARO_WEAPP_OUTPUT_ROOT=/mnt/c/Users/&lt;user&gt;/tmp/weapp-dist
pnpm dev:weapp</code></pre>

  <div v-click class="text-sm opacity-75 mb-2 mt-3">② 让局域网访问走 Windows 端口转发（管理员权限执行）</div>

  <pre class="mt-2 slidev-code text-xs"><code># Windows (Admin PowerShell)
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=3000 `
  connectaddress=&lt;wsl-ip&gt; connectport=3000
netsh advfirewall firewall add rule name="Vite 3000" dir=in action=allow protocol=TCP localport=3000</code></pre>

  <div v-click class="text-xs opacity-70 mt-2">
  备注：服务端仍建议在 WSL 内监听 <span class="font-mono">0.0.0.0</span>（例如 Vite 的 <span class="font-mono">--host 0.0.0.0</span>）
  </div>
</div>

---
layout: two-cols
class: alias-slide
---

# 开发者侧：一个 alias，一条命令

例如：

<pre class="mt-3 slidev-code text-xs"><code>git config --global alias.psvn '!./scripts/push-with-svn origin master:master'</code></pre>

<div class="mt-4 glass p-5 rounded-2xl">
  <div class="text-lg font-semibold mb-2">带来的变化</div>
  <div class="space-y-2 text-sm opacity-80 leading-relaxed">
    <div v-click class="metric-card p-3">
      <div class="font-semibold mb-1">统一入口</div>
      <div class="opacity-75 text-xs">push 主分支只用 <span class="font-mono">git psvn</span></div>
    </div>
    <div v-click class="metric-card p-3">
      <div class="font-semibold mb-1">减少手动步骤</div>
      <div class="opacity-75 text-xs">push 成功后自动同步 SVN（失败时输出原因）</div>
    </div>
    <div v-click class="metric-card p-3">
      <div class="font-semibold mb-1">脚本可维护</div>
      <div class="opacity-75 text-xs">团队只维护一套 wrapper</div>
    </div>
  </div>
</div>

::right::

<div class="glass p-5 rounded-2xl mt-4">
  <div class="text-lg font-semibold mb-2">脚本做的事</div>
  <ul class="text-sm opacity-80 leading-relaxed space-y-1">
    <li>先 <span class="font-mono">git push</span></li>
    <li>（可选）校验远端 marker 指向当前 <span class="font-mono">HEAD</span></li>
    <li><span class="font-mono">git svn rebase</span> 后 <span class="font-mono">git svn dcommit</span>（作者仍是本人）</li>
  </ul>
  <div class="text-xs opacity-70 mt-3">脚本在附录</div>
</div>

---
layout: center
---

# 可观测：日志 + 快速校验

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">日志结构</div>
    <div class="text-sm opacity-80 leading-relaxed">
      每次 push 产出一份 JSON 日志（score/pass/reasons/forced/soft_pass）。<br/>
      post-receive 通知直接读日志，不重复计算。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">快速校验 marker</div>
    <pre class="mt-3 slidev-code text-sm"><code>git ls-remote origin "refs/ai-reviewed/master"</code></pre>
  </div>
</div>

---
layout: center
---

# Gitea Actions：自动部署测试环境

<v-clicks>

- 可选：把 push 后的部署/验证交给 CI（不阻塞主流程）
- 目标：主分支更新后自动部署到测试环境，减少手动操作
- 配置见附录

</v-clicks>

---
layout: center
---

# 配置项（示例）

<v-clicks>

- 核心：API Key / Model / Timeout / Diff 上限 / 日志目录
- 门禁：`CONFIRMED` / `RISK` 前缀与证据要求
- 分支：哪些分支参与门禁与 marker
- 示例配置见附录

</v-clicks>

---
layout: center
---

# 落地节奏

<div grid="~ cols-4 gap-4" max-w-6xl mx-auto mt-12>
  <div v-click="1" class="tech-card" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">Phase 1</div>
    <div class="text-sm opacity-80">单仓库试点：误报、耗时、拦截率</div>
  </div>
  <div v-click="1" class="tech-card" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">Phase 2</div>
    <div class="text-sm opacity-80"><span class="font-mono">git psvn</span> 成为统一入口；Windows 统一走 WSL 跑 wrapper</div>
  </div>
  <div v-click="1" class="tech-card" transition duration-500 forward:delay-400>
    <div class="text-lg font-semibold mb-2">Phase 3</div>
    <div class="text-sm opacity-80">模板化：env、hooks、文档</div>
  </div>
  <div v-click="1" class="tech-card" transition duration-500 forward:delay-600>
    <div class="text-lg font-semibold mb-2">Phase 4</div>
    <div class="text-sm opacity-80">持续优化：规则、提示词、降噪</div>
  </div>
</div>

---
layout: center
---

# 补充说明

  <div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
    <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">push 失败时不会触发 post-receive</div>
    <div class="text-sm opacity-80 leading-relaxed">
      所以失败通知要在 pre-receive 里发，或者客户端直接提示。
    </div>
    </div>
    <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">marker 写失败不影响 push</div>
    <div class="text-sm opacity-80 leading-relaxed">
      marker 只用于二次校验；排查分支正则和 post-receive 脚本即可。
    </div>
    </div>
    <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-400>
    <div class="text-lg font-semibold mb-2">评分两极化的处理</div>
    <div class="text-sm opacity-80 leading-relaxed">
      先用 <span class="font-mono">AI_REVIEW_SCORE_MODE=normalize</span>；再把提示词的评分区间收敛。
    </div>
    </div>
    <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-600>
    <div class="text-lg font-semibold mb-2">SVN 未同步的排查</div>
    <div class="text-sm opacity-80 leading-relaxed">
      先确认团队统一用 <span class="font-mono">git psvn</span>；必要时开启 <span class="font-mono">REQUIRE_AI_REVIEW_MARKER=1</span>。
    </div>
    </div>
  </div>

---
layout: center
---

<div class="text-5xl font-bold gradient-text mb-8">
Q&A
</div>

<div class="text-lg opacity-80">
推广到更多仓库：下一步做「模板化 + 数据观测 + 降噪」。
</div>

<div class="text-sm opacity-70 mt-8">
参考：<a href="https://sli.dev/" target="_blank">Slidev</a> · <a href="https://github.com/antfu/talks" target="_blank">antfu/talks</a>
</div>

---
layout: center
---

# 附录

实现细节放在附录：需要时再看，正文只讲方案和边界。

---
layout: center
---

## 附录 · pre-receive 关键逻辑（节选）

<<< @/snippets/10-ai-review.key-parts.sh bash {2-80}

---
layout: center
---

## 附录 · post-receive 写 marker（节选）

<<< @/snippets/20-ai-review-mark-reviewed.sh bash {2-80}

---
layout: center
---

## 附录 · 开发者侧 wrapper（节选）

<<< @/snippets/push-with-svn.sh bash {2-80}

---
layout: center
---

## 附录 · Gitea Actions（示例）

<<< @/snippets/deploy-test.yml yaml {all}

---
layout: center
---

## 附录 · 配置示例

<<< @/snippets/ai-review.env.example bash {all}
