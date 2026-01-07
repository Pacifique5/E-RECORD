import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

export default function FeaturesSection() {
  const features = [
    {
      title: "Finance Made Easier",
      description: "Track School expenses how student pay school fees school expenses and how at are paid at your school through using our web app.",
    },
    {
      title: "Powerful Reports",
      description: "Have your school's financial reports in our one in one app which offers all those features to modernise the financial system in schools",
    },
    {
      title: "Multi-School Management",
      description: "Not only working for only one school system but working for different schools in Rwanda and modernising the system",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Features</h2>
          <p className="text-gray-600">Get to know what we offer to those who use our system</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <Button variant="outline" className="flex items-center text-white hover:text-white bg-blue-600 hover:bg-blue-700 transition-all">
              Learn more
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          ))}
        </div>
      </div>
    </section>
  )
}
