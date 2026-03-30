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
  resultMetric?: string | null;
  metrics?: { label: string; value: string }[] | null;
};

// Placeholder project data — used when no Sanity data exists
const fallbackProjects: ProjectItem[] = [
  { 
    _id: "1", 
    title: "Smart Booking System", 
    subtitle: "Custom SaaS", 
    slug: null, 
    category: "Web App", 
    description: "Built a fully automated scheduling platform eliminating manual back-and-forth emails for service businesses.", 
    resultMetric: "10h/wk Admin Saved",
    gradient: "from-purple-600 to-blue-900", 
    link: "#", 
    githubUrl: "#", 
    technologies: ["React", "Next.js", "Zustand", "Stripe"], 
    callToAction: "View Case Study", 
    coverImage: null,
    challenge: "The client was losing 10-15 hours every week managing appointments via email and text, resulting in missed leads, delayed payments, and heavy administrative overhead.",
    solution: "I engineered a seamless multi-step booking funnel that captures lead information, processes deposits securely, and syncs directly with their existing Google Calendar in real-time.",
    metrics: [
      { label: "Admin Time Saved", value: "10+ hrs/wk" },
      { label: "Show-up Rate", value: "98%" },
      { label: "Booking Speed", value: "< 2 mins" }
    ]
  },
  { 
    _id: "2", 
    title: "Analytics Dashboard", 
    subtitle: "FinTech Platform", 
    slug: null, 
    category: "UI/UX", 
    description: "Designed a clean, intuitive analytics dashboard that makes complex financial charts simple to read at a glance.", 
    resultMetric: "Data loaded 3x faster",
    gradient: "from-pink-500 to-orange-500", 
    link: "#", 
    technologies: ["Figma", "Design System", "TailwindCSS"], 
    callToAction: "View Mockups", 
    coverImage: null,
    challenge: "Users were overwhelmed by dense data tables and slow-loading financial charts, leading to high abandonment rates and poor product adoption.",
    solution: "Created a modular widget system focusing strictly on the 'North Star' metrics users care about. Implemented skeleton loaders and deferred secondary data to keep the perceived performance lightning fast.",
    metrics: [
      { label: "Load Time", value: "0.8s" },
      { label: "User Retention", value: "+45%" },
      { label: "Data Points", value: "10,000+" }
    ]
  },
  { 
    _id: "3", 
    title: "Learning App UI", 
    subtitle: "Mobile EdTech", 
    slug: null, 
    category: "Mobile", 
    description: "Mobile-first learning experience emphasizing deep focus and distraction-free course consumption.", 
    resultMetric: "90% Course Completion",
    gradient: "from-blue-400 to-cyan-500", 
    link: "#", 
    technologies: ["React Native", "Expo", "Reanimated"], 
    callToAction: "See Details", 
    coverImage: null,
    challenge: "Mobile learners were constantly distracted by cluttered interfaces and non-essential notifications, breaking their state of flow.",
    solution: "Stripped away all non-critical UI elements during active learning mode. Introduced micro-interactions and progress rings that reward consecutive completions without being visually overwhelming.",
    metrics: [
      { label: "Completion Rate", value: "90%" },
      { label: "Session Length", value: "45 min" },
      { label: "App Rating", value: "4.9/5" }
    ]
  },
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Normalize images array
  const images: any[] = [];
  if (project?.landscapeImage) images.push(project.landscapeImage);
  else if (project?.coverImage) images.push(project.coverImage);
  
  if (project?.gallery && Array.isArray(project.gallery)) {
    images.push(...project.gallery);
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      }
      
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev! + 1) % images.length);
        }
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, lightboxIndex, images.length]);

  if (!isOpen || !project) return null;

  const renderGallery = () => {
    if (images.length === 0) return (
      <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-secondary)]">No Image</div>
    );

    const renderImage = (img: any, idx: number, className: string) => (
      <div 
        key={idx} 
        className={`relative overflow-hidden group cursor-zoom-in rounded-none ${className}`}
        onClick={(e) => {
          e.stopPropagation();
          setLightboxIndex(idx);
        }}
      >
        <Image
          src={urlForImage(img)?.url() as string}
          alt={img?.alt || project.title || `Gallery Image ${idx + 1}`}
          title={img?.title || undefined}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-colors duration-300" />
      </div>
    );

    if (images.length === 1) {
      return renderImage(images[0], 0, "w-full h-full");
    }
    
    if (images.length === 2) {
      return (
        <div className="flex flex-col md:flex-row w-full h-full gap-1.5 bg-[var(--color-border)]">
          {renderImage(images[0], 0, "w-full md:w-1/2 h-full")}
          {renderImage(images[1], 1, "w-full md:w-1/2 h-full")}
        </div>
      );
    }
    
    if (images.length === 3) {
      return (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-1.5 w-full h-full bg-[var(--color-border)]">
          {renderImage(images[0], 0, "h-[250px] md:h-full w-full")}
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-1.5 h-[150px] md:h-full w-full">
            {renderImage(images[1], 1, "h-full w-full")}
            {renderImage(images[2], 2, "h-full w-full")}
          </div>
        </div>
      );
    }

    if (images.length === 4) {
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-1.5 w-full h-full bg-[var(--color-border)]">
          {images.map((img, idx) => renderImage(img, idx, "h-[150px] md:h-full w-full"))}
        </div>
      );
    }

    if (images.length === 5) {
      return (
        <div className="flex flex-col gap-1.5 w-full h-full bg-[var(--color-border)]">
          <div className="grid grid-cols-3 gap-1.5 h-[150px] md:h-1/2">
             {images.slice(0, 3).map((img, idx) => renderImage(img, idx, "h-full w-full"))}
          </div>
          <div className="grid grid-cols-2 gap-1.5 h-[150px] md:h-1/2">
             {images.slice(3, 5).map((img, idx) => renderImage(img, idx + 3, "h-full w-full"))}
          </div>
        </div>
      );
    }

    if (images.length === 6) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-1.5 w-full h-full bg-[var(--color-border)]">
          {images.map((img, idx) => renderImage(img, idx, "h-[150px] md:h-full w-full"))}
        </div>
      );
    }

    // 7+ images masonry flex/grid
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 w-full h-full auto-rows-[150px] md:auto-rows-[250px] bg-[var(--color-border)]">
          {images.map((img, idx) => renderImage(img, idx, "h-full w-full"))}
        </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Popup Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative bg-[var(--color-bg-primary)] w-full h-full md:h-auto md:max-h-[90vh] md:w-[90vw] md:max-w-4xl md:rounded-2xl border-0 md:border border-[var(--color-border)] overflow-hidden flex flex-col shadow-2xl z-10"
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-hover)] backdrop-blur-md border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] transition-all shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto w-full flex-1 no-scrollbar pb-10">
          {/* Hero Zone */}
          <div className="px-6 md:px-12 pt-16 md:pt-20 pb-12 text-center relative">
            {project.subtitle && (
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-600 dark:text-cyan-500 mb-4">
                {project.subtitle}
              </div>
            )}
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-[var(--color-text-heading)] mb-10 mx-auto max-w-3xl leading-tight">
              {project.title}
            </h2>

            {/* Smart Gallery Hero */}
            <div className={`w-full ${images.length > 6 ? '' : (images.length > 1 ? 'aspect-auto' : 'aspect-[4/3]')} md:aspect-[21/9] rounded-xl overflow-hidden relative border border-[var(--color-border)] shadow-xl bg-[var(--color-bg-secondary)]`}>
              {renderGallery()}
            </div>
          </div>

          {/* Results Banner */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="px-6 md:px-12 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6 md:p-8 text-center shadow-sm">
                    <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] mb-2 tracking-tight">{metric.value}</div>
                    <div className="text-xs uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* The Challenge */}
          {project.challenge && (
            <div className="px-6 md:px-16 mb-16 max-w-4xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-text-secondary)] opacity-70 mb-6 text-center md:text-left">The Challenge</div>
              <p className="text-[17px] md:text-lg text-[var(--color-text-secondary)] leading-[1.7] md:leading-[1.8] font-medium tracking-wide">
                {project.challenge}
              </p>
            </div>
          )}

          {/* The Approach */}
          {project.solution && (
            <div className="px-6 md:px-16 mb-16 max-w-4xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-text-secondary)] opacity-70 mb-6 text-center md:text-left">The Approach</div>
              <p className="text-[17px] md:text-lg text-[var(--color-text-secondary)] leading-[1.7] md:leading-[1.8] font-medium tracking-wide">
                {project.solution}
              </p>
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="px-6 md:px-16 mb-16 max-w-4xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-text-secondary)] opacity-70 mb-6 text-center md:text-left">Key Features</div>
              <ul className="space-y-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-[var(--color-text-secondary)]">
                    <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-500 flex-shrink-0 mt-0.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[16px] md:text-[17px] leading-[1.6] tracking-wide font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="px-6 md:px-16 mb-16 max-w-4xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-text-secondary)] opacity-70 mb-6 text-center md:text-left">Technologies Used</div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] px-4 py-2 rounded-lg text-xs md:text-sm tracking-wide shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA Box */}
          <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-10 md:p-16 text-center mt-12 mb-safe">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-heading)] mb-8">Need something similar built for your business?</h3>
            <a
              href="#contact"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="inline-block px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-500 !text-white font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(8,145,178,0.3)]"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Lightbox */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-6 right-6 z-[120] text-white/50 hover:text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[120] p-4 text-white/50 hover:text-white transition-colors"
                aria-label="Previous Image"
              >
                <svg className="w-8 h-8 md:w-12 md:h-12 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! + 1) % images.length);
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[120] p-4 text-white/50 hover:text-white transition-colors"
                aria-label="Next Image"
              >
                <svg className="w-8 h-8 md:w-12 md:h-12 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image Container */}
            <motion.div 
              className="relative w-full h-full max-w-[95vw] max-h-[85vh] md:max-w-[85vw] md:max-h-[85vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={urlForImage(images[lightboxIndex])?.url() as string}
                alt={images[lightboxIndex]?.alt || project.title || `Lightbox Image ${lightboxIndex + 1}`}
                title={images[lightboxIndex]?.title || undefined}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Project Card Component
function ProjectCard({
  project,
  index,
  onQuickView
}: {
  project: ProjectItem;
  index: number;
  onQuickView: (project: ProjectItem) => void;
}) {
  return (
    <div
      onClick={() => onQuickView(project)}
      className="group flex flex-col h-full overflow-hidden rounded-2xl cursor-pointer bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5 dark:shadow-black/20"
    >
      {/* Top Section - Cover Image */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        {project.coverImage ? (
          <Image
            src={urlForImage(project.coverImage)?.url() as string}
            alt={project.title || "Project Cover"}
            fill
            className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center transform scale-125 opacity-30">
            <UIMockup />
          </div>
        )}
      </div>

      {/* Bottom Section - Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 text-left">
        {project.subtitle && (
          <div className="text-[11px] font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-[0.2em] mb-3">
            {project.subtitle}
          </div>
        )}

        <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-heading)] mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors ease-in-out line-clamp-2">
          {project.title}
        </h3>

        <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* Standout Metric Callout */}
        {project.resultMetric && (
          <div className="mb-6 bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-500/10 rounded-lg py-2.5 px-4 text-[13px] font-semibold text-cyan-700 dark:text-cyan-300">
            {project.resultMetric}
          </div>
        )}

        {/* Tech Stack Chips at bottom of content */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.technologies?.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-[11px] uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <span className="px-2.5 py-1 rounded bg-transparent border border-transparent text-[var(--color-text-secondary)] opacity-70 text-[11px] uppercase tracking-wider">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-5 mt-auto">
          <button className="text-[13px] font-semibold text-[var(--color-text-heading)] px-5 py-2.5 rounded-lg bg-[var(--color-bg-primary)] group-hover:bg-[var(--color-border)] transition-colors border border-transparent">
            Details
          </button>
          
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex items-center gap-2 text-[13px] font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 px-5 py-2.5 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 hover:bg-cyan-200 dark:hover:bg-cyan-500/20 transition-colors"
            >
              View Live Site
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
