
<script setup lang="ts">
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Tip {
  icon: string
  title: string
  description: string
}

const tips: Tip[] = [
  {
    icon: 'Package',
    title: '运单号查询',
    description: '输入您的快递运单号，可以查看单个快件的详细物流信息、当前位置和预计送达时间。'
  },
  {
    icon: 'Smartphone',
    title: '手机号查询',
    description: '输入您注册时使用的手机号，系统将显示您的所有快件列表，方便您一次性查看多个快件的状态。'
  },
  {
    icon: 'Clock',
    title: '实时更新',
    description: '快件状态实时更新，包括分拣中、已入库、待取件等多个阶段，让您随时掌握快件动态。'
  },
  {
    icon: 'MapPin',
    title: '位置追踪',
    description: '对于已入库的快件，系统会显示其在智能货架中的具体位置，方便您快速取件。'
  }
]
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-foreground mb-6">查询指南</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="tip in tips"
        :key="tip.title"
        class="bg-card rounded-lg border border-border p-4 hover:shadow-card transition-shadow"
      >
        <div class="flex items-start space-x-3">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <SafeIcon
              :name="tip.icon"
              :size="20"
              class="text-primary"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-foreground mb-1">
              {{ tip.title }}
            </h3>
            <p class="text-sm text-muted-foreground leading-relaxed">
              {{ tip.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="bg-accent/5 rounded-lg border border-accent/20 p-6 mt-8">
      <h3 class="font-semibold text-foreground mb-4 flex items-center">
        <SafeIcon name="HelpCircle" :size="20" class="mr-2 text-accent" />
        常见问题
      </h3>
      
      <div class="space-y-4">
        <div>
          <p class="text-sm font-medium text-foreground mb-1">
            Q: 如何找到我的运单号？
          </p>
          <p class="text-sm text-muted-foreground">
            A: 运单号通常在快递单据、确认邮件或短信中可以找到，通常以"ZYWK"开头。
          </p>
        </div>
        
        <div>
          <p class="text-sm font-medium text-foreground mb-1">
            Q: 查询需要多长时间？
          </p>
          <p class="text-sm text-muted-foreground">
            A: 查询通常在1-2秒内完成，系统会显示最新的快件状态。
          </p>
        </div>
        
        <div>
          <p class="text-sm font-medium text-foreground mb-1">
            Q: 为什么查不到我的快件？
          </p>
          <p class="text-sm text-muted-foreground">
            A: 请检查运单号是否正确，或稍后重试。新寄出的快件可能需要几小时才能显示在系统中。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
