import Link from "next/link";

type Settings = { schoolName: string; phone?: string | null; address?: string | null };

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ settings }: { settings: Settings }) {
  return (
    <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-bold text-teal-800 text-lg leading-tight">
          {settings.schoolName}
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-slate-700 hover:text-teal-700">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={`tel:${(settings.phone || "").replace(/\s+/g, "")}`} className="rounded-md bg-teal-700 px-3 py-1.5 text-sm text-white hover:bg-teal-800">
          Call
        </a>
      </div>
      <nav className="md:hidden border-t px-4 py-2 flex flex-wrap gap-3 text-sm">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="text-slate-700">{l.label}</Link>
        ))}
      </nav>
    </header>
  );
}
