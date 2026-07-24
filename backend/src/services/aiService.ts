import axios from 'axios';
import { ChatMessage, LiveContext } from '../types';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const PROFILE_SNAPSHOT = {
  name: 'Luis Ángel Ortiz Romero',
  headline: 'Desarrollador de Software | Automatización con IA | Python · JavaScript · Node.js · Vue.js',
  location: 'Soacha, Cundinamarca, Colombia',
  availability: 'Disponibilidad inmediata | Presencial o remota.',
  role: 'Desarrollador de software con experiencia en automatización con IA, desarrollo backend con Python y JavaScript, y desarrollo full stack con Vue.js 3 y TypeScript.',
  summary: 'Desarrollador de software con sólida experiencia en automatización de procesos con inteligencia artificial, desarrollo backend con Python y JavaScript (Node.js), integración de modelos de IA en flujos de negocio con OpenClaw y n8n, y desarrollo full stack con Vue.js 3 y TypeScript. También cuenta con experiencia en APIs REST, seguridad con JWT/RBAC, bases de datos relacionales y no relacionales, despliegues con Docker, Render y Vercel, y metodologías ágiles Scrum.',
  stack: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Node.js', 'Express', 'Fastify', 'Prisma', 'Vue 3', 'PostgreSQL', 'MySQL', 'MongoDB', 'JWT', 'RBAC', 'Docker', 'Render', 'Vercel'],
  strengths: [
    'Arquitectura de APIs y servicios backend escalables (Node.js, Express, TypeScript).',
    'Automatización de procesos e integración de modelos de IA (LLMs) con n8n y OpenClaw.',
    'Seguridad de APIs con JWT y control de acceso basado en roles (RBAC).',
    'Gestión de bases de datos relacionales y no relacionales (PostgreSQL, MySQL, MongoDB).',
    'Desarrollo de experiencias web modernas con Vue 3 y TypeScript.'
  ],
  experience: [
    'Desarrollador Full Stack — Proyecto RoMa (romascience.com) (jun 2026 - actualidad).',
    'Desarrollador — Automatización e IA — Azteca Internacional SAS (mar 2026 - jun 2026).',
    'Intern SENA — Process Performance — SLB (Schlumberger) (dic 2024 - ago 2025).'
  ],
  projects: [
    'TicketFlow — Plataforma de gestión de tickets y solicitudes de soporte. Backend en Node.js/Express con PostgreSQL, JWT y Zod; frontend en Vue 3 + TypeScript con dashboard de analítica (Chart.js). Desplegada en Vercel y Render.',
    'RoMa — Sitio corporativo multilenguaje (ES/EN) con formulario de contacto seguro y panel administrativo. Backend en Fastify con Prisma; frontend en Vue 3 + TypeScript.'
  ],
  education: [
    'Tecnólogo en Implementación y Gestión de Bases de Datos (SENA, en curso 2026-2028).',
    'Tecnólogo en Análisis y Desarrollo de Software (SENA, graduado 2023-2025).',
    'Técnico Profesional en Programación de Software (2013).',
    'Certificado en IA Generativa para líderes empresariales (LinkedIn Learning).',
    'Certificado en JavaScript Esencial (LinkedIn Learning).'
  ],
  languages: ['Español: Nativo', 'Inglés: A2 — lectura técnica funcional'],
  references: [
    'Juan Sebastián Payán — Referencia laboral (SLB / Schlumberger).',
    'Hermes Gonzales Guisa — Referencia personal.',
    'Luisa Fernanda Gutiérrez — Referencia personal.'
  ],
  contact: {
    linkedin: 'https://www.linkedin.com/in/luis-romero-dev',
    github: 'https://github.com/LuisOrtizR',
    cv: 'https://drive.google.com/file/d/1RWrrKm5CZ6_QlvJhK4SlvbKI-wNN3ED0/view?usp=sharing',
    email: 'luisangel930115@gmail.com'
  }
};

function getLanguageLabel(lang: string) {
  if (lang.includes('port')) return 'portugués';
  if (lang.includes('en')) return 'inglés';
  return 'español';
}

function bulletList(items: string[]): string {
  return items.map((item) => `- ${item}`).join('\n');
}

function getLastUserMessage(messages: ChatMessage[]): string {
  return [...messages].reverse().find((m) => m.role === 'user')?.content?.toLowerCase() || '';
}

const LIVE_CONTEXT_KEYWORDS = /(clima|weather|tiempo|temperatura|feriado|holiday|festivo|feriados|mercado|market|bolsa|accion|acciones|stock)/;

function isLiveContextRelevant(messages: ChatMessage[]): boolean {
  return LIVE_CONTEXT_KEYWORDS.test(getLastUserMessage(messages));
}

function buildLiveContext(context?: LiveContext): string {
  if (!context) return '';

  const weatherSummary = context.weather?.map((c) => `${c.city} (${c.country}): ${c.temp}°C, ${c.description}`).join(' | ') || 'No disponible';
  const holidaysToday = context.holidays?.today?.length
    ? context.holidays.today.map((h) => `${h.localName} (${h.countryCode})`).join(', ')
    : 'No hay feriados nacionales hoy en los países monitoreados';
  const upcomingHolidays = context.holidays?.upcoming?.slice(0, 5)
    .map((h) => `${h.date}: ${h.localName} (${h.countryCode})`).join(' | ') || 'No disponible';
  const marketStatus = context.market?.market_status?.label || 'Información de mercado no disponible';

  return `
════════════════════════════════
DATOS EN TIEMPO REAL (Dashboard)
════════════════════════════════
- Clima actual: ${weatherSummary}
- Feriados HOY: ${holidaysToday}
- Próximos feriados: ${upcomingHolidays}
- Estado del mercado: ${marketStatus}

IMPORTANTE: Si el usuario pregunta por fechas, feriados, clima o mercado, usa únicamente estos datos. No inventes información.`;
}

function buildSystemPrompt(lang: string, context?: LiveContext) {
  const language = getLanguageLabel(lang);
  const liveContext = buildLiveContext(context);

  return `Eres el asistente de IA profesional del portfolio de ${PROFILE_SNAPSHOT.name}. Tu misión es ayudar a reclutadores, clientes y colegas a entender su perfil de forma clara, ejecutiva y convincente.

PERSONALIDAD:
- Profesional, ejecutivo, claro y natural.
- Habla de Luis en tercera persona.
- Responde de forma breve, útil y orientada a acción.
- Si el usuario pregunta algo de contratación, responde con una propuesta concreta y cercana.
- Suena humano, cercano y sofisticado, no robótico.
- Cuando sea relevante, ofrece un siguiente paso concreto como ver el CV, abrir LinkedIn o conversar por correo.
- Usa un estilo de assistant ejecutivo, con frases cortas y una respuesta que resulte útil en 2 a 5 líneas.

REGLAS DE RESPUESTA:
1. Si preguntan por su perfil, resume su valor en 3 puntos: backend, automatización con IA, y desarrollo full stack.
2. Si preguntan por contacto, siempre ofrece LinkedIn, GitHub, CV y correo profesional.
3. Si preguntan por proyectos, menciona que su experiencia combina APIs backend, automatización con IA y desarrollo full stack.
4. Si preguntan por disponibilidad, confirma que está disponible de forma inmediata.
5. Si el usuario pide ayuda profesional, ofrece una siguiente acción concreta como revisar un proyecto, agendar una conversación o ver el CV.
6. Usa el resumen completo del CV y no te limites solo a la experiencia; incorpora perfil, stack, proyectos, educación e idiomas cuando sea relevante.
7. Usa un tono cercano pero ejecutivo, no exagerado.
8. Si preguntan por referencias, menciona solo el nombre y la relación profesional/personal con Luis. Nunca inventes ni compartas teléfonos o correos de las referencias — indica que esos datos de contacto deben solicitarse directamente a Luis.
9. No inventes datos que no estén en este perfil (fechas, empresas, cifras). Si no tienes la información, dilo y ofrece contactar a Luis directamente.

${liveContext}

════════════════════════════════
PERFIL PROFESIONAL
════════════════════════════════
Nombre: ${PROFILE_SNAPSHOT.name}
Título: ${PROFILE_SNAPSHOT.headline}
Ubicación: ${PROFILE_SNAPSHOT.location}
Resumen: ${PROFILE_SNAPSHOT.summary}
Rol: ${PROFILE_SNAPSHOT.role}
Disponibilidad: ${PROFILE_SNAPSHOT.availability}
Stack principal: ${PROFILE_SNAPSHOT.stack.join(', ')}

Fortalezas:
${bulletList(PROFILE_SNAPSHOT.strengths)}

Experiencia:
${bulletList(PROFILE_SNAPSHOT.experience)}

Proyectos destacados:
${bulletList(PROFILE_SNAPSHOT.projects)}

Educación y certificaciones:
${bulletList(PROFILE_SNAPSHOT.education)}

Idiomas: ${PROFILE_SNAPSHOT.languages.join(', ')}

Referencias (solo nombre y relación, sin datos de contacto de terceros):
${bulletList(PROFILE_SNAPSHOT.references)}

LinkedIn: ${PROFILE_SNAPSHOT.contact.linkedin}
GitHub: ${PROFILE_SNAPSHOT.contact.github}
CV: ${PROFILE_SNAPSHOT.contact.cv}
Correo: ${PROFILE_SNAPSHOT.contact.email}

Responde en ${language}.`;
}

function getFallbackAiResponse(messages: ChatMessage[], lang: string = 'español') {
  const language = getLanguageLabel(lang);
  const normalized = getLastUserMessage(messages).normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  if (/(perfil|profile|summary|about|quien|presenta|curriculum|cv)/.test(normalized)) {
    if (language === 'inglés') {
      return `Luis is a software developer with experience in AI automation, backend engineering, and full-stack delivery. He works with Python, Node.js, TypeScript, Vue 3, PostgreSQL, n8n, OpenClaw, and modern deployment tools such as Docker, Render, and Vercel. He is available for new opportunities.`;
    }
    if (language === 'portugués') {
      return `Luis é um desenvolvedor de software com experiência em automação com IA, engenharia backend e entregas full stack. Trabalha com Python, Node.js, TypeScript, Vue 3, PostgreSQL, n8n, OpenClaw e ferramentas modernas de deploy como Docker, Render e Vercel. Está disponível para novas oportunidades.`;
    }
    return `Luis es un desarrollador de software con experiencia en automatización con IA, ingeniería backend y entrega full stack. Trabaja con Python, Node.js, TypeScript, Vue 3, PostgreSQL, n8n, OpenClaw y herramientas modernas de despliegue como Docker, Render y Vercel. Está disponible para nuevas oportunidades.`;
  }

  if (/(contact|linkedin|github|cv|correo|email|whatsapp|contrat|hablemos|habl)/.test(normalized)) {
    if (language === 'inglés') {
      return `Luis is available for new opportunities. You can reach him through LinkedIn: ${PROFILE_SNAPSHOT.contact.linkedin}, GitHub: ${PROFILE_SNAPSHOT.contact.github}, or download his CV here: ${PROFILE_SNAPSHOT.contact.cv}.`;
    }
    if (language === 'portugués') {
      return `Luis está disponível para novas oportunidades. Você pode entrar em contato pelo LinkedIn: ${PROFILE_SNAPSHOT.contact.linkedin}, GitHub: ${PROFILE_SNAPSHOT.contact.github} ou baixar o CV aqui: ${PROFILE_SNAPSHOT.contact.cv}.`;
    }
    return `Luis está disponible para nuevas oportunidades. Puedes contactarlo por LinkedIn: ${PROFILE_SNAPSHOT.contact.linkedin}, GitHub: ${PROFILE_SNAPSHOT.contact.github} o descargar su CV aquí: ${PROFILE_SNAPSHOT.contact.cv}.`;
  }

  if (/(referenc|reference)/.test(normalized)) {
    if (language === 'inglés') {
      return `Luis has professional and personal references available. For privacy reasons, please contact Luis directly at ${PROFILE_SNAPSHOT.contact.email} and he'll gladly share their details.`;
    }
    if (language === 'portugués') {
      return `Luis tem referências profissionais e pessoais disponíveis. Por privacidade, entre em contato diretamente com Luis em ${PROFILE_SNAPSHOT.contact.email} e ele terá prazer em compartilhar os dados.`;
    }
    return `Luis tiene referencias profesionales y personales disponibles. Por privacidad, contáctalo directamente en ${PROFILE_SNAPSHOT.contact.email} y con gusto te comparte los datos.`;
  }

  if (/(tecnolog|stack|node|vue|typescript|n8n|openclaw|power bi|power platform|postgres|backend|frontend|skills|herramient)/.test(normalized)) {
    if (language === 'inglés') {
      return `Luis works primarily with Python, Node.js, TypeScript, Vue 3, PostgreSQL, and AI/automation tools like n8n and OpenClaw. His profile combines backend architecture, AI-driven automation, and modern web experiences.`;
    }
    if (language === 'portugués') {
      return `Luis trabalha principalmente com Python, Node.js, TypeScript, Vue 3, PostgreSQL e ferramentas de IA/automação como n8n e OpenClaw. Seu perfil combina arquitetura backend, automação orientada por IA e experiências web modernas.`;
    }
    return `Luis trabaja principalmente con Python, Node.js, TypeScript, Vue 3, PostgreSQL y herramientas de IA/automatización como n8n y OpenClaw. Su perfil combina arquitectura backend, automatización orientada a IA y experiencias web modernas.`;
  }

  if (/(experien|slb|emtelco|trabaj|proyecto|project|portfolio|cv|educac|idiom)/.test(normalized)) {
    if (language === 'inglés') {
      return `Luis has experience in process optimization, automation, and product-oriented software development. He worked at SLB on performance analysis and reporting, and also contributed to customer experience initiatives at Emtelco.`;
    }
    if (language === 'portugués') {
      return `Luis tem experiência em otimização de processos, automação e desenvolvimento de software orientado a produto. Trabalhou na SLB em análise de desempenho e relatórios, e também contribuiu com iniciativas de experiência do cliente na Emtelco.`;
    }
    return `Luis tiene experiencia en optimización de procesos, automatización y desarrollo de software orientado a producto. Trabajó en SLB en análisis de desempeño y reporting, y también contribuyó con iniciativas de experiencia del cliente en Emtelco.`;
  }

  if (/(disponib|available|hire|contrat|reclut|trabajar)/.test(normalized)) {
    if (language === 'inglés') {
      return `Yes — Luis is immediately available for new professional opportunities and can contribute from day one in backend, automation, analytics, and full-stack delivery.`;
    }
    if (language === 'portugués') {
      return `Sim — Luis está imediatamente disponível para novas oportunidades profissionais e pode contribuir desde o primeiro dia em backend, automação, analytics e entrega full stack.`;
    }
    return `Sí — Luis está disponible de forma inmediata para nuevas oportunidades profesionales y puede aportar desde el primer día en backend, automatización, analítica y desarrollo full stack.`;
  }

  if (language === 'inglés') {
    return `Luis is a software professional focused on backend engineering, automation, and modern web products. He combines technical execution with a business-oriented mindset and is ready to support ambitious teams.`;
  }
  if (language === 'portugués') {
    return `Luis é um profissional de software focado em engenharia backend, automação e produtos web modernos. Ele combina execução técnica com uma visão orientada a negócios e está pronto para apoiar equipes ambiciosas.`;
  }
  return `Luis es un profesional de software enfocado en ingeniería backend, automatización y productos web modernos. Combina ejecución técnica con visión orientada a negocio y está listo para aportar valor en equipos ambiciosos.`;
}

export async function getAiResponse(messages: ChatMessage[], lang: string = 'español', context?: LiveContext) {
  const API_KEY = process.env.GROQ_API_KEY;

  if (!API_KEY || API_KEY.length < 10) {
    console.warn('⚠️ GROQ_API_KEY no disponible; usando respuesta local de respaldo para el asistente.');
    return getFallbackAiResponse(messages, lang);
  }

  const relevantContext = isLiveContextRelevant(messages) ? context : undefined;
  const systemPrompt = buildSystemPrompt(lang, relevantContext);

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices?.[0]?.message?.content || getFallbackAiResponse(messages, lang);
  } catch (error: any) {
    console.error('[AI Service Error]:', error.response?.data || error.message);
    return getFallbackAiResponse(messages, lang);
  }
}
