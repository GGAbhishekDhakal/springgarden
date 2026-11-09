import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function createProgram(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  if (!title) return;
  await prisma.program.create({
    data: {
      title,
      ageRange: String(formData.get("ageRange") || "").trim() || null,
      description: String(formData.get("description") || "").trim() || null,
    },
  });
  revalidatePath("/admin/programs"); revalidatePath("/programs"); revalidatePath("/");
}
async function deleteProgram(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (id) await prisma.program.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/programs"); revalidatePath("/programs"); revalidatePath("/");
}

export default async function ProgramsAdminPage() {
  const items = await prisma.program.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Programs</h1>
      <p className="mt-1 text-slate-600">Manage school programs (Playgroup, Nursery, Kindergarten, Primary, etc.).</p>
      <form action={createProgram} className="mt-6 rounded-xl border bg-white p-4 grid gap-3 sm:grid-cols-2 max-w-3xl">
        <div><label className="block text-sm font-medium">Title *</label><input name="title" required className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div><label className="block text-sm font-medium">Age range</label><input name="ageRange" placeholder="e.g., 2+ years" className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div className="sm:col-span-2"><label className="block text-sm font-medium">Description</label><textarea name="description" rows={3} className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div className="sm:col-span-2"><button className="rounded-md bg-teal-700 px-4 py-2 text-white text-sm font-medium">Add program</button></div>
      </form>
      <div className="mt-6 grid gap-3">
        {items.map((p) => (
          <div key={p.id} className="rounded-xl border bg-white p-4 flex justify-between gap-4">
            <div><div className="font-medium">{p.title}</div><div className="text-sm text-slate-600">{p.ageRange}</div>{p.description && <p className="mt-1 text-sm text-slate-700">{p.description}</p>}</div>
            <form action={deleteProgram}><input type="hidden" name="id" value={p.id} /><button className="text-sm text-red-700">Delete</button></form>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate-600">No programs yet. The public site will use default messaging until you add programs.</p>}
      </div>
    </div>
  );
}
