import type { Block } from 'payload'

export const ProductCategories: Block = {
  slug: 'productCategories',
  interfaceName: 'ProductCategoriesBlock',
  labels: {
    singular: 'Product Categories',
    plural: 'Product Categories',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Shop by Category',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      required: false,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      maxRows: 6,
      label: 'Featured Categories',
      admin: {
        description: 'Select categories to feature on the homepage',
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid Layout',
          value: 'grid',
        },
        {
          label: 'Card Layout',
          value: 'cards',
        },
      ],
    },
  ],
}