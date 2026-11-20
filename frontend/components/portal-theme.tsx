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
  const dark = mode === "dark"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Dark mode" : "White mode"}
      onClick={() => setMode(dark ? "light" : "dark")}
      className="relative inline-flex h-9 w-[92px] shrink-0 items-center rounded-full p-1 transition-colors duration-200"
      style={{ backgroundColor: dark ? "#3DDC97" : "#D1D5DB" }}
    >
      <span
        className={`pointer-events-none z-10 w-full text-[11px] font-extrabold uppercase leading-none tracking-wide ${
          dark ? "pl-1 text-left text-white" : "pr-1 text-right text-gray-600"
        }`}
      >
        {dark ? "Dark" : "White"}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute left-1 top-1 h-7 w-7 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.18)] transition-transform duration-200"
        style={{
          backgroundColor: "#ffffff",
          transform: dark ? "translateX(56px)" : "translateX(0)",
        }}
      />
    </button>
  )
}
