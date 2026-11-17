"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; icon: React.ReactNode };

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const items: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: <Icon d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z" /> },
  { href: "/admin/home", label: "Home", icon: <Icon d="M4 6h16M4 12h10M4 18h16" /> },
  { href: "/admin/about", label: "About", icon: <Icon d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 9a7 7 0 0 1 14 0" /> },
  { href: "/admin/programs", label: "Programs", icon: <Icon d="M4 5h16v4H4zm0 6h7v8H4zm9 0h7v8h-7z" /> },
  { href: "/admin/gallery", label: "Gallery", icon: <Icon d="M4 5h16v14H4z M8 14l2-2 3 3 3-4 2 3" /> },
  { href: "/admin/pricing", label: "Pricing", icon: <Icon d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" /> },
  { href: "/admin/contact", label: "Contact", icon: <Icon d="M4 6h16v12H4z M4 7l8 6 8-6" /> },
  { href: "/admin/inquiries", label: "Inquiries", icon: <Icon d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /> },
  { href: "/admin/settings", label: "Settings", icon: <Icon d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.2 1.2 0 1 1-1.7 1.7l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V19a1.2 1.2 0 1 1-2.4 0v-.1a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a1.2 1.2 0 1 1-1.7-1.7l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H5a1.2 1.2 0 1 1 0-2.4h.1a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1A1.2 1.2 0 1 1 7.4 5l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V4a1.2 1.2 0 1 1 2.4 0v.1a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.2 1.2 0 1 1 1.7 1.7l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H19a1.2 1.2 0 1 1 0 2.4h-.1a1 1 0 0 0-.9.6Z" /> },
];

export function AdminShell({
  userEmail,
  logoutAction,
  children,
}: {
  userEmail: string;
  logoutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-900 text-slate-100">
        <div className="h-16 flex items-center px-5 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-white">SG</span>
            <span>Spring Garden</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-teal-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <Link href="/" className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">View website</Link>
        </div>
      </aside>

      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="md:hidden font-semibold text-slate-900">SG Admin</div>
            <div className="hidden sm:block text-sm text-slate-500 truncate">Content management</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm text-slate-600 truncate max-w-[220px]">{userEmail}</div>
            <form action={logoutAction}>
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Sign out</button>
            </form>
          </div>
        </header>
        <div className="md:hidden bg-white border-b border-slate-200 px-3 py-2 overflow-x-auto">
          <div className="flex gap-2 w-max">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href} className={`rounded-md px-3 py-1.5 text-sm whitespace-nowrap ${active ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
