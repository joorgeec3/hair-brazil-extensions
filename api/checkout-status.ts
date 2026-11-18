type Req = { method?: string; query?: Record<string, string | string[] | undefined> };
type Res = {
  status: (code: number) => Res;
  setHeader: (name: string, value: string) => void;
  json: (value: unknown) => void;
};
export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Payment verification unavailable' });
  const sessionId = req.query?.session_id;
  if (typeof sessionId !== 'string' || !/^cs_(test_)?[a-zA-Z0-9_]{12,200}$/.test(sessionId)) {
    return res.status(400).json({ error: 'Invalid session' });
  }
  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(sessionId), {
      headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY }
    });
    if (!response.ok) return res.status(404).json({ error: 'Session unavailable' });
    const session = await response.json() as { payment_status?: string; status?: string };
    return res.status(200).json({
      paid: session.payment_status === 'paid',
      complete: session.status === 'complete'
    });
  } catch {
    return res.status(502).json({ error: 'Unable to verify payment' });
  }
}
