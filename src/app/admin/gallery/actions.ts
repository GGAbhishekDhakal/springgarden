"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "category";
}

export async function createCategoryAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;
  const base = slugify(name);
  let slug = base;
  for (let i = 1; await prisma.galleryCategory.findUnique({ where: { slug } }); i++) slug = `${base}-${i}`;
  await prisma.galleryCategory.create({ data: { name, slug } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteCategoryAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const images = await prisma.galleryImage.findMany({ where: { categoryId: id } });
  for (const img of images) if (img.publicId) await deleteImage(img.publicId).catch(() => {});
  await prisma.galleryCategory.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function toggleCategoryAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const cat = await prisma.galleryCategory.findUnique({ where: { id } });
  if (!cat) return;
  await prisma.galleryCategory.update({ where: { id }, data: { published: !cat.published } });
  revalidatePath("/admin/gallery");
  revalidatePath(`/admin/gallery/${id}`);
  revalidatePath("/gallery");
}

export async function uploadGalleryImageAction(formData: FormData) {
  const categoryId = String(formData.get("categoryId") || "");
  const caption = String(formData.get("caption") || "").trim() || null;
  const file = formData.get("file");
  if (!categoryId || !(file instanceof File) || file.size === 0) return;
  const { url, publicId } = await uploadImage(file, `gallery/${categoryId}`);
  await prisma.galleryImage.create({ data: { categoryId, url, publicId, caption } });
  revalidatePath(`/admin/gallery/${categoryId}`);
  revalidatePath("/gallery");
}

export async function deleteGalleryImageAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const img = await prisma.galleryImage.findUnique({ where: { id } });
  if (!img) return;
  if (img.publicId) await deleteImage(img.publicId).catch(() => {});
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath(`/admin/gallery/${img.categoryId}`);
  revalidatePath("/gallery");
}
