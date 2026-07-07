import { ContactPayload } from '../types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_MAX_LENGTH = 100
const EMAIL_MAX_LENGTH = 254
const MESSAGE_MIN_LENGTH = 10
const MESSAGE_MAX_LENGTH = 2000

export type ContactValidationResult =
  | { valid: true; data: ContactPayload }
  | { valid: false; error: string }

export function validateContactPayload(body: unknown): ContactValidationResult {
  const { name, email, message } = (body ?? {}) as Record<string, unknown>

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return { valid: false, error: 'Faltan datos del formulario.' }
  }

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedMessage = message.trim()

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return { valid: false, error: 'Faltan datos del formulario.' }
  }

  if (trimmedName.length > NAME_MAX_LENGTH) {
    return { valid: false, error: 'El nombre es demasiado largo.' }
  }

  if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > EMAIL_MAX_LENGTH) {
    return { valid: false, error: 'El correo electrónico no es válido.' }
  }

  if (trimmedMessage.length < MESSAGE_MIN_LENGTH || trimmedMessage.length > MESSAGE_MAX_LENGTH) {
    return { valid: false, error: 'El mensaje debe tener entre 10 y 2000 caracteres.' }
  }

  return {
    valid: true,
    data: { name: trimmedName, email: trimmedEmail, message: trimmedMessage },
  }
}
