import HeroSection from "@/components/landing/hero-section"
import DashboardPreview from "@/components/landing/dashboard-preview"
import FeaturesSection from "@/components/landing/features-section"
import StatsSection from "@/components/landing/stats-section"
import TestimonialsSection from "@/components/landing/testimonials-section"
import FAQSection from "@/components/landing/faq-section"
import ContactSection from "@/components/landing/contact-section"
import Footer from "@/components/landing/footer"
import Header from "@/components/landing/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-blue-100">
        <HeroSection />
      </div>
      <DashboardPreview />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <div className="bg-gray-50">
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}
