export const metadata = {
  title: "Shakir Ahmed | Web Developer & Automation Specialist",
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
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
