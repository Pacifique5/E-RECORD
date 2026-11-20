export const STUDENT_CLASSES = ["S1", "S2", "S3", "S4", "S5", "S6"]

export const UPPER_CLASSES = ["S4", "S5", "S6"]

export const COMBINATIONS = [
  { value: "MCB", label: "MCB — Mathematics, Chemistry, Biology" },
  { value: "PCB", label: "PCB — Physics, Chemistry, Biology" },
  { value: "PCM", label: "PCM — Physics, Chemistry, Mathematics" },
  { value: "MPC", label: "MPC — Mathematics, Physics, Computer Science" },
  { value: "MEG", label: "MEG — Mathematics, Economics, Geography" },
  { value: "HEG", label: "HEG — History, Economics, Geography" },
  { value: "HGL", label: "HGL — History, Geography, Literature" },
  { value: "LF", label: "LF — Literature, French" },
]

export function combinationLabel(value?: string | null) {
  if (!value) return "—"
  return COMBINATIONS.find((item) => item.value === value)?.label || value
}
