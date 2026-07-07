import { Router, Request, Response } from 'express';
import { getAiResponse } from '../services/aiService';
import cache from '../services/cache';
import { fetchWeatherAll } from '../services/weatherService';
import { fetchTodayHolidays } from '../services/holidaysService';
import { fetchMarketData } from '../services/marketService';
import { chatLimiter } from '../middleware/rateLimit';
import { ChatMessage, CityWeather, HolidaysResponse, MarketData } from '../types';

const router = Router();
router.use(chatLimiter);

interface SessionEntry {
  history: ChatMessage[];
  lastActive: number;
}

const conversationSessions = new Map<string, SessionEntry>();
const MAX_HISTORY_TURNS = 12;
const SESSION_TTL_MS = 30 * 60 * 1000;
const MAX_SESSIONS = 500;

function normalizeHistory(history: ChatMessage[]): ChatMessage[] {
  return history
    .filter((message) => message && typeof message.content === 'string')
    .slice(-MAX_HISTORY_TURNS);
}

function pruneExpiredSessions() {
  const now = Date.now();
  for (const [key, entry] of conversationSessions) {
    if (now - entry.lastActive > SESSION_TTL_MS) {
      conversationSessions.delete(key);
    }
  }
}

function touchSession(sessionKey: string, history: ChatMessage[]) {
  pruneExpiredSessions();

  if (!conversationSessions.has(sessionKey) && conversationSessions.size >= MAX_SESSIONS) {
    const oldestKey = conversationSessions.keys().next().value;
    if (oldestKey !== undefined) conversationSessions.delete(oldestKey);
  }

  conversationSessions.set(sessionKey, { history, lastActive: Date.now() });
}

router.post('/', async (req: Request, res: Response) => {
  const { messages, lang, sessionId } = req.body as { messages: ChatMessage[]; lang?: string; sessionId?: string };

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Faltan mensajes en la petición.' });
  }

  let weather: CityWeather[] | null = cache.get<CityWeather[]>('weather:all') ?? null;
  if (!weather) {
    weather = await fetchWeatherAll().catch(() => null);
    if (weather) cache.set('weather:all', weather, 1800);
  }

  let holidays: HolidaysResponse | null = cache.get<HolidaysResponse>('holidays:today') ?? null;
  if (!holidays) {
    holidays = await fetchTodayHolidays().catch(() => null);
    if (holidays) cache.set('holidays:today', holidays, 3600);
  }

  let market: MarketData | null = cache.get<MarketData>('market:all') ?? null;
  if (!market) {
    market = await fetchMarketData().catch(() => null);
    if (market) cache.set('market:all', market, 1800);
  }

  const context = { weather, holidays, market };
  const normalizedHistory = normalizeHistory(messages);
  const sessionKey = typeof sessionId === 'string' && sessionId.trim() ? sessionId : 'default';

  const existing = conversationSessions.get(sessionKey);
  const mergedHistory = existing
    ? normalizeHistory([...existing.history, ...normalizedHistory])
    : normalizedHistory;
  touchSession(sessionKey, mergedHistory);

  try {
    const aiResponse = await getAiResponse(normalizedHistory, lang, context);
    const updatedHistory = normalizeHistory([...normalizedHistory, { role: 'assistant', content: aiResponse }]);
    touchSession(sessionKey, updatedHistory);
    res.json({ data: aiResponse });
  } catch (error: any) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({ error: message });
  }
});

export default router;
