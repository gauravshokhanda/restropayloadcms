import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { slugField } from '../../fields/slug'
import { revalidateProduct } from './hooks/revalidateProduct'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'price', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'products',
      })
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Brief product description for listings',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        step: 0.01,
        description: 'Price in USD',
      },
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      min: 0,
      admin: {
        step: 0.01,
        description: 'Original price for showing discounts',
      },
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
      admin: {
        description: 'Stock Keeping Unit - unique product identifier',
      },
    },
    {
      name: 'inventory',
      type: 'group',
      fields: [
        {
          name: 'trackQuantity',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
          admin: {
            condition: (data, siblingData) => siblingData?.trackQuantity,
          },
        },
        {
          name: 'allowBackorder',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          localized: true,
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this product in featured sections',
      },
    },
    {
      name: 'specifications',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      maxDepth: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateProduct],
    beforeChange: [populatePublishedAt],
  },
  timestamps: true,
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}