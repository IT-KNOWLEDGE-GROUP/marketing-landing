// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-gtag'
  ],

  // GitHub Pages deployment configuration
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/marketing-landing/' : '/'
  },

  router: {
    base: process.env.NODE_ENV === 'production' ? '/marketing-landing/' : '/'
  },

  // Disable IPX image optimization for GitHub Pages
  image: {
    provider: 'none'
  },

  devtools: {
    enabled: true
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    css: {
      devSourcemap: true
    },
    build: {
      sourcemap: false
    }
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      routes: [
        '/',
        '/landing/sant-cugat',
        '/landing/phc-sant-cugat'
      ]
    }
  },

  // Google Analytics configuration
  gtag: {
    id: 'G-K082FK3MGR'
  },

  // Additional GitHub Pages optimizations
  ssr: false, // Static site generation

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
