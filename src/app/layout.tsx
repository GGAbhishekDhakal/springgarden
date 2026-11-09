import type { Metadata } from "next";
import "./globals.css";
import { getSettings } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: { default: s.schoolName, template: `%s | ${s.schoolName}` },
    description: s.tagline || s.footerAbout || undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <SiteHeader settings={s} />
        {children}
        <SiteFooter settings={s} />
      </body>
    </html>
  );
}
