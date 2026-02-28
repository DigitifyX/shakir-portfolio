import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Client Name',
      type: 'string',
      description: 'E.g. AutoLux Detailing (Concept)',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'landscapeImage',
      title: 'Landscape Project Image',
      type: 'image',
      description: 'Used in the Quick View popup. Horizontal image of the project (replaces the cover image here).',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Project URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Repository URL',
      type: 'url',
      description: 'Link to the source code repository',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'callToAction',
      title: 'Call to Action Button Text',
      type: 'string',
      description: 'E.g. View Case Study',
      initialValue: 'View Details',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      description: 'Detailed explanation of the problem for the Quick View.',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      description: 'Detailed explanation of how you solved it for the Quick View.',
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional images for the Quick View modal.',
    }),
    defineField({
      name: 'gradient',
      title: 'Card Gradient',
      type: 'string',
      description: 'Tailwind gradient for the card background',
      initialValue: 'from-purple-600 to-blue-900',
      options: {
        list: [
          { title: 'Purple → Blue', value: 'from-purple-600 to-blue-900' },
          { title: 'Pink → Orange', value: 'from-pink-500 to-orange-500' },
          { title: 'Blue → Cyan', value: 'from-blue-400 to-cyan-500' },
          { title: 'Green → Emerald', value: 'from-green-500 to-emerald-400' },
          { title: 'Orange → Pink', value: 'from-orange-500 to-pink-500' },
          { title: 'Blue → Pink', value: 'from-blue-300 to-pink-300' },
        ],
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'E.g. Web, Mobile, UI/UX (Used to auto-generate filter tabs)',
    }),
  ],
})