
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import SafeIcon from '@/components/common/SafeIcon.vue'
import DeliveryTypeSelector from './DeliveryTypeSelector.vue'
import { DELIVERY_SERVICE_OPTIONS, MOCK_DELIVERY_APPOINTMENT_IMAGE } from '@/data/client_data'

// Form state
const formData = ref({
  recipientName: '',
  recipientPhone: '',
  recipientAddress: '',
  recipientDetails: '',
  selectedDeliveryType: 'standard',
})

const isSubmitting = ref(false)

const handleNext = () => {
  // Validate form
  if (!formData.value.recipientName || !formData.value.recipientPhone || !formData.value.recipientAddress) {
    alert('请填写完整的收件信息')
    return
  }

  isSubmitting.value = true
  
  // Simulate form submission
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      window.location.href = './client-fill-delivery-info.html'
    }
  }, 500)
}

const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-delivery-entry.html'
  }
}

const selectedService = ref(DELIVERY_SERVICE_OPTIONS[0])

const handleDeliveryTypeChange = (typeId: string) => {
  formData.value.selectedDeliveryType = typeId
  selectedService.value = DELIVERY_SERVICE_OPTIONS.find(s => s.id === typeId) || DELIVERY_SERVICE_OPTIONS[0]
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-secondary/30">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <button 
          @click="handleBack"
          class="flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <SafeIcon name="ArrowLeft" :size="20" class="mr-2" />
          <span>返回寄件入口</span>
        </button>
        <h1 class="text-4xl font-bold text-foreground mb-2">预约寄件</h1>
        <p class="text-muted-foreground">填写收件信息，选择快递类型，轻松完成寄件预约</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Form -->
        <div class="lg:col-span-2">
          <div class="bg-card rounded-lg shadow-card p-8 border border-border">
            <form @submit.prevent="handleNext" class="space-y-6">
              <!-- Recipient Information Section -->
              <div>
                <h2 class="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <SafeIcon name="User" :size="24" class="mr-2 text-primary" />
                  收件人信息
                </h2>
                <div class="space-y-4">
                  <div>
                    <Label for="recipientName" class="text-base font-medium">收件人姓名 *</Label>
                    <Input
                      id="recipientName"
                      v-model="formData.recipientName"
                      type="text"
                      placeholder="请输入收件人姓名"
                      class="mt-2 h-10"
                      required
                    />
                  </div>

                  <div>
                    <Label for="recipientPhone" class="text-base font-medium">收件人电话 *</Label>
                    <Input
                      id="recipientPhone"
                      v-model="formData.recipientPhone"
                      type="tel"
                      placeholder="请输入收件人电话号码"
                      class="mt-2 h-10"
                      required
                    />
                  </div>

                  <div>
                    <Label for="recipientAddress" class="text-base font-medium">收件地址 *</Label>
                    <Input
                      id="recipientAddress"
                      v-model="formData.recipientAddress"
                      type="text"
                      placeholder="请输入收件地址"
                      class="mt-2 h-10"
                      required
                    />
                  </div>

                  <div>
                    <Label for="recipientDetails" class="text-base font-medium">详细地址（可选）</Label>
                    <Textarea
                      id="recipientDetails"
                      v-model="formData.recipientDetails"
                      placeholder="如：几号楼、几单元、几号房间等"
                      class="mt-2 min-h-24 resize-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Divider -->
              <div class="border-t border-border"></div>

              <!-- Delivery Type Section -->
              <div>
                <h2 class="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <SafeIcon name="Truck" :size="24" class="mr-2 text-primary" />
                  选择快递类型
                </h2>
                <DeliveryTypeSelector
                  :options="DELIVERY_SERVICE_OPTIONS"
                  :selected="formData.selectedDeliveryType"
                  @change="handleDeliveryTypeChange"
                />
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-4 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  class="flex-1"
                  @click="handleBack"
                >
                  <SafeIcon name="ArrowLeft" :size="18" class="mr-2" />
                  返回
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  class="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">下一步</span>
                  <span v-else class="flex items-center">
                    <SafeIcon name="Loader2" :size="18" class="mr-2 animate-spin" />
                    处理中...
                  </span>
                  <SafeIcon name="ArrowRight" :size="18" class="ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <!-- Sidebar: Service Info & Image -->
        <div class="lg:col-span-1">
          <!-- Service Summary Card -->
          <div class="bg-card rounded-lg shadow-card p-6 border border-border mb-6 sticky top-24">
            <h3 class="text-lg font-semibold text-foreground mb-4 flex items-center">
              <SafeIcon name="Info" :size="20" class="mr-2 text-primary" />
              快递信息
            </h3>
            
            <div class="space-y-4">
              <div class="bg-secondary/50 rounded-lg p-4">
                <p class="text-sm text-muted-foreground mb-1">已选择快递类型</p>
                <p class="text-lg font-semibold text-foreground">{{ selectedService.name }}</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="bg-secondary/50 rounded-lg p-3">
                  <p class="text-xs text-muted-foreground mb-1">预估价格</p>
                  <p class="text-base font-semibold text-primary">{{ selectedService.estimatedPrice }}</p>
                </div>
                <div class="bg-secondary/50 rounded-lg p-3">
                  <p class="text-xs text-muted-foreground mb-1">预计时间</p>
                  <p class="text-base font-semibold text-accent">{{ selectedService.estimatedTime }}</p>
                </div>
              </div>

              <div class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p class="text-xs text-blue-700 dark:text-blue-300 flex items-start">
                  <SafeIcon name="AlertCircle" :size="16" class="mr-2 mt-0.5 flex-shrink-0" />
                  <span>预约成功后，请在24小时内完成人脸核验，否则预约将自动取消。</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Promotional Image -->
          <div class="bg-card rounded-lg shadow-card overflow-hidden border border-border">
            <img
              :src="MOCK_DELIVERY_APPOINTMENT_IMAGE.url"
              alt="寄件服务"
              class="w-full h-auto object-cover"
            />
            <div class="p-4 bg-gradient-to-t from-black/20 to-transparent">
              <p class="text-sm text-white font-medium">智取未来寄件服务</p>
              <p class="text-xs text-white/80">快速、安全、可靠</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
