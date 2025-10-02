import { Button } from "./components/ui/button";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { useAnalytics } from "./useAnalytics";
import { useEffect } from "react";




export default function FreeContent() {
  useEffect(() => {
    document.title = "SingFit AARP Member Resources";
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const { track } = useAnalytics("FreeContent");

  // SCROLL DEPTH TRACKING
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const triggered = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentScrolled = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((t) => {
        if (percentScrolled >= t && !triggered.has(t)) {
          triggered.add(t);
          const eventData = {
            event: "Scroll Depth",
            percent_scrolled: t,
            page_id: "FreeContent"
          };
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(eventData);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // YOUTUBE VIDEO PLAY TRACKING
  useEffect(() => {
    let player;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player("yt-video", {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              track("video_play", {
                video_title: "How Caregivers Can Build Musical Habits to Support a Happy, Healthy Life",
                page_id: "MemberResources"
              });
            }
          }
        }
      });
    };

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const videoTitles = [
    "What a Song Can Do!",
    "How Caregivers Can Build Musical Habits for a Happy, Healthy Life",
    "5 Signs Singing is Helping"
  ];

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
    slideChanged(slider) {
      const newIndex = slider.track.details.rel;
      setCurrentSlide(newIndex);

      const title = videoTitles[newIndex];
      track("video_change", {
        video_title: title,
        new_slide_index: newIndex
      });
    }
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
             onClick={() => {
  const target = Math.max(currentSlide - 1, 0);
  const title = videoTitles[target];
  
  instanceRef.current?.moveToIdx(target);
}}

              className="absolute left-0 top-1/2 -ml-10 transform -translate-y-1/2 z-10 bg-white border border-[#002F6C] rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100"

              aria-label="Previous video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
  const target = Math.min(currentSlide + 1, videoTitles.length - 1);
  const title = videoTitles[target];
  
  instanceRef.current?.moveToIdx(target);
}}

              className="absolute right-0 top-1/2 -mr-10 transform -translate-y-1/2 z-10 bg-white border border-[#002F6C] rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100"
              aria-label="Next video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden shadow mt-2">
              <div className="keen-slider__slide bg-white p-1 rounded-lg shadow h-[369px] flex items-center justify-center">
  <iframe
  id="yt-video"
  className="w-full h-full rounded-md"
  src="https://www.youtube.com/embed/bSw5X9Hq3NU?enablejsapi=1"
  title="SingFit Free Resource"
  sandbox="allow-scripts allow-same-origin allow-presentation"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
</div>

              {/* Slide 2: Downloadable PDF */}
{/* Slide 2: Downloadable PDF */}
<div className="keen-slider__slide bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center text-center text-[#243B53] gap-4">
  <img
    src="/downloadgraphic.jpeg"
    alt="Download PDF Graphic"
    className="w-24 h-24 object-contain mb-2"
  />
  <h3 className="text-2xl font-semibold">
    How Caregivers Can Build Musical Habits for a Happy, Healthy Life
  </h3>
  <p className="text-base text-gray-700 max-w-md">
    Download our free guide to start using music as a caregiving tool.
  </p>
  <a
    href="/webinarplan.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-2 bg-[#F47534] hover:bg-[#d9652c] text-white px-6 py-3 rounded shadow text-base font-medium transition"
    onClick={() => {
      track("click_cta", {
        button_text: "Download Caregiver PDF",
        destination_url: "/webinarplan.pdf",
        page_id: "MemberResources"
      });
    }}
  >
    Download PDF
  </a>
</div>



              <div className="keen-slider__slide bg-gray-100 p-1 rounded-lg shadow flex items-center justify-center text-gray-600 text-base font-medium aspect-video">
                Coming Soon
              </div>
            </div>
            {/* Progress Dots */}
<div className="flex justify-center items-center gap-2 mt-4">
  {videoTitles.map((_, i) => (
    <button
      key={i}
      onClick={() => {
  const title = videoTitles[i];
  
  instanceRef.current?.moveToIdx(i);
}}

      className={`w-3 h-3 rounded-full focus:outline-none ${
        currentSlide === i ? "bg-[#F47534]" : "bg-gray-300"
      } transition-all duration-300`}
      aria-label={`Go to slide ${i + 1}`}
    />
  ))}
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
        track("submit_form", {
          form_id: "notify_me",
          page_id: "MemberResources",
        });
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
  {successMessage && (
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
              Board Certified Music Therapist Andy Tubman hosts a series of webinars on music as medicine.
            </h2>
          </div>

          <div className="space-y-4 mt-4">
           {/* Webinar Card 1 */}
<button
  onClick={() => {
    const eventData = {
      event: "click_cta",
      button_text: "Webinar: A Caregiver's Guide (Sep 16)",
      destination_url: "https://singfit.eventbrite.com",
      page_id: "MemberResources"
    };
     window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
    window.open(eventData.destination_url, "_blank");
  }}
  className="block bg-white rounded-xl shadow p-4 flex items-start gap-4 hover:shadow-lg transition-shadow duration-200 text-left w-full"
>
  <img
    src="/Nov42025.png"
    alt="November 4, 2025"
    className="w-20 h-20 object-contain rounded-md shadow"
  />
  <div className="text-lg leading-relaxed">
    <p className="font-semibold text-[#002F6C] text-xl mb-2">
      A Caregiver's Guide to Transforming Health & Wellness Through Music as Medicine
    </p>
  </div>
</button>


            {/* Webinar Card 2 */}
   <button
  onClick={() => {
    const eventData = {
      event: "click_cta",
      button_text: "Webinar: Combat Sundowning (Oct 14)",
      destination_url: "https://singfit.eventbrite.com",
      page_id: "MemberResources"
    };
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
    window.open(eventData.destination_url, "_blank");
  }}
  className="block bg-white rounded-xl shadow p-4 flex items-start gap-4 hover:shadow-lg transition-shadow duration-200 text-left w-full"
>
  <img
    src="/Dec22025.png"
    alt="December 2, 2025"
    className="w-20 h-20 object-contain rounded-md shadow"
  />
  <div className="text-lg leading-relaxed">
    <p className="font-semibold text-[#002F6C] text-xl mb-2">
      Caregiver's Guide to Using Holiday and Classic Songs to Sing Away Stress
    </p>
  </div>
</button>

            {/* Webinar Card 3 */}
  <button
  onClick={() => {
    const eventData = {
      event: "click_cta",
      button_text: "Webinar: Holiday Songs to Reduce Stress (Nov 13)",
      destination_url: "https://singfit.eventbrite.com",
      page_id: "MemberResources"
    };
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
    window.open(eventData.destination_url, "_blank");
  }}
  className="block bg-white rounded-xl shadow p-4 flex items-start gap-4 hover:shadow-lg transition-shadow duration-200 text-left w-full"
>
  <img
    src="/Jan62026.png"
    alt="January 6, 2025"
    className="w-20 h-20 object-contain rounded-md shadow"
  />
  <div className="text-lg leading-relaxed">
    <p className="font-semibold text-[#002F6C] text-xl mb-2">
      How to Combat Sundowning and Agitation with Music
    </p>
  </div>
</button>

          </div>

          {/* Webinar Button – FINAL FIX */}
          <div className="mt-auto pt-4 text-center">
            <div className="relative">
              <Button
  className="text-sm px-6 py-4 bg-[#F47534] text-white hover:bg-[#d9652c] shadow-md transition relative"
  style={{ top: '13px' }}
  onClick={() => {
    const eventData = {
      event: "click_cta",
      button_text: "Sign Up for a Webinar",
      destination_url: "https://singfit.eventbrite.com",
      page_id: "MemberResources"
    };
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
    window.open(eventData.destination_url, "_blank");
  }}
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
 <Button
  onClick={() => {
  const eventData = {
    event: "click_cta",
    button_text: "Buy SingFit",
    destination_url: "https://www.singfit.com/aarp-member-pricing",
    page_id: "MemberResources"
  };

  // Optional: still fire track inside iframe, for redundancy
  if (typeof track === "function") {
    track("click_cta", eventData);
  }

  // Navigate
  window.open(eventData.destination_url, "_blank");
}}

  aria-label="Start using SingFit today"
  className="w-full sm:w-auto text-xl px-10 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"
>
  Buy SingFit Now
</Button>

  <p className="text-base md:text-lg mt-3 text-[#EC1300] flex items-center justify-center gap-3">
    <img
      src="/aarp-member-benefit.png"
      alt="AARP badge"
      className="h-8 w-auto inline-block"
    />
    AARP Member Price: $8.39/month (includes 30% discount).
  </p>
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

