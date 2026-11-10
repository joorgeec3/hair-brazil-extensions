import React, { useEffect } from 'react';
type Props = {
  currentPath: string;
};

/**
 * Reveals sections and cards only as they enter the viewport.
 * Floating actions and back-to-top live in CommerceUI to prevent overlap.
 */
export const ScrollEnhancements: React.FC<Props> = ({ currentPath }) => {
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

  return null;
};
