
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}
</script>

<template>
  <div class="flex items-center justify-between mb-8">
    <div class="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        size="icon"
        @click="handleBack"
        class="hover:bg-accent"
      >
        <SafeIcon name="ArrowLeft" :size="24" />
      </Button>
      <div>
        <h1 class="text-3xl font-bold text-foreground">快件搜索与导出</h1>
        <p class="text-muted-foreground mt-1">查询快件信息、查看分拣状态并导出数据</p>
      </div>
    </div>
  </div>
</template>
