
<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { StorageDurationRuleModel } from '@/data/admin_data'

interface Props {
  rule: StorageDurationRuleModel
}

interface Emits {
  (e: 'save', rule: StorageDurationRuleModel): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = ref<StorageDurationRuleModel>({ ...props.rule })
const errors = ref<Record<string, string>>({})

watch(() => props.rule, (newRule) => {
  formData.value = { ...newRule }
  errors.value = {}
}, { deep: true })

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.description || formData.value.description.trim() === '') {
    errors.value.description = '规则描述不能为空'
  }
  
  if (formData.value.freeDays < 0) {
    errors.value.freeDays = '免费存储天数不能为负数'
  }
  
  if (formData.value.penaltyRate < 0) {
    errors.value.penaltyRate = '超时收费率不能为负数'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSave = () => {
  if (validateForm()) {
    emit('save', formData.value)
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <Card class="border-primary/20 bg-primary/5">
    <CardHeader>
      <CardTitle class="flex items-center">
        <SafeIcon name="Edit" :size="20" class="mr-2 text-primary" />
        编辑规则
      </CardTitle>
      <CardDescription>修改存储规则的相关参数</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-6">
        <!-- Description -->
        <div class="space-y-2">
          <Label for="description" class="text-base font-medium">规则描述</Label>
          <Input
            id="description"
            v-model="formData.description"
            placeholder="例如：标准快件免费存储规则"
            class="text-base"
            :class="{ 'border-destructive': errors.description }"
          />
          <p v-if="errors.description" class="text-sm text-destructive">
            {{ errors.description }}
          </p>
        </div>

        <!-- Free Days -->
        <div class="space-y-2">
          <Label for="freeDays" class="text-base font-medium">免费存储天数</Label>
          <div class="flex items-center space-x-2">
            <Input
              id="freeDays"
              v-model.number="formData.freeDays"
              type="number"
              min="0"
              max="30"
              placeholder="输入天数"
              class="text-base"
              :class="{ 'border-destructive': errors.freeDays }"
            />
            <span class="text-muted-foreground font-medium">天</span>
          </div>
          <p v-if="errors.freeDays" class="text-sm text-destructive">
            {{ errors.freeDays }}
          </p>
          <p class="text-xs text-muted-foreground">
            超过此天数后，每天按照超时收费率收取费用
          </p>
        </div>

        <!-- Penalty Rate -->
        <div class="space-y-2">
          <Label for="penaltyRate" class="text-base font-medium">超时收费率</Label>
          <div class="flex items-center space-x-2">
            <span class="text-muted-foreground font-medium">¥</span>
            <Input
              id="penaltyRate"
              v-model.number="formData.penaltyRate"
              type="number"
              min="0"
              step="0.01"
              placeholder="输入金额"
              class="text-base"
              :class="{ 'border-destructive': errors.penaltyRate }"
            />
            <span class="text-muted-foreground font-medium">/天</span>
          </div>
          <p v-if="errors.penaltyRate" class="text-sm text-destructive">
            {{ errors.penaltyRate }}
          </p>
        </div>

        <!-- Validity Status -->
        <div class="space-y-2">
          <Label for="status" class="text-base font-medium">规则状态</Label>
          <Select v-model="formData.validityStatus">
            <SelectTrigger id="status" class="text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">生效中</SelectItem>
              <SelectItem value="Pending">待生效</SelectItem>
            </SelectContent>
          </Select>
          <p class="text-xs text-muted-foreground">
            选择规则的生效状态
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            @click="handleCancel"
            class="px-6"
          >
            <SafeIcon name="X" :size="16" class="mr-2" />
            取消
          </Button>
          <Button 
            @click="handleSave"
            class="px-6"
          >
            <SafeIcon name="Check" :size="16" class="mr-2" />
            保存
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
