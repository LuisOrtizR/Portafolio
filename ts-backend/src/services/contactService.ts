import axios from 'axios'
import { ContactPayload } from '../types'

const FORMSUBMIT_URL = 'https://formsubmit.co/ajax'
const DEFAULT_RECIPIENT = 'luisangel930115@gmail.com'

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const recipient = process.env.CONTACT_EMAIL || DEFAULT_RECIPIENT

  const response = await axios.post(
    `${FORMSUBMIT_URL}/${recipient}`,
    {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      _subject: `Contacto desde portfolio - ${payload.name}`,
      _captcha: 'false',
      _template: 'box',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    }
  )

  if (response.status >= 400) {
    throw new Error(`formsubmit.co respondió con estado ${response.status}`)
  }
}
