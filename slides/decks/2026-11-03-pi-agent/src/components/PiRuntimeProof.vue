<script setup lang="ts">
import { computed } from 'vue'
import record from '../demo/pi-runtime/result.json'
const props = defineProps<{ step: number }>()
const phases = [
  { label: '读取实现', detail: 'read · call_1', caption: 'Pi 调用 read，把真实文件内容变成工具结果。' },
  { label: '复现报错', detail: 'bash · call_2', caption: '测试失败也进入消息历史，下一次调用能看到报错。' },
  { label: '执行修改', detail: 'edit · call_3', caption: 'Pi 调用 edit，临时目录里的 parser.mjs 真正改变。' },
  { label: '再次验证', detail: 'bash · call_4', caption: '同一个验收脚本重跑，四个约定输入全部通过。' },
  { label: '本轮结束', detail: 'agent_end', caption: '预设回复不再请求工具，Pi 结束本轮。' },
]
const current = computed(() => Math.min(4, Math.max(0, props.step)))
const output = computed(() => current.value < 4 ? record.results[current.value].text.trim() : `${record.modelCalls} 次模型边界调用\n${record.toolExecutions} 次工具执行\n最后事件：${record.finalEvent}`)
</script>

<template>
  <section class="runtime-proof">
    <div class="proof-disclosure">Pi core 1.4.0 真实运行 <span>模型回复预设 · 自定义教学工具</span></div>
    <div class="proof-composition">
      <div class="proof-phases">
        <div v-for="(phase, n) in phases" :key="phase.label" :class="{ current: current === n, past: current > n }"><span>0{{ n + 1 }}</span><div>{{ phase.label }}<small>{{ phase.detail }}</small></div></div>
      </div>
      <div class="proof-output">
        <span>{{ current < 4 ? `${record.results[current].id} → toolResult` : '运行计数与结束事件' }}</span>
        <Transition name="proof-swap" mode="out-in"><pre :key="current" :class="{ failed: current === 1, passed: current === 3 }">{{ output }}</pre></Transition>
      </div>
    </div>
    <p class="proof-caption">{{ phases[current].caption }}</p>
    <div class="proof-command">复现：<code>pnpm --dir demo/pi-runtime demo</code><span>已保存的本地运行记录，页面不执行命令</span></div>
  </section>
</template>

<style scoped>
.runtime-proof { margin-top:25px; }
.proof-disclosure { color:#c8b6ff; font-size:14px; display:flex; gap:30px; border-bottom:1px solid #ffffff19; padding-bottom:14px; }.proof-disclosure>span { color:#a399ae; }
.proof-composition { display:grid; grid-template-columns:255px 1fr; gap:32px; height:272px; padding-top:22px; }
.proof-phases>div { display:flex; gap:18px; color:#5e566c; font-size:18px; line-height:1.15; margin-bottom:11px; transition:color .5s,transform .5s; }.proof-phases>div.current { color:#e1cdef; transform:translateX(5px); }.proof-phases>div.past { color:#91879f; }.proof-phases>div>span { font:11px/24px ui-monospace,monospace; }.proof-phases small { display:block; font:11px/1.3 ui-monospace,monospace; margin-top:3px; opacity:.75; }
.proof-output { border-left:1px solid #ffffff18; padding-left:30px; min-width:0; }.proof-output>span { color:#a291b7; font:12px ui-monospace,monospace; }.proof-output pre { background:none; padding:0; border:0; color:#c9c9d7; font:15px/1.8 ui-monospace,"Microsoft YaHei",monospace; white-space:pre-wrap; overflow-wrap:anywhere; margin-top:24px; }.proof-output pre.failed { color:#edb6a1; font-size:13px; }.proof-output pre.passed { color:#9de7c7; }
.runtime-proof .proof-caption { font-size:18px; color:#d7c9e5; margin:14px 0 0; border-top:1px solid #ffffff18; padding-top:13px; }
.proof-command { display:flex; align-items:baseline; gap:7px; color:#9990a8; font-size:12px; margin-top:13px; }.proof-command code { background:none; color:#b9abc9; font-size:12px; padding:0; }.proof-command>span { margin-left:auto; font-size:11px; }
.proof-swap-enter-active,.proof-swap-leave-active { transition:opacity .22s,transform .22s; }.proof-swap-enter-from { opacity:0; transform:translateY(7px); }.proof-swap-leave-to { opacity:0; transform:translateY(-7px); }
@media(prefers-reduced-motion:reduce) { * { transition:none!important; } }
</style>
