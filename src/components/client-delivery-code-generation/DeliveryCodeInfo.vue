
<script setup lang="ts">
interface Props {
  validityPeriod: string
  instructions: string
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
    <!-- Validity Period -->
    <div class="flex items-start space-x-3">
      <div class="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-semibold text-blue-900">有效期</p>
        <p class="text-sm text-blue-700">{{ validityPeriod }}</p>
      </div>
    </div>

    <!-- Instructions -->
    <div class="flex items-start space-x-3">
      <div class="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-semibold text-blue-900">使用说明</p>
        <p class="text-sm text-blue-700">{{ instructions }}</p>
      </div>
    </div>
  </div>
</template>
