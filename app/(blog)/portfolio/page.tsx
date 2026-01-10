import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

// 1. This query asks Sanity for all your projects
const PROJECTS_QUERY = `*[_type == "project"]{
  _id,
  title,
  slug,
  "imageUrl": coverImage.asset->url,
  link,
  description
}`;

export default async function PortfolioPage() {
  // 2. Fetch the data
  const projects = await client.fetch(PROJECTS_QUERY);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project: any) => (
          <div key={project._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            {/* Image */}
            {project.imageUrl && (
              <div className="relative w-full h-48 mb-4">
                 <Image 
                   src={project.imageUrl} 
                   alt={project.title} 
                   fill 
                   className="object-cover rounded-md"
                 />
              </div>
            )}

            {/* Title */}
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            
            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">
              {project.description}
            </p>

            {/* Link Button */}
            {project.link && (
               <a 
                 href={project.link} 
                 target="_blank" 
                 className="text-blue-500 hover:underline text-sm font-medium"
               >
                 View Project →
               </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}