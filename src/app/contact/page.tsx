import type { Metadata } from "next";
import { getSettings } from "@/lib/site";
import { submitInquiryAction } from "./actions";
import { ContactForm } from "./contact-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ searchParams }: { searchParams: { sent?: string } }) {
  const s = await getSettings();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-2 text-slate-600">Questions about admission, fees, or school visits? Send us a message.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {searchParams.sent === "1" ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-green-900">Thank you! Your message has been received. We will get back to you soon.</div>
          ) : (
            <ContactForm action={submitInquiryAction} />
          )}
        </div>
        <aside className="rounded-xl border bg-slate-50 p-5 h-fit">
          <h2 className="font-semibold text-slate-900">School info</h2>
          <dl className="mt-3 space-y-3 text-sm">
            <div><dt className="font-medium">Address</dt><dd className="text-slate-700">{s.address}</dd></div>
            <div><dt className="font-medium">Phone</dt><dd><a className="text-teal-700" href={`tel:${(s.phone || "").replace(/\s+/g, "")}`}>{s.phone}</a></dd></div>
            <div><dt className="font-medium">Hours</dt><dd className="text-slate-700">{s.officeHours}</dd></div>
            {s.facebookUrl && <div><dt className="font-medium">Facebook</dt><dd><a className="text-teal-700" href={s.facebookUrl} target="_blank" rel="noreferrer">SpringGKW</a></dd></div>}
          </dl>
        </aside>
      </div>

      {s.mapEmbedUrl && (
        <div className="mt-10 rounded-xl overflow-hidden border">
          <iframe title="Map" src={s.mapEmbedUrl} className="w-full h-80" loading="lazy" />
        </div>
      )}
    </main>
  );
}
