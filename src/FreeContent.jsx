import { Button } from "./components/ui/button";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

export default function FreeContent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const videoTitles = [
    "How Caregivers Can Build Musical Habits to Support a Happy, Healthy Life",
    "Music and Memory: How Singing Boosts Brain Health",
    "More Videos Coming Soon"
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
  <div className="bg-[#FCF8F5] min-h-screen">
    <div className="flex flex-col gap-10 px-8 pt-10 pb-16 max-w-7xl mx-auto font-sans text-gray-900 text-xl md:text-2xl">


      {/* Page Header */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-[#002F6C]">Free Therapeutic Music Resources</h1>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto">
          Watch helpful videos and sign up for upcoming webinars designed to support brain health and joyful caregiving.
        </p>
      </section>

      {/* Main Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch min-h-[500px]">


        {/* VIDEO COLUMN */}
        <div className="flex flex-col justify-between h-full bg-[#FAF6F2] p-4 rounded-xl shadow-md">
          <div className="min-h-[4rem] pt-[0.6rem]">
            <h2 className="text-xl font-bold text-[#F47534] leading-snug">
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
    allowFullScreen
  />
</div>

              <div className="keen-slider__slide bg-white p-1 rounded-lg shadow h-[360px] flex items-center justify-center">
  <iframe
    className="w-full h-full rounded-md"
    src="https://www.youtube.com/embed/bSw5X9Hq3NU"
    title="SingFit Free Resource"
    allowFullScreen
  />
</div>

              <div className="keen-slider__slide bg-gray-100 p-1 rounded-lg shadow flex items-center justify-center text-gray-600 text-base font-medium aspect-video">
                More Videos Coming Soon
              </div>
            </div>
          </div>

          {/* Notify Me Form */}
          <div className="mt-auto pt-4 text-center space-y-1">
            <p className="text-sm">Want more free content? We’ll notify you when new videos are released:</p>
            <form className="flex flex-col sm:flex-row justify-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#F47534]"
              />
              <Button
                type="submit"
                className="text-sm px-4 py-2 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
              >
                Notify Me
              </Button>
            </form>
          </div>
        </div>

        {/* WEBINAR COLUMN */}
        <div className="flex flex-col justify-between h-full bg-[#EEF6FA] p-6 rounded-xl shadow-md">
          <div className="flex items-start gap-4 pt-[0.6rem] min-h-[4rem]">
            <img
              src="/andyheadshot.jpg"
              alt="Andy Tubman"
              className="w-16 h-16 object-cover rounded-full shadow"
            />
            <h2 className="text-lg font-bold text-[#F47534] leading-tight">
              Join Board Certified Music Therapist Andy Tubman for a series of webinars on the power of music as medicine.
            </h2>
          </div>

          <div className="space-y-4 mt-4">
            {/* Webinar Card 1 */}
            <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
              <img
                src="/date-july10.png"
                alt="July 10, 2025"
                className="w-16 h-16 object-contain rounded-md shadow"
              />
              <div className="text-sm">
                <p className="font-semibold text-[#002F6C] mb-1">Music as Medicine</p>
                <p className="text-xs text-gray-600 mb-2">July 10, 2025</p>
                <p className="text-xs text-gray-700 mb-1">
                  Learn how music can support memory and mood in daily caregiving. This session introduces the basics of music therapy and includes sample routines for caregivers.
                </p>
                <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1">
                  <li>What is Music as Medicine?</li>
                  <li>Using music to regulate energy</li>
                  <li>Simple tools for at-home use</li>
                </ul>
              </div>
            </div>

            {/* Webinar Card 2 */}
            <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
              <img
                src="/date-july24.png"
                alt="July 24, 2025"
                className="w-16 h-16 object-contain rounded-md shadow"
              />
              <div className="text-sm">
                <p className="font-semibold text-[#002F6C] mb-1">The Joy of Singing</p>
                <p className="text-xs text-gray-600 mb-2">July 24, 2025</p>
                <p className="text-xs text-gray-700 mb-1">
                  Explore how guided singing can elevate mood, increase engagement, and create joyful moments between caregivers and loved ones.
                </p>
                <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1">
                  <li>How singing activates the brain</li>
                  <li>Warm-ups and vocal games</li>
                  <li>Tips for non-musicians</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Webinar Button – FINAL FIX */}
          <div className="mt-auto pt-4 text-center">
            <div className="relative">
              <Button
                className="text-sm px-6 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow-md transition relative"
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
  );
}

