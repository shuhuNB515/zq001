
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_FAQs } from '@/data/station_data'
import type { FAQModel } from '@/data/station_data'

const faqs = ref<FAQModel[]>(MOCK_FAQs)
const selectedTag = ref<string | null>(null)

const allTags = Array.from(
  new Set(faqs.value.flatMap(faq => faq.tags))
).sort()

const filteredFAQs = computed(() => {
  if (!selectedTag.value) {
    return faqs.value
  }
  return faqs.value.filter(faq => faq.tags.includes(selectedTag.value!))
})

const toggleTag = (tag: string) => {
  selectedTag.value = selectedTag.value === tag ? null : tag
}

const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.history.back()
  }
}

const handleDashboard = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-dashboard.html'
  }
}
</script>

<template>
  <div class="flex-1 bg-gradient-to-b from-background to-secondary/30">
    <div class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <SafeIcon name="HelpCircle" :size="24" color="white" />
          </div>
          <h1 class="text-4xl font-bold text-foreground">常见问题解答</h1>
        </div>
        <p class="text-lg text-muted-foreground max-w-2xl">
          快速查找关于取件、寄件、存储等常见问题的答案，帮助您更好地使用智取未来服务
        </p>
      </div>

      <!-- Tag Filter -->
      <div class="mb-8">
        <p class="text-sm font-semibold text-foreground mb-3">按分类筛选：</p>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="tag in allTags"
            :key="tag"
            :variant="selectedTag === tag ? 'default' : 'outline'"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </Badge>
        </div>
      </div>

      <!-- FAQ List -->
      <div class="bg-card rounded-lg border border-border shadow-soft p-6 mb-8">
        <div v-if="filteredFAQs.length > 0" class="space-y-2">
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem
              v-for="faq in filteredFAQs"
              :key="faq.id"
              :value="`faq-${faq.id}`"
              class="border-b border-border last:border-b-0"
            >
              <AccordionTrigger class="hover:bg-secondary/50 px-4 py-3 rounded-md transition-colors">
                <div class="flex items-start gap-3 text-left">
                  <SafeIcon name="ChevronRight" :size="20" class="mt-1 flex-shrink-0 text-primary" />
                  <span class="font-semibold text-foreground">{{ faq.question }}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent class="px-4 py-4 bg-secondary/20 rounded-md mt-2">
                <div class="space-y-3">
                  <p class="text-foreground leading-relaxed">{{ faq.answer }}</p>
                  <div class="flex flex-wrap gap-2 pt-2">
                    <Badge
                      v-for="tag in faq.tags"
                      :key="tag"
                      variant="secondary"
                      class="text-xs"
                    >
                      {{ tag }}
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div v-else class="text-center py-12">
          <SafeIcon name="Search" :size="48" class="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p class="text-muted-foreground">没有找到相关问题</p>
          <Button
            variant="outline"
            size="sm"
            class="mt-4"
            @click="selectedTag = null"
          >
            清除筛选
          </Button>
        </div>
      </div>

      <!-- Additional Help Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-card rounded-lg border border-border p-6 hover:shadow-card transition-shadow">
          <div class="flex items-center gap-3 mb-3">
            <SafeIcon name="Phone" :size="24" class="text-primary" />
            <h3 class="font-semibold text-foreground">电话咨询</h3>
          </div>
          <p class="text-sm text-muted-foreground mb-4">
            拨打客服热线获得实时帮助
          </p>
          <a href="tel:010-8888-6666" class="text-primary hover:underline font-medium">
            010-8888-6666
          </a>
        </div>

        <div class="bg-card rounded-lg border border-border p-6 hover:shadow-card transition-shadow">
          <div class="flex items-center gap-3 mb-3">
            <SafeIcon name="Mail" :size="24" class="text-primary" />
            <h3 class="font-semibold text-foreground">邮件反馈</h3>
          </div>
          <p class="text-sm text-muted-foreground mb-4">
            发送邮件描述您的问题
          </p>
          <a href="mailto:service@zhiquweilai.com" class="text-primary hover:underline font-medium">
            service@zhiquweilai.com
          </a>
        </div>

        <div class="bg-card rounded-lg border border-border p-6 hover:shadow-card transition-shadow">
          <div class="flex items-center gap-3 mb-3">
            <SafeIcon name="MapPin" :size="24" class="text-primary" />
            <h3 class="font-semibold text-foreground">网点咨询</h3>
          </div>
          <p class="text-sm text-muted-foreground mb-4">
            访问我们的网点获得面对面帮助
          </p>
          <a href="./client-station-details.html" class="text-primary hover:underline font-medium">
            查看网点信息
          </a>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          @click="handleBack"
          class="flex items-center gap-2"
        >
          <SafeIcon name="ArrowLeft" :size="18" />
          返回上一页
        </Button>
        <Button
          size="lg"
          @click="handleDashboard"
          class="flex items-center gap-2"
        >
          <SafeIcon name="Home" :size="18" />
          返回客户端仪表盘
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth accordion animations */
:deep(.accordion-item) {
  transition: all 0.2s ease-in-out;
}

:deep(.accordion-trigger) {
  transition: background-color 0.2s ease-in-out;
}
</style>
