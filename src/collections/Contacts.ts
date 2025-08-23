import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      admin: {
        placeholder: 'Enter full name',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      admin: {
        placeholder: 'Enter email address',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
      required: false,
      admin: {
        placeholder: 'Company name (optional)',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      required: false,
      admin: {
        placeholder: 'Phone number (optional)',
      },
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Subject',
      required: true,
      admin: {
        placeholder: 'What is this about?',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
      admin: {
        placeholder: 'Enter your message here...',
        rows: 5,
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Resolved',
          value: 'resolved',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'select',
      label: 'Priority',
      defaultValue: 'medium',
      options: [
        {
          label: 'Low',
          value: 'low',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Urgent',
          value: 'urgent',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        description: 'Internal notes for team members (not visible to contact)',
        position: 'sidebar',
        rows: 3,
      },
    },
  ],
  timestamps: true,
}

export default Contacts