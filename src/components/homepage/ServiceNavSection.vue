
<script setup lang="ts">
import { HOMEPAGE_SERVICE_NAV } from '@/data/client_data'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

const serviceRoutes: Record<string, string> = {
  '取件服务': './client-pickup-service-entry.html',
  '寄件预约': './client-delivery-entry.html',
  '快件查询': './placeholder.html',
  '网点信息': './placeholder.html',
}
</script>

<template>
  <section class="w-full py-16 md:py-24 bg-background">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">核心服务</h2>
        <p class="text-lg text-muted-foreground">
          一站式智能物流解决方案，满足您的所有需求
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="service in HOMEPAGE_SERVICE_NAV" 
          :key="service.title"
          class="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10 space-y-4">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
              <SafeIcon :name="service.iconName" :size="24" class="text-primary" />
            </div>

            <div class="space-y-2">
              <h3 class="text-lg font-semibold text-foreground">{{ service.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ service.description }}</p>
            </div>

            <Button 
              asChild 
              variant="ghost" 
              class="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 group/btn"
            >
              <a :href="serviceRoutes[service.title] || service.url">
                <span>了解更多</span>
                <SafeIcon name="ArrowRight" :size="16" class="ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
