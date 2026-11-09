import React, { useState } from 'react';
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { SHOP_COPY, SHOP_PRODUCTS, Language } from '../data/shopData';

interface Props {
  id: string;
  language: Language;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAdd: (id: string, option?: string) => void;
  onNavigate: (path: string) => void;
}

const currency = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const ProductDetailPage: React.FC<Props> = ({
  id, language, favorites, onToggleFavorite, onAdd, onNavigate
}) => {
  const product = SHOP_PRODUCTS.find((item) => item.id === id);
  const copy = SHOP_COPY[language];
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(product?.options?.[0]?.label ?? '');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="min-h-[70vh] bg-[#fffefa] px-5 pb-24 pt-40 text-[#241f1b]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif-editorial text-5xl">{copy.empty}</h1>
          <button onClick={() => onNavigate('/shop')} className="mt-8 border-b border-[#241f1b] pb-1 text-xs uppercase">
            {copy.continue}
          </button>
        </div>
      </section>
    );
  }

  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  const mainImage = images[selectedImage] ?? images[0];
  const activeOption = product.options?.find((option) => option.label === selectedOption) ?? product.options?.[0];
  const displayPrice = activeOption?.price ?? product.price;
  const hasOptions = Boolean(product.options?.length);

  const handleAdd = () => {
    if (displayPrice == null) return;
    for (let i = 0; i < quantity; i += 1) {
      onAdd(product.id, activeOption?.label);
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <section className="min-h-screen bg-[#fffefa] px-5 pb-24 pt-36 text-[#241f1b] sm:px-10">
      <div className="mx-auto max-w-[1300px]">
        <button
          type="button"
          onClick={() => onNavigate(product.category === 'Training & Courses' ? '/courses' : '/shop')}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[.14em] text-[#876b47] hover:text-[#241f1b]"
        >
          <ArrowLeft size={15} /> {copy.continue}
        </button>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#f3f1ed]">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="h-full w-full object-contain"
                  fetchPriority="high"
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-[#a08c73]">
                  <ShoppingBag size={40} strokeWidth={1} />
                  <span className="text-xs">{copy.photoPending}</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6">
                {images.map((photo, index) => (
                  <button
                    type="button"
                    key={photo}
                    onClick={() => setSelectedImage(index)}
                    aria-label={'Photo ' + (index + 1)}
                    aria-pressed={selectedImage === index}
                    className={'aspect-square overflow-hidden border bg-[#f3f1ed] transition ' +
                      (selectedImage === index ? 'border-[#9a7c54] ring-1 ring-[#9a7c54]' : 'border-[#241f1b]/10 hover:border-[#9a7c54]/50')}
                  >
                    <img src={photo} alt={product.name + ' - view ' + (index + 1)} loading="lazy" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0 lg:pt-10">
            <p className="text-[10px] uppercase tracking-[.22em] text-[#9a7c54]">{product.category}</p>
            <h1 className="mt-4 font-serif-editorial text-[clamp(2.7rem,5vw,5rem)] leading-[1.01]">
              {product.name}
            </h1>
            <p className={"mt-7 text-[25px] font-medium tracking-tight " + (product.compareAtPrice != null && displayPrice != null && product.compareAtPrice > displayPrice ? "text-[#b64132]" : "")}>
              {displayPrice != null ? currency(displayPrice) : copy.request}
              {displayPrice != null && <span className="ml-2 text-xs font-normal text-[#877e75]">USD</span>}
            </p>
            {product.compareAtPrice != null && displayPrice != null && product.compareAtPrice > displayPrice && (
              <p className="mt-2 flex items-center gap-3 text-sm"><span className="line-through text-[#8f867c]">{currency(product.compareAtPrice)}</span><span className="bg-[#6e5146] px-2 py-1 text-[10px] uppercase tracking-widest text-white">{language === 'PT' ? 'Oferta' : language === 'ES' ? 'Oferta' : 'Sale'}</span></p>
            )}
            {product.id === 'hb-55' && <p className="mt-3 text-xs font-semibold uppercase tracking-[.15em] text-[#946c4b]">Limited Edition</p>}
            {product.description && (
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#655d54]">{product.description}</p>
            )}
            {hasOptions && (
              <div className="mt-9 border-t border-[#241f1b]/10 pt-7">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[.13em]">
                  {language === 'PT' ? 'Escolha o tamanho' : language === 'ES' ? 'Elige el tamaño' : 'Select length'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.options!.map((option) => (
                    <button
                      type="button"
                      key={option.label}
                      onClick={() => setSelectedOption(option.label)}
                      aria-pressed={activeOption?.label === option.label}
                      className={'border px-5 py-3 text-xs transition ' +
                        (activeOption?.label === option.label ? 'border-[#241f1b] bg-[#241f1b] text-white' : 'border-[#241f1b]/20 hover:border-[#241f1b]')}
                    >
                      {option.label} · {currency(option.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {!hasOptions && product.variants.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[.13em]">Available options</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => <span key={variant} className="border border-[#241f1b]/20 px-4 py-2 text-xs">{variant}</span>)}
                </div>
              </div>
            )}
            <p className="mt-7 text-xs text-[#9a8876]">{copy.unavailable}</p>
            <div className="mt-7 flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-[#70645a]">
                {language === 'PT' ? 'Quantidade' : language === 'ES' ? 'Cantidad' : 'Quantity'}
              </span>
              <div className="flex h-11 items-center border border-[#241f1b]/20">
                <button type="button" onClick={() => setQuantity((n) => Math.max(1, n - 1))} className="flex h-11 w-11 items-center justify-center" aria-label="Decrease quantity"><Minus size={15}/></button>
                <span className="min-w-7 text-center text-sm">{quantity}</span>
                <button type="button" onClick={() => setQuantity((n) => n + 1)} className="flex h-11 w-11 items-center justify-center" aria-label="Increase quantity"><Plus size={15}/></button>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={displayPrice == null}
                onClick={handleAdd}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-3 bg-[#241f1b] px-6 py-3 text-xs uppercase tracking-[.15em] text-white transition hover:bg-[#9a7c54] disabled:opacity-40"
              >
                {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                {added ? copy.added : copy.add}
              </button>
              <button
                type="button"
                onClick={() => onToggleFavorite(product.id)}
                aria-label={copy.favorites}
                aria-pressed={favorites.includes(product.id)}
                className="flex h-12 w-12 items-center justify-center border border-[#241f1b]/20 hover:border-[#9a7c54]"
              >
                <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="mt-10 border-t border-[#241f1b]/10 pt-6">
              <p className="text-xs leading-6 text-[#8d8379]">{copy.shipping}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
