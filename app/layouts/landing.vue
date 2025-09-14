<template>
  <div class="landing-layout">
    <slot />
  </div>
</template>

<style scoped>
.landing-layout {
  min-height: 100vh;
  /* Remove any default margins/paddings that might be inherited */
  margin: 0;
  padding: 0;
}
</style>
