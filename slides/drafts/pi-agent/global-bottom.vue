<template>
  <div class="absolute bottom-4 left-14 right-14 z-10 flex justify-between text-xs opacity-40 pointer-events-none">
    <span>从对话到行动 · Harness</span>
    <span v-if="$slidev.nav.currentPage <= 14">主讲 {{ $slidev.nav.currentPage }} / 14</span>
    <span v-else>可选附录 {{ $slidev.nav.currentPage - 14 }} / {{ $slidev.nav.total - 14 }}</span>
  </div>
</template>
