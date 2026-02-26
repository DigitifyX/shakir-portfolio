"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

gsap.registerPlugin(ScrollTrigger);

// Type for project data (from Sanity or fallback)
export type ProjectItem = {
  _id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  category: string | null;
  link: string | null;
  technologies: string[] | null;
  gradient: string | null;
  coverImage: any;
};

// Placeholder project data — used when no Sanity data exists
const fallbackProjects: ProjectItem[] = [
  { _id: "1", title: "BadhonAI Portfolio", slug: null, category: "web", description: "Personal portfolio website focused on speed, clarity and simple UX.", gradient: "from-purple-600 to-blue-900", link: "#", technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"], coverImage: null },
  { _id: "2", title: "Dashboard Concept", slug: null, category: "uiux", description: "Clean analytics dashboard designed with Figma for SaaS style products.", gradient: "from-pink-500 to-orange-500", link: "#", technologies: ["Figma", "UI/UX Design", "Prototyping"], coverImage: null },
  { _id: "3", title: "Learning App UI", slug: null, category: "mobile", description: "Mobile app screens for a simple learning / course experience.", gradient: "from-blue-400 to-cyan-500", link: "#", technologies: ["React Native", "Flutter", "UI Design"], coverImage: null },
  { _id: "4", title: "Landing Page", slug: null, category: "web", description: "Clean landing page designed for modern SaaS / product launches.", gradient: "from-green-500 to-emerald-400", link: "#", technologies: ["Next.js", "React", "Framer Motion"], coverImage: null },
  { _id: "5", title: "Edit & Motion", slug: null, category: "multimedia", description: "Short form edits and motion work for social platforms.", gradient: "from-orange-500 to-pink-500", link: "#", technologies: ["After Effects", "Premiere Pro", "Motion Graphics"], coverImage: null },
  { _id: "6", title: "Mini Product UI", slug: null, category: "uiux", description: "Small product UI explorations for practicing new ideas.", gradient: "from-blue-300 to-pink-300", link: "#", technologies: ["Figma", "Design System", "UI Components"], coverImage: null },
];

const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "uiux", label: "UI/UX" },
  { id: "multimedia", label: "Multimedia" },
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
          <div className="h-2 bg-white/20 rounded w-3/4" />
          <div className="h-2 bg-white/20 rounded w-full" />
          <div className="h-2 bg-white/20 rounded w-5/6" />
          <div className="h-2 bg-white/20 rounded w-4/5 mt-3" />
          <div className="h-2 bg-white/20 rounded w-full" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-[var(--color-card-surface)] border border-cyan-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        style={{
          boxShadow: "0 20px 60px rgba(var(--glow-accent-rgb), 0.3)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
          <p className="text-gray-300 mb-6">{project.description}</p>

          {/* Placeholder for future quick view content */}
          <div className="bg-white/5 rounded-lg p-8 text-center text-gray-400">
            <p>Quick View Content</p>
            <p className="text-sm mt-2">Full project details will be designed here</p>
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

  const categoryLabels: Record<string, string> = {
    web: "WEB DEVELOPMENT",
    mobile: "MOBILE",
    uiux: "UI/UX",
    multimedia: "MULTIMEDIA",
  };

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
      className="group relative overflow-hidden rounded-2xl cursor-pointer border border-transparent"
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

      {/* Top Section - Gradient with UI Mockup */}
      <div
        ref={imageRef}
        className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden transition-all duration-300 pb-2.5`}
      >
        <UIMockup />

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
                className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium border border-white/20 whitespace-nowrap"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Dark background with blur effect and content - Center Aligned */}
      <div className="p-6 relative z-10 backdrop-blur-sm text-center">
        {/* Category Label */}
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {categoryLabels[project.category || ''] || (project.category || '').toUpperCase()}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 leading-relaxed">
          {project.description}
        </p>
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

  // Filter projects based on active filter
  useEffect(() => {
    if (!tabsRef.current) return;

    const buttons = tabsRef.current.querySelectorAll("button");
    gsap.fromTo(
      buttons,
      {
        opacity: 0,
        y: 20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 85%",
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
      y: 60,
      scale: 0.9,
      rotationX: -15,
    });

    // Animate in with beautiful entrance
    const tl = gsap.timeline();
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.2,
      ease: "back.out(1.7)",
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

          {/* Filter Buttons - Center Aligned */}
          <div ref={tabsRef} className="inline-flex flex-wrap gap-2 justify-center p-1.5 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] mb-8 md:mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                ref={(el) => {
                  buttonRefs.current[category.id] = el;
                }}
                onClick={() => handleFilterChange(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === category.id
                  ? 'bg-[var(--color-text-heading)] text-[var(--color-bg-primary)] shadow-md'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-bg-primary)]'
                  }`}
              >
                {category.label}
              </button>
            ))}
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