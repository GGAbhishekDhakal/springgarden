import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function createTestimonial(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const quote = String(formData.get("quote") || "").trim();
  if (!name || !quote) return;
  await prisma.testimonial.create({
    data: { name, quote, role: String(formData.get("role")||"").trim() || null, location: String(formData.get("location")||"").trim() || null },
  });
  revalidatePath("/admin/testimonials"); revalidatePath("/");
}
async function deleteTestimonial(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (id) await prisma.testimonial.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/testimonials"); revalidatePath("/");
}

export default async function TestimonialsAdminPage() {
  const items = await prisma.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Testimonials</h1>
      <form action={createTestimonial} className="mt-6 rounded-xl border bg-white p-4 grid gap-3 sm:grid-cols-2 max-w-3xl">
        <div><label className="block text-sm font-medium">Name/label *</label><input name="name" required className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div><label className="block text-sm font-medium">Role (e.g., Parent)</label><input name="role" className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div className="sm:col-span-2"><label className="block text-sm font-medium">Location</label><input name="location" className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div className="sm:col-span-2"><label className="block text-sm font-medium">Quote *</label><textarea name="quote" required rows={3} className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div className="sm:col-span-2"><button className="rounded-md bg-teal-700 px-4 py-2 text-white text-sm font-medium">Add testimonial</button></div>
      </form>
      <div className="mt-6 grid gap-3">
        {items.map((t) => (
          <div key={t.id} className="rounded-xl border bg-white p-4 flex justify-between gap-4">
            <div><div className="font-medium">{t.name}</div><div className="text-sm text-slate-500">{t.role} {t.location ? `· ${t.location}` : ""}</div><p className="mt-1 text-sm text-slate-700">{t.quote}</p></div>
            <form action={deleteTestimonial}><input type="hidden" name="id" value={t.id} /><button className="text-sm text-red-700">Delete</button></form>
          </div>
        ))}
      </div>
    </div>
  );
}
