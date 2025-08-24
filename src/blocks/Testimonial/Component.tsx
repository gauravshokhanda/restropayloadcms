import React from 'react'
import type { TestimonialBlock } from '@/payload-types'
import type { Media } from '@/payload-types'

type Props = {
  className?: string
} & TestimonialBlock

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= rating} />
      ))}
    </div>
  )
}

export const TestimonialBlockComponent: React.FC<Props> = ({ className, testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <div className={['py-24 sm:py-32 bg-gray-50', className].filter(Boolean).join(' ')}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What our customers say
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => {
              const avatar = testimonial.avatar as Media | null

              return (
                <div key={index} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                  <figure className="rounded-2xl bg-white p-8 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <blockquote className="text-gray-900">
                      <p>&quot;{testimonial.testimonialText}&quot;</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      {avatar &&
                        (typeof avatar === 'string' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="h-10 w-10 rounded-full bg-gray-50"
                            src={avatar}
                            alt={testimonial.customerName}
                          />
                        ) : avatar.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="h-10 w-10 rounded-full bg-gray-50"
                            src={avatar.url}
                            alt={testimonial.customerName}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {testimonial.customerName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        ))}
                      {!avatar && (
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {testimonial.customerName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {testimonial.customerName}
                        </div>
                        <div className="text-gray-600">
                          {testimonial.role} at {testimonial.company}
                        </div>
                        {testimonial.rating && (
                          <div className="mt-1">
                            <Rating rating={testimonial.rating} />
                          </div>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
