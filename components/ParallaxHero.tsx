"use client";

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/context';

const ParallaxHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t } = useI18n();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
      <div className="relative z-10 text-center px-8">
        {/* Title Container to ensure alignment */}
        <div className="relative inline-block">
          {/* Shadow layer */}
          <h1
            className="text-[8vw] md:text-[12vw] font-bold leading-none text-primary/20 absolute inset-0 select-none font-ocera"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            SIGCLR
          </h1>

          {/* Main title with Glitch Effect */}
          <h1
            className="text-[8vw] md:text-[12vw] font-bold leading-none text-foreground relative font-ocera glitch"
            data-text="SIGCLR"
          >
            SIGCLR
          </h1>
        </div>

        {/* Subtitle with Tagline */}
        <div className="mt-8 text-center max-w-2xl mx-auto space-y-4">
          {/* Primary Tagline */}
          {/* <h2 className="text-xl md:text-2xl font-semibold text-primary tracking-wide">
            {t.hero.tagline}
          </h2> */}
          {/* Secondary Description */}
          <div className="border-l-4 border-primary/50 pl-6 text-center">
            <p className="text-lg md:text-xl text-muted-foreground font-mono">
              {t.hero.subtitle}
            </p>
          </div>
        </div>

        {/* Stamp */}
        <div className="mt-32">
          <span className="stamp">
            {t.hero.stamp}
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">{t.hero.scroll}</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
