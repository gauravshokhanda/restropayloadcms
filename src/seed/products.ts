import type { Payload as _Payload } from 'payload'
import type { Product as _Product, ProductCategory as _ProductCategory } from '../payload-types'

// Sample product categories
const productCategories = [
  {
    name: 'Electronics',
    description: 'Latest electronic devices and gadgets',
    featured: true,
  },
  {
    name: 'Smartphones',
    description: 'Mobile phones and accessories',
    parent: 'electronics', // Will be resolved to ID after creation
  },
  {
    name: 'Laptops',
    description: 'Portable computers and accessories',
    parent: 'electronics',
  },
  {
    name: 'Clothing',
    description: 'Fashion and apparel for all occasions',
    featured: true,
  },
  {
    name: 'Men\'s Clothing',
    description: 'Clothing for men',
    parent: 'clothing',
  },
  {
    name: 'Women\'s Clothing',
    description: 'Clothing for women',
    parent: 'clothing',
  },
  {
    name: 'Home & Garden',
    description: 'Home improvement and garden supplies',
    featured: false,
  },
  {
    name: 'Books',
    description: 'Books and educational materials',
    featured: false,
  },
]

// Sample products
const products = [
  {
    title: 'iPhone 15 Pro',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The iPhone 15 Pro features a titanium design, A17 Pro chip, and advanced camera system with 5x telephoto zoom.',
              },
            ],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    shortDescription: 'Latest iPhone with titanium design and A17 Pro chip',
    price: 999.99,
    compareAtPrice: 1099.99,
    sku: 'IPHONE15PRO-128GB',
    inventory: {
      trackQuantity: true,
      quantity: 50,
      allowBackorder: false,
    },
    categories: ['smartphones'],
    tags: [{ tag: 'Apple' }, { tag: 'Premium' }, { tag: 'New Release' }],
    featured: true,
    specifications: [
      { name: 'Display', value: '6.1-inch Super Retina XDR' },
      { name: 'Chip', value: 'A17 Pro' },
      { name: 'Storage', value: '128GB' },
      { name: 'Camera', value: '48MP Main + 12MP Ultra Wide + 12MP Telephoto' },
      { name: 'Battery Life', value: 'Up to 23 hours video playback' },
    ],
    _status: 'published',
  },
  {
    title: 'MacBook Pro 14-inch',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Supercharged by M3 Pro chip, the MacBook Pro delivers exceptional performance for professionals.',
              },
            ],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    shortDescription: 'Professional laptop with M3 Pro chip and Liquid Retina XDR display',
    price: 1999.99,
    sku: 'MBP14-M3PRO-512GB',
    inventory: {
      trackQuantity: true,
      quantity: 25,
      allowBackorder: true,
    },
    categories: ['laptops'],
    tags: [{ tag: 'Apple' }, { tag: 'Professional' }, { tag: 'M3 Pro' }],
    featured: true,
    specifications: [
      { name: 'Display', value: '14.2-inch Liquid Retina XDR' },
      { name: 'Chip', value: 'Apple M3 Pro' },
      { name: 'Memory', value: '18GB Unified Memory' },
      { name: 'Storage', value: '512GB SSD' },
      { name: 'Battery Life', value: 'Up to 18 hours' },
    ],
    _status: 'published',
  },
  {
    title: 'Samsung Galaxy S24 Ultra',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The Galaxy S24 Ultra features AI-powered photography, S Pen functionality, and a stunning 6.8-inch display.',
              },
            ],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    shortDescription: 'Premium Android smartphone with S Pen and AI features',
    price: 1199.99,
    sku: 'GALAXY-S24-ULTRA-256GB',
    inventory: {
      trackQuantity: true,
      quantity: 30,
      allowBackorder: false,
    },
    categories: ['smartphones'],
    tags: [{ tag: 'Samsung' }, { tag: 'Android' }, { tag: 'S Pen' }],
    featured: true,
    specifications: [
      { name: 'Display', value: '6.8-inch Dynamic AMOLED 2X' },
      { name: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { name: 'Storage', value: '256GB' },
      { name: 'Camera', value: '200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto' },
      { name: 'S Pen', value: 'Built-in S Pen support' },
    ],
    _status: 'published',
  },
  {
    title: 'Classic Cotton T-Shirt',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Comfortable 100% cotton t-shirt perfect for everyday wear. Available in multiple colors and sizes.',
              },
            ],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    shortDescription: 'Comfortable 100% cotton t-shirt for everyday wear',
    price: 24.99,
    sku: 'COTTON-TSHIRT-CLASSIC',
    inventory: {
      trackQuantity: true,
      quantity: 100,
      allowBackorder: true,
    },
    categories: ['mens-clothing'],
    tags: [{ tag: 'Cotton' }, { tag: 'Casual' }, { tag: 'Comfortable' }],
    featured: false,
    specifications: [
      { name: 'Material', value: '100% Cotton' },
      { name: 'Fit', value: 'Regular Fit' },
      { name: 'Care', value: 'Machine Washable' },
      { name: 'Sizes', value: 'S, M, L, XL, XXL' },
    ],
    _status: 'published',
  },
  {
    title: 'Wireless Bluetooth Headphones',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
              },
            ],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    shortDescription: 'Premium wireless headphones with noise cancellation',
    price: 299.99,
    compareAtPrice: 349.99,
    sku: 'BT-HEADPHONES-PRO',
    inventory: {
      trackQuantity: true,
      quantity: 75,
      allowBackorder: false,
    },
    categories: ['electronics'],
    tags: [{ tag: 'Wireless' }, { tag: 'Bluetooth' }, { tag: 'Noise Cancelling' }],
    featured: true,
    specifications: [
      { name: 'Battery Life', value: '30 hours with ANC off' },
      { name: 'Connectivity', value: 'Bluetooth 5.3' },
      { name: 'Noise Cancellation', value: 'Active Noise Cancellation' },
      { name: 'Weight', value: '250g' },
    ],
    _status: 'published',
  },
  {
    title: 'Smart Home Security Camera',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: '4K wireless security camera with night vision, motion detection, and cloud storage.',
              },
            ],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    shortDescription: '4K wireless security camera with smart features',
    price: 199.99,
    sku: 'SECURITY-CAM-4K',
    inventory: {
      trackQuantity: true,
      quantity: 40,
      allowBackorder: true,
    },
    categories: ['home-garden'],
    tags: [{ tag: 'Security' }, { tag: '4K' }, { tag: 'Smart Home' }],
    featured: false,
    specifications: [
      { name: 'Resolution', value: '4K Ultra HD' },
      { name: 'Night Vision', value: 'Up to 30 feet' },
      { name: 'Storage', value: 'Cloud & Local SD Card' },
      { name: 'Connectivity', value: 'Wi-Fi 6' },
    ],
    _status: 'published',
  },
  {
    title: 'Programming Fundamentals Book',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Comprehensive guide to programming fundamentals covering algorithms, data structures, and best practices.',
              },
            ],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    shortDescription: 'Complete guide to programming fundamentals and best practices',
    price: 49.99,
    sku: 'BOOK-PROG-FUND',
    inventory: {
      trackQuantity: true,
      quantity: 200,
      allowBackorder: true,
    },
    categories: ['books'],
    tags: [{ tag: 'Programming' }, { tag: 'Education' }, { tag: 'Computer Science' }],
    featured: false,
    specifications: [
      { name: 'Pages', value: '450 pages' },
      { name: 'Format', value: 'Paperback & Digital' },
      { name: 'Language', value: 'English' },
      { name: 'Level', value: 'Beginner to Intermediate' },
    ],
    _status: 'published',
  },
  {
    title: 'Women\'s Yoga Leggings',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'High-waisted yoga leggings made from moisture-wicking fabric with four-way stretch.',
              },
            ],
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        version: 1,
      },
    },
    shortDescription: 'High-waisted yoga leggings with moisture-wicking fabric',
    price: 59.99,
    sku: 'YOGA-LEGGINGS-HW',
    inventory: {
      trackQuantity: true,
      quantity: 80,
      allowBackorder: true,
    },
    categories: ['womens-clothing'],
    tags: [{ tag: 'Yoga' }, { tag: 'Activewear' }, { tag: 'Moisture-Wicking' }],
    featured: false,
    specifications: [
      { name: 'Material', value: '78% Polyester, 22% Elastane' },
      { name: 'Fit', value: 'High-Waisted' },
      { name: 'Features', value: 'Four-way stretch, Moisture-wicking' },
      { name: 'Sizes', value: 'XS, S, M, L, XL' },
    ],
    _status: 'published',
  },
]

export { productCategories, products }