import type { Block } from 'payload'

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  fields: [
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'testimonialText',
          type: 'textarea',
          label: 'Testimonial Text',
          required: true,
          localized: true,
        },
        {
          name: 'customerName',
          type: 'text',
          label: 'Customer Name',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role/Position',
          required: true,
          localized: true,
        },
        {
          name: 'company',
          type: 'text',
          label: 'Company',
          required: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          label: 'Avatar Image',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Rating (1-5)',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
  labels: {
    plural: 'Testimonial Sections',
    singular: 'Testimonial Section',
  },
}