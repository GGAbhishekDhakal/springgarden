import Link from "next/link";
import type { Metadata } from "next";
import { getPublicData, legacyFeePlans } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Pricing" };

export default async function PricingPage() {
  const { feePlans } = await getPublicData();
  const plans = feePlans.length > 0
    ? feePlans.map((p: any, idx: number) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        features: p.features || [],
        style: idx % 2 === 0 ? "teal" : "danger",
        btn: idx % 2 === 0 ? "btn-teal" : "btn-danger",
      }))
    : legacyFeePlans;

  return (
    <main>
      <div className="ftco-blocks-cover-1">
        <div className="site-section-cover overlay" style={{ backgroundImage: "url('/images/hero_1.jpg')" }}>
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">Pricing</span>
                <h1 className="mb-3 font-weight-bold text-teal">Our Pricing</h1>
                <p><Link href="/" className="text-white">Home</Link> <span className="mx-3">/</span> <strong>Pricing</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <span className="text-cursive h5 text-red d-block">Fee Plan</span>
              <h2 className="text-black">Our Fees</h2>
              <p>Simple and affordable monthly fees with no hidden charges. Please contact the school office for the latest fee structure and admission details.</p>
            </div>
            {plans.map((p: any) => (
              <div key={p.id} className="col-md-4">
                <div className={`pricing ${p.style}`}>
                  <span className="price"><span>{p.price}</span></span>
                  <h3>{p.name}</h3>
                  <ul className={`ul-check list-unstyled ${p.style}`}>
                    {p.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
                  </ul>
                  <p><Link href="/contact" className={`btn ${p.btn} btn-custom-1 mt-4`}>Enquire Now</Link></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="site-section py-5 bg-warning">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 d-flex">
              <h2 className="text-white m-0">Bring Fun Life To Your Kids</h2>
              <Link href="/contact" className="btn btn-primary btn-custom-1 py-3 px-5 ml-auto">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
