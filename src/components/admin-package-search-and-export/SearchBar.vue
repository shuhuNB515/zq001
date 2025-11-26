
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  onSearch?: (query: string) => void
}

const props = defineProps<Props>()

const searchQuery = ref('')
const searchType = ref<'trackingNumber' | 'customerName'>('trackingNumber')

const handleSearch = () => {
  if (props.onSearch) {
    props.onSearch(searchQuery.value)
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSearch()
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  if (props.onSearch) {
    props.onSearch('')
  }
}
</script>

<template>
  <Card class="shadow-soft">
    <CardHeader>
      <CardTitle class="flex items-center">
        <SafeIcon name="Search" :size="20" class="mr-2 text-primary" />
        快件搜索
      </CardTitle>
      <CardDescription>输入单号或客户名称查询快件信息</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 flex gap-2">
          <Input
            v-model="searchQuery"
            :placeholder="searchType === 'trackingNumber' ? '输入快件单号...' : '输入客户名称...'"
            class="flex-1"
            @keydown="handleKeyDown"
          />
          <Button 
            @click="handleSearch"
            class="bg-primary hover:bg-primary/90"
          >
            <SafeIcon name="Search" :size="18" class="mr-2" />
            搜索
          </Button>
          <Button 
            v-if="searchQuery"
            variant="outline"
            @click="clearSearch"
          >
            <SafeIcon name="X" :size="18" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
