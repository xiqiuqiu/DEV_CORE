"use client";

import { useEffect, createContext, useContext, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

const SmoothScroll = ({ children }: { children?: React.ReactNode }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            // orientation: 'vertical', // Default
            // gestureOrientation: 'vertical', // Default
            // smoothWheel: true, // Default
            wheelMultiplier: 1,
            touchMultiplier: 2,
            prevent: (node) => {
                const tag = node.tagName;
                if (tag === "TEXTAREA" || tag === "INPUT" || tag === "SELECT") return true;
                if (node.isContentEditable) return true;
                return false;
            },
        });

        setLenis(lenisInstance);

        function raf(time: number) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
    );
};

export default SmoothScroll;
