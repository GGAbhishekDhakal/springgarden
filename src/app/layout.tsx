import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spring Garden Kids World",
  description: "A caring early-learning school in Basundhara, Kathmandu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
