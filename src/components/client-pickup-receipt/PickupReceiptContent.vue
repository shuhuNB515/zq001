
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { MOCK_PICKUP_RECEIPT } from '@/data/client_data'
import type { ReceiptModel } from '@/data/client_data'

const receipt: ReceiptModel = MOCK_PICKUP_RECEIPT

const isDownloading = ref(false)

const handleDownloadReceipt = () => {
  isDownloading.value = true
  // 模拟下载延迟
  setTimeout(() => {
    // 创建虚拟下载链接
    const element = document.createElement('a')
    const file = new Blob([generateReceiptContent()], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `receipt_${receipt.trackingNumber}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    isDownloading.value = false
  }, 500)
}

const generateReceiptContent = () => {
  return `
========================================
        智取未来 - 取件成功回执
========================================

快件单号: ${receipt.trackingNumber}
取件时间: ${receipt.pickupTime}
操作员: ${receipt.operator}

${receipt.message}

========================================
感谢您使用智取未来服务！
========================================
  `.trim()
}

const handleReturnHome = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './homepage.html'
  }
}

const handlePickupAgain = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './client-pickup-service-entry.html'
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-2xl mx-auto">
      <!-- Success Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
          <SafeIcon name="CheckCircle2" :size="40" color="#22c55e" />
        </div>
        <h1 class="text-3xl font-bold text-foreground mb-2">取件成功</h1>
        <p class="text-lg text-muted-foreground">您的快件已成功取出</p>
      </div>

      <!-- Receipt Card -->
      <Card class="mb-8 shadow-card">
        <CardHeader class="bg-gradient-to-r from-primary/5 to-accent/5 border-b">
          <CardTitle class="flex items-center">
            <SafeIcon name="FileText" :size="24" class="mr-3 text-primary" />
            电子回执
          </CardTitle>
          <CardDescription>请妥善保管此回执作为取件凭证</CardDescription>
        </CardHeader>
        <CardContent class="pt-8">
          <!-- Receipt Details -->
          <div class="space-y-6">
            <!-- Tracking Number -->
            <div class="border-b pb-6">
              <p class="text-sm text-muted-foreground mb-2">快件单号</p>
              <p class="text-2xl font-bold text-foreground font-mono">{{ receipt.trackingNumber }}</p>
            </div>

            <!-- Pickup Time -->
            <div class="border-b pb-6">
              <p class="text-sm text-muted-foreground mb-2">取件时间</p>
              <div class="flex items-center">
                <SafeIcon name="Clock" :size="20" class="mr-3 text-primary" />
                <p class="text-lg text-foreground">{{ receipt.pickupTime }}</p>
              </div>
            </div>

            <!-- Operator -->
            <div class="border-b pb-6">
              <p class="text-sm text-muted-foreground mb-2">操作员</p>
              <div class="flex items-center">
                <SafeIcon name="Robot" :size="20" class="mr-3 text-primary" />
                <p class="text-lg text-foreground">{{ receipt.operator }}</p>
              </div>
            </div>

            <!-- Message -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start">
                <SafeIcon name="CheckCircle" :size="20" class="mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                <p class="text-sm text-green-800">{{ receipt.message }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <!-- Download Receipt -->
        <Button
          @click="handleDownloadReceipt"
          :disabled="isDownloading"
          class="w-full h-12 text-base font-semibold"
        >
          <SafeIcon
            :name="isDownloading ? 'Loader2' : 'Download'"
            :size="20"
            class="mr-2"
            :class="{ 'animate-spin': isDownloading }"
          />
          {{ isDownloading ? '下载中...' : '下载回执' }}
        </Button>

        <!-- Return Home -->
        <Button
          @click="handleReturnHome"
          variant="outline"
          class="w-full h-12 text-base font-semibold"
        >
          <SafeIcon name="Home" :size="20" class="mr-2" />
          返回首页
        </Button>

        <!-- Pickup Again -->
        <Button
          @click="handlePickupAgain"
          variant="secondary"
          class="w-full h-12 text-base font-semibold"
        >
          <SafeIcon name="RotateCcw" :size="20" class="mr-2" />
          重新取件
        </Button>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-start">
          <SafeIcon name="Info" :size="20" class="mr-3 text-blue-600 mt-0.5 flex-shrink-0" />
          <div class="text-sm text-blue-800">
            <p class="font-semibold mb-1">温馨提示</p>
            <ul class="list-disc list-inside space-y-1">
              <li>请妥善保管此回执，作为取件凭证</li>
              <li>如有任何问题，请联系客服：400-123-4567</li>
              <li>感谢您使用智取未来服务</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
