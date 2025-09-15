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
}

interface Props {
  contact: ContactSectionData
  class?: string
  ui?: object
}

const props = defineProps<Props>()

// Estado del formulario
const formData = ref({})
const isSubmitting = ref(false)

// Inicializar form data con campos vacíos
onMounted(() => {
  const initialData: Record<string, any> = {}
  props.contact.fields.forEach(field => {
    initialData[field.name] = field.type === 'number' ? null : ''
  })
  formData.value = initialData
})

const getFieldLabel = (field: ContactField) => {
  return field.label
}

const getFieldPlaceholder = (field: ContactField) => {
  return field.placeholder || field.label
}

// Handle form submission
const submitForm = async () => {
  isSubmitting.value = true

  try {
    if (props.contact.webhook_url) {
      // Map form data using the 'field' names for webhook
      const webhookData: Record<string, any> = {}
      props.contact.fields.forEach(field => {
        webhookData[field.field] = formData.value[field.name]
      })

      const response = await fetch(props.contact.webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      })

      if (response.ok) {
        // Success - maybe show success message or redirect
        console.log('Form submitted successfully')
        alert('Formulari enviat correctament! Ens posarem en contacte aviat.')

        // Reset form
        const initialData: Record<string, any> = {}
        props.contact.fields.forEach(field => {
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
    :class="class"
  >
    <template #title>
      <div class="contact-section-container">
        <!-- Título -->
        <div class="contact-header">
          <h2 class="contact-title">{{ contact.title }}</h2>
        </div>

        <!-- Formulario centrado -->
        <div class="contact-form-container">
          <form @submit.prevent="submitForm" class="contact-form">
            <UInput
              v-model="formData.nombre"
              type="text"
              :placeholder="getFieldLabel(contact.fields[0])"
              :required="contact.fields[0].required"
              class="form-input"
              size="lg"
              variant="outline"
            />

            <UInput
              v-model="formData.edad"
              type="number"
              :placeholder="getFieldLabel(contact.fields[1])"
              :required="contact.fields[1].required"
              :min="contact.fields[1].min"
              :max="contact.fields[1].max"
              class="form-input"
              size="lg"
              variant="outline"
            />

            <UInput
              v-model="formData.email"
              type="email"
              :placeholder="getFieldLabel(contact.fields[2])"
              :required="contact.fields[2].required"
              class="form-input"
              size="lg"
              variant="outline"
            />

            <UInput
              v-model="formData.telefono"
              type="tel"
              :placeholder="getFieldLabel(contact.fields[3])"
              :required="contact.fields[3].required"
              class="form-input"
              size="lg"
              variant="outline"
            />

            <UTextarea
              v-if="contact.fields[4]"
              v-model="formData.mensaje"
              :placeholder="getFieldLabel(contact.fields[4])"
              :required="contact.fields[4].required"
              class="form-textarea"
              :rows="4"
              size="lg"
              variant="outline"
            />

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

