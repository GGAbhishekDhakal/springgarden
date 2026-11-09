import Link from "next/link";
import { getPublicData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { settings, categories, staff, programs } = await getPublicData();
  const previewImages = categories.flatMap((c) => c.images.map((i) => ({ ...i, categoryName: c.name }))).slice(0, 8);

  return (
    <main>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold text-teal-700">Welcome to {settings.schoolName}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {settings.heroTitle || "A happy place to learn and grow"}
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              {settings.heroSubtitle || settings.tagline || settings.footerAbout}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-md bg-teal-700 px-5 py-2.5 text-white font-medium hover:bg-teal-800">Contact / Admission</Link>
              <Link href="/gallery" className="rounded-md border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-50">View Gallery</Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white border p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">Visit us</h2>
            <dl className="mt-3 space-y-2 text-sm text-slate-700">
              <div><dt className="font-medium text-slate-900">Address</dt><dd>{settings.address}</dd></div>
              <div><dt className="font-medium text-slate-900">Office hours</dt><dd>{settings.officeHours}</dd></div>
              <div><dt className="font-medium text-slate-900">Phone</dt><dd><a className="text-teal-700 hover:underline" href={`tel:${(settings.phone || "").replace(/\s+/g, "")}`}>{settings.phone}</a></dd></div>
            </dl>
          </div>
        </div>
      </section>

      {programs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold text-slate-900">Our Programs</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <div key={p.id} className="rounded-xl border p-5">
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                {p.ageRange && <p className="text-sm text-teal-700">{p.ageRange}</p>}
                {p.description && <p className="mt-2 text-sm text-slate-700">{p.description}</p>}
              </div>
            ))}
          </div>
          <div className="mt-4"><Link href="/programs" className="text-teal-700 hover:underline text-sm font-medium">See all programs →</Link></div>
        </section>
      )}

      <section className="bg-slate-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Gallery</h2>
              <p className="mt-1 text-slate-600">Moments from our school, organized by category.</p>
            </div>
            <Link href="/gallery" className="text-teal-700 hover:underline text-sm font-medium">View all →</Link>
          </div>
          {previewImages.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {previewImages.map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={img.id} src={img.url} alt={img.caption || img.categoryName} className="h-36 w-full rounded-lg object-cover bg-slate-200" />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-slate-600">Gallery photos will appear here once added in the admin panel.</p>
          )}
        </div>
      </section>

      {staff.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold text-slate-900">Our Team</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {staff.slice(0, 6).map((s) => (
              <div key={s.id} className="rounded-xl border p-4 flex gap-3 items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {s.photoUrl ? <img src={s.photoUrl} alt={s.name} className="h-14 w-14 rounded-full object-cover bg-slate-100" /> : <div className="h-14 w-14 rounded-full bg-slate-100 shrink-0" />}
                <div>
                  <div className="font-medium text-slate-900">{s.name}</div>
                  <div className="text-sm text-teal-700">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4"><Link href="/about" className="text-teal-700 hover:underline text-sm font-medium">Meet the full team →</Link></div>
        </section>
      )}
    </main>
  );
}
