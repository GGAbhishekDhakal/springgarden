import Link from "next/link";
import { prisma } from "@/lib/db";
import { createStaffAction, deleteStaffAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function StaffAdminPage() {
  const staff = await prisma.staffMember.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Staff Members</h1>
      <p className="mt-1 text-slate-600">Add teachers and staff with photos, roles, and short bios.</p>

      <form action={createStaffAction} className="mt-6 rounded-xl border bg-white p-4 grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2 font-medium text-slate-900">Add staff member</div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Name *</label>
          <input name="name" required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Role / Designation *</label>
          <input name="role" required placeholder="e.g., Kindergarten Teacher" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Department/Class (optional)</label>
          <input name="department" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Photo (optional)</label>
          <input name="photo" type="file" accept="image/*" className="mt-1 text-sm" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Short bio (optional)</label>
          <textarea name="bio" rows={3} className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div className="sm:col-span-2">
          <button className="rounded-md bg-teal-700 px-4 py-2 text-white text-sm font-medium hover:bg-teal-800">Add staff member</button>
        </div>
      </form>

      <div className="mt-6 grid gap-3">
        {staff.length === 0 && <p className="text-slate-600">No staff members yet.</p>}
        {staff.map((s) => (
          <div key={s.id} className="rounded-xl border bg-white p-4 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {s.photoUrl ? <img src={s.photoUrl} alt={s.name} className="h-14 w-14 rounded-full object-cover bg-slate-100" /> : <div className="h-14 w-14 rounded-full bg-slate-100" />}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-900">{s.name} {!s.published && <span className="text-xs text-slate-400">(hidden)</span>}</div>
              <div className="text-sm text-slate-600">{s.role}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/staff/${s.id}`} className="rounded-md border px-3 py-1.5 text-sm">Edit</Link>
              <form action={deleteStaffAction}>
                <input type="hidden" name="id" value={s.id} />
                <button className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
