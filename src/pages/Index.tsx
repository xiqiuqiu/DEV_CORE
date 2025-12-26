import GrainOverlay from '@/components/GrainOverlay';
import LeftSidebar from '@/components/LeftSidebar';
import TopBar from '@/components/TopBar';
import DataPanel from '@/components/DataPanel';
import ParallaxHero from '@/components/ParallaxHero';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Grain overlay */}
      <GrainOverlay />
      
      {/* Fixed layout elements */}
      <LeftSidebar />
      <TopBar />
      <DataPanel />

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

export default Index;
