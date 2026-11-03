<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{ step: number; active: boolean }>()
const emit = defineEmits<{ step: [value: number]; next: []; previous: [] }>()
const events = [
  { kind: 'task', title: '修复空值报错', detail: '保留普通字符串的 trim 行为', caption: '目标与约束进入上下文。' },
  { kind: 'read', title: 'demo/parser.mjs', detail: '读到实际实现', caption: '模型请求 read，工具读取文件。' },
  { kind: 'bash', title: 'node demo/check.mjs', detail: 'undefined / null 报错 · exit 1', caption: '失败输出回到模型，成为修改依据。' },
  { kind: 'model', title: '提出 edit 请求', detail: '用 ?? 处理 undefined 与 null', caption: '模型根据代码与报错提出修改。' },
  { kind: 'edit', title: 'demo/parser.mjs', detail: '只修改空值处理', caption: '宿主执行 edit，磁盘文件才发生变化。' },
  { kind: 'bash', title: 'node demo/check.mjs', detail: '四个用例均通过 · exit 0', caption: '重新运行同一组验收，结果交回模型。' },
  { kind: 'diff', title: 'git diff', detail: '确认只改了 parser', caption: '检查差异，确认修改范围。' },
  { kind: 'done', title: '给出修复结论', detail: '引用测试结果与文件差异', caption: '结论来自执行证据。' },
]
const localStep = ref<number | null>(null)
const index = computed(() => Math.max(0, Math.min(7, localStep.value ?? props.step)))
const playing = ref(false)
const visibleEvents = computed(() => events.slice(Math.max(0, index.value - 2), index.value + 1).map((item, n) => ({ ...item, index: Math.max(0, index.value - 2) + n })))
const fixed = computed(() => index.value >= 4)
const tested = computed(() => index.value >= 5)
let timer: ReturnType<typeof setTimeout> | undefined
function pause() { playing.value = false; clearTimeout(timer) }
function setStep(value: number) { localStep.value = value; emit('step', value) }
function go(value: number) { pause(); setStep(value) }
function schedule() {
  clearTimeout(timer)
  if (!playing.value || !props.active) return
  timer = setTimeout(() => {
    if (index.value < 7) { setStep(index.value + 1); schedule() }
    else pause()
  }, 2600)
}
function play() { if (playing.value) return pause(); if (index.value === 7) setStep(0); playing.value = true; schedule() }
function restart() { pause(); setStep(0); playing.value = true; schedule() }
function navigate(direction: number) { pause(); const next = index.value + direction; if (next < 0) emit('previous'); else if (next > 7) emit('next'); else setStep(next) }
watch(() => props.step, value => { if (value !== localStep.value) { pause(); localStep.value = null } })
watch(() => props.active, value => { if (!value) pause() })
onBeforeUnmount(pause)
</script>

<template>
  <section class="repair-replay" :data-step="index" :data-playing="playing" aria-label="修复任务教学回放">
    <div class="session-heading"><span>pi / parser task</span><span>教学模拟</span></div>
    <div class="session-body">
      <div class="execution-log">
        <TransitionGroup name="log" tag="div" class="log-lines">
          <div v-for="event in visibleEvents" :key="event.index" class="log-entry" :class="{ current: event.index === index, failed: event.index === 2 }">
            <div class="log-kind">{{ event.kind }}</div><div><b>{{ event.title }}</b><span>{{ event.detail }}</span></div>
          </div>
        </TransitionGroup>
      </div>
      <div class="file-evidence">
        <div class="file-label">parser.mjs <span v-if="fixed">modified</span></div>
        <pre><code>function parse(input) {
  return <Transition name="patch" mode="out-in"><span :key="String(fixed)" :class="{ fixed }">{{ fixed ? "(input ?? '').trim()" : 'input.trim()' }}</span></Transition>;
}</code></pre>
        <div class="test-inputs">测试输入：<code>undefined</code>、<code>null</code>、<code>''</code>、<code>'  pi  '</code></div>
        <div class="test-score" :class="{ passed: tested, failed: index >= 2 && !tested }"><span>{{ tested ? '4' : index >= 2 ? '2' : '—' }}</span><small>/ 4 通过</small><p>{{ tested ? '约定输入已通过' : index >= 2 ? 'undefined / null 报错' : '等待验证' }}</p></div>
      </div>
    </div>
    <div class="replay-caption" aria-live="polite"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ events[index].caption }}</div>
    <div class="replay-controls" @click.stop @keydown.space.stop @keydown.enter.stop @keydown.right.prevent.stop="navigate(1)" @keydown.left.prevent.stop="navigate(-1)">
      <button @click="play" :aria-pressed="playing">{{ playing ? '暂停' : '自动播放' }}</button>
      <button @click="restart">重放</button>
      <button aria-label="上一步" :disabled="index === 0" @click="go(index - 1)">←</button>
      <button aria-label="下一步" :disabled="index === 7" @click="go(index + 1)">→</button>
      <span>{{ index + 1 }} / 8</span><small>页面不调用模型或本机命令</small>
    </div>
  </section>
</template>

<style scoped>
.repair-replay { margin-top:19px; color:#e8e9ee; }
.session-heading { display:flex; justify-content:space-between; border-bottom:1px solid #ffffff1c; padding-bottom:12px; font:13px ui-monospace,Consolas,monospace; color:#9c9dac; }.session-heading>span:last-child { font:12px "Microsoft YaHei",sans-serif; color:#8a8a9a; }
.session-body { display:grid; grid-template-columns:1fr 1.02fr; gap:44px; height:254px; padding:24px 0 0; }
.execution-log { position:relative; overflow:hidden; }.log-lines { position:relative; }.log-entry { display:grid; grid-template-columns:48px 1fr; gap:14px; margin-bottom:22px; opacity:.32; transition:opacity .5s,transform .5s; }.log-entry.current { opacity:1; }.log-kind { font:13px ui-monospace,Consolas,monospace; color:#c8b6ff; padding-top:3px; }.log-entry b { font:17px/1.35 ui-monospace,"Microsoft YaHei",monospace; display:block; color:#e7e7ed; font-weight:400; }.log-entry span { font-size:13px; display:block; color:#aaaaba; margin-top:7px; }.log-entry.failed.current span { color:#efa99c; }
.file-evidence { padding-left:27px; border-left:1px solid #ffffff14; }.file-label { color:#9b9baa; font:13px ui-monospace,Consolas,monospace; display:flex; gap:14px; align-items:center; }.file-label>span { color:#8bdac3; font-size:11px; }.file-evidence pre { margin:15px 0 0; background:none; padding:0; border:0; font:14px/1.8 ui-monospace,Consolas,monospace; color:#bfc4d5; overflow:visible; }.file-evidence pre code { background:none; padding:0; }.fixed { color:#9de7c7; background:#77bba018; }.test-inputs { font-size:11px; color:#9a98a9; margin-top:12px; white-space:nowrap; }.test-inputs code { font-size:11px; background:none; padding:0; color:#bfc4d5; }.test-score { margin-top:12px; display:flex; align-items:baseline; column-gap:8px; flex-wrap:wrap; color:#d2c5ee; }.test-score>span { font:50px/.98 Georgia,serif; letter-spacing:-.06em; }.test-score>small { font:19px Georgia,serif; color:#77768c; }.test-score>p { width:100%; font-size:13px; margin:8px 0 0; color:#9a98a9; }.test-score.failed>span { color:#eeb59e; }.test-score.passed>span { color:#9de7c7; }
.replay-caption { display:flex; align-items:baseline; gap:17px; border-top:1px solid #ffffff18; padding-top:13px; min-height:46px; font-size:18px; }.replay-caption>span { font:12px ui-monospace,monospace; color:#bfa4d6; }.replay-controls { display:flex; align-items:center; gap:10px; margin-top:6px; font:13px ui-monospace,"Microsoft YaHei",monospace; color:#90909f; }.replay-controls button { cursor:pointer; border:1px solid #ffffff21; padding:5px 11px; border-radius:5px; color:#ceccda; background:#ffffff04; font:inherit; }.replay-controls button:first-child { border-color:#c6b2f34f; color:#d4c1ff; }.replay-controls button:hover:not(:disabled) { background:#c8b6ff16; border-color:#c8b6ff; }.replay-controls button:disabled { opacity:.25; cursor:default; }.replay-controls>small { margin-left:auto; font-size:11px; color:#7f7d90; }.log-enter-active,.log-leave-active,.log-move { transition:opacity .5s,transform .5s; }.log-enter-from { opacity:0!important; transform:translateY(20px); }.log-leave-to { opacity:0; transform:translateY(-20px); }.log-leave-active { position:absolute; width:100%; }.patch-enter-active,.patch-leave-active { display:inline-block; transition:opacity .3s,transform .3s; }.patch-enter-from { opacity:0; transform:translateY(8px); }.patch-leave-to { opacity:0; transform:translateY(-8px); }
@media(prefers-reduced-motion:reduce) { *,*::before,*::after { transition:none!important; animation:none!important; } }
</style>
