import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
    name: 'pageContent',
    title: 'Landing Page Content',
    type: 'document',
    icon: DocumentIcon,
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'about', title: 'About Section' },
        { name: 'skills', title: 'Skills Section' },
        { name: 'projects', title: 'Projects Section' },
        { name: 'testimonials', title: 'Testimonials Section' },
        { name: 'contact', title: 'Contact Section' },
    ],
    fields: [
        // --- HERO SECTION ---
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'string',
            group: 'hero',
            initialValue: 'Welcome to my universe',
        }),
        defineField({
            name: 'heroHeading',
            title: 'Hero Heading',
            type: 'string',
            group: 'hero',
            description: 'Main greeting (e.g., "Hello I\'m Shakir Ahmed")',
            initialValue: 'Hello I\'m Shakir Ahmed',
        }),
        defineField({
            name: 'heroSubheading',
            title: 'Hero Subheading',
            type: 'text',
            group: 'hero',
            description: 'Short intro text below the main heading',
            initialValue: 'JavaScript lover 🚀 | React & Next.js enthusiast 🔧 | Crafting beautiful web experiences and coding the future 💻 ✨',
        }),

        // --- ABOUT SECTION ---
        defineField({
            name: 'aboutHeading',
            title: 'About Section Heading',
            type: 'string',
            group: 'about',
            initialValue: 'Developer, Designer, Creator, Innovator',
        }),
        defineField({
            name: 'aboutText',
            title: 'About Content',
            type: 'array',
            of: [{ type: 'block' }],
            group: 'about',
            description: 'The main paragraphs in the about section',
        }),

        // --- SKILLS SECTION ---
        defineField({
            name: 'skillsHeading',
            title: 'Skills Section Heading',
            type: 'string',
            group: 'skills',
            initialValue: 'Technical Arsenal',
        }),
        defineField({
            name: 'skillsSubheading',
            title: 'Skills Section Subheading',
            type: 'text',
            group: 'skills',
            initialValue: 'Technologies and tools I use to bring ideas to life.',
        }),

        // --- PROJECTS SECTION ---
        defineField({
            name: 'projectsHeading',
            title: 'Projects Section Heading',
            type: 'string',
            group: 'projects',
            initialValue: 'Featured Work',
        }),
        defineField({
            name: 'projectsSubheading',
            title: 'Projects Section Subheading',
            type: 'text',
            group: 'projects',
            initialValue: 'A selection of my recent projects and experiments.',
        }),

        // --- TESTIMONIALS SECTION ---
        defineField({
            name: 'testimonialsHeading',
            title: 'Testimonials Section Heading',
            type: 'string',
            group: 'testimonials',
            initialValue: 'What People Say',
        }),
        defineField({
            name: 'testimonialsSubheading',
            title: 'Testimonials Section Subheading',
            type: 'text',
            group: 'testimonials',
            initialValue: 'Hear from clients and colleagues I\'ve had the pleasure to work with.',
        }),

        // --- CONTACT SECTION ---
        defineField({
            name: 'contactHeading',
            title: 'Contact Section Heading',
            type: 'string',
            group: 'contact',
            initialValue: 'Let\'s Connect',
        }),
        defineField({
            name: 'contactSubheading',
            title: 'Contact Section Subheading',
            type: 'text',
            group: 'contact',
            initialValue: 'Have a project in mind or just want to chat? I\'d love to hear from you.',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Landing Page Content',
                subtitle: 'Manage all headings and text on the home page',
            }
        },
    },
})
