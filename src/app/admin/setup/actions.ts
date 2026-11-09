"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";

export type SetupState = { error?: string };

export async function setupAction(_prev: SetupState, formData: FormData): Promise<SetupState> {
  const count = await prisma.adminUser.count();
  if (count > 0) return { error: "Admin account already exists. Please sign in." };

  const name = String(formData.get("name") || "").trim() || null;
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || password.length < 8) return { error: "Valid email and a password (8+ characters) are required." };

  const user = await prisma.adminUser.create({
    data: { email, name, passwordHash: await hashPassword(password), role: "admin" },
  });
  await createSession(user.id);
  redirect("/admin");
}
