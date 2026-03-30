/* ============================================
   🏠 HOMEPAGE
   Sections: Hero, About, Skills, Projects,
   Testimonials, Contact, Footer
   ============================================ */

import dynamic from "next/dynamic";

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";

// Statically generate homepage, revalidate every hour
// Portfolio content changes rarely - no need for dynamic rendering
export const revalidate = 3600;

const About = dynamic(() => import("@/app/components/About"));
const Projects = dynamic(() => import("@/app/components/Projects"));
const Contact = dynamic(() => import("@/app/components/Contact"));
const Footer = dynamic(() => import("@/app/components/Footer"));

// Skills and Testimonials use ssr:false (client-only rendering)
// which requires a "use client" wrapper in Next.js 15
import SkillsClient from "@/app/components/SkillsClient";
import TestimonialsClient from "@/app/components/TestimonialsClient";

export default async function HomePage() {
  const homepage = await sanityFetch({ query: homepageQuery });
  const { projects, testimonials, profile, pageContent } = homepage;

  return (
    <main className="w-full overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        badge={pageContent?.heroBadge ?? undefined}
        heading={pageContent?.heroHeading ?? undefined}
        subheading={pageContent?.heroSubheading ?? undefined}
      />

      {/* About Section */}
      <About
        heading={pageContent?.aboutHeading ?? undefined}
        content={pageContent?.aboutText ?? undefined}
      />

      <div className="section-divider" />

      {/* Skills Section */}
      <SkillsClient
        heading={pageContent?.skillsHeading ?? undefined}
        subheading={pageContent?.skillsSubheading ?? undefined}
      />

      <div className="section-divider" />

      {/* Projects Section */}
      <Projects
        projects={projects}
        heading={pageContent?.projectsHeading ?? undefined}
        subheading={pageContent?.projectsSubheading ?? undefined}
      />

      <div className="section-divider" />

      {/* Testimonials Section */}
      <TestimonialsClient
        testimonials={testimonials}
        heading={pageContent?.testimonialsHeading ?? undefined}
        subheading={pageContent?.testimonialsSubheading ?? undefined}
      />

      <div className="section-divider" />

      {/* Contact Section */}
      <Contact
        profile={profile}
        heading={pageContent?.contactHeading ?? undefined}
        subheading={pageContent?.contactSubheading ?? undefined}
      />

      {/* Footer */}
      <Footer profile={profile} />
    </main>
  );
}
