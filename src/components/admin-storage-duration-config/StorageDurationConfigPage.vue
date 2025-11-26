
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import StorageDurationConfigTable from './StorageDurationConfigTable.vue'
import StorageDurationConfigForm from './StorageDurationConfigForm.vue'
import { MOCK_STORAGE_DURATION_RULES, type StorageDurationRuleModel } from '@/data/admin_data'
import { toast } from 'vue-sonner'

const rules = ref<StorageDurationRuleModel[]>(MOCK_STORAGE_DURATION_RULES)
const editingRule = ref<StorageDurationRuleModel | null>(null)
const isFormOpen = ref(false)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const handleEdit = (rule: StorageDurationRuleModel) => {
  editingRule.value = { ...rule }
  isFormOpen.value = true
}

const handleSave = (updatedRule: StorageDurationRuleModel) => {
  const index = rules.value.findIndex(r => r.ruleId === updatedRule.ruleId)
  if (index !== -1) {
    rules.value[index] = updatedRule
  }
  isFormOpen.value = false
  editingRule.value = null
  if (isMounted.value) {
    toast.success('规则已保存')
  }
}

const handleCancel = () => {
  isFormOpen.value = false
  editingRule.value = null
}

const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-service-rules-config.html'
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-border bg-background p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <Button variant="ghost" size="icon" @click="handleBack">
            <SafeIcon name="ArrowLeft" :size="20" />
          </Button>
          <div>
            <h1 class="text-3xl font-bold text-foreground">存储时长配置</h1>
            <p class="text-sm text-muted-foreground mt-1">管理快件的免费存储时长和超时收费规则</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto p-6">
      <div class="space-y-6">
        <!-- Info Alert -->
        <Card class="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <CardContent class="pt-6">
            <div class="flex items-start space-x-3">
              <SafeIcon name="Info" :size="20" class="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-sm font-medium text-blue-900 dark:text-blue-100">
                  存储规则说明
                </p>
                <p class="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  免费存储期限内，用户可以免费取件。超过免费期限后，每天按照超时收费率收取费用。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Rules Table -->
        <Card>
          <CardHeader>
            <CardTitle>存储规则列表</CardTitle>
            <CardDescription>点击编辑按钮修改规则</CardDescription>
          </CardHeader>
          <CardContent>
            <StorageDurationConfigTable 
              :rules="rules"
              @edit="handleEdit"
            />
          </CardContent>
        </Card>

        <!-- Edit Form -->
        <StorageDurationConfigForm 
          v-if="isFormOpen && editingRule"
          :rule="editingRule"
          @save="handleSave"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>
