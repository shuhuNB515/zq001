
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SafeIcon from '@/components/common/SafeIcon.vue'
import ServiceRulesEditor from '@/components/admin-settings/ServiceRulesEditor.vue'
import AnnouncementManager from '@/components/admin-settings/AnnouncementManager.vue'

const activeTab = ref('rules')

const handleNavigateBack = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './admin-dashboard.html'
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="border-b border-border bg-card p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            @click="handleNavigateBack"
            class="hover:bg-accent"
          >
            <SafeIcon name="ArrowLeft" :size="24" />
          </Button>
          <div>
            <h1 class="text-3xl font-bold text-foreground">基础设置</h1>
            <p class="text-sm text-muted-foreground mt-1">管理服务规则和系统公告</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto p-6">
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="rules" class="flex items-center">
            <SafeIcon name="Settings" :size="18" class="mr-2" />
            服务规则
          </TabsTrigger>
          <TabsTrigger value="announcements" class="flex items-center">
            <SafeIcon name="Megaphone" :size="18" class="mr-2" />
            系统公告
          </TabsTrigger>
        </TabsList>

        <!-- Service Rules Tab -->
        <TabsContent value="rules" class="mt-6">
          <ServiceRulesEditor />
        </TabsContent>

        <!-- Announcements Tab -->
        <TabsContent value="announcements" class="mt-6">
          <AnnouncementManager />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
