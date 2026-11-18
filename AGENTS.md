# Instructions for AI coding assistants — Hair Brazil Extensions

This is the existing production website for Hair Brazil Extensions.
Do **not** recreate the project, replace the visual identity or remove working features.

## Project and deployment
- Repo: https://github.com/joorgeec3/hair-brazil-extensions
- Branch: `main`
- Live website: https://hair-brazil-extensions-two.vercel.app/
- Stack: React, TypeScript, Vite, Tailwind CSS, Vercel.
- Source of truth is this repository, not a newly generated replacement site.
- The linked Vercel project is owned by another account. Editing GitHub does
  not necessarily grant access to Vercel; do not claim deployment succeeded
  unless the live production deployment was actually verified.
- On the Hobby plan, Vercel may reject automatic deployments authored by
  nonowners. In that case open a pull request for the owner to review/merge
  and deploy. Never impersonate the owner or alter git author metadata.

## Main areas
- Home hero: `src/components/home/Hero.tsx`
- Home page: `src/pages/HomePage.tsx`
- Shop grid: `src/pages/ShopPage.tsx`
- Product details: `src/pages/ProductDetailPage.tsx`
- Cart, favorites, WhatsApp order: `src/components/CommerceUI.tsx`
- App routing and cart state: `src/App.tsx`
- Catalog: `src/data/shopData.ts`, `src/data/ownerProducts.ts`,
  `src/data/ownerProductsBatch2.ts`, `src/data/ownerProductsBatch3.ts`
- Server-validated prices: `src/data/checkoutCatalog.js`
- Payment integration: `api/checkout.ts`, `api/checkout-status.ts`
- Payment setup requirements: `docs/CHECKOUT_SETUP.md`
- Photos/covers: `public/assets/`

## Required care
1. Preserve existing products, prices, pictures, original course images,
   galleries, service pages, language switcher (EN, PT, ES), responsiveness
   and the Nexcode credit unless explicitly asked to change them.
2. Prices are USD. Never invent, assume or silently change a price. Some
   products have no confirmed price and must remain "price on request".
3. If changing a sellable product price or option, update both the shop data
   and `src/data/checkoutCatalog.js` so Stripe cannot charge a different
   price from the cart.
4. Never commit API keys, personal credentials, Stripe secrets or deploy
   hook URLs. The live payment checkout is NOT enabled until the merchant
   connects their own Stripe and confirms shipping, taxes and stock.
   WhatsApp orders are requests, not completed payments.
5. Maintain accessible mobile, tablet and desktop layouts and avoid
   duplicate floating buttons, image cropping, overlapping content,
   broken links or disabled cart controls.
6. Keep changes targeted. Inspect existing components before changing.
   Run `npm install`, `npm run lint` and `npm run build` if supported.
   Fix failures without removing functionality.
7. Prefer a feature branch and a pull request for review. If write access
   is absent, request collaborator access or fork and open a pull request.
   Do not request the owner's password or token.
8. Always summarize changed files, confirmed checks, commit/PR and
   whether Vercel production actually deployed.

## Client workflow
Read `GUIA_CLIENTE_CHATGPT.md` and follow the client's latest request.
