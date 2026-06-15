<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="help-overlay" @click.self="$emit('update:visible', false)">
        <div class="help-modal">
          <div class="help-modal-header">
            <span class="help-modal-title">帮助</span>
            <button class="help-modal-close" @click="$emit('update:visible', false)">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="help-modal-body">
            <el-tabs v-model="activeTab" class="help-tabs">
              <el-tab-pane label="使用说明" name="usage">
                <div class="usage-content">
                  <p class="help-placeholder">使用说明待补充...</p>
                </div>
              </el-tab-pane>
              <el-tab-pane label="ICON清单" name="icons">
                <IconGrid />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import IconGrid from '@/components/IconGrid.vue'

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:visible'])

const activeTab = ref('usage')
</script>

<style lang="scss" scoped>
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
  width: 680px;
  max-width: calc(100vw - 48px);
  height: calc(100vh - 120px);
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
  padding: 8px 24px 24px;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.help-placeholder {
  color: var(--text-muted);
  font-size: 14px;
  letter-spacing: 0.3px;
}

.usage-content {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

// el-tabs 暗色主题
:deep(.help-tabs) {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;

  .el-tabs__header {
    margin: 0 0 16px;
    flex-shrink: 0;
  }

  .el-tabs__content {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .el-tab-pane {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .el-tabs__nav-wrap::after {
    background: rgba(56, 189, 248, 0.08);
  }

  .el-tabs__item {
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 500;
    padding: 0 16px;
    height: 36px;
    line-height: 36px;
    letter-spacing: 0.3px;

    &:hover {
      color: var(--text);
    }

    &.is-active {
      color: var(--primary);
    }
  }

  .el-tabs__active-bar {
    background: var(--primary);
    height: 2px;
  }
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
</style>
