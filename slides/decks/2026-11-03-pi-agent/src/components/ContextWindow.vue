<script setup>
import { computed, ref } from 'vue';
const props = defineProps({ mode: { type: String, default: 'budget' } });
const initialLogs = props.mode === 'compaction' ? 4 : 2;
const logs = ref(initialLogs);
const compacted = ref(false);
const units = computed(() => 34 + (compacted.value ? 14 : logs.value * 18));
const blocks = computed(() => [
  { text: '规则', width: 12, kind: 'rules' },
  { text: '目标', width: 10, kind: 'goal' },
  ...(compacted.value ? [{ text: '历史摘要', width: 14, kind: 'summary' }] : Array.from({ length: logs.value }, (_, i) => ({ text: `历史 ${i + 1}`, width: 18, kind: 'history' }))),
  { text: '近期结果', width: 12, kind: 'recent' },
]);
function reset() { logs.value = initialLogs; compacted.value = false; }
</script>

<template>
  <section class="context-demo">
    <div class="budget-title"><span>本轮上下文</span><strong :class="{ over: units > 100 }">{{ units }} / 100</strong></div>
    <div class="window-label">示意容量，非真实 token 数</div>
    <div class="window-track"><div class="window-blocks"><div v-for="(block, i) in blocks" :key="`${block.kind}-${i}`" :class="['window-block', block.kind]" :style="{ width: block.width + '%' }">{{ block.text }}</div></div><div class="window-end"></div></div>
    <div class="budget-state" role="status">{{ units > 100 ? '超出窗口：需要筛选或压缩' : compacted ? '摘要 + 近期结果，可以继续' : '继续工作，历史逐渐增长' }}</div>
    <div v-if="compacted" class="summary-content"><b>摘要保留</b><span>目标：空值返回空字符串</span><span>约束：保留 trim，不修改测试</span><span>进度：已复现，等待修改与复测</span></div>
    <div v-else class="history-caption">读文件 · 测试日志 · 尝试记录 · 更多输出</div>
    <div class="demo-controls">
      <button :disabled="logs >= 5 || compacted" @click="logs++">增加一轮历史</button>
      <button :disabled="compacted" @click="compacted = true">压缩较早历史</button>
      <button class="quiet" @click="reset">重置窗口</button>
    </div>
    <p class="demo-note">{{ mode === 'compaction' ? '压缩有损。摘要缺少细节时，需要重新读取证据。' : '完整记录可以保存，本轮输入仍有容量限制。' }}</p>
  </section>
</template>

<style scoped>
.context-demo { padding-top: 4px; }
.budget-title { display: flex; justify-content: space-between; font-size: 25px; }
.budget-title strong { color: #59d6b4; font-family: monospace; font-size: 32px; }
.budget-title .over { color: #ff8f70; }
.window-label { font-size: 14px; color: #aab7b4; margin: 0 0 20px; }
.window-track { position: relative; border: 1px solid #527168; height: 70px; width: 80%; }
.window-blocks { display: flex; align-items: stretch; height: 100%; width: 100%; }
.window-block { flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-right: 3px solid #0d1514; background: #29443b; font-size: 16px; transition: width .35s; }
.rules { background: #355d50; }.goal { background: #486c55; }.recent { background: #3f6660; }.summary { background: #9c614b; }
.window-end { position: absolute; right: -2px; top: -9px; bottom: -9px; border-right: 2px dashed #ff8f70; }
.window-end::before { content: '窗口上限'; position: absolute; right: -28px; top: -23px; color: #ffb89e; font-size: 13px; white-space: nowrap; }
.budget-state { font-size: 23px; margin: 16px 0; color: #ffb89e; }
.history-caption { color: #aab7b4; font-size: 18px; margin-bottom: 20px; }
.summary-content { display: flex; flex-wrap: wrap; column-gap: 22px; row-gap: 8px; min-height: 48px; margin-bottom: 12px; font-size: 17px; }
.summary-content b { color: #ffb89e; }.summary-content span { color: #cedbd6; }
.demo-note { color: #aab7b4; font-size: 17px !important; margin-top: 16px; }
</style>
