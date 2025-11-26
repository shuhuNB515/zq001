
<script setup lang="ts">
interface Props {
  currentStep: number
  totalSteps: number
}

const props = defineProps<Props>()

const steps = [
  { number: 1, title: '预约寄件' },
  { number: 2, title: '填写信息' },
  { number: 3, title: '人脸核验' }
]
</script>

<template>
  <div class="flex items-center justify-between">
    <div v-for="(step, index) in steps" :key="step.number" class="flex items-center flex-1">
      <!-- Step Circle -->
      <div
        :class="[
          'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all',
          step.number < currentStep
            ? 'bg-primary text-primary-foreground'
            : step.number === currentStep
            ? 'bg-primary text-primary-foreground ring-4 ring-primary/30'
            : 'bg-muted text-muted-foreground'
        ]"
      >
        <span v-if="step.number < currentStep">✓</span>
        <span v-else>{{ step.number }}</span>
      </div>

      <!-- Step Title -->
      <div class="ml-3">
        <p
          :class="[
            'text-sm font-medium',
            step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
          ]"
        >
          {{ step.title }}
        </p>
      </div>

      <!-- Connector Line -->
      <div
        v-if="index < steps.length - 1"
        :class="[
          'flex-1 h-1 mx-4 rounded-full transition-all',
          step.number < currentStep ? 'bg-primary' : 'bg-muted'
        ]"
      ></div>
    </div>
  </div>
</template>
