# Hair Brazil Extensions — Secure checkout activation

Stripe Checkout uses Vercel Functions at /api/checkout and /api/checkout-status.
Checkout currently remains disabled unless the following environment settings are
configured in Vercel for Production:

- STRIPE_SECRET_KEY: The client's own Stripe secret API key (never exposed to the browser or committed to Git).
- STRIPE_SHIPPING_RATE_ID: A real shipping rate created by the merchant in Stripe, e.g. shr_...
- STORE_CHECKOUT_ENABLED: true, only after the merchant has verified prices, inventory, shipping, legal and refund policies.
- PUBLIC_SITE_URL (optional): https://hair-brazil-extensions-two.vercel.app
- STRIPE_AUTOMATIC_TAX (optional): true only after Stripe Tax is configured.
  
Customers pay in USD via Stripe-hosted Checkout. Shipping is set for US addresses by
default, and Stripe must have a valid merchant-configured shipping rate. No free
shipping is presumed. The backend recalculates prices and validates variant choices;
the browser cannot override server-side prices.

Before enabling live payments: confirm products are in stock (currently catalog
availability is not confirmed), business identity, delivery/shipping service,
appropriate taxes, refunds policy, Stripe account ownership and verification. Test
the payment flow in Stripe test mode first, then switch to live keys. Check payment
events in Stripe Dashboard; for automated fulfillment and inventory updates, add a
verified webhook and persistent order management. No card data is collected in React.

When Stripe is not configured, customers can still build a bag and submit the
itemized order request through WhatsApp. This is **not** payment confirmation.
