
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { DELIVERY_SERVICE_OPTIONS } from '@/data/client_data'

const features = [
  {
    icon: 'FileText',
    title: '在线填写',
    description: '简单快捷的表单，填写收件人信息和快件详情'
  },
  {
    icon: 'Truck',
    title: '快递选择',
    description: '多种快递类型可选，满足不同时效需求'
  },
  {
    icon: 'ScanFace',
    title: '人脸核验',
    description: '先进的人脸识别技术，确保身份安全'
  },
  {
    icon: 'QrCode',
    title: '寄件码生成',
    description: '即时生成寄件码，方便快捷'
  },
  {
    icon: 'Zap',
    title: '智能分拣',
    description: '自动化分拣系统，提高处理效率'
  },
  {
    icon: 'MapPin',
    title: '实时追踪',
    description: '全程追踪快件位置，了解寄件进度'
  }
]

const processSteps = [
  {
    number: '1',
    title: '预约寄件',
    description: '点击预约寄件按钮，开始寄件流程'
  },
  {
    number: '2',
    title: '填写信息',
    description: '填写收件人信息和快件详情'
  },
  {
    number: '3',
    title: '选择快递',
    description: '根据需求选择合适的快递类型'
  },
  {
    number: '4',
    title: '人脸核验',
    description: '进行人脸识别身份核验'
  },
  {
    number: '5',
    title: '获取寄件码',
    description: '系统生成寄件码，完成预约'
  }
]
</script>

<template>
  <section class="py-16 md:py-24 bg-background">
    <div class="container mx-auto px-4">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          寄件服务特点
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          智取未来提供全方位的寄件服务，让您的快件安全、快速地送达目的地
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        <Card 
          v-for="(feature, index) in features" 
          :key="index"
          class="hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <div class="flex items-center space-x-3 mb-2">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <SafeIcon :name="feature.icon" :size="24" class="text-primary" />
              </div>
              <CardTitle class="text-xl">{{ feature.title }}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </CardContent>
        </Card>
      </div>

      <!-- Service Options -->
      <div class="mb-20">
        <h3 class="text-3xl font-bold mb-8 text-center">快递类型选择</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            v-for="option in DELIVERY_SERVICE_OPTIONS"
            :key="option.id"
            class="border-2 hover:border-primary transition-colors"
          >
            <CardHeader>
              <CardTitle class="text-2xl">{{ option.name }}</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div>
                <p class="text-sm text-muted-foreground mb-1">预计价格</p>
                <p class="text-2xl font-bold text-primary">{{ option.estimatedPrice }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground mb-1">预计时效</p>
                <p class="text-lg font-semibold">{{ option.estimatedTime }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Process Steps -->
      <div>
        <h3 class="text-3xl font-bold mb-12 text-center">寄件流程</h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div 
            v-for="(step, index) in processSteps"
            :key="index"
            class="relative"
          >
            <!-- Connector Line -->
            <div 
              v-if="index < processSteps.length - 1"
              class="hidden md:block absolute top-12 left-[60%] w-[calc(100%-20px)] h-1 bg-gradient-to-r from-primary to-accent"
            ></div>

            <!-- Step Card -->
            <div class="relative z-10 bg-card border border-border rounded-lg p-6 text-center">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {{ step.number }}
              </div>
              <h4 class="font-semibold text-lg mb-2">{{ step.title }}</h4>
              <p class="text-sm text-muted-foreground">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
