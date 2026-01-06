import Image from "next/image"

export default function DashboardPreview() {
  return (
    <section className="py-8 px-4 bg-blue-100">
      <div className="container mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden max-w-6xl mx-auto">
          <Image
            src="/images/dashboard-preview.png"
            alt="E-Record Dashboard Preview"
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  )
}
