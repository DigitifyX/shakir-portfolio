"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSectionHeading from "./AnimatedSectionHeading";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   📝 TESTIMONIAL TYPES & DATA
   ============================================ */

export type TestimonialItem = {
    _id: string;
    name: string | null;
    role: string | null;
    company: string | null;
    text: string | null;
    rating: number | null;
    accentColor: string | null;
};

const fallbackTestimonials: TestimonialItem[] = [
    { _id: "1", name: "Alex Rahman", role: "Product Manager", company: "TechFlow", text: "Shakir transformed our outdated platform into a modern, lightning-fast web app. His attention to detail and creative problem-solving made the entire process seamless.", rating: 5, accentColor: "from-blue-500 to-cyan-400" },
    { _id: "2", name: "Sarah Chen", role: "Startup Founder", company: "NovaByte", text: "Working with Shakir was an incredible experience. He built our MVP in record time with beautiful animations and pixel-perfect design that our users absolutely love.", rating: 5, accentColor: "from-purple-500 to-pink-400" },
    { _id: "3", name: "James Wilson", role: "CTO", company: "CloudScale", text: "Exceptional full-stack skills. Shakir architected our entire frontend from scratch — the performance scores and user engagement metrics went through the roof.", rating: 5, accentColor: "from-cyan-500 to-blue-400" },
    { _id: "4", name: "Priya Sharma", role: "Design Lead", company: "PixelCraft", text: "Shakir bridges the gap between design and development perfectly. He took our Figma files and brought them to life with smooth animations that exceeded expectations.", rating: 5, accentColor: "from-pink-500 to-orange-400" },
    { _id: "5", name: "Michael Torres", role: "Engineering Manager", company: "DataPulse", text: "His code quality is outstanding — clean, well-documented, and maintainable. Shakir is the kind of developer who elevates the entire team's output.", rating: 5, accentColor: "from-green-500 to-emerald-400" },
    { _id: "6", name: "Emily Park", role: "UX Researcher", company: "InnoLab", text: "Shakir has an innate understanding of user experience. Every interaction he builds feels intentional, polished, and delightful. A rare talent in frontend development.", rating: 5, accentColor: "from-orange-500 to-yellow-400" },
];

/* ============================================
   ⭐ STAR RATING
   ============================================ */

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-transparent text-gray-600"
                        }`}
                />
            ))}
        </div>
    );
}

/* ============================================
   💳 MODERN TESTIMONIAL CARD
   ============================================ */

function TestimonialCard({
    testimonial,
}: {
    testimonial: TestimonialItem;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="h-full relative flex flex-col justify-between rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none transition-all duration-300 transform md:hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none"
            style={{
                background: "var(--color-card-surface)",
                border: "1px solid var(--color-border)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Animated subtle border glow that follows mouse */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
                style={{
                    background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.3), transparent)`,
                    opacity: isHovering ? 1 : 0,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude" as any,
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }}
            />

            {/* Glowing orb in the background */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Card content */}
            <div className="relative z-10 p-7 md:p-8 flex-1 flex flex-col">
                {/* Quote icon + Rating row */}
                <div className="flex items-start justify-between mb-6">
                    <Quote className="w-8 h-8 text-gray-400 opacity-30" />
                    <StarRating rating={testimonial.rating || 5} />
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 text-[15px] leading-relaxed mb-8 flex-1 relative z-20">
                    &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Author info */}
                <div className="flex items-center gap-4 relative z-20">
                    {/* Avatar */}
                    <div
                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.accentColor || 'from-blue-500 to-cyan-400'} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                    >
                        {(testimonial.name || '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-white text-[15px] font-semibold tracking-wide">
                            {testimonial.name}
                        </p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">
                            {testimonial.role} <span className="opacity-50 mx-1">/</span> <span className="text-cyan-400/80">{testimonial.company}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ============================================
   🎠 TESTIMONIAL CAROUSEL
   ============================================ */

function TestimonialCarousel({ items }: { items: TestimonialItem[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "center",
            breakpoints: {
                '(min-width: 768px)': { align: "start" }
            }
        },
        [Autoplay({ delay: 5000, stopOnInteraction: true })]
    );

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative max-w-[1400px] mx-auto group">
            <div className="overflow-hidden py-4 -mx-4 px-4 md:-mx-8 md:px-8" ref={emblaRef}>
                <div className="flex -ml-6 md:-ml-8 touch-pan-y">
                    {items.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="pl-6 md:pl-8 flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-12">
                <button
                    onClick={scrollPrev}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group-hover:scale-100 transform active:scale-95"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Pagination Dots */}
                <div className="flex gap-2 mx-4">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${index === selectedIndex
                                ? "w-8 bg-cyan-400"
                                : "w-2 bg-white/20 hover:bg-white/40"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={scrollNext}
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group-hover:scale-100 transform active:scale-95"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

/* ============================================
   🏗️ TESTIMONIALS SECTION
   ============================================ */

export interface TestimonialsProps {
    testimonials: TestimonialItem[];
    heading?: string;
    subheading?: string;
}

export default function Testimonials({ testimonials, heading, subheading }: TestimonialsProps) {
    const allTestimonials = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

    // Shuffle or use just one flat list for the carousel
    const carouselItems = [...allTestimonials];

    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                {
                    opacity: 0,
                    y: 60,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            className="py-[35px] md:py-[60px] overflow-hidden"
        >
            {/* Section Header */}
            <div className="container mx-auto px-4 md:px-6 mb-16 md:mb-20">
                <AnimatedSectionHeading
                    heading={
                        heading ? (
                            heading.includes("Say") ? (
                                <>
                                    {heading.split("Say")[0]}
                                    <span className="gradient-text">Say</span>
                                    {heading.split("Say")[1]}
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
                                What People <span className="gradient-text">Say</span>
                            </>
                        )
                    }
                    subheading={subheading || "Feedback from clients and collaborators I've had the pleasure of working with."}
                    className="mb-0" // Rely on container margin
                />
            </div>

            {/* Carousel Container */}
            <div ref={contentRef} className="container mx-auto px-4 md:px-6">
                {carouselItems.length > 0 && (
                    <TestimonialCarousel items={carouselItems} />
                )}
            </div>
        </section>
    );
}
