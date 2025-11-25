
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

const handleConfirmPickup = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-pickup-receipt.html'
  }
}

const handleCancel = () => {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <!-- Cancel Button -->
    <Button 
      variant="outline" 
      size="lg"
      @click="handleCancel"
      class="flex items-center justify-center"
    >
      <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
      返回验证
    </Button>

    <!-- Confirm Pickup Button -->
    <Button 
      size="lg"
      @click="handleConfirmPickup"
      class="flex items-center justify-center bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
    >
      <SafeIcon name="CheckCircle" :size="18" class="mr-2" />
      确认取件
    </Button>
  </div>
</template>
