"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  FolderKanban, 
  Mail,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
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
              ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent)`
              : 'none',
          }}
        >
          {/* Animated border glow that follows mouse */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.8), transparent)`,
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
                    ? "bg-dark-tertiary text-white" 
                    : "text-gray-400 hover:text-white"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}
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
          <span className="text-white font-semibold">Shakir</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
                        ? "bg-dark-tertiary text-white" 
                        : "text-gray-400 hover:text-white hover:bg-dark-tertiary/50"
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
