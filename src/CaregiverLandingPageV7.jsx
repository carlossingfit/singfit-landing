import React from "react";

export default function CaregiverLandingPageV7() {
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";

  const Pill = ({ children }) => (
    <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-black text-[#062B49] shadow-sm">
      {children}
    </span>
  );

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#062B49] antialiased">
      {/* Header */}
      <header className="px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[158px] md:w-[205px]"
          />

          <a
            href={checkoutUrl}
            className="hidden rounded-full bg-[#F47534] px-6 py-3 text-sm font-black text-white shadow-md md:inline-flex"
          >
            Start Today
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-5 pt-6 pb-12 md:px-10 md:pt-10 md:pb-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(0,145,200,0.12),transparent_30%),radial-gradient(circle_at_8%_74%,rgba(244,117,52,0.10),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-[#0377A3]">
              For family caregivers supporting someone with memory loss
            </p>

            <h1 className="text-[3rem] md:text-[5.5rem] font-black leading-[0.95] tracking-[-0.07em]">
              One good moment can change the whole day.
            </h1>

            <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-slate-700">
              SingFit STUDIO Caregiver helps you use familiar songs, lyric cues,
              and guided music moments to connect when words feel hard.
            </p>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={checkoutUrl}
                className="rounded-full bg-[#F47534] px-8 py-4 text-lg font-black text-white"
              >
                Get SingFit STUDIO Caregiver
              </a>

              <p className="text-sm font-bold text-slate-600">
                Start in minutes. Cancel anytime.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Pill>No training</Pill>
              <Pill>Guided sessions</Pill>
              <Pill>Use at home</Pill>
            </div>
          </div>

          {/* PHONE */}
          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="relative rounded-[3rem] border border-slate-300 bg-[#061D33] p-3 shadow-xl">
              <div className="rounded-[2.4rem] bg-black p-2">
                <div className="overflow-hidden rounded-[2rem] bg-white">
                  <div className="relative aspect-[9/16] w-full">
                    <iframe
                      src="https://player.vimeo.com/video/1175592420?h=b5ad0b8108&title=0&byline=0&portrait=0"
                      title="SingFit"
                      className="absolute left-0 top-0 h-full w-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="px-5 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl border-y border-slate-200 py-10 grid md:grid-cols-2 gap-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-[-0.05em]">
            You do not need the perfect plan.
          </h2>

          <div className="space-y-4 text-lg text-slate-700">
            <p>
              Dementia can make connection feel unpredictable. Sometimes nothing
              seems to land.
            </p>
            <p>
              Music gives you another way in. SingFit makes that easier to use,
              in real caregiving moments.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section className="px-5 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-[-0.05em]">
            A guided way to bring music into care.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden">
            {[
              {
                title: "Familiar songs",
                text: "Music that feels recognizable and easy to share.",
              },
              {
                title: "Simple prompts",
                text: "Lyrics and cues guide the experience.",
              },
              {
                title: "Everyday use",
                text: "Use during visits, routines, or difficult moments.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6">
                <div className="h-1 w-10 bg-[#F47534] mb-6" />
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE */}
      <section className="px-5 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/heroimage.jpg"
            alt=""
            className="rounded-3xl w-full object-cover"
          />

          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.05em]">
              When words are hard, music helps you begin.
            </h2>

            <p className="mt-4 text-lg text-slate-700">
              A familiar song creates a shared place to start. Just a few minutes
              together, supported by music.
            </p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="px-5 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-[-0.05em]">
            Three simple steps.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Choose",
                text: "Pick a guided session.",
              },
              {
                title: "Follow",
                text: "Use songs and prompts.",
              },
              {
                title: "Connect",
                text: "Share a moment together.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="border border-slate-200 rounded-2xl p-6"
              >
                <p className="text-sm font-black text-[#F47534]">
                  0{i + 1}
                </p>
                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="px-5 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-2xl md:text-4xl font-black tracking-[-0.05em]">
            “I hadn’t seen her smile in weeks. Then a song came on… and she
            sang.”
          </p>
          <p className="mt-4 text-sm text-slate-600">Family caregiver</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pt-8 pb-14 md:px-10 md:pb-18">
        <div className="mx-auto max-w-6xl bg-[#062B49] text-white rounded-3xl text-center py-12 px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-[-0.05em]">
            Start with one good moment today.
          </h2>

          <a
            href={checkoutUrl}
            className="inline-block mt-6 bg-[#F47534] px-8 py-4 rounded-full font-black"
          >
            Get SingFit STUDIO Caregiver
          </a>

          <p className="mt-4 text-sm text-blue-100">
            Start in minutes. Cancel anytime.
          </p>
        </div>
      </section>
    </main>
  );
}