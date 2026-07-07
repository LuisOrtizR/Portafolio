import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { postJson } from '@/services/api'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_MAX_LENGTH = 100
const MESSAGE_MIN_LENGTH = 10
const MESSAGE_MAX_LENGTH = 2000

interface ContactFormState {
  name: string
  email: string
  message: string
}

interface ContactFieldErrors {
  name: string
  email: string
  message: string
}

interface ContactResponse {
  success: true
}

export function useContactForm() {
  const { t } = useI18n()

  const form = reactive<ContactFormState>({ name: '', email: '', message: '' })
  const fieldErrors = reactive<ContactFieldErrors>({ name: '', email: '', message: '' })
  const submitError = ref('')
  const isSubmitting = ref(false)
  const isSubmitted = ref(false)

  function validate(): boolean {
    fieldErrors.name = ''
    fieldErrors.email = ''
    fieldErrors.message = ''

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (!name) fieldErrors.name = t('contact.form.errors.nameRequired')
    else if (name.length > NAME_MAX_LENGTH) fieldErrors.name = t('contact.form.errors.nameTooLong')

    if (!email) fieldErrors.email = t('contact.form.errors.emailRequired')
    else if (!EMAIL_REGEX.test(email)) fieldErrors.email = t('contact.form.errors.emailInvalid')

    if (!message) fieldErrors.message = t('contact.form.errors.messageRequired')
    else if (message.length < MESSAGE_MIN_LENGTH) fieldErrors.message = t('contact.form.errors.messageTooShort')
    else if (message.length > MESSAGE_MAX_LENGTH) fieldErrors.message = t('contact.form.errors.messageTooLong')

    return !fieldErrors.name && !fieldErrors.email && !fieldErrors.message
  }

  async function submit() {
    submitError.value = ''
    isSubmitted.value = false

    if (!validate()) return

    isSubmitting.value = true

    try {
      await postJson<ContactResponse>('/contact', {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
      isSubmitted.value = true
      form.name = ''
      form.email = ''
      form.message = ''
    } catch {
      submitError.value = t('contact.form.error')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    fieldErrors,
    submitError,
    isSubmitting,
    isSubmitted,
    messageMaxLength: MESSAGE_MAX_LENGTH,
    submit,
  }
}
