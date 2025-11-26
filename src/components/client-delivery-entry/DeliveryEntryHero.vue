
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_DELIVERY_APPOINTMENT_IMAGE } from '@/data/client_data'

const handleScheduleDelivery = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-schedule-delivery.html'
  }
}

const handleBackHome = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './homepage.html'
  }
}
</script>

<template>
  <section class="relative w-full overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="MOCK_DELIVERY_APPOINTMENT_IMAGE.url" 
        alt="寄件服务背景"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 py-20 md:py-32">
      <div class="max-w-2xl">
        <!-- Back Button -->
        <button 
          @click="handleBackHome"
          class="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8"
        >
          <SafeIcon name="ArrowLeft" :size="20" class="mr-2" />
          <span class="text-sm font-medium">返回首页</span>
        </button>

        <!-- Main Content -->
        <div class="space-y-6">
          <div class="space-y-4">
            <h1 class="text-5xl md:text-6xl font-bold text-white leading-tight">
              在线寄件
            </h1>
            <p class="text-xl md:text-2xl text-white/90">
              足不出户，轻松寄送快件
            </p>
          </div>

          <p class="text-lg text-white/80 max-w-xl leading-relaxed">
            智取未来提供便捷的在线寄件服务。只需填写收件信息、选择快递类型，通过人脸核验身份，即可生成寄件码。我们的专业团队将为您提供安全、快速的寄件体验。
          </p>

          <!-- Features List -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <SafeIcon name="Clock" :size="18" color="white" />
              </div>
              <div>
                <p class="font-semibold text-white">快速预约</p>
                <p class="text-sm text-white/70">在线填写，即时预约</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <SafeIcon name="Shield" :size="18" color="white" />
              </div>
              <div>
                <p class="font-semibold text-white">安全可靠</p>
                <p class="text-sm text-white/70">人脸核验身份</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <SafeIcon name="Zap" :size="18" color="white" />
              </div>
              <div>
                <p class="font-semibold text-white">高效便捷</p>
                <p class="text-sm text-white/70">智能分拣配送</p>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg"
              class="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-lg"
              @click="handleScheduleDelivery"
            >
              <SafeIcon name="Send" :size="20" class="mr-2" />
              预约寄件
            </Button>
            <Button 
              size="lg"
              variant="outline"
              class="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-6 rounded-lg"
              @click="handleBackHome"
            >
              <SafeIcon name="Home" :size="20" class="mr-2" />
              返回首页
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
