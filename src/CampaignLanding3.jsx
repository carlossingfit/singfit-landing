import { useState } from "react";
import { Button } from "./components/ui/button";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
// If you don’t use this hook, remove the import + track calls:
import { useAnalytics } from "./useAnalytics";

export default function CampaignLanding3() {
  const { track = () => {} } = useAnalytics ? useAnalytics("CampaignLanding3") : { track: () => {} };

  // UI steps: 0 = default (carousel), 1 = form, 2 = thank-you
  const [uiState, setUiState] = useState({ step: 0, formType: null });

  // ---------- EDITABLE CONFIG ----------
  const BRAND_ORANGE = "#F47534";
  const YT_EMBED = "https://www.youtube.com/embed/stknfT1FagU?start=96"; // placeholder used for all slides
  const slides = [
    {
      title: "SingFit PRIME",
      desc: "Group-based programming for senior living communities.",
      video: YT_EMBED,
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
    },
    {
      title: "SingFit STUDIO Caregiver",
      desc: "For individuals supporting loved ones at home.",
      video: YT_EMBED,
      cta: { type: "link", label: "Go to Caregiver App", url: "https://www.singfit.com/studiocaregiver" },
    },
    {
      title: "SingFit STUDIO PRO",
      desc: "For individual therapists and clinical use.",
      video: YT_EMBED,
      cta: { type: "link", label: "For Therapists", url: "https://www.singfit.com/studiopro" },
    },
    {
      title: "Home Health/Care",
      desc: "Tailored implementations for home health and in-home care.",
      video: YT_EMBED,
      cta: { type: "form", label: "Discuss Home Health", formType: "Home Health/Care" },
    },
  ];
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/YOUR_UNIQUE_WEBHOOK";
  // ---------- END CONFIG ----------

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

  const openForm = (formType) => {
    track("open_form", { formType });
    setUiState({ step: 1, formType });
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
    } catch {
      /* no-op */
    }
    setUiState({ step: 2, formType: null });
  };

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
      {/* HERO (from CampaignLanding2) */}
      <section className="bg-[#0091c8] rounded-2xl shadow-xl border border-gray-200 px-6 pt-6 pb-10 relative overflow-hidden mb-8">
        <div className="max-w-3xl mx-auto text-center mt-6 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.5] mb-2 text-center">
            <span className="block mb-3">Discover the Power of Music</span>
            <span className="inline-flex items-center justify-center gap-2">
              <span>with</span>
              <a
                href="https://www.singfit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
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

      {/* STEP 0: HEADER + CAROUSEL WITH BUILT-IN CTAs */}
      {uiState.step === 0 && (
        <>
          {/* Header above carousel */}
          <div className="text-center mb-4 md:mb-6">
  <h2 className="text-2xl md:text-3xl font-extrabold text-black">
    Which Product is the Right <span className="text-[#F47534]">FIT</span> for you?
  </h2>
</div>

          {/* Video carousel */}
          <section className="mb-6">
            <div className="bg-[#FAF6F2] rounded-lg shadow border border-gray-200 max-w-[680px] mx-auto px-3 py-3">
              <div ref={sliderRef} className="keen-slider">
                {slides.map((s, i) => (
                  <div key={i} className="keen-slider__slide p-2">
                    <div className="grid grid-cols-1 gap-2 items-start">
                      {/* Title + description */}
                      <div className="text-center px-2">
                        <h3 className="text-lg md:text-xl font-semibold text-[#F47534] mb-1">{s.title}</h3>
                        <p className="text-sm text-gray-700">{s.desc}</p>
                      </div>

                      {/* Video */}
                      <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-sm">
                        <iframe
                          className="w-full h-[240px] md:h-[320px] rounded-md"
                          src={s.video}
                          title={s.title}
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin allow-presentation"
                        />
                      </div>

                      {/* CTA area */}
                      <div className="flex justify-center mt-3">
                        {s.cta.type === "link" ? (
                          <Button
                            onClick={() => {
                              track("click_cta", {
                                button_text: s.cta.label,
                                destination_url: s.cta.url,
                                page_id: "CampaignLanding3",
                              });
                              window.open(s.cta.url, "_blank");
                            }}
                            className="text-sm px-5 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
                          >
                            {s.cta.label}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => openForm(s.cta.formType)}
                            className="text-sm px-5 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
                          >
                            {s.cta.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls + dots */}
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
                        className="rounded-full transition"
                        style={{
                          width: active ? 12 : 10,
                          height: active ? 12 : 10,
                          backgroundColor: active ? BRAND_ORANGE : "#D1D5DB",
                          boxShadow: active ? `0 0 0 2px ${BRAND_ORANGE}22` : "none",
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
        </>
      )}

      {/* STEP 1: SHARED FORM (Senior Living & Home Health/Care) */}
      {uiState.step === 1 && (
        <section className="bg-[#E6F0F7] mt-2 mb-8 p-6 rounded-xl shadow-md max-w-xl mx-auto">
          {/* standout BACK control */}
          <div className="mb-3">
            <button
              type="button"
              onClick={() => setUiState({ step: 0, formType: null })}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#F47534] text-[#F47534]
                         hover:bg-[#FFF2EB] focus:outline-none focus:ring-2 focus:ring-[#F47534]"
              aria-label="Go back to product selection"
            >
              {/* left arrow */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>

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
