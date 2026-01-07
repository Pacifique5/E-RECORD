"use client"

import { useState, useEffect, useRef } from "react"

export default function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const positionRef = useRef(0)

  const testimonials = [
    {
      name: "Niyigena Papias",
      role: "Rwanda coding academy Headmaster",
      content:
        "E-record helped us to make our financial reports keeping faster and modern as we could spend like a whole week doing something but now its becoming simple and easier through using e-record modern system which is also making our staff payments easier and faster",
    },
    {
      name: "John Doe",
      role: "St. Mary's School Principal",
      content:
        "The implementation of E-record has revolutionized our financial management. We've seen a 40% reduction in time spent on administrative tasks and improved accuracy in our financial reporting.",
    },
    {
      name: "Sarah Johnson",
      role: "Green Valley Academy Director",
      content:
        "As a school director, I appreciate how E-record has streamlined our fee collection process. Parents can now easily track payments, and our staff can focus more on education rather than paperwork.",
    },
    {
      name: "Michael Brown",
      role: "Tech High School Administrator",
      content:
        "The budget planning features in E-record are exceptional. We can now make data-driven decisions about resource allocation, leading to better financial outcomes for our school.",
    },
    {
      name: "Emma Wilson",
      role: "Bright Future School Principal",
      content:
        "E-record's expense tracking system has given us unprecedented visibility into our school's finances. It's like having a financial dashboard that's always up to date.",
    },
  ]

  // Create multiple sets for seamless infinite scrolling
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const animate = () => {
      if (!isHovered) {
        // Smooth, consistent movement speed (pixels per frame)
        positionRef.current += 0.5
        
        // Calculate when to reset (when first set is completely out of view)
        const cardWidth = container.offsetWidth / 3 // Each card takes 1/3 of container width
        const resetPoint = testimonials.length * cardWidth
        
        if (positionRef.current >= resetPoint) {
          positionRef.current = 0
        }
        
        // Apply smooth transform
        const translateX = -positionRef.current
        container.style.transform = `translateX(${translateX}px)`
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, testimonials.length])

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Different Schools Say About Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stories from different schools who started using our system for modernizing their financial records
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Gradient overlays for smooth edge fade */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />
          
          {/* Testimonials Container */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              ref={containerRef}
              className="flex gap-6 will-change-transform"
              style={{
                width: `${infiniteTestimonials.length * (100/3)}%`,
                transition: isHovered ? 'transform 0.3s ease-out' : 'none'
              }}
            >
              {infiniteTestimonials.map((testimonial, index) => (
                <div 
                  key={`${testimonial.name}-${index}`}
                  className="flex-shrink-0 w-1/3 px-3"
                  style={{ width: `${100/infiniteTestimonials.length}%` }}
                >
                  <div className="bg-card border border-border rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm">
                    <div className="flex flex-col h-full">
                      <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}