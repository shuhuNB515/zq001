
<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CLIENT_LOGIN_IMAGE } from '@/data/client_data'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const activeTab = ref('login')

const handleLoginSuccess = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './homepage.html'
  }
}

const handleRegisterSuccess = () => {
  if (typeof window !== 'undefined') {
    window.location.href = './homepage.html'
  }
}
</script>

<template>
  <div class="flex h-[calc(100vh-80px)] bg-background">
    <!-- Left Side - Brand & Image -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-accent/10 flex-col justify-center items-center p-12">
      <div class="max-w-md text-center space-y-6">
        <div class="flex justify-center">
          <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <img src="/src/assets/png/智取未来.png" alt="智取未来" class="w-full h-full rounded-xl object-cover">
          </div>
        </div>
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            智取未来
          </h1>
          <p class="text-lg text-muted-foreground">
            智能物流解决方案
          </p>
        </div>
        <p class="text-muted-foreground leading-relaxed">
          通过人脸识别、RFID定位和智能机器人，为您提供快速、安全、便捷的快件取寄服务。
        </p>
        <div class="pt-6">
          <img 
            :src="CLIENT_LOGIN_IMAGE.url" 
            alt="智能物流系统" 
            class="w-full rounded-lg shadow-lg object-cover h-64"
          />
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
      <div class="w-full max-w-md">
        <!-- Mobile Brand -->
        <div class="lg:hidden mb-8 text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            智取未来
          </h1>
        </div>

        <!-- Tabs -->
        <Tabs v-model="activeTab" class="w-full">
          <TabsList class="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="register">注册</TabsTrigger>
          </TabsList>

          <!-- Login Tab -->
          <TabsContent value="login" class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-foreground mb-2">欢迎回来</h2>
              <p class="text-muted-foreground">登录您的账户以继续</p>
            </div>
            <LoginForm @success="handleLoginSuccess" />
          </TabsContent>

          <!-- Register Tab -->
          <TabsContent value="register" class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-foreground mb-2">创建账户</h2>
              <p class="text-muted-foreground">注册新账户以开始使用服务</p>
            </div>
            <RegisterForm @success="handleRegisterSuccess" />
          </TabsContent>
        </Tabs>

        <!-- Footer Links -->
        <div class="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground space-y-2">
          <p>
            <a href="./homepage.html" class="text-primary hover:underline">返回首页</a>
          </p>
          <p class="text-xs">
            © 2025 智取未来 版权所有
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
