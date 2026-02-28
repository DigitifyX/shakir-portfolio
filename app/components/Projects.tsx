"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSectionHeading from "./AnimatedSectionHeading";
import { urlForImage } from "@/sanity/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Type for project data (from Sanity or fallback)
export type ProjectItem = {
  _id: string;
  title: string | null;
  subtitle?: string | null;
  slug: string | null;
  description: string | null;
  category: string | null;
  link: string | null;
  githubUrl?: string | null;
  technologies: string[] | null;
  callToAction?: string | null;
  challenge?: string | null;
  solution?: string | null;
  features?: string[] | null;
  gallery?: any[] | null;
  gradient: string | null;
  coverImage: any;
  landscapeImage?: any;
};

// Placeholder project data — used when no Sanity data exists
const fallbackProjects: ProjectItem[] = [
  { _id: "1", title: "Smart Booking System", subtitle: "AutoLux Detailing (Concept)", slug: null, category: "Web App", description: "A multi-step, interactive booking system that captures partial leads.", gradient: "from-purple-600 to-blue-900", link: "#", githubUrl: "#", technologies: ["React", "Zustand", "Tailwind", "Webhooks"], callToAction: "View Case Study", coverImage: null },
  { _id: "2", title: "Analytics Dashboard", subtitle: "SaaS Platform Concept", slug: null, category: "UI/UX", description: "Clean analytics dashboard designed with Figma for SaaS style products.", gradient: "from-pink-500 to-orange-500", link: "#", technologies: ["Figma", "Design System"], callToAction: "View Mockups", coverImage: null },
  { _id: "3", title: "Learning App UI", subtitle: "Mobile EdTech Concept", slug: null, category: "Mobile", description: "Mobile app screens for a simple learning / course experience.", gradient: "from-blue-400 to-cyan-500", link: "#", technologies: ["React Native", "Expo"], callToAction: "See Details", coverImage: null },
];

// UI Mockup Placeholder Component
function UIMockup() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-[200px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3">
        {/* Window controls */}
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
        </div>

        {/* Content lines */}
        <div className="space-y-2">
          <div className="h-2 bg-black/20 dark:bg-white/20 rounded w-3/4" />
          <div className="h-2 bg-black/20 dark:bg-white/20 rounded w-full" />
          <div className="h-2 bg-black/20 dark:bg-white/20 rounded w-5/6" />
          <div className="h-2 bg-black/20 dark:bg-white/20 rounded w-4/5 mt-3" />
          <div className="h-2 bg-black/20 dark:bg-white/20 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

// Quick View Popup Component
function QuickViewPopup({
  project,
  isOpen,
  onClose
}: {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 md:pb-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Popup Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[var(--color-bg-primary)] w-full max-w-5xl max-h-[90vh] md:max-h-[85vh] rounded-2xl border border-[var(--color-border)] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        style={{
          boxShadow: "0 25px 50px -12px rgba(var(--glow-accent-rgb), 0.25)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Column - Visuals (Gradient + Cover Mockup + Gallery) */}
        <div className={`w-full md:w-5/12 lg:w-1/2 relative flex flex-col min-h-[300px] shrink-0 bg-gradient-to-br ${project.gradient || "from-gray-800 to-gray-900"} overflow-hidden`}>
          {/* Main Visual Area */}
          <div className="flex-grow flex items-center justify-center p-8 relative">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative w-full h-full flex items-center justify-center z-10">
              {project.landscapeImage ? (
                <div className="relative w-full h-full min-h-[250px] md:h-full">
                  <Image
                    src={urlForImage(project.landscapeImage)?.url() as string}
                    alt={project.title || "Project Landscape"}
                    fill
                    className="object-contain md:object-cover drop-shadow-2xl"
                  />
                </div>
              ) : project.coverImage ? (
                <div className="relative w-full h-full min-h-[250px] md:h-full">
                  <Image
                    src={urlForImage(project.coverImage)?.url() as string}
                    alt={project.title || "Project Cover"}
                    fill
                    className="object-contain md:object-cover drop-shadow-2xl"
                  />
                </div>
              ) : (
                <div className="transform scale-110 md:scale-125">
                  <UIMockup />
                </div>
              )}
            </div>
          </div>

          {/* Optional: Future Gallery Thumbnails Row */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="h-24 bg-black/40 backdrop-blur-md border-t border-white/10 flex gap-2 p-3 overflow-x-auto no-scrollbar relative z-10">
              {project.gallery.map((img, i) => (
                <div key={i} className="flex-shrink-0 w-24 h-full bg-white/5 rounded border border-white/10">
                  {/* Image Thumbnail Placeholder */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Project Details */}
        <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col bg-[var(--color-bg-primary)] overflow-y-auto p-6 md:p-8 lg:p-12 min-h-0 relative">
          <div className="flex-1 flex flex-col">

            {/* Header section */}
            <div className="mb-8">
              {project.subtitle && (
                <div className="text-sm font-semibold text-cyan-500 dark:text-cyan-400 uppercase tracking-wider mb-2">
                  {project.subtitle}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] mb-4">
                {project.title}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Challenge & Solution Grid */}
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                {project.challenge && (
                  <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/10">
                    <h4 className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      The Challenge
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/10">
                    <h4 className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      The Solution
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-text-primary)]">
                      <svg className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons - Matching Card Style */}
            <div className="mt-auto pt-6 border-t border-[var(--color-border)] flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-heading)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-2 transition-all duration-300 pointer-events-none opacity-80"
              >
                Details
              </button>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/20 rounded-xl px-4 py-2 transition-all duration-300"
                >
                  {project.callToAction || "Live Site"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-bg-hover)] rounded-xl transition-all duration-300 flex-shrink-0 relative"
                  style={{ marginLeft: 'auto' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                    <path d="M12 2C6.477 2 2 6.47 2 11.984c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.147 22 16.4 22 11.984 22 6.47 17.523 2 12 2z" />
                  </svg>
                </a>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Project Card Component with GSAP animation and hover effect
function ProjectCard({
  project,
  index,
  onQuickView
}: {
  project: ProjectItem;
  index: number;
  onQuickView: (project: ProjectItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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


  // Note: Card animations are now handled by the parent grid animation
  // This keeps the animation smooth when filters change

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer border border-transparent flex flex-col h-full"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        background: isHovering
          ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--glow-accent-rgb), var(--glow-bg-intensity)), transparent), var(--color-card-surface)`
          : 'var(--color-card-surface)',
      }}
    >
      {/* Animated border glow that follows mouse */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
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
      <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 pointer-events-none z-20" />

      {/* Top Section - Gradient Background and Cover Image */}
      <div
        ref={imageRef}
        className={`relative h-48 bg-gradient-to-br ${project.gradient || "from-gray-800 to-gray-900"} overflow-hidden transition-all duration-300 flex items-center justify-center`}
      >
        {project.coverImage ? (
          <div className="absolute inset-0 w-full h-full group-hover:scale-110 transition-transform duration-700">
            <Image
              src={urlForImage(project.coverImage)?.url() as string}
              alt={project.title || "Project Cover"}
              fill
              className="object-cover object-top opacity-80 blur-[2px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-500"
            />
          </div>
        ) : (
          <UIMockup />
        )}

        {/* Overlay with Quick View Button and Technology Tags - Appears on card hover */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Quick View Button - Top Left with beautiful animation */}
          <motion.button
            initial={{ scale: 0, opacity: 0, x: -20, y: -20, rotate: -180 }}
            animate={{
              scale: isHovering ? 1 : 0,
              opacity: isHovering ? 1 : 0,
              x: isHovering ? 0 : -20,
              y: isHovering ? 0 : -20,
              rotate: isHovering ? 0 : -180,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
            whileHover={{
              scale: 1.15,
              rotate: 5,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(project);
            }}
            className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-cyan-500/90 hover:bg-cyan-500 text-white backdrop-blur-sm border border-cyan-400/50 shadow-lg shadow-cyan-500/30 flex items-center justify-center pointer-events-auto"
          >
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              initial={{ scale: 0 }}
              animate={{ scale: isHovering ? 1 : 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </motion.svg>
          </motion.button>

          {/* Technology Tags - Bottom Left - Same Line with stagger animation - 10px above bottom */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: isHovering ? 0 : -50,
              opacity: isHovering ? 1 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            className="absolute left-4 flex flex-row gap-2 pointer-events-none"
            style={{ bottom: '30px' }}
          >
            {project.technologies?.map((tech, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{
                  scale: isHovering ? 1 : 0,
                  opacity: isHovering ? 1 : 0,
                  y: isHovering ? 0 : 20,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.25 + (idx * 0.1),
                }}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                }}
                className="px-3 py-1.5 rounded-lg bg-black/60 dark:bg-black/60 backdrop-blur-sm text-white text-xs font-medium border border-white/20 whitespace-nowrap"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Dark background with blur effect and content - Left Aligned */}
      <div className="p-6 relative z-10 backdrop-blur-sm text-left flex flex-col flex-grow bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] md:border-t-0 md:bg-transparent">
        {/* Subtitle / Client */}
        {project.subtitle && (
          <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1 line-clamp-1">
            {project.subtitle}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-[var(--color-text-heading)] mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* CTA Button placed at bottom */}
        <div className="mt-auto flex items-center gap-3 border-t border-[var(--color-border)] pt-4 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(project);
            }}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-heading)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-2 transition-all duration-300 group-hover:border-[var(--color-border-hover)]"
          >
            Details
          </button>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/20 rounded-xl px-4 py-2 transition-all duration-300"
            >
              {project.callToAction || "Live Site"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-9 h-9 text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-xl transition-all duration-300 flex-shrink-0 relative"
              style={{ marginLeft: 'auto' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M12 2C6.477 2 2 6.47 2 11.984c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.147 22 16.4 22 11.984 22 6.47 17.523 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export interface ProjectsProps {
  projects: ProjectItem[];
  heading?: string;
  subheading?: string;
}

export default function Projects({ projects, heading, subheading }: ProjectsProps) {
  const allProjects = projects && projects.length > 0 ? projects : fallbackProjects;
  // Dynamically generate categories from projects
  const uniqueCategories = Array.from(new Set(allProjects.map((p) => p.category).filter(Boolean))) as string[];
  const categories = [
    { id: "all", label: "All" },
    ...uniqueCategories.map(cat => ({ id: cat, label: cat }))
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [quickViewProject, setQuickViewProject] = useState<ProjectItem | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter);

  // Animate entire tab bar on scroll
  useEffect(() => {
    if (!tabsRef.current) return;

    gsap.fromTo(
      tabsRef.current,
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // GSAP animation for tab button changes
  useEffect(() => {
    Object.entries(buttonRefs.current).forEach(([id, button]) => {
      if (!button) return;

      if (id === activeFilter) {
        // Animate active button
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      } else {
        // Reset inactive buttons
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
        });
      }
    });
  }, [activeFilter]);

  // GSAP animation for grid - handles both initial load and filter changes
  useEffect(() => {
    if (!gridRef.current) return;

    // Use children instead of querySelectorAll with child combinator
    const cards = Array.from(gridRef.current.children) as HTMLElement[];

    if (cards.length === 0) return;

    // Set initial state
    gsap.set(cards, {
      opacity: 0,
      y: 40,
      scale: 0.97,
    });

    // Animate in with smooth entrance
    const tl = gsap.timeline();
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.08,
      delay: 0.1,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, [activeFilter, filteredProjects.length]);

  const handleFilterChange = (categoryId: string) => {
    setActiveFilter(categoryId);
  };

  const handleQuickView = (project: ProjectItem) => {
    setQuickViewProject(project);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    // Small delay before clearing project to allow exit animation
    setTimeout(() => {
      setQuickViewProject(null);
    }, 300);
  };

  return (
    <section id="projects" className="py-[35px] md:py-[60px]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center">
          <AnimatedSectionHeading
            heading={
              heading ? (
                heading.includes("Projects") ? (
                  <>
                    {heading.split("Projects")[0]}
                    <span className="gradient-text">Projects</span>
                    {heading.split("Projects")[1]}
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
                  Recent <span className="gradient-text">Projects</span>
                </>
              )
            }
            subheading={subheading || undefined}
          />

          {/* Filter Buttons - Scrollable on mobile, centered on desktop */}
          <div ref={tabsRef} className="w-full flex justify-center mb-8 md:mb-12">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] max-w-full">
              {categories.map((category) => (
                <button
                  key={category.id}
                  ref={(el) => {
                    buttonRefs.current[category.id] = el;
                  }}
                  onClick={() => handleFilterChange(category.id)}
                  className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeFilter === category.id
                    ? 'bg-[var(--color-text-heading)] text-[var(--color-bg-primary)] shadow-md'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-bg-primary)]'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Quick View Popup */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <QuickViewPopup
            project={quickViewProject}
            isOpen={isQuickViewOpen}
            onClose={handleCloseQuickView}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
//ok