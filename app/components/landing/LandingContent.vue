<script setup lang="ts">
// Definir las interfaces para TypeScript
interface Section {
  type: 'vertical' | 'horizontal' | 'icon-enum' | 'contact' | 'acordeon' | 'footer'
  [key: string]: unknown
}

interface Header {
  logo: string
  partner_logo?: string
  cta_text: string
  cta_link: string
  languages: Array<{
    code: string
    flag: string
    label: string
  }>
}

interface Content {
  header: Header
  sections: Section[]
}

interface Props {
  content: Content
}

const _props = defineProps<Props>()
</script>

<template>
  <div>
    <!-- Header siempre primero, separado -->
    <LandingHeader :header="content.header" />

    <!-- Secciones dinámicas (incluye hero como primera sección) -->
    <LandingSections :sections="content.sections" />
  </div>
</template>
