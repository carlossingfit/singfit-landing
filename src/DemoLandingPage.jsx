import { Button } from "./components/ui/button";
import { HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { HealtcareIcon, Brain02Icon, SustainableEnergyIcon } from "hugeicons-react";
import { useEffect } from "react";

export default function DemoLandingPage() {
  useEffect(() => {
    document.title = "Demo Landing Page";
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

  {/* SingFit Logo: now NOT a link */}
  <img
    src="/SingFit New Brand Logo.png"
    alt="SingFit logo"
    className="w-[250px] object-contain pt-2 drop-shadow-sm"
  />

  {/* Yahoo Logo: mobile */}
  <img
    src="/Yahoo-logo.png"
    alt="Yahoo logo"
    className="w-[130px] h-auto mt-4 md:hidden"
  />
</div>


          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-snug md:leading-tight">
            <span className="block">Experience the Power</span>
            <span className="block">of Music with SingFit</span>
          </h1>

          {/* Subhead */}
          <p className="text-xl text-gray-900 leading-relaxed">
            Use music to improve emotional wellbeing for you and your loved one. Explore free resources and try the SingFit App, which is designed to deliver guided singing sessions that can help elevate mood and increase engagement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* External CTA: now with no link */}
            <Button
              aria-label="Access free therapeutic music resources"
              className="text-lg px-10 py-5 bg-[#F47534] text-white hover:bg-[#d9652c] transition-all duration-200 ease-in-out"
            >
              Get Free Music Resources
            </Button>

            {/* Internal Scroll CTA: unchanged */}
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
              <span className="mt-1 leading-none"></span>
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-end justify-between h-full pt-2">
          {/* Yahoo Logo: desktop only */}
          <img
  src="/Yahoo-logo.png"
  alt="Yahoo logo"
  className="w-[160px] h-auto mb-2 self-end mt-[-15px] hidden md:block"
/>

          {/* Image */}
          <div className="w-full rounded-xl overflow-hidden shadow-xl mt-auto">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src="/heroimage.jpg"
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
          The SingFit app uses personalized guided singing sessions, voice prompted lyrics, and progress tracking to bring the benefits of singing into your daily routine; no musical background required.
        </p>
        <div className="text-center mb-4">
          <Button
            aria-label="Download the SingFit App"
            className="w-full sm:w-auto text-xl px-12 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"
          >
            Get the SingFit App
          </Button>
        </div>

        <p className="text-center text-2xl font-bold underline decoration-[#FDD9C7] decoration-1 text-[#002F6C] tracking-wide mb-4">
          SingFit Is Designed For:
        </p>

        {/* Single full width card */}
        <div className="grid grid-cols-1 gap-6 sm:gap-10 text-left pt-3 items-stretch">
          <div className="bg-[#FEF8F5] p-6 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col justify-start">
            <HeartHandshake strokeWidth={1.5} className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-center">Caregivers & Their Loved Ones</h3>
            <p className="text-sm leading-relaxed text-gray-800 text-center">
              SingFit offers a structured path to engage with music and singing. Singing has been shown to not only help those struggling with mood and emotions, but also to enhance caregiver wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white p-10 rounded-xl shadow-md space-y-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">How It Works</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <p className="text-lg md:text-xl">
          After subscribing on this website, you will receive an email with app download instructions and your login credentials.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {["Download the app","Set your goal","Begin your session","Wrap up your session"].map((title, i) => (
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
                          "44e07472013845718269c789f125b619",
                          "3804aa0322e047aa86b78c4f937e93d8",
                          "7696ff978e7e4f8bad929d3739f6043a",
                        ][i]
                      }~mv2.png`
                }
                alt={`Step ${i + 1}`}
                className="mx-auto w-full max-w-[140px] h-auto object-contain bg-white shadow-lg rounded-xl p-2 hover:scale-110 transition-transform duration-300"
              />

              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-700">{
                [
                  "Download on iOS or Android, then log in and create your profile",
                  "Choose what you want to focus on for your session",
                  "Follow on screen instructions and sing along with the prompted lyrics",
                  "Track your results with our simple before and after rating system"
                ][i]
              }</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mid Page CTA Section */}
      <div className="text-center">
        <Button
          aria-label="Start using SingFit today"
          className="w-full sm:w-auto text-xl px-10 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"
        >
          Get SingFit Now
        </Button>
      </div>

      <section id="why-people-use" className="bg-[#FEF8F5] p-10 rounded-xl shadow-md space-y-10 text-center mb-12">
        <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">How Singing Helps</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 max-w-6xl mx-auto">

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
            <HealtcareIcon className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">Increase engagement with loved one</h3>
            <p className="text-sm text-gray-700">
              SingFit delivers structured singing sessions for the family caregiver and participant.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
            <Brain02Icon className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">To aid with memory challenges</h3>
            <p className="text-sm text-gray-700">
              Singing has been shown to activate the brain and may help support memory.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
            <SustainableEnergyIcon className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">Elevate your emotional wellbeing</h3>
            <p className="text-sm text-gray-700">
              Singing can enhance mood and foster social connection.
            </p>
          </div>

        </div>
      </section>

      {/* The Science Behind SingFit Section */}
      <section className="bg-[#D1E4F0] p-10 rounded-xl shadow-md space-y-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">The Research Behind Singing*</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 max-w-5xl mx-auto text-left">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-2">Designed by Board Certified Music Therapists</h3>
            <p className="text-sm text-gray-700">
              SingFit is grounded in clinical music therapy and is designed to enable failure free singing.
              Research shows that singing engages multiple brain functions, supporting memory, social connection, and emotional wellbeing.*
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-2">Personalized for Better Outcomes</h3>
            <p className="text-sm text-gray-700">
              SingFit uses personalized playlists and algorithms tailored to each user's age, preferences and goals.
              Research shows that music interventions can improve cognitive function and mood in aging populations.*
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-700 italic text-center max-w-5xl mx-auto mt-2">
          *{" "}
          <a
            href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11940398/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 hover:text-blue-900"
            onClick={() => {
              const eventData = {
                event: "click_cta",
                button_text: "Research Link - Tragantzopoulou (footnote)",
                destination_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11940398/",
                page_id: "MemberLanding"
              };
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push(eventData);
            }}
          >
            Tragantzopoulou &amp; Giannouli, 2025
          </a>
          {" "} |{" "}
          <a
            href="https://d24s0qdzj4qepv.cloudfront.net/Neuro_Arts_Blueprint_Initiative_Final_Deloitte_Study_May_2025_689ad0fe8d.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 hover:text-blue-900"
            onClick={() => {
              const eventData = {
                event: "click_cta",
                button_text: "Research Link - Deloitte NeuroArts (footnote)",
                destination_url:
                  "https://d24s0qdzj4qepv.cloudfront.net/Neuro_Arts_Blueprint_Initiative_Final_Deloitte_Study_May_2025_689ad0fe8d.pdf",
                page_id: "MemberLanding",
              };
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push(eventData);
            }}
          >
            Deloitte NeuroArts Blueprint, 2025
          </a>.
        </p>
      </section>

      {/* Final CTA Section */}
      <div className="text-center">
        <Button
          aria-label="Start using SingFit today"
          className="w-full sm:w-auto text-xl px-10 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"
        >
          Get SingFit Now
        </Button>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 border-t border-gray-200 pt-6 mt-12 px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
          <span>
            ©2025 Musical Health Technologies. All Rights Reserved.
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
