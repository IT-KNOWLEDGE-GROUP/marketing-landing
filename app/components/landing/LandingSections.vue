<script setup lang="ts">
// Definir las interfaces para TypeScript
interface Section {
  type: 'vertical' | 'horizontal' | 'icon-enum' | 'contact' | 'acordeon' | 'footer'
  class?: string
  [key: string]: unknown
}

interface Props {
  sections: Section[]
}

const _props = defineProps<Props>()

// Mapeo directo de tipos a componentes
const componentMap = {
  'vertical': resolveComponent('LandingVerticalSection'),
  'horizontal': resolveComponent('LandingHorizontalSection'),
  'icon-enum': resolveComponent('LandingIconEnumSection'),
  'contact': resolveComponent('LandingContactSection'),
  'acordeon': resolveComponent('LandingAcordeonSection'),
  'footer': resolveComponent('LandingFooter')
}

// Función para obtener las props correctas según el tipo
const getSectionProps = (section: Section) => {
  if (section.type === 'contact') {
    return { contact: section }
  } else if (section.type === 'footer') {
    return { footer: section }
  }
  return { section: section }
}

// Función simple para obtener la clase CSS basada en el campo class de la sección
const getSectionClass = (section: Section) => {
  return section.class || ''
}
</script>

<template>
  <div>
    <!-- Secciones dinámicas -->
    <component
      :is="componentMap[section.type]"
      v-for="(section, index) in sections"
      :key="index"
      v-bind="getSectionProps(section)"
      :class="getSectionClass(section)"
    />
  </div>
</template>
