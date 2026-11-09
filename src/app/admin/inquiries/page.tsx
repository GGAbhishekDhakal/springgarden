import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function markRead(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.inquiry.update({ where: { id }, data: { status: "read" } });
  revalidatePath("/admin/inquiries");
}

export default async function InquiriesAdminPage() {
  const items = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Inquiries</h1>
      <p className="mt-1 text-slate-600">Messages submitted from the contact form.</p>
      <div className="mt-6 grid gap-3">
        {items.length === 0 && <p className="text-slate-600">No inquiries yet.</p>}
        {items.map((i) => (
          <div key={i.id} className={`rounded-xl border bg-white p-4 ${i.status === "new" ? "border-teal-300" : ""}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-medium text-slate-900">{[i.firstName, i.lastName].filter(Boolean).join(" ") || "Website visitor"} {i.status === "new" && <span className="ml-2 text-xs rounded bg-teal-100 text-teal-800 px-2 py-0.5">New</span>}</div>
              <div className="text-xs text-slate-500">{i.createdAt.toLocaleString()}</div>
            </div>
            <div className="mt-1 text-sm text-slate-600">{i.email}{i.email && i.phone ? " · " : ""}{i.phone}</div>
            <p className="mt-2 text-sm text-slate-800 whitespace-pre-wrap">{i.message}</p>
            {i.status === "new" && (
              <form action={markRead} className="mt-3">
                <input type="hidden" name="id" value={i.id} />
                <button className="text-sm text-teal-700 hover:underline">Mark as read</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
