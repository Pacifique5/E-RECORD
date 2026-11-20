const NAME = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/
const PHONE = /^07\d{8}$/

export function personName(value: string, label: string) {
  if (!NAME.test((value || "").trim())) return `${label} should use letters only.`
  return ""
}

export function phoneNumber(value: string, label: string, required = true) {
  const phone = (value || "").trim()
  if (!phone && !required) return ""
  if (!PHONE.test(phone)) return `${label} must be 10 digits starting with 07.`
  return ""
}

export function moneyAmount(value: number | string, label: string) {
  const amount = Number(value)
  if (!Number.isFinite(amount) || amount <= 0) return `${label} must be greater than 0.`
  return ""
}

export function birthDate(value: string) {
  if (!value) return "Enter the date of birth."
  const date = new Date(value)
  if (Number.isNaN(date.getTime()) || date > new Date()) return "Date of birth cannot be in the future."
  const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  if (age < 4 || age > 30) return "Student age must be between 4 and 30."
  return ""
}

export function joinErrors(messages: string[]) {
  return messages.filter(Boolean).join(" ")
}
