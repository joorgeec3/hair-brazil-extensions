import React, { useEffect, useState } from 'react';
import { ArrowUp, Calendar, Heart, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { SHOP_COPY, SHOP_PRODUCTS, Language } from '../data/shopData';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../data/siteData';

type BagItem = { id: string; quantity: number; option?: string };
interface Props {
  language: Language;
  bag: BagItem[];
  favorites: string[];
  onSetBag: React.Dispatch<React.SetStateAction<BagItem[]>>;
  onNavigate: (path: string) => void;
  onToggleFavorite: (id: string) => void;
  onAdd: (id: string, option?: string) => void;
  bagOpen: boolean;
  setBagOpen: React.Dispatch<React.SetStateAction<boolean>>;
  favoritesOpen: boolean;
  setFavoritesOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export const CommerceUI: React.FC<Props> = ({
  language, bag, favorites, onSetBag, onNavigate, onToggleFavorite, onAdd,
  bagOpen, setBagOpen, favoritesOpen, setFavoritesOpen
}) => {
  const copy = SHOP_COPY[language];
  const [showToTop, setShowToTop] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setShowToTop(window.scrollY > 480);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  const topLabel = language === 'PT' ? 'Voltar ao topo' : language === 'ES' ? 'Volver arriba' : 'Back to top';
  const details = bag.map((item) => {
    const product = SHOP_PRODUCTS.find((p) => p.id === item.id);
    const unitPrice = product?.options?.find((choice) => choice.label === item.option)?.price ?? product?.price ?? 0;
    return { ...item, product, unitPrice };
  }).filter((item) => item.product);
  const count = bag.reduce((sum, item) => sum + item.quantity, 0);
  const total = details.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  useEffect(() => { localStorage.setItem('hbe-bag', JSON.stringify(bag)); }, [bag]);

  const sameLine = (item: BagItem, id: string, option?: string) =>
    item.id === id && (item.option || '') === (option || '');
  const change = (id: string, option: string | undefined, delta: number) =>
    onSetBag((items) => items.map((item) => sameLine(item, id, option)
      ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const remove = (id: string, option?: string) =>
    onSetBag((items) => items.filter((item) => !sameLine(item, id, option)));

  return (
    <>
      {/* Compact mobile dock: the bag is already in the header and booking is in the menu.
          Avoid covering the image, thumbnails and product title with redundant buttons. */}
      <div
        data-floating-actions
        className="fixed right-3 z-40 flex flex-col items-end gap-2.5 sm:right-5 lg:right-6"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)' }}
      >
        <div className="flex items-center justify-end gap-2">
          {showToTop && (
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={topLabel}
              title={topLabel}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7bb83]/60 bg-[#211b19] text-[#f4e1bc] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-[#d7bb83] hover:text-[#171414] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7bb83]"
            >
              <ArrowUp size={19} strokeWidth={1.8} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setBagOpen(true)}
            aria-label={copy.bag}
            title={copy.bag}
            className="relative hidden h-11 w-11 items-center justify-center rounded-full bg-[#d7bb83] text-[#171414] shadow-lg transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7bb83] lg:flex"
          >
            <ShoppingBag size={19} />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#171414] text-[10px] text-[#f4efe6]">{count}</span>}
          </button>
        </div>
        <a
          href={getWhatsAppLink(WHATSAPP_MESSAGES.consultation)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 min-w-[148px] items-center justify-center gap-2 rounded-full bg-[#171414] px-5 py-3 text-[11px] font-semibold uppercase tracking-[.1em] text-[#f4efe6] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5b3935] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7bb83] lg:inline-flex"
        >
          <Calendar size={15} /> Book Now
        </a>
        <a
          href={getWhatsAppLink(WHATSAPP_MESSAGES.consultation)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-[#d7bb83] text-[#171414] shadow-[0_8px_24px_rgba(0,0,0,.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e8d0a2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171414] lg:h-12 lg:w-auto lg:min-w-[148px] lg:px-5"
        >
          <MessageCircle size={21} strokeWidth={1.8} aria-hidden="true" />
          <span className="hidden text-[11px] font-semibold tracking-[.03em] lg:inline">WhatsApp</span>
        </a>
      </div>

      {bagOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40" onClick={() => setBagOpen(false)}>
          <aside onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={copy.bag} className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-[#f4efe6] p-6 text-[#171414] shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-editorial text-3xl">{copy.bag}</h2>
              <button onClick={() => setBagOpen(false)} aria-label="Close"><X/></button>
            </div>
            {details.length === 0 ? (
              <div className="py-24 text-center text-sm text-[#171414]/60">
                {copy.emptyBag}
                <button onClick={() => { setBagOpen(false); onNavigate('/shop'); }} className="mx-auto mt-6 block rounded-full bg-[#171414] px-5 py-3 text-xs uppercase tracking-wider text-[#f4efe6]">{copy.continue}</button>
              </div>
            ) : (
              <>
                <div className="mt-8 space-y-5">
                  {details.map(({ product, quantity, option, unitPrice }) => (
                    <div key={product!.id + ':' + (option || '')} className="flex gap-4 border-b border-[#171414]/15 pb-5">
                      <div className="h-20 w-20 shrink-0 overflow-hidden bg-[#eee9e1]">
                        {product?.image && <img src={product.image} alt={product.name} className="h-full w-full object-contain"/>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif-editorial text-xl">{product?.name}</p>
                        {option && <p className="mt-1 text-xs text-[#866c4c]">{option}</p>}
                        <p className="mt-1 text-sm">{money(unitPrice)}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <button onClick={() => change(product!.id, option, -1)} aria-label="Decrease quantity" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#171414]/20"><Minus size={12}/></button>
                          <span className="text-sm">{quantity}</span>
                          <button onClick={() => change(product!.id, option, 1)} aria-label="Increase quantity" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#171414]/20"><Plus size={12}/></button>
                          <button onClick={() => remove(product!.id, option)} className="ml-auto text-[#927648]" aria-label="Remove"><Trash2 size={15}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between border-t border-[#171414]/20 pt-5 font-semibold">
                  <span>Total</span><span>{money(total)}</span>
                </div>
                <p className="mt-3 text-xs leading-5 text-[#171414]/50">{copy.shipping}</p>
                <button disabled className="mt-5 w-full cursor-not-allowed rounded-full border border-[#171414]/20 py-3.5 text-xs uppercase tracking-wider text-[#171414]/45">
                  {copy.checkoutSoon}
                </button>
              </>
            )}
          </aside>
        </div>
      )}

      {favoritesOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40" onClick={() => setFavoritesOpen(false)}>
          <aside onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={copy.favorites} className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-[#211b19] p-6 text-[#f4efe6] sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-editorial text-3xl">{copy.favorites}</h2>
              <button onClick={() => setFavoritesOpen(false)} aria-label="Close"><X/></button>
            </div>
            {favorites.length === 0 ? (
              <p className="py-24 text-center text-sm text-[#f4efe6]/60">{copy.noFavorites}</p>
            ) : (
              <div className="mt-8 space-y-3">
                {favorites.map((id) => {
                  const product = SHOP_PRODUCTS.find((item) => item.id === id);
                  return product ? (
                    <div key={id} className="flex items-center justify-between gap-3 border-b border-[#f4efe6]/15 py-3">
                      <button onClick={() => { setFavoritesOpen(false); onNavigate('/shop/' + id); }} className="text-left text-sm">{product.name}</button>
                      <div className="flex shrink-0 items-center gap-3">
                        <button onClick={() => onAdd(id, product.options?.[0]?.label)} disabled={product.price == null} className="text-[10px] uppercase tracking-wider text-[#d7bb83] disabled:opacity-40">{copy.add}</button>
                        <button onClick={() => onToggleFavorite(id)} aria-label="Remove favorite"><Heart size={16} fill="currentColor" className="text-[#d7bb83]"/></button>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Favorites remain available in the desktop header and mobile menu. */}
    </>
  );
};
