import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const staffCount = await prisma.staffMember.count().catch(() => 0);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">About Page</h1>
        <p className="mt-1 text-slate-600">Control the content shown on the About/Team page.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">Team / Staff members</h2>
          <p className="mt-2 text-sm text-slate-600">Manage teachers and staff profiles shown on the About page. Current staff records: <strong>{staffCount}</strong>.</p>
          <Link href="/admin/staff" className="mt-4 inline-flex rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">Manage staff</Link>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">About content</h2>
          <p className="mt-2 text-sm text-slate-600">Editable About page sections/text will be added in a later step. For now, core school info can be updated in <strong>Settings</strong>.</p>
          <Link href="/admin/settings" className="mt-4 inline-flex rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Open settings</Link>
        </div>
      </div>
    </div>
  );
}
