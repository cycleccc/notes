<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, ref, watch } from 'vue'

/**
 * A glow effect system powered by blurred polygons.
 *
 * Properties (slide frontmatter):
 * - glow: 'left' | 'right' | 'top' | 'bottom' | 'full' - distribution of polygon points
 * - glowOpacity: number - opacity of polygons (default: 0.4)
 * - glowHue: number - hue shift for polygons (default: 0)
 * - glowSeed: string | false - seed for stable random distribution (default: 'default')
 */

const { currentSlideRoute } = useNav()

export type Range = [number, number]

export type Distribution =
  | 'full'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'

function xmur3(str: string) {
  let hash = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(hash ^ str.charCodeAt(i), 3432918353)
    hash = (hash << 13) | (hash >>> 19)
  }
  return () => {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507)
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909)
    hash ^= hash >>> 16
    return hash >>> 0
  }
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6D2B79F5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createRng(seed: string) {
  const seedGen = xmur3(seed)
  return mulberry32(seedGen())
}

const formatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const distribution = computed(() => (formatter.value.glow || 'full') as Distribution)
const opacity = computed<number>(() => +(formatter.value.glowOpacity || 0.4))
const hue = computed<number>(() => +(formatter.value.glowHue || 0))
const seed = computed<string>(() => (formatter.value.glowSeed === 'false' || formatter.value.glowSeed === false)
  ? Date.now().toString()
  : formatter.value.glowSeed || 'default',
)
const overflow = 0.3
const disturb = 0.3
const disturbChance = 0.3

function distributionToLimits(distribution: Distribution) {
  const min = -0.2
  const max = 1.2
  let x: Range = [min, max]
  let y: Range = [min, max]

  function intersection(a: Range, b: Range): Range {
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
  }

  const limits = distribution.split('-')

  for (const limit of limits) {
    switch (limit) {
      case 'top':
        y = intersection(y, [min, 0.6])
        break
      case 'bottom':
        y = intersection(y, [0.4, max])
        break
      case 'left':
        x = intersection(x, [min, 0.6])
        break
      case 'right':
        x = intersection(x, [0.4, max])
        break
      case 'xcenter':
        x = intersection(x, [0.25, 0.75])
        break
      case 'ycenter':
        y = intersection(y, [0.25, 0.75])
        break
      case 'center':
        x = intersection(x, [0.25, 0.75])
        y = intersection(y, [0.25, 0.75])
        break
      case 'full':
        x = intersection(x, [0, 1])
        y = intersection(y, [0, 1])
        break
      default:
        break
    }
  }

  return { x, y }
}

function distance2([x1, y1]: Range, [x2, y2]: Range) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

function usePoly(number = 16) {
  function getPoints(): Range[] {
    const limits = distributionToLimits(distribution.value)
    const rng = createRng(`${seed.value}-${(currentSlideRoute.value as any).no}`)

    function randomBetween([a, b]: Range) {
      return rng() * (b - a) + a
    }

    function applyOverflow(random: number, overflow: number) {
      random = random * (1 + overflow * 2) - overflow
      return rng() < disturbChance ? random + (rng() - 0.5) * disturb : random
    }

    return Array.from({ length: number })
      .fill(0)
      .map(() => [
        applyOverflow(randomBetween(limits.x), overflow),
        applyOverflow(randomBetween(limits.y), overflow),
      ])
  }

  const points = ref(getPoints())
  const poly = computed(() => points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', '))

  function jumpPoints() {
    const newPoints = new Set(getPoints())
    points.value = points.value.map((oldPoint) => {
      let minDistance = Number.POSITIVE_INFINITY
      let closest: Range | undefined
      for (const newPoint of newPoints) {
        const d = distance2(oldPoint, newPoint)
        if (d < minDistance) {
          minDistance = d
          closest = newPoint
        }
      }
      if (closest)
        newPoints.delete(closest)
      return closest || oldPoint
    })
  }

  watch(currentSlideRoute, () => {
    jumpPoints()
  })

  return poly
}

const poly1 = usePoly(10)
const poly2 = usePoly(6)
const poly3 = usePoly(3)
</script>

<template>
  <div
    class="bg transform-gpu overflow-hidden pointer-events-none"
    :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }"
    aria-hidden="true"
  >
    <div
      class="clip bg-gradient-to-r from-[#9440e3] to-white/10"
      :style="{ 'clip-path': `polygon(${poly1})`, 'opacity': opacity }"
    />
    <div
      class="clip bg-gradient-to-l from-[#41d1ff] to-white/10"
      :style="{ 'clip-path': `polygon(${poly2})`, 'opacity': opacity }"
    />
    <div
      class="clip bg-gradient-to-t from-[#dce354] to-white/10"
      :style="{ 'clip-path': `polygon(${poly3})`, 'opacity': 0.2 }"
    />
  </div>
</template>

<style scoped>
.bg,
.clip {
  transition: all 2.5s ease;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -10;
}

.clip {
  clip-path: circle(75%);
  aspect-ratio: 16 / 9;
  position: absolute;
  inset: 0;
}

.light .clip {
  opacity: 1 !important;
}
</style>

