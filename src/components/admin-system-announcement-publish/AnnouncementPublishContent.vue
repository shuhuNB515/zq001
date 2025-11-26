
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_ANNOUNCEMENTS, type AnnouncementModel } from '@/data/admin_data'
import AnnouncementList from './AnnouncementList.vue'

// Form state
const formData = ref({
  title: '',
  content: '',
  isUrgent: false
})

const announcements = ref<AnnouncementModel[]>(MOCK_ANNOUNCEMENTS)
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const handleSubmit = async () => {
  if (!formData.value.title.trim() || !formData.value.content.trim()) {
    return
  }

  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))

  // Add new announcement to list
  const newAnnouncement: AnnouncementModel = {
    id: Math.max(...announcements.value.map(a => a.id), 0) + 1,
    title: formData.value.title,
    content: formData.value.content,
    releaseDate: new Date().toLocaleString('zh-CN'),
    isUrgent: formData.value.isUrgent
  }

  announcements.value.unshift(newAnnouncement)

  // Reset form
  formData.value = {
    title: '',
    content: '',
    isUrgent: false
  }

  submitSuccess.value = true
  isSubmitting.value = false

  // Hide success message after 3 seconds
  setTimeout(() => {
    submitSuccess.value = false
  }, 3000)
}

const handleReturn = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-basic-settings.html'
  }
}

const handleDashboard = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-dashboard.html'
  }
}

const isFormValid = formData.value.title.trim() && formData.value.content.trim()
</script>

<template>
  <div class="flex-1 flex flex-col">
    <!-- Page Header -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-foreground flex items-center">
            <SafeIcon name="Megaphone" :size="32" class="mr-3 text-primary" />
            系统公告发布
          </h1>
          <p class="text-muted-foreground mt-2">发布系统公告，如设备维护通知等重要信息</p>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" @click="handleReturn">
            <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
            返回基础设置
          </Button>
          <Button variant="ghost" @click="handleDashboard">
            <SafeIcon name="Home" :size="18" class="mr-2" />
            管理台主页
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Form Section -->
        <div class="lg:col-span-2">
          <Card class="shadow-card">
            <CardHeader>
              <CardTitle>发布新公告</CardTitle>
              <CardDescription>填写公告信息并发布到系统</CardDescription>
            </CardHeader>
            <CardContent>
              <!-- Success Alert -->
              <Alert v-if="submitSuccess && isMounted" class="mb-6 bg-green-50 border-green-200">
                <SafeIcon name="CheckCircle" :size="18" class="text-green-600" />
                <AlertTitle class="text-green-800">发布成功</AlertTitle>
                <AlertDescription class="text-green-700">
                  公告已成功发布，将在系统中显示
                </AlertDescription>
              </Alert>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Title Field -->
                <div class="space-y-2">
                  <Label for="title" class="text-base font-semibold">公告标题 *</Label>
                  <Input
                    id="title"
                    v-model="formData.title"
                    placeholder="例如：设备维护通知：分拣机器人RB003临时停机"
                    class="h-10"
                    maxlength="100"
                  />
                  <p class="text-xs text-muted-foreground">
                    {{ formData.title.length }}/100 字符
                  </p>
                </div>

                <!-- Content Field -->
                <div class="space-y-2">
                  <Label for="content" class="text-base font-semibold">公告内容 *</Label>
                  <Textarea
                    id="content"
                    v-model="formData.content"
                    placeholder="详细描述公告内容，包括影响范围、处理措施等..."
                    class="min-h-32 resize-none"
                    maxlength="500"
                  />
                  <p class="text-xs text-muted-foreground">
                    {{ formData.content.length }}/500 字符
                  </p>
                </div>

                <!-- Urgent Flag -->
                <div class="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Checkbox
                    id="urgent"
                    v-model:checked="formData.isUrgent"
                  />
                  <Label for="urgent" class="flex-1 cursor-pointer">
                    <span class="font-semibold text-orange-900">标记为紧急公告</span>
                    <p class="text-xs text-orange-700 mt-1">紧急公告将在系统中以红色标记显示，提高用户关注度</p>
                  </Label>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    class="flex-1"
                    :disabled="!isFormValid || isSubmitting"
                  >
                    <SafeIcon v-if="!isSubmitting" name="Send" :size="18" class="mr-2" />
                    <span v-if="isSubmitting" class="inline-block animate-spin mr-2">
                      <SafeIcon name="Loader" :size="18" />
                    </span>
                    {{ isSubmitting ? '发布中...' : '发布公告' }}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    @click="formData = { title: '', content: '', isUrgent: false }"
                  >
                    <SafeIcon name="RotateCcw" :size="18" class="mr-2" />
                    重置
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <!-- Info Section -->
        <div class="space-y-4">
          <Card class="bg-blue-50 border-blue-200 shadow-soft">
            <CardHeader>
              <CardTitle class="text-blue-900 flex items-center">
                <SafeIcon name="Info" :size="20" class="mr-2" />
                发布指南
              </CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-blue-800 space-y-3">
              <div>
                <p class="font-semibold mb-1">📋 标题建议</p>
                <p>简洁明了，包含关键信息和时间</p>
              </div>
              <div>
                <p class="font-semibold mb-1">📝 内容建议</p>
                <p>详细说明事项、影响范围和处理措施</p>
              </div>
              <div>
                <p class="font-semibold mb-1">⚠️ 紧急标记</p>
                <p>用于重要通知，如设备故障、服务中断等</p>
              </div>
              <div>
                <p class="font-semibold mb-1">✅ 发布后</p>
                <p>公告将立即显示在系统中，用户可见</p>
              </div>
            </CardContent>
          </Card>

          <Card class="bg-purple-50 border-purple-200 shadow-soft">
            <CardHeader>
              <CardTitle class="text-purple-900 text-base">发布统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-purple-800">总公告数</span>
                  <span class="text-2xl font-bold text-purple-900">{{ announcements.length }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-purple-800">紧急公告</span>
                  <span class="text-2xl font-bold text-orange-600">
                    {{ announcements.filter(a => a.isUrgent).length }}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Announcements List Section -->
      <div class="mt-8">
        <AnnouncementList :announcements="announcements" />
      </div>
    </div>
  </div>
</template>
