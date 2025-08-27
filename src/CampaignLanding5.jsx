import { useState } from "react";
import { Button } from "./components/ui/button";
// Optional analytics hook — remove import + track calls if you don’t use it.
import { useAnalytics } from "./useAnalytics";

export default function CampaignLanding5() {
  const { track = () => {} } = useAnalytics ? useAnalytics("CampaignLanding5") : { track: () => {} };

  // ---------- CONFIG ----------
  const BRAND_ORANGE = "#F47534";
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/YOUR_UNIQUE_WEBHOOK";

  // Swap these video URLs with your real embeds
  const PANELS = {
    caregiver: {
      icon: "🏠",
      label: "Caregiver",
      title: "SingFit STUDIO Caregiver",
      desc: "For individuals supporting loved ones at home.",
      bullets: [
        "Guided, step-by-step sessions",
        "Lyrics on screen with voice coaching",
        "Track mood and engagement over time",
      ],
      video: "https://www.youtube.com/embed/stknfT1FagU?start=60",
      cta: { type: "link", label: "Go to Caregiver App", url: "https://www.singfit.com/studiocaregiver" },
    },
    therapist: {
      icon: "🩺",
      label: "Therapist",
      title: "SingFit STUDIO PRO",
      desc: "For individual therapists and clinical use.",
      bullets: [
        "Tools for 1:1 and small groups",
        "Clinical documentation support",
        "Flexible session building",
      ],
      video: "https://www.youtube.com/embed/stknfT1FagU?start=120",
      cta: { type: "link", label: "For Therapists", url: "https://www.singfit.com/studiopro" },
    },
    senior: {
      icon: "🏢",
      label: "Senior Living",
      title: "SingFit PRIME",
      desc: "Group-based programming for senior living communities.",
      bullets: [
        "Turnkey, staff-friendly group sessions",
        "Evidence-based, created by board-certified music therapists",
        "Training and implementation support",
      ],
      video: "https://www.youtube.com/embed/stknfT1FagU?start=180",
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
    },
    homehealth: {
      icon: "🏥",
      label: "Home Health/Care",
      title: "Home Health/Care",
      desc: "Tailored implementations for home health and in-home care.",
      bullets: [
        "Deployable across distributed teams",
        "Clinical and family-facing options",
        "Program design and onboarding",
      ],
      video: "https://www.youtube.com/embed/stknfT1FagU?start=240",
      cta: { type: "form", label: "Discuss Home Health", formType: "Home Health/Care" },
    },
  };

  const ORDER = ["caregiver", "therapist", "senior", "homehealth"];
  // ---------- END CONFIG ----------

  const [activeKey, setActiveKey] = useState("caregiver");
  const active = PANELS[activeKey];

  const onSelect = (key) => {
    setActiveKey(key);
    track("sleeve_select", { key });
    // scroll the detail panel into view on mobile
    document.getElementById("detail-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const InlineForm = ({ formType }) => (
    <form
      className="mt-4 flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value.trim();
        const name = e.currentTarget.name?.value?.trim() || "";
        const company = e.currentTarget.company?.value?.trim() || "";
        track("submit_form", { form_id: "campaign_inline", formType, email });

        try {
          await fetch(MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name, company, formType }),
          });
        } catch { /* no-op */ }

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
      <p className="text-xs text-gray-500 mt-1">
        We’ll reach out with next steps for {formType}.
      </p>
    </form>
  );

  return (
    <div className="bg-white min-h-screen px-6 py-8 max-w-6xl mx-auto font-sans text-gray-900">
      {/* HERO (reuse your CampaignLanding2 hero styling) */}
      <section className="bg-[#0091c8] rounded-2xl shadow-xl border border-gray-200 px-6 pt-6 pb-10 relative overflow-hidden mb-8">
        <div className="max-w-3xl mx-auto text-center mt-6 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.5] mb-2">
            <span className="block mb-3">Discover the Power of Music</span>
            <span className="inline-flex items-center justify-center gap-2">
              <span>with</span>
              <a href="https://www.singfit.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img
                  src="/White no smile.png"
                  alt="SingFit"
                  className="h-10 md:h-12 relative top-[2.8px] hover:opacity-80 transition-opacity duration-200"
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
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          Which Product is the Right <span className="text-[#F47534]">FIT</span> for you?
        </h2>
      </div>

      {/* LAYERED SLEEVES GRID */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ORDER.map((key) => {
            const p = PANELS[key];
            const active = key === activeKey;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                aria-pressed={active}
                className={`group relative w-full h-44 rounded-2xl text-left transition
                  focus:outline-none focus:ring-2 focus:ring-[#F47534]
                  ${active ? "ring-2 ring-[#F47534]" : ""}`}
              >
                {/* sleeve layers (behind) */}
                <span className="pointer-events-none absolute inset-0 -rotate-2 translate-x-1 translate-y-1 rounded-2xl bg-white border border-gray-200 shadow-sm" />
                <span className="pointer-events-none absolute inset-0 rotate-1 -translate-x-1 -translate-y-0.5 rounded-2xl bg-white border border-gray-200 shadow-sm" />
                {/* vinyl peeking out */}
                
                {/* content layer */}
                <span
                  className={`relative z-10 block h-full rounded-2xl border bg-[#F7F9FA] transition
                    ${active ? "border-[#F47534]" : "border-gray-200 group-hover:border-gray-300"}
                    group-hover:-translate-y-0.5 group-hover:shadow`}
                >
                  <div className="p-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-2xl leading-none">{p.icon}</div>
                      <div className="mt-2 font-bold text-sm text-[#002F6C]">{p.label}</div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-2">{p.desc}</div>
                    </div>
                    <div className="text-[11px] font-medium mt-3 text-[#F47534]">
                      {active ? "Selected" : "Select"}
                    </div>
                  </div>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* DETAIL PANEL */}
      <section id="detail-panel" className="rounded-2xl shadow-xl border border-gray-200 overflow-hidden bg-gradient-to-br from-[#EEF6FA] via-white to-[#FAF6F2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* LEFT: VIDEO (left-justified; minimal padding) */}
          <div className="p-5 md:p-7">
            <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow ring-1 ring-black/5">
              <iframe
                key={activeKey} // force re-mount when active changes
                className="w-full h-[260px] md:h-[380px]"
                src={active.video}
                title={`${active.title} video`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-2">Video is illustrative; content may vary by product.</p>
          </div>

          {/* RIGHT: COPY + CTA / FORM */}
          <div className="p-5 md:p-7 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white/70 backdrop-blur">
            <h3 className="text-2xl font-bold" style={{ color: BRAND_ORANGE }}>{active.title}</h3>
            <p className="mt-2 text-gray-800">{active.desc}</p>
            {active.bullets?.length ? (
              <ul className="mt-4 list-disc pl-5 text-sm text-gray-800 space-y-1">
                {active.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            ) : null}

            {active.cta?.type === "link" ? (
              <div className="mt-6">
                <Button
                  onClick={() => {
                    track("click_cta", { button_text: active.cta.label, destination_url: active.cta.url, page_id: "CampaignLanding5" });
                    window.open(active.cta.url, "_blank");
                  }}
                  className="text-sm px-5 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
                >
                  {active.cta.label}
                </Button>
              </div>
            ) : (
              <div className="mt-6">
                <div className="text-sm text-gray-700 mb-2">Enter your details and our team will reach out.</div>
                <InlineForm formType={active.cta.formType} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 border-t border-gray-200 pt-6 mt-8 px-4">
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
