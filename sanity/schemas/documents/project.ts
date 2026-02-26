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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
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
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'UI/UX', value: 'uiux' },
          { title: 'Multimedia', value: 'multimedia' },
        ],
      },
    }),
  ],
})