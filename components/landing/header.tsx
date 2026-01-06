import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full py-6  sticky top-0 z-50 bg-transparent backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            E-Record
          </Link>

          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How it works
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contacts
              </Link>
            </nav>

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
