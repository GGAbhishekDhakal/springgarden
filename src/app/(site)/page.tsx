import Link from "next/link";
import { getPublicData, legacyGallery } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { settings, categories, staff, programs, testimonials, useLegacyGallery } = await getPublicData();
  const galleryPreview = useLegacyGallery
    ? legacyGallery.slice(0, 4)
    : categories.flatMap((c: any) => c.images.map((i: any) => ({ ...i, categoryName: c.name }))).slice(0, 4);

  return (
    <main>
      <div className="ftco-blocks-cover-1">
        <div className="site-section-cover overlay">
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">Welcome To Our Website</span>
                <h1 className="mb-3 font-weight-bold text-teal">{settings.heroTitle || "Bring Fun Life To Your Kids"}</h1>
                <p>{settings.heroSubtitle || "A caring early-learning school in Basundhara, Kathmandu — from Playgroup to Class 3."}</p>
                <p className="mt-5"><Link href="/about" className="btn btn-primary py-4 btn-custom-1">Learn More</Link></p>
              </div>
              <div className="col-md-6 ml-auto align-self-end">
                <img src={settings.heroImageUrl || "/images/kid_transparent.png"} alt="Kids" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4"><div className="block-2 red"><span className="wrap-icon"><span className="icon-home"></span></span><h2>Play &amp; Learn</h2><p>Puzzles, building blocks and hands-on activities that spark curiosity in a safe and loving classroom.</p></div></div>
            <div className="col-lg-4"><div className="block-2 yellow"><span className="wrap-icon"><span className="icon-person"></span></span><h2>Outdoor Activities</h2><p>Daily playtime, sports and seasonal events that keep little bodies active, healthy and happy.</p></div></div>
            <div className="col-lg-4"><div className="block-2 teal"><span className="wrap-icon"><span className="icon-cog"></span></span><h2>Creative Classes</h2><p>Art, music, dance and storytelling sessions that help every child explore their own talents.</p></div></div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0"><img src="/images/img_1.jpg" alt="School" className="img-fluid" /></div>
            <div className="col-md-5 ml-auto pl-md-5">
              <span className="text-cursive h5 text-red">About Us</span>
              <h3 className="text-black">Bring Fun Life To Your Kids</h3>
              <p><span>{settings.footerAbout}</span></p>
              <p className="mt-5"><Link href="/about" className="btn btn-warning py-4 btn-custom-1">More About Us</Link></p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-info">
        <div className="container">
          <div className="row mb-5"><div className="col-12 text-center"><span className="text-cursive h5 text-red d-block">Programs You Like</span><h2 className="text-white">Our Programs</h2></div></div>
          <div className="row">
            {programs.slice(0, 3).map((p: any, idx: number) => {
              const colors = ["teal", "success", "danger"]; const btns = ["primary", "warning", "success"]; const icons = ["/images/flaticon/svg/001-jigsaw.svg", "/images/flaticon/svg/002-target.svg", "/images/flaticon/svg/003-mission.svg"];
              return (
                <div key={p.id} className="col-lg-4 mb-4 mb-lg-0">
                  <div className="package text-center bg-white">
                    <span className="img-wrap"><img src={icons[idx % 3]} alt={p.title} className="img-fluid" /></span>
                    <h3 className={`text-${colors[idx % 3]}`}>{p.title}</h3>
                    <p>{p.description}</p>
                    <p><Link href="/programs" className={`btn btn-${btns[idx % 3]} btn-custom-1 mt-4`}>Learn More</Link></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row mb-5"><div className="col-12 text-center"><span className="text-cursive h5 text-red d-block">Our Gallery</span><h2 className="text-black">Moments From Our School</h2></div></div>
          <div className="row">
            {galleryPreview.map((img: any) => (
              <div key={img.id} className="col-md-3 mb-4"><img src={img.url} alt={img.caption || "Gallery"} className="img-fluid" /></div>
            ))}
          </div>
          <div className="text-center"><Link href="/gallery" className="btn btn-primary btn-custom-1 mt-2">View Gallery</Link></div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row mb-5"><div className="col-12 text-center"><span className="text-cursive h5 text-red d-block">Testimonial</span><h2 className="text-black">What Our Parents Say About Us</h2></div></div>
          <div className="row justify-content-center">
            {testimonials.slice(0, 3).map((t: any) => (
              <div key={t.id} className="col-md-4 mb-4">
                <div className="testimonial-3 d-flex">
                  <div className="vcard-wrap mr-4"><img src={t.photoUrl || "/images/person_1.jpg"} alt={t.name} className="vcard img-fluid" /></div>
                  <div className="text"><h3>{t.name}</h3><p className="position">{t.location}</p><p>{t.quote}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-md-8">
              <div className="row">
                <div className="col-lg-3 text-center"><span className="text-teal h2 d-block">120+</span><span>Happy Students</span></div>
                <div className="col-lg-3 text-center"><span className="text-yellow h2 d-block">95+</span><span>Happy Parents</span></div>
                <div className="col-lg-3 text-center"><span className="text-success h2 d-block">12+</span><span>Teachers</span></div>
                <div className="col-lg-3 text-center"><span className="text-danger h2 d-block">40+</span><span>School Events</span></div>
              </div>
            </div>
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
