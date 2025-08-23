import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a custom logo for the header. If not provided, the default logo will be used.',
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
        description: 'Show site name in the header',
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'enableCart',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show shopping cart icon in the header',
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          defaultValue: false,
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.show,
            },
          },
        }),
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
      ],
      admin: {
        description: 'Optional call-to-action button in the header',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
