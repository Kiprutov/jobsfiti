import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  comment: string
  avatar: string
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Specialist",
      company: "TechCorp",
      comment:
        "Job House helped me find my dream job within just two weeks! The process was smooth and the team was very supportive throughout.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      company: "InnovateSoft",
      comment:
        "I was struggling to find remote work opportunities until I discovered Job House. Now I have a flexible job that perfectly matches my skills!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "HR Manager",
      company: "Global Solutions",
      comment:
        "As a hiring manager, I've found exceptional talent through Job House. The quality of candidates is consistently high.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&auto=format&fit=crop",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic mb-4">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
