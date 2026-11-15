import Script from "next/script";
import { getSettings } from "@/lib/site";
import { LegacyHeader } from "@/components/legacy-header";
import { LegacyFooter } from "@/components/legacy-footer";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=DM+Sans:300,400,700|Indie+Flower" rel="stylesheet" />
      <link rel="stylesheet" href="/fonts/icomoon/style.css" />
      <link rel="stylesheet" href="/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
      <link rel="stylesheet" href="/css/jquery.fancybox.min.css" />
      <link rel="stylesheet" href="/css/owl.carousel.min.css" />
      <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
      <link rel="stylesheet" href="/fonts/flaticon/font/flaticon.css" />
      <link rel="stylesheet" href="/css/aos.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <div className="site-wrap" id="home-section">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>
        <LegacyHeader settings={settings} />
        {children}
        <LegacyFooter settings={settings} />
      </div>
      <Script src="/js/jquery-3.3.1.min.js" strategy="beforeInteractive" />
      <Script src="/js/jquery-migrate-3.0.0.js" strategy="beforeInteractive" />
      <Script src="/js/popper.min.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.sticky.js" strategy="afterInteractive" />
      <Script src="/js/jquery.waypoints.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.animateNumber.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.fancybox.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.stellar.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.easing.1.3.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap-datepicker.min.js" strategy="afterInteractive" />
      <Script src="/js/aos.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
