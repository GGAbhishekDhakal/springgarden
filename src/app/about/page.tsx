import type { Metadata } from "next";
import { getPublicData } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const { settings, staff } = await getPublicData();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">About {settings.schoolName}</h1>
      <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">{settings.footerAbout}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 max-w-3xl text-sm">
        <div className="rounded-xl border p-4"><div className="font-medium text-slate-900">Address</div><div className="mt-1 text-slate-700">{settings.address}</div></div>
        <div className="rounded-xl border p-4"><div className="font-medium text-slate-900">Office hours</div><div className="mt-1 text-slate-700">{settings.officeHours}</div></div>
      </div>

      <h2 className="mt-12 text-2xl font-semibold text-slate-900">Our Team</h2>
      <p className="mt-1 text-slate-600">Meet the caring staff at our school.</p>
      {staff.length === 0 ? (
        <p className="mt-6 text-slate-600">Staff profiles will appear here once added from the admin panel.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((s) => (
            <article key={s.id} className="rounded-xl border p-5">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {s.photoUrl ? <img src={s.photoUrl} alt={s.name} className="h-16 w-16 rounded-full object-cover bg-slate-100" /> : <div className="h-16 w-16 rounded-full bg-slate-100" />}
                <div>
                  <h3 className="font-semibold text-slate-900">{s.name}</h3>
                  <p className="text-sm text-teal-700">{s.role}</p>
                </div>
              </div>
              {s.bio && <p className="mt-3 text-sm text-slate-700">{s.bio}</p>}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
