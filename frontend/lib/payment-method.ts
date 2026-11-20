const LABELS: Record<string, string> = {
  mobile_money: "Mobile Money",
  cash: "Cash",
  other: "Other",
}

export function paymentMethodLabel(value?: string | null) {
  if (!value) return "—"
  return LABELS[value] || value
}
