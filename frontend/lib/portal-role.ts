export type PortalRole = "headmaster" | "accountant"

export function isPortalRole(role: string): role is PortalRole {
  return role === "headmaster" || role === "accountant"
}
