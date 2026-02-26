"use client";

import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);
    const rippleContainerRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);

    // Read saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved === "light" || saved === "dark") {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        }
        setMounted(true);
    }, []);

    const toggleTheme = useCallback((e?: React.MouseEvent) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const next = theme === "dark" ? "light" : "dark";

        // Get click origin for ripple effect
        const originX = e ? e.clientX : window.innerWidth / 2;
        const originY = e ? e.clientY : 80;

        // Spawn a subtle translucent ripple from the click point
        const container = rippleContainerRef.current;
        if (container) {
            const ripple = document.createElement("div");
            const maxDist = Math.hypot(
                Math.max(originX, window.innerWidth - originX),
                Math.max(originY, window.innerHeight - originY)
            );
            const size = maxDist * 2.2;

            Object.assign(ripple.style, {
                position: "fixed",
                left: `${originX - size / 2}px`,
                top: `${originY - size / 2}px`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: next === "light"
                    ? "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)"
                    : "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.10) 40%, transparent 70%)",
                transform: "scale(0)",
                opacity: "1",
                pointerEvents: "none",
                zIndex: "9999",
            });

            container.appendChild(ripple);

            // Animate the ripple expanding and fading
            requestAnimationFrame(() => {
                ripple.style.transition = "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
                ripple.style.transform = "scale(1)";
                ripple.style.opacity = "0";
            });

            // Clean up the ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 750);
        }

        // Switch the theme immediately — CSS transitions handle the smooth color change
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);

        // Allow next toggle after the CSS transitions settle
        setTimeout(() => {
            isAnimating.current = false;
        }, 500);
    }, [theme]);

    // Prevent flash of wrong theme
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
            {/* Ripple container for theme transition effect */}
            <div
                ref={rippleContainerRef}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9999,
                    pointerEvents: "none",
                    overflow: "hidden",
                }}
            />
        </ThemeContext.Provider>
    );
}
