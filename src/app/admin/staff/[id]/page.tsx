import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateStaffAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditStaffPage({ params }: { params: { id: string } }) {
  const staff = await prisma.staffMember.findUnique({ where: { id: params.id } });
  if (!staff) notFound();
  return (
    <div>
      <div className="text-sm text-slate-500"><Link href="/admin/staff" className="hover:underline">Staff</Link> / Edit</div>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Edit staff member</h1>
      <form action={updateStaffAction} className="mt-6 rounded-xl border bg-white p-4 grid gap-3 sm:grid-cols-2 max-w-3xl">
        <input type="hidden" name="id" value={staff.id} />
        <div>
          <label className="block text-sm font-medium text-slate-700">Name *</label>
          <input name="name" required defaultValue={staff.name} className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Role / Designation *</label>
          <input name="role" required defaultValue={staff.role} className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Department/Class</label>
          <input name="department" defaultValue={staff.department || ""} className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Replace photo (optional)</label>
          <input name="photo" type="file" accept="image/*" className="mt-1 text-sm" />
          {staff.photoUrl ? <div className="mt-2"><img src={staff.photoUrl} alt="" className="h-16 w-16 rounded object-cover" /></div> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Short bio</label>
          <textarea name="bio" rows={4} defaultValue={staff.bio || ""} className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div className="sm:col-span-2 flex items-center gap-2">
          <input id="published" name="published" type="checkbox" defaultChecked={staff.published} />
          <label htmlFor="published" className="text-sm text-slate-700">Published (visible on site)</label>
        </div>
        <div className="sm:col-span-2 flex gap-2">
          <button className="rounded-md bg-teal-700 px-4 py-2 text-white text-sm font-medium hover:bg-teal-800">Save changes</button>
          <Link href="/admin/staff" className="rounded-md border px-4 py-2 text-sm">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
