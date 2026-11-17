export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Home Page</h1>
        <p className="mt-1 text-slate-600">Control the content shown on the website home page.</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium text-slate-900">Coming in Step 2</h2>
        <p className="mt-2 text-sm text-slate-600">
          Editable home sections (hero, highlights/intro, stats, calls-to-action and featured content) will be added here.
          For now, home content uses the default site content and values from <strong>Settings</strong> where applicable.
        </p>
      </div>
    </div>
  );
}
