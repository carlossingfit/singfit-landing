import { Button } from "./components/ui/button";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";


export default function FreeContent2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");


  const videoTitles = [
    "How Caregivers Can Build Musical Habits to Support a Happy, Healthy Life",
    "Music and Memory: How Singing Boosts Brain Health",
    "More Coming Soon"
  ];

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
  <div className="bg-white min-h-screen">
    <div className="flex flex-col gap-10 px-8 pt-0 pb-16 max-w-7xl mx-auto font-sans text-gray-900 text-xl md:text-2xl">

<section className="bg-[#E6F0F7] rounded-2xl shadow-xl border border-gray-200 px-6 py-8 relative overflow-hidden mb-2">
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-[#002F6C] leading-tight mb-2">
      Discover the Power of Music  with SingFit — For Free
    </h1>
    <p className="text-lg text-[#002F6C] font-medium flex items-center justify-center gap-2">
      Brought to you by SingFit in collaboration with
      <img
        src="/aarp-logo.png"
        alt="AARP Logo"
        className="h-4 md:h-5 w-auto inline-block"
      />
    </p>
  </div>
</section>


      {/* Main Layout */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 gap-y-10 items-stretch min-h-[500px]">




        {/* VIDEO COLUMN */}
        <div className="flex flex-col justify-between h-full bg-[#FAF6F2] p-4 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="min-h-[4rem] pt-[0.6rem]">
            <h2 className="text-xl font-bold text-[#243B53] leading-snug">
              {videoTitles[currentSlide]}
            </h2>
          </div>

          <div className="relative mt-4">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-0 top-1/2 -ml-10 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100"
              aria-label="Previous video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute right-0 top-1/2 -mr-10 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100"
              aria-label="Next video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden shadow mt-2">
              <div className="keen-slider__slide bg-white p-1 rounded-lg shadow h-[369px] flex items-center justify-center">
  <iframe
  className="w-full h-full rounded-md"
  src="https://www.youtube.com/embed/bSw5X9Hq3NU"
  title="SingFit Free Resource"
  sandbox="allow-scripts allow-same-origin allow-presentation"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
</div>

              <div className="keen-slider__slide bg-gray-100 p-1 rounded-lg shadow flex items-center justify-center text-gray-600 text-base font-medium aspect-video">
                Coming Soon
              </div>

              <div className="keen-slider__slide bg-gray-100 p-1 rounded-lg shadow flex items-center justify-center text-gray-600 text-base font-medium aspect-video">
                More Coming Soon
              </div>
            </div>
          </div>

          {/* Notify Me Form */}
          {/* Notify Me Form */}
<div className="mt-auto pt-4 text-center space-y-1">
  <p className="text-base">Get notified when new resources are released:</p>
  <form
    className="flex flex-col sm:flex-row justify-center gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      const email = e.target.email.value;

      fetch("https://hook.us2.make.com/vl4dwb7wcunr13bghvani6mvji8imygv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => {
  if (res.ok) {
    setSuccessMessage("Thanks! Check your inbox for updates.");
    e.target.reset();
    setTimeout(() => setSuccessMessage(""), 5000); // optional auto-clear
  } else {
    setSuccessMessage("There was a problem. Please try again.");
  }
})
.catch(() => {
  setSuccessMessage("There was a problem. Please try again.");
});

    }}
  >
    <input
      type="email"
      name="email"
      required
      placeholder="Enter your email"
      className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full sm:w-64 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#F47534] hover:border-[#F47534]"
    />
    <Button
  type="submit"
  className="text-sm px-4 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
>
  Notify Me
</Button>

  </form>
  {typeof successMessage === "string" && successMessage && (
  <p className="text-sm text-green-600 mt-2">{successMessage}</p>
)}


</div>

        </div>

        {/* WEBINAR COLUMN */}
        <div className="flex flex-col justify-between h-full bg-[#FAF6F2] p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-start gap-4 pt-[0.2rem] min-h-[4rem]">
            <img
              src="/andyheadshot.jpg"
              alt="Andy Tubman"
              className="w-16 h-16 object-cover rounded-full shadow"
            />
            <h2 className="text-xl font-bold text-[#243B53] leading-tight">
              Join Board Certified Music Therapist Andy Tubman for a series of webinars on the power of music as medicine.
            </h2>
          </div>

          <div className="space-y-4 mt-4">
            {/* Webinar Card 1 */}
            <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
              <img
                src="date-july10.png"
                alt="July 10, 2025"
                className="w-20 h-20 object-contain rounded-md shadow"
              />
              <div className="text-lg leading-relaxed">
                <p className="font-semibold text-[#002F6C] text-xl mb-2">Music as Medicine</p>
<p className="text-base text-gray-700 leading-relaxed">
  Discover how music therapy can help caregivers support memory, mood, and energy in daily routines. <span className="text-gray-400 italic">More text coming soon…</span>
</p>

              </div>
            </div>

            {/* Webinar Card 2 */}
            <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
              <img
                src="date-july24.png"
                alt="July 24, 2025"
                className="w-20 h-20 object-contain rounded-md shadow"
              />
              <div className="text-lg leading-relaxed">
                <p className="font-semibold text-[#002F6C] text-xl mb-2">The Joy of Singing</p>
<p className="text-base text-gray-700 leading-relaxed">
  Explore how guided singing can boost mood, deepen connection, and create joyful moments with loved ones.<span className="text-gray-400 italic">More text coming soon…</span>
</p>

              </div>
            </div>
          </div>

          {/* Webinar Button – FINAL FIX */}
          <div className="mt-auto pt-4 text-center">
            <div className="relative">
              <Button
                className="text-sm px-6 py-4 bg-[#F47534] text-white hover:bg-[#d9652c] shadow-md transition relative"
                style={{ top: '13px' }}
                onClick={() => window.open("https://yoursignuplink.com", "_blank")}
              >
                Sign Up for a Webinar
              </Button>
            </div>
          </div>

        </div>
      </section>
        </div>
  </div>
  <div className="text-center mt-4">
  <a
    href="https://www.singfit.com/aarp-non-member-pricing"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      aria-label="Start using SingFit today"
      className="text-xl px-12 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"
    >
      Experience the Benefits of SingFit
    </Button>
  </a>

  <div className="text-base md:text-lg mt-3 text-[#EC1300] text-center space-y-1">
    <p>AARP Registered Users: $10.19/month (includes 15% discount).</p>
    <p className="flex justify-center items-center gap-2 flex-wrap">
      <img
        src="/aarp-member-benefit.png"
        alt="AARP badge"
        className="h-8 w-auto inline-block"
      />
      <span>
        AARP members receive additional savings.&nbsp;
        <a
          href="https://www.aarp.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-700 hover:text-blue-900"
        >
          Not a member? Join today.
        </a>
      </span>
    </p>
  </div>
</div>
{/* Footer */}
<footer className="text-center text-xs text-gray-500 border-t border-gray-200 pt-6 mt-12 px-4">
  <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
    <span>
      ©2025 Musical Health Technologies. All Rights Reserved.
    </span>
    <span>1010 Wilshire Blvd. Los Angeles, CA 90017</span>
    <a
      href="https://www.singfit.com/privacypolicy"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline text-blue-600"
    >
      Privacy Policy
    </a>
    <a
      href="https://www.singfit.com/terms-of-service"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline text-blue-600"
    >
      Terms of Service
    </a>
    <a
      href="https://www.singfit.com/accessibility-statement"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline text-blue-600"
    >
      Accessibility Statement
    </a>
  </div>
</footer>
  </div>
  );
}

