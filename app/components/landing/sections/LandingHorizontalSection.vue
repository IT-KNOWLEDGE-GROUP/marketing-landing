<script setup lang="ts">
interface HorizontalButton {
  label: string
  to?: string
  href?: string
  icon?: string
  color?: string
  variant?: string
  size?: string
  target?: string
}

interface HorizontalSectionData {
  title: string
  description?: string
  content?: string
  headline?: string
  image?: {
    src?: string
    alt?: string
  }
  bullets?: string[]
  footer?: string
  buttons?: HorizontalButton[]
  layout?: 'image-left' | 'image-right'
  background?: 'white' | 'gray' | 'dark' | 'gradient'
}

interface Props {
  section: HorizontalSectionData
  class?: string
  ui?: object
}

const props = defineProps<Props>()

// Usar los composables necesarios
const { parseInline } = useMarkdown()
const { resolveAssetUrl } = useAssetUrl()

// Procesar contenido con markdown
const processedTitle = computed(() => parseInline(props.section.title))
const processedDescription = computed(() =>
  props.section.description ? parseInline(props.section.description) : ''
)
const processedContent = computed(() =>
  props.section.content ? parseInline(props.section.content) : ''
)
const processedFooter = computed(() =>
  props.section.footer ? parseInline(props.section.footer) : ''
)

// Configurar los botones
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

// UI props
const sectionUI = computed(() => props.ui || {})

// Determinar el layout
const isImageLeft = computed(() => props.section.layout === 'image-left')

// Computed property para ruta de imagen
const imageSrc = computed(() =>
  props.section.image?.src ? resolveAssetUrl(props.section.image.src) : ''
)
</script>

<template>
  <UPageSection
    :ui="sectionUI"
    :class="class"
  >
    <template #title>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Imagen (orden cambia según layout) -->
        <div
          v-if="section.image"
          :class="[
            'horizontal-image-container',
            isImageLeft ? 'lg:order-1' : 'lg:order-2'
          ]"
        >
          <NuxtImg
            :src="imageSrc"
            :alt="section.image.alt || section.title"
            class="w-full rounded-lg shadow-lg"
            loading="lazy"
            format="webp"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        <!-- Contenido de texto -->
        <div
          :class="[
            'horizontal-text-content',
            isImageLeft ? 'lg:order-2' : 'lg:order-1'
          ]"
        >
          <!-- Headline -->
          <p
            v-if="section.headline"
            class="horizontal-headline"
          >
            {{ section.headline }}
          </p>

          <!-- Título -->
          <h2
            class="horizontal-title"
            v-html="processedTitle"
          />

          <!-- Descripción -->
          <p
            v-if="section.description"
            class="horizontal-description"
            v-html="processedDescription"
          />

          <!-- Contenido principal -->
          <p
            v-if="section.content"
            class="horizontal-content"
            v-html="processedContent"
          />

          <!-- Lista de bullets -->
          <ul
            v-if="section.bullets && section.bullets.length"
            class="horizontal-bullets"
          >
            <li
              v-for="(bullet, index) in section.bullets"
              :key="index"
              class="horizontal-bullet-item"
            >
              {{ bullet }}
            </li>
          </ul>

          <!-- Footer text -->
          <p
            v-if="section.footer"
            class="horizontal-footer"
            v-html="processedFooter"
          />

          <!-- Botones -->
          <div
            v-if="sectionLinks && sectionLinks.length"
            class="horizontal-buttons"
          >
            <UButton
              v-for="(link, index) in sectionLinks"
              :key="index"
              :to="link.to"
              :href="link.href"
              :color="link.color"
              :variant="link.variant"
              :size="link.size"
              :icon="link.icon"
              :target="link.target"
            >
              {{ link.label }}
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
