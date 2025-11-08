"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

interface Ad {
  title: string
  description: string
  cta?: string
  ctaLink?: string
}

interface OurStoryCarouselProps {
  ads?: Ad[]
}

const defaultAds: Ad[] = [
  {
    title: "Premium Job Listings",
    description: "Get your job in front of 2K+ qualified professionals. Boost your hiring success.",
    cta: "Post a Job",
    ctaLink: "/admin/jobs"
  },
  {
    title: "Career Development Services",
    description: "Enhance your skills and advance your career with our professional development programs.",
    cta: "Learn More",
    ctaLink: "/contact"
  },
  {
    title: "Advertise With Us",
    description: "Reach thousands of professionals. We welcome relevant advertisements from all categories.",
    cta: "Contact Us",
    ctaLink: "/contact"
  }
]

export function OurStoryCarousel({ ads = defaultAds }: OurStoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect() // Set initial index

    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 8000) // Switch every 8 seconds

    return () => {
      clearInterval(autoplay)
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const carouselItems = [
    {
      type: "story" as const,
      content: {
        title: "Our Story",
        subtitle: "Built by professionals, for professionals"
      }
    },
    ...ads.map(ad => ({
      type: "ad" as const,
      content: ad
    }))
  ]

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-md h-80 overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {carouselItems.map((item, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 h-full flex items-center justify-center">
              {item.type === "story" ? (
                <div className="text-center px-6">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{item.content.title}</div>
                  <p className="text-slate-600 text-lg">{item.content.subtitle}</p>
                </div>
              ) : (
                <div className="text-center px-6 max-w-md">
                  <div className="text-3xl font-bold text-blue-600 mb-3">{item.content.title}</div>
                  <p className="text-slate-600 mb-4">{item.content.description}</p>
                  {item.content.cta && item.content.ctaLink && (
                    <a
                      href={item.content.ctaLink}
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {item.content.cta}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              selectedIndex === index
                ? "w-8 bg-blue-600"
                : "w-2 bg-blue-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

