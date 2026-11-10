import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import type { Language } from '../data/shopData';

type Props = {
  currentPath: string;
  language: Language;
};

/**
 * Reveals sections and cards only as they enter the viewport, and offers a
 * context-aware back-to-top control above the existing homepage WhatsApp link.
 */
export const ScrollEnhancements: React.FC<Props> = ({ currentPath, language }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setShowBackToTop(window.scrollY > 480);
        frame = 0;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !('IntersectionObserver' in window)) return;

    let frame = 0;
    let observer: IntersectionObserver | undefined;
    frame = window.requestAnimationFrame(() => {
      const scope = document.querySelector('main');
      if (!scope) return;

      const elements = Array.from(
        scope.querySelectorAll<HTMLElement>('section, article, .grid > button')
      ).filter((element) => {
        if (element.closest('[role="dialog"]')) return false;
        if (element.matches('section') && element.parentElement?.closest('section')) return false;
        if (element.querySelector('#hair-brazil-hero-title')) return false;
        return true;
      });

      observer = new IntersectionObserver((entries, activeObserver) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('hb-reveal-visible');
          activeObserver.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

      for (const element of elements) {
        const bounds = element.getBoundingClientRect();
        // Do not conceal or reanimate anything already visible when a page opens.
        if (bounds.top < window.innerHeight * 0.88 || bounds.bottom <= 0) continue;
        element.classList.add('hb-scroll-reveal');
        observer.observe(element);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [currentPath]);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const backToTopLabel =
    language === 'PT' ? 'Voltar ao topo'
      : language === 'ES' ? 'Volver arriba'
      : 'Back to top';

  return (
    <button
      type="button"
      aria-label={backToTopLabel}
      title={backToTopLabel}
      onClick={scrollToTop}
      disabled={!showBackToTop}
      tabIndex={showBackToTop ? 0 : -1}
      aria-hidden={!showBackToTop}
      className={[
        'fixed right-5 z-40 inline-flex h-12 w-12 items-center justify-center',
        'rounded-full border border-[#d7bb83]/60 bg-[#211b19]/95 text-[#f4e1bc]',
        'shadow-[0_10px_26px_rgba(0,0,0,.23)] backdrop-blur-md',
        'transition-[opacity,transform,background-color,color] duration-300 ease-out',
        'hover:-translate-y-1 hover:bg-[#d7bb83] hover:text-[#171414]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d7bb83]',
        currentPath === '/' ? 'bottom-[92px]' : 'bottom-5',
        showBackToTop ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-90 opacity-0'
      ].join(' ')}
    >
      <ArrowUp size={21} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
};
