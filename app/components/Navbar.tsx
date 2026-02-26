"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Code2,
  FolderKanban,
  MessageSquareQuote,
  Mail,
  Menu,
  X,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Testimonials", href: "#testimonials", icon: MessageSquareQuote },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Scroll spy — detect which section is in view
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 120; // offset for navbar height

    for (let i = navItems.length - 1; i >= 0; i--) {
      const section = document.querySelector(navItems[i].href);
      if (section) {
        const el = section as HTMLElement;
        if (scrollY >= el.offsetTop) {
          setActiveSection(navItems[i].name);
          return;
        }
      }
    }
    setActiveSection("Home");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center"
      >
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-dark-secondary/90 backdrop-blur-md border border-transparent overflow-hidden group"
          style={{
            backgroundImage: isHovering
              ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--glow-accent-rgb), var(--glow-bg-intensity)), transparent)`
              : 'none',
          }}
        >
          {/* Animated border glow that follows mouse */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--glow-accent-rgb), var(--glow-accent-intensity)), transparent)`,
              opacity: isHovering ? 1 : 0,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />
          {/* Static border */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 pointer-events-none" />
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.name;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.name)}
                className={`
                  relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-300
                  ${isActive
                    ? "bg-dark-tertiary text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}

          {/* Theme Toggle */}
          <button
            onClick={(e) => toggleTheme(e)}
            className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-dark-tertiary transition-all duration-300 ml-1"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-50 md:hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-dark-secondary/90 backdrop-blur-md border border-cyan-500/30">
          <span className="text-[var(--color-text-primary)] font-semibold">Shakir</span>
          <div className="flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={(e) => toggleTheme(e)}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] p-1 transition-colors"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-text-primary)] p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 px-4 py-4 rounded-2xl bg-dark-secondary/95 backdrop-blur-md border border-cyan-500/30"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.name;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setActiveSection(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium
                      transition-all duration-300
                      ${isActive
                        ? "bg-dark-tertiary text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-dark-tertiary/50"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
