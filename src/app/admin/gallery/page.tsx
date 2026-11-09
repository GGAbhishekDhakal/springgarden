import Link from "next/link";
import { prisma } from "@/lib/db";
import { createCategoryAction, deleteCategoryAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const categories = await prisma.galleryCategory.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { images: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Gallery</h1>
      <p className="mt-1 text-slate-600">Create categories (e.g., Sports Day, Classroom), then upload photos.</p>

      <form action={createCategoryAction} className="mt-6 rounded-xl border bg-white p-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-700">New category name</label>
          <input name="name" required placeholder="e.g., Annual Day" className="mt-1 rounded-md border px-3 py-2 w-64" />
        </div>
        <button className="rounded-md bg-teal-700 px-4 py-2 text-white text-sm font-medium hover:bg-teal-800">Add category</button>
      </form>

      <div className="mt-6 grid gap-3">
        {categories.length === 0 && <p className="text-slate-600">No categories yet. Add one above.</p>}
        {categories.map((c) => (
          <div key={c.id} className="rounded-xl border bg-white p-4 flex items-center justify-between gap-4">
            <div>
              <Link href={`/admin/gallery/${c.id}`} className="font-medium text-teal-800 hover:underline">{c.name}</Link>
              <div className="text-sm text-slate-500">{c._count.images} photos · {c.published ? "Published" : "Hidden"}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/gallery/${c.id}`} className="rounded-md border px-3 py-1.5 text-sm">Manage photos</Link>
              <form action={deleteCategoryAction}>
                <input type="hidden" name="id" value={c.id} />
                <button className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
