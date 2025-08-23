import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import type { Dictionary } from '@/dictionaries'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FeatureBlockComponent } from '@/blocks/Feature/Component'
import { TestimonialBlockComponent } from '@/blocks/Testimonial/Component'
import { FeaturedProductsBlockComponent } from '@/blocks/FeaturedProducts/Component'
import { ProductCategoriesBlockComponent } from '@/blocks/ProductCategories/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  feature: FeatureBlockComponent,
  testimonial: TestimonialBlockComponent,
  featuredProducts: FeaturedProductsBlockComponent,
  productCategories: ProductCategoriesBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale?: string
  dictionary?: Dictionary
}> = (props) => {
  const { blocks, locale, dictionary } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer dictionary={dictionary} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
