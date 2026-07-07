# Auditoría del proyecto Portafolio

> Documento vivo de reconocimiento técnico. Se actualiza a medida que se revisan más áreas o se resuelven hallazgos. Marca `[x]` cuando algo quede corregido.

**Fecha de inicio:** 2026-07-04
**Stack detectado:**
- `portfolio/` — Vue 3 + Vite + TypeScript + Pinia + vue-i18n + Tailwind CSS 4. Desplegado en Vercel.
- `ts-backend/` — Node.js + Express 5 + TypeScript. Desplegado en Render. Sirve clima (OpenWeather), feriados (date-holidays/Calendarific/Nager), mercado (Alpha Vantage), chat con IA (Groq) y formulario de contacto (formsubmit.co).
- Son dos repos git independientes (no hay repo raíz común).

---

## 🔴 Seguridad — prioridad alta

- [x] **Endpoint de debug público sin protección.** ~~`weather.ts:46` expone `GET /api/weather/debug`...~~ **Resuelto (2026-07-04):** se eliminó la ruta por completo; no la consumía el frontend y el refresco de caché ya lo cubre el cron cada 30 min ([`scheduler.ts`](ts-backend/src/services/scheduler.ts)). `tsc --noEmit` verificado sin errores tras el cambio.
- [x] **Sin rate limiting en ningún endpoint.** **Resuelto (2026-07-04):** se instaló `express-rate-limit` y se añadió [`middleware/rateLimit.ts`](ts-backend/src/middleware/rateLimit.ts) con dos limiters:
  - `chatLimiter`: 15 solicitudes / 10 min por IP, aplicado a todo `POST /api/chat` ([`chat.ts:9-10`](ts-backend/src/routes/chat.ts:9)).
  - `contactLimiter`: 5 solicitudes / hora por IP, aplicado a todo `POST /api/contact` ([`contact.ts:4-5`](ts-backend/src/routes/contact.ts:4)).
  - También se añadió `app.set('trust proxy', 1)` en [`index.ts`](ts-backend/src/index.ts:14) — necesario para que el limiter identifique la IP real detrás del proxy inverso de Render (Render reenvía vía `X-Forwarded-For`; sin esto, o todos los usuarios cuentan como una sola IP, o el limiter directamente falla/valida mal).
  - **Verificado en caliente:** se levantó el servidor localmente y se dispararon 7 requests a `/contact` (5 pasaron con 200, la 6ª y 7ª devolvieron 429) y 17 requests a `/chat` con payload inválido (15 con 400, la 16ª y 17ª con 429). `tsc --noEmit` sin errores.
  - **⚠️ Efecto colateral de la prueba:** las 5 primeras llamadas de prueba a `/api/contact` sí llegaron a `formsubmit.co` y probablemente generaron 5 correos de prueba (nombre "test", mensaje "hola") en tu bandeja `luisangel930115@gmail.com`. Puedes ignorarlos/borrarlos con confianza — no se envió ningún dato real.
- [x] **Fuga de memoria / DoS en sesiones de chat.** **Resuelto (2026-07-04):** [`chat.ts`](ts-backend/src/routes/chat.ts) ahora guarda cada sesión como `{ history, lastActive }`. Se añadió `pruneExpiredSessions()` (TTL de 30 min de inactividad, se ejecuta en cada request) y un tope duro `MAX_SESSIONS = 500` que evita el registro de una nueva sesión desalojando la más antigua si se alcanza el límite. `tsc --noEmit` verificado sin errores.
- [x] **Falta validación en el formulario de contacto.** **Resuelto (2026-07-04):** [`contact.ts`](ts-backend/src/routes/contact.ts) ahora valida tipos, recorta espacios, exige nombre ≤100 chars, email con regex + ≤254 chars, y mensaje entre 10 y 2000 chars, antes de reenviar a formsubmit.co. **Verificado en caliente:** email inválido, mensaje corto y nombre vacío devuelven 400 con el mensaje correspondiente sin llegar a formsubmit.co (no se generaron correos de prueba esta vez).
- [x] **Sin cabeceras de seguridad (helmet).** **Resuelto (2026-07-04):** se instaló `helmet` y se añadió `app.use(helmet())` en [`index.ts`](ts-backend/src/index.ts:19). **Verificado en caliente:** `curl -D-` sobre `/api/health` confirma `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-DNS-Prefetch-Control: off` y `X-Frame-Options: SAMEORIGIN` presentes en la respuesta.
- [ ] **`axios` desactualizado con múltiples CVEs (detectado vía `npm audit` al instalar `express-rate-limit`).** La versión resuelta actualmente (dentro del rango `^1.13.6`) tiene ~9 vulnerabilidades reportadas (4 moderadas, 5 altas), incluyendo SSRF por bypass de `NO_PROXY`, prototype pollution en el merge de config, y ReDoS. Recomendación: correr `npm audit fix` en `ts-backend` (y revisar `portfolio`, que también depende de `axios`) y probar que las llamadas a APIs externas (clima, mercado, feriados) sigan funcionando tras el bump.

## 🟡 Privacidad / Datos sensibles

- [ ] **Referencias personales de terceros hardcodeadas.** [`aiService.ts:41-43`](ts-backend/src/services/aiService.ts:41) incluye nombres, teléfonos y correos de referencias personales (no solo tuyos) directamente en el código fuente, que se envían además como parte del prompt del sistema en cada llamada al chat. Si el repo `ts-backend` es público en GitHub, esos datos de terceros quedan expuestos sin control de quién los ve. Vale la pena confirmar que esas personas dieron su consentimiento, o mover esos datos a una variable de entorno / archivo no versionado.
- [ ] **Log parcial de API key.** [`aiService.ts:204`](ts-backend/src/services/aiService.ts:204) imprime en consola los primeros 6 caracteres de `GROQ_API_KEY` en cada request al chat. No es una fuga crítica, pero es innecesario y queda en los logs de Render.

## 🟢 Buenas prácticas ya presentes (no tocar)

- `.env` correctamente ignorado en ambos repos y **no** está trackeado en git (se verificó `git ls-files` — las keys reales del `.env` de `ts-backend` nunca se subieron).
- CORS con allowlist explícita y normalización de origin en [`index.ts`](ts-backend/src/index.ts:14).
- Llamadas externas en paralelo con `Promise.allSettled` (clima, feriados, mercado) — resiliente a fallos parciales de proveedores.
- Caché con `node-cache` + refresco programado con `node-cron` — buen patrón para no golpear APIs externas en cada request.
- No se encontró ningún uso de `v-html` / `innerHTML` en el frontend — sin vectores XSS obvios detectados en esta pasada.

## 🔵 Calidad / mantenibilidad

- [ ] **Sin tests en ninguno de los dos proyectos.** No hay `*.test.*` / `*.spec.*` ni test runner configurado (ni Vitest en frontend, ni Jest/Vitest en backend). Dado que hay lógica no trivial (parsing de holidays, fallback del chat, normalización de historial), sería el candidato natural para primeras pruebas unitarias.
- [ ] **Tipado débil (`any`) en zonas clave del backend:** `chat.ts` (`conversationSessions: Map<string, any[]>`), `aiService.ts` (`messages: any[]`, `context?: any`), `holidaysService.ts` (`mapCalendarificToHoliday(item: any, ...)`). Quita parte del valor de tener TypeScript ahí.
- [ ] Revisar si `vite-plugin-vue-devtools` (siempre listado como plugin en [`vite.config.ts`](portfolio/vite.config.ts:9)) queda realmente excluido del bundle de producción (por defecto debería aplicarse solo en `serve`, pero vale confirmarlo en el build de Vercel).

---

## 🔵 Calidad / mantenibilidad (segunda pasada — resto del frontend)

- [ ] **Textos en inglés fijo, rompiendo el trilingüe (en/es/pt).** El sitio soporta 3 idiomas vía vue-i18n, pero dos lugares tienen texto hardcodeado que no cambia con el idioma:
  - [`NotFoundView.vue`](portfolio/src/views/NotFoundView.vue:5) ("Page not found", "Back to home", etc.) — no usa `t()`.
  - [`ProjectsSection.vue:14`](portfolio/src/components/sections/ProjectsSection.vue:14) ("Selected work focused on product thinking...") — no usa `t()`.
- [ ] **Foto de perfil en host externo gratuito (i.ibb.co).** [`AboutSection.vue:55`](portfolio/src/components/sections/AboutSection.vue:55) y su lightbox cargan la imagen desde `i.ibb.co`, un servicio gratuito de hosting de imágenes de terceros. Si el host cae, aplica rate-limit o bloquea hotlinking, la foto se rompe. Recomendación: mover la imagen a `public/images/` y servirla localmente.
- [ ] **Iframes de certificados sin `sandbox`.** [`Certificationssection.vue:26`](portfolio/src/components/sections/Certificationssection.vue:26) y `:169` insertan `<iframe :src="cert.previewUrl">` (Google Drive) sin atributo `sandbox`. Riesgo bajo (el origen es Drive), pero es una buena práctica de defensa en profundidad añadir `sandbox="allow-scripts allow-same-origin"` o similar.
- [ ] **Cliente HTTP inconsistente + tipos duplicados en `DashboardSection`.** [`DashboardSection.vue`](portfolio/src/components/sections/DashboardSection.vue:273) usa `axios` mientras que `ContactSection.vue` y `AiChatModal.vue` usan `fetch` nativo — sin razón aparente para la diferencia. Además redefine localmente `Weather`/`Stock`/`Market`/`Holiday` (líneas 294-298) en vez de reutilizar tipos compartidos con el backend.
- [ ] **Sin estado de error visible si fallan las 3 APIs del dashboard.** En `DashboardSection.vue:349-367`, si `fetchData()` falla, solo se hace `console.error`; el usuario ve los paneles vacíos sin ningún mensaje ni botón de reintento.

## ✅ Verificado sin hallazgos (segunda pasada)

- **Consistencia i18n de claves:** `en.ts`, `es.ts` y `pt.ts` tienen exactamente el mismo conjunto de claves (274 líneas cada uno, mismo set ordenado) — no hay traducciones faltantes.
- **Limpieza de listeners/timers:** `Navbar.vue` y `FloatingRobot.vue` remueven correctamente sus listeners de scroll e intervals en `onUnmounted` — no se detectaron fugas de memoria por listeners huérfanos en el frontend.
- **Sin XSS vía `v-html`/`innerHTML`** en todo `portfolio/src` (verificado por grep global).

## 🟠 Bug reportado: el formulario de contacto no funciona en producción (Vercel)

- [x] **`VITE_API_URL` apuntaba al backend equivocado — causa raíz confirmada.** [`portfolio/.env`](portfolio/.env:1) tenía `VITE_API_URL=https://backend-auth-rbac-oa4f.onrender.com/api`, la URL del otro proyecto del usuario (Sistema de Autenticación RBAC). **Verificado en vivo:** esa URL responde con la landing page "Backend Auth RBAC API" (rutas `/api/auth`, `/api/users`, `/api/roles`...) y devuelve 404 en `/api/health`, `/api/contact`, `/api/chat` — no tiene absolutamente nada que ver con `ts-backend`.
  - **Resuelto (2026-07-04):** el usuario confirmó la URL correcta: `https://ts-backend-v0ug.onrender.com`. Verificado con `curl` → `{"status":"ok",...}` en `/api/health`.
  - **Importante — `.env` local vs Vercel:** en local, [`portfolio/.env`](portfolio/.env) se dejó **sin** `VITE_API_URL` (comentado, con instrucciones) para que el frontend use el proxy de [`vite.config.ts`](portfolio/vite.config.ts:20) (`/api` → `http://localhost:3000`). Al principio se puso la URL de producción también en el `.env` local por error, lo que hizo que el dev server local le hablara a producción en vez de al backend local — se corrigió y se confirmó con `curl` en la sección de validación local, abajo. **`VITE_API_URL=https://ts-backend-v0ug.onrender.com/api` solo debe vivir en Vercel** (Project Settings → Environment Variables).
  - **Verificado CORS:** `curl` a `ts-backend-v0ug.onrender.com` con `Origin: https://luis-ortiz-portfolio.vercel.app` devuelve `access-control-allow-origin: https://luis-ortiz-portfolio.vercel.app` — el backend ya acepta el dominio real de producción.
  - **⚠️ Acción pendiente del usuario (no se puede hacer desde aquí):** en Vercel → Project Settings → Environment Variables, poner/actualizar `VITE_API_URL` de producción a `https://ts-backend-v0ug.onrender.com/api` y disparar un redeploy.
  - **⚠️ Además:** todos los fixes de seguridad de hoy en `ts-backend` (rate limiting, TTL de sesiones, validación de contacto, helmet, borrado del endpoint debug) quedaron en un commit local (`d93e572`, rama `main`) pero **no se hizo `git push`** — Render seguirá corriendo el código viejo hasta que el usuario suba el commit.
- [x] **`DashboardSection.vue` no se usaba en ningún lado.** **Resuelto (2026-07-04):** confirmado por grep que no estaba importado por `HomeView.vue` ni por nada más — era código muerto (widgets de clima/mercado/feriados que nunca se veían en el sitio). Se eliminó el archivo. Como consecuencia, `axios` quedó sin ningún consumidor en el frontend (era el único componente que lo usaba) y se desinstaló con `npm uninstall axios`. `vue-tsc --noEmit` verificado sin errores tras ambos cambios.
- [x] **Bug adicional encontrado durante la validación local: error de compilación de i18n en el placeholder de email.** Los 3 locales (`en.ts`, `es.ts`, `pt.ts`) tenían `placeholderEmail: 'tu@correo.com'` (y equivalentes) con un `@` sin escapar; vue-i18n interpreta `@` como inicio de un "linked message" (`@:clave`) y fallaba al parsear, generando spam de `Message compilation error` en consola en cada render del formulario de contacto. **Resuelto:** se escapó el `@` con la sintaxis de vue-i18n (`"tu{'@'}correo.com"`) en los 3 locales. Verificado en el navegador: el placeholder renderiza `tu@correo.com` correctamente y no se generan errores nuevos tras el fix.

## ✅ Validación local (frontend + backend corriendo en la máquina)
- Se creó [`.claude/launch.json`](.claude/launch.json) con dos configuraciones (`ts-backend` puerto 3000, `portfolio-frontend` puerto 5174) y se levantaron ambos con las herramientas de preview.
- `ts-backend`: arrancó sin errores (`[cron] Scheduler started`, `✅ Server running`).
- `portfolio-frontend`: arrancó sin errores de Vite/vue-tsc. Se confirmó visualmente que `DashboardSection` ya no aparece en la página.
- **Chat end-to-end contra el backend local:** se abrió el widget de chat, se envió una pregunta real ("¿En qué stack tiene más experiencia?") y la red confirma `POST http://localhost:5174/api/chat → 200 OK` resuelto vía el proxy de Vite hacia `localhost:3000` (no contra producción). La IA respondió correctamente citando el stack real del perfil.
- Nota de proceso: la primera vez que se probó el chat, viajó por error contra la producción (`ts-backend-v0ug.onrender.com`) porque el `.env` local todavía tenía la URL de producción puesta — se corrigió dejando `VITE_API_URL` sin definir en local y reiniciando el dev server, y la segunda prueba sí confirmó el flujo contra `localhost:3000`.

## Pendiente de revisar (próxima pasada)
- Accesibilidad (a11y): el dropdown de navegación en `Navbar.vue` (líneas 20-41) solo se abre con `group-hover`, sin manejo de foco/teclado — revisar navegación por teclado.
- Rendimiento del build / tamaño de bundle (no se corrió `vite build` con reporte de tamaño).
- El usuario debe: (1) configurar `VITE_API_URL` en Vercel y redeployar, (2) hacer `git push` del commit `d93e572` en `ts-backend` para que Render tome los fixes de seguridad.
