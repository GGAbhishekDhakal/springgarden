"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function createStaffAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  if (!name || !role) return;
  const bio = String(formData.get("bio") || "").trim() || null;
  const department = String(formData.get("department") || "").trim() || null;
  const file = formData.get("photo");
  let photoUrl: string | null = null;
  let publicId: string | null = null;
  if (file instanceof File && file.size > 0) {
    const up = await uploadImage(file, "staff");
    photoUrl = up.url;
    publicId = up.publicId;
  }
  await prisma.staffMember.create({ data: { name, role, bio, department, photoUrl, publicId } });
  revalidatePath("/admin/staff");
  revalidatePath("/about");
  revalidatePath("/");
  redirect("/admin/staff");
}

export async function updateStaffAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const existing = await prisma.staffMember.findUnique({ where: { id } });
  if (!existing) return;
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  if (!name || !role) return;
  const bio = String(formData.get("bio") || "").trim() || null;
  const department = String(formData.get("department") || "").trim() || null;
  const published = formData.get("published") === "on";
  let photoUrl = existing.photoUrl;
  let publicId = existing.publicId;
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    const up = await uploadImage(file, "staff");
    if (existing.publicId) await deleteImage(existing.publicId).catch(() => {});
    photoUrl = up.url;
    publicId = up.publicId;
  }
  await prisma.staffMember.update({ where: { id }, data: { name, role, bio, department, published, photoUrl, publicId } });
  revalidatePath("/admin/staff");
  revalidatePath("/about");
  revalidatePath("/");
  redirect("/admin/staff");
}

export async function deleteStaffAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const existing = await prisma.staffMember.findUnique({ where: { id } });
  if (!existing) return;
  if (existing.publicId) await deleteImage(existing.publicId).catch(() => {});
  await prisma.staffMember.delete({ where: { id } });
  revalidatePath("/admin/staff");
  revalidatePath("/about");
  revalidatePath("/");
}
