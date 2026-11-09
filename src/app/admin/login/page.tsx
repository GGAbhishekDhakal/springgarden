import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin");
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-600">Spring Garden Kids World</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
