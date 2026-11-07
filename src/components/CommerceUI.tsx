import React, { useEffect } from 'react';
import { ArrowUp, Calendar, Heart, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
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
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <button onClick={() => setBagOpen(true)} aria-label={copy.bag} className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#d7bb83] text-[#171414] shadow-xl transition hover:scale-105">
          <ShoppingBag size={19}/>
          {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#171414] text-[10px] text-[#f4efe6]">{count}</span>}
        </button>
        <a href={getWhatsAppLink(WHATSAPP_MESSAGES.consultation)} target="_blank" rel="noreferrer" className="rounded-full bg-[#171414] px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#f4efe6] shadow-xl">
          <Calendar size={14} className="mr-2 inline"/>Book Now
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7bb83]/50 bg-[#171414]/90 text-[#d7bb83]">
          <ArrowUp size={15}/>
        </button>
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

      <button onClick={() => setFavoritesOpen(true)} aria-label={copy.favorites} className="fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#f4efe6] text-[#171414] shadow-xl">
        <Heart size={18} fill={favorites.length ? 'currentColor' : 'none'}/>
      </button>
    </>
  );
};
