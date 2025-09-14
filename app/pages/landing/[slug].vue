<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

// Get the slug from the route
const route = useRoute()
const slug = route.params.slug as string

// Load content from YAML file using Nuxt Content based on slug
const { data: content } = await useAsyncData(`landing-content-${slug}`, async () => {
  const allContent = await queryCollection('landingContent').all()

  if (!allContent || allContent.length === 0) {
    return null
  }

  // Find the content that matches our slug
  const matchedContent = allContent.find((item: any) =>
    item.stem === slug ||
    item.stem === `landing/${slug}` ||
    item._source === `${slug}.yml` ||
    item._source === `landing/${slug}.yml`
  )

  return matchedContent || null
})

// Check if content loaded
if (!content.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Landing content not found for: ${slug}`
  })
}
</script>


<template>
  <div>
    <LandingContent :content="content" />
  </div>
</template>

<style scoped>
@import '~/assets/css/landing/codelearn.css';
</style>
