"use client";

import { motion, useInView, Variant } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-right" | "fade-left" | "scale" | "none";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
}

const variants: Record<string, Record<string, Variant>> = {
    "fade-up": {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    none: {
        hidden: {},
        visible: {},
    },
};

const ScrollReveal = ({
    children,
    className,
    animation = "fade-up",
    delay = 0,
    duration = 0.5,
    threshold = 0.2, // trigger when 20% of element is in view
    once = true,
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold });

    return (
        <motion.div
            ref={ref}
            className={cn(className)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[animation]}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "premium" feel (Ease Out Quint-ish)
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
