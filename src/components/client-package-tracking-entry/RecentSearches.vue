
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface RecentSearch {
  id: string
  type: 'tracking' | 'phone'
  value: string
  timestamp: string
  displayText: string
}

const recentSearches = ref<RecentSearch[]>([
  {
    id: '1',
    type: 'tracking',
    value: 'ZYWK20251124001',
    timestamp: '今天 10:30',
    displayText: 'ZYWK20251124001'
  },
  {
    id: '2',
    type: 'tracking',
    value: 'ZYWK20251123005',
    timestamp: '昨天 14:15',
    displayText: 'ZYWK20251123005'
  },
  {
    id: '3',
    type: 'phone',
    value: '13800138000',
    timestamp: '3天前',
    displayText: '138****8000'
  },
  {
    id: '4',
    type: 'tracking',
    value: 'ZYWK20251120008',
    timestamp: '一周前',
    displayText: 'ZYWK20251120008'
  }
])

const handleRecentSearch = (search: RecentSearch) => {
  if (typeof window !== 'undefined') {
    const query = search.type === 'tracking'
      ? `?trackingNumber=${encodeURIComponent(search.value)}`
      : `?phone=${encodeURIComponent(search.value)}`
    window.location.href = `./client-package-tracking-results.html${query}`
  }
}

const clearRecentSearches = () => {
  recentSearches.value = []
}
</script>

<template>
  <div class="bg-card rounded-lg border border-border shadow-soft p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-foreground flex items-center">
        <SafeIcon name="History" :size="20" class="mr-2 text-primary" />
        最近查询
      </h2>
      <Button
        v-if="recentSearches.length > 0"
        variant="ghost"
        size="sm"
        @click="clearRecentSearches"
        class="text-xs"
      >
        清空
      </Button>
    </div>

    <div v-if="recentSearches.length > 0" class="space-y-2">
      <button
        v-for="search in recentSearches"
        :key="search.id"
        @click="handleRecentSearch(search)"
        class="w-full text-left p-3 rounded-lg border border-border hover:bg-accent/50 hover:border-primary/50 transition-all group"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 flex-1 min-w-0">
            <SafeIcon
              :name="search.type === 'tracking' ? 'Package' : 'Smartphone'"
              :size="16"
              class="text-muted-foreground flex-shrink-0"
            />
            <span class="text-sm font-medium text-foreground truncate">
              {{ search.displayText }}
            </span>
          </div>
          <SafeIcon
            name="ChevronRight"
            :size="16"
            class="text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2"
          />
        </div>
        <p class="text-xs text-muted-foreground mt-1 ml-6">
          {{ search.timestamp }}
        </p>
      </button>
    </div>

    <div v-else class="text-center py-8">
      <SafeIcon
        name="Clock"
        :size="32"
        class="mx-auto text-muted-foreground/50 mb-3"
      />
      <p class="text-sm text-muted-foreground">
        暂无查询历史
      </p>
      <p class="text-xs text-muted-foreground/70 mt-1">
        您的查询记录将显示在这里
      </p>
    </div>

    <!-- Quick Tips -->
    <div class="mt-6 pt-6 border-t border-border">
      <h3 class="text-sm font-semibold text-foreground mb-3">快速提示</h3>
      <ul class="space-y-2 text-xs text-muted-foreground">
        <li class="flex items-start space-x-2">
          <span class="text-primary font-bold mt-0.5">•</span>
          <span>查询结果会自动保存到历史记录</span>
        </li>
        <li class="flex items-start space-x-2">
          <span class="text-primary font-bold mt-0.5">•</span>
          <span>点击历史记录可快速重新查询</span>
        </li>
        <li class="flex items-start space-x-2">
          <span class="text-primary font-bold mt-0.5">•</span>
          <span>支持运单号和手机号两种查询方式</span>
        </li>
      </ul>
    </div>
  </div>
</template>
