
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'

interface Props {
  variant?: 'simple' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'simple'
})

const currentYear = new Date().getFullYear()

const footerLinks = [
  { name: '关于我们', href: '#about' },
  { name: '隐私政策', href: '#privacy' },
  { name: '服务条款', href: '#terms' },
  { name: '联系我们', href: '#contact' },
]

const socialLinks = [
  { icon: 'Mail', href: 'mailto:contact@zhiquweilai.com', label: '邮箱' },
  { icon: 'Phone', href: 'tel:400-123-4567', label: '电话' },
]

const stationInfo = {
  address: '智能物流园区A座1楼',
  hours: '周一至周日 08:00-20:00',
  phone: '400-123-4567',
  email: 'service@zhiquweilai.com'
}
</script>

<template>
  <!-- Simple Footer -->
  <footer v-if="variant === 'simple'" class="bg-background border-t border-border mt-auto">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
          <a
            v-for="link in footerLinks"
            :key="link.name"
            :href="link.href"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ link.name }}
          </a>
        </div>
        <p class="text-sm text-muted-foreground">
          © {{ currentYear }} 智取未来 版权所有
        </p>
      </div>
    </div>
  </footer>

  <!-- Full Footer -->
  <footer v-else class="bg-card border-t border-border mt-auto">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Station Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <SafeIcon name="MapPin" :size="20" class="mr-2 text-primary" />
            网点信息
          </h3>
          <div class="space-y-2 text-sm text-muted-foreground">
            <p class="flex items-start">
              <SafeIcon name="Home" :size="16" class="mr-2 mt-0.5 flex-shrink-0" />
              {{ stationInfo.address }}
            </p>
            <p class="flex items-start">
              <SafeIcon name="Clock" :size="16" class="mr-2 mt-0.5 flex-shrink-0" />
              {{ stationInfo.hours }}
            </p>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <SafeIcon name="Phone" :size="20" class="mr-2 text-primary" />
            联系方式
          </h3>
          <div class="space-y-2 text-sm text-muted-foreground">
            <p class="flex items-center">
              <SafeIcon name="Phone" :size="16" class="mr-2" />
              {{ stationInfo.phone }}
            </p>
            <p class="flex items-center">
              <SafeIcon name="Mail" :size="16" class="mr-2" />
              {{ stationInfo.email }}
            </p>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <SafeIcon name="Link" :size="20" class="mr-2 text-primary" />
            快速链接
          </h3>
          <div class="space-y-2">
            <a
              v-for="link in footerLinks"
              :key="link.name"
              :href="link.href"
              class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>

      <div class="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-muted-foreground">
          © {{ currentYear }} 智取未来 版权所有
        </p>
        <div class="flex items-center gap-2">
          <Button
            v-for="social in socialLinks"
            :key="social.label"
            variant="ghost"
            size="icon"
            :aria-label="social.label"
            as="a"
            :href="social.href"
          >
            <SafeIcon :name="social.icon" :size="18" />
          </Button>
        </div>
      </div>
    </div>
  </footer>
</template>
