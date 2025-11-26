
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_SERVICE_RULES, type ServiceRuleModel } from '@/data/admin_data'

const rules = ref<ServiceRuleModel[]>(MOCK_SERVICE_RULES.map(rule => ({ ...rule })))
const isSaving = ref(false)
const saveSuccess = ref(false)

const handleSave = async () => {
  isSaving.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSaving.value = false
  saveSuccess.value = true
  
  // Hide success message after 3 seconds
  setTimeout(() => {
    saveSuccess.value = false
  }, 3000)
}

const getRuleLabel = (key: string): string => {
  const labels: Record<string, string> = {
    'delivery_price_standard': '标准寄件起步价格',
    'max_storage_days': '快件最长免费存储天数',
    'face_verification_retry': '人脸识别失败重试次数上限',
  }
  return labels[key] || key
}

const getRuleDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    'delivery_price_standard': '设置标准快递的起步价格，按首重计算',
    'max_storage_days': '快件在智能货架中的最长免费存储时间',
    'face_verification_retry': '用户人脸识别失败后允许重试的最大次数',
  }
  return descriptions[key] || ''
}
</script>

<template>
  <div class="space-y-6">
    <!-- Success Alert -->
    <Alert v-if="saveSuccess" class="border-green-200 bg-green-50">
      <SafeIcon name="CheckCircle" :size="16" class="text-green-600" />
      <AlertTitle class="text-green-800">保存成功</AlertTitle>
      <AlertDescription class="text-green-700">
        服务规则已成功更新
      </AlertDescription>
    </Alert>

    <!-- Rules Cards -->
    <div class="grid gap-6">
      <Card v-for="rule in rules" :key="rule.key" class="border border-border">
        <CardHeader class="pb-4">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <SafeIcon :name="rule.iconName" :size="20" class="text-primary" />
              </div>
              <div>
                <CardTitle class="text-lg">{{ rule.description }}</CardTitle>
                <CardDescription class="mt-1">
                  {{ getRuleDescription(rule.key) }}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex items-end gap-4">
            <div class="flex-1">
              <Label :for="`rule-${rule.key}`" class="text-sm font-medium mb-2 block">
                当前值
              </Label>
              <div class="flex items-center gap-2">
                <Input
                  :id="`rule-${rule.key}`"
                  v-model="rule.value"
                  type="text"
                  class="flex-1"
                  placeholder="输入新值"
                />
                <span class="text-sm text-muted-foreground font-medium min-w-fit">
                  {{ rule.unit }}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end pt-4">
      <Button 
        @click="handleSave"
        :disabled="isSaving"
        size="lg"
        class="min-w-32"
      >
        <SafeIcon 
          v-if="!isSaving"
          name="Save" 
          :size="18" 
          class="mr-2" 
        />
        <SafeIcon 
          v-else
          name="Loader" 
          :size="18" 
          class="mr-2 animate-spin" 
        />
        {{ isSaving ? '保存中...' : '保存更改' }}
      </Button>
    </div>

    <!-- Info Box -->
    <Card class="border-blue-200 bg-blue-50">
      <CardHeader class="pb-3">
        <div class="flex items-start space-x-3">
          <SafeIcon name="Info" :size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <CardTitle class="text-base text-blue-900">提示</CardTitle>
            <CardDescription class="text-blue-800 mt-1">
              修改的服务规则将立即生效，影响所有新的取寄件订单。已有订单将按原规则处理。
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  </div>
</template>
