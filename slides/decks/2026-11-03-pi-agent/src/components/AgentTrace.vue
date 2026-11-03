<script setup>
import { computed, ref } from 'vue';

const index = ref(0);
const steps = [
  { actor: '模型决策', lane: 0, action: '目标进入上下文', detail: '空值返回空字符串，保留 trim，只修改 parser。', fact: '目标与约束' },
  { lane: 1, action: 'read 请求交给宿主', detail: 'read({ path: "demo/parser.mjs" })', fact: '读到：return input.trim()' },
  { lane: 2, action: '运行原测试，先看失败', detail: 'node demo/check.mjs', fact: '2 / 4 通过，退出码 1', failure: true },
  { lane: 0, action: '模型生成 edit 请求', detail: 'input.trim() → (input ?? "").trim()', fact: '依据：源代码与两个空值失败' },
  { lane: 2, action: '宿主修改真实文件', detail: '只替换 demo/parser.mjs 中的目标代码', fact: '文件已更新，结果回到上下文' },
  { lane: 2, action: '同一套测试重新运行', detail: 'node demo/check.mjs', fact: '4 / 4 通过，退出码 0' },
  { lane: 1, action: '检查修改范围', detail: 'git diff -- demo/parser.mjs', fact: '只修改 parser，没有改测试' },
  { lane: 0, action: '模型依据证据回复', detail: '说明修改、测试结果与验证范围', fact: '本轮结束，用户可以继续提出任务' },
];
const current = computed(() => steps[index.value]);
</script>

<template>
  <section class="agent-trace">
    <div class="trace-meta">教学回放 · 请求与轨迹为示意 · 不调用模型或本机工具</div>
    <div class="trace-lanes"><div v-for="(lane, i) in ['模型决策', '宿主调度', '文件与进程']" :key="lane" :class="{ active: current.lane === i }"><span>{{ lane }}</span><b>{{ current.lane === i ? '●' : '○' }}</b></div></div>
    <div class="trace-progress" aria-label="回放步骤"><span v-for="(step, i) in steps" :key="i" :class="{ past: i < index, current: i === index }">{{ i + 1 }}</span></div>
    <div class="trace-heading"><span>{{ String(index + 1).padStart(2, '0') }}</span><h2>{{ current.action }}</h2></div>
    <pre class="trace-detail">{{ current.detail }}</pre>
    <p class="trace-fact" :class="{ failure: current.failure }" role="status">{{ current.fact }}</p>
    <nav class="demo-controls" aria-label="教学回放控制">
      <button :disabled="index === 0" @click="index--">上一步</button>
      <span>{{ index + 1 }} / {{ steps.length }}</span>
      <button :disabled="index === steps.length - 1" @click="index++">下一步</button>
      <button class="quiet" @click="index = 0">重置</button>
    </nav>
  </section>
</template>

<style scoped>
.trace-meta { color: var(--muted); font-size: 14px; margin-bottom: 16px; }
.trace-lanes { display: flex; border-bottom: 1px solid var(--line); }
.trace-lanes div { flex: 1; display: flex; justify-content: space-between; padding: 9px 16px; color: #79958c; border-bottom: 3px solid transparent; font-size: 21px; }
.trace-lanes .active { color: #7ee7ce; border-color: #59d6b4; background: #152b24; }
.trace-lanes b { font-size: 19px; }
.trace-progress { display: flex; gap: 8px; margin: 18px 0; }
.trace-progress span { flex: 1; border-top: 3px solid #294139; padding-top: 4px; color: #71887e; font-size: 13px; }
.trace-progress .past { border-color: #59d6b4; }.trace-progress .current { color: #ff8f70; border-color: #ff8f70; }
.trace-heading { display: flex; align-items: baseline; gap: 20px; }
.trace-heading span { color: var(--coral); font-family: monospace; font-size: 32px; }
.trace-heading h2 { font-size: 25px; margin: 0; }
.slidev-layout .trace-actor { font-size: 17px; color: var(--muted); margin: 14px 0; }
.trace-detail { color: #cad8d2; padding: 12px 0; font-size: 17px; line-height: 1.5; white-space: pre-wrap; min-height: 48px; margin: 0; }
.slidev-layout .trace-fact { font-size: 21px; margin: 10px 0 20px; min-height: 32px; color: #7ee7ce; }
.slidev-layout .trace-fact.failure { color: #ff8f70; }
.trace-fact strong { display: inline-block; margin-right: 18px; }
.trace-controls { display: flex; align-items: center; gap: 20px; font-size: 16px; }
.trace-controls button { border: 1px solid var(--line); padding: 7px 18px; color: var(--ink); border-radius: 4px; background: #152620; cursor: pointer; }
.trace-controls button:focus-visible { outline: 2px solid var(--coral); outline-offset: 3px; }
.trace-controls button:disabled { opacity: .3; cursor: default; }
.trace-controls span { color: var(--muted); }
.trace-controls .trace-reset { margin-left: auto; background: transparent; }
</style>
