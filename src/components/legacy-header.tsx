import Link from "next/link";

type Settings = {
  schoolName?: string;
  address?: string | null;
  officeHours?: string | null;
  phone?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
};

export function LegacyHeader({ settings }: { settings: Settings }) {
  const phone = settings.phone || "+977 984-9254110";
  return (
    <header className="site-navbar site-navbar-target" role="banner">
      <div className="container mb-3">
        <div className="d-flex align-items-center">
          <div className="site-logo mr-auto">
            <Link href="/">SpringGarden<span className="text-primary">.</span></Link>
          </div>
          <div className="site-quick-contact d-none d-lg-flex ml-auto ">
            <div className="d-flex site-info align-items-center mr-5">
              <span className="block-icon mr-3"><span className="icon-map-marker text-yellow"></span></span>
              <span dangerouslySetInnerHTML={{ __html: (settings.address || "Basundhara, Kathmandu, <br> Nepal").replace(/\n/g, "<br>") }} />
            </div>
            <div className="d-flex site-info align-items-center">
              <span className="block-icon mr-3"><span className="icon-clock-o"></span></span>
              <span dangerouslySetInnerHTML={{ __html: (settings.officeHours || "Sunday - Friday 8:00AM - 4:00PM <br> Saturday CLOSED").replace(/\n/g, "<br>") }} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="menu-wrap d-flex align-items-center">
          <nav className="site-navigation text-left mr-auto d-none d-lg-block" role="navigation">
            <ul className="site-menu main-menu js-clone-nav mr-auto ">
              <li><Link href="/" className="nav-link">Home</Link></li>
              <li><Link href="/about" className="nav-link">About</Link></li>
              <li><Link href="/programs" className="nav-link">Programs</Link></li>
              <li><Link href="/gallery" className="nav-link">Gallery</Link></li>
              <li><Link href="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>
          <div className="top-social ml-auto">
            <a href={settings.facebookUrl || "https://www.facebook.com/SpringGKW"} target="_blank" rel="noreferrer"><span className="icon-facebook text-teal"></span></a>
            <a href={settings.tiktokUrl || "https://www.tiktok.com/@springgarden_kidsschool"} target="_blank" rel="noreferrer"><span className="icon-music text-success"></span></a>
            <a href={`tel:${phone.replace(/\s+/g, "")}`}><span className="icon-phone text-yellow"></span></a>
          </div>
        </div>
      </div>
    </header>
  );
}
