
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_ANNOUNCEMENTS, type AnnouncementModel } from '@/data/admin_data'

const announcements = ref<AnnouncementModel[]>(MOCK_ANNOUNCEMENTS)
const isDialogOpen = ref(false)
const isPublishing = ref(false)
const publishSuccess = ref(false)

const newAnnouncement = ref({
  title: '',
  content: '',
  isUrgent: false,
})

const handlePublish = async () => {
  if (!newAnnouncement.value.title.trim() || !newAnnouncement.value.content.trim()) {
    return
  }

  isPublishing.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const announcement: AnnouncementModel = {
    id: Math.max(...announcements.value.map(a => a.id), 0) + 1,
    title: newAnnouncement.value.title,
    content: newAnnouncement.value.content,
    releaseDate: new Date().toLocaleString('zh-CN'),
    isUrgent: newAnnouncement.value.isUrgent,
  }

  announcements.value.unshift(announcement)
  
  isPublishing.value = false
  publishSuccess.value = true
  isDialogOpen.value = false
  
  // Reset form
  newAnnouncement.value = {
    title: '',
    content: '',
    isUrgent: false,
  }

  // Hide success message after 3 seconds
  setTimeout(() => {
    publishSuccess.value = false
  }, 3000)
}

const handleDelete = (id: number) => {
  announcements.value = announcements.value.filter(a => a.id !== id)
}

const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleString('zh-CN')
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Success Alert -->
    <Alert v-if="publishSuccess" class="border-green-200 bg-green-50">
      <SafeIcon name="CheckCircle" :size="16" class="text-green-600" />
      <AlertTitle class="text-green-800">发布成功</AlertTitle>
      <AlertDescription class="text-green-700">
        公告已成功发布，用户将立即看到
      </AlertDescription>
    </Alert>

    <!-- Publish Button -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-semibold">系统公告</h2>
        <p class="text-sm text-muted-foreground mt-1">
          共 {{ announcements.length }} 条公告
        </p>
      </div>
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button size="lg">
            <SafeIcon name="Plus" :size="18" class="mr-2" />
            发布新公告
          </Button>
        </DialogTrigger>
        <DialogContent class="max-w-2xl">
          <DialogHeader>
            <DialogTitle>发布新公告</DialogTitle>
            <DialogDescription>
              输入公告标题和内容，选择是否为紧急公告
            </DialogDescription>
          </DialogHeader>
          
          <div class="space-y-4 py-4">
            <!-- Title -->
            <div>
              <Label for="announcement-title" class="text-sm font-medium">
                公告标题 <span class="text-destructive">*</span>
              </Label>
              <Input
                id="announcement-title"
                v-model="newAnnouncement.title"
                placeholder="输入公告标题"
                class="mt-2"
              />
            </div>

            <!-- Content -->
            <div>
              <Label for="announcement-content" class="text-sm font-medium">
                公告内容 <span class="text-destructive">*</span>
              </Label>
              <Textarea
                id="announcement-content"
                v-model="newAnnouncement.content"
                placeholder="输入公告内容"
                class="mt-2 min-h-32"
              />
            </div>

            <!-- Urgent Flag -->
            <div class="flex items-center space-x-2">
              <input
                id="is-urgent"
                v-model="newAnnouncement.isUrgent"
                type="checkbox"
                class="w-4 h-4 rounded border-border"
              />
              <Label for="is-urgent" class="text-sm font-medium cursor-pointer">
                标记为紧急公告
              </Label>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2 pt-4 border-t">
            <Button 
              variant="outline"
              @click="isDialogOpen = false"
            >
              取消
            </Button>
            <Button
              @click="handlePublish"
              :disabled="isPublishing || !newAnnouncement.title.trim() || !newAnnouncement.content.trim()"
            >
              <SafeIcon 
                v-if="!isPublishing"
                name="Send" 
                :size="18" 
                class="mr-2" 
              />
              <SafeIcon 
                v-else
                name="Loader" 
                :size="18" 
                class="mr-2 animate-spin" 
              />
              {{ isPublishing ? '发布中...' : '发布公告' }}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Announcements List -->
    <div class="space-y-4">
      <Card 
        v-for="announcement in announcements" 
        :key="announcement.id"
        class="border border-border hover:shadow-card transition-shadow"
      >
        <CardHeader class="pb-3">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <CardTitle class="text-lg">{{ announcement.title }}</CardTitle>
                <Badge 
                  v-if="announcement.isUrgent"
                  variant="destructive"
                  class="flex items-center gap-1"
                >
                  <SafeIcon name="AlertCircle" :size="14" />
                  紧急
                </Badge>
              </div>
              <CardDescription class="mt-2">
                发布时间：{{ formatDate(announcement.releaseDate) }}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              @click="handleDelete(announcement.id)"
              class="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <SafeIcon name="Trash2" :size="18" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-foreground whitespace-pre-wrap">
            {{ announcement.content }}
          </p>
        </CardContent>
      </Card>

      <!-- Empty State -->
      <div v-if="announcements.length === 0" class="text-center py-12">
        <SafeIcon name="Megaphone" :size="48" class="mx-auto text-muted-foreground/50 mb-4" />
        <p class="text-muted-foreground">暂无公告</p>
      </div>
    </div>
  </div>
</template>
