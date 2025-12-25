<template>
    <div class="tech-comparison">
        <div class="comparison-header">
            <h3 class="text-2xl font-bold mb-6 text-center">技术栈对比</h3>
        </div>

        <div class="comparison-grid">
            <div class="tech-stack t3-stack">
                <div class="stack-header">
                    <div class="stack-icon">🎯</div>
                    <h4>T3 Stack</h4>
                    <p class="stack-subtitle">个人/小型项目</p>
                </div>

                <div class="features-list">
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>Next.js + tRPC + Prisma</span>
                    </div>
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>快速原型开发</span>
                    </div>
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>学习曲线平缓</span>
                    </div>
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>社区活跃</span>
                    </div>
                    <div class="feature-item negative">
                        <span class="feature-icon">❌</span>
                        <span>单体架构限制</span>
                    </div>
                    <div class="feature-item negative">
                        <span class="feature-icon">❌</span>
                        <span>大型项目扩展性</span>
                    </div>
                </div>
            </div>

            <div class="vs-divider">
                <div class="vs-circle">VS</div>
            </div>

            <div class="tech-stack enterprise-stack">
                <div class="stack-header">
                    <div class="stack-icon">🏢</div>
                    <h4>企业级技术栈</h4>
                    <p class="stack-subtitle">大型企业项目</p>
                </div>

                <div class="features-list">
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>Monorepo 架构</span>
                    </div>
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>微服务支持</span>
                    </div>
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>企业级工具链</span>
                    </div>
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>更强的类型安全</span>
                    </div>
                    <div class="feature-item positive">
                        <span class="feature-icon">✅</span>
                        <span>更好的性能</span>
                    </div>
                    <div class="feature-item negative">
                        <span class="feature-icon">❌</span>
                        <span>学习成本较高</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tech-comparison {
    @apply w-full max-w-6xl mx-auto p-6;
}

.comparison-grid {
    @apply grid grid-cols-3 gap-8 items-center;
}

.tech-stack {
    @apply p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(10px);
}

.t3-stack {
    @apply border-blue-300;
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
}

.enterprise-stack {
    @apply border-green-300;
    box-shadow: 0 0 30px rgba(34, 197, 94, 0.2);
}

.stack-header {
    @apply text-center mb-6;
}

.stack-icon {
    @apply text-4xl mb-2;
}

.stack-header h4 {
    @apply text-xl font-bold mb-1;
}

.stack-subtitle {
    @apply text-sm opacity-70;
}

.features-list {
    @apply space-y-3;
}

.feature-item {
    @apply flex items-center space-x-3 p-2 rounded-lg transition-all duration-200;
}

.feature-item.positive {
    @apply text-green-600 dark:text-green-400;
}

.feature-item.negative {
    @apply text-red-600 dark:text-red-400;
}

.feature-item:hover {
    @apply bg-white bg-opacity-10;
}

.feature-icon {
    @apply text-lg flex-shrink-0;
}

.vs-divider {
    @apply flex justify-center items-center;
}

.vs-circle {
    @apply w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg;
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}
</style>
