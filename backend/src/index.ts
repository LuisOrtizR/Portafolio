import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { startScheduler } from './services/scheduler'
import weatherRoutes  from './routes/weather'
import holidaysRoutes from './routes/holidays'
import marketRoutes   from './routes/market'
import chatRoutes     from './routes/chat'
import contactRoutes  from './routes/contact'

const app  = express()
const PORT = process.env.PORT ?? 3000

// Render (y la mayoría de PaaS) exponen la app detrás de un proxy inverso.
// Sin esto, express-rate-limit no puede identificar la IP real del cliente.
app.set('trust proxy', 1)

app.use(helmet())

// Configurar CORS dinámico para permitir localhost y el dominio de producción
const stripTrailingSlash = (url: string) => url.endsWith('/') ? url.slice(0, -1) : url

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  'https://luis-ortiz-portfolio.vercel.app',
  process.env.FRONTEND_URL
]
  .filter(Boolean)
  .map((url) => stripTrailingSlash(url as string))

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(stripTrailingSlash(origin))) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}))

app.use(express.json())

app.use('/api/weather',  weatherRoutes)
app.use('/api/holidays', holidaysRoutes)
app.use('/api/market',   marketRoutes)
app.use('/api/chat',     chatRoutes)
app.use('/api/contact',  contactRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origen no permitido por CORS.' })
  }
  console.error('[Unhandled Error]:', err)
  res.status(500).json({ error: 'Error interno del servidor.' })
})

startScheduler()

app.listen(PORT, () => {
  console.log(`✅ Server running → http://localhost:${PORT}`)
})
