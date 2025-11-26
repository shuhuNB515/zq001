
<script setup lang="ts">
import SafeIcon from '@/components/common/SafeIcon.vue'

const features = [
  {
    icon: 'Zap',
    title: '秒级取件',
    description: '智能机器人快速定位和取件，平均取件时间不超过1分钟'
  },
  {
    icon: 'ScanFace',
    title: '人脸识别',
    description: '采用YOLOv8深度学习模型，精准识别用户身份，安全可靠'
  },
  {
    icon: 'Radio',
    title: 'RFID定位',
    description: '智能货架配备RFID和光电感应，精确追踪每个快件位置'
  },
  {
    icon: 'Cpu',
    title: '智能分拣',
    description: '自动传送带和ROS机器人协作，高效分拣和配送'
  },
  {
    icon: 'Lock',
    title: '安全保障',
    description: '多重验证机制，确保快件和用户信息安全'
  },
  {
    icon: 'Clock',
    title: '24小时服务',
    description: '全天候自助取寄服务，随时随地享受便利'
  }
]
</script>

<template>
  <section class="w-full py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">技术优势</h2>
        <p class="text-lg text-muted-foreground">
          融合最新的物流科技，为您提供卓越的服务体验
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur p-6 hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all duration-300"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10 space-y-4">
            <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
              <SafeIcon :name="feature.icon" :size="28" class="text-primary" />
            </div>

            <div class="space-y-2">
              <h3 class="text-lg font-semibold text-foreground">{{ feature.title }}</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
