
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { StorageDurationRuleModel } from '@/data/admin_data'

interface Props {
  rules: StorageDurationRuleModel[]
}

interface Emits {
  (e: 'edit', rule: StorageDurationRuleModel): void
}

defineProps<Props>()
defineEmits<Emits>()

const getStatusBadge = (status: string) => {
  return status === 'Active' ? 'default' : 'secondary'
}

const getStatusLabel = (status: string) => {
  return status === 'Active' ? '生效中' : '待生效'
}
</script>

<template>
  <div class="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-12">序号</TableHead>
          <TableHead>规则描述</TableHead>
          <TableHead class="text-right">免费存储天数</TableHead>
          <TableHead class="text-right">超时收费率</TableHead>
          <TableHead class="text-center">状态</TableHead>
          <TableHead class="text-right w-24">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(rule, index) in rules" :key="rule.ruleId">
          <TableCell class="font-medium">{{ index + 1 }}</TableCell>
          <TableCell>{{ rule.description }}</TableCell>
          <TableCell class="text-right">
            <span class="font-semibold text-primary">{{ rule.freeDays }}</span>
            <span class="text-muted-foreground ml-1">天</span>
          </TableCell>
          <TableCell class="text-right">
            <span class="font-semibold">¥{{ rule.penaltyRate.toFixed(2) }}</span>
            <span class="text-muted-foreground ml-1">/天</span>
          </TableCell>
          <TableCell class="text-center">
            <Badge :variant="getStatusBadge(rule.validityStatus)">
              {{ getStatusLabel(rule.validityStatus) }}
            </Badge>
          </TableCell>
          <TableCell class="text-right">
            <Button 
              variant="ghost" 
              size="sm"
              @click="$emit('edit', rule)"
              class="hover:bg-accent"
            >
              <SafeIcon name="Edit2" :size="16" class="mr-1" />
              编辑
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
