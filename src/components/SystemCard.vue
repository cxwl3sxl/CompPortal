<template>
  <a
    :href="system.url"
    target="_blank"
    rel="noopener noreferrer"
    class="system-card"
    :class="viewMode"
  >
    <div class="card-icon" :style="{ background: gradients[hash] }">
      <img
        v-if="system.iconUrl"
        :src="system.iconUrl"
        :alt="system.name"
        class="icon-img"
      />
      <font-awesome-icon v-else-if="system.icon" :icon="['fas', system.icon]" class="card-fa-icon" />
      <svg v-else viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M3 9h18" />
      </svg>
    </div>
    <div class="card-content">
      <h3 class="card-name">{{ system.name }}</h3>
      <el-tooltip
        :content="system.description"
        placement="bottom"
        :disabled="!isOverflowing"
        popper-class="card-desc-tooltip"
      >
        <p ref="descRef" class="card-desc">{{ system.description }}</p>
      </el-tooltip>
      <div class="card-meta" v-if="viewMode === 'list'">
        <span class="tag" v-for="tag in system.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
        <span class="department">{{ system.department }}</span>
      </div>
    </div>
    <div class="card-arrow">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  </a>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  system: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid'
  }
})

const descRef = ref(null)
const isOverflowing = ref(false)

function checkOverflow() {
  nextTick(() => {
    const el = descRef.value
    if (el) {
      isOverflowing.value = el.scrollHeight > el.clientHeight
    }
  })
}

onMounted(checkOverflow)
watch(() => props.viewMode, checkOverflow)

const gradients = [
  'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',   // sky
  'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',    // violet
  'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)',    // cyan
  'linear-gradient(135deg, #34d399 0%, #059669 100%)',    // emerald
  'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',    // amber
  'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',    // red
  'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',    // pink
  'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)',    // teal
]

const hash = computed(() => {
  const str = props.system.id || props.system.name || ''
  return str.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % gradients.length
})
</script>

<style lang="scss" scoped>
.system-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  background: rgba(56, 189, 248, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.06);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;

  &:hover {
    border-color: rgba(56, 189, 248, 0.2);
    background: rgba(56, 189, 248, 0.08);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(56, 189, 248, 0.08);

    .card-icon {
      transform: scale(1.08);
    }

    .card-arrow {
      opacity: 1;
      transform: translateX(0);
      background: rgba(56, 189, 248, 0.1);
      color: var(--primary);
    }
  }

  &.grid {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 16px;

    .card-content {
      width: 100%;
    }

    .card-arrow {
      display: none;
    }

    .card-desc {
      -webkit-line-clamp: 2;
    }
  }

  &.list {
    padding: 14px 18px;

    .card-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .card-content {
      flex: 1;
    }

    .card-name {
      margin-bottom: 2px;
    }
  }
}

.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  color: #fff;

  svg {
    width: 24px;
    height: 24px;
  }

  .icon-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
  line-height: 1.3;
  letter-spacing: -0.2px;
}

.card-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  padding: 3px 8px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.06);
  color: var(--text-secondary);
  border-radius: 5px;
}

.department {
  font-size: 11px;
  color: var(--text-muted);
  margin-left: auto;
}

.card-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(56, 189, 248, 0.04);
  border-radius: 6px;
  color: var(--text-muted);
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  flex-shrink: 0;
}
</style>
