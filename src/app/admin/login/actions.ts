"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Email and password are required." };

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return { error: "Invalid email or password." };
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return { error: "Invalid email or password." };

  await createSession(user.id);
  redirect("/admin");
}
