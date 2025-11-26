
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import FormStepIndicator from './FormStepIndicator.vue'
import DeliveryServiceSelector from './DeliveryServiceSelector.vue'
import { DELIVERY_SERVICE_OPTIONS } from '@/data/client_data'

// Form state
const formData = reactive({
  recipientName: '',
  recipientPhone: '',
  recipientAddress: '',
  recipientAddressDetail: '',
  senderName: '',
  senderPhone: '',
  packageDescription: '',
  selectedService: 'standard'
})

const errors = reactive({
  recipientName: '',
  recipientPhone: '',
  recipientAddress: '',
  senderName: '',
  senderPhone: '',
  packageDescription: ''
})

const isSubmitting = ref(false)

// Validation
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Validate recipient info
  if (!formData.recipientName.trim()) {
    errors.recipientName = '请输入收件人姓名'
    isValid = false
  }
  
  if (!formData.recipientPhone.trim()) {
    errors.recipientPhone = '请输入收件人电话'
    isValid = false
  } else if (!/^1[3-9]\d{9}$/.test(formData.recipientPhone)) {
    errors.recipientPhone = '请输入有效的手机号码'
    isValid = false
  }

  if (!formData.recipientAddress.trim()) {
    errors.recipientAddress = '请输入收件地址'
    isValid = false
  }

  // Validate sender info
  if (!formData.senderName.trim()) {
    errors.senderName = '请输入寄件人姓名'
    isValid = false
  }

  if (!formData.senderPhone.trim()) {
    errors.senderPhone = '请输入寄件人电话'
    isValid = false
  } else if (!/^1[3-9]\d{9}$/.test(formData.senderPhone)) {
    errors.senderPhone = '请输入有效的手机号码'
    isValid = false
  }

  if (!formData.packageDescription.trim()) {
    errors.packageDescription = '请描述快件内容'
    isValid = false
  }

  return isValid
}

// Handle next step
const handleNext = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Store form data in sessionStorage for next step
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('deliveryFormData', JSON.stringify(formData))
    window.location.href = './client-delivery-face-verification.html'
  }
  
  isSubmitting.value = false
}

// Handle previous step
const handlePrevious = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-schedule-delivery.html'
  }
}

// Get selected service details
const selectedServiceDetails = DELIVERY_SERVICE_OPTIONS.find(
  service => service.id === formData.selectedService
)
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Step Indicator -->
    <FormStepIndicator :current-step="2" :total-steps="3" />

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <!-- Form Section -->
      <div class="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>填写寄件信息</CardTitle>
            <CardDescription>请详细填写收件人和寄件人信息</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="handleNext" class="space-y-8">
              <!-- Recipient Section -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <SafeIcon name="User" :size="20" class="mr-2 text-primary" />
                  收件人信息
                </h3>
                
                <div class="space-y-2">
                  <Label for="recipientName">收件人姓名 *</Label>
                  <Input
                    id="recipientName"
                    v-model="formData.recipientName"
                    placeholder="请输入收件人姓名"
                    :class="{ 'border-destructive': errors.recipientName }"
                  />
                  <p v-if="errors.recipientName" class="text-sm text-destructive">
                    {{ errors.recipientName }}
                  </p>
                </div>

                <div class="space-y-2">
                  <Label for="recipientPhone">收件人电话 *</Label>
                  <Input
                    id="recipientPhone"
                    v-model="formData.recipientPhone"
                    type="tel"
                    placeholder="请输入收件人手机号码"
                    :class="{ 'border-destructive': errors.recipientPhone }"
                  />
                  <p v-if="errors.recipientPhone" class="text-sm text-destructive">
                    {{ errors.recipientPhone }}
                  </p>
                </div>

                <div class="space-y-2">
                  <Label for="recipientAddress">收件地址 *</Label>
                  <Input
                    id="recipientAddress"
                    v-model="formData.recipientAddress"
                    placeholder="请输入收件地址（省市区）"
                    :class="{ 'border-destructive': errors.recipientAddress }"
                  />
                  <p v-if="errors.recipientAddress" class="text-sm text-destructive">
                    {{ errors.recipientAddress }}
                  </p>
                </div>

                <div class="space-y-2">
                  <Label for="recipientAddressDetail">详细地址</Label>
                  <Textarea
                    id="recipientAddressDetail"
                    v-model="formData.recipientAddressDetail"
                    placeholder="请输入街道地址、楼号、房间号等详细信息"
                    rows="3"
                  />
                </div>
              </div>

              <!-- Divider -->
              <div class="border-t border-border"></div>

              <!-- Sender Section -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <SafeIcon name="Send" :size="20" class="mr-2 text-primary" />
                  寄件人信息
                </h3>

                <div class="space-y-2">
                  <Label for="senderName">寄件人姓名 *</Label>
                  <Input
                    id="senderName"
                    v-model="formData.senderName"
                    placeholder="请输入寄件人姓名"
                    :class="{ 'border-destructive': errors.senderName }"
                  />
                  <p v-if="errors.senderName" class="text-sm text-destructive">
                    {{ errors.senderName }}
                  </p>
                </div>

                <div class="space-y-2">
                  <Label for="senderPhone">寄件人电话 *</Label>
                  <Input
                    id="senderPhone"
                    v-model="formData.senderPhone"
                    type="tel"
                    placeholder="请输入寄件人手机号码"
                    :class="{ 'border-destructive': errors.senderPhone }"
                  />
                  <p v-if="errors.senderPhone" class="text-sm text-destructive">
                    {{ errors.senderPhone }}
                  </p>
                </div>
              </div>

              <!-- Divider -->
              <div class="border-t border-border"></div>

              <!-- Package Section -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold flex items-center">
                  <SafeIcon name="Package" :size="20" class="mr-2 text-primary" />
                  快件信息
                </h3>

                <div class="space-y-2">
                  <Label for="packageDescription">快件描述 *</Label>
                  <Textarea
                    id="packageDescription"
                    v-model="formData.packageDescription"
                    placeholder="请描述快件内容（如：书籍、衣服、电子产品等）"
                    rows="3"
                    :class="{ 'border-destructive': errors.packageDescription }"
                  />
                  <p v-if="errors.packageDescription" class="text-sm text-destructive">
                    {{ errors.packageDescription }}
                  </p>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  @click="handlePrevious"
                  class="flex-1"
                >
                  <SafeIcon name="ChevronLeft" :size="18" class="mr-2" />
                  上一步
                </Button>
                <Button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex-1"
                >
                  <span v-if="!isSubmitting">
                    下一步
                    <SafeIcon name="ChevronRight" :size="18" class="ml-2" />
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <SafeIcon name="Loader2" :size="18" class="mr-2 animate-spin" />
                    处理中...
                  </span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <!-- Service Selection Sidebar -->
      <div class="lg:col-span-1">
        <Card class="sticky top-24">
          <CardHeader>
            <CardTitle class="text-base">选择快递类型</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <DeliveryServiceSelector
              v-for="service in DELIVERY_SERVICE_OPTIONS"
              :key="service.id"
              :service="service"
              :is-selected="formData.selectedService === service.id"
              @select="formData.selectedService = service.id"
            />

            <!-- Selected Service Details -->
            <div v-if="selectedServiceDetails" class="mt-6 p-4 bg-accent/50 rounded-lg border border-accent">
              <h4 class="font-semibold text-sm mb-3">已选择服务</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">服务类型：</span>
                  <span class="font-medium">{{ selectedServiceDetails.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">预计价格：</span>
                  <span class="font-medium text-primary">{{ selectedServiceDetails.estimatedPrice }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">配送时间：</span>
                  <span class="font-medium">{{ selectedServiceDetails.estimatedTime }}</span>
                </div>
              </div>
            </div>

            <!-- Tips -->
            <div class="mt-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div class="flex gap-2">
                <SafeIcon name="Info" :size="16" class="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div class="text-xs text-blue-700 dark:text-blue-300">
                  <p class="font-semibold mb-1">温馨提示</p>
                  <p>请确保所有信息准确无误，以便快件顺利送达。</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
