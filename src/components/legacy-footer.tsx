import Link from "next/link";

type Settings = {
  schoolName?: string;
  footerAbout?: string | null;
  phone?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
};

export function LegacyFooter({ settings }: { settings: Settings }) {
  const phone = settings.phone || "+977 984-9254110";
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h2 className="footer-heading mb-3">About Us</h2>
            <p className="mb-5">{settings.footerAbout || "Spring Garden Kids World is a caring early-learning school in Basundhara, Kathmandu offering creative education in a loving atmosphere for children from Playgroup to Class 3."}</p>
            <h2 className="footer-heading mb-4">Newsletter</h2>
            <form action="#" className="d-flex subscribe">
              <input type="email" className="form-control mr-3" placeholder="Email" />
              <input type="submit" value="Send" className="btn btn-primary" readOnly />
            </form>
          </div>
          <div className="col-lg-8 ml-auto">
            <div className="row">
              <div className="col-lg-4 ml-auto">
                <h2 className="footer-heading mb-4">Navigation</h2>
                <ul className="list-unstyled">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/programs">Our Programs</Link></li>
                  <li><Link href="/gallery">Gallery</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-lg-4">
                <h2 className="footer-heading mb-4">Follow Us</h2>
                <ul className="list-unstyled">
                  <li><a href={settings.facebookUrl || "https://www.facebook.com/SpringGKW"} target="_blank" rel="noreferrer">Facebook</a></li>
                  <li><a href={settings.tiktokUrl || "https://www.tiktok.com/@springgarden_kidsschool"} target="_blank" rel="noreferrer">TikTok</a></li>
                  <li><a href={`tel:${phone.replace(/\s+/g, "")}`}>Call: {phone}</a></li>
                  <li><Link href="/programs">Programs</Link></li>
                  <li><Link href="/contact">Get Started</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 mt-5 text-center">
          <div className="col-md-12">
            <div className="border-top pt-5">
              <p>Copyright &copy;{new Date().getFullYear()} All rights reserved | {settings.schoolName || "Spring Garden Kids World"}, Basundhara, Kathmandu</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
