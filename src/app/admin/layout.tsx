import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { logoutAction } from "./actions";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/staff", label: "Staff" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/fees", label: "Fees" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  // Middleware protects most routes, but layout should be safe.
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <Link href="/admin" className="font-semibold text-slate-900">Spring Garden Admin</Link>
            <div className="text-xs text-slate-500">{user.email}</div>
          </div>
          <form action={logoutAction}>
            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50">Sign out</button>
          </form>
        </div>
        <nav className="mx-auto max-w-6xl px-4 pb-2 flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
              {item.label}
            </Link>
          ))}
          <Link href="/" className="rounded-md px-3 py-1.5 text-sm text-teal-700 hover:bg-teal-50 ml-auto">View site</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
