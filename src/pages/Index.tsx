import { useState, useCallback } from 'react';
import GrainOverlay from '@/components/GrainOverlay';
import ScanlineOverlay from '@/components/ScanlineOverlay';
import LeftSidebar from '@/components/LeftSidebar';
import TopBar from '@/components/TopBar';
import DataPanel from '@/components/DataPanel';
import ParallaxHero from '@/components/ParallaxHero';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { PageTransitionProvider, usePageTransition } from '@/components/PageTransition';
import useDynamicTitle from '@/hooks/useDynamicTitle';

const IndexContent = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const { triggerTransition } = usePageTransition();
  useDynamicTitle();

  const handleThemeChange = useCallback((theme: string) => {
    // Trigger scanline transition, then apply theme at midpoint
    triggerTransition(() => {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);
      document.documentElement.setAttribute('data-theme', theme);
    });
  }, [triggerTransition]);

  return (
    <div className={`min-h-screen bg-background grid-bg ${isFlashing ? 'theme-flash' : ''}`}>
      {/* Overlays */}
      <GrainOverlay />
      <ScanlineOverlay />
      
      {/* Fixed layout elements */}
      <LeftSidebar />
      <TopBar />
      <DataPanel onThemeChange={handleThemeChange} />

      {/* Main content */}
      <main className="ml-16 md:ml-20 lg:mr-72 xl:mr-80 pt-14">
        <ParallaxHero />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <PageTransitionProvider>
      <IndexContent />
    </PageTransitionProvider>
  );
};

export default Index;
