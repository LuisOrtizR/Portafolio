import { Router, Request, Response } from 'express';
import { contactLimiter } from '../middleware/rateLimit';
import { validateContactPayload } from '../validators/contact';
import { sendContactMessage } from '../services/contactService';

const router = Router();
router.use(contactLimiter);

router.post('/', async (req: Request, res: Response) => {
  const result = validateContactPayload(req.body);

  if (!result.valid) {
    return res.status(400).json({ error: result.error });
  }

  try {
    await sendContactMessage(result.data);
    return res.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error?.response?.data || error?.message);
    return res.status(502).json({ error: 'No se pudo enviar el mensaje. Intenta nuevamente.' });
  }
});

export default router;
