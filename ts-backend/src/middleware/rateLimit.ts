import rateLimit from 'express-rate-limit'

export const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes al asistente de IA. Intenta de nuevo en unos minutos.' },
})

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados mensajes de contacto enviados. Intenta de nuevo más tarde.' },
})
