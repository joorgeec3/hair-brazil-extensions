import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, ShoppingBag } from 'lucide-react';

interface Props { onNavigate: (path: string) => void; }

/**
 * Editorial homepage hero, inspired by the approved Hair Brazil Extensions mockup.
 * The photograph is from the owner's Bella Beauty Brazil repository.
 * All text and calls to action are real, accessible HTML instead of text baked into a banner.
 */
const editorialPortrait =
  'https://raw.githubusercontent.com/joorgeec3/Bella-Beauty-Brazil/bella-final-review-12-onward/public/assets/bella/hero.png';
const localFallback = '/assets/hair-brazil-hero-blonde-nov-2026.jpg';

export const Hero: React.FC<Props> = ({ onNavigate }) => {
  const [ready, setReady] = useState(false);
  const [photo, setPhoto] = useState(editorialPortrait);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 60);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[720px] w-full items-center justify-center overflow-hidden bg-[#432d30] text-[#fff5ec] sm:min-h-[800px] lg:min-h-[min(900px,100svh)]"
      aria-labelledby="hair-brazil-hero-title"
    >
      <motion.div
        className="absolute inset-0 -z-20 overflow-hidden"
        initial={{ scale: 1.035, opacity: 0.5 }}
        animate={{ scale: ready ? 1 : 1.035, opacity: ready ? 1 : 0.5 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={photo}
          onError={() => setPhoto((current) => current === localFallback ? current : localFallback)}
          alt="Editorial portrait with a pink rose, representing the premium beauty experience"
          fetchPriority="high"
          className="h-full w-full object-cover object-[43%_center] sm:object-center"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(55,30,31,.45)_0%,rgba(61,30,34,.36)_40%,rgba(61,30,34,.46)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(39,20,25,.78)_0%,rgba(61,37,40,.24)_49%,rgba(47,28,32,.30)_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[16%] z-0 overflow-hidden text-center font-serif-editorial text-[24vw] leading-none tracking-[.11em] text-white/[.045] select-none" >
        HAIR BRAZIL
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 22 }}
        transition={{ delay: .15, duration: .85, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex w-full max-w-[1420px] flex-col items-center px-5 pb-16 pt-36 text-center drop-shadow-[0_2px_24px_rgba(30,10,17,.25)] sm:px-8 sm:pb-20 sm:pt-40 lg:pt-32"
      >
        <p className="mb-6 flex max-w-full items-center justify-center gap-3 text-center text-[9px] font-medium uppercase tracking-[.19em] text-[#ffe2de] sm:gap-5 sm:text-[11px] sm:tracking-[.38em]">
          <span aria-hidden="true" className="hidden h-px w-10 bg-[#f1c0c0]/75 sm:block" />
          Premium Hair Extensions &amp; Education
          <span aria-hidden="true" className="hidden h-px w-10 bg-[#f1c0c0]/75 sm:block" />
        </p>

        <p className="mb-1 font-['Cormorant_Garamond',Georgia,serif] text-[clamp(1.35rem,3.6vw,3rem)] font-normal uppercase tracking-[.13em] text-[#fff3eb] sm:tracking-[.17em]">
          Hair Brazil Extensions
        </p>

        <h1
          id="hair-brazil-hero-title"
          className="mx-auto max-w-[1200px] font-['Cormorant_Garamond',Georgia,serif] text-[clamp(4.15rem,9.2vw,10rem)] font-light italic leading-[.88] tracking-[-.065em] text-[#fff7f0] [text-wrap:balance]"
        >
          Signature Hair <span className="whitespace-nowrap">Solutions</span>
        </h1>

        <p className="mt-7 max-w-[860px] text-[10px] font-medium uppercase leading-relaxed tracking-[.12em] text-[#ffebe4] sm:mt-8 sm:text-[13px] sm:tracking-[.28em]">
          Extensions <span className="mx-1 text-[#ffc2d3] sm:mx-3">•</span> Hair Replacement <span className="mx-1 text-[#ffc2d3] sm:mx-3">•</span> Professional Courses
        </p>

        <div className="mt-8 flex w-full max-w-[310px] flex-col items-stretch justify-center gap-3 sm:mt-9">
          <button
            type="button"
            onClick={() => onNavigate('/shop')}
            className="group inline-flex min-h-[58px] w-full items-center justify-center gap-3 rounded-full bg-[#f3becb] px-7 py-4 text-[12px] font-bold uppercase tracking-[.18em] text-[#452832] shadow-[0_12px_28px_rgba(38,14,22,.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffe1e7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ShoppingBag size={17} strokeWidth={1.8} /> Shop Now <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/courses')}
            className="group inline-flex min-h-[58px] w-full items-center justify-center gap-3 rounded-full border border-[#f3c0cc]/90 bg-[#2e2026]/45 px-7 py-4 text-[12px] font-semibold uppercase tracking-[.18em] text-[#fff5f0] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f3becb] hover:text-[#452832] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <GraduationCap size={18} strokeWidth={1.8} /> View Courses
          </button>
        </div>

        <p className="mt-8 text-[10px] font-medium uppercase tracking-[.18em] text-[#fce6df]/90 sm:mt-9 sm:tracking-[.29em]">
          Pompano Beach, Florida <span aria-hidden="true" className="mx-2">·</span> Private appointments
        </p>
      </motion.div>
    </section>
  );
};
