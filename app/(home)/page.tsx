/* ============================================
   🏠 HOMEPAGE
   Sections: Hero, About, Skills, Projects,
   Testimonials, Contact, Footer
   ============================================ */

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Skills from "@/app/components/Skills";
import Projects from "@/app/components/Projects";
import Testimonials from "@/app/components/Testimonials";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  projectsQuery,
  testimonialsQuery,
  profileQuery,
  pageContentQuery,
} from "@/sanity/lib/queries";

export default async function HomePage() {
  const [projects, testimonials, profile, pageContent] = await Promise.all([
    sanityFetch({ query: projectsQuery }),
    sanityFetch({ query: testimonialsQuery }),
    sanityFetch({ query: profileQuery }),
    sanityFetch({ query: pageContentQuery }),
  ]);

  return (
    <main>
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
        heading={pageContent?.aboutHeading}
        content={pageContent?.aboutText}
      />

      {/* Skills Section */}
      <Skills
        heading={pageContent?.skillsHeading}
        subheading={pageContent?.skillsSubheading}
      />

      {/* Projects Section */}
      <Projects
        projects={projects}
        heading={pageContent?.projectsHeading}
        subheading={pageContent?.projectsSubheading}
      />

      {/* Testimonials Section */}
      <Testimonials
        testimonials={testimonials}
        heading={pageContent?.testimonialsHeading}
        subheading={pageContent?.testimonialsSubheading}
      />

      {/* Contact Section */}
      <Contact
        profile={profile}
        heading={pageContent?.contactHeading}
        subheading={pageContent?.contactSubheading}
      />

      {/* Footer */}
      <Footer profile={profile} />
    </main>
  );
}
