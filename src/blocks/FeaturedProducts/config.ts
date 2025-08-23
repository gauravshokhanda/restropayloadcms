import type { Block } from 'payload'

export const FeaturedProducts: Block = {
  slug: 'featuredProducts',
  interfaceName: 'FeaturedProductsBlock',
  labels: {
    singular: 'Featured Products',
    plural: 'Featured Products',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Featured Products',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      required: false,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      maxRows: 8,
      label: 'Featured Products',
      admin: {
        description: 'Select products to feature on the homepage',
      },
    },
    {
      name: 'showViewAllButton',
      type: 'checkbox',
      label: 'Show "View All Products" Button',
      defaultValue: true,
    },
  ],
}