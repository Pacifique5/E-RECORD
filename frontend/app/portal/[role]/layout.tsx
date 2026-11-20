import { notFound } from "next/navigation"
import PortalShell from "@/components/portal/portal-shell"
import { isPortalRole } from "@/lib/portal-role"

export default async function PortalRoleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ role: string }>
}) {
  const { role } = await params
  if (!isPortalRole(role)) notFound()

  return <PortalShell role={role}>{children}</PortalShell>
}
