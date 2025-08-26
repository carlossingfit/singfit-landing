import { useState } from "react";
import { Button } from "./components/ui/button";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
// If you don’t use this hook, remove the import + track calls:
import { useAnalytics } from "./useAnalytics";

export default function CampaignLanding() {
  const { track = () => {} } = useAnalytics ? useAnalytics("CampaignLanding") : { track: () => {} };

  // UI steps: 0 = default (carousel + selectors), 1 = form, 2 = thank-you
  const [uiState, setUiState] = useState({ step: 0, formType: null });

  // ---------- EDITABLE CONFIG ----------
  const YT_EMBED = "https://www.youtube.com/embed/stknfT1FagU?start=96"; // placeholder
  const slides = [
    { title: "SingFit PRIME", desc: "Group-based programming for senior living communities.", video: YT_EMBED },
    { title: "SingFit STUDIO Caregiver", desc: "For individuals supporting loved ones at home.", video: YT_EMBED },
    { title: "SingFit STUDIO PRO", desc: "For individual therapists and clinical use.", video: YT_EMBED },
    { title: "Home Health/Care", desc: "Tailored implementations for home health and in-home care.", video: YT_EMBED },
  ];

  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/YOUR_UNIQUE_WEBHOOK";
  const BRAND_ORANGE = "#F47534";
  // ---------- END CONFIG ----------

  const openForm = (formType) => {
    track("open_form", { formType });
    setUiState({ step: 1, formType });
  };

  const handleSegmentClick = (segment) => {
    track("select_segment", { segment });
    if (segment === "Caregiver") {
      window.open("https://www.singfit.com/studiocaregiver", "_blank");
    } else if (segment === "Therapist") {
      window.open("https://www.singfit.com/studiopro", "_blank");
    } else if (segment === "Senior Living") {
      openForm("Senior Living");
    } else if (segment === "Home Health/Care") {
      openForm("Home Health/Care");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const name = e.target.name?.value?.trim() || "";
    const company = e.target.company?.value?.trim() || "";
    const formType = uiState.formType;

    track("submit_form", { form_id: "campaign_interest", formType, email });

    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, formType }),
      });
    } catch (_) {
      // no-op
    }

    setUiState({ step: 2, formType: null });
  };

  // VIDEO CAROUSEL
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: false,
      slideChanged(s) {
        const idx = s.track.details.rel;
        setCurrentSlide(idx);
        track("video_slide_change", { slide_index: idx, slide_title: slides[idx]?.title });
      },
      slides: { perView: 1, spacing: 8 },
    },
    []
  );
  const goPrev = () => instanceRef.current?.prev();
  const goNext = () => instanceRef.current?.next();

  const formCopy = {
    "Senior Living": {
      title: "Let’s Connect (Senior Living)",
      desc: "Enter your details and our team will reach out with pricing and program details for SingFit PRIME.",
    },
    "Home Health/Care": {
      title: "Let’s Connect (Home Health/Care)",
      desc: "Enter your details and our team will share options tailored to home health and in-home care programs.",
    },
  };

  return (
    <div className="bg-white min-h-screen px-6 py-8 max-w-5xl mx-auto font-sans text-gray-900">
      {/* HERO */}
      <section className="bg-[#E6F0F7] rounded-2xl shadow-xl border border-gray-200 px-6 py-7 relative overflow-hidden mb-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002F6C] leading-tight mb-2">
            Discover the Power of Music with SingFit
          </h1>
          <p className="text-base sm:text-lg text-[#243B53] font-medium">
            A digital therapeutic platform to support wellness through song — at home, in therapy, and in senior living.
          </p>
        </div>
      </section>

      {/* STEP 0: CAROUSEL (selector buttons live BELOW per your request) */}
      {uiState.step === 0 && (
        <>
          {/* VIDEO CAROUSEL — tighter container, less empty space */}
    <section className="mb-3">
  <div className="bg-[#FAF6F2] rounded-lg shadow border border-gray-200
                  max-w-[500px] mx-auto px-2 py-2">   {/* <- narrower + less padding */}
    {/* existing slider + controls stay the same */}
    <div ref={sliderRef} className="keen-slider">
      {slides.map((s, i) => (
        <div key={i} className="keen-slider__slide p-2">
          <div className="grid grid-cols-1 gap-2 items-start">
            <div className="text-center px-2">
              <h3 className="text-lg md:text-xl font-semibold text-[#F47534] mb-1">{s.title}</h3>
              <p className="text-sm text-gray-700">{s.desc}</p>
            </div>

                      {/* Smaller player, minimal padding; keep 16:9 */}
                      <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-sm">
  <iframe
    className="w-full h-[240px] md:h-[320px] rounded-md"
    src={s.video}
    title={s.title}
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-presentation"
  />
</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls + Progress Dots (active = brand orange) */}
              <div className="flex items-center justify-between mt-3 px-1">
                <Button variant="outline" onClick={goPrev} className="border-[#002F6C] text-[#002F6C]">
                  Previous
                </Button>

                <div className="flex gap-2">
                  {slides.map((_, idx) => {
                    const active = idx === currentSlide;
                    return (
                      <button
                        key={idx}
                        aria-label={`Go to slide ${idx + 1}`}
                        onClick={() => instanceRef.current?.moveToIdx(idx)}
                        className={`rounded-full transition`}
                        style={{
                          width: active ? 12 : 10,
                          height: active ? 12 : 10,
                          backgroundColor: active ? BRAND_ORANGE : "#D1D5DB", // gray-300
                          boxShadow: active ? `0 0 0 2px ${BRAND_ORANGE}22` : "none", // subtle halo when active
                        }}
                      />
                    );
                  })}
                </div>

                <Button variant="outline" onClick={goNext} className="border-[#002F6C] text-[#002F6C]">
                  Next
                </Button>
              </div>
            </div>
          </section>

          {/* SELECTOR BUTTONS — restored to BELOW the carousel */}
          <section className="text-center mt-2 mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-[#002F6C]">
              Let’s Get You to the Right Product
            </h2>
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-4">
              {[
                {
                  label: "I'm a Caregiver",
                  segment: "Caregiver",
                  icon: "🏠",
                  bg: "bg-[#FEF8F5]",
                  text: "text-[#F47534]",
                  border: "border-[#F47534]",
                  hover: "hover:bg-[#fff3eb]",
                },
                {
                  label: "I'm a Therapist",
                  segment: "Therapist",
                  icon: "🩺",
                  bg: "bg-[#EEF6FA]",
                  text: "text-[#002F6C]",
                  border: "border-[#002F6C]",
                  hover: "hover:bg-[#e3eff8]",
                },
                {
                  label: "Senior Living Community",
                  segment: "Senior Living",
                  icon: "🏢",
                  bg: "bg-[#F7F9FA]",
                  text: "text-[#243B53]",
                  border: "border-[#243B53]",
                  hover: "hover:bg-[#edf1f4]",
                },
                {
                  label: "Home Health/Care",
                  segment: "Home Health/Care",
                  icon: "🏥",
                  bg: "bg-[#F7FFF9]",
                  text: "text-[#0E7A4A]",
                  border: "border-[#0E7A4A]",
                  hover: "hover:bg-[#ecfff2]",
                },
              ].map(({ label, segment, icon, bg, text, border, hover }) => (
                <button
                  key={segment}
                  onClick={() => handleSegmentClick(segment)}
                  className={`flex flex-col items-center justify-center ${bg} ${text} ${border} ${hover} border rounded-xl px-6 py-5 shadow-sm transition-all duration-200 w-full md:w-64`}
                >
                  <span className="text-3xl mb-2">{icon}</span>
                  <span className="text-center font-semibold text-base">{label}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* STEP 1: SHARED FORM (Senior Living & Home Health/Care) */}
      {uiState.step === 1 && (
        <section className="bg-[#E6F0F7] mt-2 mb-8 p-6 rounded-xl shadow-md max-w-xl mx-auto">
          <h3 className="text-xl font-bold mb-2">{formCopy[uiState.formType]?.title || "Let’s Connect"}</h3>
          <p className="mb-4 text-sm text-gray-700">
            {formCopy[uiState.formType]?.desc || "Enter your details and our team will reach out."}
          </p>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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

            <button
              type="button"
              onClick={() => setUiState({ step: 0, formType: null })}
              className="text-xs text-gray-500 underline mt-1 self-start"
            >
              ← Back
            </button>
          </form>
        </section>
      )}

      {/* STEP 2: THANK YOU */}
      {uiState.step === 2 && (
        <section className="text-center mt-2 mb-8">
          <h3 className="text-xl font-bold text-green-700">Thank you!</h3>
          <p className="text-sm">Our team will contact you shortly.</p>
          <button
            className="text-xs text-gray-500 underline mt-2"
            onClick={() => setUiState({ step: 0, formType: null })}
          >
            Go back
          </button>
        </section>
      )}

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
