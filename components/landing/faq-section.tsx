"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Exactly which problem did e-record come to solve",
      answer:
        "E-record was developed to modernize and streamline school financial management systems, making it easier for schools to track expenses, manage student payments, generate reports, and handle staff payroll efficiently.",
    },
    {
      question: "Exactly which problem did e-record come to solve",
      answer:
        "E-record was developed to modernize and streamline school financial management systems, making it easier for schools to track expenses, manage student payments, generate reports, and handle staff payroll efficiently.",
    },
    {
      question: "Exactly which problem did e-record come to solve",
      answer:
        "E-record was developed to modernize and streamline school financial management systems, making it easier for schools to track expenses, manage student payments, generate reports, and handle staff payroll efficiently.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          <p className="text-gray-600">We have put together some commonly asked questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="flex justify-between items-center w-full py-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <Plus className="h-5 w-5 text-gray-400" />
              </button>
              {openIndex === index && (
                <div className="pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
