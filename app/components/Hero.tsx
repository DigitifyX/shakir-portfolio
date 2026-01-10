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
  const [stars, setStars] = useState<{ id: number; posIndex: number; starNum: number }[]>([]);

  useEffect(() => {
    let starId = 0;

    const addStar = () => {
      const posIndex = Math.floor(Math.random() * starPositions.length);
      const starNum = Math.floor(Math.random() * 4) + 1;
      const newStar = { id: starId++, posIndex, starNum };
      
      setStars((prev) => [...prev, newStar]);

      // Remove star after animation completes
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, 1500);
    };

    // Add stars at random intervals (100-400ms)
    const scheduleNext = () => {
      const delay = Math.random() * 300 + 100;
      setTimeout(() => {
        addStar();
        scheduleNext();
      }, delay);
    };

    // Start with a few stars
    for (let i = 0; i < 4; i++) {
      setTimeout(addStar, i * 200);
    }
    scheduleNext();

    return () => setStars([]);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      <AnimatePresence>
        {stars.map((star) => {
          const pos = starPositions[star.posIndex];
          return (
            <motion.div
              key={star.id}
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 30 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.4, 0, 0.2, 1],
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
                src={`/assets/icons/star${star.starNum}.svg`}
                alt="star"
                width={pos.size}
                height={pos.size}
                className="w-full h-full"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
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
            ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.12), transparent), #0d1117`
            : '#0d1117',
        }}
      >
        {/* Animated border glow that follows mouse */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.7), transparent)`,
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
        <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#161b22]">
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

export default function Hero() {
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
    <section id="hero" className="relative py-[35px] md:h-[800px] md:py-0 md:pt-[60px] overflow-hidden hero-bg grid-pattern">
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
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark to-transparent pointer-events-none z-10" />

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
              <span className="text-xs md:text-sm text-gray-300">Welcome to my universe</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Hello with sparkle stars */}
              <div className="relative inline-block">
                <h1 className="hero-heading font-bold mb-1 md:mb-2">
                  Hello
                </h1>
                <SparkleStars />
              </div>
              <h1 className="hero-heading font-bold whitespace-nowrap">
                I&apos;m <span className="gradient-text">Shakir Ahmed</span>
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
              className="mt-4 md:mt-5 text-gray-400 text-sm md:text-base max-w-md"
            >
              JavaScript lover 🚀 | React & Next.js enthusiast 🔧 | Crafting 
              beautiful web experiences and coding the future 💻 ✨
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 md:mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="px-6 py-2.5 md:py-3 rounded-lg bg-accent-blue hover:bg-blue-600 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Learn More
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 md:py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-all duration-300"
              >
                Get Resume
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
