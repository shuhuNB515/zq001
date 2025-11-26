
<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { PackageRecordModel } from '@/data/admin_data'

interface Props {
  records: PackageRecordModel[]
}

interface Emits {
  (e: 'view-detail', trackingNumber: string): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const statusConfig = {
  Inbound: { label: '入库', variant: 'secondary', icon: 'ArrowDown' },
  Sorting: { label: '分拣中', variant: 'default', icon: 'Zap' },
  AwaitingPickup: { label: '待取件', variant: 'outline', icon: 'Clock' },
  Outbound: { label: '出库中', variant: 'secondary', icon: 'Truck' },
  Delivered: { label: '已出库', variant: 'secondary', icon: 'CheckCircle' },
}

const displayRecords = computed(() => {
  return props.records.slice(0, 10)
})
</script>

<template>
  <div class="w-full">
    <div v-if="props.records.length === 0" class="flex flex-col items-center justify-center py-12">
      <SafeIcon name="Package" :size="48" class="text-muted-foreground mb-4" />
      <p class="text-muted-foreground">暂无快件记录</p>
    </div>

    <div v-else class="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow class="bg-muted/50">
            <TableHead class="font-semibold">单号</TableHead>
            <TableHead class="font-semibold">客户</TableHead>
            <TableHead class="font-semibold">状态</TableHead>
            <TableHead class="font-semibold">入库时间</TableHead>
            <TableHead class="font-semibold">分拣状态</TableHead>
            <TableHead class="font-semibold">货架位置</TableHead>
            <TableHead class="text-right font-semibold">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="record in displayRecords" :key="record.trackingNumber" class="hover:bg-muted/50">
            <TableCell class="font-mono text-sm">{{ record.trackingNumber }}</TableCell>
            <TableCell>{{ record.customerName }}</TableCell>
            <TableCell>
              <Badge :variant="statusConfig[record.status]?.variant || 'default'" class="gap-1">
                <SafeIcon :name="statusConfig[record.status]?.icon || 'Package'" :size="14" />
                {{ statusConfig[record.status]?.label || record.status }}
              </Badge>
            </TableCell>
            <TableCell class="text-sm text-muted-foreground">{{ record.entryTime }}</TableCell>
            <TableCell class="text-sm">{{ record.sortingStatus }}</TableCell>
            <TableCell class="text-sm font-mono">{{ record.shelfLocation }}</TableCell>
            <TableCell class="text-right">
              <Button
                variant="ghost"
                size="sm"
                @click="$emit('view-detail', record.trackingNumber)"
                class="gap-1"
              >
                <SafeIcon name="Eye" :size="16" />
                查看
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

<!-- Pagination Info -->
      <div v-if="props.records.length > 10" class="px-6 py-4 border-t border-border bg-muted/30 text-sm text-muted-foreground">
        显示 {{ displayRecords.length }} / {{ props.records.length }} 条记录
        <Button
          variant="link"
          size="sm"
          @click="() => window.location.href = './admin-package-search-and-export.html'"
          class="ml-2"
        >
          查看全部 →
        </Button>
      </div>
    </div>
  </div>
</template>
