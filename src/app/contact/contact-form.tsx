"use client";

import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="rounded-md bg-teal-700 px-5 py-2.5 text-white font-medium hover:bg-teal-800 disabled:opacity-60">{pending ? "Sending..." : "Send message"}</button>;
}

export function ContactForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action} className="rounded-xl border bg-white p-5 grid gap-4 sm:grid-cols-2">
      <div><label className="block text-sm font-medium">First name</label><input name="firstName" className="mt-1 w-full rounded-md border px-3 py-2" /></div>
      <div><label className="block text-sm font-medium">Last name</label><input name="lastName" className="mt-1 w-full rounded-md border px-3 py-2" /></div>
      <div><label className="block text-sm font-medium">Email</label><input name="email" type="email" className="mt-1 w-full rounded-md border px-3 py-2" /></div>
      <div><label className="block text-sm font-medium">Phone</label><input name="phone" type="tel" className="mt-1 w-full rounded-md border px-3 py-2" /></div>
      <div className="sm:col-span-2"><label className="block text-sm font-medium">Message *</label><textarea name="message" required rows={5} className="mt-1 w-full rounded-md border px-3 py-2" /></div>
      <div className="sm:col-span-2"><Submit /></div>
    </form>
  );
}
