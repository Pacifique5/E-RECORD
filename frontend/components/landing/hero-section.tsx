export default function HeroSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="inline-block bg-white rounded-full px-6 py-2 mb-6">
            <p className="text-blue-600">The leading software for school financials management</p>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Monitor your school financial Management
          </h1>

          <p className="text-gray-700 mb-10">All in one system making schools financial management easier and modern</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors">
              Get Started
            </button>
            <button className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 py-2 px-6 rounded-md transition-colors">
              See how it works
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
