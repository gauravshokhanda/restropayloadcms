import type { CollectionConfig } from 'payload/types'
import { revalidateOrder } from './hooks/revalidateOrder'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerEmail', 'status', 'total', 'createdAt'],
    group: 'E-commerce',
  },
  access: {
    read: ({ req: { user } }) => {
      // Admins can read all orders
      if (user?.collection === 'users') {
        return true
      }
      // Public users can only read their own orders (if we implement customer auth later)
      return false
    },
    create: () => true, // Allow order creation from checkout
    update: ({ req: { user } }) => {
      // Only admins can update orders
      return user?.collection === 'users'
    },
    delete: ({ req: { user } }) => {
      // Only admins can delete orders
      return user?.collection === 'users'
    },
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Processing',
          value: 'processing',
        },
        {
          label: 'Shipped',
          value: 'shipped',
        },
        {
          label: 'Delivered',
          value: 'delivered',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
        {
          label: 'Refunded',
          value: 'refunded',
        },
      ],
    },
    {
      name: 'customerInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'billingAddress',
      type: 'group',
      fields: [
        {
          name: 'sameAsShipping',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'street',
          type: 'text',
          admin: {
            condition: (data) => !data.billingAddress?.sameAsShipping,
          },
        },
        {
          name: 'city',
          type: 'text',
          admin: {
            condition: (data) => !data.billingAddress?.sameAsShipping,
          },
        },
        {
          name: 'state',
          type: 'text',
          admin: {
            condition: (data) => !data.billingAddress?.sameAsShipping,
          },
        },
        {
          name: 'postalCode',
          type: 'text',
          admin: {
            condition: (data) => !data.billingAddress?.sameAsShipping,
          },
        },
        {
          name: 'country',
          type: 'text',
          admin: {
            condition: (data) => !data.billingAddress?.sameAsShipping,
          },
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: {
            description: 'Price at time of purchase',
          },
        },
        {
          name: 'total',
          type: 'number',
          required: true,
          admin: {
            description: 'quantity * price',
          },
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
      admin: {
        description: 'Sum of all item totals',
      },
    },
    {
      name: 'tax',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Tax amount',
      },
    },
    {
      name: 'shipping',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Shipping cost',
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      admin: {
        description: 'subtotal + tax + shipping',
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        {
          label: 'Credit Card',
          value: 'credit_card',
        },
        {
          label: 'PayPal',
          value: 'paypal',
        },
        {
          label: 'Bank Transfer',
          value: 'bank_transfer',
        },
        {
          label: 'Cash on Delivery',
          value: 'cod',
        },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Paid',
          value: 'paid',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
        {
          label: 'Refunded',
          value: 'refunded',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about the order',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          // Generate order number
          const timestamp = Date.now()
          const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
          data.orderNumber = `ORD-${timestamp}-${random}`
        }
        return data
      },
    ],
    afterChange: [revalidateOrder],
  },
}