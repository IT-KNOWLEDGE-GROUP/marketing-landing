<script setup lang="ts">
interface IconEnumItem {
  icon: string
  title: string
  content: string
}

interface IconEnumButton {
  label: string
  to?: string
  href?: string
  icon?: string
  color?: string
  variant?: string
  size?: string
  target?: string
}

interface IconEnumSectionData {
  title: string
  subtitle?: string
  description?: string
  items: IconEnumItem[]
  buttons?: IconEnumButton[]
  background?: 'white' | 'gray' | 'dark' | 'gradient'
}

interface Props {
  section: IconEnumSectionData
  class?: string
  ui?: object
}

const props = defineProps<Props>()

// Usar el composable para procesar markdown inline
const { parseInline } = useMarkdown()

// Procesar contenido con markdown
const processedTitle = computed(() => parseInline(props.section.title))
const processedSubtitle = computed(() =>
  props.section.subtitle ? parseInline(props.section.subtitle) : ''
)
const processedDescription = computed(() =>
  props.section.description ? parseInline(props.section.description) : ''
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

// Configurar timeline items para UTimeline
const timelineItems = computed(() => {
  return props.section.items.map(item => ({
    icon: item.icon,
    title: item.title,
    description: item.content,
    color: 'primary' // Verde Codelearn
  }))
})

// UI configuration para timeline compacto
const timelineUI = {
  container: 'space-y-2', // Reducir espacio vertical entre items
  item: 'pb-2', // Reducir padding bottom de cada item
  wrapper: 'mb-2' // Reducir margen bottom del wrapper
}

// Combined class logic
const combinedClass = computed(() => {
  const classes = []
  if (props.class) classes.push(props.class)

  const bg = props.section.background
  if (bg === 'dark') classes.push('dark-text-section')
  else if (bg === 'gray') classes.push('gray-text-section')
  else if (bg === 'gradient') classes.push('gradient-text-section')

  return classes.join(' ')
})
</script>

<template>
  <UPageSection
    :links="sectionLinks"
    :ui="sectionUI"
    :class="combinedClass"
  >
    <template #title>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <!-- Contenido de texto (izquierda) -->
        <div class="benefits-text-content">
          <!-- Título principal -->
          <h2
            class="benefits-main-title"
            v-html="processedTitle"
          />

          <!-- Subtítulo -->
          <h3
            v-if="section.subtitle"
            class="benefits-subtitle"
            v-html="processedSubtitle"
          />

          <!-- Descripción adicional -->
          <p
            v-if="section.description"
            class="benefits-description"
            v-html="processedDescription"
          />
        </div>

        <!-- Timeline de beneficios (derecha) -->
        <div class="benefits-timeline-container">
          <UTimeline
            :items="timelineItems"
            :ui="timelineUI"
          />
        </div>
      </div>
    </template>
  </UPageSection>
</template>
