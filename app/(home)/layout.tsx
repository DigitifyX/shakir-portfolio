export const metadata = {
  title: "Shakir Ahmed | Full-Stack Developer & Problem Solver",
  description:
    "Hi, I'm Shakir Ahmed - a passionate Full-Stack Developer specializing in React, Next.js & TypeScript. I craft beautiful, high-performance web experiences that make an impact.",
  metadataBase: new URL("https://shakir-portfolio-topaz.vercel.app"),
  openGraph: {
    title: "Shakir Ahmed | Full-Stack Developer & Problem Solver",
    description:
      "Hi, I'm Shakir Ahmed - a passionate Full-Stack Developer specializing in React, Next.js & TypeScript. I craft beautiful, high-performance web experiences that make an impact.",
    url: "https://shakir-portfolio-topaz.vercel.app",
    siteName: "Shakir Ahmed - Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shakir Ahmed - Full-Stack Developer & Problem Solver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakir Ahmed | Full-Stack Developer & Problem Solver",
    description:
      "Hi, I'm Shakir Ahmed - a passionate Full-Stack Developer specializing in React, Next.js & TypeScript. I craft beautiful, high-performance web experiences.",
    images: ["/og-image.png"],
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
