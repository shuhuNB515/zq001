
<script setup lang="ts">
import type { PickupOptionModel } from '@/data/client_data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  option: PickupOptionModel
  isSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false
})

const emit = defineEmits<{
  select: [optionId: string]
}>()

const handleSelect = () => {
  emit('select', props.option.id)
}
</script>

<template>
  <Card 
    class="h-full hover:shadow-lg transition-all duration-300 cursor-pointer"
    :class="isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'"
  >
    <CardHeader class="text-center pb-4">
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <SafeIcon 
            :name="option.iconName" 
            :size="32" 
            color="currentColor"
            class="text-primary"
          />
        </div>
      </div>
      <CardTitle class="text-xl">{{ option.title }}</CardTitle>
      <CardDescription class="text-base mt-2">
        {{ option.description }}
      </CardDescription>
    </CardHeader>
    <CardContent class="flex justify-center">
      <Button
        @click="handleSelect"
        :variant="isSelected ? 'default' : 'outline'"
        size="lg"
        class="w-full"
      >
        <SafeIcon name="ChevronRight" :size="20" class="mr-2" />
        选择此方式
      </Button>
    </CardContent>
  </Card>
</template>
