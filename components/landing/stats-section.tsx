export default function StatsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join a large number of schools who are started using our system
          </h2>
          <p className="text-gray-600">This is a large number of schools who are working and using our system</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">15,000+</div>
            <p className="text-gray-600">Serving 15k+ reports in system</p>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">50+</div>
            <p className="text-gray-600">50+ Partnered Schools Trust e-record</p>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">3,000+</div>
            <p className="text-gray-600">3k+ Successful documents modernized for schools</p>
          </div>
        </div>
      </div>
    </section>
  )
}
