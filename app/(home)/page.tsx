/* ============================================
   🏠 HOMEPAGE
   Sections: Hero, About, Skills, Projects, 
   Services, Testimonials, Blog, Contact
   ============================================ */

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Skills from "@/app/components/Skills";
import Projects from "@/app/components/Projects";

export default function HomePage() {
  return (
    <main>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500">Contact section...</p>
        </div>
      </section>
    </main>
  );
}
