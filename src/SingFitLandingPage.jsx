import { Button } from "./components/ui/button";
import { HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { HealtcareIcon, Brain02Icon, SustainableEnergyIcon } from "hugeicons-react";
import { useEffect } from "react";

export default function SingFitLandingPage() {
  useEffect(() => {
    document.title = "SingFit AARP Member Page";
  }, []);
  const whatIsRef = useRef(null);
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
            event: "scroll_depth",
            percent_scrolled: t,
            page_id: "MemberLanding",
          };
            window.parent.postMessage(eventData, "*");
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(eventData);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex flex-col gap-2 px-8 pt-0 pb-16 max-w-7xl mx-auto font-sans text-gray-900 text-xl md:text-2xl">

      {/* Hero Section */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-[#EEF6FA] pt-0 pb-10 px-10 rounded-xl shadow-xl bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-repeat">

        {/* Left Column */}
        <div className="flex flex-col justify-start space-y-8 w-full">

          {/* Logos Row */}
          <div className="flex justify-between items-start w-full flex-wrap gap-2 md:gap-0">
            {/* SingFit Logo */}
            <a
              href="https://musicismedicine.singfit.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault(); // prevent default navigation
                const url = "https://musicismedicine.singfit.com/";

                // Fire analytics tracking
                track("click_cta", {
                  button_text: "SingFit Logo",
                  destination_url: url,
                  page_id: "MemberLanding" // or "UserLanding"
                });

                // Give time for tracking, then navigate
                setTimeout(() => {
                  window.open(url, "_blank", "noopener,noreferrer");
                }, 200);
              }}
            >
              <img
                src="/SingFit New Brand Logo.png"
                alt="SingFit logo"
                className="w-[250px] object-contain pt-2 drop-shadow-sm hover:opacity-90 transition-opacity duration-200"
              />
            </a>

            {/* AARP Logo – mobile only */}
            <img
              src="/aarp-logo.png"
              alt="AARP logo"
              className="h-8 w-auto mt-4 md:hidden"
            />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-snug md:leading-tight">
            <span className="block">Experience the Power</span>
            <span className="block">of Music with SingFit</span>
          </h1>

          {/* Subhead */}
          <p className="text-xl text-gray-900 leading-relaxed">
            Connect with your loved ones through song with SingFit!  Explore free resources and try the SingFit App, which offers guided singing sessions you can enjoy together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* External CTA – Open Free Resources Page */}
            <Button
              onClick={() => {
                const eventData = {
                  event: "click_cta",
                  button_text: "Get Free Music Resources",
                  destination_url: "https://musicismedicine.singfit.com/aarp-member-resources",
                  page_id: "MemberLanding"
                };

                window.parent.postMessage(eventData, "*");
                if (typeof track === "function") {
                  track("click_cta", eventData);
                }

                window.open(eventData.destination_url, "_blank");
              }}
              aria-label="Access free therapeutic music resources"
              className="text-lg px-10 py-5 bg-[#F47534] text-white hover:bg-[#d9652c] transition-all duration-200 ease-in-out"
            >
              Get Free Music Resources
            </Button>

            {/* Internal Scroll CTA – Learn About App */}
            <Button
              onClick={() => {
                const eventData = {
                  event: "click_cta",
                  button_text: "Learn About the App",
                  destination_url: "#what-is-singfit",
                  page_id: "MemberLanding"
                };

                window.parent.postMessage(eventData, "*");
                if (typeof track === "function") {
                  track("click_cta", eventData);
                }

                whatIsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Scroll to What is the SingFit App section"
              className="text-lg font-semibold px-10 py-4 bg-white border border-[#002F6C] text-[#002F6C] hover:bg-[#eaf2f8] transition-all duration-200 ease-in-out flex flex-col items-center justify-center leading-tight"
            >
              <span className="whitespace-nowrap">Learn About the SingFit App</span>
              <span className="mt-1 leading-none">
              
              </span>
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-end justify-between h-full pt-2">
          {/* AARP Logo – desktop only */}
          <img
            src="/aarp-logo.png"
            alt="AARP logo"
            className="h-10 w-auto mb-2 self-end mt-[5px] hidden md:block"
          />

          {/* Image */}
          <div className="w-full rounded-xl overflow-hidden shadow-xl mt-auto">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src="/laina_anita.PNG"
              alt="Smiling older woman singing with caregiver in sunny living room"
              className="w-full object-cover rounded-xl min-h-[340px]"
            />
          </div>
        </div>
      </section>

      {/* What is the SingFit App Section */}
      <section
        id="what-is-singfit"
        ref={whatIsRef}
        className="bg-white p-10 rounded-xl shadow-md space-y-6 text-center w-full mb-12"
      >
        <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">What Is the SingFit App?</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <p className="text-lg md:text-xl">
          The SingFit app provides guided singing sessions and voice prompted lyrics, making singing simple, accessible, and an easy part of your daily routine; no musical background required.
        </p>
        <div className="text-center mb-4">
          <Button
            onClick={() => {
              const eventData = {
                event: "click_cta",
                button_text: "Top - Get the SingFit App",
                destination_url: "https://www.singfit.com/aarp-member-pricing",
                page_id: "MemberLanding"
              };

              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push(eventData);

              if (typeof track === "function") {
                track("click_cta", eventData);
              }

              window.open(eventData.destination_url, "_blank");
            }}
            aria-label="Download the SingFit App"
            className="w-full sm:w-auto text-xl px-12 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"
          >
            Get the SingFit App
          </Button>
        </div>
        </section>

        <section
  id="personalized-music"
  className="bg-white p-12 rounded-xl shadow-md mb-12"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Left: Text */}
    <div className="space-y-8 md:order-2">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F47534] mb-3">
          Personalized Music for Caregivers & Loved Ones
        </h2>
        <div className="w-24 h-1 bg-[#FDD9C7] rounded"></div>
      </div>

      <div className="space-y-6 text-lg md:text-xl text-gray-800 leading-relaxed">
        <div>
          <p className="font-semibold text-[#002F6C] mb-1">
            Connection through guided music
          </p>
          <p>
            SingFit provides a structured, easy way for caregivers and care
            recipients to participate in music and singing activities,
            creating meaningful moments together.
          </p>
        </div>

        <div>
          <p className="font-semibold text-[#002F6C] mb-1">
            Music they know and love
          </p>
          <p>
            Let the app guide you to appropriate songs based on your loved one's preferences or choose from hundreds of songs to create personalized playlists.
          </p>
        </div>
      </div>
    </div>

    {/* Right: Image */}
    <div className="w-full rounded-xl overflow-hidden shadow-xl md:order-1">
      <motion.img
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="/heroimage.jpg"
        alt="Smiling older woman singing with caregiver in sunny living room"
        className="w-full object-cover rounded-xl min-h-[260px]"
      />
    </div>
  </div>
</section>

      {/* How It Works Section */}
      <section
  id="how-it-works"
  className="bg-white p-10 rounded-xl shadow-md space-y-8 text-center mb-12"
>
  <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
    <span className="relative z-10">How It Works</span>
    <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
    {[
      "Download the app",
      "Set your goal",
      "Begin your session",
      "Wrap up your session",
    ].map((title, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2, duration: 0.5 }}
        className="space-y-3 sm:space-y-4 hover:scale-105 transition-transform duration-200"
      >
        <img
          src={
            i === 0
              ? "/downloadapp_resized.png"
              : `https://static.wixstatic.com/media/264616_${
                  [
                    "2389c82006c446cca0f12db06a3d9000",
                    "757c32d715d84834acce4d56a6955584",
                    "3804aa0322e047aa86b78c4f937e93d8",
                    "06bff58acd7d4b61a8117a49fced1aaf",
                  ][i]
                }~mv2.png`
          }
          alt={`Step ${i + 1}`}
          className="mx-auto w-full max-w-[140px] h-auto object-contain bg-white shadow-lg rounded-xl p-2 hover:scale-110 transition-transform duration-300"
        />

        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-700">
          {
            [
              "Download on iOS or Android, then log in and create your profile",
              "Choose your primary goal for the session",
              "Follow on-screen instructions and sing along with the prompted lyrics",
              "Reflect on your singing experience to close out your session",
            ][i]
          }
        </p>
      </motion.div>
    ))}
  </div>

  {/* Moved explanatory text to bottom */}
  <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto pt-4">
    After subscribing on this website, you'll receive an email with app download
    instructions and your login credentials.
  </p>
</section>

      {/* Mid-Page CTA Section */}
      <div className="text-center">
        <Button
          aria-label="Start using SingFit today"
          className="w-full sm:w-auto text-xl px-10 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"
          onClick={() => {
            const eventData = {
              event: "click_cta",
              button_text: "Bottom - Buy SingFit Now",
              destination_url: "https://www.singfit.com/aarp-member-pricing",
              page_id: "MemberLanding"
            };

            // Push to GTM dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(eventData);

            // Navigate
            window.open(eventData.destination_url, "_blank");
          }}
        >
          Get SingFit Now
        </Button>

        <p className="text-base md:text-lg mt-3 text-[#EC1300] flex items-center justify-center gap-3 mb-6">
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
            ©2026 Musical Health Technologies. All Rights Reserved.
          </span>
          <span>1010 Wilshire Blvd. Los Angeles, CA 90017</span>
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            Terms of Service
          </a>
          <a
            href="/accessibility"
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
