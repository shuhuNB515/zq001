
<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  locationMapUrl: string
  shelfId: string
  gridId: string
}

const props = defineProps<Props>()

const isImageLoaded = ref(false)
</script>

<template>
  <Card class="overflow-hidden shadow-card">
    <CardHeader class="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
      <CardTitle class="flex items-center">
        <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.553-.894L15 11" />
        </svg>
        快件位置地图
      </CardTitle>
      <CardDescription>智能货架实时位置显示</CardDescription>
    </CardHeader>
    <CardContent class="p-0">
      <div class="relative w-full bg-muted/50 aspect-video flex items-center justify-center overflow-hidden">
        <!-- Location Map Image -->
        <img 
          :src="locationMapUrl"
          alt="快件位置地图"
          class="w-full h-full object-cover"
          @load="isImageLoaded = true"
        />
        
        <!-- Loading State -->
        <div v-if="!isImageLoaded" class="absolute inset-0 flex items-center justify-center bg-muted/80">
          <div class="text-center">
            <div class="w-12 h-12 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin mx-auto mb-3"></div>
            <p class="text-sm text-muted-foreground">加载位置地图中...</p>
          </div>
        </div>

        <!-- Position Indicator Overlay -->
        <div class="absolute inset-0 pointer-events-none">
          <!-- Animated pulse at shelf location -->
          <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="relative w-16 h-16">
              <!-- Outer pulse ring -->
              <div class="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
              <!-- Middle ring -->
              <div class="absolute inset-2 rounded-full border-2 border-primary/50"></div>
              <!-- Center dot -->
              <div class="absolute inset-4 rounded-full bg-primary flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Position Label -->
        <div class="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-4 py-2 rounded-lg border border-border shadow-soft">
          <p class="text-xs text-muted-foreground">货架位置</p>
          <p class="text-lg font-bold text-foreground">{{ shelfId }} - {{ gridId }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-pulse-ring {
  animation: pulse-ring 2s infinite;
}
</style>
