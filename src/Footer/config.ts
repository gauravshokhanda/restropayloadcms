import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a custom logo for the footer. If not provided, the default logo will be used.',
      },
    },
    {
      name: 'siteName',
      type: 'text',
      admin: {
        description: 'Site name to display alongside or instead of the logo.',
      },
    },
    {
      name: 'showSiteName',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show site name in the footer',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description or tagline for your site',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
          overrides: {
            localized: true,
          },
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'GitHub', value: 'github' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 6,
      admin: {
        description: 'Social media links',
      },
    },
    {
      name: 'showThemeSelector',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show theme selector (light/dark mode toggle)',
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      admin: {
        description: 'Custom copyright text. If not provided, will use default format.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
