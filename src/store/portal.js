import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { pinyin } from 'pinyin-pro'

export const usePortalStore = defineStore('portal', () => {
  const categories = ref([])
  const searchQuery = ref('')
  const activeCategory = ref(null)
  const loading = ref(true)

  // 从 public/portal.json 加载数据，修改后刷新页面即可生效
  fetch('/portal.json')
    .then(res => res.json())
    .then(data => {
      // 预计算拼音数据，提升搜索性能
      data.forEach(cat => {
        cat.systems.forEach(sys => {
          const text = `${sys.name} ${sys.description} ${sys.tags.join(' ')}`
          sys._pinyin = computePinyin(text)
        })
      })
      categories.value = data
      loading.value = false
    })
    .catch(e => {
      console.error('Failed to load portal data:', e)
      loading.value = false
    })

  function computePinyin(text) {
    try {
      return {
        full: pinyin(text, { toneType: 'none' }).replace(/\s/g, '').toLowerCase(),
        initial: pinyin(text, { pattern: 'first', toneType: 'none' }).replace(/\s/g, '').toLowerCase(),
      }
    } catch {
      return { full: '', initial: '' }
    }
  }

  function matchSystem(sys, q) {
    const raw = q.replace(/\s/g, '').toLowerCase()
    if (!raw) return false
    return (
      sys.name.toLowerCase().includes(raw) ||
      sys.description.toLowerCase().includes(raw) ||
      sys.tags.some(t => t.toLowerCase().includes(raw)) ||
      (sys._pinyin && sys._pinyin.full.includes(raw)) ||
      (sys._pinyin && sys._pinyin.initial.includes(raw))
    )
  }

  // 所有系统展开为一维数组（用于搜索结果展示）
  const allSystems = computed(() => {
    return categories.value.flatMap(cat => cat.systems)
  })

  // 搜索结果过滤
  const filteredSystems = computed(() => {
    if (!searchQuery.value) return []
    return allSystems.value.filter(s => matchSystem(s, searchQuery.value))
  })

  // 分组展示，支持分类筛选和搜索过滤
  const groupedSystems = computed(() => {
    let result = categories.value

    if (activeCategory.value) {
      result = result.filter(cat => cat.name === activeCategory.value)
    }

    if (searchQuery.value) {
      result = result.map(cat => ({
        ...cat,
        systems: cat.systems.filter(s => matchSystem(s, searchQuery.value))
      })).filter(cat => cat.systems.length > 0)
    }

    return result
  })

  function setSearch(query) {
    searchQuery.value = query
  }

  function setCategory(categoryName) {
    activeCategory.value = activeCategory.value === categoryName ? null : categoryName
  }

  return {
    categories,
    searchQuery,
    activeCategory,
    loading,
    allSystems,
    filteredSystems,
    groupedSystems,
    setSearch,
    setCategory
  }
})
