"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function submitInquiryAction(formData: FormData) {
  const message = String(formData.get("message") || "").trim();
  if (!message) return;
  await prisma.inquiry.create({
    data: {
      firstName: String(formData.get("firstName") || "").trim() || null,
      lastName: String(formData.get("lastName") || "").trim() || null,
      email: String(formData.get("email") || "").trim() || null,
      phone: String(formData.get("phone") || "").trim() || null,
      message,
    },
  });
  redirect("/contact?sent=1");
}
