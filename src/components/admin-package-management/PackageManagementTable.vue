
<script setup lang="ts">
import { computed } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import PackageStatusBadge from './PackageStatusBadge.vue'
import type { PackageRecordModel } from '@/data/admin_data'

interface Props {
  records: PackageRecordModel[]
}

const props = defineProps<Props>()

const handleViewDetail = (trackingNumber: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = `./admin-package-detail.html?id=${trackingNumber}`
  }
}
</script>

<template>
  <div class="rounded-lg border border-border overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow class="bg-muted/50 hover:bg-muted/50">
          <TableHead class="font-semibold">单号</TableHead>
          <TableHead class="font-semibold">客户名称</TableHead>
          <TableHead class="font-semibold">状态</TableHead>
          <TableHead class="font-semibold">入库时间</TableHead>
          <TableHead class="font-semibold">出库时间</TableHead>
          <TableHead class="font-semibold">分拣状态</TableHead>
          <TableHead class="font-semibold">货架位置</TableHead>
          <TableHead class="font-semibold text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow 
          v-for="record in records" 
          :key="record.trackingNumber"
          class="hover:bg-muted/50 transition-colors"
        >
          <TableCell class="font-mono text-sm font-medium">
            {{ record.trackingNumber }}
          </TableCell>
          <TableCell>{{ record.customerName }}</TableCell>
          <TableCell>
            <PackageStatusBadge :status="record.status" />
          </TableCell>
          <TableCell class="text-sm text-muted-foreground">
            {{ record.entryTime }}
          </TableCell>
          <TableCell class="text-sm text-muted-foreground">
            {{ record.exitTime || '-' }}
          </TableCell>
          <TableCell class="text-sm">
            <span 
              :class="[
                'inline-block px-2 py-1 rounded text-xs font-medium',
                record.sortingStatus === '完成分拣' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
              ]"
            >
              {{ record.sortingStatus }}
            </span>
          </TableCell>
          <TableCell class="text-sm font-mono">
            {{ record.shelfLocation }}
          </TableCell>
          <TableCell class="text-right">
            <Button 
              variant="ghost" 
              size="sm"
              @click="handleViewDetail(record.trackingNumber)"
              class="gap-1"
            >
              <SafeIcon name="Eye" :size="16" />
              <span class="hidden sm:inline">查看</span>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Empty State -->
    <div v-if="records.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
      <SafeIcon name="Package" :size="48" class="text-muted-foreground/50 mb-4" />
      <p class="text-muted-foreground">没有找到匹配的快件记录</p>
    </div>
  </div>
</template>
