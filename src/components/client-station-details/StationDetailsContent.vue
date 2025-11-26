
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  stationName: string
  address: string
  phoneNumber: string
  serviceHours: string
  mapUrl: string
}

const props = defineProps<Props>()

const isCopied = ref(false)

const copyToClipboard = (text: string) => {
  if (typeof window !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    })
  }
}

const handleGoBack = () => {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}
</script>

<template>
  <div class="flex-1 bg-gradient-to-b from-background to-secondary/20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          class="mb-4"
          @click="handleGoBack"
        >
          <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
          返回
        </Button>
        
        <div class="space-y-2">
          <h1 class="text-4xl font-bold text-foreground">{{ stationName }}</h1>
          <p class="text-lg text-muted-foreground">获取网点详细信息，规划您的取件或寄件时间</p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Information Cards -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Address Card -->
          <Card class="shadow-card hover:shadow-lg transition-shadow">
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center text-lg">
                <SafeIcon name="MapPin" :size="24" class="mr-3 text-primary" />
                网点地址
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-base text-foreground leading-relaxed">{{ address }}</p>
              <Button 
                variant="outline" 
                size="sm" 
                class="w-full"
                @click="copyToClipboard(address)"
              >
                <SafeIcon name="Copy" :size="16" class="mr-2" />
                {{ isCopied ? '已复制' : '复制地址' }}
              </Button>
            </CardContent>
          </Card>

          <!-- Service Hours Card -->
          <Card class="shadow-card hover:shadow-lg transition-shadow">
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center text-lg">
                <SafeIcon name="Clock" :size="24" class="mr-3 text-primary" />
                服务时间
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-base text-foreground leading-relaxed">{{ serviceHours }}</p>
              <div class="mt-4 p-3 bg-accent/20 rounded-lg border border-accent/30">
                <p class="text-sm text-muted-foreground">
                  <SafeIcon name="AlertCircle" :size="16" class="inline mr-2 text-accent" />
                  机器人服务全天24小时可用
                </p>
              </div>
            </CardContent>
          </Card>

          <!-- Contact Card -->
          <Card class="shadow-card hover:shadow-lg transition-shadow">
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center text-lg">
                <SafeIcon name="Phone" :size="24" class="mr-3 text-primary" />
                联系电话
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-base text-foreground font-semibold">{{ phoneNumber }}</p>
              <div class="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  class="flex-1"
                  as="a"
                  :href="`tel:${phoneNumber}`"
                >
                  <SafeIcon name="Phone" :size="16" class="mr-2" />
                  拨打
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  class="flex-1"
                  @click="copyToClipboard(phoneNumber)"
                >
                  <SafeIcon name="Copy" :size="16" class="mr-2" />
                  复制
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Right Column - Map -->
        <div class="lg:col-span-2">
          <Card class="shadow-card overflow-hidden h-full">
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center">
                <SafeIcon name="Map" :size="24" class="mr-3 text-primary" />
                网点位置地图
              </CardTitle>
              <CardDescription>点击地图可在新窗口打开完整地图</CardDescription>
            </CardHeader>
            <CardContent class="p-0">
              <a 
                :href="mapUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="block overflow-hidden rounded-b-lg hover:opacity-90 transition-opacity"
              >
                <img 
                  :src="mapUrl" 
                  :alt="stationName"
                  class="w-full h-96 object-cover"
                />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Additional Info Section -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="shadow-soft">
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center">
              <SafeIcon name="Zap" :size="20" class="mr-2 text-primary" />
              快速取件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              支持刷脸、取件码、手机号多种验证方式，快速便捷地取件
            </p>
          </CardContent>
        </Card>

        <Card class="shadow-soft">
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center">
              <SafeIcon name="Package" :size="20" class="mr-2 text-primary" />
              智能寄件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              在线预约寄件，人脸核验身份，生成寄件码，安全可靠
            </p>
          </CardContent>
        </Card>

        <Card class="shadow-soft">
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center">
              <SafeIcon name="Shield" :size="20" class="mr-2 text-primary" />
              安全保障
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              RFID定位追踪，智能货架存储，确保快件安全
            </p>
          </CardContent>
        </Card>
      </div>

      <!-- Action Buttons -->
      <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg"
          as="a"
          href="./client-pickup-service-entry.html"
          class="gap-2"
        >
          <SafeIcon name="Package" :size="20" />
          前往取件
        </Button>
        <Button 
          size="lg"
          variant="outline"
          as="a"
          href="./client-delivery-entry.html"
          class="gap-2"
        >
          <SafeIcon name="Send" :size="20" />
          前往寄件
        </Button>
        <Button 
          size="lg"
          variant="outline"
          as="a"
          href="./client-dashboard.html"
          class="gap-2"
        >
          <SafeIcon name="Home" :size="20" />
          返回仪表盘
        </Button>
      </div>
    </div>
  </div>
</template>
