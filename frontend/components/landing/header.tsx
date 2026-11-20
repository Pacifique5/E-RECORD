"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import BrandLogo from "@/components/brand-logo"

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#contact", label: "Contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full py-4 sm:py-6 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-3">
          <BrandLogo href="/" className="h-8 sm:h-10 w-auto" />

          <nav className="hidden md:flex items-center space-x-8">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/registration" prefetch={true} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:px-6 rounded-md text-sm sm:text-base transition-colors">
              Get Started
            </Link>
            <button
              type="button"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((current) => !current)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden mt-4 flex flex-col gap-1 border-t border-gray-100 pt-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
