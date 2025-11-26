
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

const handleComplete = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './homepage.html'
  }
}

const handleReturn = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-delivery-entry.html'
  }
}
</script>

<template>
  <div class="space-y-3 pt-4">
    <!-- Complete Button -->
    <Button 
      @click="handleComplete"
      class="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
    >
      <SafeIcon name="Home" :size="20" class="mr-2" />
      完成并返回首页
    </Button>

    <!-- Return Button -->
    <Button 
      @click="handleReturn"
      variant="outline"
      class="w-full h-12 text-base font-semibold"
    >
      <SafeIcon name="ArrowLeft" :size="20" class="mr-2" />
      返回寄件服务
    </Button>
  </div>
</template>
