import { useState, useEffect } from 'react';

const ParallaxHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    <section id="hero" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="relative z-10 text-center px-8">
        {/* Shadow layer */}
        <h1 
          className="text-[8vw] md:text-[12vw] font-bold leading-none text-primary/20 absolute inset-0 select-none"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          DEV_CORE
        </h1>
        
        {/* Main title */}
        <h1 className="text-[8vw] md:text-[12vw] font-bold leading-none text-foreground relative">
          DEV_CORE
        </h1>
        
        {/* Subtitle */}
        <div className="mt-8 border-l-4 border-primary pl-6 text-left max-w-xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground font-mono">
            Full-stack software developer crafting robust systems and elegant interfaces. 
            Specializing in modern web technologies and scalable architecture.
          </p>
        </div>

        {/* Stamp */}
        <div className="mt-32">
          <span className="stamp">
            CONFIDENTIAL BUILD // V2.4.1
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
