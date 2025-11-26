
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  imageUrl: string
}

defineProps<Props>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center">
        <SafeIcon name="BarChart3" :size="20" class="mr-2 text-primary" />
        用户活动统计
      </CardTitle>
      <CardDescription>用户取寄件行为分析</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="w-full h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
        <img
          :src="imageUrl"
          alt="用户活动统计图表"
          class="w-full h-full object-cover"
        />
      </div>
    </CardContent>
  </Card>
</template>
