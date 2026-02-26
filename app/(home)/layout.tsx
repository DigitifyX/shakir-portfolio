import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Fira_Code, Great_Vibes } from "next/font/google";
import ThemeProvider from "@/app/components/ThemeProvider";
import SmoothScroll from "@/app/components/SmoothScroll";

/* ============================================
   🔤 FONT CONFIGURATION
   - Inter: Clean modern sans-serif
   - Fira Code: For code snippets
   - Great Vibes: Signature style font
   ============================================ */

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Shakir - Creative Developer",
  description: "Full-stack developer crafting beautiful web experiences",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${firaCode.variable} ${greatVibes.variable}`}>
      <head>
        {/* Set theme before React hydrates to prevent flash + hydration mismatch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
