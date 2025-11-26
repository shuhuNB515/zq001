
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { ServiceRuleModel } from '@/data/admin_data'

interface Props {
  rule: ServiceRuleModel
}

interface Emits {
  (e: 'navigate-pricing'): void
  (e: 'navigate-storage'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleNavigate = () => {
  if (props.rule.key === 'delivery_price_standard') {
    emit('navigate-pricing')
  } else if (props.rule.key === 'max_storage_days') {
    emit('navigate-storage')
  }
}

const getCardColor = (key: string) => {
  switch (key) {
    case 'delivery_price_standard':
      return 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800'
    case 'max_storage_days':
      return 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800'
    case 'face_verification_retry':
      return 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800'
    default:
      return 'from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20'
  }
}

const getIconColor = (key: string) => {
  switch (key) {
    case 'delivery_price_standard':
      return 'text-green-600 dark:text-green-400'
    case 'max_storage_days':
      return 'text-blue-600 dark:text-blue-400'
    case 'face_verification_retry':
      return 'text-purple-600 dark:text-purple-400'
    default:
      return 'text-primary'
  }
}
</script>

<template>
  <Card :class="`bg-gradient-to-br ${getCardColor(rule.key)} transition-all hover:shadow-lg`">
    <CardHeader>
      <div class="flex items-start justify-between">
        <div class="flex items-start space-x-3 flex-1">
          <div :class="`p-2 rounded-lg bg-white/50 dark:bg-black/20 ${getIconColor(rule.key)}`">
            <SafeIcon :name="rule.iconName" :size="24" />
          </div>
          <div class="flex-1">
            <CardTitle class="text-lg">{{ rule.description }}</CardTitle>
            <CardDescription class="mt-1">
              规则键: {{ rule.key }}
            </CardDescription>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <!-- Current Value Display -->
        <div class="bg-white/50 dark:bg-black/20 rounded-lg p-4">
          <p class="text-sm text-muted-foreground mb-1">当前值</p>
          <div class="flex items-baseline space-x-2">
            <span class="text-3xl font-bold text-foreground">{{ rule.value }}</span>
            <span class="text-sm font-medium text-muted-foreground">{{ rule.unit }}</span>
          </div>
        </div>

        <!-- Action Button -->
        <Button 
          variant="default"
          class="w-full"
          @click="handleNavigate"
        >
          <SafeIcon name="Edit" :size="16" class="mr-2" />
          编辑此规则
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
