import { Button } from "./components/ui/button";
import { HeartHandshake, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { HealtcareIcon, Brain02Icon, SustainableEnergyIcon } from "hugeicons-react";


export default function UserLanding() {
  return (
    <div className="flex flex-col gap-2 px-8 pt-0 pb-16 max-w-7xl mx-auto font-sans text-gray-900 text-xl md:text-2xl">

       {/* Hero Section */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-[#EEF6FA] pt-0 pb-10 px-10 rounded-xl shadow-xl bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-repeat">
  
  {/* Left Column */}
  <div className="flex flex-col justify-start space-y-8">
    {/* SingFit Logo */}
    <img
      src="/SingFit - Logo for App Header.png"
      alt="SingFit logo"
      className="w-[190px] object-contain pt-1.5 drop-shadow-sm"
    />

    {/* Headline */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-snug md:leading-tight">
      <span className="block">Experience the Power</span>
      <span className="block">of Music with SingFit</span>
    </h1>

    {/* Subhead */}
    <p className="text-xl text-gray-900 leading-relaxed">
      SingFit is an app designed by board-certified music therapists to support cognitive and emotional wellbeing for you and your loved ones–explore free resources and try SingFit!
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href="https://www.singfit.com/aarp-free-resources"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          aria-label="Access free therapeutic music resources"
          className="text-lg px-10 py-5 bg-[#F47534] text-white hover:bg-[#d9652c] transition-all duration-200 ease-in-out"
        >
          Get Free Therapeutic Music Resources
        </Button>
      </a>
      <Button
        onClick={() => {
          whatIsRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll to What is the SingFit App section"
        className="text-lg font-semibold px-10 py-5 bg-white border border-[#002F6C] text-[#002F6C] hover:bg-[#eaf2f8] transition-all duration-200 ease-in-out"
      >
        Learn About the App ↓
      </Button>
    </div>
  </div>

  {/* Right Column */}
  <div className="flex flex-col items-end justify-between h-full pt-2">
    {/* AARP Logo */}
    <img
      src="/aarp-logo.png"
      alt="AARP logo"
      className="h-10 w-auto mb-2 self-end mt-[5px]"
    />

    {/* Image */}
    <div className="w-full rounded-xl overflow-hidden shadow-xl mt-auto">
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        src="https://static.wixstatic.com/media/2b1376_b72d41ebdfdf4a5e8a0cf6da3721c52c~mv2.jpg"
        alt="Smiling older woman singing with caregiver in sunny living room"
        className="w-full object-cover rounded-xl min-h-[340px]"
      />
    </div>
  </div>
</section>

      {/* What is the SingFit App Section */}
      <section id="what-is-singfit" className="bg-white p-10 rounded-xl shadow-md space-y-6 text-center w-full mb-12">
        <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">What is the SingFit App?</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <p className="text-lg md:text-xl">
          The SingFit app uses guided singing sessions, voice prompted lyrics, and progress tracking to bring the benefits of singing into your daily routine; no musical background required.
        </p>
        <div className="text-center mb-4 w-full">
  <a href="https://www.singfit.com/aarp-non-member-pricing" target="_blank" rel="noopener noreferrer">
  <Button aria-label="Download the SingFit App" className="w-full sm:w-auto text-xl px-12 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"
>
    Get the SingFit App
  </Button>
</a>

</div>
        <p className="text-center text-lg font-bold underline decoration-[#FDD9C7] decoration-1 text-[#002F6C] tracking-wide mb-6">
          SingFit is Designed For:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 text-left pt-6 items-stretch">

          <div className="bg-[#FEF8F5] p-6 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col justify-start">
            <HeartHandshake strokeWidth={1.5} className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Caregivers & Their Loved Ones</h3>
            <p className="text-sm leading-relaxed text-gray-800">
              Whether you're caring for someone with dementia or simply want to add more connection into your daily routine, SingFit offers structure, joy, and a powerful way to engage through music.
            </p>
          </div>
          <div className="bg-[#FEF8F5] p-6 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col justify-start">
            <Brain strokeWidth={1.5} className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Older Adults Supporting Brain Health</h3>
            <p className="text-sm leading-relaxed text-gray-800">
              SingFit features engaging therapeutic music and guided singing activities that research has shown may improve mental sharpness, elevate mood, and maintain cognitive agility.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white p-10 rounded-xl shadow-md space-y-10 text-center mb-12">
        <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">How It Works</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {["Download the App", "Set your goal", "Begin your session", "Wrap up your session"].map((title, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, duration: 0.5 }} className="space-y-3 sm:space-y-4 hover:scale-105 transition-transform duration-200"
>
              <img src={`https://static.wixstatic.com/media/264616_${["2389c82006c446cca0f12db06a3d9000", "44e07472013845718269c789f125b619", "3804aa0322e047aa86b78c4f937e93d8", "7696ff978e7e4f8bad929d3739f6043a"][i]}~mv2.png`} alt={`Step ${i + 1}`} className="mx-auto w-full max-w-[140px] h-auto object-contain bg-white shadow-lg rounded-xl p-2 hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-700">{[
                "Log in and create your profile so we can customize your experience.",
                "Choose what you want to focus on for your session",
                "Follow on-screen instructions and sing along with the prompted lyrics",
                "Track your results with our simple before/after rating system"
              ][i]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why People Use SingFit Section */}
      <div className="text-center">
        <a href="https://www.singfit.com/aarp-non-member-pricing" target="_blank" rel="noopener noreferrer">
  <Button aria-label="Start using SingFit today" className="w-full sm:w-auto text-xl px-10 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200">
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

      <section id="why-people-use" className="bg-[#FEF8F5] p-10 rounded-xl shadow-md space-y-10 text-center mb-12">
  <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
    <span className="relative z-10">Why People Use SingFit</span>
    <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 max-w-6xl mx-auto">

    <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
      <HealtcareIcon className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-black mb-2">Increase engagement with your loved one</h3>
      <p className="text-sm text-gray-700">
        SingFit sessions are designed to provide structure and joy for family caregiver and participant.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
      <Brain02Icon className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-black mb-2">To aid with memory lapses or cognitive decline</h3>
      <p className="text-sm text-gray-700">
        Singing has been shown to activate the brain and may help support memory and attention.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
      <SustainableEnergyIcon className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-black mb-2">Elevate your emotional and mental wellbeing</h3>
      <p className="text-sm text-gray-700">
        Singing can help boost your mood and foster a sense of connection, especially on hard days.
      </p>
    </div>

  </div>
</section>


      {/* Science Behind SingFit Section */}
      <section className="bg-[#D1E4F0] p-10 rounded-xl shadow-md space-y-6 text-center mb-12">
        <h2 className="text-3xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">The Science Behind SingFit</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 max-w-5xl mx-auto text-left">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-2">Backed by Clinical Music Therapy</h3>
            <p className="text-sm text-gray-700">SingFit is grounded in clinical music therapy and neuroscience. Created by certified music therapists, it delivers guided singing sessions designed to exercise the whole brain and respiratory system.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-2">Personalized for Better Outcomes</h3>
            <p className="text-sm text-gray-700">SingFit uses personalized playlists and therapeutic algorithms customized to each user's age, goals, and health condition, which may provide more effective support for memory, mood, and communication.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="text-center">
       <a href="https://www.singfit.com/aarp-non-member-pricing" target="_blank" rel="noopener noreferrer">
  <Button aria-label="Start using SingFit today" className="text-xl px-12 py-4 min-h-[44px] bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200"

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
