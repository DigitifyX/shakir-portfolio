import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    icon: () => '👤',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            initialValue: 'Shakir Ahmed',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Professional Title',
            type: 'string',
            initialValue: 'Full-Stack Developer & Problem Solver',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            initialValue: 'hello@shakir.dev',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            initialValue: 'Dhaka, Bangladesh',
        }),
        defineField({
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
        }),
        defineField({
            name: 'linkedinUrl',
            title: 'LinkedIn URL',
            type: 'url',
        }),
        defineField({
            name: 'twitterUrl',
            title: 'Twitter / X URL',
            type: 'url',
        }),
        defineField({
            name: 'resumeUrl',
            title: 'Resume / CV URL',
            type: 'url',
            description: 'Link to your resume PDF or page',
        }),
        defineField({
            name: 'availableForWork',
            title: 'Available for Work',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: { title: 'name', subtitle: 'title' },
    },
})
