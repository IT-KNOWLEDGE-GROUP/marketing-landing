<script setup lang="ts">
interface Language {
  code: string
  flag: string
  label: string
}

interface HeaderData {
  logo: string
  partner_logo?: string
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

// Usar el composable para rutas de assets
const { resolveAssetUrl } = useAssetUrl()

// Computed properties para rutas de imágenes
const logoSrc = computed(() => resolveAssetUrl(props.header.logo))
const partnerLogoSrc = computed(() =>
  props.header.partner_logo ? resolveAssetUrl(props.header.partner_logo) : null
)
const languageFlags = computed(() =>
  props.header.languages.map(lang => ({
    ...lang,
    flagSrc: resolveAssetUrl(lang.flag)
  }))
)

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
  <UHeader :ui="headerUI" :class="['bg-white', 'static', props.class]" to="#">
    <!-- Logo Slot -->
    <template #title>
      <div class="flex items-center gap-4">
        <NuxtImg
          :src="logoSrc"
          alt="Codelearn"
          class="h-8 w-auto"
          loading="eager"
          format="webp"
        />
        <NuxtImg
          v-if="partnerLogoSrc"
          :src="partnerLogoSrc"
          alt="PHC Sant Cugat"
          class="h-8 w-auto"
          loading="eager"
          format="webp"
        />
      </div>
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
          v-for="lang in languageFlags"
          :key="lang.code"
          :src="lang.flagSrc"
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
