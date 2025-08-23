import type { Block } from 'payload'

export const Feature: Block = {
  slug: 'feature',
  interfaceName: 'FeatureBlock',
  fields: [
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Shield', value: 'shield' },
            { label: 'Lightning', value: 'lightning' },
            { label: 'Globe', value: 'globe' },
            { label: 'Cog', value: 'cog' },
            { label: 'Chart', value: 'chart' },
            { label: 'Users', value: 'users' },
            { label: 'Lock', value: 'lock' },
            { label: 'Rocket', value: 'rocket' },
            { label: 'Heart', value: 'heart' },
            { label: 'Star', value: 'star' },
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          localized: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Feature Lists',
    singular: 'Feature List',
  },
}