import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, GraduationCap, ShoppingBag } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteData';
import type { Language } from '../../data/shopData';

interface Props { onNavigate: (path: string) => void; language: Language; }

const HERO_COPY: Record<Language, {
  eyebrow: string;
  subline: string;
  highlight: string;
  shop: string;
  courses: string;
  book: string;
  consultationMessage: string;
}> = {
  EN: {
    eyebrow: 'Premium Beauty,',
    subline: 'Expert Hair Extensions',
    highlight: 'Blonde Hair',
    shop: 'Shop Now',
    courses: 'Courses',
    book: 'Book Now',
    consultationMessage: 'Hi! I would like to schedule an appointment at Hair Brazil Extensions.'
  },
  PT: {
    eyebrow: 'Beleza Premium,',
    subline: 'Especialistas em Extensões Capilares',
    highlight: 'Cabelo Loiro',
    shop: 'Comprar Agora',
    courses: 'Cursos',
    book: 'Agendar Agora',
    consultationMessage: 'Olá! Gostaria de agendar um horário na Hair Brazil Extensions.'
  },
  ES: {
    eyebrow: 'Belleza Premium,',
    subline: 'Expertos en Extensiones de Cabello',
    highlight: 'Cabello Rubio',
    shop: 'Comprar Ahora',
    courses: 'Cursos',
    book: 'Reservar Ahora',
    consultationMessage: '¡Hola! Me gustaría reservar una cita en Hair Brazil Extensions.'
  }
};

/**
 * Hair Brazil Extensions hero — owner-approved blonde editorial concept.
 * Uses the original owner-supplied blonde photograph already hosted locally,
 * with live text and clickable buttons for a responsive, accessible design.
 */
export const Hero: React.FC<Props> = ({ onNavigate, language }) => {
  const copy = HERO_COPY[language];
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 60);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section
      aria-labelledby="hair-brazil-hero-title"
      className="relative isolate min-h-[760px] overflow-hidden bg-[#b38979] text-[#fff1e2] sm:min-h-[810px] lg:min-h-[min(900px,100svh)]"
    >
      {/* Full-bleed salon image; content remains actual website elements. */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,#a97c6b_0%,#936c5f_40%,#b79584_100%)]" />
      <motion.div
        initial={{ opacity: 0, scale: 1.045 }}
        animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 1.045 }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[61%]"
      >
        <img
          src="/assets/hair-brazil-hero-blonde-nov-2026.jpg"
          alt="Blonde ombré hair with smooth natural-looking lengths at the Hair Brazil Extensions salon"
          fetchPriority="high"
          className="h-full w-full object-cover object-[54%_35%] sm:object-[50%_35%] lg:object-[50%_45%]"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(76,43,37,.53),rgba(110,71,57,.49))] lg:bg-[linear-gradient(90deg,rgba(126,82,69,.94)_0%,rgba(132,85,71,.88)_29%,rgba(129,85,71,.54)_47%,rgba(71,45,37,.04)_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_30%,rgba(244,201,174,.34),transparent_53%)]"
      />
      {/* A decorative champagne-colored satin curve echoes the approved composition. */}
      <svg aria-hidden="true" className="pointer-events-none absolute -bottom-4 -left-7 z-0 hidden h-[29%] w-[67%] opacity-75 lg:block" viewBox="0 0 980 245" preserveAspectRatio="none">
        <defs>
          <linearGradient id="heroSatinFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd9c0" stopOpacity=".55" />
            <stop offset=".5" stopColor="#eab79c" stopOpacity=".16" />
            <stop offset="1" stopColor="#c79380" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroSatinStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffdfbe" stopOpacity=".9" />
            <stop offset="1" stopColor="#e9b598" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-30 20 C125 50 172 230 412 221 C640 219 693 122 1000 188 L1000 250 L-30 250Z" fill="url(#heroSatinFill)" />
        <path d="M-30 20 C125 50 172 230 412 221 C640 219 693 122 1000 188" stroke="url(#heroSatinStroke)" strokeWidth="3" fill="none" />
        <path d="M-30 115 C178 160 190 240 415 234 C660 224 766 163 1000 222" stroke="#ffe5d0" strokeOpacity=".42" strokeWidth="1.5" fill="none" />
      </svg>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: ready ? 0 : 20, opacity: ready ? 1 : 0 }}
        transition={{ duration: .8, delay: .15, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex min-h-[760px] max-w-[1480px] flex-col justify-center px-5 pb-20 pt-36 text-center sm:min-h-[810px] sm:px-10 lg:min-h-[min(900px,100svh)] lg:w-full lg:items-start lg:px-[min(5.5vw,100px)] lg:pb-24 lg:pt-24 lg:text-left"
      >
        <p className="mb-8 flex max-w-[760px] items-center justify-center gap-4 text-[11px] font-medium uppercase leading-relaxed tracking-[.26em] text-[#fff0df] drop-shadow-md sm:text-[15px] sm:tracking-[.32em] lg:mb-12 lg:justify-start">
          <span aria-hidden="true" className="hidden h-px w-16 bg-[#f3c49d] sm:block" />
          <span>{copy.eyebrow}<br className="lg:hidden" /> {copy.subline}</span>
          <span aria-hidden="true" className="hidden h-px w-16 bg-[#f3c49d] sm:block" />
        </p>

        <h1 id="hair-brazil-hero-title" className="max-w-[800px] leading-[.86] text-[#ffebda] drop-shadow-[0_4px_22px_rgba(58,29,26,.24)]">
          <span className="block whitespace-nowrap font-['Cormorant_Garamond',Georgia,serif] text-[clamp(4rem,9.4vw,9.5rem)] font-light italic tracking-[-.075em]">
            Hair Brazil
          </span>
          <span className="mt-2 block font-sans-ui text-[clamp(1.6rem,4.15vw,4.4rem)] font-light uppercase tracking-[.36em] sm:mt-3 sm:tracking-[.44em]">
            Extensions
          </span>
        </h1>

        <div className="mt-10 flex w-full max-w-[590px] items-center justify-center gap-3 sm:mt-11 lg:justify-start">
          <span aria-hidden="true" className="h-px flex-1 bg-[#e5b896]" />
          <span className="border border-[#e4b18d] px-6 py-3 text-[13px] uppercase tracking-[.3em] text-[#ffe5d0] sm:px-9 sm:text-[20px] sm:tracking-[.34em]">
            {copy.highlight}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#e5b896]" />
        </div>

        <div className="mt-10 grid w-full max-w-[625px] grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          <button
            type="button"
            onClick={() => onNavigate('/shop')}
            className="inline-flex min-h-[68px] flex-1 items-center justify-center gap-3 border border-[#f7c3a7] bg-[#f3c6aa] px-7 py-4 text-[13px] font-bold uppercase tracking-[.21em] text-[#39241e] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#ffe0c8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[16px]"
          >
            <ShoppingBag size={18} strokeWidth={1.6} /> {copy.shop}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/courses')}
            className="inline-flex min-h-[68px] flex-1 items-center justify-center gap-3 border border-[#f1c4a6] bg-[#765245]/35 px-7 py-4 text-[13px] font-semibold uppercase tracking-[.21em] text-[#ffeadb] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-[#f3c6aa] hover:text-[#39241e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[16px]"
          >
            <GraduationCap size={19} strokeWidth={1.6} /> {copy.courses}
          </button>
          <a
            href={getWhatsAppLink(copy.consultationMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[58px] items-center justify-center gap-3 border border-[#f7c3a7] bg-[#f8d8bd] px-7 py-4 text-[13px] font-bold uppercase tracking-[.17em] text-[#39241e] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:col-start-2 sm:text-[15px]"
            aria-label={copy.book + " — WhatsApp"}
          >
            <CalendarDays size={19} strokeWidth={1.6} /> {copy.book}
          </a>
        </div>
      </motion.div>
    </section>
  );
};
