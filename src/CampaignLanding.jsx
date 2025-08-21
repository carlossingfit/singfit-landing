import { useState } from "react";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { useAnalytics } from "./useAnalytics";

export default function CampaignLanding() {
  const { track } = useAnalytics("CampaignLanding");
  const [step, setStep] = useState(0);

  const handleSegmentClick = (segment) => {
    track("select_segment", { segment });
    if (segment === "Caregiver") {
      window.open("https://www.singfit.com/studiocaregiver", "_blank");
    } else if (segment === "Therapist") {
      window.open("https://www.singfit.com/studiopro", "_blank");
    } else if (segment === "Senior Living") {
      setStep(1); // Show email capture form
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

  return (
    <div className="bg-white min-h-screen px-6 py-10 max-w-5xl mx-auto font-sans text-gray-900">
      {/* HERO */}
      <section className="bg-[#E6F0F7] rounded-2xl shadow-xl border border-gray-200 px-6 py-8 relative overflow-hidden mb-10">
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-[#002F6C] leading-tight mb-2">
      Discover the Power of Music<br className="hidden sm:block" />
      with SingFit
    </h1>
    <p className="text-lg text-[#243B53] font-medium">
      A digital therapeutic platform built to support wellness through song — at home, in therapy, and in senior living.
    </p>
  </div>
</section>


      {/* PRODUCT HIGHLIGHT */}
      <section className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "SingFit PRIME",
            desc: "Group-based programming for senior living communities.",
            image: "/primecard.png",
          },
          {
            title: "SingFit STUDIO Caregiver",
            desc: "For individuals supporting loved ones at home.",
            image: "/caregivercard.png",
          },
          {
            title: "SingFit STUDIO PRO",
            desc: "For individual therapists and clinical use.",
            image: "/procard.png",
          },
        ].map((p, i) => (
          <div key={i} className="bg-[#FAF6F2] p-6 rounded-xl shadow-md text-center">
            <img src={p.image} alt={p.title} className="h-32 object-contain mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#F47534]">{p.title}</h3>
            <p className="text-sm text-gray-700 mt-2">{p.desc}</p>
          </div>
        ))}
      </section>

      {/* AUDIENCE SEGMENTATION */}
      {step === 0 && (
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-[#002F6C]">
            Let’s Get You to the Right Product
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {[
              { label: "I'm a Caregiver", segment: "Caregiver" },
              { label: "I'm a Therapist", segment: "Therapist" },
              { label: "I'm with a Senior Living Community", segment: "Senior Living" },
            ].map(({ label, segment }) => (
              <Button
                key={segment}
                className="px-6 py-4 bg-[#F47534] text-white hover:bg-[#d9652c] shadow-md text-lg"
                onClick={() => handleSegmentClick(segment)}
              >
                {label}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* B2B EMAIL CAPTURE */}
      {step === 1 && (
        <section className="bg-[#E6F0F7] mt-10 p-6 rounded-xl shadow-md max-w-xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Let’s Connect</h3>
          <p className="mb-4 text-sm text-gray-700">
            Enter your email and our team will reach out with pricing and program details for SingFit PRIME.
          </p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleB2BSubmit}>
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
