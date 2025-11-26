
<script setup lang="ts">
import { MOCK_FAQs } from '@/data/station_data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { Button } from '@/components/ui/button'

// Show only first 3 FAQs as preview
const previewFAQs = MOCK_FAQs.slice(0, 3)

const handleViewAllFAQ = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-faq.html'
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- FAQ Cards -->
    <div class="grid gap-4">
      <Card 
        v-for="faq in previewFAQs" 
        :key="faq.id"
        class="hover:shadow-card transition-shadow"
      >
        <CardHeader class="pb-3">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <CardTitle class="text-lg flex items-start">
                <SafeIcon name="HelpCircle" :size="20" class="mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span>{{ faq.question }}</span>
              </CardTitle>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <Badge 
              v-for="tag in faq.tags" 
              :key="tag"
              variant="secondary"
              class="text-xs"
            >
              {{ tag }}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground leading-relaxed">{{ faq.answer }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- View All FAQ Button -->
    <div class="pt-4">
      <Button 
        @click="handleViewAllFAQ"
        variant="outline"
        class="w-full"
      >
        <SafeIcon name="BookOpen" :size="18" class="mr-2" />
        查看全部常见问题 ({{ MOCK_FAQs.length }} 个)
      </Button>
    </div>
  </div>
</template>
