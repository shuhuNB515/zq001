
<script setup lang="ts">
import { HOMEPAGE_BANNER_IMAGE } from '@/data/client_data'
import SafeIcon from '@/components/common/SafeIcon.vue'
import Logo from '../../image/logo/logo.jpg?url';
</script>

<template>
  <section class="relative w-full overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
    <!-- Background Image -->
    <div class="absolute inset-0 opacity-40">
      <img 
        :src="HOMEPAGE_BANNER_IMAGE.url" 
        alt="智取未来品牌背景"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 py-20 md:py-32">
      <div class="flex flex-col items-center text-center space-y-8">
        <!-- Logo and Brand -->
        <div class="flex flex-col items-center space-y-6">
          <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl animate-pulse">
            <img :src="Logo" alt="智取未来" class="w-full h-full rounded-xl object-cover">
          </div>
          
          <div class="space-y-3">
            <h1 class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              智取未来
            </h1>
            <p class="text-xl md:text-2xl text-muted-foreground font-medium">
              智能物流自取服务平台
            </p>
          </div>
        </div>

        <!-- Tagline -->
        <div class="max-w-2xl space-y-4">
          <p class="text-lg text-foreground/80 leading-relaxed">
            采用先进的人脸识别、RFID定位和ROS机器人技术，为您提供快速、安全、便捷的快件取寄服务。
          </p>
          <div class="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div class="flex items-center space-x-2">
              <SafeIcon name="Zap" :size="18" class="text-accent" />
              <span>秒级取件</span>
            </div>
            <div class="flex items-center space-x-2">
              <SafeIcon name="Shield" :size="18" class="text-accent" />
              <span>人脸识别</span>
            </div>
            <div class="flex items-center space-x-2">
              <SafeIcon name="MapPin" :size="18" class="text-accent" />
              <span>精准定位</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
  </section>
</template>
