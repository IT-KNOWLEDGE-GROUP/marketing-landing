import { defineCollection, z } from '@nuxt/content'

const createEnum = (options: [string, ...string[]]) => z.enum(options)

const createBaseSchema = () => z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty()
})

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  size: createEnum(['xs', 'sm', 'md', 'lg', 'xl']),
  trailing: z.boolean().optional(),
  target: createEnum(['_blank', '_self']),
  color: createEnum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info']),
  variant: createEnum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
})

const createFeatureSchema = () => createBaseSchema().extend({
  icon: z.string().editor({ input: 'icon' }),
  ui: z.object({
    leading: z.string().optional()
  }).editor({ hidden: true })
})

// Schema for landing page sections
const createSectionButtonSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().optional(),
  href: z.string().optional(),
  color: z.string().optional(),
  variant: z.string().optional(),
  size: z.string().optional(),
  icon: z.string().optional(),
  target: z.string().optional()
})

const createImageSchema = () => z.object({
  src: z.string().optional(),
  desktop: z.string().optional(),
  mobile: z.string().optional(),
  alt: z.string().optional()
})

const createContactFieldSchema = () => z.object({
  name: z.string().nonempty(),
  label: z.string().nonempty(),
  type: createEnum(['text', 'email', 'tel', 'number', 'textarea']),
  placeholder: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  required: z.boolean()
})

const createLandingSectionSchema = () => z.object({
  type: createEnum(['vertical', 'horizontal', 'icon-enum', 'contact', 'acordeon', 'footer']),
  class: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  headline: z.string().optional(),
  content: z.string().optional(),
  subtitle: z.string().optional(),
  caption: z.string().optional(),
  footer: z.string().optional(),
  background: z.string().optional(),
  background_image: z.string().optional(),
  textAlign: z.string().optional(),
  layout: z.string().optional(),
  image: createImageSchema().optional(),
  buttons: z.array(createSectionButtonSchema()).optional(),
  bullets: z.array(z.string()).optional(),
  // For icon-enum sections
  items: z.array(z.object({
    icon: z.string().optional(),
    title: z.string().nonempty(),
    content: z.string().nonempty(),
    // For acordeon sections
    question: z.string().optional(),
    answer: z.string().optional()
  })).optional(),
  // For contact sections
  fields: z.array(createContactFieldSchema()).optional(),
  contact_info: z.object({
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional()
  }).optional()
})

export const collections = {
  'landingContent': defineCollection({
    source: 'landing/*.yml',
    type: 'page',
    schema: z.object({
      // Landing page schema
      seo: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty()
      }).optional(),
      header: z.object({
        logo: z.string().optional(),
        cta_text: z.string().optional(),
        cta_link: z.string().optional(),
        languages: z.array(z.object({
          code: z.string().nonempty(),
          flag: z.string().optional(),
          label: z.string().nonempty()
        })).optional()
      }).optional(),
      sections: z.array(createLandingSectionSchema()).optional(),
      final_cta: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        buttons: z.array(z.object({
          text: z.string().nonempty(),
          link: z.string().nonempty(),
          style: z.string().optional(),
          target: z.string().optional()
        })).optional()
      }).optional()
    })
  }),

  // Legacy content collection
  content: defineCollection({
    source: '*.yml',
    type: 'page',
    schema: z.object({
      // Legacy schemas (keep for backward compatibility)
      hero: z.object({
        links: z.array(createLinkSchema())
      }).optional(),
      section: createBaseSchema().extend({
        headline: z.string().optional(),
        images: z.object({
          mobile: z.string().optional(),
          desktop: z.string().optional()
        }).optional(),
        features: z.array(
          createBaseSchema().extend({
            icon: z.string().editor({ input: 'icon' }).optional(),
            class: z.string().optional()
          })
        ).optional()
      }).optional(),
      features: createBaseSchema().extend({
        features: z.array(createFeatureSchema())
      }).optional(),
      steps: createBaseSchema().extend({
        items: z.array(createFeatureSchema().extend({
          image: z.object({
            light: z.string().editor({ input: 'media' }),
            dark: z.string().editor({ input: 'media' })
          }).optional()
        }))
      }).optional(),
      pricing: createBaseSchema().extend({
        plans: z.array(
          createBaseSchema().extend({
            price: z.string().nonempty(),
            button: createLinkSchema(),
            features: z.array(z.string().nonempty()),
            highlight: z.boolean().optional(),
            billing_period: z.string().optional(),
            billing_cycle: z.string().optional()
          })
        )
      }).optional(),
      testimonials: createBaseSchema().extend({
        items: z.array(
          z.object({
            quote: z.string().nonempty(),
            user: z.object({
              name: z.string().nonempty(),
              description: z.string().nonempty(),
              to: z.string().optional(),
              avatar: z.object({
                src: z.string().editor({ input: 'media' }),
                alt: z.string().optional()
              }),
              target: createEnum(['_blank', '_self']).optional()
            })
          }))
      }).optional(),
      cta: createBaseSchema().extend({
        links: z.array(createLinkSchema())
      }).optional()
    })
  })
}
