<script setup lang="ts">
interface Language {
  code: string
  flag: string
  label: string
}

interface HeaderData {
  logo: string
  cta_text: string
  cta_link: string
  languages: Language[]
}

interface Props {
  header: HeaderData
  // Props adicionales para theming
  ui?: object
  class?: string
}

const props = defineProps<Props>()

// Configuración de UI personalizada para el header
const headerUI = computed(() => ({
  // Forzar fondo blanco puro y posición normal
  background: 'bg-white',
  border: 'border-[var(--landing-border-default)]',
  text: 'text-[var(--ui-text-primary)]',
  wrapper: 'relative', // Quitar sticky positioning
  ...props.ui
}))
</script>

<template>
  <UHeader :ui="headerUI" :class="['bg-white', 'static', props.class]">
    <!-- Logo Slot -->
    <template #title>
      <NuxtImg
        :src="header.logo"
        alt="Codelearn"
        class="h-8 w-auto"
        loading="eager"
        format="webp"
      />
    </template>

    <!-- Right side actions -->
    <template #right>
      <!-- CTA Button -->
      <UButton
        :to="header.cta_link"
        color="primary"
        variant="solid"
        size="sm"
      >
        {{ header.cta_text }}
      </UButton>

      <!-- Language Flags -->
      <div class="flex items-center gap-2">
        <NuxtImg
          v-for="lang in header.languages"
          :key="lang.code"
          :src="lang.flag"
          :alt="lang.label"
          :title="lang.label"
          class="h-5 w-5 rounded-sm cursor-pointer hover:scale-110 transition-transform"
          loading="lazy"
          format="webp"
        />
      </div>
    </template>
  </UHeader>
</template>
