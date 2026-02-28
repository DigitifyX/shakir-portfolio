import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

// ── Portfolio queries ───────────────────────────────────

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description,
    category,
    link,
    githubUrl,
    technologies,
    callToAction,
    challenge,
    solution,
    features,
    gallery,
    gradient,
    coverImage,
    landscapeImage,
  }
`);

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    company,
    text,
    rating,
    accentColor,
  }
`);

export const profileQuery = defineQuery(`
  *[_type == "profile"][0] {
    name,
    title,
    email,
    phone,
    location,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    resumeUrl,
    availableForWork,
    profileImage,
  }
`);

export const pageContentQuery = defineQuery(`
  *[_type == "pageContent"][0] {
    heroBadge,
    heroHeading,
    heroSubheading,
    aboutHeading,
    aboutText,
    skillsHeading,
    skillsSubheading,
    projectsHeading,
    projectsSubheading,
    testimonialsHeading,
    testimonialsSubheading,
    contactHeading,
    contactSubheading
  }
`);
