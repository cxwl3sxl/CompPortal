<template>
  <header class="app-header">
    <div class="header-left">
      <div class="logo">
        <div class="logo-icon">
          <img src="/logo.svg" width="100%" height="100%" />
        </div>
        <span class="title">品杰科技</span>
        <span class="badge">Portal</span>
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
      <button class="help-btn" @click="openHelp" title="帮助">
        <font-awesome-icon :icon="['fas', 'circle-question']" />
      </button>
    </div>

    <!-- 帮助弹窗 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showHelp" class="help-overlay" @click.self="closeHelp">
          <div class="help-modal">
            <div class="help-modal-header">
              <span class="help-modal-title">帮助</span>
              <button class="help-modal-close" @click="closeHelp">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="help-modal-body">
              <p class="help-placeholder">帮助内容待补充...</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { usePortalStore } from '@/store/portal'

const store = usePortalStore()
const searchInput = ref('')
const searchFocused = ref(false)
const showHelp = ref(false)

function handleSearch() {
  store.setSearch(searchInput.value)
}

function clearSearch() {
  searchInput.value = ''
  store.setSearch('')
}

function openHelp() {
  showHelp.value = true
}

function closeHelp() {
  showHelp.value = false
}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: rgba(10, 14, 26, 0.7);
  backdrop-filter: blur(30px) saturate(1.2);
  -webkit-backdrop-filter: blur(30px) saturate(1.2);
  border-bottom: 1px solid rgba(56, 189, 248, 0.06);
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

.help-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.08);
  border-radius: 10px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 16px;

  svg {
    pointer-events: none;
  }

  &:hover {
    background: rgba(56, 189, 248, 0.1);
    border-color: rgba(56, 189, 248, 0.2);
    color: var(--primary);
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.1);
  }
}

.help-placeholder {
  color: var(--text-muted);
  font-size: 14px;
  letter-spacing: 0.3px;
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

// 帮助弹窗
.help-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-modal {
  width: 560px;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 120px);
  background: #1a1f2e;
  border: 1px solid rgba(56, 189, 248, 0.1);
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.help-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
}

.help-modal-title {
  color: var(--text);
  font-size: 18px;
  font-weight: 600;
}

.help-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(56, 189, 248, 0.08);
    color: var(--text);
  }
}

.help-modal-body {
  padding: 24px;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 过渡动画
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;

  .help-modal {
    transition: all 0.25s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .help-modal {
    transform: scale(0.95) translateY(8px);
    opacity: 0;
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
