<template>
  <div class="icon-grid-wrapper">
    <div class="icon-grid-search">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        v-model="query"
        type="text"
        placeholder="搜索图标名称..."
      />
      <button v-if="query" class="clear-btn" @click="query = ''">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="icon-grid">
      <button
        v-for="icon in filteredIcons"
        :key="icon"
        class="icon-card"
        :class="{ copied: copied === icon }"
        @click="copyName(icon)"
      >
        <div class="icon-preview">
          <font-awesome-icon :icon="['fas', icon]" />
        </div>
        <span class="icon-name">{{ icon }}</span>
      </button>
    </div>

    <div v-if="!filteredIcons.length" class="empty-state">
      <p>未找到匹配的图标</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { fas } from '@fortawesome/free-solid-svg-icons'

const query = ref('')
const copied = ref(null)

const allIcons = computed(() => {
  return [...new Set(
    Object.values(fas)
      .filter(item => item.iconName)
      .map(item => item.iconName)
  )].sort()
})

const filteredIcons = computed(() => {
  if (!query.value) return allIcons.value
  const q = query.value.toLowerCase().replace(/\s/g, '')
  return allIcons.value.filter(name => name.includes(q))
})

function copyName(name) {
  navigator.clipboard.writeText(name).then(() => {
    copied.value = name
    setTimeout(() => {
      if (copied.value === name) copied.value = null
    }, 1500)
  })
}
</script>

<style lang="scss" scoped>
.icon-grid-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  min-height: 0;
}

.icon-grid-search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.08);
  border-radius: 10px;
  padding: 0 12px;
  height: 38px;
  transition: all 0.3s ease;

  svg {
    color: var(--text-muted);
    flex-shrink: 0;
  }

  input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 13px;

    &::placeholder {
      color: var(--text-muted);
    }
  }

  .clear-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    background: rgba(56, 189, 248, 0.06);
    border: none;
    border-radius: 5px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;

    &:hover {
      background: rgba(56, 189, 248, 0.12);
      color: var(--text);
    }
  }
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  align-content: start;
  padding-right: 4px;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 8px 10px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.06);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  color: var(--text-secondary);
  font-family: inherit;

  .icon-preview {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    font-size: 18px;
    transition: transform 0.25s ease;
  }

  .icon-name {
    font-size: 10px;
    color: var(--text-muted);
    word-break: break-all;
    text-align: center;
    line-height: 1.3;
    max-width: 100%;
  }

  &:hover {
    background: rgba(56, 189, 248, 0.08);
    border-color: rgba(56, 189, 248, 0.15);
    transform: translateY(-2px);

    .icon-preview {
      transform: scale(1.15);
    }
  }

  &.copied {
    border-color: #30D158;
    background: rgba(48, 209, 88, 0.08);

    .icon-name,
    .icon-preview {
      color: #30D158;
    }
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--text-muted);
  font-size: 14px;
  flex: 1;
  min-height: 0;
}
</style>
