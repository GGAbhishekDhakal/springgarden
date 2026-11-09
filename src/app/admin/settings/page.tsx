import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { defaults } from "@/lib/site";

export const dynamic = "force-dynamic";

async function saveSettings(formData: FormData) {
  "use server";
  const data = {
    schoolName: String(formData.get("schoolName") || defaults.schoolName),
    address: String(formData.get("address") || "") || null,
    phone: String(formData.get("phone") || "") || null,
    email: String(formData.get("email") || "") || null,
    officeHours: String(formData.get("officeHours") || "") || null,
    facebookUrl: String(formData.get("facebookUrl") || "") || null,
    tiktokUrl: String(formData.get("tiktokUrl") || "") || null,
    mapEmbedUrl: String(formData.get("mapEmbedUrl") || "") || null,
    footerAbout: String(formData.get("footerAbout") || "") || null,
    heroTitle: String(formData.get("heroTitle") || "") || null,
    heroSubtitle: String(formData.get("heroSubtitle") || "") || null,
  };
  await prisma.siteSetting.upsert({ where: { id: "default" }, create: { id: "default", ...data }, update: data });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/gallery");
  revalidatePath("/admin/settings");
}

export default async function SettingsAdminPage() {
  const s = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  const v = { ...defaults, ...s };
  const field = (name: string, label: string, value: any, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input name={name} type={type} defaultValue={value || ""} className="mt-1 w-full rounded-md border px-3 py-2" />
    </div>
  );
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
      <p className="mt-1 text-slate-600">Core school information shown across the website.</p>
      <form action={saveSettings} className="mt-6 rounded-xl border bg-white p-5 grid gap-4 sm:grid-cols-2 max-w-4xl">
        {field("schoolName", "School name", v.schoolName)}
        {field("phone", "Phone", v.phone)}
        {field("email", "Email", v.email, "email")}
        {field("officeHours", "Office hours", v.officeHours)}
        <div className="sm:col-span-2">{field("address", "Address", v.address)}</div>
        {field("facebookUrl", "Facebook URL", v.facebookUrl)}
        {field("tiktokUrl", "TikTok URL", v.tiktokUrl)}
        <div className="sm:col-span-2">{field("mapEmbedUrl", "Google Maps embed URL", v.mapEmbedUrl)}</div>
        <div className="sm:col-span-2">{field("heroTitle", "Home hero title", v.heroTitle)}</div>
        <div className="sm:col-span-2"><label className="block text-sm font-medium text-slate-700">Home hero subtitle</label><textarea name="heroSubtitle" rows={2} defaultValue={v.heroSubtitle || ""} className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div className="sm:col-span-2"><label className="block text-sm font-medium text-slate-700">Footer / about text</label><textarea name="footerAbout" rows={4} defaultValue={v.footerAbout || ""} className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div className="sm:col-span-2"><button className="rounded-md bg-teal-700 px-4 py-2 text-white text-sm font-medium hover:bg-teal-800">Save settings</button></div>
      </form>
    </div>
  );
}
