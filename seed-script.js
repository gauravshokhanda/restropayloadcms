const { getPayload } = require('payload')
const config = require('./dist/payload.config.js').default
const { seedProducts } = require('./dist/seed/seedProducts.js')

async function runSeed() {
  try {
    console.log('🌱 Starting database seeding...')
    const payload = await getPayload({ config })
    
    // Run the product seeding
    await seedProducts(payload)
    
    console.log('✅ Seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

runSeed()