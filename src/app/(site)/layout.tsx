import { getSettings } from "@/lib/site";
import { LegacyHeader } from "@/components/legacy-header";
import { LegacyFooter } from "@/components/legacy-footer";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <link rel="stylesheet" href="/fonts/icomoon/style.css" />
      <link rel="stylesheet" href="/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/css/jquery.fancybox.min.css" />
      <link rel="stylesheet" href="/css/owl.carousel.min.css" />
      <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
      <link rel="stylesheet" href="/fonts/flaticon/font/flaticon.css" />
      <link rel="stylesheet" href="/css/aos.css" />
      <link rel="stylesheet" href="/css/style.css" />
      <div className="site-wrap" id="home-section">
        <LegacyHeader settings={settings} />
        {children}
        <LegacyFooter settings={settings} />
      </div>
    </>
  );
}
