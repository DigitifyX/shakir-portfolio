"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    Github,
    Linkedin,
    Twitter,
    ArrowUpRight,
    Sparkles,
    CheckCircle,
    Loader2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   📇 TYPES & DATA
   ============================================ */

export type ProfileData = {
    name: string | null;
    title: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    resumeUrl: string | null;
    availableForWork: boolean | null;
    profileImage: any;
};

function buildContactInfo(profile: ProfileData | null) {
    return [
        {
            icon: Mail,
            label: "Email",
            value: profile?.email || "hello@shakir.dev",
            href: `mailto:${profile?.email || "hello@shakir.dev"}`,
            gradient: "from-blue-500 to-cyan-400",
        },
        {
            icon: MapPin,
            label: "Location",
            value: profile?.location || "Dhaka, Bangladesh",
            href: "#",
            gradient: "from-purple-500 to-pink-400",
        },
        {
            icon: Phone,
            label: "Phone",
            value: profile?.phone || "+880 1XXX-XXXXXX",
            href: `tel:${profile?.phone || "+8801000000000"}`,
            gradient: "from-green-500 to-emerald-400",
        },
    ];
}

function buildSocialLinks(profile: ProfileData | null) {
    return [
        { icon: Github, label: "GitHub", href: profile?.githubUrl || "https://github.com/", gradient: "from-gray-400 to-gray-600" },
        { icon: Linkedin, label: "LinkedIn", href: profile?.linkedinUrl || "https://linkedin.com/", gradient: "from-blue-500 to-blue-700" },
        { icon: Twitter, label: "Twitter", href: profile?.twitterUrl || "https://twitter.com/", gradient: "from-sky-400 to-blue-500" },
    ];
}

/* ============================================
   💳 INFO CARD
   ============================================ */

function InfoCard({
    item,
}: {
    item: { icon: any; label: string; value: string; href: string; gradient: string };
}) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const Icon = item.icon;

    return (
        <a
            ref={cardRef}
            href={item.href}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="group relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
            style={{
                background: hovering
                    ? `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(var(--glow-accent-rgb), var(--glow-bg-intensity)), transparent), var(--color-card-surface)`
                    : "var(--color-card-surface)",
            }}
        >
            {/* Mouse-tracking border glow */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
                style={{
                    background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(var(--glow-accent-rgb), var(--glow-accent-intensity)), transparent)`,
                    opacity: hovering ? 1 : 0,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude" as any,
                    WebkitMaskComposite: "xor",
                    padding: "1.5px",
                }}
            />
            {/* Static border */}
            <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 pointer-events-none z-20" />

            {/* Icon */}
            <div
                className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
            >
                <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Text */}
            <div className="relative z-10 flex-1 min-w-0">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                    {item.label}
                </p>
                <p className="text-white text-sm font-semibold truncate mt-0.5">
                    {item.value}
                </p>
            </div>

            {/* Arrow */}
            <ArrowUpRight className="relative z-10 w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
        </a>
    );
}

/* ============================================
   📝 CONTACT FORM
   ============================================ */

function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!formRef.current) return;
        const rect = formRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const inputClasses = (field: string) =>
        `w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-500 outline-none transition-all duration-300 ${focusedField === field
            ? "border-cyan-500/50 shadow-[0_0_20px_rgba(var(--glow-accent-rgb), 0.15)]"
            : "border-white/10 hover:border-white/20"
        }`;

    return (
        <form
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onSubmit={async (e) => {
                e.preventDefault();
                if (status === 'loading' || status === 'success') return;

                setStatus('loading');
                setErrorMsg('');

                const formData = new FormData(e.currentTarget);
                const data = {
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    subject: formData.get('subject') as string,
                    message: formData.get('message') as string,
                };

                try {
                    const res = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });

                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.error || 'Something went wrong');
                    }

                    setStatus('success');
                    formRef.current?.reset();
                } catch (err: any) {
                    setStatus('error');
                    setErrorMsg(err.message || 'Failed to send message');
                    // Reset error after 4 seconds
                    setTimeout(() => setStatus('idle'), 4000);
                }
            }}
            className="relative rounded-2xl overflow-hidden"
            style={{
                background: hovering
                    ? `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, rgba(var(--glow-accent-rgb), 0.08), transparent), var(--color-card-surface)`
                    : "var(--color-card-surface)",
            }}
        >
            {/* Mouse-tracking border glow */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
                style={{
                    background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(var(--glow-accent-rgb), var(--glow-accent-intensity)), transparent)`,
                    opacity: hovering ? 1 : 0,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude" as any,
                    WebkitMaskComposite: "xor",
                    padding: "1.5px",
                }}
            />
            {/* Static border */}
            <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 pointer-events-none z-20" />

            <div className="relative z-10 p-6 md:p-8 space-y-5">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            className={inputClasses("name")}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className={inputClasses("email")}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                        />
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                        Subject
                    </label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="What's this about?"
                        className={inputClasses("subject")}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                        Message
                    </label>
                    <textarea
                        rows={5}
                        name="message"
                        required
                        placeholder="Tell me about your project..."
                        className={`${inputClasses("message")} resize-none`}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className={`group relative w-full py-4 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-500 ${status === 'success'
                            ? 'bg-emerald-500 hover:shadow-none'
                            : status === 'error'
                                ? 'bg-red-500'
                                : 'hover:shadow-[0_0_30px_rgba(var(--glow-accent-rgb),var(--glow-bg-intensity))]'
                        }`}
                    style={{
                        background: status === 'success'
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : status === 'error'
                                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                                : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                    }}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : status === 'success' ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Message Sent Successfully!
                            </>
                        ) : status === 'error' ? (
                            <>
                                {errorMsg || 'Failed to send'}
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                Send Message
                            </>
                        )}
                    </span>
                    {/* Shine effect on hover */}
                    {status === 'idle' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    )}
                </button>
            </div>
        </form>
    );
}

/* ============================================
   🏗️ CONTACT SECTION
   ============================================ */

export interface ContactProps {
    profile: ProfileData | null;
    heading?: string;
    subheading?: string;
}

export default function Contact({ profile, heading, subheading }: ContactProps) {
    const contactInfo = buildContactInfo(profile);
    const socialLinks = buildSocialLinks(profile);
    const isAvailable = profile?.availableForWork !== false;

    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Heading
            if (headingRef.current) {
                const h2 = headingRef.current.querySelector("h2");
                const p = headingRef.current.querySelector("p");

                if (h2) {
                    gsap.fromTo(
                        h2,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: headingRef.current,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                }
                if (p) {
                    gsap.fromTo(
                        p,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            delay: 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: headingRef.current,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                }
            }

            // Left column (info cards + socials)
            if (leftRef.current) {
                const cards = leftRef.current.querySelectorAll(".info-card");
                gsap.fromTo(
                    cards,
                    { opacity: 0, x: -40, scale: 0.95 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: leftRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                const socials = leftRef.current.querySelector(".social-row");
                if (socials) {
                    gsap.fromTo(
                        socials,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            delay: 0.5,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: leftRef.current,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                }
            }

            // Right column (form)
            if (rightRef.current) {
                gsap.fromTo(
                    rightRef.current,
                    { opacity: 0, x: 40, scale: 0.97 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: 0.2,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: rightRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-[35px] md:py-[60px]"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div ref={headingRef} className="text-center mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-4">
                        {heading ? (
                            heading.includes("Connect") ? (
                                <>
                                    {heading.split("Connect")[0]}
                                    <span className="gradient-text">Connect</span>
                                    {heading.split("Connect")[1]}
                                </>
                            ) : (
                                (() => {
                                    const words = heading.split(' ');
                                    const lastWord = words.pop();
                                    return <>{words.join(' ')} <span className="gradient-text">{lastWord}</span></>;
                                })()
                            )
                        ) : (
                            <>
                                Let&apos;s <span className="gradient-text">Connect</span>
                            </>
                        )}
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl mx-auto">
                        {subheading || "Have a project in mind or just want to say hello? I'd love to hear from you."}
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Left — Info + Socials */}
                    <div ref={leftRef} className="lg:col-span-2 flex flex-col gap-4">
                        {contactInfo.map((item) => (
                            <div key={item.label} className="info-card">
                                <InfoCard item={item} />
                            </div>
                        ))}

                        {/* Social Links */}
                        <div className="social-row mt-4">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">
                                Find me on
                            </p>
                            <div className="flex gap-3">
                                {socialLinks.map((s) => {
                                    const Icon = s.icon;
                                    return (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group w-12 h-12 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center hover:border-cyan-500/40 hover:bg-[var(--color-bg-card-hover)] hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                                            title={s.label}
                                        >
                                            <Icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-cyan-500 transition-colors" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Availability badge */}
                        <div className="mt-4 flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20">
                            <div className="relative flex-shrink-0">
                                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-75" />
                            </div>
                            <div>
                                <p className="text-emerald-400 text-sm font-semibold">
                                    Available for work
                                </p>
                                <p className="text-gray-500 text-xs">
                                    Currently open to freelance &amp; full-time roles
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right — Contact Form */}
                    <div ref={rightRef} className="lg:col-span-3">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
