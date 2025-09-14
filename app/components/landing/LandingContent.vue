<script setup lang="ts">
// Definir las interfaces para TypeScript
interface Section {
  type: 'vertical' | 'horizontal' | 'icon-enum' | 'contact' | 'acordeon' | 'footer'
  [key: string]: any
}

interface Content {
  header: any
  sections: Section[]
}

interface Props {
  content: Content
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <!-- Header siempre primero, separado -->
    <LandingHeader :header="content.header" />

    <!-- Secciones dinámicas (incluye hero como primera sección) -->
    <LandingSections :sections="content.sections" />
  </div>
</template>