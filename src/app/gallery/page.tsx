import Link from "next/link";
import { getPublicData } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function GalleryPage({ searchParams }: { searchParams: { category?: string } }) {
  const { settings, categories } = await getPublicData();
  const active = searchParams.category || "";
  const current = active ? categories.find((c) => c.slug === active) : null;
  const images = current ? current.images : categories.flatMap((c) => c.images.map((i) => ({ ...i, categoryName: c.name })));

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Gallery</h1>
      <p className="mt-2 text-slate-600">Photos from {settings.schoolName}, organized by category.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/gallery" className={`rounded-full px-4 py-1.5 text-sm border ${!active ? "bg-teal-700 text-white border-teal-700" : "hover:bg-slate-50"}`}>All</Link>
        {categories.map((c) => (
          <Link key={c.id} href={`/gallery?category=${c.slug}`} className={`rounded-full px-4 py-1.5 text-sm border ${active === c.slug ? "bg-teal-700 text-white border-teal-700" : "hover:bg-slate-50"}`}>
            {c.name} <span className="opacity-70">({c.images.length})</span>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="mt-8 rounded-xl border bg-slate-50 p-6 text-slate-700">
          Gallery categories and photos will appear here once added from the admin panel.
        </div>
      )}

      {current && <h2 className="mt-8 text-xl font-semibold text-slate-900">{current.name}</h2>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img: any) => (
          <figure key={img.id} className="rounded-xl border overflow-hidden bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.caption || "School photo"} className="h-56 w-full object-cover bg-slate-100" />
            {(img.caption || img.categoryName) && (
              <figcaption className="p-3 text-sm text-slate-700">
                {img.caption}
                {!current && img.categoryName && <span className="ml-1 text-slate-400">· {img.categoryName}</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      {images.length === 0 && categories.length > 0 && <p className="mt-6 text-slate-600">No photos in this category yet.</p>}
    </main>
  );
}
