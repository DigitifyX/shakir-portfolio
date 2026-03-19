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

const About = dynamic(() => import("@/app/components/About"));
const Skills = dynamic(() => import("@/app/components/Skills"));
const Projects = dynamic(() => import("@/app/components/Projects"));
const Testimonials = dynamic(() => import("@/app/components/Testimonials"));
const Contact = dynamic(() => import("@/app/components/Contact"));
const Footer = dynamic(() => import("@/app/components/Footer"));

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

      {/* Skills Section */}
      <Skills
        heading={pageContent?.skillsHeading ?? undefined}
        subheading={pageContent?.skillsSubheading ?? undefined}
      />

      {/* Projects Section */}
      <Projects
        projects={projects}
        heading={pageContent?.projectsHeading ?? undefined}
        subheading={pageContent?.projectsSubheading ?? undefined}
      />

      {/* Testimonials Section */}
      <Testimonials
        testimonials={testimonials}
        heading={pageContent?.testimonialsHeading ?? undefined}
        subheading={pageContent?.testimonialsSubheading ?? undefined}
      />

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
