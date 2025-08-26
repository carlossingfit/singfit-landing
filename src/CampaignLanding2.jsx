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
    if (segment === "Senior Living" || segment === "Home Health/Care") {
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

  const personaContent = {
    "Caregiver": {
      title: "SingFit STUDIO Caregiver",
      desc: "For individuals supporting loved ones at home.",
      videoEmbed: "https://www.youtube.com/embed/stknfT1FagU?start=96",
      cta: "https://www.singfit.com/studiocaregiver",
    },
    "Therapist": {
      title: "SingFit STUDIO PRO",
      desc: "For individual therapists and clinical use.",
      videoEmbed: "https://www.youtube.com/embed/stknfT1FagU?start=96",
      cta: "https://www.singfit.com/studiopro",
    },
    "Senior Living": {
      title: "SingFit PRIME",
      desc: "Group-based programming for senior living communities.",
      videoEmbed: "https://www.youtube.com/embed/stknfT1FagU?start=96",
    },
    "Home Health/Care": {
      title: "SingFit for Home Health & Care",
      desc: "A scalable tool for agencies and providers serving patients in the home.",
      videoEmbed: "https://www.youtube.com/embed/stknfT1FagU?start=96",
    }
  };

  return (
    <div className="bg-white min-h-screen px-6 py-10 max-w-5xl mx-auto font-sans text-gray-900">
      {/* HERO */}
      <section className="bg-[#0091c8] rounded-2xl shadow-xl border border-gray-200 px-6 pt-6 pb-10 relative overflow-hidden mb-10">
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
                  className="h-8 md:h-12 relative top-[2px]"
                />
              </a>
            </span>
          </h1>
          <p className="text-lg text-white font-medium">
            A digital therapeutic platform built to support wellness through song — at home, in therapy, and in senior living.
          </p>
        </div>
      </section>

      {/* STEP 1: SELECT PERSONA */}
      {!persona && (
        <section className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-6 text-[#002F6C]">
            Let’s Get You to the Right Place
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {["Caregiver", "Therapist", "Senior Living", "Home Health/Care"].map((segment, index) => {
  const label =
    segment === "Senior Living"
      ? "I work in Senior Living"
      : segment === "Home Health/Care"
      ? "I work in Home Health/Care"
      : `I'm a ${segment}`;

  const bgColor = index % 2 === 0 ? "bg-[#FFF4EC]" : "bg-[#FFF4EC]";

  return (
    <button
      key={segment}
      onClick={() => handleSegmentClick(segment)}
      className="w-full h-full flex flex-col items-center justify-center bg-[#FFF4EC] text-[#002F6C] border border-[#FFD7B8] hover:shadow-lg hover:-translate-y-1 transform transition duration-200 ease-in-out rounded-xl px-6 py-6 shadow-sm"

    >
      <span className="text-4xl md:text-5xl mb-3">
        {segment === "Caregiver"
          ? "🏠"
          : segment === "Therapist"
          ? "🩺"
          : segment === "Home Health/Care"
          ? "🚑"
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
      {persona && persona !== "Senior Living" && persona !== "Home Health/Care" && (
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

      {/* STEP 2 (Senior Living or Home Health/Care): EMAIL CAPTURE */}
      {(persona === "Senior Living" || persona === "Home Health/Care") && step === 1 && (
        <section className="bg-[#FAF6F2] mt-10 px-6 py-8 rounded-xl shadow-md max-w-5xl mx-auto text-center space-y-6">
          <div className="mx-auto w-full max-w-3xl aspect-[16/9]">
            <iframe
              className="w-full h-full rounded-md"
              src={personaContent[persona].videoEmbed}
              title={personaContent[persona].title + " Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#002F6C]">Let’s Connect</h3>
          <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto">
            Enter your email and our team will reach out with pricing and program details for {personaContent[persona].title}.
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
