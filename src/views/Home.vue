<template>
  <div class="home">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">分类导航</h3>
        <span class="system-count">{{ store.allSystems.length }} 个系统</span>
      </div>
      <nav class="category-nav">
        <button
          class="category-btn"
          :class="{ active: !store.activeCategory }"
          @click="store.setCategory(null)"
        >
          <font-awesome-icon :icon="['fas', 'th-large']" width="18" />
          <span>全部系统</span>
          <span class="count">{{ store.allSystems.length }}</span>
        </button>
        <button
          v-for="cat in store.categories"
          :key="cat.name"
          class="category-btn"
          :class="{ active: store.activeCategory === cat.name }"
          @click="store.setCategory(cat.name)"
        >
          <font-awesome-icon :icon="getCategoryIcon(cat.icon)" width="18" />
          <span>{{ cat.name }}</span>
          <span class="count">{{ cat.systems.length }}</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <div class="status-dot"></div>
        <span>系统运行正常</span>
      </div>
    </aside>

    <main class="main-content" v-loading="store.loading">
      <div class="content-header">
        <h1 class="page-title">
          <template v-if="store.searchQuery">
            搜索结果
            <span class="result-count">{{ store.filteredSystems.length }} 个匹配</span>
          </template>
          <template v-else-if="currentCategory">
            {{ currentCategory.name }}
          </template>
          <template v-else>
            所有系统
          </template>
        </h1>
        <div class="view-toggle">
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <template v-if="store.searchQuery">
        <div v-if="store.filteredSystems.length" class="system-container" :class="viewMode">
          <SystemCard
            v-for="system in store.filteredSystems"
            :key="system.name"
            :system="system"
            :view-mode="viewMode"
          />
        </div>
        <div v-else class="empty-state">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M8 11h6" />
          </svg>
          <h3>未找到匹配的系统</h3>
          <p>尝试使用其他关键词搜索</p>
        </div>
      </template>

      <template v-else>
        <template v-for="group in store.groupedSystems" :key="group.name">
          <div class="system-section">
            <div class="section-header">
              <h2 class="section-title">{{ group.name }}</h2>
              <span class="section-count">{{ group.systems.length }} 个</span>
            </div>
            <div class="system-container" :class="viewMode">
              <SystemCard
                v-for="system in group.systems"
                :key="system.name"
                :system="system"
                :view-mode="viewMode"
              />
            </div>
          </div>
        </template>

        <div v-if="!store.loading && !store.groupedSystems.length" class="empty-state">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <h3>暂无系统数据</h3>
           <p>请在 public/portal.json 中添加系统配置</p>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePortalStore } from '@/store/portal'
import SystemCard from '@/components/SystemCard.vue'

const store = usePortalStore()
const viewMode = ref('grid')

const currentCategory = computed(() => {
  if (!store.activeCategory) return null
  return store.categories.find(c => c.name === store.activeCategory)
})

function getCategoryIcon(icon) {
  const iconMap = {
    globe: 'globe',
    rocket: 'rocket',
    wrench: 'wrench',
    'network-wired': 'network-wired',
  }
  return ['fas', iconMap[icon] || 'cube']
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  min-height: calc(100vh - var(--header-height));
  padding-top: var(--header-height);
}

.sidebar {
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: rgba(56, 189, 248, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(56, 189, 248, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(56, 189, 248, 0.06);
}

.sidebar-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 4px;
}

.system-count {
  font-size: 12px;
  color: var(--text-muted);
}

.category-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 11px 14px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;

  svg {
    flex-shrink: 0;
    opacity: 0.5;
    transition: opacity 0.25s ease;
  }

  span:first-of-type {
    flex: 1;
    font-weight: 450;
  }

  .count {
    font-size: 11px;
    padding: 2px 8px;
    background: rgba(56, 189, 248, 0.04);
    border-radius: 10px;
    color: var(--text-muted);
    transition: all 0.25s ease;
  }

  &:hover {
    background: rgba(56, 189, 248, 0.08);
    backdrop-filter: blur(10px);
    color: var(--text);

    svg {
      opacity: 0.8;
    }
  }

  &.active {
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(167, 139, 250, 0.1));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-color: rgba(56, 189, 248, 0.2);
    color: #fff;

    svg {
      opacity: 1;
    }

    .count {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(56, 189, 248, 0.06);
  background: rgba(56, 189, 248, 0.03);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.status-dot {
  width: 7px;
  height: 7px;
  background: #30D158;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(48, 209, 88, 0.35);
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: 32px 40px;
  min-height: calc(100vh - var(--header-height));
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: -0.3px;

  .result-count {
    font-size: 14px;
    font-weight: 500;
    color: #7dd3fc;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.15);
    padding: 4px 14px;
    border-radius: 20px;
  }
}

.view-toggle {
  display: flex;
  gap: 3px;
  padding: 3px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid rgba(56, 189, 248, 0.06);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: transparent;
  border: none;
  border-radius: 7px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-secondary);
  }

  &.active {
    background: rgba(56, 189, 248, 0.1);
    color: var(--primary);
  }
}

.system-section {
  margin-bottom: 36px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  margin: 0 -20px 16px;
  border-radius: 10px;
  position: sticky;
  top: var(--header-height);
  z-index: 10;
  background: rgba(17, 22, 36, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(56, 189, 248, 0.06);
  transition: all 0.2s ease;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.2px;
}

.section-count {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 400;
}

.system-container {
  display: grid;
  gap: 16px;

  &.grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  &.list {
    grid-template-columns: 1fr;
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
  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;
    padding: 16px;
  }

  .system-container.grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
}
</style>
