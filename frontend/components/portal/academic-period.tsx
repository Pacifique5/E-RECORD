"use client"

import { createContext, useContext, useState } from "react"
import { readPeriod, storePeriod, termLabel } from "@/lib/academic"

type Period = { year: number; term: string }

const AcademicPeriodContext = createContext<{
  year: number
  term: string
  termLabel: string
  setYear: (year: number) => void
  setTerm: (term: string) => void
} | null>(null)

export function AcademicPeriodProvider({ children }: { children: React.ReactNode }) {
  const [period, setPeriod] = useState<Period>(readPeriod)

  const update = (next: Period) => {
    storePeriod(next)
    setPeriod(next)
  }

  return (
    <AcademicPeriodContext.Provider
      value={{
        year: period.year,
        term: period.term,
        termLabel: termLabel(period.term),
        setYear: (year) => update({ ...period, year }),
        setTerm: (term) => update({ ...period, term }),
      }}
    >
      {children}
    </AcademicPeriodContext.Provider>
  )
}

export function useAcademicPeriod() {
  const period = useContext(AcademicPeriodContext)
  if (!period) throw new Error("Academic period is unavailable")
  return period
}
