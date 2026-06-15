<template>
  <div class="icons-page">
    <header class="icons-header">
      <h1 class="icons-title">FontAwesome 图标库</h1>
      <p class="icons-subtitle">共 {{ filteredIcons.length }} 个 Solid 图标 · 点击复制名称</p>
      <div class="icons-search">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          v-model="query"
          type="text"
          placeholder="搜索图标名称..."
          @focus="searchFocused = true"
          @blur="searchFocused = false"
        />
        <kbd v-if="!query" class="shortcut">⌘F</kbd>
        <button v-else class="clear-btn" @click="query = ''">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>

    <div class="icons-grid">
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
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 11h6" />
      </svg>
      <h3>未找到匹配的图标</h3>
      <p>尝试使用其他关键词搜索</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { fas } from '@fortawesome/free-solid-svg-icons'

const query = ref('')
const searchFocused = ref(false)
const copied = ref(null)

const allIcons = computed(() => {
  return Object.values(fas)
    .filter(item => item.iconName)
    .map(item => item.iconName)
    .sort()
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
.icons-page {
  min-height: 100vh;
  padding-top: var(--header-height);
  padding: calc(var(--header-height) + 32px) 32px 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.icons-header {
  margin-bottom: 28px;
}

.icons-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
  margin-bottom: 6px;
}

.icons-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.icons-search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.08);
  border-radius: 12px;
  padding: 0 14px;
  height: 42px;
  transition: all 0.3s ease;
  max-width: 420px;
  backdrop-filter: blur(10px);

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
    font-size: 14px;

    &::placeholder {
      color: var(--text-muted);
    }
  }

  .shortcut {
    font-size: 11px;
    color: var(--text-muted);
    background: rgba(56, 189, 248, 0.04);
    border: 1px solid rgba(56, 189, 248, 0.08);
    padding: 2px 6px;
    border-radius: 5px;
    font-family: inherit;
  }

  .clear-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: rgba(56, 189, 248, 0.06);
    border: none;
    border-radius: 6px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(56, 189, 248, 0.12);
      color: var(--text);
    }
  }
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 10px 14px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.06);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.25s ease;
  color: var(--text-secondary);
  font-family: inherit;

  .icon-preview {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    font-size: 22px;
    transition: transform 0.25s ease;
  }

  .icon-name {
    font-size: 11px;
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

    .icon-name {
      color: #30D158;
    }

    .icon-preview {
      color: #30D158;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;

  svg {
    margin-bottom: 20px;
    color: var(--text-muted);
    opacity: 0.3;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--text-muted);
  }
}

@media (max-width: 768px) {
  .icons-page {
    padding: calc(var(--header-height) + 16px) 16px 32px;
  }

  .icons-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 8px;
  }

  .icon-card {
    padding: 14px 6px 10px;

    .icon-preview {
      font-size: 18px;
      width: 32px;
      height: 32px;
    }

    .icon-name {
      font-size: 10px;
    }
  }
}
</style>
