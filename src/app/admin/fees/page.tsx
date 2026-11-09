import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function createFee(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const price = String(formData.get("price") || "").trim();
  if (!name || !price) return;
  const features = String(formData.get("features") || "").split("\n").map(s => s.trim()).filter(Boolean);
  await prisma.feePlan.create({ data: { name, price, features } });
  revalidatePath("/admin/fees"); revalidatePath("/");
}
async function deleteFee(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (id) await prisma.feePlan.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/fees"); revalidatePath("/");
}

export default async function FeesAdminPage() {
  const items = await prisma.feePlan.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Fees / Pricing</h1>
      <form action={createFee} className="mt-6 rounded-xl border bg-white p-4 grid gap-3 max-w-xl">
        <div><label className="block text-sm font-medium">Plan name *</label><input name="name" required className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div><label className="block text-sm font-medium">Price *</label><input name="price" required placeholder="e.g., Rs. 3,500" className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div><label className="block text-sm font-medium">Features (one per line)</label><textarea name="features" rows={4} className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <button className="rounded-md bg-teal-700 px-4 py-2 text-white text-sm font-medium">Add fee plan</button>
      </form>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <div key={p.id} className="rounded-xl border bg-white p-4">
            <div className="flex justify-between"><div className="font-semibold">{p.name}</div><form action={deleteFee}><input type="hidden" name="id" value={p.id} /><button className="text-sm text-red-700">Delete</button></form></div>
            <div className="text-teal-700 font-medium">{p.price}</div>
            <ul className="mt-2 text-sm text-slate-700 list-disc pl-5">{p.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
