import type { Payload } from 'payload'
// import { productCategories, products } from './products'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const seedProducts = async (payload: Payload): Promise<void> => {
  console.log('🌱 Starting product seeding...')
  console.log('⚠️ Product seeding is currently disabled')
  return

  // try {
  //   // First, create product categories
  //   console.log('📁 Creating product categories...')
  //   const createdCategories: { [key: string]: string } = {}
    
//     // Create parent categories first
//     const parentCategories = productCategories.filter(cat => !cat.parent)
//     for (const categoryData of parentCategories) {
//       try {
//         const category = await payload.create({
//           collection: 'product-categories',
//           data: {
//             name: categoryData.name,
//             description: categoryData.description,
//             featured: categoryData.featured,
//             _status: 'published',
//           },
//         })
//         createdCategories[categoryData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')] = category.id
//         console.log(`✅ Created category: ${categoryData.name}`)
//       } catch (error) {
//         console.error(`❌ Error creating category ${categoryData.name}:`, error)
//       }
//     }

//     // Create child categories
//     const childCategories = productCategories.filter(cat => cat.parent)
//     for (const categoryData of childCategories) {
//       try {
//         const parentKey = categoryData.parent as string
//         const parentId = createdCategories[parentKey]
        
//         const category = await payload.create({
//           collection: 'product-categories',
//           data: {
//             name: categoryData.name,
//             description: categoryData.description,
//             parent: parentId,
//             _status: 'published',
//           },
//         })
//         createdCategories[categoryData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')] = category.id
//         console.log(`✅ Created child category: ${categoryData.name}`)
//       } catch (error) {
//         console.error(`❌ Error creating child category ${categoryData.name}:`, error)
//       }
//     }

//     // Create some sample media for products (placeholder images)
//     console.log('🖼️ Creating sample media...')
//     const sampleImages: { [key: string]: string } = {}
    
//     const imageData = [
//       { alt: 'iPhone 15 Pro', filename: 'iphone-15-pro.jpg' },
//       { alt: 'MacBook Pro', filename: 'macbook-pro.jpg' },
//       { alt: 'Samsung Galaxy S24', filename: 'galaxy-s24.jpg' },
//       { alt: 'Cotton T-Shirt', filename: 'cotton-tshirt.jpg' },
//       { alt: 'Bluetooth Headphones', filename: 'headphones.jpg' },
//       { alt: 'Security Camera', filename: 'security-camera.jpg' },
//       { alt: 'Programming Book', filename: 'programming-book.jpg' },
//       { alt: 'Yoga Leggings', filename: 'yoga-leggings.jpg' },
//     ]

//     // Create placeholder images (1x1 pixel transparent PNG)
//     const placeholderBuffer = Buffer.from(
//       'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
//       'base64'
//     )

//     for (const imageInfo of imageData) {
//       try {
//         const media = await payload.create({
//           collection: 'media',
//           data: {
//             alt: imageInfo.alt,
//           },
//           file: {
//             data: placeholderBuffer,
//             mimetype: 'image/png',
//             name: imageInfo.filename,
//             size: placeholderBuffer.length,
//           },
//         })
//         sampleImages[imageInfo.alt] = media.id
//         console.log(`✅ Created media: ${imageInfo.alt}`)
//       } catch (error) {
//         console.error(`❌ Error creating media ${imageInfo.alt}:`, error)
//       }
//     }

//     // Create products
//     console.log('📦 Creating products...')
//     for (const productData of products) {
//       try {
//         // Map category names to IDs
//         const categoryIds = productData.categories?.map(catName => {
//           const categoryKey = catName.toLowerCase().replace(/[^a-z0-9]/g, '-')
//           return createdCategories[categoryKey]
//         }).filter(Boolean) || []

//         // Get appropriate image
//         let imageId = ''
//         if (productData.title.includes('iPhone')) {
//           imageId = sampleImages['iPhone 15 Pro']
//         } else if (productData.title.includes('MacBook')) {
//           imageId = sampleImages['MacBook Pro']
//         } else if (productData.title.includes('Galaxy')) {
//           imageId = sampleImages['Samsung Galaxy S24']
//         } else if (productData.title.includes('T-Shirt')) {
//           imageId = sampleImages['Cotton T-Shirt']
//         } else if (productData.title.includes('Headphones')) {
//           imageId = sampleImages['Bluetooth Headphones']
//         } else if (productData.title.includes('Camera')) {
//           imageId = sampleImages['Security Camera']
//         } else if (productData.title.includes('Book')) {
//           imageId = sampleImages['Programming Book']
//         } else if (productData.title.includes('Leggings')) {
//           imageId = sampleImages['Yoga Leggings']
//         }

//         const _product = await payload.create({
//           collection: 'products',
//           data: {
//             ...productData,
//             categories: categoryIds,
//             images: imageId ? [{
//               image: imageId,
//               alt: productData.title,
//             }] : [],
//             publishedAt: new Date().toISOString(),
//           },
//         })
//         console.log(`✅ Created product: ${productData.title}`)
//       } catch (error) {
//         console.error(`❌ Error creating product ${productData.title}:`, error)
//       }
//     }

//     console.log('🎉 Product seeding completed successfully!')
//     console.log(`📊 Summary:`)
//     console.log(`   - Categories created: ${Object.keys(createdCategories).length}`)
//     console.log(`   - Images created: ${Object.keys(sampleImages).length}`)
//     console.log(`   - Products created: ${products.length}`)

//   } catch (error) {
//     console.error('❌ Error during product seeding:', error)
//     throw error
//   }
}

export default seedProducts