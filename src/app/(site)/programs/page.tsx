import Link from "next/link";
import type { Metadata } from "next";
import { getPublicData } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Our Programs" };

export default async function ProgramsPage() {
  const { programs } = await getPublicData();
  const colors = ["teal", "success", "danger"];
  const btns = ["primary", "warning", "success"];
  const icons = ["/images/flaticon/svg/001-jigsaw.svg", "/images/flaticon/svg/002-target.svg", "/images/flaticon/svg/003-mission.svg"];
  return (
    <main>
      <div className="ftco-blocks-cover-1">
        <div className="site-section-cover overlay" style={{ backgroundImage: "url('/images/hero_1.jpg')" }}>
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">Welcome To Our Website</span>
                <h1 className="mb-3 font-weight-bold text-teal">Our Programs</h1>
                <p><Link href="/" className="text-white">Home</Link> <span className="mx-3">/</span> <strong>Programs</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-info">
        <div className="container">
          <div className="row mb-5"><div className="col-12 text-center"><span className="text-cursive h5 text-red d-block">Programs You Like</span><h2 className="text-white">Our Programs</h2></div></div>
          <div className="row">
            {programs.map((p: any, idx: number) => (
              <div key={p.id} className="col-lg-4 mb-4 mb-lg-0">
                <div className="package text-center bg-white">
                  <span className="img-wrap"><img src={icons[idx % 3]} alt={p.title} className="img-fluid" /></span>
                  <h3 className={`text-${colors[idx % 3]}`}>{p.title}</h3>
                  <p>{p.description}</p>
                  <p><Link href="/contact" className={`btn btn-${btns[idx % 3]} btn-custom-1 mt-4`}>Learn More</Link></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="site-section py-5 bg-warning">
        <div className="container"><div className="row justify-content-center"><div className="col-md-12 d-flex"><h2 className="text-white m-0">Admission Is Now Open</h2><Link href="/contact" className="btn btn-primary btn-custom-1 py-3 px-5 ml-auto">Get Started</Link></div></div></div>
      </div>
    </main>
  );
}
