import { useState, useEffect, createContext, useContext, useCallback } from 'react';

interface TransitionContextType {
  triggerTransition: (callback?: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
};

interface PageTransitionProviderProps {
  children: React.ReactNode;
}

export const PageTransitionProvider = ({ children }: PageTransitionProviderProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  const triggerTransition = useCallback((callback?: () => void) => {
    setIsTransitioning(true);
    if (callback) {
      setPendingCallback(() => callback);
    }
  }, []);

  useEffect(() => {
    if (isTransitioning && pendingCallback) {
      // Execute callback at the midpoint of animation
      const timer = setTimeout(() => {
        pendingCallback();
        setPendingCallback(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, pendingCallback]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      
      {/* Transition overlay */}
      <div
        className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-200 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Scanline sweep effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent ${
            isTransitioning ? 'animate-scanline-sweep' : ''
          }`}
          style={{
            height: '100px',
            boxShadow: '0 0 60px 30px hsl(var(--primary) / 0.4)',
          }}
        />
        
        {/* Multiple scanlines for intensity */}
        <div
          className={`absolute inset-0 ${isTransitioning ? 'animate-scanline-sweep-delayed' : ''}`}
          style={{
            height: '2px',
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 20px 5px hsl(var(--primary) / 0.8)',
          }}
        />
        
        {/* Static noise during transition */}
        <div
          className={`absolute inset-0 transition-opacity duration-100 ${
            isTransitioning ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Flash overlay */}
        <div
          className={`absolute inset-0 bg-primary/10 transition-opacity ${
            isTransitioning ? 'animate-flash-pulse' : 'opacity-0'
          }`}
        />
        
        {/* Terminal-style loading text */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-primary transition-opacity duration-200 ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="animate-pulse">LOADING SECTOR...</span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
};
