"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface AnimatedSectionHeadingProps {
    heading: string | React.ReactNode;
    subheading?: string;
    badge?: string;
    className?: string;
}

export default function AnimatedSectionHeading({
    heading,
    subheading,
    badge,
    className = "",
}: AnimatedSectionHeadingProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const elements = containerRef.current?.querySelectorAll(".animate-item");
            if (!elements) return;

            gsap.fromTo(
                elements,
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`text-center mb-8 md:mb-12 ${className}`}>
            {/* Optional Badge */}
            {badge && (
                <div className="animate-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] mb-6">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                        {badge}
                    </span>
                </div>
            )}

            {/* Main Heading */}
            <h2 className="animate-item text-4xl md:text-5xl font-bold mb-4 text-[var(--color-text-heading)]">
                {heading}
            </h2>

            {/* Optional Subheading */}
            {subheading && (
                <p className="animate-item text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                    {subheading}
                </p>
            )}
        </div>
    );
}
