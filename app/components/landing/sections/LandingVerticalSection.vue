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
  isHero?: boolean
}

const props = defineProps<Props>()

// Usar los composables necesarios
const { parseInline } = useMarkdown()
const { resolveAssetUrl } = useAssetUrl()

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

// Background image style and press section gray background
const backgroundImageStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.section.background_image) {
    styles.backgroundImage = `url('${resolveAssetUrl(props.section.background_image)}')`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
    styles.backgroundRepeat = 'no-repeat'
  }

  // Force gray background for press sections via inline style
  if (props.class?.includes('press-section')) {
    styles.backgroundColor = '#e5e7eb' // Darker gray so you can clearly see it
    styles.background = '#e5e7eb'
  }

  return styles
})

// Computed properties para rutas de imágenes
const desktopImageSrc = computed(() =>
  props.section.image?.desktop ? resolveAssetUrl(props.section.image.desktop) : ''
)

const mobileImageSrc = computed(() =>
  props.section.image?.mobile ? resolveAssetUrl(props.section.image.mobile) : ''
)

const singleImageSrc = computed(() =>
  props.section.image && typeof props.section.image === 'string'
    ? resolveAssetUrl(props.section.image)
    : ''
)

// Combined class logic for background support
const combinedClass = computed(() => {
  const classes = []
  if (props.class) classes.push(props.class)

  // Don't apply dark-text-section to hero sections - they have their own styles
  const isHeroSection = props.class?.includes('hero-section')

  const bg = props.section.background
  if (bg === 'dark' && !isHeroSection) classes.push('dark-text-section')
  else if (bg === 'gray') classes.push('gray-text-section')
  else if (bg === 'gradient') classes.push('gradient-text-section')

  return classes.join(' ')
})
</script>

<template>
  <UPageSection
    :headline="section.headline"
    :links="sectionLinks"
    :ui="sectionUI"
    :class="combinedClass"
    :style="backgroundImageStyle"
  >
    <!-- Slot para título con HTML e imágenes -->
    <template #title>
      <h1 v-html="processedTitle" />
      <p
        v-if="section.description"
        v-html="processedDescription"
      />

      <!-- Imágenes responsive con caption inmediato -->
      <div
        v-if="section.image"
        :class="imageContainerClass"
      >
        <!-- Imagen Desktop -->
        <NuxtImg
          v-if="desktopImageSrc"
          :src="desktopImageSrc"
          :alt="section.image.alt || section.title"
          class="hidden md:block w-full rounded-lg shadow-xl"
          loading="eager"
          format="webp"
          sizes="(max-width: 768px) 100vw, 896px"
          :fetchpriority="isHero || props.class?.includes('hero-section') ? 'high' : undefined"
        />

        <!-- Imagen Mobile -->
        <NuxtImg
          v-if="mobileImageSrc"
          :src="mobileImageSrc"
          :alt="section.image.alt || section.title"
          class="md:hidden block w-full max-w-sm mx-auto rounded-lg shadow-xl"
          loading="eager"
          format="webp"
          sizes="(max-width: 768px) 384px, 100vw"
          :fetchpriority="isHero || props.class?.includes('hero-section') ? 'high' : undefined"
        />

        <!-- Imagen única (si no hay desktop/mobile separadas) -->
        <NuxtImg
          v-else-if="singleImageSrc"
          :src="singleImageSrc"
          :alt="section.image.alt || section.title"
          class="w-full rounded-lg shadow-xl"
          loading="eager"
          format="webp"
          sizes="(max-width: 768px) 100vw, 896px"
        />

        <!-- Caption opcional dentro del mismo contenedor -->
        <p
          v-if="section.caption"
          class="caption"
        >
          <strong>{{ section.caption }}</strong>
        </p>
      </div>
    </template>
  </UPageSection>
</template>
