import { useState, useEffect, useRef } from "react";
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
      video: "https://player.vimeo.com/video/736275780?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta:[

       { type: "link", label: "Learn More", url: "https://www.singfit.com/studiocaregiver" },
       { type: "link", label: "Buy Now", url: "https://www.singfit.com/caregiver-pricing" }
      ],
    },
    therapist: {
      icon: "🩺",
      label: "Rehab Therapy",
      title: "SingFit STUDIO PRO",
      desc: "For individual therapists and clinical use.",
      bullets: [
        "Tools for 1:1 and small groups",
        "Clinical documentation support",
        "Flexible session building",
      ],
      video: "https://player.vimeo.com/video/1089881903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
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
      video: "https://www.youtube.com/embed/7a2YFIkNbrM?si=5nrz4ZWD6m8YrMWe",
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
      video: "https://player.vimeo.com/video/1089881903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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

  const InlineForm = ({ formType }) => {
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="mt-4 flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value.trim();
        const name = e.currentTarget.name?.value?.trim() || "";

        // basic guard
        if (!email) {
          setStatus({ type: "error", message: "Please enter a valid email." });
          return;
        }

        setSubmitting(true);
        setStatus({ type: null, message: "" });

        // track
        track("submit_form", { form_id: "campaign_inline", formType, email });

        try {
          const res = await fetch(MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name, formType }),
          });

          if (res.ok) {
            setStatus({
              type: "success",
              message: "Thanks! We’ll be in touch shortly.",
            });
            e.currentTarget.reset();
          } else {
            setStatus({
              type: "error",
              message: "There was a problem. Please try again.",
            });
          }
        } catch {
          setStatus({
            type: "error",
            message: "Network error. Please try again.",
          });
        } finally {
          setSubmitting(false);
          // auto-clear after a few seconds
          setTimeout(() => setStatus({ type: null, message: "" }), 6000);
        }
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Your name (optional)"
        className="px-3 py-2 rounded-md border border-gray-300 text-base w-full focus:ring-2 focus:ring-[#F47534]"
        disabled={submitting}
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Email (required)"
          className="px-3 py-2 rounded-md border border-gray-300 text-base w-full focus:ring-2 focus:ring-[#F47534]"
          disabled={submitting}
        />
        <Button
          type="submit"
          disabled={submitting}
          className={`text-base px-5 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow ${
            submitting ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Submitting…" : "Submit"}
        </Button>
      </div>

      {/* Accessible status message */}
      {status.message ? (
        <div
          role="status"
          aria-live="polite"
          className={`text-sm mt-2 ${
            status.type === "success" ? "text-green-700" : "text-red-600"
          }`}
        >
          {status.message}
        </div>
      ) : null}

          </form>
  );
};
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
          Find the Right <span className="text-[#F47534]">FIT</span> for You
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
  className={`w-full h-44 rounded-2xl text-center transition
    focus:outline-none focus:ring-2 focus:ring-[#F47534]
    ${active
      ? "bg-[#FFF5F0] border-2 border-[#F47534] shadow-md"
      : "bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F47534]/50 hover:bg-gradient-to-br hover:from-[#FEF8F5] hover:to-white"
    }
  `}
>
  <div className="p-5 h-full flex flex-col items-center justify-center">
    <div className="text-3xl leading-none">{p.icon}</div>
    <div
      className={`mt-2 font-bold text-base md:text-lg ${
        active ? "text-[#F47534]" : "text-[#002F6C]"
      }`}
    >
      {p.label}
    </div>
    <div
      className={`text-sm md:text-base mt-1 line-clamp-2 ${
        active ? "text-gray-700" : "text-gray-600"
      }`}
    >
      {p.desc}
    </div>
  </div>
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
           
          </div>

          {/* RIGHT: COPY + CTA / FORM */}
          <div className="p-5 md:p-7 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white/70 backdrop-blur">
            <h3 className="text-3xl font-bold" style={{ color: BRAND_ORANGE }}>
  {active.title}
</h3>
<p className="mt-3 text-lg text-gray-800">{active.desc}</p>
{active.bullets?.length ? (
  <ul className="mt-5 list-disc pl-6 text-base text-gray-800 space-y-2">
    {active.bullets.map((b, idx) => (
      <li key={idx}>{b}</li>
    ))}
  </ul>
) : null}


           {Array.isArray(active.cta) ? (
  <div className="mt-6 flex flex-wrap gap-3">
    {active.cta.map((cta, idx) => (
      <Button
        key={idx}
        onClick={() => {
          track("click_cta", {
            button_text: cta.label,
            destination_url: cta.url,
            page_id: "CampaignLanding5",
          });
          window.open(cta.url, "_blank");
        }}
        className="text-sm px-5 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
      >
        {cta.label}
      </Button>
    ))}
  </div>
) : active.cta?.type === "link" ? (
  <div className="mt-6">
    <Button
      onClick={() => {
        track("click_cta", {
          button_text: active.cta.label,
          destination_url: active.cta.url,
          page_id: "CampaignLanding5",
        });
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

{/* Subtle Contact Prompt */}
<div className="mt-8 text-center text-sm text-gray-600">
  <p>
    Didn’t find what you’re looking for?{" "}
    <a
      href="https://www.singfit.com/contact"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#F47534] font-medium hover:underline"
    >
      Contact us
    </a>{" "}
    and we’ll help you find the right fit.
  </p>
</div>

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
