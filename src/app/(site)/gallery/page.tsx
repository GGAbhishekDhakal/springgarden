import Link from "next/link";
import { getPublicData, legacyGallery } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function GalleryPage({ searchParams }: { searchParams: { category?: string } }) {
  const { categories, useLegacyGallery } = await getPublicData();
  const active = searchParams.category || "";
  const current = active ? categories.find((c: any) => c.slug === active) : null;
  const dynamicImages = current
    ? current.images
    : categories.flatMap((c: any) => c.images.map((i: any) => ({ ...i, categoryName: c.name })));

  return (
    <main>
      <div className="ftco-blocks-cover-1">
        <div className="site-section-cover overlay" style={{ backgroundImage: "url('/images/hero_1.jpg')" }}>
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-md-5 mt-5 pt-5">
                <span className="text-cursive h5 text-red">Gallery</span>
                <h1 className="mb-3 font-weight-bold text-teal">Gallery Of Kids</h1>
                <p><Link href="/" className="text-white">Home</Link> <span className="mx-3">/</span> <strong>Gallery</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <span className="text-cursive h5 text-red d-block">Our Gallery</span>
              <h2 className="text-black">{useLegacyGallery ? "Moments From Our School" : "Photos by Category"}</h2>
            </div>
          </div>

          {!useLegacyGallery && categories.length > 0 && (
            <div className="row mb-4">
              <div className="col-12 text-center">
                <div className="d-flex flex-wrap justify-content-center" style={{ gap: 8 }}>
                  <Link href="/gallery" className={`btn btn-sm ${!active ? "btn-primary" : "btn-outline-primary"}`}>All</Link>
                  {categories.map((c: any) => (
                    <Link key={c.id} href={`/gallery?category=${c.slug}`} className={`btn btn-sm ${active === c.slug ? "btn-primary" : "btn-outline-primary"}`}>
                      {c.name} ({c.images.length})
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {useLegacyGallery ? (
            <div className="row">
              {legacyGallery.map((img) => (
                <div key={img.id} className="col-md-3 mb-4">
                  <a href={img.url} data-fancybox="gal"><img src={img.url} alt="School gallery" className="img-fluid" /></a>
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {dynamicImages.map((img: any) => (
                <div key={img.id} className="col-md-3 mb-4">
                  <figure className="mb-0">
                    <a href={img.url} data-fancybox="gal"><img src={img.url} alt={img.caption || "School gallery"} className="img-fluid" /></a>
                    {img.caption && <figcaption className="mt-2 text-center small text-muted">{img.caption}</figcaption>}
                  </figure>
                </div>
              ))}
              {dynamicImages.length === 0 && <div className="col-12 text-center text-muted">No photos in this category yet.</div>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
