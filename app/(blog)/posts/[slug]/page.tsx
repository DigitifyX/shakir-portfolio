import Hero from "@/app/components/Hero";
import { client } from "@/sanity/lib/client";

// This is the homepage
export default async function Page() {
  return (
    <>
      <Hero />
      
      {/* We will add the "Recent Projects" section here next */}
      <section className="container mx-auto px-5 py-20">
        <h2 className="text-3xl font-bold mb-10">Latest from the Blog</h2>
        <p className="text-muted">Loading posts...</p>
      </section>
    </>
  );
}
