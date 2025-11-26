
<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AdminSidebar from '@/components/common/AdminSidebar.vue'

interface Props {
  headerHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
  headerHeight: '80px'
})
</script>

<template>
  <SidebarProvider 
    :style="{
      '--header-height': headerHeight
    }"
  >
    <AdminSidebar />
    <SidebarInset class="flex flex-col min-h-[calc(100vh-var(--header-height))]">
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
