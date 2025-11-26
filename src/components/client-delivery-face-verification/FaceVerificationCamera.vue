
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_DELIVERY_FACE_VERIFICATION_IMAGE } from '@/data/client_data'

type VerificationStatus = 'idle' | 'scanning' | 'success' | 'failure'

interface Props {
  status: VerificationStatus
  progress: number
}

const props = defineProps<Props>()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
    <!-- Background Image -->
    <img
      :src="MOCK_DELIVERY_FACE_VERIFICATION_IMAGE.url"
      alt="Face verification background"
      class="absolute inset-0 w-full h-full object-cover opacity-40"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center">
      <!-- Face Frame -->
      <div class="relative w-48 h-56 mb-6">
        <!-- Animated Border -->
        <div
          class="absolute inset-0 rounded-3xl border-4 border-transparent"
          :class="{
            'border-primary animate-pulse': props.status === 'scanning',
            'border-green-500': props.status === 'success',
            'border-red-500': props.status === 'failure',
          }"
        />

        <!-- Corner Markers -->
        <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
        <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
        <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
        <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />

        <!-- Scanning Line Animation -->
        <div
          v-if="props.status === 'scanning' && isMounted"
          class="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          :style="{
            top: `${props.progress}%`,
            animation: 'none'
          }"
        />

        <!-- Center Icon -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            v-if="props.status === 'scanning'"
            class="relative"
          >
<SafeIcon name="Loader2" :size="48" color="currentColor" class="text-primary animate-spin" />
          </div>
          <div
            v-else-if="props.status === 'success'"
            class="text-green-500"
          >
<SafeIcon name="CheckCircle2" :size="48" color="currentColor" />
          </div>
          <div
            v-else-if="props.status === 'failure'"
            class="text-red-500"
          >
<SafeIcon name="XCircle" :size="48" color="currentColor" />
          </div>
          <div
            v-else
            class="text-primary/50"
          >
<SafeIcon name="Camera" :size="48" color="currentColor" />
          </div>
        </div>
      </div>

      <!-- Status Text -->
      <div class="text-center">
        <p
          class="text-lg font-semibold"
          :class="{
            'text-primary': props.status === 'scanning',
            'text-green-500': props.status === 'success',
            'text-red-500': props.status === 'failure',
            'text-muted-foreground': props.status === 'idle',
          }"
        >
          <span v-if="props.status === 'scanning'">正在识别人脸...</span>
          <span v-else-if="props.status === 'success'">识别成功</span>
          <span v-else-if="props.status === 'failure'">识别失败</span>
          <span v-else>准备识别</span>
        </p>

        <!-- Progress Text -->
        <p v-if="props.status === 'scanning'" class="text-sm text-muted-foreground mt-2">
          进度: {{ Math.round(props.progress) }}%
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scan-line {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}
</style>
