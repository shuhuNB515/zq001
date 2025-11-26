
<script setup lang="ts">
import { MOCK_STATION_INFO } from '@/data/station_data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'

const stationInfo = MOCK_STATION_INFO
</script>

<template>
  <Card class="sticky top-24 shadow-card">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <SafeIcon name="MapPin" :size="24" class="text-primary" />
        {{ stationInfo.name }}
      </CardTitle>
      <CardDescription>智能物流服务网点</CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Address -->
      <div class="space-y-2">
        <div class="flex items-start gap-3">
          <SafeIcon name="Home" :size="20" class="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p class="text-sm font-medium text-muted-foreground">地址</p>
            <p class="text-base text-foreground font-medium">{{ stationInfo.address }}</p>
          </div>
        </div>
      </div>

      <!-- Service Hours -->
      <div class="space-y-2">
        <div class="flex items-start gap-3">
          <SafeIcon name="Clock" :size="20" class="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p class="text-sm font-medium text-muted-foreground">服务时间</p>
            <p class="text-base text-foreground font-medium">{{ stationInfo.serviceHours }}</p>
          </div>
        </div>
      </div>

      <!-- Phone -->
      <div class="space-y-2">
        <div class="flex items-start gap-3">
          <SafeIcon name="Phone" :size="20" class="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p class="text-sm font-medium text-muted-foreground">联系电话</p>
            <a 
              :href="`tel:${stationInfo.phoneNumber}`"
              class="text-base text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {{ stationInfo.phoneNumber }}
            </a>
          </div>
        </div>
      </div>

      <!-- Map Preview -->
      <div class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">位置地图</p>
        <div class="w-full h-48 rounded-lg overflow-hidden border border-border bg-muted">
          <img 
            :src="stationInfo.mapUrl" 
            alt="网点位置地图"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Info Box -->
      <div class="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div class="flex gap-3">
          <SafeIcon name="AlertCircle" :size="20" class="text-accent flex-shrink-0 mt-0.5" />
          <div class="text-sm text-foreground">
            <p class="font-medium mb-1">温馨提示</p>
            <p class="text-muted-foreground">
              机器人取件服务24小时运营，人工服务时间为09:00-21:00。如有特殊需求，请拨打客服电话。
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
