
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { toast } from 'vue-sonner'

interface Props {
  deliveryCode: string
}

const props = defineProps<Props>()

const isCopied = ref(false)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const copyToClipboard = async () => {
  if (typeof window === 'undefined') return
  
  try {
    await navigator.clipboard.writeText(props.deliveryCode)
    isCopied.value = true
    toast.success('寄件码已复制到剪贴板')
    
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    toast.error('复制失败，请重试')
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Code Display Box -->
    <div class="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-xl p-6 text-center">
      <p class="text-sm text-muted-foreground mb-3 font-medium">您的寄件码</p>
      <p class="text-5xl font-bold text-primary tracking-widest font-mono">
        {{ deliveryCode }}
      </p>
    </div>

    <!-- Copy Button -->
    <Button 
      v-if="isMounted"
      @click="copyToClipboard"
      :variant="isCopied ? 'default' : 'outline'"
      class="w-full h-12 text-base font-semibold transition-all"
      :class="isCopied && 'bg-green-600 hover:bg-green-700 border-green-600'"
    >
      <SafeIcon 
        :name="isCopied ? 'Check' : 'Copy'" 
        :size="20" 
        class="mr-2"
      />
      {{ isCopied ? '已复制' : '复制寄件码' }}
    </Button>

    <!-- Fallback for non-JS -->
    <div v-else class="w-full h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-semibold">
      复制寄件码
    </div>
  </div>
</template>
