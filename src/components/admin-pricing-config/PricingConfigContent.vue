
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_PRICING_CONFIG } from '@/data/admin_data'
import type { PricingConfigModel } from '@/data/admin_data'

interface EditingRow {
  index: number
  data: PricingConfigModel
}

const pricingData = ref<PricingConfigModel[]>(JSON.parse(JSON.stringify(MOCK_PRICING_CONFIG)))
const editingRow = ref<EditingRow | null>(null)
const isSaving = ref(false)

const zoneOptions = [
  { value: 'Local', label: '本地' },
  { value: 'Regional', label: '区域' },
  { value: 'National', label: '全国' }
]

const serviceTypeOptions = [
  { value: '标准快递', label: '标准快递' },
  { value: '特快专递', label: '特快专递' },
  { value: '经济快递', label: '经济快递' }
]

const weightRangeOptions = [
  { value: '0-1 kg', label: '0-1 kg' },
  { value: '1-2 kg', label: '1-2 kg' },
  { value: '2-5 kg', label: '2-5 kg' },
  { value: '5+ kg', label: '5+ kg' }
]

const startEditing = (index: number) => {
  editingRow.value = {
    index,
    data: JSON.parse(JSON.stringify(pricingData.value[index]))
  }
}

const cancelEditing = () => {
  editingRow.value = null
}

const saveEditing = () => {
  if (editingRow.value) {
    pricingData.value[editingRow.value.index] = editingRow.value.data
    editingRow.value = null
  }
}

const handleSaveAll = async () => {
  isSaving.value = true
  // 模拟保存延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  isSaving.value = false
  // 这里可以添加成功提示
  if (typeof window !== 'undefined') {
    alert('价格配置已保存成功！')
    window.location.href = './admin-service-rules-config.html'
  }
}

const handleCancel = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-service-rules-config.html'
  }
}

const addNewRow = () => {
  const newRow: PricingConfigModel = {
    serviceType: '标准快递',
    weightRange: '0-1 kg',
    initialPrice: 0,
    additionalPrice: 0,
    zone: 'Local'
  }
  pricingData.value.push(newRow)
  startEditing(pricingData.value.length - 1)
}

const deleteRow = (index: number) => {
  if (confirm('确定要删除此价格配置吗？')) {
    pricingData.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-border bg-background p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-foreground flex items-center">
            <SafeIcon name="DollarSign" :size="32" class="mr-3 text-primary" />
            寄件价格配置
          </h1>
          <p class="text-muted-foreground mt-2">设置不同快递类型和区域的寄件价格</p>
        </div>
        <a href="./admin-service-rules-config.html" class="text-muted-foreground hover:text-foreground transition-colors">
          <SafeIcon name="ChevronLeft" :size="24" />
        </a>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto p-6">
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>价格配置表</CardTitle>
              <CardDescription>管理所有快递服务的价格设置</CardDescription>
            </div>
            <Button @click="addNewRow" variant="outline" size="sm">
              <SafeIcon name="Plus" :size="16" class="mr-2" />
              添加新配置
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-32">快递类型</TableHead>
                  <TableHead class="w-24">重量范围</TableHead>
                  <TableHead class="w-24">首重价格</TableHead>
                  <TableHead class="w-24">续重价格</TableHead>
                  <TableHead class="w-20">配送区域</TableHead>
                  <TableHead class="w-32 text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(row, index) in pricingData" :key="index">
                  <!-- Service Type -->
                  <TableCell>
                    <div v-if="editingRow?.index === index" class="w-full">
                      <Select v-model="editingRow.data.serviceType">
                        <SelectTrigger class="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem v-for="opt in serviceTypeOptions" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div v-else class="text-sm">{{ row.serviceType }}</div>
                  </TableCell>

                  <!-- Weight Range -->
                  <TableCell>
                    <div v-if="editingRow?.index === index" class="w-full">
                      <Select v-model="editingRow.data.weightRange">
                        <SelectTrigger class="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem v-for="opt in weightRangeOptions" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div v-else class="text-sm">{{ row.weightRange }}</div>
                  </TableCell>

                  <!-- Initial Price -->
                  <TableCell>
                    <div v-if="editingRow?.index === index" class="w-full">
                      <Input
                        v-model.number="editingRow.data.initialPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        class="h-8"
                        placeholder="0.00"
                      />
                    </div>
                    <div v-else class="text-sm">¥{{ row.initialPrice.toFixed(2) }}</div>
                  </TableCell>

                  <!-- Additional Price -->
                  <TableCell>
                    <div v-if="editingRow?.index === index" class="w-full">
                      <Input
                        v-model.number="editingRow.data.additionalPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        class="h-8"
                        placeholder="0.00"
                      />
                    </div>
                    <div v-else class="text-sm">
                      {{ row.additionalPrice ? `¥${row.additionalPrice.toFixed(2)}` : '-' }}
                    </div>
                  </TableCell>

                  <!-- Zone -->
                  <TableCell>
                    <div v-if="editingRow?.index === index" class="w-full">
                      <Select v-model="editingRow.data.zone">
                        <SelectTrigger class="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem v-for="opt in zoneOptions" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div v-else class="text-sm">
                      {{ zoneOptions.find(z => z.value === row.zone)?.label }}
                    </div>
                  </TableCell>

                  <!-- Actions -->
                  <TableCell class="text-right">
                    <div v-if="editingRow?.index === index" class="flex justify-end gap-2">
                      <Button
                        @click="saveEditing"
                        size="sm"
                        variant="default"
                        class="h-7 px-2"
                      >
                        <SafeIcon name="Check" :size="14" />
                      </Button>
                      <Button
                        @click="cancelEditing"
                        size="sm"
                        variant="outline"
                        class="h-7 px-2"
                      >
                        <SafeIcon name="X" :size="14" />
                      </Button>
                    </div>
                    <div v-else class="flex justify-end gap-2">
                      <Button
                        @click="startEditing(index)"
                        size="sm"
                        variant="ghost"
                        class="h-7 px-2"
                      >
                        <SafeIcon name="Edit2" :size="14" />
                      </Button>
                      <Button
                        @click="deleteRow(index)"
                        size="sm"
                        variant="ghost"
                        class="h-7 px-2 text-destructive hover:text-destructive"
                      >
                        <SafeIcon name="Trash2" :size="14" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Info Box -->
          <div class="mt-6 p-4 bg-accent/50 rounded-lg border border-border">
            <div class="flex items-start gap-3">
              <SafeIcon name="Info" :size="20" class="text-primary mt-0.5 flex-shrink-0" />
              <div class="text-sm text-foreground/80">
                <p class="font-medium mb-1">价格配置说明：</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li>首重价格：快件首1kg（或首个重量段）的价格</li>
                  <li>续重价格：超出首重后，每增加1kg的价格</li>
                  <li>配送区域：本地（同城）、区域（省内）、全国</li>
                  <li>所有价格修改将立即生效</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Footer Actions -->
    <div class="border-t border-border bg-background p-6 flex justify-end gap-3">
      <Button
        @click="handleCancel"
        variant="outline"
        size="lg"
      >
        <SafeIcon name="X" :size="18" class="mr-2" />
        取消
      </Button>
      <Button
        @click="handleSaveAll"
        :disabled="isSaving"
        size="lg"
      >
        <SafeIcon v-if="!isSaving" name="Save" :size="18" class="mr-2" />
        <SafeIcon v-else name="Loader" :size="18" class="mr-2 animate-spin" />
        {{ isSaving ? '保存中...' : '保存配置' }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
:deep(.select-trigger) {
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
}
</style>
