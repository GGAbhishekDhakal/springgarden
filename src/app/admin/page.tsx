import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [categories, images, staff, programs, inquiries] = await Promise.all([
    prisma.galleryCategory.count(),
    prisma.galleryImage.count(),
    prisma.staffMember.count(),
    prisma.program.count(),
    prisma.inquiry.count({ where: { status: "new" } }),
  ]);

  const cards = [
    { label: "Gallery categories", value: categories, href: "/admin/gallery" },
    { label: "Gallery photos", value: images, href: "/admin/gallery" },
    { label: "Staff members", value: staff, href: "/admin/staff" },
    { label: "Programs", value: programs, href: "/admin/programs" },
    { label: "New inquiries", value: inquiries, href: "/admin/inquiries" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Manage school website content.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-xl border bg-white p-5 shadow-sm hover:border-teal-300">
            <div className="text-sm text-slate-500">{c.label}</div>
            <div className="mt-1 text-3xl font-semibold text-slate-900">{c.value}</div>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-xl border bg-white p-5">
        <h2 className="font-semibold text-slate-900">Priority setup</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
          <li>Set <strong>Settings</strong> (address, phone, hours, social links).</li>
          <li>Add <strong>Gallery categories</strong>, then upload photos into each category.</li>
          <li>Add <strong>Staff members</strong> with names, roles, and photos.</li>
          <li>Configure Cloudinary env vars on Vercel for image uploads.</li>
        </ul>
      </div>
    </div>
  );
}
