import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contactSubmission',
    title: 'Contact Submission',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subject',
            title: 'Subject',
            type: 'string',
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            readOnly: true,
        }),
        defineField({
            name: 'read',
            title: 'Read',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    orderings: [
        {
            title: 'Newest First',
            name: 'submittedAtDesc',
            by: [{ field: 'submittedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'subject',
            date: 'submittedAt',
        },
        prepare({ title, subtitle, date }) {
            return {
                title: title || 'Unknown',
                subtitle: `${subtitle || 'No subject'} — ${date ? new Date(date).toLocaleDateString() : ''}`,
            }
        },
    },
})
