import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    icon: () => '💬',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role / Job Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'text',
            title: 'Testimonial Text',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Rating (1-5)',
            type: 'number',
            initialValue: 5,
            options: { list: [1, 2, 3, 4, 5] },
            validation: (rule) => rule.required().min(1).max(5),
        }),
        defineField({
            name: 'accentColor',
            title: 'Accent Color Gradient',
            type: 'string',
            description: 'Tailwind gradient classes for the card accent',
            initialValue: 'from-blue-500 to-cyan-400',
            options: {
                list: [
                    { title: 'Blue → Cyan', value: 'from-blue-500 to-cyan-400' },
                    { title: 'Purple → Pink', value: 'from-purple-500 to-pink-400' },
                    { title: 'Cyan → Blue', value: 'from-cyan-500 to-blue-400' },
                    { title: 'Pink → Orange', value: 'from-pink-500 to-orange-400' },
                    { title: 'Green → Emerald', value: 'from-green-500 to-emerald-400' },
                    { title: 'Orange → Yellow', value: 'from-orange-500 to-yellow-400' },
                    { title: 'Violet → Purple', value: 'from-violet-500 to-purple-400' },
                    { title: 'Rose → Pink', value: 'from-rose-500 to-pink-400' },
                ],
            },
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'company',
        },
    },
})
