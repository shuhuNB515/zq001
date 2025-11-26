
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import SafeIcon from '@/components/common/SafeIcon.vue'
import { Button } from '@/components/ui/button'

const currentPath = ref('')

onMounted(() => {
  if (typeof window !== 'undefined') {
    currentPath.value = window.location.pathname
  }
})

const menuItems = [
  {
    title: '概览',
    items: [
      { name: '管理台主页', href: './admin-dashboard.html', icon: 'LayoutDashboard' },
    ]
  },
  {
    title: '核心功能',
    items: [
      { name: '快件管理', href: './admin-package-management.html', icon: 'Package' },
      { name: '设备监控', href: './admin-device-monitoring.html', icon: 'Monitor' },
      { name: '用户管理', href: './admin-user-management.html', icon: 'Users' },
      { name: '基础设置', href: './admin-settings.html', icon: 'Settings' },
    ]
  }
]

const handleLogout = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './homepage.html'
  }
}
</script>

<template>
  <Sidebar 
    class="top-[--header-height] h-[calc(100vh-var(--header-height))]" 
    variant="inset"
  >
    <SidebarHeader class="border-b border-sidebar-border p-4">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <SafeIcon name="Shield" :size="18" color="white" />
        </div>
        <span class="font-semibold text-sidebar-foreground">管理后台</span>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup v-for="group in menuItems" :key="group.title">
        <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.name">
              <SidebarMenuButton 
                as-child
                :is-active="currentPath.includes(item.href.replace('.html', ''))"
              >
                <a :href="item.href" class="flex items-center">
                  <SafeIcon :name="item.icon" :size="18" class="mr-2" />
                  <span>{{ item.name }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter class="border-t border-sidebar-border p-4">
      <Button 
        variant="ghost" 
        class="w-full justify-start" 
        @click="handleLogout"
      >
        <SafeIcon name="LogOut" :size="18" class="mr-2" />
        退出登录
      </Button>
    </SidebarFooter>
  </Sidebar>
</template>
