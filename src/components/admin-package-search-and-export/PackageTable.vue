
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { MOCK_PACKAGE_RECORDS, type PackageRecordModel } from '@/data/admin_data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  searchQuery?: string
}

const props = withDefaults(defineProps<Props>(), {
  searchQuery: ''
})

const emit = defineEmits<{
  viewDetail: [trackingNumber: string]
}>()

const packages = ref<PackageRecordModel[]>(MOCK_PACKAGE_RECORDS)
const currentPage = ref(1)
const itemsPerPage = 10
const sortBy = ref<'trackingNumber' | 'entryTime'>('entryTime')
const sortOrder = ref<'asc' | 'desc'>('desc')

const filteredPackages = computed(() => {
  let result = [...packages.value]

  // Filter by search query
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase()
    result = result.filter(pkg =>
      pkg.trackingNumber.toLowerCase().includes(query) ||
      pkg.customerName.toLowerCase().includes(query)
    )
  }

  // Sort
  result.sort((a, b) => {
    let aVal: any = a[sortBy.value]
    let bVal: any = b[sortBy.value]

    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  return result
})

const paginatedPackages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPackages.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPackages.value.length / itemsPerPage)
})

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
    'Inbound': { variant: 'secondary', label: '已入库' },
    'Sorting': { variant: 'default', label: '分拣中' },
    'AwaitingPickup': { variant: 'outline', label: '待取件' },
    'Outbound': { variant: 'secondary', label: '已出库' },
    'Delivered': { variant: 'outline', label: '已送达' },
  }
  const config = statusMap[status] || { variant: 'outline', label: status }
  return config
}

const handleSort = (field: 'trackingNumber' | 'entryTime') => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'desc'
  }
  currentPage.value = 1
}

const handleViewDetail = (trackingNumber: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = `./admin-package-detail.html?id=${trackingNumber}`
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  // Scroll to top of table
  if (typeof window !== 'undefined') {
    const tableElement = document.querySelector('[data-table-container]')
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
</script>

<template>
  <Card class="shadow-soft" data-table-container>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="flex items-center">
            <SafeIcon name="Package" :size="20" class="mr-2 text-primary" />
            快件列表
          </CardTitle>
          <CardDescription>
            共 {{ filteredPackages.length }} 条记录
            <span v-if="props.searchQuery" class="ml-2 text-primary">
              (搜索结果)
            </span>
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent">
              <TableHead 
                class="cursor-pointer hover:bg-muted/50 transition-colors"
                @click="handleSort('trackingNumber')"
              >
                <div class="flex items-center space-x-2">
                  <span>快件单号</span>
                  <SafeIcon 
                    v-if="sortBy === 'trackingNumber'"
                    :name="sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'"
                    :size="16"
                    class="text-primary"
                  />
                </div>
              </TableHead>
              <TableHead>客户名称</TableHead>
              <TableHead 
                class="cursor-pointer hover:bg-muted/50 transition-colors"
                @click="handleSort('entryTime')"
              >
                <div class="flex items-center space-x-2">
                  <span>入库时间</span>
                  <SafeIcon 
                    v-if="sortBy === 'entryTime'"
                    :name="sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'"
                    :size="16"
                    class="text-primary"
                  />
                </div>
              </TableHead>
              <TableHead>出库时间</TableHead>
              <TableHead>分拣状态</TableHead>
              <TableHead>货架位置</TableHead>
              <TableHead>当前状态</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow 
              v-for="pkg in paginatedPackages"
              :key="pkg.trackingNumber"
              class="hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <TableCell class="font-mono font-semibold text-primary">
                {{ pkg.trackingNumber }}
              </TableCell>
              <TableCell>{{ pkg.customerName }}</TableCell>
              <TableCell class="text-sm text-muted-foreground">
                {{ pkg.entryTime }}
              </TableCell>
              <TableCell class="text-sm text-muted-foreground">
                {{ pkg.exitTime || '-' }}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" class="text-xs">
                  {{ pkg.sortingStatus }}
                </Badge>
              </TableCell>
              <TableCell class="text-sm">
                <span class="font-mono bg-muted px-2 py-1 rounded text-xs">
                  {{ pkg.shelfLocation }}
                </span>
              </TableCell>
              <TableCell>
                <Badge :variant="getStatusBadge(pkg.status).variant" class="text-xs">
                  {{ getStatusBadge(pkg.status).label }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  @click="handleViewDetail(pkg.trackingNumber)"
                  class="hover:bg-primary/10"
                >
                  <SafeIcon name="Eye" :size="16" class="mr-1" />
                  详情
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Empty State -->
        <div v-if="paginatedPackages.length === 0" class="py-12 text-center">
          <SafeIcon name="Package" :size="48" class="mx-auto text-muted-foreground/30 mb-4" />
          <p class="text-muted-foreground">
            {{ props.searchQuery ? '未找到匹配的快件记录' : '暂无快件记录' }}
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                v-if="currentPage > 1"
                @click="handlePageChange(currentPage - 1)"
                class="cursor-pointer"
              />
            </PaginationItem>

            <PaginationItem v-for="page in totalPages" :key="page">
              <PaginationLink 
                :is-active="currentPage === page"
                @click="handlePageChange(page)"
                class="cursor-pointer"
              >
                {{ page }}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext 
                v-if="currentPage < totalPages"
                @click="handlePageChange(currentPage + 1)"
                class="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
:deep(table) {
  width: 100%;
}

:deep(tbody tr) {
  border-bottom: 1px solid hsl(var(--border));
}

:deep(tbody tr:last-child) {
  border-bottom: none;
}
</style>
