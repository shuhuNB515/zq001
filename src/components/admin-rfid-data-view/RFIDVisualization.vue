
<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { RFIDLocationModel } from '@/data/admin_data'

interface Props {
  rfidData: RFIDLocationModel[]
  visualizationImage: string
}

const props = defineProps<Props>()

// Create a map of locations for quick lookup
const locationMap = computed(() => {
  const map = new Map<string, RFIDLocationModel>()
  props.rfidData.forEach(item => {
    const key = `${item.location[0]}-${item.location[1]}`
    map.set(key, item)
  })
  return map
})

// Grid configuration
const SHELF_ROWS = 8
const SHELF_COLS = 20

// Get package at specific location
const getPackageAt = (row: number, col: number) => {
  return locationMap.value.get(`${row}-${col}`)
}

// Get color based on package type
const getPackageColor = (packageDesc: string) => {
  if (packageDesc.includes('文件')) return 'bg-blue-100 border-blue-300'
  if (packageDesc.includes('中型')) return 'bg-yellow-100 border-yellow-300'
  if (packageDesc.includes('大型')) return 'bg-red-100 border-red-300'
  return 'bg-green-100 border-green-300'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Visualization Image -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center">
          <SafeIcon name="Image" :size="20" class="mr-2" />
          货架布局可视化
        </CardTitle>
        <CardDescription>
          智能货架的实时3D可视化展示
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="w-full rounded-lg overflow-hidden bg-muted">
          <img 
            :src="visualizationImage" 
            alt="RFID货架可视化" 
            class="w-full h-auto object-cover"
          />
        </div>
      </CardContent>
    </Card>

    <!-- Grid Visualization -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center">
          <SafeIcon name="Grid3x3" :size="20" class="mr-2" />
          货架位置网格
        </CardTitle>
        <CardDescription>
          每个格子代表一个存储位置，有色块表示已存储快件
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="overflow-x-auto">
          <div class="inline-block min-w-full">
            <!-- Column Headers -->
            <div class="flex mb-2">
              <div class="w-12 h-8 flex items-center justify-center text-xs font-semibold text-muted-foreground">
                行\列
              </div>
              <div v-for="col in SHELF_COLS" :key="`header-${col}`" class="w-10 h-8 flex items-center justify-center text-xs font-semibold text-muted-foreground border-b border-border">
                {{ col }}
              </div>
            </div>

            <!-- Grid Rows -->
            <div v-for="row in SHELF_ROWS" :key="`row-${row}`" class="flex mb-1">
              <!-- Row Header -->
              <div class="w-12 h-10 flex items-center justify-center text-xs font-semibold text-muted-foreground border-r border-border">
                {{ row }}
              </div>

              <!-- Grid Cells -->
              <div v-for="col in SHELF_COLS" :key="`cell-${row}-${col}`" class="w-10 h-10 border border-border rounded flex items-center justify-center text-xs cursor-pointer transition-all hover:shadow-md" :class="getPackageAt(row, col) ? getPackageColor(getPackageAt(row, col)!.packageDesc) : 'bg-background'">
                <span v-if="getPackageAt(row, col)" class="font-bold text-xs text-foreground/70">
                  ✓
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="mt-6 pt-6 border-t border-border">
          <p class="text-sm font-semibold text-foreground mb-3">图例说明</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-blue-100 border border-blue-300 rounded"></div>
              <span class="text-sm text-muted-foreground">文件类</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-yellow-100 border border-yellow-300 rounded"></div>
              <span class="text-sm text-muted-foreground">中型包裹</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-red-100 border border-red-300 rounded"></div>
              <span class="text-sm text-muted-foreground">大型包裹</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-green-100 border border-green-300 rounded"></div>
              <span class="text-sm text-muted-foreground">其他类型</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Location Details -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center">
          <SafeIcon name="MapPin" :size="20" class="mr-2" />
          当前在架快件
        </CardTitle>
        <CardDescription>
          {{ rfidData.length }} 件快件正在智能货架中存储
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div v-for="item in rfidData" :key="item.tagId" class="p-4 bg-accent/30 rounded-lg border border-border hover:bg-accent/50 transition-colors">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p class="font-semibold text-foreground">{{ item.tagId }}</p>
                <p class="text-sm text-muted-foreground mt-1">{{ item.packageDesc }}</p>
                <p class="text-xs text-muted-foreground mt-2">
                  位置: 第 {{ item.location[0] }} 行 第 {{ item.location[1] }} 列
                </p>
              </div>
              <div class="text-right">
                <p class="text-xs text-muted-foreground">最后扫描</p>
                <p class="text-sm font-medium text-foreground">{{ item.lastSeen }}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.grid-cell {
  @apply w-10 h-10 border border-border rounded flex items-center justify-center text-xs cursor-pointer transition-all hover:shadow-md;
}

.grid-cell.occupied {
  @apply bg-blue-100 border-blue-300;
}

.grid-cell.empty {
  @apply bg-background;
}
</style>
