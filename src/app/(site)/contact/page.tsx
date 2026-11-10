import Link from "next/link";
import type { Metadata } from "next";
import { getSettings } from "@/lib/site";
import { submitInquiryAction } from "./actions";
import { ContactForm } from "./contact-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact Us" };

export default async function ContactPage({ searchParams }: { searchParams: { sent?: string } }) {
  const s = await getSettings();
  return (
    <main>
      <div className="ftco-blocks-cover-1">
        <div className="site-section-cover overlay" style={{ backgroundImage: "url('/images/hero_1.jpg')" }}>
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">Contact</span>
                <h1 className="mb-3 font-weight-bold text-teal">Get In Touch</h1>
                <p><Link href="/" className="text-white">Home</Link> <span className="mx-3">/</span> <strong>Contact</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light" id="contact-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-7 text-center mb-5">
              <h2>Get In Touch Using The Contact Form</h2>
              <p>Have a question about admission, fees or school visits? Send us a message and we will get back to you as soon as possible.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mb-5">
              {searchParams.sent === "1" ? (
                <div className="alert alert-success">Thank you! Your message has been received. We will get back to you soon.</div>
              ) : (
                <ContactForm action={submitInquiryAction} />
              )}
            </div>
            <div className="col-lg-4 ml-auto">
              <div className="bg-white p-3 p-md-5">
                <h3 className="text-black mb-4">Contact Info</h3>
                <ul className="list-unstyled footer-link">
                  <li className="d-block mb-3"><span className="d-block text-black">Address:</span><span dangerouslySetInnerHTML={{ __html: (s.address || "Basundhara, Kathmandu, Nepal").replace(/\n/g, "<br>") }} /></li>
                  <li className="d-block mb-3"><span className="d-block text-black">Phone:</span><span><a href={`tel:${(s.phone || "").replace(/\s+/g, "")}`}>{s.phone}</a></span></li>
                  <li className="d-block mb-3"><span className="d-block text-black">Office Hours:</span><span dangerouslySetInnerHTML={{ __html: (s.officeHours || "").replace(/\n/g, "<br>") }} /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {s.mapEmbedUrl && (
        <div className="site-section bg-light pt-0">
          <div className="container">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src={s.mapEmbedUrl} style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"></iframe>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
