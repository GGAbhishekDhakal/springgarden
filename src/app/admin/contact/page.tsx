import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const newCount = await prisma.inquiry.count({ where: { status: "new" } }).catch(() => 0);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Contact Page</h1>
        <p className="mt-1 text-slate-600">Control contact information and view inquiries from the website.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">Contact information</h2>
          <p className="mt-2 text-sm text-slate-600">Address, phone, hours, map and related details are managed in Settings. Dedicated contact-page content controls can be added in a later step.</p>
          <Link href="/admin/settings" className="mt-4 inline-flex rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Open settings</Link>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">Inquiries</h2>
          <p className="mt-2 text-sm text-slate-600">Messages submitted from the contact form. New inquiries: <strong>{newCount}</strong>.</p>
          <Link href="/admin/inquiries" className="mt-4 inline-flex rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">View inquiries</Link>
        </div>
      </div>
    </div>
  );
}
