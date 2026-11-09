import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { uploadGalleryImageAction, deleteGalleryImageAction, toggleCategoryAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function GalleryCategoryPage({ params }: { params: { id: string } }) {
  const category = await prisma.galleryCategory.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] } },
  });
  if (!category) notFound();

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/gallery" className="hover:underline">Gallery</Link> <span>/</span> <span>{category.name}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">{category.name}</h1>
        <form action={toggleCategoryAction}>
          <input type="hidden" name="id" value={category.id} />
          <button className="rounded-md border px-3 py-1.5 text-sm">{category.published ? "Hide category" : "Publish category"}</button>
        </form>
      </div>

      <form action={uploadGalleryImageAction} className="mt-6 rounded-xl border bg-white p-4 space-y-3">
        <input type="hidden" name="categoryId" value={category.id} />
        <div className="font-medium text-slate-900">Upload photo</div>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-sm text-slate-700">Image file</label>
            <input name="file" type="file" accept="image/*" required className="mt-1 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-slate-700">Caption (optional)</label>
            <input name="caption" className="mt-1 rounded-md border px-3 py-2" />
          </div>
          <button className="rounded-md bg-teal-700 px-4 py-2 text-white text-sm font-medium hover:bg-teal-800">Upload</button>
        </div>
        <p className="text-xs text-slate-500">Requires Cloudinary env vars on the server. Images are stored in the cloud.</p>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.images.length === 0 && <p className="text-slate-600">No photos yet. Upload the first one above.</p>}
        {category.images.map((img) => (
          <div key={img.id} className="rounded-xl border bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.caption || category.name} className="h-48 w-full object-cover bg-slate-100" />
            <div className="p-3 flex items-start justify-between gap-2">
              <div className="text-sm text-slate-700">{img.caption || <span className="text-slate-400">No caption</span>}</div>
              <form action={deleteGalleryImageAction}>
                <input type="hidden" name="id" value={img.id} />
                <button className="text-sm text-red-700 hover:underline">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
