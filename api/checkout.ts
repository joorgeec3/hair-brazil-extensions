import { CHECKOUT_CATALOG } from '../src/data/checkoutCatalog.js';

type Req = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};
type Res = {
  status: (code: number) => Res;
  setHeader: (name: string, value: string) => void;
  json: (value: unknown) => void;
};
type CheckoutEntry = { id: string; quantity: number; option?: string };
const siteOrigin = (process.env.PUBLIC_SITE_URL || 'https://hair-brazil-extensions-two.vercel.app').replace(/\/$/, '');
const paymentsEnabled = () => process.env.STORE_CHECKOUT_ENABLED === 'true'
  && Boolean(process.env.STRIPE_SECRET_KEY?.startsWith('sk_'))
  && Boolean(process.env.STRIPE_SHIPPING_RATE_ID?.startsWith('shr_'));

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ enabled: paymentsEnabled() });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!paymentsEnabled()) return res.status(503).json({ error: 'ONLINE_PAYMENTS_NOT_CONFIGURED' });

  const origin = req.headers.origin;
  const host = req.headers.host;
  if (typeof origin === 'string' && typeof host === 'string' && new URL(origin).host !== host) {
    return res.status(403).json({ error: 'Invalid request origin' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || typeof body !== 'object' || !Array.isArray((body as any).items)) {
      return res.status(400).json({ error: 'Missing cart items' });
    }
    const items = (body as { items: CheckoutEntry[], language?: string }).items;
    const language = (body as { language?: string }).language;
    if (!items.length || items.length > 30) return res.status(400).json({ error: 'Invalid cart size' });

    const consolidated = new Map<string, CheckoutEntry>();
    for (const raw of items) {
      if (!raw || typeof raw.id !== 'string' || !Number.isInteger(raw.quantity) || raw.quantity < 1 || raw.quantity > 99) {
        return res.status(400).json({ error: 'Invalid item quantity or ID' });
      }
      const key = raw.id + ':' + (raw.option ?? '');
      const earlier = consolidated.get(key);
      const quantity = (earlier?.quantity ?? 0) + raw.quantity;
      if (quantity > 99) return res.status(400).json({ error: 'Too many units' });
      consolidated.set(key, { id: raw.id, option: raw.option, quantity });
    }
    const lineItems = [...consolidated.values()].map((entry) => {
      const product = (CHECKOUT_CATALOG as Record<string, {
        name: string; category: string; price: number;
        options?: { label: string; price: number }[];
      }>)[entry.id];
      if (!product || product.price == null) return null;
      const options = product.options;
      if (options?.length && !options.some((o) => o.label === entry.option)) return null;
      const price = options?.find((o) => o.label === entry.option)?.price ?? product.price;
      const cents = Math.round(price * 100);
      if (!Number.isSafeInteger(cents) || cents < 50 || cents > 99999999) return null;
      return { product, price: cents, quantity: entry.quantity, option: entry.option };
    });
    if (lineItems.some((item) => !item)) return res.status(400).json({ error: 'Product prices or options are unavailable' });

    const params = new URLSearchParams({
      mode: 'payment',
      customer_creation: 'always',
      billing_address_collection: 'required',
      'phone_number_collection[enabled]': 'true',
      success_url: siteOrigin + '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: siteOrigin + '/checkout/cancel',
      'metadata[source]': 'hair-brazil-extensions'
    });
    params.set('locale', language === 'PT' ? 'pt-BR' : language === 'ES' ? 'es' : 'en');
    let hasPhysicalProducts = false;
    for (const [index, item] of lineItems.entries()) {
      if (!item) continue;
      hasPhysicalProducts ||= item.product.category !== 'Training & Courses';
      params.set(`line_items[${index}][price_data][currency]`, 'usd');
      params.set(`line_items[${index}][price_data][unit_amount]`, String(item.price));
      params.set(`line_items[${index}][price_data][product_data][name]`,
        (item.product.name + (item.option ? ' — ' + item.option : '')).slice(0, 250));
      params.set(`line_items[${index}][quantity]`, String(item.quantity));
    }
    // Use the shipping rate configured by the merchant. Never imply shipping is free.
    if (hasPhysicalProducts) {
      params.set('shipping_address_collection[allowed_countries][0]', 'US');
      params.set('shipping_options[0][shipping_rate]', process.env.STRIPE_SHIPPING_RATE_ID!);
    }
    // Tax calculation is opt-in only after merchant configures Stripe Tax.
    if (process.env.STRIPE_AUTOMATIC_TAX === 'true') {
      params.set('automatic_tax[enabled]', 'true');
    }
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
    const session = await stripeResponse.json() as { url?: string; error?: { message?: string } };
    if (!stripeResponse.ok || !session.url?.startsWith('https://checkout.stripe.com/')) {
      console.error('Stripe checkout error', stripeResponse.status, session.error?.message || 'No URL returned');
      return res.status(502).json({ error: 'Payment service unavailable. Please try again.' });
    }
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Checkout session failure', error);
    return res.status(500).json({ error: 'Unable to start checkout' });
  }
}
