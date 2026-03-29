import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Fira_Code, Great_Vibes } from "next/font/google";
import ThemeProvider from "@/app/components/ThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Shakir Ahmed",
    default: "Shakir Ahmed | Web Developer & Automation Specialist",
  },
  description:
    "Shakir Ahmed is a freelance web developer and automation specialist from Dhaka, Bangladesh. Specializing in WordPress, GoHighLevel, React, and Next.js - I build websites and systems that help service businesses grow.",
  metadataBase: new URL("https://shakirjoy.xyz"),
  openGraph: {
    title: "Shakir Ahmed | Web Developer & Automation Specialist",
    description:
      "Shakir Ahmed is a freelance web developer and automation specialist from Dhaka, Bangladesh. Specializing in WordPress, GoHighLevel, React, and Next.js - I build websites and systems that help service businesses grow.",
    url: "https://shakirjoy.xyz",
    siteName: "Shakir Ahmed - Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shakir Ahmed - Web Developer & Automation Specialist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakir Ahmed | Web Developer & Automation Specialist",
    description:
      "Shakir Ahmed is a freelance web developer and automation specialist from Dhaka, Bangladesh. Specializing in WordPress, GoHighLevel, React, and Next.js.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Shakir Ahmed", url: "https://shakirjoy.xyz" }],
  keywords: [
    "web developer",
    "freelance developer",
    "GoHighLevel specialist",
    "WordPress developer",
    "React developer",
    "Next.js",
    "automation specialist",
    "Dhaka",
    "Bangladesh",
  ],
};

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
  display: "optional",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${firaCode.variable} ${greatVibes.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
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
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
