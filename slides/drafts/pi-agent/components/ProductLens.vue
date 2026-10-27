<script setup>
import { computed, ref } from 'vue';
const selected = ref('Pi');
const products = {
  Pi: { model: 'pi-ai', runtime: 'pi-agent-core', tools: 'coding-agent 工具', focus: '核心分包，扩展组合能力', boundary: '执行边界由集成与宿主环境施加' },
  Codex: { model: '模型调用', runtime: 'Codex Harness', tools: '工具与宿主执行', focus: '会话、事件与执行策略', boundary: '按配置施加沙箱和批准策略' },
  'Claude Code': { model: 'Claude 模型', runtime: 'Claude Code Harness', tools: '内置与扩展工具', focus: '收集上下文、行动、验证', boundary: '工具和上下文管理位于模型外围' },
  OpenCode: { model: '配置的模型', runtime: '主 Agent / 子 Agent', tools: '工具与权限配置', focus: '按任务配置角色与工具', boundary: '实际访问范围由权限与环境共同决定' },
};
const current = computed(() => products[selected.value]);
</script>

<template>
  <section class="product-lens">
    <div class="product-tabs" role="group" aria-label="选择产品"><button v-for="(_, name) in products" :key="name" :aria-pressed="selected === name" @click="selected = name">{{ name }}</button></div>
    <div class="lens-map"><div><span>模型接口</span><strong>{{ current.model }}</strong></div><i>→</i><div><span>运行系统</span><strong>{{ current.runtime }}</strong></div><i>→</i><div><span>行动入口</span><strong>{{ current.tools }}</strong></div></div>
    <div class="lens-focus" role="status">{{ current.focus }}</div>
    <p class="lens-boundary">{{ current.boundary }}</p>
    <p class="lens-note">对应共同职责，内部协议与默认策略各自实现。</p>
  </section>
</template>

<style scoped>
.product-tabs { display: flex; gap: 30px; border-bottom: 1px solid #35534c; }
.product-tabs button { color: #aab7b4; font-size: 22px; padding: 14px 2px; border-bottom: 3px solid transparent; cursor: pointer; }
.product-tabs button[aria-pressed=true] { color: #59d6b4; border-bottom-color: #59d6b4; }
.lens-map { display: flex; align-items: center; gap: 22px; margin-top: 44px; }
.lens-map div { flex: 1; }.lens-map span { display: block; color: #aab7b4; font-size: 16px; margin-bottom: 14px; }
.lens-map strong { display: block; font-size: 23px; line-height: 1.4; min-height: 66px; }
.lens-map i { color: #ff8f70; font-style: normal; font-size: 28px; }
.lens-focus { color: #ffb89e; font-size: 29px; margin-top: 38px; }
.lens-boundary { font-size: 20px !important; margin-top: 14px; }
.lens-note { font-size: 16px !important; color: #aab7b4; margin-top: 20px; }
</style>
