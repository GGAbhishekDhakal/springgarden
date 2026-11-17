import { redirect } from "next/navigation";

export default function FeesRedirectPage() {
  redirect("/admin/pricing");
}
