
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SafeIcon from '@/components/common/SafeIcon.vue'
import AdminDashboardStats from '@/components/admin-dashboard/AdminDashboardStats.vue'
import AdminDashboardModules from '@/components/admin-dashboard/AdminDashboardModules.vue'
import AdminDashboardAnnouncements from '@/components/admin-dashboard/AdminDashboardAnnouncements.vue'

const currentTime = ref('2025-11-24 11:30')
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <!-- Header Section -->
    <div class="border-b border-border bg-card">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-foreground">管理台主页</h1>
            <p class="text-sm text-muted-foreground mt-1">
              欢迎回来，管理员。当前时间：{{ currentTime }}
            </p>
          </div>
          <Button variant="outline" size="sm" as="a" href="./homepage.html">
            <SafeIcon name="Home" :size="16" class="mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-4 py-8">
      <!-- Statistics Section -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-foreground mb-4">关键指标</h2>
        <AdminDashboardStats />
      </div>

      <!-- Modules Section -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-foreground mb-4">管理模块</h2>
        <AdminDashboardModules />
      </div>

      <!-- Announcements Section -->
      <div>
        <h2 class="text-xl font-semibold text-foreground mb-4">系统公告</h2>
        <AdminDashboardAnnouncements />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
