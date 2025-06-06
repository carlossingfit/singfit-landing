import { Button } from "./components/ui/button";
import { HeartHandshake, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function SingFitLandingPage() {
  return (
    <div className="flex flex-col gap-2 px-8 pt-0 pb-16 max-w-7xl mx-auto font-sans text-gray-900 text-xl md:text-2xl">
  <img
  src={`${process.env.PUBLIC_URL}/singfit-header-cropped.png`}
  alt="SingFit site header"
  className="w-full block align-top shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)]"
/>

  
  {/* Hero Section */}
<section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-[#EEF6FA] pt-0 pb-10 px-10 rounded-xl shadow-xl bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-repeat">        <div className="space-y-10">
         <h1 className="text-5xl font-extrabold text-black leading-tight">
  <span className="block">Boost Brain Health</span>
  <span className="block">Through the Power</span>
  <span className="block">of Music</span>
</h1>
          <p className="text-xl text-gray-900 leading-relaxed">
            Discover how SingFit helps you and your loved ones feel better through guided music sessions — start with free resources, try the app, or do both!
          </p>
          <div className="flex flex-row gap-4">
            <Button aria-label="Access free therapeutic music resources" className="text-lg px-10 py-5 bg-[#F47534] text-[#FFFFFF] hover:bg-[#d9652c] transition-all duration-200 ease-in-out">
              Get Free Therapeutic Music Resources
            </Button>
            <a href="#what-is-singfit" aria-label="Scroll to What is the SingFit App section">
              <Button
  className="text-lg font-semibold px-10 py-5 bg-white border border-[#002F6C] text-[#002F6C] hover:bg-[#eaf2f8] transition-all duration-200 ease-in-out"
>
  Learn About the App ↓
</Button>
            </a>
          </div>
        </div>
       <div className="flex flex-col items-end">
  <div className="mt-2 mb-2">
    <img src="/aarp-logo.png" alt="AARP logo" className="h-10 w-auto" />
  </div>

  <div className="w-full rounded-xl overflow-hidden shadow-xl mt-9">
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
      <section id="what-is-singfit" className="bg-white p-10 rounded-xl shadow-md space-y-6 text-center w-full">
        <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">What is the SingFit App?</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <p className="text-lg md:text-xl">
          The SingFit mobile app is a therapeutic music tool designed to support cognitive and emotional wellbeing. With guided sing-along sessions, prompted lyrics, and progress tracking, SingFit makes it easy to bring the benefits of music into your daily routine; no musical experience needed.
        </p>
        <div className="text-center mb-4">
  <Button aria-label="Download the SingFit App" className="text-xl px-12 py-6 bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200">
    Get the SingFit App
  </Button>
</div>
<p className="text-center text-lg font-bold underline decoration-[#FDD9C7] decoration-1 text-[#002F6C] tracking-wide mb-6">SingFit is Designed For:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-left pt-6">
          <div className="bg-[#FEF8F5] p-6 rounded-lg shadow hover:shadow-lg transition">
            <HeartHandshake className="h-12 w-12 text-[#F47534] mx-auto mb-4" />
<h3 className="font-semibold text-lg">Caregivers & Their Loved Ones</h3>
            <p className="text-sm leading-relaxed text-gray-800 leading-relaxed">
              Whether you're caring for someone with dementia or simply want to bring more connection into your routine, SingFit provides structure, joy, and a powerful way to engage through music.
            </p>
          </div>
          <div className="bg-[#FEF8F5] p-6 rounded-lg shadow hover:shadow-lg transition">
            <Brain className="h-12 w-12 text-[#F47534] mx-auto mb-2" />
<h3 className="font-semibold text-lg">Older Adults Supporting Brain Health</h3>
            <p className="text-sm text-gray-700">
              SingFit offers a fun, evidence-based way to stay sharp, elevate your mood, and maintain mental agility using the power of music and guided singing.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white p-10 rounded-xl shadow-md space-y-10 text-center">
        <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">How It Works</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {["Create your profile","Set your goal","Begin your session","Reflect on your session*"].map((title, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2, duration: 0.5 }} className="space-y-4 hover:scale-105 transition-transform duration-200">
              <img src={`https://static.wixstatic.com/media/264616_${["2389c82006c446cca0f12db06a3d9000","44e07472013845718269c789f125b619","3804aa0322e047aa86b78c4f937e93d8","7696ff978e7e4f8bad929d3739f6043a"][i]}~mv2.png`} alt={`Step ${i + 1}`} className="mx-auto w-full max-w-[140px] h-auto object-contain bg-white shadow-lg rounded-xl p-2 hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-700">{[
                "Tell us about yourself so we can customize your experience.",
                "This is what you will focus on in this session yadda yadda.*",
                "Follow step-by-steps instructions and sing along with the Lyric Coach*",
                "Track your progress over time to measure SingFit's impact."
              ][i]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why People Use SingFit Section */}

      {/* Mid-Page CTA Section */}
      <div className="text-center">
        <Button aria-label="Start using SingFit today" className="text-xl px-10 py-5 bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200">
          Experience the Benefits of SingFit
        </Button>
        <p className="text-sm mt-3 text-[#EC1300]">
          Only $8.39/month for AARP Members (30% Discount)
        </p>
      </div>

      <section id="why-people-use" className="bg-[#FEF8F5] p-10 rounded-xl shadow-md space-y-10 text-center">
  <h2 className="text-4xl font-bold text-[#F47534] relative inline-block">
    <span className="relative z-10">Why People Use SingFit</span>
    <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
  <img src="https://static.wixstatic.com/media/264616_4fdddb1004ae4cb1aa54da994d9f7c3b~mv2.png" alt="Engagement Icon" className="h-12 w-auto mb-2 mx-auto" />
  <h3 className="text-lg font-semibold text-black mb-2">To care for someone who’s hard to engage</h3>
      <p className="text-sm text-gray-700">SingFit sessions provide structure and joy for both people.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
  <img src="https://static.wixstatic.com/media/264616_bdc9b14448654d2686623cf00825e739~mv2.png" alt="Memory Icon" className="h-12 w-auto mb-2 mx-auto" />
  <h3 className="text-lg font-semibold text-black mb-2">Dealing with memory lapses or cognitive decline</h3>
      <p className="text-sm text-gray-700">Music engages the brain and helps boost memory and focus.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-200">
  <img src="https://static.wixstatic.com/media/264616_4ff8e218f1294e6eba2efc7485b70029~mv2.png" alt="Mood Icon" className="h-12 w-auto mb-2 mx-auto" />
  <h3 className="text-lg font-semibold text-black mb-2">Feeling down, anxious, or disconnected</h3>
      <p className="text-sm text-gray-700">Singing helps lift your mood and bring a sense of connection, especially on difficult days.</p>
    </div>
  </div>
</section>

      {/* The Science Behind SingFit Section */}
      <section className="bg-[#D1E4F0] p-10 rounded-xl shadow-md space-y-6 text-center">
        <h2 className="text-3xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">The Science Behind SingFit</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-2">Backed by Clinical Music Therapy</h3>
            <p className="text-sm text-gray-700">SingFit is grounded in clinical music therapy and neuroscience. Created by certified music therapists, it delivers guided singing sessions designed to actively stimulate both hemispheres of the brain.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-2">Personalized for Better Outcomes</h3>
            <p className="text-sm text-gray-700">Unlike passive listening, SingFit uses personalized playlists and therapeutic algorithms based on a user’s age, goals, and health conditions to promote memory, mood, and communication.</p>
          </div>
        </div>
      </section>

      {/* What Our Users Say Section */}
      <section className="bg-[#FAF6F2] p-10 rounded-xl shadow-md space-y-6 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#F47534] relative inline-block">
          <span className="relative z-10">What Our Users Say</span>
          <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FDD9C7] z-0 rounded"></span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
            <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="User Testimonial" allowFullScreen />
          </div>
          <div className="text-left space-y-2 max-w-md mx-auto">
            <p className="text-lg italic">"My mom lights up when she uses SingFit. It's her favorite part of the day!"</p>
            <p className="text-sm text-gray-700">— Linda, Caregiver from Los Angeles</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <div className="text-center">
        <Button aria-label="Start using SingFit today" className="text-xl px-10 py-5 bg-[#F47534] text-white hover:bg-[#d9652c] shadow-lg transition-all duration-200">
          Experience the Benefits of SingFit
        </Button>
        <p className="text-sm mt-2 text-[#EC1300]">
          Only $8.39/month for AARP Members (30% Discount)
        </p>
      </div>

    </div>
  );
}

