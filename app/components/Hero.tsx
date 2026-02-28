"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Star positions around the "Hello" text
const starPositions = [
  { top: "-10%", left: "20%", size: 16 },
  { top: "0%", right: "-5%", size: 20 },
  { top: "30%", right: "-15%", size: 14 },
  { top: "60%", right: "-10%", size: 18 },
  { top: "80%", left: "30%", size: 12 },
  { top: "70%", left: "-10%", size: 16 },
  { top: "40%", left: "-15%", size: 20 },
  { top: "10%", left: "-5%", size: 14 },
  { top: "50%", right: "0%", size: 22 },
  { top: "-5%", left: "50%", size: 18 },
];

// Sparkle star component with smooth continuous animation
function SparkleStars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {starPositions.map((pos, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.3],
            rotate: [-30, 0, 30],
          }}
          transition={{
            duration: 1.5 + Math.random() * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            width: pos.size,
            height: pos.size,
          }}
        >
          <Image
            src={`/assets/icons/star${(i % 4) + 1}.svg`}
            alt="star"
            width={pos.size}
            height={pos.size}
            className="w-full h-full"
          />
        </motion.div>
      ))}
    </div>
  );
}

// Code Editor with spotlight glow effect
function CodeEditor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;
    const rect = editorRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative w-full max-w-[500px] lg:max-w-[480px] xl:max-w-[520px] mx-auto lg:mx-0"
    >
      <div
        ref={editorRef}
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
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
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
        <div className="absolute inset-0 rounded-xl border border-cyan-500/20 pointer-events-none" />

        {/* Window Header */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-b border-white/10" style={{ background: 'var(--color-code-header)' }}>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 text-sm text-gray-400">developer.js</span>
        </div>

        {/* Code Content */}
        <div className="relative z-10 p-4 md:p-5 font-mono text-[11px] md:text-xs overflow-x-auto max-h-[280px] md:max-h-[420px] overflow-y-auto">
          <pre className="text-gray-300">
            <code>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-300">profile</span>{" "}
              <span className="text-white">=</span>{" "}
              <span className="text-yellow-300">{"{"}</span>
              {"\n"}
              {"  "}<span className="text-red-400">name</span>:{" "}
              <span className="text-green-400">&apos;Shakir Ahmed&apos;</span>,
              {"\n"}
              {"  "}<span className="text-red-400">title</span>:{" "}
              <span className="text-green-400">&apos;Full-Stack Developer | Problem Solver&apos;</span>,
              {"\n"}
              {"  "}<span className="text-red-400">skills</span>:{" "}
              <span className="text-yellow-300">[</span>
              {"\n"}
              {"    "}<span className="text-green-400">&apos;React&apos;</span>,{" "}
              <span className="text-green-400">&apos;NextJS&apos;</span>,{" "}
              <span className="text-green-400">&apos;Redux&apos;</span>,{" "}
              <span className="text-green-400">&apos;Express&apos;</span>,
              {"\n"}
              {"    "}<span className="text-green-400">&apos;MySQL&apos;</span>,{" "}
              <span className="text-green-400">&apos;MongoDB&apos;</span>,{" "}
              <span className="text-green-400">&apos;Docker&apos;</span>,{" "}
              <span className="text-green-400">&apos;TypeScript&apos;</span>,
              {"\n"}
              {"  "}<span className="text-yellow-300">]</span>,
              {"\n"}
              {"  "}<span className="text-red-400">hardWorker</span>:{" "}
              <span className="text-orange-400">true</span>,
              {"\n"}
              {"  "}<span className="text-red-400">quickLearner</span>:{" "}
              <span className="text-orange-400">true</span>,
              {"\n"}
              {"  "}<span className="text-red-400">problemSolver</span>:{" "}
              <span className="text-orange-400">true</span>,
              {"\n"}
              {"  "}<span className="text-red-400">yearsOfExperience</span>:{" "}
              <span className="text-cyan-400">4</span>,
              {"\n"}
              {"  "}<span className="text-red-400">hireable</span>:{" "}
              <span className="text-purple-400">function</span>
              <span className="text-yellow-300">()</span>{" "}
              <span className="text-yellow-300">{"{"}</span>
              {"\n"}
              {"    "}<span className="text-purple-400">return</span> (
              {"\n"}
              {"      "}<span className="text-cyan-400">this</span>.
              <span className="text-blue-300">hardWorker</span>{" "}
              <span className="text-white">&&</span>
              {"\n"}
              {"      "}<span className="text-cyan-400">this</span>.
              <span className="text-blue-300">problemSolver</span>{" "}
              <span className="text-white">&&</span>
              {"\n"}
              {"      "}<span className="text-cyan-400">this</span>.
              <span className="text-blue-300">skills</span>.
              <span className="text-yellow-300">length</span>{" "}
              <span className="text-white">&gt;=</span>{" "}
              <span className="text-cyan-400">5</span>{" "}
              <span className="text-white">&&</span>
              {"\n"}
              {"      "}<span className="text-cyan-400">this</span>.
              <span className="text-blue-300">yearsOfExperience</span>{" "}
              <span className="text-white">&gt;=</span>{" "}
              <span className="text-cyan-400">3</span>
              {"\n"}
              {"    "});
              {"\n"}
              {"  "}<span className="text-yellow-300">{"}"}</span>
              {"\n"}
              <span className="text-yellow-300">{"}"}</span>;
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

export interface HeroProps {
  badge?: string;
  heading?: string;
  subheading?: string;
}

export default function Hero({ badge, heading, subheading }: HeroProps) {
  // Vertical falling lights - positioned on vertical grid lines (every 80px)
  const verticalLights = [
    { left: 80, duration: '5s', delay: '0s' },
    { left: 160, duration: '7s', delay: '1.5s' },
    { left: 240, duration: '4s', delay: '3s' },
    { left: 320, duration: '6s', delay: '0.5s' },
    { left: 400, duration: '8s', delay: '2s' },
    { left: 480, duration: '5.5s', delay: '4s' },
    { left: 560, duration: '7s', delay: '1s' },
    { left: 640, duration: '4.5s', delay: '2.5s' },
    { left: 720, duration: '6.5s', delay: '0s' },
    { left: 800, duration: '5s', delay: '3.5s' },
    { left: 880, duration: '8s', delay: '1s' },
    { left: 960, duration: '6s', delay: '2s' },
    { left: 1040, duration: '7s', delay: '0.5s' },
    { left: 1120, duration: '5s', delay: '4s' },
    { left: 1200, duration: '6s', delay: '1.5s' },
    { left: 1280, duration: '4s', delay: '3s' },
  ];

  return (
    <section id="hero" className="relative pt-[100px] pb-[35px] md:h-[800px] md:py-0 md:pt-[164px] overflow-hidden hero-bg grid-pattern">
      {/* Vertical Falling Light Effects - Down the grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {verticalLights.map((light, index) => (
          <div
            key={index}
            className="vertical-line-light"
            style={{
              left: `${light.left}px`,
              animationDuration: light.duration,
              animationDelay: light.delay,
            }}
          />
        ))}
      </div>

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-secondary/50 border border-white/10 mb-4 md:mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {badge || "Welcome to my universe"}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Hello with sparkle stars */}
              <div className="relative inline-block">
                <h1 className="hero-heading font-bold mb-1 md:mb-2" style={{ color: 'var(--color-text-heading)' }}>
                  Hello
                </h1>
                <SparkleStars />
              </div>
              <h1 className="hero-heading font-bold whitespace-nowrap" style={{ color: 'var(--color-text-heading)' }}>
                {heading ? (
                  heading.includes("Shakir Ahmed") ? (
                    <>
                      {heading.split("Shakir Ahmed")[0]}
                      <span className="gradient-text ml-2">Shakir Ahmed</span>
                      {heading.split("Shakir Ahmed")[1]}
                    </>
                  ) : (
                    <span className="gradient-text">{heading}</span>
                  )
                ) : (
                  <>I&apos;m <span className="gradient-text">Shakir Ahmed</span></>
                )}
              </h1>
            </motion.div>

            {/* Skill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 md:mt-6"
            >
              <span className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium">
                Full-Stack Developer & Problem Solver
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 md:mt-5 text-sm md:text-base max-w-md"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {subheading || "JavaScript lover 🚀 | React & Next.js enthusiast 🔧 | Crafting beautiful web experiences and coding the future 💻 ✨"}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 md:mt-8 flex flex-wrap gap-4"
            >
              {/* Primary — gradient fill (matches Contact form button) */}
              <a
                href="#projects"
                className="group relative px-7 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--glow-accent-rgb),var(--glow-bg-intensity))]"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                }}
              >
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>

              {/* Secondary — gradient border */}
              <a
                href="#contact"
                className="group relative px-7 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--glow-accent-rgb),0.08)]"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {/* Gradient border via pseudo background */}
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{
                    padding: '2px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                <span className="relative z-10">Get Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </motion.div>
          </div>

          {/* Right Content - Code Editor */}
          <CodeEditor />
        </div>
      </div>
    </section>
  );
}
