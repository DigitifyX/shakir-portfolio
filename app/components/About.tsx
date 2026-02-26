"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Component to split text into animated characters for heading
function AnimatedHeading({
  children,
  className = "",
  delay = 0,
  gradient = false,
}: {
  children: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    gsap.set(chars, {
      opacity: 0,
      y: 50,
      rotateX: -90,
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.03,
      delay: delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });
  }, [delay]);

  const words = children.split(' ');

  return (
    <span ref={containerRef} className={`${className}${gradient ? ' gradient-text' : ''}`} style={{ perspective: "1000px" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="char inline-block"
              style={{
                transformStyle: "preserve-3d",
                ...(gradient ? { WebkitTextFillColor: 'inherit' } : {}),
              }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}


import { PortableText } from '@portabletext/react';

export interface AboutProps {
  heading?: string;
  content?: any;
}

export default function About({ heading, content }: AboutProps) {
  const signatureRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gradientLineRef = useRef<HTMLSpanElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    // Gradient heading line animation
    if (gradientLineRef.current) {
      gsap.fromTo(
        gradientLineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gradientLineRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // Quote border and text animation
    if (quoteRef.current) {
      const border = quoteRef.current.querySelector('.quote-border');
      const text = quoteRef.current.querySelector('.quote-text');

      gsap.fromTo(border,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(text,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // Signature writing animation - like handwriting
    if (signatureRef.current) {
      const chars = signatureRef.current.querySelectorAll('.sig-char');

      gsap.set(chars, {
        opacity: 0,
        scaleX: 0,
        scaleY: 0,
        transformOrigin: "left bottom",
      });

      gsap.to(chars, {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: signatureRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }
  }, []);

  // Split heading by comma for animation effect (or just use space if no comma)
  const defaultHeading = "Developer, Designer, Creator, Innovator";
  const displayHeading = heading || defaultHeading;
  const parts = displayHeading.includes(',') ? displayHeading.split(',').map((p, i, arr) => i < arr.length - 1 ? p + ',' : p) : [displayHeading];
  const half = Math.ceil(parts.length / 2);
  const part1 = parts.slice(0, half).join(' ').trim();
  const part2 = parts.slice(half).join(' ').trim();

  return (
    <section id="about" className="py-[35px] md:py-[60px]">
      <div className="container mx-auto">
        {/* Section Heading - Animated */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 md:mb-20">
          <AnimatedHeading className="block">
            {part1}
          </AnimatedHeading>
          {part2 && (
            <span ref={gradientLineRef} className="block" style={{ opacity: 0 }}>
              {(() => {
                const words = part2.split(' ');
                const lastWord = words.pop();
                return (
                  <>
                    {words.length > 0 && <>{words.join(' ')} </>}
                    <span className="gradient-text">{lastWord}</span>
                  </>
                );
              })()}
            </span>
          )}
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left - Image with spotlight effect */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full self-start"
          >
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative rounded-xl overflow-hidden border border-transparent"
              style={{
                background: isHovering
                  ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--glow-accent-rgb), var(--glow-bg-intensity)), transparent), var(--color-code-bg)`
                  : 'var(--color-code-bg)',
              }}
            >
              {/* Animated border glow that follows mouse */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 z-20"
                style={{
                  background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--glow-accent-rgb), var(--glow-accent-intensity)), transparent)`,
                  opacity: isHovering ? 1 : 0,
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMaskComposite: 'xor',
                  padding: '1.5px',
                }}
              />
              {/* Static border */}
              <div className="absolute inset-0 rounded-xl border border-cyan-500/20 pointer-events-none z-20" />

              {/* Image with padding */}
              <div className="relative p-3 z-10">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/assets/about-image.webp"
                    alt="Shakir Ahmed"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {content ? (
              <div className="prose prose-invert max-w-none text-lg leading-relaxed text-gray-300 [&>p]:mb-6">
                <PortableText value={content} />
              </div>
            ) : (
              <>
                {/* Intro Paragraph */}
                <p className="text-lg leading-relaxed text-gray-300">
                  Hello! I&apos;m Shakir Ahmed, a passionate full-stack developer
                  specializing in creating innovative web solutions and user-friendly interfaces.{" "}
                  <strong className="text-white font-semibold">
                    As a dedicated problem solver and creative thinker
                  </strong>
                  , I&apos;m committed to building exceptional digital experiences.
                </p>

                {/* Focus Paragraph */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  My focus is on making web development faster, easier, and
                  accessible to all. Currently, I&apos;m expanding into
                  backend development to grow as a full-stack developer and
                  create seamless, robust web applications.
                </p>

                {/* Quote Section - Animated */}
                <div ref={quoteRef} className="mt-4 pl-6 relative">
                  <div
                    className="quote-border absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500 origin-top"
                  />
                  <p className="quote-text text-gray-400 text-base leading-relaxed italic">
                    I&apos;m a lifelong learner and innovator, driven by a desire to
                    contribute to the developer community with new ideas and
                    tools that deliver real value. I&apos;m passionate about
                    pushing the boundaries of web technologies to
                    empower developers worldwide.
                  </p>
                </div>
              </>
            )}

            {/* Signature Section */}
            <div className="mt-6">
              <p className="text-gray-400 italic mb-2">Shakir Ahmed</p>
              {/* Signature Text - Animated like handwriting */}
              <span
                ref={signatureRef}
                className="inline-block text-4xl md:text-5xl text-cyan-400 font-signature"
              >
                {"Shakir".split('').map((char, index) => (
                  <span
                    key={index}
                    className="sig-char inline-block origin-bottom-left"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
