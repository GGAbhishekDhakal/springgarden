import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { SetupForm } from "./setup-form";

export default async function AdminSetupPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin");
  const count = await prisma.adminUser.count();
  if (count > 0) redirect("/admin/login");
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Create Admin Account</h1>
        <p className="mt-1 text-sm text-slate-600">Set up the first admin for Spring Garden.</p>
        <div className="mt-6">
          <SetupForm />
        </div>
      </div>
    </main>
  );
}
