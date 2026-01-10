import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Fira_Code } from "next/font/google";

/* ============================================
   🔤 FONT CONFIGURATION (Blog Layout)
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="bg-dark text-white antialiased">
        <main>{children}</main>
        <SpeedInsights />
      </body>
    </html>
  );
}
