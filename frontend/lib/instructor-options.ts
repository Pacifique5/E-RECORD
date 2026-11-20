export const SUBJECTS = [
  { value: "mathematics", label: "Mathematics", group: "science" },
  { value: "physics", label: "Physics", group: "science" },
  { value: "chemistry", label: "Chemistry", group: "science" },
  { value: "biology", label: "Biology", group: "science" },
  { value: "computer_science", label: "Computer Science", group: "science" },
  { value: "economics", label: "Economics", group: "humanities" },
  { value: "geography", label: "Geography", group: "humanities" },
  { value: "history", label: "History", group: "humanities" },
  { value: "literature", label: "Literature", group: "humanities" },
  { value: "french", label: "French", group: "humanities" },
  { value: "english", label: "English", group: "humanities" },
  { value: "kinyarwanda", label: "Kinyarwanda", group: "humanities" },
  { value: "entrepreneurship", label: "Entrepreneurship", group: "humanities" },
]

export function subjectLabel(value?: string | null) {
  if (!value) return "—"
  return SUBJECTS.find((item) => item.value === value)?.label || value
}

export function isScienceSubject(value?: string | null) {
  return SUBJECTS.some((item) => item.value === value && item.group === "science")
}
