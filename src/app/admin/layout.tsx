import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { logoutAction } from "./actions";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell userEmail={user.email} logoutAction={logoutAction}>
      {children}
    </AdminShell>
  );
}
