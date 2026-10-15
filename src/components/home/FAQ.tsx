import React, { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../../data/siteData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#ffd9a8] text-[#261511] py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 border-t border-[#f2bd88]/30 overflow-hidden"
    >
      {/* Floating Hover Preview Thumbnail (appears on desktop cursor follow) */}
      {hoveredIndex !== null && FAQS[hoveredIndex]?.previewImage && (
        <div
          className="hidden lg:block pointer-events-none fixed z-50 w-44 h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#f2f0e5] transition-all duration-200 ease-out"
          style={{
            left: `${mousePos.x + 24}px`,
            top: `${mousePos.y - 110}px`,
            position: 'absolute',
          }}
        >
          <img
            src={FAQS[hoveredIndex].previewImage}
            alt="FAQ visual preview"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#261511]/40 via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs sm:text-sm font-sans-ui tracking-widest uppercase text-[#261511]/70 block">
              (FAQ)
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl text-[#261511] tracking-tight leading-[1.08]">
              Frequently
              <br />
              asked
              <br />
              questions
            </h2>
          </div>

          {/* Right Column: Accordion List with Hover Preview Trigger */}
          <div className="lg:col-span-7 divide-y divide-[#261511]/20 border-t border-b border-[#261511]/20">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="py-6 sm:py-7 relative group"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif-editorial text-xl sm:text-2xl md:text-3xl text-[#261511] group-hover:text-[#543923] group-hover:translate-x-1 transition-all duration-300 pr-6">
                      {item.question}
                    </span>
                    <span className="w-8 h-8 rounded-full border border-[#261511]/30 flex items-center justify-center flex-shrink-0 text-[#261511] group-hover:border-[#261511] transition-transform duration-300">
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div className="mt-4 pr-10 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="font-sans-ui text-sm sm:text-base text-[#261511]/80 leading-relaxed max-w-xl">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
