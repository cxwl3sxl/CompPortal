<template>
    <ol class="help-list">
        <li v-for="(item, idx) in helpItems" :key="idx">{{ item }}</li>
    </ol>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const helpItems = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/help.json')
    if (!res.ok) throw new Error(res.statusText)
    helpItems.value = await res.json()
  } catch (e) {
    console.error('Failed to load help content:', e)
    helpItems.value = ['欢迎使用XX公司门户网站']
  }
})
</script>

<style lang="scss" scoped>
.help-list {
    color: var(--text-muted);
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 1.8;
    padding-left: 20px;
    margin: 0;
}
</style>