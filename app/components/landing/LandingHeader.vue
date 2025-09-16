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
  // Configuración específica para el panel móvil
  panel: {
    background: 'bg-white',
    base: 'bg-white',
    divide: 'divide-gray-200',
    padding: 'p-4',
    body: 'bg-white'
  },
  ...props.ui
}))
</script>

<template>
  <UHeader
    :ui="headerUI"
    :class="['bg-white', 'static', props.class]"
    to="#"
    :links="[
      { label: 'Inici', to: '#inici' },
      { label: 'El teu gimnàs', to: '#el-teu-gimnas' },
      { label: 'Pensament computacional', to: '#pensament-computacional' },
      { label: 'Contacte', to: '#contacto' },
      { label: 'Preguntes', to: '#preguntes' }
    ]"
  >
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
      <!-- CTA Button - hidden on mobile, shown in panel -->
      <UButton
        :to="header.cta_link"
        color="primary"
        variant="solid"
        size="sm"
        class="hidden lg:flex"
      >
        {{ header.cta_text }}
      </UButton>

      <!-- Language Flags - hidden on mobile -->
      <div class="hidden lg:flex items-center gap-2">
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

<style scoped>
/* Estilos para el menú móvil del UHeader */
:deep([data-headlessui-state="open"]) {
  background-color: white !important;
}

:deep(.fixed.inset-0) {
  background-color: rgba(255, 255, 255, 0.9) !important;
}

:deep(.relative.h-full) {
  background-color: white !important;
}

:deep(.bg-white) {
  background-color: white !important;
}

/* Panel específico del UHeader */
:deep(.absolute.right-0) {
  background-color: white !important;
}

:deep(.w-screen.max-w-sm) {
  background-color: white !important;
}

/* Enlaces del menú */
:deep(.divide-y a) {
  color: #374151 !important;
  font-weight: 500 !important;
  background-color: transparent !important;
}

:deep(.divide-y a:hover) {
  background-color: #f9fafb !important;
  color: #8BE63A !important;
}

/* Forzar fondo blanco en todos los elementos del panel */
:deep(.relative.flex.h-full.flex-col) {
  background-color: white !important;
}

:deep(.flex-1.overflow-y-auto) {
  background-color: white !important;
}
</style>
