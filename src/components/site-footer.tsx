import Link from "next/link";

type Settings = {
  schoolName: string; footerAbout?: string | null; address?: string | null; phone?: string | null;
  email?: string | null; facebookUrl?: string | null; tiktokUrl?: string | null;
};

export function SiteFooter({ settings }: { settings: Settings }) {
  return (
    <footer className="mt-16 border-t bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-white">{settings.schoolName}</h2>
          <p className="mt-2 text-sm text-slate-300">{settings.footerAbout}</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Pages</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/programs" className="hover:text-white">Programs</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-2 space-y-1 text-sm text-slate-300">
            {settings.address && <p>{settings.address}</p>}
            {settings.phone && <p><a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-white">{settings.phone}</a></p>}
            {settings.facebookUrl && <p><a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a></p>}
            {settings.tiktokUrl && <p><a href={settings.tiktokUrl} target="_blank" rel="noreferrer" className="hover:text-white">TikTok</a></p>}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} {settings.schoolName}. All rights reserved.
      </div>
    </footer>
  );
}
