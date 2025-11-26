
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon.vue'
</script>

<template>
  <section class="w-full py-16 md:py-24 bg-card border-y border-border">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">选择您的身份</h2>
        <p class="text-lg text-muted-foreground">
          请选择客户端或管理端登录，开始使用智取未来服务
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Client Login Card -->
        <div class="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10 space-y-6">
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
<SafeIcon name="User" :size="32" color="white" :stroke-width="2" />
            </div>

            <div class="space-y-2">
              <h3 class="text-2xl font-bold text-foreground">客户端</h3>
              <p class="text-muted-foreground">
                用户登录，享受取件、寄件、查询等服务
              </p>
            </div>

            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-center space-x-2">
                <SafeIcon name="Check" :size="16" class="text-accent flex-shrink-0" />
                <span>刷脸/取件码/手机号取件</span>
              </li>
              <li class="flex items-center space-x-2">
                <SafeIcon name="Check" :size="16" class="text-accent flex-shrink-0" />
                <span>在线预约寄件</span>
              </li>
              <li class="flex items-center space-x-2">
                <SafeIcon name="Check" :size="16" class="text-accent flex-shrink-0" />
                <span>实时快件查询</span>
              </li>
            </ul>

            <Button 
              asChild 
              size="lg" 
              class="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <a href="./client-login-register.html">
                <SafeIcon name="LogIn" :size="18" class="mr-2" />
                客户端登录
              </a>
            </Button>
          </div>
        </div>

        <!-- Admin Login Card -->
        <div class="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10 space-y-6">
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
              <SafeIcon name="Shield" :size="32" color="white" :stroke-width="2" />
            </div>

            <div class="space-y-2">
              <h3 class="text-2xl font-bold text-foreground">管理端</h3>
              <p class="text-muted-foreground">
                管理员登录，管理快件、设备和用户
              </p>
            </div>

            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-center space-x-2">
                <SafeIcon name="Check" :size="16" class="text-primary flex-shrink-0" />
                <span>快件入库/出库管理</span>
              </li>
              <li class="flex items-center space-x-2">
                <SafeIcon name="Check" :size="16" class="text-primary flex-shrink-0" />
                <span>设备实时监控</span>
              </li>
              <li class="flex items-center space-x-2">
                <SafeIcon name="Check" :size="16" class="text-primary flex-shrink-0" />
                <span>用户数据统计</span>
              </li>
            </ul>

            <Button 
              asChild 
              size="lg" 
              class="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90"
            >
              <a href="./admin-login.html">
                <SafeIcon name="LogIn" :size="18" class="mr-2" />
                管理端登录
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
