import { useState } from "react";
import { Button } from "./components/ui/button";
// If you don’t use this hook, remove the import + track lines below.
import { useAnalytics } from "./useAnalytics";

export default function CampaignLanding4() {
  const { track = () => {} } = useAnalytics ? useAnalytics("CampaignLanding4") : { track: () => {} };

  // ---------- CONFIG ----------
  const BRAND_ORANGE = "#F47534";
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/YOUR_UNIQUE_WEBHOOK";

  // Use different start times so it's obvious the video swapped.
  const YT = "https://www.youtube.com/embed/stknfT1FagU";
  const panels = {
    caregiver: {
      tabLabel: "Caregiver",
      title: "SingFit STUDIO Caregiver",
      desc: "For individuals supporting loved ones at home.",
      bullets: [
        "Guided, step-by-step sessions",
        "Lyrics on screen with voice coaching",
        "Track mood and engagement over time",
      ],
      video: `${YT}?start=60`,
      cta: { type: "link", label: "Go to Caregiver App", url: "https://www.singfit.com/studiocaregiver" },
    },
    therapist: {
      tabLabel: "Therapist",
      title: "SingFit STUDIO PRO",
      desc: "For individual therapists and clinical use.",
      bullets: [
        "Tools for 1:1 and small groups",
        "Clinical documentation support",
        "Flexible session building",
      ],
      video: `${YT}?start=120`,
      cta: { type: "link", label: "For Therapists", url: "https://www.singfit.com/studiopro" },
    },
    senior: {
      tabLabel: "Senior Living",
      title: "SingFit PRIME",
      desc: "Group-based programming for senior living communities.",
      bullets: [
        "Turnkey, staff-friendly group sessions",
        "Evidence-based, created by board-certified music therapists",
        "Training and implementation support",
      ],
      video: `${YT}?start=180`,
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
    },
    homehealth: {
      tabLabel: "Home Health/Care",
      title: "Home Health/Care",
      desc: "Tailored implementations for home health and in-home care.",
      bullets: [
        "Deployable across distributed teams",
        "Clinical and family-facing options",
        "Program design and onboarding",
      ],
      video: `${YT}?start=240`,
      cta: { type: "form", label: "Discuss Home Health", formType: "Home Health/Care" },
    },
  };

  const tabs = [
    { key: "caregiver" },
    { key: "therapist" },
    { key: "senior" },
    { key: "homehealth" },
  ];
  // ---------- END CONFIG ----------

  const [activeKey, setActiveKey] = useState("caregiver");
  const p = panels[activeKey];

  const onTabClick = (key) => {
    setActiveKey(key);
    track("tab_change", { tab: key });
  };

  const InlineForm = ({ formType }) => (
    <form
      className="mt-4 flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value.trim();
        const name = e.currentTarget.name?.value?.trim() || "";
        const company = e.currentTarget.company?.value?.trim() || "";

        track("submit_form", { form_id: "campaign_interest_inline", formType, email });

        try {
          await fetch(MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name, company, formType }),
          });
        } catch {
          /* no-op */
        }

        e.currentTarget.reset();
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Your name (optional)"
        className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full focus:ring-2 focus:ring-[#F47534]"
      />
      <input
        type="text"
        name="company"
        placeholder="Organization (optional)"
        className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full focus:ring-2 focus:ring-[#F47534]"
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Email (required)"
          className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full focus:ring-2 focus:ring-[#F47534]"
        />
        <Button type="submit" className="text-sm px-4 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow">
          Submit
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-1">We’ll reach out with next steps for {formType}.</p>
    </form>
  );

  return (
    <div className="bg-white min-h-screen px-6 py-8 max-w-5xl mx-auto font-sans text-gray-900">
      {/* HERO (unchanged) */}
      <section className="bg-[#0091c8] rounded-2xl shadow-xl border border-gray-200 px-6 pt-6 pb-10 relative overflow-hidden mb-8">
        <div className="max-w-3xl mx-auto text-center mt-6 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.5] mb-2 text-center">
            <span className="block mb-3">Discover the Power of Music</span>
            <span className="inline-flex items-center justify-center gap-2">
              <span>with</span>
              <a href="https://www.singfit.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img
                  src="/White no smile.png"
                  alt="SingFit"
                  className="h-10 md:h-12 relative top-[2.8px] cursor-pointer hover:opacity-80 transition-opacity duration-200"
                />
              </a>
            </span>
          </h1>
          <p className="text-lg text-white font-medium">
            A digital therapeutic platform built to support wellness through song — at home, in therapy, and in senior living.
          </p>
        </div>
      </section>

      {/* Header above content */}
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          Which Product is the Right <span className="text-[#F47534]">FIT</span> for you?
        </h2>
      </div>

      {/* FULL-WIDTH TABS */}
      <div className="w-full">
        <div className="rounded-t-xl bg-[#F7F9FA] border border-gray-200 p-2 md:p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {tabs.map(({ key }) => {
              const active = activeKey === key;
              return (
                <button
                  key={key}
                  onClick={() => onTabClick(key)}
                  className={`w-full px-4 py-2 rounded-full text-sm font-semibold transition 
                    ${active ? "bg-[#F47534] text-white" : "bg-white text-[#243B53] border border-gray-300 hover:bg-gray-100"}`}
                  aria-pressed={active}
                >
                  {panels[key].tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* FULL-WIDTH CONTENT (TEXT LEFT + VIDEO LEFT) */}
        <div className="w-full bg-[#FAF6F2] rounded-b-xl shadow border border-t-0 border-gray-200 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* LEFT: TEXT + CTA/FORM */}
            <div>
              <h3 className="text-2xl font-bold text-[#F47534]">{p.title}</h3>
              <p className="mt-2 text-gray-800">{p.desc}</p>
              {p.bullets?.length ? (
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-800 space-y-1">
                  {p.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              ) : null}

              {/* CTA or Inline Form */}
              {p.cta?.type === "link" ? (
                <div className="mt-5">
                  <Button
                    onClick={() => {
                      track("click_cta", {
                        button_text: p.cta.label,
                        destination_url: p.cta.url,
                        page_id: "CampaignLanding4",
                      });
                      window.open(p.cta.url, "_blank");
                    }}
                    className="text-sm px-5 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
                  >
                    {p.cta.label}
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="text-sm text-gray-700 mb-2">Enter your details and our team will reach out.</div>
                  <InlineForm formType={p.cta.formType} />
                </div>
              )}
            </div>

            {/* RIGHT: VIDEO (force re-mount on tab change) */}
            <div>
              <div className="relative w-full max-w-xl rounded-xl overflow-hidden shadow">
                <iframe
                  key={activeKey} // ← forces a fresh mount so the video updates reliably
                  className="w-full h-[240px] md:h-[360px]"
                  src={p.video}
                  title={`${p.title} video`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 border-t border-gray-200 pt-6 mt-6 px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
          <span>©2025 Musical Health Technologies. All Rights Reserved.</span>
          <span>1010 Wilshire Blvd. Los Angeles, CA 90017</span>
          <a
            href="https://www.singfit.com/privacypolicy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
