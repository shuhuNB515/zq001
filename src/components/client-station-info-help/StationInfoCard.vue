
<script setup lang="ts">
import { MOCK_STATION_INFO } from '@/data/station_data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { Button } from '@/components/ui/button'

const stationInfo = MOCK_STATION_INFO

const handleViewDetails = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-station-details.html'
  }
}
</script>

<template>
  <Card class="overflow-hidden">
    <CardHeader class="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
      <CardTitle class="flex items-center">
        <SafeIcon name="MapPin" :size="24" class="mr-3 text-primary" />
        {{ stationInfo.name }}
      </CardTitle>
      <CardDescription>智能物流服务中心</CardDescription>
    </CardHeader>
    
    <CardContent class="pt-6">
      <div class="space-y-6">
        <!-- Address -->
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
              <SafeIcon name="Home" :size="20" class="text-primary" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-foreground">地址</h3>
            <p class="mt-1 text-sm text-muted-foreground">{{ stationInfo.address }}</p>
          </div>
        </div>

        <!-- Service Hours -->
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
              <SafeIcon name="Clock" :size="20" class="text-accent" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-foreground">服务时间</h3>
            <p class="mt-1 text-sm text-muted-foreground">{{ stationInfo.serviceHours }}</p>
          </div>
        </div>

        <!-- Phone Number -->
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30">
              <SafeIcon name="Phone" :size="20" class="text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-foreground">联系电话</h3>
            <a 
              :href="`tel:${stationInfo.phoneNumber}`"
              class="mt-1 text-sm text-primary hover:underline"
            >
              {{ stationInfo.phoneNumber }}
            </a>
          </div>
        </div>

        <!-- Map Preview -->
        <div class="mt-6 rounded-lg overflow-hidden border border-border h-64">
          <img 
            :src="stationInfo.mapUrl" 
            alt="网点位置地图"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- View Details Button -->
      <div class="mt-6 pt-6 border-t border-border">
        <Button 
          @click="handleViewDetails"
          class="w-full"
        >
          <SafeIcon name="ChevronRight" :size="18" class="mr-2" />
          查看详细信息
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
