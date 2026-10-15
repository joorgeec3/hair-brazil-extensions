import React, { useEffect, useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommerceUI } from './components/CommerceUI';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServicesPage } from './pages/ServicesPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { Language, SHOP_PRODUCTS } from './data/shopData';

type BagItem = { id: string; quantity: number };
const readStorage = <T,>(key: string, fallback: T): T => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } };

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('hbe-language') as Language) || 'EN');
  const [bag, setBag] = useState<BagItem[]>(() => readStorage<BagItem[]>('hbe-bag', []));
  const [favorites, setFavorites] = useState<string[]>(() => readStorage<string[]>('hbe-favorites', []));
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  useEffect(() => { const onPop = () => setCurrentPath(window.location.pathname || '/'); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { localStorage.setItem('hbe-favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('hbe-language', language); }, [language]);
  const navigate = (path: string) => { if (path !== currentPath) { window.history.pushState({}, '', path); setCurrentPath(path); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const toggleFavorite = (id: string) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const addToBag = (id: string) => { const product = SHOP_PRODUCTS.find((item) => item.id === id); if (!product || product.price == null) return; setBag((items) => items.some((item) => item.id === id) ? items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { id, quantity: 1 }]); };
  const bagCount = useMemo(() => bag.reduce((sum, item) => sum + item.quantity, 0), [bag]);
  const openBooking = () => window.open('https://wa.me/13053001475?text=Hi%21%20I%20would%20like%20to%20schedule%20an%20appointment%20at%20Hair%20Brazil%20Extensions.', '_blank', 'noopener,noreferrer');
  const renderPage = () => { const normalized = currentPath.replace(/\/+$/, '') || '/';
    if (normalized === '/') return <HomePage onNavigate={navigate} onOpenBooking={openBooking}/>;
    if (normalized === '/about' || normalized === '/studio') return <AboutPage onOpenBooking={openBooking}/>;
    if (normalized === '/services') return <ServicesPage onNavigate={navigate}/>;
    if (normalized === '/shop' || normalized === '/courses') return <ShopPage language={language} favorites={favorites} onToggleFavorite={toggleFavorite} onAdd={addToBag} onNavigate={navigate}/>;
    if (normalized === '/favorites') return <ShopPage language={language} favorites={favorites} onToggleFavorite={toggleFavorite} onAdd={addToBag} onNavigate={navigate} favoritesOnly/>;
    if (normalized.startsWith('/shop/')) return <ProductDetailPage id={normalized.replace('/shop/', '')} language={language} favorites={favorites} onToggleFavorite={toggleFavorite} onAdd={addToBag} onNavigate={navigate}/>;
    if (normalized === '/gallery') return <ServicesPage onNavigate={navigate}/>;
    if (normalized === '/contact' || normalized === '/booking') return <ContactPage/>;
    if (normalized.startsWith('/services/')) return <ServiceDetailPage slug={normalized.replace('/services/', '')} onOpenBooking={openBooking} onNavigate={navigate}/>;
    if (normalized === '/privacy-policy' || normalized === '/legal/privacy-policy') return <LegalPage type="privacy" onNavigate={navigate}/>;
    if (normalized === '/terms-of-service' || normalized === '/legal/terms-of-service') return <LegalPage type="terms" onNavigate={navigate}/>;
    return <NotFoundPage onNavigate={navigate}/>;
  };
  return <div className="relative min-h-screen bg-[#171414] text-[#f4efe6] flex flex-col font-sans-ui selection:bg-[#d7bb83] selection:text-[#171414]"><div className="fixed inset-0 pointer-events-none grain-overlay z-30"/><Navbar currentPath={currentPath} onNavigate={navigate} onOpenBooking={openBooking} language={language} onLanguage={setLanguage} bagCount={bagCount} favoriteCount={favorites.length} onBag={() => setBagOpen(true)} onFavorites={() => setFavoritesOpen(true)}/><main className="flex-1 w-full">{renderPage()}</main><Footer onNavigate={navigate}/><CommerceUI language={language} bag={bag} favorites={favorites} onSetBag={setBag} onNavigate={navigate} onToggleFavorite={toggleFavorite} onAdd={addToBag} bagOpen={bagOpen} setBagOpen={setBagOpen} favoritesOpen={favoritesOpen} setFavoritesOpen={setFavoritesOpen}/></div>;
}
