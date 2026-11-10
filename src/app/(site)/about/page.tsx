import Link from "next/link";
import type { Metadata } from "next";
import { getPublicData } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage() {
  const { settings, staff } = await getPublicData();
  const colors = ["teal", "yellow", "red", "green", "blue", "red"];
  return (
    <main>
      <div className="ftco-blocks-cover-1">
        <div className="site-section-cover overlay" style={{ backgroundImage: "url('/images/hero_1.jpg')" }}>
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">Welcome To Our Website</span>
                <h1 className="mb-3 font-weight-bold text-teal">About Us</h1>
                <p><Link href="/" className="text-white">Home</Link> <span className="mx-3">/</span> <strong>About</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6"><img src="/images/img_1.jpg" alt="About" className="img-fluid" /></div>
            <div className="col-md-5 ml-auto pl-md-5">
              <span className="text-cursive h5 text-red">About Us</span>
              <h3 className="text-black">Bring Fun Life To Your Kids</h3>
              <p><span>{settings.footerAbout}</span></p>
              <p className="mt-5"><Link href="/contact" className="btn btn-warning py-4 btn-custom-1">Book A Visit</Link></p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-teal">
        <div className="container">
          <div className="row justify-content-center text-center mb-5 section-2-title">
            <div className="col-md-6">
              <span className="text-cursive h5 text-red">The Team</span>
              <h3 className="text-white text-center">Meet Our Teachers</h3>
              <p className="mb-5 text-white-50">Our warm and dedicated team makes Spring Garden feel like a second home for your children.</p>
            </div>
          </div>
          <div className="row align-items-stretch">
            {staff.map((s: any, idx: number) => (
              <div key={s.id} className="col-lg-4 col-md-6 mb-5">
                <div className={`post-entry-1 h-100 person-1 ${colors[idx % colors.length]}`}>
                  <img src={s.photoUrl || "/images/person_1.jpg"} alt={s.name} className="img-fluid" />
                  <div className="post-entry-1-contents">
                    <span className="meta">{s.role}</span>
                    <h2>{s.name}</h2>
                    <p>{s.bio || ""}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
