<template>
  <section
    class="relative isolate landing-acordeon-section"
    :class="section.class"
    :style="getSectionStyle()"
  >
    <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
      <!-- Title -->
      <div class="text-center mb-12" v-if="section.title || section.subtitle || section.description">
        <h3 v-if="section.subtitle" class="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
          {{ section.subtitle }}
        </h3>
        <h2
          v-if="section.title"
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-highlighted mb-6"
          v-html="section.title"
        />
        <p
          v-if="section.description"
          class="text-lg text-muted max-w-3xl mx-auto"
          v-html="section.description"
        />
      </div>

      <!-- Accordion -->
      <div class="max-w-4xl mx-auto">
        <UAccordion :items="accordionItems" variant="outline" size="lg">
          <template #default="{ item, index, open }">
            <UButton
              :color="open ? 'primary' : 'gray'"
              variant="ghost"
              class="w-full p-6 text-left justify-between font-semibold text-base hover:bg-gray-50"
            >
              <span class="text-left" v-html="item.label" />
              <UIcon
                :name="open ? 'i-lucide-minus' : 'i-lucide-plus'"
                class="w-5 h-5 flex-shrink-0 ml-4"
              />
            </UButton>
          </template>

          <template #item="{ item }">
            <div class="px-6 pb-6 pt-4 border-t border-gray-100">
              <div
                class="text-gray-600 text-base leading-relaxed"
                v-html="item.content"
              />
            </div>
          </template>
        </UAccordion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface AcordeonItem {
  question: string
  answer: string
}

interface Section {
  class?: string
  title?: string
  subtitle?: string
  description?: string
  background?: string
  background_image?: string
  textAlign?: string
  items?: AcordeonItem[]
}

interface Props {
  section: Section
}

const props = defineProps<Props>()

const getSectionStyle = () => {
  let styles: any = {}

  if (props.section.background_image) {
    styles.backgroundImage = `url('${props.section.background_image}')`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
    styles.backgroundRepeat = 'no-repeat'
  }

  return styles
}

// Transform section items into UAcordion format
const accordionItems = computed(() => {
  if (!props.section.items) return []

  return props.section.items.map((item) => ({
    label: item.question,
    content: item.answer,
    defaultOpen: false
  }))
})
</script>

<style scoped>
.landing-acordeon-section {
  background-color: var(--ui-bg-elevated);
}

/* Dark background sections */
.landing-acordeon-section[data-background="dark"] {
  background-color: var(--ui-bg-inverted);
  color: var(--ui-text-inverted);
}

/* Ensure proper styling for different backgrounds */
.landing-acordeon-section .text-highlighted {
  color: var(--ui-text-highlighted);
}

.landing-acordeon-section .text-muted {
  color: var(--ui-text-muted);
}
</style>