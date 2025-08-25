import { useState } from "react";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { useAnalytics } from "./useAnalytics";

export default function CampaignLanding2() {
  const { track } = useAnalytics("CampaignLanding2");
  const [step, setStep] = useState(0);
  const [persona, setPersona] = useState(null);

  const handleSegmentClick = (segment) => {
    track("select_segment", { segment });
    setPersona(segment);
    if (segment === "Senior Living") {
      setStep(1);
    }
  };

  const handleB2BSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    track("submit_form", { form_id: "b2b_interest", email });

    fetch("https://hook.us2.make.com/YOUR_UNIQUE_WEBHOOK", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStep(2);
  };

  const sharedVideo = "https://www.youtube.com/embed/stknfT1FagU?start=96";

  const personaContent = {
    "Caregiver": {
      title: "SingFit STUDIO Caregiver",
      desc: "For individuals supporting loved ones at home.",
      videoEmbed: sharedVideo,
      cta: "https://www.singfit.com/studiocaregiver",
    },
    "Therapist": {
      title: "SingFit STUDIO PRO",
      desc: "For individual therapists and clinical use.",
      videoEmbed: sharedVideo,
      cta: "https://www.singfit.com/studiopro",
    },
    "Senior Living": {
      title: "SingFit PRIME",
      desc: "Group-based programming for senior living communities.",
      videoEmbed: sharedVideo,
    }
  };

  return (
    <div className="bg-white min-h-screen px-6 py-10 max-w-5xl mx-auto font-sans text-gray-900">
      {/* HERO */}
      <section className="bg-[#E6F0F7] rounded-2xl shadow-xl border border-gray-200 px-6 pt-6 pb-10 relative overflow-hidden mb-10">
        <div className="max-w-3xl mx-auto text-center mt-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002F6C] leading-tight mb-2 text-center">
  <span className="block">Discover the Power of Music</span>
  <span className="inline-flex items-center justify-center gap-2">
    <span>with</span>
    <a
      href="https://www.singfit.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <img
        src="/SingFit - Logo for App Header.png"
        alt="SingFit"
        className="h-8 md:h-12 relative top-[3px]"
      />
    </a>
  </span>
</h1>

          <p className="text-lg text-[#243B53] font-medium">
            A digital therapeutic platform built to support wellness through song — at home, in therapy, and in senior living.
          </p>
        </div>
      </section>

      {/* STEP 1: SELECT PERSONA */}
      {!persona && (
        <section className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-6 text-[#002F6C]">
            Let’s Get You to the Right Product
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
            {["Caregiver", "Therapist", "Senior Living"].map((segment) => {
              const label =
                segment === "Senior Living"
                  ? "I work in Senior Living"
                  : `I'm a ${segment}`;

              return (
                <button
                  key={segment}
                  onClick={() => handleSegmentClick(segment)}
                  className="flex flex-col items-center justify-center bg-[#FAF6F2] text-[#002F6C] border border-[#D1D5DB] hover:bg-[#f3ebe6] rounded-xl px-6 py-6 shadow-sm transition-all duration-200 w-full md:w-64"
                >
                  <span className="text-3xl mb-2">
                    {segment === "Caregiver"
                      ? "🏠"
                      : segment === "Therapist"
                      ? "🩺"
                      : "🏢"}
                  </span>
                  <span className="text-center font-semibold text-base">{label}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* STEP 2: SHOW MATCHED PRODUCT */}
      {persona && persona !== "Senior Living" && (
        <section className="bg-[#FAF6F2] mt-10 px-6 py-8 rounded-xl shadow-md max-w-5xl mx-auto text-center space-y-6">
          <div className="mx-auto w-full max-w-3xl aspect-[16/9]">
            <iframe
              className="w-full h-full rounded-md"
              src={personaContent[persona].videoEmbed}
              title={personaContent[persona].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#002F6C]">
            {personaContent[persona].title}
          </h3>
          <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto">
            {personaContent[persona].desc}
          </p>
          <Button
            onClick={() => window.open(personaContent[persona].cta, "_blank")}
            className="text-sm px-6 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
          >
            Learn More
          </Button>
        </section>
      )}

      {/* STEP 2 (Senior Living): EMAIL CAPTURE */}
      {persona === "Senior Living" && step === 1 && (
        <section className="bg-[#FAF6F2] mt-10 px-6 py-8 rounded-xl shadow-md max-w-5xl mx-auto text-center space-y-6">
          <div className="mx-auto w-full max-w-3xl aspect-[16/9]">
            <iframe
              className="w-full h-full rounded-md"
              src={personaContent["Senior Living"].videoEmbed}
              title="SingFit PRIME Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#002F6C]">Let’s Connect</h3>
          <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto">
            Enter your email and our team will reach out with pricing and program details for SingFit PRIME.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-2 pt-2" onSubmit={handleB2BSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full sm:w-64 focus:ring-2 focus:ring-[#F47534]"
            />
            <Button type="submit" className="text-sm px-4 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow">
              Submit
            </Button>
          </form>
        </section>
      )}

      {/* THANK YOU STATE */}
      {step === 2 && (
        <section className="text-center mt-10">
          <h3 className="text-xl font-bold text-green-700">Thank you!</h3>
          <p className="text-sm">Our team will contact you shortly.</p>
        </section>
      )}

      {/* RESET OPTION */}
      {persona && step < 2 && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setPersona(null);
              setStep(0);
            }}
            className="text-sm underline text-[#002F6C] hover:text-[#F47534]"
          >
            Not you? Choose a different role
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 border-t border-gray-200 pt-6 mt-12 px-4">
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
