import type { Metadata } from "next";
import { getPublicData } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Programs" };

const fallback = [
  { title: "Playgroup", ageRange: "2+ years", description: "A gentle first step for little ones. Play-based learning, music, rhymes and lots of love." },
  { title: "Nursery & Kindergarten", ageRange: "Early years", description: "Phonics, numbers, art and activity-based classes that prepare children for primary school." },
  { title: "Primary (Class 1-3)", ageRange: "Primary", description: "A strong academic foundation in English and Nepali with sports, clubs and events." },
];

export default async function ProgramsPage() {
  const { programs } = await getPublicData();
  const list = programs.length ? programs : fallback.map((f, i) => ({ id: String(i), ...f, imageUrl: null }));
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Our Programs</h1>
      <p className="mt-2 text-slate-600">Learning programs from Playgroup to Primary (Class 1-3).</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p: any) => (
          <article key={p.id} className="rounded-xl border p-6 bg-white">
            <h2 className="text-xl font-semibold text-slate-900">{p.title}</h2>
            {p.ageRange && <p className="mt-1 text-sm font-medium text-teal-700">{p.ageRange}</p>}
            {p.description && <p className="mt-3 text-slate-700">{p.description}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
