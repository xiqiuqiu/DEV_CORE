"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
    value: string | number;
    duration?: number;
    delay?: number;
    className?: string;
}

const CountUp = ({
    value,
    duration = 2,
    delay = 0,
    className,
}: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    // Parse numeric part and suffix
    const numericValue = typeof value === 'number'
        ? value
        : parseFloat(String(value).replace(/,/g, ''));

    const suffix = typeof value === 'string'
        ? String(value).replace(/[\d,.]/g, '') // remove numbers, commas, dots
        : '';

    // Use motion value and spring for natural counting
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
        duration: duration * 1000,
    });

    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (inView && !isNaN(numericValue)) {
            // Delay start if needed
            const timeout = setTimeout(() => {
                motionValue.set(numericValue);
            }, delay * 1000);

            return () => clearTimeout(timeout);
        }
    }, [inView, numericValue, motionValue, delay]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            // Format number: integer if target is integer, or fixed decimals if target has decimals
            let formatted = "";
            if (Number.isInteger(numericValue)) {
                formatted = Math.round(latest).toLocaleString();
            } else {
                // Check how many decimals in original
                const decimals = String(numericValue).split('.')[1]?.length || 1;
                formatted = latest.toFixed(decimals);
            }

            setDisplayValue(formatted + suffix);
        });

        return () => unsubscribe();
    }, [springValue, numericValue, suffix]);

    // Always render with ref to ensure tracking works
    return (
        <span ref={ref} className={className}>
            {isNaN(numericValue) ? value : displayValue}
        </span>
    );
};

export default CountUp;
