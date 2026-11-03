<script setup>
import { computed } from 'vue';
const props = defineProps({ fixed: Boolean });
const results = computed(() => [
  { label: 'undefined', input: undefined, expected: '' },
  { label: 'null', input: null, expected: '' },
  { label: "''", input: '', expected: '' },
  { label: "'  pi  '", input: '  pi  ', expected: 'pi' },
].map(test => {
  try {
    const output = props.fixed ? (test.input ?? '').trim() : test.input.trim();
    return { ...test, pass: output === test.expected, result: JSON.stringify(output) };
  } catch { return { ...test, pass: false, result: 'TypeError' }; }
}));
</script>

<template>
  <div class="parser-checks">
    <div class="checks-heading">浏览器实际计算 <b>{{ results.filter(x => x.pass).length }} / 4</b></div>
    <div v-for="test in results" :key="test.label" :class="['check-row', { pass: test.pass }]">
      <code>{{ test.label }}</code><span>{{ test.result }}</span><b>{{ test.pass ? '✓' : '×' }}</b>
    </div>
  </div>
</template>

<style scoped>
.checks-heading { font-size: 16px; color: #aab7b4; display: flex; justify-content: space-between; margin-bottom: 15px; }
.checks-heading b { font-size: 26px; color: #59d6b4; }
.check-row { display: grid; grid-template-columns: 1fr 1fr 25px; align-items: center; gap: 12px; padding: 15px 0; border-bottom: 1px solid #35534c; font-size: 18px; }
.check-row span, .check-row b { color: #ff8f70; }.check-row.pass span, .check-row.pass b { color: #59d6b4; }
.check-row b { font-size: 26px; }
</style>
