
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import PickupOptionCard from './PickupOptionCard.vue'
import { PICKUP_OPTIONS, HOMEPAGE_BANNER_IMAGE } from '@/data/client_data'

const selectedOption = ref<string | null>(null)

const handleSelectOption = (optionId: string) => {
  selectedOption.value = optionId
  // Navigate to verification page
  if (typeof window !== 'undefined') {
    window.location.href = './client-pickup-verification.html'
  }
}

const handleBackHome = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './homepage.html'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-secondary/30">
    <!-- Banner Section -->
    <div class="relative h-64 md:h-80 overflow-hidden">
      <img 
        :src="HOMEPAGE_BANNER_IMAGE.url" 
        alt="取件服务" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-2">取件服务</h1>
          <p class="text-lg md:text-xl text-gray-100">选择验证方式，快速取件</p>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold mb-4">选择验证方式</h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          请选择以下任一验证方式来识别您的快件，我们将为您快速定位并准备取件。
        </p>
      </div>

      <!-- Options Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <PickupOptionCard
          v-for="option in PICKUP_OPTIONS"
          :key="option.id"
          :option="option"
          :is-selected="selectedOption === option.id"
          @select="handleSelectOption"
        />
      </div>

      <!-- Info Card -->
      <Card class="bg-blue-50 border-blue-200 mb-8">
        <CardHeader>
          <CardTitle class="flex items-center text-blue-900">
            <SafeIcon name="Info" :size="24" class="mr-3 text-blue-600" />
            温馨提示
          </CardTitle>
        </CardHeader>
        <CardContent class="text-blue-800 space-y-2">
          <p>• 请确保您已收到快件通知，并拥有相应的取件凭证</p>
          <p>• 人脸识别需要在良好光线条件下进行，请确保面部清晰可见</p>
          <p>• 如遇到任何问题，请联系我们的客服团队</p>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          @click="handleBackHome"
          class="flex items-center"
        >
          <SafeIcon name="ArrowLeft" :size="20" class="mr-2" />
          返回首页
        </Button>
      </div>
    </div>
  </div>
</template>
