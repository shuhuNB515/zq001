
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import SafeIcon from '@/components/common/SafeIcon.vue'

const faqs = [
  {
    question: '寄件需要提前预约吗？',
    answer: '是的，我们建议您提前在线预约寄件。这样可以确保我们的工作人员能够及时为您服务，并且可以根据您的时间安排进行上门取件。'
  },
  {
    question: '人脸核验是否安全？',
    answer: '完全安全。我们采用业界领先的人脸识别技术，所有个人信息都经过加密处理，严格遵守数据保护法规。您的隐私是我们的首要关注。'
  },
  {
    question: '可以寄送哪些物品？',
    answer: '我们可以寄送大多数常见物品，包括文件、小件商品、衣物等。但禁止寄送危险品、易碎品（需特殊包装）、贵重物品等。详细清单请咨询客服。'
  },
  {
    question: '寄件码有效期是多久？',
    answer: '寄件码自生成之日起24小时内有效。请在有效期内完成寄件，过期后需要重新预约。'
  },
  {
    question: '如何查询寄件进度？',
    answer: '您可以在我们的应用中使用寄件单号或手机号查询快件实时状态。我们会在快件的每个关键环节向您发送通知。'
  },
  {
    question: '寄件价格如何计算？',
    answer: '寄件价格根据快递类型、重量和目的地距离综合计算。在填写寄件信息时，系统会为您显示详细的价格明细。'
  },
  {
    question: '支持哪些支付方式？',
    answer: '我们支持多种支付方式，包括支付宝、微信支付、银行卡等。您可以在预约时选择最方便的支付方式。'
  },
  {
    question: '如果快件丢失怎么办？',
    answer: '我们对所有快件都有保险覆盖。如果快件丢失，请立即联系我们的客服团队，我们会为您进行赔偿处理。'
  }
]
</script>

<template>
  <section class="py-16 md:py-24 bg-card border-t border-border">
    <div class="container mx-auto px-4">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          常见问题
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          关于寄件服务的常见问题解答
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-3xl mx-auto">
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem 
            v-for="(faq, index) in faqs"
            :key="index"
            :value="`item-${index}`"
            class="border-b border-border last:border-b-0"
          >
            <AccordionTrigger class="hover:no-underline py-4 px-2 md:px-4">
              <div class="flex items-start space-x-3 text-left">
                <SafeIcon name="HelpCircle" :size="20" class="text-primary flex-shrink-0 mt-1" />
                <span class="font-semibold text-lg">{{ faq.question }}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent class="px-2 md:px-4 pb-4">
              <p class="text-muted-foreground leading-relaxed ml-8">
                {{ faq.answer }}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <!-- Contact Support -->
      <div class="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center border border-primary/20">
        <h3 class="text-2xl font-bold mb-2">还有其他问题？</h3>
        <p class="text-muted-foreground mb-6">
          我们的客服团队随时准备为您服务
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="tel:400-123-4567"
            class="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <SafeIcon name="Phone" :size="18" class="mr-2" />
            拨打客服热线
          </a>
          <a 
            href="mailto:service@zhiquweilai.com"
            class="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-semibold"
          >
            <SafeIcon name="Mail" :size="18" class="mr-2" />
            发送邮件
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
