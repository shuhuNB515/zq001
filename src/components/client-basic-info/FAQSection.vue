
<script setup lang="ts">
import { MOCK_FAQs } from '@/data/station_data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'

const faqs = MOCK_FAQs

const getCategoryColor = (tag: string) => {
  const colorMap: Record<string, string> = {
    '存储': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    '超时规则': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    '寄件限制': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    '违禁品': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    '取件': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    '安全': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    '人脸识别': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  }
  return colorMap[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}
</script>

<template>
  <Card class="shadow-card">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <SafeIcon name="HelpCircle" :size="24" class="text-primary" />
        常见问题解答
      </CardTitle>
      <CardDescription>快速了解服务规则和常见疑问</CardDescription>
    </CardHeader>
    <CardContent>
      <Accordion type="single" collapsible class="w-full">
        <AccordionItem 
          v-for="(faq, index) in faqs" 
          :key="faq.id"
          :value="`item-${index}`"
          class="border-b border-border last:border-b-0"
        >
          <AccordionTrigger class="hover:no-underline py-4 text-left">
            <div class="flex items-start gap-3 flex-1">
              <SafeIcon name="ChevronRight" :size="20" class="text-primary mt-0.5 flex-shrink-0 transition-transform" />
              <div class="flex-1">
                <p class="font-semibold text-foreground text-base">{{ faq.question }}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent class="pb-4 pt-2">
            <div class="ml-8 space-y-3">
              <p class="text-foreground leading-relaxed">{{ faq.answer }}</p>
              <div class="flex flex-wrap gap-2">
                <Badge 
                  v-for="tag in faq.tags"
                  :key="tag"
                  :class="getCategoryColor(tag)"
                  variant="secondary"
                >
                  {{ tag }}
                </Badge>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <!-- Additional Help Section -->
      <div class="mt-8 pt-6 border-t border-border">
        <div class="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div class="flex gap-4">
            <SafeIcon name="MessageCircle" :size="24" class="text-primary flex-shrink-0" />
            <div>
              <h3 class="font-semibold text-foreground mb-2">仍有疑问？</h3>
              <p class="text-muted-foreground text-sm mb-4">
                如果您的问题未在上述常见问题中找到答案，欢迎联系我们的客服团队。
              </p>
              <div class="flex flex-col sm:flex-row gap-3">
                <a 
                  href="tel:010-8888-6666"
                  class="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  <SafeIcon name="Phone" :size="16" class="mr-2" />
                  拨打客服电话
                </a>
                <a 
                  href="mailto:service@zhiquweilai.com"
                  class="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium text-sm"
                >
                  <SafeIcon name="Mail" :size="16" class="mr-2" />
                  发送邮件
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
