<template>
  <header class="app-header">
    <div class="header-left">
      <div class="logo">
        <div class="logo-icon">
          <img v-if="siteConfig.logo" :src="siteConfig.logo" width="100%" height="100%" />
          <font-awesome-icon v-else :icon="['fas', 'award']" />
        </div>
        <span class="title">{{ siteConfig.title }}</span>
        <span class="badge">{{ siteConfig.badge }}</span>
      </div>
    </div>
    <div class="header-center">
      <div class="search-box" :class="{ focused: searchFocused }">
        <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
          stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input v-model="searchInput" type="text" placeholder="搜索系统名称、功能描述..." @focus="searchFocused = true"
          @blur="searchFocused = false" @input="handleSearch" />
        <kbd v-if="!searchInput" class="shortcut">⌘K</kbd>
        <button v-else class="clear-btn" @click="clearSearch">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div class="header-right">
      <button class="theme-btn" @click="store.toggleTheme()" :title="store.theme === 'dark' ? '切换浅色模式' : '切换深色模式'">
        <svg v-if="store.theme === 'dark'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
          stroke-width="2">
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </button>
      <button class="help-btn" @click="showHelp = true" title="帮助">
        <font-awesome-icon :icon="['fas', 'circle-question']" />
      </button>
    </div>

    <HelpModal v-model:visible="showHelp" />
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePortalStore } from '@/store/portal'
import HelpModal from '@/components/HelpModal.vue'

const store = usePortalStore()
const searchInput = ref('')
const searchFocused = ref(false)
const showHelp = ref(false)

const siteConfig = ref({
  title: 'XX公司',
  badge: 'Portal',
  logo: ""
})

onMounted(async () => {
  try {
    const res = await fetch('/site.json')
    if (!res.ok) throw new Error(res.statusText)
    siteConfig.value = await res.json()
    if (siteConfig.value.title) {
      document.title = `${siteConfig.value.title} - 门户网站`;
    }
  } catch (e) {
    console.error('Failed to load site config:', e)
  }
})

function handleSearch() {
  store.setSearch(searchInput.value)
}

function clearSearch() {
  searchInput.value = ''
  store.setSearch('')
}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: var(--header-bg);
  backdrop-filter: blur(30px) saturate(1.2);
  -webkit-backdrop-filter: blur(30px) saturate(1.2);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 100;
}

.header-left {
  flex: 0 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.logo-icon>i {
  width: 36px;
  height: 36px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.5px;
}

.badge {
  font-size: 10px;
  font-weight: 600;
  color: #7dd3fc;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.15);
  padding: 2px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-center {
  flex: 1;
  margin: 0 0 0 40px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.08);
  border-radius: 12px;
  padding: 0 14px;
  height: 42px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &.focused {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15), 0 0 20px rgba(56, 189, 248, 0.08);
    background: rgba(56, 189, 248, 0.06);
  }
}

.search-icon {
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

.header-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  margin-left: 12px;
}

.theme-btn,
.help-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 16px;

  svg {
    pointer-events: none;
  }

  &:hover {
    background: var(--bg-hover);
    border-color: var(--border-light);
    color: var(--primary);
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.1);
  }
}

.theme-btn {
  margin-right: 8px;
}

.header-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.06);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  .status-dot {
    width: 7px;
    height: 7px;
    background: #30D158;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(48, 209, 88, 0.4);
  }

  .status-text {
    font-size: 12px;
    color: var(--text-muted);
  }
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }

  .header-center {
    margin: 0 16px;
  }

  .title,
  .badge {
    display: none;
  }

  .shortcut {
    display: none;
  }

  .header-right {
    display: none;
  }
}
</style>
