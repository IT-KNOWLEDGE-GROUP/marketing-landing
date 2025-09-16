// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-gtag'
  ],

  // Additional GitHub Pages optimizations
  ssr: false,
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  devtools: {
    enabled: true
  },

  // GitHub Pages deployment configuration
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/marketing-landing/' : '/'
  },

  css: ['~/assets/css/main.css'],

  router: {
    base: process.env.NODE_ENV === 'production' ? '/marketing-landing/' : '/'
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
    },
    compressPublicAssets: true,
    minify: true
  },

  vite: {
    css: {
      devSourcemap: true
    },
    build: {
      sourcemap: false
    }
  },
  // Static site generation

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // Google Analytics configuration
  gtag: {
    id: 'G-K082FK3MGR'
  },

  // Configure image optimization
  image: {
    domains: ['it-knowledge-group.github.io'],
    format: ['webp', 'png', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
    quality: 80,
    provider: process.env.NODE_ENV === 'production' ? 'static' : 'ipx'
  }
})
