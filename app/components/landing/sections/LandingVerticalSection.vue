<script setup lang="ts">
interface VerticalButton {
  label: string
  to?: string
  href?: string
  icon?: string
  color?: string
  variant?: string
  size?: string
  target?: string
}

interface VerticalSectionData {
  title: string
  description?: string
  headline?: string
  image?: {
    desktop?: string
    mobile?: string
    alt?: string
  }
  buttons?: VerticalButton[]
  caption?: string
  background?: 'white' | 'gray' | 'dark' | 'gradient' | 'image'
  background_image?: string
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  textAlign?: 'left' | 'center' | 'right'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

interface Props {
  section: VerticalSectionData
  // Props adicionales para theming
  class?: string
  ui?: object
}

const props = defineProps<Props>()

// Usar el composable para procesar markdown inline
const { parseInline } = useMarkdown()

// Procesar el título para renderizar markdown
const processedTitle = computed(() => parseInline(props.section.title))
const processedDescription = computed(() =>
  props.section.description ? parseInline(props.section.description) : ''
)

// Configurar los botones para UPageSection
const sectionLinks = computed(() => {
  return props.section.buttons?.map(button => ({
    label: button.label,
    to: button.to,
    href: button.href,
    icon: button.icon,
    color: button.color || 'primary',
    variant: button.variant || 'solid',
    size: button.size || 'md',
    target: button.target
  })) || []
})

// Merge UI props with external styles
const sectionUI = computed(() => props.ui || {})

// Simple image container class
const imageContainerClass = computed(() => 'hero-image-container')

// Background image style
const backgroundImageStyle = computed(() => {
  if (props.section.background_image) {
    return {
      backgroundImage: `url('${props.section.background_image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }
  return {}
})
</script>

<template>
  <UPageSection
    :headline="section.headline"
    :links="sectionLinks"
    :ui="sectionUI"
    :class="class"
    :style="backgroundImageStyle"
  >
    <!-- Slot para título con HTML e imágenes -->
    <template #title>
      <h1 v-html="processedTitle" />
      <p v-if="section.description" v-html="processedDescription" />

      <!-- Imágenes responsive con caption inmediato -->
      <div v-if="section.image" :class="imageContainerClass">
        <!-- Imagen Desktop -->
        <NuxtImg
          v-if="section.image.desktop"
          :src="section.image.desktop"
          :alt="section.image.alt || section.title"
          class="hidden md:block w-full rounded-lg shadow-xl"
          loading="eager"
          format="webp"
          sizes="(max-width: 768px) 100vw, 896px"
        />

        <!-- Imagen Mobile -->
        <NuxtImg
          v-if="section.image.mobile"
          :src="section.image.mobile"
          :alt="section.image.alt || section.title"
          class="md:hidden block w-full max-w-sm mx-auto rounded-lg shadow-xl"
          loading="eager"
          format="webp"
          sizes="(max-width: 768px) 384px, 100vw"
        />

        <!-- Imagen única (si no hay desktop/mobile separadas) -->
        <NuxtImg
          v-else-if="!section.image.desktop && !section.image.mobile"
          :src="section.image"
          :alt="section.image.alt || section.title"
          class="w-full rounded-lg shadow-xl"
          loading="eager"
          format="webp"
          sizes="(max-width: 768px) 100vw, 896px"
        />

        <!-- Caption opcional dentro del mismo contenedor -->
        <p v-if="section.caption" class="caption">
          <strong>{{ section.caption }}</strong>
        </p>
      </div>
    </template>
  </UPageSection>
</template>

