import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function cloudinaryConfigured() {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export async function uploadImage(file: File, folder = "general") {
  if (!cloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured. Set CLOUDINARY_* env vars.");
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base = `data:${file.type};base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base, {
    folder: `${process.env.CLOUDINARY_FOLDER || "springgarden"}/${folder}`,
    resource_type: "image",
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteImage(publicId: string) {
  if (!cloudinaryConfigured() || !publicId) return;
  await cloudinary.uploader.destroy(publicId);
}
