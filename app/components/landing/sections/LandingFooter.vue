<template>
  <footer class="landing-footer bg-primary text-white py-4">
    <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-8">
        <!-- Address -->
        <div class="flex items-center gap-2" v-if="footer.address">
          <UIcon name="i-lucide-map-pin" class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm font-medium">{{ footer.address }}</span>
        </div>

        <!-- Phone -->
        <div class="flex items-center gap-2" v-if="footer.phone">
          <UIcon name="i-lucide-phone" class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm font-medium">Tlf. {{ footer.phone }}</span>
        </div>

        <!-- Email -->
        <div class="flex items-center gap-2" v-if="footer.email">
          <UIcon name="i-lucide-mail" class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm font-medium">{{ footer.email }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterData {
  address?: string
  phone?: string
  email?: string
}

interface Props {
  footer: FooterData
}

const props = defineProps<Props>()
</script>

<style scoped>
.landing-footer {
  background-color: #8BE63A; /* Verde similar a la imagen */
}

.landing-footer .text-white {
  color: #1a1a1a; /* Texto oscuro para mejor contraste sobre verde */
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .landing-footer {
    text-align: center;
  }
}
</style>