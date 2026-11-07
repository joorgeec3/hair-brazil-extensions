import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Heart, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import { SHOP_COPY, SHOP_PRODUCTS, Language } from '../data/shopData';

interface Props {
  language: Language;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAdd: (id: string) => void;
  onNavigate: (path: string) => void;
  favoritesOnly?: boolean;
}

const LABELS = {
  EN: {
    eyebrow: 'HAIR BRAZIL EXTENSIONS / THE BOUTIQUE',
    heading: 'Shop',
    intro: 'Discover our curated selection of professional hair essentials.',
    home: 'Home',
    shop: 'Shop',
    browse: 'Browse',
    categories: 'Categories',
    allItems: 'All items',
    collection: 'The collection',
    product: 'product',
    products: 'products',
    searchPlaceholder: 'Search products',
    noMatch: 'No items found',
    noMatchText: 'Try another search or choose a different category.',
    reset: 'Clear filters',
    availability: 'Availability to confirm',
    view: 'View product',
    photo: 'Product image coming soon',
    sortTitle: 'Sort:',
    catalogNote: 'Product availability and details will be confirmed as the new catalog is added.',
    curated: 'Thoughtfully selected for beautiful hair.',
    yourFavorites: 'Your favorites',
    filterTitle: 'Shop by category'
  },
  PT: {
    eyebrow: 'HAIR BRAZIL EXTENSIONS / A BOUTIQUE',
    heading: 'Loja',
    intro: 'Explore nossa seleção de produtos e acessórios capilares profissionais.',
    home: 'Início',
    shop: 'Loja',
    browse: 'Explorar',
    categories: 'Categorias',
    allItems: 'Todos os produtos',
    collection: 'A coleção',
    product: 'produto',
    products: 'produtos',
    searchPlaceholder: 'Pesquisar produtos',
    noMatch: 'Nenhum produto encontrado',
    noMatchText: 'Tente outra busca ou escolha uma categoria diferente.',
    reset: 'Limpar filtros',
    availability: 'Disponibilidade a confirmar',
    view: 'Ver produto',
    photo: 'Imagem em breve',
    sortTitle: 'Ordenar:',
    catalogNote: 'A disponibilidade e os detalhes serão confirmados com a inclusão do novo catálogo.',
    curated: 'Uma seleção especial para cabelos lindos.',
    yourFavorites: 'Seus favoritos',
    filterTitle: 'Comprar por categoria'
  },
  ES: {
    eyebrow: 'HAIR BRAZIL EXTENSIONS / LA BOUTIQUE',
    heading: 'Tienda',
    intro: 'Explora nuestra selección de productos y accesorios capilares profesionales.',
    home: 'Inicio',
    shop: 'Tienda',
    browse: 'Explorar',
    categories: 'Categorías',
    allItems: 'Todos los productos',
    collection: 'La colección',
    product: 'producto',
    products: 'productos',
    searchPlaceholder: 'Buscar productos',
    noMatch: 'No se encontraron productos',
    noMatchText: 'Prueba otra búsqueda o selecciona otra categoría.',
    reset: 'Borrar filtros',
    availability: 'Disponibilidad por confirmar',
    view: 'Ver producto',
    photo: 'Imagen próximamente',
    sortTitle: 'Ordenar:',
    catalogNote: 'La disponibilidad y los detalles se confirmarán al agregar el nuevo catálogo.',
    curated: 'Una selección especial para un cabello hermoso.',
    yourFavorites: 'Tus favoritos',
    filterTitle: 'Comprar por categoría'
  }
} as const;

const currency = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const ShopPage: React.FC<Props> = ({
  language,
  favorites,
  onToggleFavorite,
  onNavigate,
  favoritesOnly = false
}) => {
  const copy = SHOP_COPY[language];
  const labels = LABELS[language];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(SHOP_PRODUCTS.map((item) => item.category))),
    []
  );

  const products = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return SHOP_PRODUCTS.filter((item) => {
      if (favoritesOnly && !favorites.includes(item.id)) return false;
      if (category !== 'all' && item.category !== category) return false;
      return !search || [item.name, item.description, item.category]
        .join(' ').toLocaleLowerCase().includes(search);
    }).sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'low') return (a.price ?? Infinity) - (b.price ?? Infinity);
      if (sort === 'high') return (b.price ?? -1) - (a.price ?? -1);
      return 0;
    });
  }, [query, category, sort, favoritesOnly, favorites]);

  const clearFilters = () => {
    setQuery('');
    setCategory('all');
    setSort('featured');
  };

  const chooseCategory = (value: string) => {
    setCategory(value);
    setFiltersOpen(false);
  };

  const categoryOptions = [{ value: 'all', title: labels.allItems }, ...categories.map((name) => ({ value: name, title: name }))];
  const filtersApplied = query.trim().length > 0 || category !== 'all' || sort !== 'featured';

  const renderCategories = () => (
    <div className="space-y-1">
      {categoryOptions.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => chooseCategory(item.value)}
          aria-pressed={category === item.value}
          className={[
            'flex w-full items-center justify-between gap-2 py-3 px-1 border-b border-[#261d1a]/10 text-left text-[13px] transition-colors',
            category === item.value ? 'text-[#7d5b31] font-semibold' : 'text-[#514b46] hover:text-[#7d5b31]'
          ].join(' ')}
        >
          <span>{item.title}</span>
          {category === item.value && <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      ))}
    </div>
  );

  return (
    <section className="min-h-[80vh] bg-[#fffefa] text-[#241f1b]">
      <div className="border-b border-[#241f1b]/10 bg-[#f8f6f1] px-5 pt-36 pb-11 sm:px-8 sm:pt-40 sm:pb-14">
        <div className="mx-auto max-w-[1380px]">
          <nav className="mb-8 flex items-center gap-2 text-[11px] tracking-wide text-[#80776b]" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('/')} className="transition hover:text-[#241f1b]">{labels.home}</button>
            <span aria-hidden="true">/</span>
            <span className="text-[#241f1b]">{labels.shop}</span>
          </nav>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[.27em] text-[#957b54]">{labels.eyebrow}</p>
              <h1 className="font-serif-editorial text-[clamp(3.7rem,8vw,7.1rem)] leading-[.85] tracking-tight">
                {favoritesOnly ? labels.yourFavorites : labels.heading}
              </h1>
              <p className="mt-7 max-w-[530px] text-[14px] leading-7 text-[#635b53]">{labels.intro}</p>
            </div>
            <div className="hidden md:block text-right">
              <span className="block font-serif-editorial text-[30px] italic text-[#a98d65]">Hair Brazil</span>
              <span className="text-[9px] tracking-[.35em] uppercase text-[#8b7d6c]">Extensions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1380px] px-5 pb-24 pt-9 sm:px-8 lg:pt-14">
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[215px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[230px_minmax(0,1fr)] xl:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 border-b border-[#241f1b]/20 pb-4 text-[11px] font-semibold uppercase tracking-[.18em]">{labels.categories}</p>
              {renderCategories()}
              {filtersApplied && (
                <button type="button" onClick={clearFilters} className="mt-6 text-xs underline underline-offset-4 hover:text-[#957b54]">
                  {labels.reset}
                </button>
              )}
              <div className="mt-16 border-t border-[#241f1b]/15 pt-6">
                <span className="font-serif-editorial text-[23px] italic text-[#9a7c54]">Hair Brazil Extensions</span>
                <p className="mt-3 max-w-[180px] text-xs leading-6 text-[#8a8178]">{labels.curated}</p>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-x-5 gap-y-4 border-b border-[#241f1b]/15 pb-5">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[.2em] text-[#9a7c54]">{labels.collection}</p>
                <h2 className="font-serif-editorial text-[30px] leading-none sm:text-[37px]">
                  {category === 'all' ? labels.allItems : category}
                </h2>
                <span className="mt-3 block text-xs text-[#877e75]">
                  {products.length} {products.length === 1 ? labels.product : labels.products}
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-5">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex h-10 items-center gap-2 border border-[#241f1b]/20 px-3 text-xs lg:hidden"
                >
                  <SlidersHorizontal size={15} strokeWidth={1.6} /> {copy.filters}
                </button>
                <label className="relative hidden sm:block">
                  <Search size={16} strokeWidth={1.6} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b8075]" aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={labels.searchPlaceholder}
                    aria-label={labels.searchPlaceholder}
                    className="h-10 w-44 border border-[#241f1b]/20 bg-transparent pl-9 pr-3 text-xs outline-none transition focus:border-[#9a7c54] xl:w-52"
                  />
                </label>
                <label className="relative flex items-center gap-2 text-xs">
                  <span className="hidden xl:inline text-[#867d74]">{labels.sortTitle}</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    aria-label={copy.sort}
                    className="h-10 min-w-[126px] appearance-none border border-[#241f1b]/20 bg-transparent px-3 pr-8 text-xs outline-none focus:border-[#9a7c54]"
                  >
                    <option value="featured">{copy.featured}</option>
                    <option value="low">{copy.low}</option>
                    <option value="high">{copy.high}</option>
                    <option value="name">{copy.name}</option>
                  </select>
                  <ChevronDown size={13} className="pointer-events-none absolute right-3 text-[#796e62]" />
                </label>
              </div>
            </div>

            <label className="relative mb-5 block sm:hidden">
              <Search size={16} strokeWidth={1.6} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#82776b]" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label={labels.searchPlaceholder}
                placeholder={labels.searchPlaceholder}
                className="h-11 w-full border border-[#241f1b]/20 bg-transparent pl-10 pr-4 text-sm outline-none focus:border-[#9a7c54]"
              />
            </label>

            {filtersApplied && (
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {category !== 'all' && <button type="button" onClick={() => chooseCategory('all')} className="flex items-center gap-2 border border-[#241f1b]/15 px-3 py-1.5 text-xs">{category}<X size={12} /></button>}
                <button type="button" onClick={clearFilters} className="text-xs underline underline-offset-4 text-[#8b704e]">{labels.reset}</button>
              </div>
            )}

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <article key={product.id} className="group min-w-0">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f1eee9]">
                      <button
                        type="button"
                        onClick={() => onNavigate('/shop/' + product.id)}
                        className="absolute inset-0 block h-full w-full"
                        aria-label={labels.view + ': ' + product.name}
                      >
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className={'h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.035] ' + (product.id.startsWith('owner-') ? 'object-contain p-2' : 'object-cover')}
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-3 text-[#b2a594]">
                            <ShoppingBag size={30} strokeWidth={1} />
                            <span className="text-center text-[10px] tracking-wide">{labels.photo}</span>
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        aria-label={copy.favorites + ': ' + product.name}
                        aria-pressed={favorites.includes(product.id)}
                        onClick={() => onToggleFavorite(product.id)}
                        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#fffefa]/95 text-[#3a322b] shadow-sm transition hover:scale-105 hover:text-[#a8875b]"
                      >
                        <Heart size={16} strokeWidth={1.5} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('/shop/' + product.id)}
                        className="absolute inset-x-0 bottom-0 hidden w-full items-center justify-center gap-2 bg-[#241f1b]/90 px-3 py-3 text-[10px] uppercase tracking-[.13em] text-white transition-all duration-200 hover:bg-[#9a7c54] sm:flex sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0"
                      >
                        {labels.view} <ArrowRight size={13} />
                      </button>
                    </div>
                    <div className="pt-4">
                      <p className="mb-1.5 text-[10px] uppercase tracking-[.12em] text-[#9e8f7e]">{product.category}</p>
                      <button
                        type="button"
                        onClick={() => onNavigate('/shop/' + product.id)}
                        className="block text-left text-[13px] font-medium leading-5 text-[#241f1b] transition-colors hover:text-[#9a7c54] sm:text-[14px]"
                      >
                        {product.name}
                      </button>
                      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        {product.price != null ? (
                          <span className="text-[13px] font-semibold text-[#241f1b]">
                            {product.priceFrom ? 'From ' : ''}{currency(product.price)}
                          </span>
                        ) : (
                          <span className="text-xs text-[#8f8172]">{copy.request}</span>
                        )}
                        {product.compareAtPrice != null && product.price != null && product.compareAtPrice > product.price && (
                          <span className="text-xs text-[#a69d94] line-through">{currency(product.compareAtPrice)}</span>
                        )}
                      </div>
                      {!product.available && <p className="mt-2 text-[10px] text-[#948578]">{labels.availability}</p>}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="border border-[#241f1b]/10 bg-[#f8f6f1] px-6 py-20 text-center">
                <ShoppingBag size={33} strokeWidth={1.2} className="mx-auto text-[#a68c67]" />
                <h3 className="mt-5 font-serif-editorial text-3xl">{labels.noMatch}</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#7b736a]">
                  {favoritesOnly ? copy.noFavorites : labels.noMatchText}
                </p>
                <button type="button" onClick={clearFilters} className="mt-6 border-b border-[#241f1b] pb-1 text-xs uppercase tracking-wider">
                  {labels.reset}
                </button>
              </div>
            )}
            <p className="mt-16 border-t border-[#241f1b]/10 pt-5 text-[11px] leading-relaxed text-[#9a9188]">
              {labels.catalogNote}
            </p>
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[90] bg-[#171414]/50 lg:hidden" onClick={() => setFiltersOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={labels.filterTitle}
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-y-0 left-0 flex w-[min(85vw,350px)] flex-col overflow-y-auto bg-[#fffefa] px-6 py-7 shadow-2xl"
          >
            <div className="mb-7 flex items-center justify-between border-b border-[#241f1b]/15 pb-5">
              <h2 className="font-serif-editorial text-3xl">{labels.categories}</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="p-2">
                <X size={21} />
              </button>
            </div>
            {renderCategories()}
            {filtersApplied && <button type="button" onClick={() => { clearFilters(); setFiltersOpen(false); }} className="mt-7 self-start text-xs underline underline-offset-4">{labels.reset}</button>}
          </div>
        </div>
      )}
    </section>
  );
};
