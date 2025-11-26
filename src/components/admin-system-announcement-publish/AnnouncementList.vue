
<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import type { AnnouncementModel } from '@/data/admin_data'

interface Props {
  announcements: AnnouncementModel[]
}

const props = defineProps<Props>()

const expandedId = ref<number | null>(null)

const toggleExpand = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id
}

const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateStr
  }
}
</script>

<template>
  <Card class="shadow-card">
    <CardHeader>
      <CardTitle class="flex items-center">
        <SafeIcon name="ListChecks" :size="24" class="mr-2 text-primary" />
        已发布的公告
      </CardTitle>
      <CardDescription>
        共 {{ announcements.length }} 条公告
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="announcements.length === 0" class="text-center py-12">
        <SafeIcon name="MessageSquare" :size="48" class="mx-auto text-muted-foreground mb-4 opacity-50" />
        <p class="text-muted-foreground">暂无公告</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="announcement in announcements"
          :key="announcement.id"
          class="border border-border rounded-lg overflow-hidden hover:shadow-soft transition-shadow"
        >
          <!-- Announcement Header -->
          <div
            class="p-4 bg-card hover:bg-muted/50 cursor-pointer transition-colors"
            @click="toggleExpand(announcement.id)"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="text-base font-semibold text-foreground truncate">
                    {{ announcement.title }}
                  </h3>
                  <Badge
                    v-if="announcement.isUrgent"
                    variant="destructive"
                    class="flex-shrink-0"
                  >
                    <SafeIcon name="AlertCircle" :size="14" class="mr-1" />
                    紧急
                  </Badge>
                </div>
                <p class="text-sm text-muted-foreground flex items-center">
                  <SafeIcon name="Clock" :size="14" class="mr-2" />
                  {{ formatDate(announcement.releaseDate) }}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                class="flex-shrink-0"
                :class="{ 'rotate-180': expandedId === announcement.id }"
              >
                <SafeIcon name="ChevronDown" :size="20" />
              </Button>
            </div>
          </div>

          <!-- Announcement Content (Expanded) -->
          <div
            v-if="expandedId === announcement.id"
            class="border-t border-border bg-muted/30 p-4"
          >
            <div class="prose prose-sm max-w-none">
              <p class="text-foreground whitespace-pre-wrap break-words">
                {{ announcement.content }}
              </p>
            </div>
            <div class="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span class="text-xs text-muted-foreground">
                公告ID: {{ announcement.id }}
              </span>
              <div class="flex gap-2">
                <Button variant="outline" size="sm">
                  <SafeIcon name="Edit" :size="16" class="mr-1" />
                  编辑
                </Button>
                <Button variant="outline" size="sm" class="text-destructive hover:text-destructive">
                  <SafeIcon name="Trash2" :size="16" class="mr-1" />
                  删除
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
