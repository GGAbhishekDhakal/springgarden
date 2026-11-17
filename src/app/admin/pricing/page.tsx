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
  revalidatePath("/admin/pricing"); revalidatePath("/admin/fees"); revalidatePath("/pricing"); revalidatePath("/");
}
async function deleteFee(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (id) await prisma.feePlan.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/pricing"); revalidatePath("/admin/fees"); revalidatePath("/pricing"); revalidatePath("/");
}

export default async function PricingAdminPage() {
  const items = await prisma.feePlan.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Pricing</h1>
        <p className="mt-1 text-slate-600">Manage fee/pricing plans shown on the Pricing page. (If none are added, the site shows default pricing.)</p>
      </div>
      <form action={createFee} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm grid gap-3 max-w-xl">
        <div><label className="block text-sm font-medium text-slate-700">Plan name *</label><input name="name" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></div>
        <div><label className="block text-sm font-medium text-slate-700">Price *</label><input name="price" required placeholder="e.g., Rs. 3,500" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></div>
        <div><label className="block text-sm font-medium text-slate-700">Features (one per line)</label><textarea name="features" rows={4} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></div>
        <button className="rounded-lg bg-teal-600 px-4 py-2 text-white text-sm font-medium hover:bg-teal-700 w-fit">Add fee plan</button>
      </form>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((p) => (
          <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex justify-between gap-3"><div className="font-semibold text-slate-900">{p.name}</div><form action={deleteFee}><input type="hidden" name="id" value={p.id} /><button className="text-sm text-red-700 hover:underline">Delete</button></form></div>
            <div className="text-teal-700 font-medium">{p.price}</div>
            <ul className="mt-2 text-sm text-slate-700 list-disc pl-5">{p.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-600">No pricing plans yet. Default plans are shown on the website.</p>}
      </div>
    </div>
  );
}
