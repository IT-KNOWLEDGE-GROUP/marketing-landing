<script setup lang="ts">
interface ContactField {
  name: string
  field: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea'
  placeholder?: string
  min?: number
  max?: number
  required: boolean
}

interface ContactButtons {
  submit: string
  phone?: string
}

interface ContactInfo {
  address: string
  phone: string
  email: string
}

interface ContactSectionData {
  title: string
  subtitle?: string
  fields: ContactField[]
  buttons: ContactButtons
  contact_info?: ContactInfo
  id?: string
  webhook_url?: string
  class?: string
}

interface Props {
  contact: ContactSectionData
  class?: string
  ui?: object
}

const props = defineProps<Props>()

// Estado del formulario
const formData = ref<Record<string, string | number | null>>({})
const isSubmitting = ref(false)

// Inicializar form data con campos vacíos
onMounted(() => {
  const initialData: Record<string, string | number | null> = {}
  props.contact.fields.forEach((field) => {
    initialData[field.name] = field.type === 'number' ? null : ''
  })
  formData.value = initialData
})

const getFieldPlaceholder = (field: ContactField) => {
  return field.placeholder || field.label
}

// Handle form submission
const submitForm = async () => {
  isSubmitting.value = true

  try {
    if (props.contact.webhook_url) {
      // Map form data using the 'field' names for webhook
      const webhookData: Record<string, string | number> = {}
      props.contact.fields.forEach((field) => {
        const value = formData.value[field.name]
        if (value !== null && value !== undefined) {
          webhookData[field.field] = value
        }
      })

      const response = await fetch(props.contact.webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookData)
      })

      if (response.ok) {
        // Success - maybe show success message or redirect
        console.log('Form submitted successfully')
        alert('Formulari enviat correctament! Ens posarem en contacte aviat.')

        // Reset form
        const initialData: Record<string, string | number | null> = {}
        props.contact.fields.forEach((field) => {
          initialData[field.name] = field.type === 'number' ? null : ''
        })
        formData.value = initialData
      } else {
        throw new Error('Failed to submit form')
      }
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Error enviant el formulari. Si us plau, torneu-ho a intentar.')
  }

  isSubmitting.value = false
}

// UI props para eliminar padding del UPageSection
const sectionUI = computed(() => ({
  ...props.ui,
  wrapper: 'py-0 px-0',
  container: 'py-0 px-0',
  base: 'py-0',
  inner: 'py-0'
}))
</script>

<template>
  <UPageSection
    :id="contact.id"
    :ui="sectionUI"
    :class="contact.class"
  >
    <template #title>
      <div class="contact-section-container">
        <!-- Título -->
        <div class="contact-header">
          <h2 class="contact-title">
            {{ contact.title }}
          </h2>
        </div>

        <!-- Formulario centrado -->
        <div class="contact-form-container">
          <form
            class="contact-form"
            @submit.prevent="submitForm"
          >
            <!-- Renderizar campos dinámicamente -->
            <template
              v-for="field in contact.fields"
              :key="field.name"
            >
              <!-- Textarea para campos de tipo textarea -->
              <UTextarea
                v-if="field.type === 'textarea'"
                v-model="(formData as any)[field.name]"
                :placeholder="getFieldPlaceholder(field)"
                :required="field.required"
                class="form-textarea"
                :rows="4"
                size="lg"
                variant="outline"
              />
              <!-- Input para otros tipos de campo -->
              <UInput
                v-else
                v-model="(formData as any)[field.name]"
                :type="field.type"
                :placeholder="getFieldPlaceholder(field)"
                :required="field.required"
                :min="field.min"
                :max="field.max"
                class="form-input"
                size="lg"
                variant="outline"
              />
            </template>

            <!-- Botón de envío -->
            <UButton
              type="submit"
              color="primary"
              variant="solid"
              size="xl"
              :loading="isSubmitting"
              class="contact-submit-btn"
              block
            >
              {{ contact.buttons.submit }}
            </UButton>
          </form>
        </div>
      </div>
    </template>
  </UPageSection>
</template>
