<template>
  <div class="icons-page">
    <header class="icons-header">
      <h1 class="icons-title">FontAwesome 图标库</h1>
      <p class="icons-subtitle">所有 Solid 图标 · 点击复制名称</p>
    </header>
    <IconGrid />
  </div>
</template>

<script setup>
import IconGrid from '@/components/IconGrid.vue'
</script>

<style lang="scss" scoped>
.icons-page {
  min-height: 100vh;
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
}

@media (max-width: 768px) {
  .icons-page {
    padding: calc(var(--header-height) + 16px) 16px 32px;
  }
}
</style>
