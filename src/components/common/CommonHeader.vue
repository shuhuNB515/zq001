
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

interface Props {
  variant?: 'default' | 'admin'
  showNav?: boolean
  currentUser?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showNav: true,
  currentUser: null
})

const isMenuOpen = ref(false)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const navLinks = [
  { name: '取件服务', href: './client-pickup-service-entry.html' },
  { name: '寄件服务', href: './client-delivery-entry.html' },
  { name: '快件查询', href: './placeholder.html' },
  { name: '网点信息', href: './placeholder.html' },
]

const handleLogout = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './homepage.html'
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto flex h-20 items-center justify-between px-4">
      <!-- Logo and Brand -->
      <a href="./homepage.html" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
        <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <img src="/src/assets/png/智取未来.png" alt="智取未来" class="w-full h-full rounded-xl object-cover">
        </div>
        <span class="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          智取未来
        </span>
      </a>

      <!-- Desktop Navigation -->
      <nav v-if="showNav && variant === 'default'" class="hidden md:flex items-center space-x-1">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          class="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
        >
          {{ link.name }}
        </a>
      </nav>

      <!-- User Actions -->
      <div class="flex items-center space-x-2">
        <div v-if="currentUser && isMounted" class="hidden md:flex items-center space-x-3">
          <span class="text-sm text-muted-foreground">{{ currentUser }}</span>
          <Button variant="outline" size="sm" @click="handleLogout">
            <SafeIcon name="LogOut" :size="16" class="mr-2" />
            退出登录
          </Button>
        </div>

        <!-- Mobile Menu -->
        <Sheet v-if="showNav && variant === 'default'" v-model:open="isMenuOpen">
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" class="md:hidden">
              <SafeIcon name="Menu" :size="24" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" class="w-64">
            <nav class="flex flex-col space-y-4 mt-8">
              <a
                v-for="link in navLinks"
                :key="link.name"
                :href="link.href"
                class="px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-md transition-colors"
                @click="isMenuOpen = false"
              >
                {{ link.name }}
              </a>
              <div v-if="currentUser && isMounted" class="pt-4 border-t">
                <p class="px-4 py-2 text-sm text-muted-foreground">{{ currentUser }}</p>
                <Button variant="outline" size="sm" class="w-full" @click="handleLogout">
                  <SafeIcon name="LogOut" :size="16" class="mr-2" />
                  退出登录
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
