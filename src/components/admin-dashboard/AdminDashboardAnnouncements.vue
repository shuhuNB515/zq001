
<script setup lang="ts">
import { MOCK_ANNOUNCEMENTS } from '@/data/admin_data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'

const announcements = MOCK_ANNOUNCEMENTS
</script>

<template>
  <div class="space-y-4">
    <Card 
      v-for="announcement in announcements"
      :key="announcement.id"
      class="announcement-card hover:shadow-md transition-all duration-300"
    >
      <CardHeader class="pb-3">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <SafeIcon 
                name="Megaphone" 
                :size="18" 
                :color="announcement.isUrgent ? '#ef4444' : '#3b82f6'"
              />
              <CardTitle class="text-base">
                {{ announcement.title }}
              </CardTitle>
            </div>
            <CardDescription class="text-xs">
              发布时间：{{ announcement.releaseDate }}
            </CardDescription>
          </div>
          <Badge 
            v-if="announcement.isUrgent"
            variant="destructive"
            class="flex-shrink-0"
          >
            紧急
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-foreground/80 leading-relaxed">
          {{ announcement.content }}
        </p>
      </CardContent>
    </Card>

    <div v-if="announcements.length === 0" class="text-center py-8">
      <SafeIcon name="MessageSquare" :size="32" class="mx-auto text-muted-foreground/50 mb-2" />
      <p class="text-muted-foreground">暂无系统公告</p>
    </div>
  </div>
</template>

<style scoped>
.announcement-card {
  @apply border border-border bg-card;
}

.announcement-card:hover {
  @apply border-primary/30;
}
</style>
