export const TERM_OPTIONS = [
  { value: "first", label: "First Term" },
  { value: "second", label: "Second Term" },
  { value: "third", label: "Third Term" },
] as const

export const CLASS_ORDER = ["S1", "S2", "S3", "S4", "S5", "S6"]

export const PERIOD_KEY = "e-record-period"

export function termLabel(term: string) {
  return TERM_OPTIONS.find((item) => item.value === term)?.label || term
}

export function termValue(label: string) {
  return TERM_OPTIONS.find((item) => item.label === label)?.value || "first"
}

export function classInYear(entryClass: string, entryYear: number, year: number) {
  const start = CLASS_ORDER.indexOf(entryClass)
  if (start < 0) return null
  const index = start + (year - Number(entryYear))
  if (index < 0 || index >= CLASS_ORDER.length) return null
  return CLASS_ORDER[index]
}

export function currentPeriod() {
  const now = new Date()
  const month = now.getMonth()
  const term = month <= 3 ? "first" : month <= 7 ? "second" : "third"
  return { year: now.getFullYear(), term }
}

export function readPeriod() {
  if (typeof window === "undefined") return { year: 2026, term: "third" }
  const raw = localStorage.getItem(PERIOD_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (parsed.year && parsed.term) return { year: Number(parsed.year), term: String(parsed.term) }
    } catch {
      /* use the current period */
    }
  }
  const period = currentPeriod()
  localStorage.setItem(PERIOD_KEY, JSON.stringify(period))
  return period
}

export function storePeriod(period: { year: number; term: string }) {
  localStorage.setItem(PERIOD_KEY, JSON.stringify(period))
}
