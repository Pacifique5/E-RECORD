"use client"

import { createContext, useContext, useLayoutEffect, useState } from "react"
import { usePathname } from "next/navigation"

export const THEME_STORAGE_KEY = "e-record-theme"
export type ColorMode = "light" | "dark"

function storedMode(): ColorMode {
  if (typeof window === "undefined") return "light"
  return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light"
}

export function isPortalPath(pathname: string) {
  return pathname.startsWith("/portal") || pathname.startsWith("/admin")
}

function applyMode(pathname: string, mode: ColorMode) {
  const dark = isPortalPath(pathname) && mode === "dark"
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
}

const ThemeContext = createContext<{
  mode: ColorMode
  setMode: (mode: ColorMode) => void
}>({
  mode: "light",
  setMode: () => {},
})

export function PortalThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mode, setModeState] = useState<ColorMode>("light")

  useLayoutEffect(() => {
    const saved = storedMode()
    setModeState(saved)
    applyMode(pathname, saved)
  }, [pathname])

  const setMode = (next: ColorMode) => {
    localStorage.setItem(THEME_STORAGE_KEY, next)
    setModeState(next)
    applyMode(pathname, next)
  }

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>
}

export function useColorMode() {
  return useContext(ThemeContext)
}

export function ThemeToggle() {
  const { mode, setMode } = useColorMode()

  return (
    <div
      className="inline-flex shrink-0 rounded-lg border border-gray-200 bg-white p-0.5"
      role="group"
      aria-label="Color mode"
    >
      <button
        type="button"
        aria-pressed={mode === "light"}
        onClick={() => setMode("light")}
        className={`rounded-md px-2.5 py-1 text-xs font-medium sm:px-3 sm:text-sm ${
          mode === "light" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        White
      </button>
      <button
        type="button"
        aria-pressed={mode === "dark"}
        onClick={() => setMode("dark")}
        className={`rounded-md px-2.5 py-1 text-xs font-medium sm:px-3 sm:text-sm ${
          mode === "dark" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        Dark
      </button>
    </div>
  )
}
