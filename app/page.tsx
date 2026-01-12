"use client";

import { useState, useCallback } from "react";
import GrainOverlay from "@/components/GrainOverlay";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import LeftSidebar from "@/components/LeftSidebar";
import TopBar from "@/components/TopBar";
import DataPanel from "@/components/DataPanel";
import ParallaxHero from "@/components/ParallaxHero";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PhotoModeButton from "@/components/PhotoModeButton";
import {
    PageTransitionProvider,
    usePageTransition,
} from "@/components/PageTransition";
import useDynamicTitle from "@/hooks/useDynamicTitle";

const IndexContent = () => {
    const [isFlashing, setIsFlashing] = useState(false);
    const { triggerTransition } = usePageTransition();
    useDynamicTitle();

    const handleThemeChange = useCallback(
        (theme: string) => {
            // Trigger scanline transition, then apply theme at midpoint
            triggerTransition(() => {
                setIsFlashing(true);
                setTimeout(() => setIsFlashing(false), 300);
                try {
                    localStorage.setItem("user-theme", theme);
                } catch {
                    // ignore
                }
                document.documentElement.setAttribute("data-theme", theme);
            });
        },
        [triggerTransition]
    );

    return (
        <div
            className={`min-h-screen bg-background grid-bg ${isFlashing ? "theme-flash" : ""}`}
        >
            {/* Overlays */}
            <GrainOverlay />
            <ScanlineOverlay />

            {/* Fixed layout elements */}
            <LeftSidebar />
            <TopBar />
            <DataPanel onThemeChange={handleThemeChange} />

            {/* Photo Mode Button */}
            {/* <PhotoModeButton /> */}

            {/* Main content */}
            <main className="ml-16 md:ml-20 lg:mr-72 xl:mr-80 pt-14">
                <div data-photo-target>
                    <ParallaxHero />
                </div>
                <div data-photo-target>
                    <ProjectsSection />
                </div>
                <div data-photo-target>
                    <SkillsSection />
                </div>
                <div data-photo-target>
                    <AboutSection />
                </div>
                <div data-photo-target>
                    <ContactSection />
                </div>
                <Footer />
            </main>
        </div>
    );
};

export default function Home() {
    return (
        <PageTransitionProvider>
            <IndexContent />
        </PageTransitionProvider>
    );
}
