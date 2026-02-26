"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Github,
    Linkedin,
    Twitter,
    Heart,
    ArrowUp,
} from "lucide-react";
import type { ProfileData } from "@/app/components/Contact";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
];

export default function Footer({ profile }: { profile: ProfileData | null }) {
    const socialLinks = [
        { icon: Github, label: "GitHub", href: profile?.githubUrl || "https://github.com/" },
        { icon: Linkedin, label: "LinkedIn", href: profile?.linkedinUrl || "https://linkedin.com/" },
        { icon: Twitter, label: "Twitter", href: profile?.twitterUrl || "https://twitter.com/" },
    ];

    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!footerRef.current) return;

        const ctx = gsap.context(() => {
            // Gradient divider draw-in
            if (dividerRef.current) {
                gsap.fromTo(
                    dividerRef.current,
                    { scaleX: 0, transformOrigin: "center" },
                    {
                        scaleX: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: dividerRef.current,
                            start: "top 95%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Footer content fade-up
            if (contentRef.current) {
                const children = contentRef.current.querySelectorAll(".footer-anim");
                gsap.fromTo(
                    children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 95%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer ref={footerRef} className="relative pb-8 pt-4">
            {/* Gradient Divider */}
            <div
                ref={dividerRef}
                className="h-px mx-auto mb-12"
                style={{
                    maxWidth: "var(--container-max)",
                    background:
                        "linear-gradient(90deg, transparent 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, transparent 100%)",
                }}
            />

            <div
                ref={contentRef}
                className="container mx-auto px-4 md:px-6"
            >
                {/* Top Row: Brand + Nav + Socials */}
                <div className="footer-anim flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-2xl font-bold text-white">
                            Shakir<span className="gradient-text">.</span>
                        </span>
                        <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                            Crafting elegant digital experiences with code &amp; creativity.
                        </p>
                    </div>

                    {/* Nav Links */}
                    <nav className="footer-anim flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {footerLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-400 text-sm hover:text-white transition-colors duration-300 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </nav>

                    {/* Socials */}
                    <div className="footer-anim flex items-center gap-3">
                        {socialLinks.map((s) => {
                            const Icon = s.icon;
                            return (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group w-10 h-10 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center hover:border-cyan-500/40 hover:bg-[var(--color-bg-card-hover)] hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                                    title={s.label}
                                >
                                    <Icon className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-cyan-500 transition-colors" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Row: Copyright + Back to top */}
                <div className="footer-anim flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <p className="text-gray-600 text-xs flex items-center gap-1">
                        © {new Date().getFullYear()} Shakir Ahmed. Built with
                        <Heart className="w-3 h-3 text-pink-500 fill-pink-500 inline" />
                        and Next.js
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-gray-500 text-xs hover:text-cyan-400 transition-colors duration-300"
                    >
                        Back to top
                        <span className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-white/[0.06] transition-all duration-300">
                            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
