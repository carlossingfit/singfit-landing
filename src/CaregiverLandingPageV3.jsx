import React from "react";

export default function CaregiverLandingPageV3() {
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";

  return (
    <main className="min-h-screen bg-[#FFF6EF] text-[#002E5D]">
      {/* Header */}
      <header className="relative z-20 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[165px] md:w-[215px]"
          />

          <a
            href={checkoutUrl}
            className="hidden rounded-full bg-[#F47534] px-6 py-3 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-95 md:inline-block"
          >
            Get SingFit
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF6EF] via-[#E8F7FB] to-[#FFE9DB] px-5 pb-16 pt-4 md:px-10 md:pb-24 md:pt-8">
        <div className="absolute right-[-120px] top-[-80px] h-[360px] w-[360px] rounded-full bg-[#F47534]/25 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-120px] h-[360px] w-[360px] rounded-full bg-[#0091C8]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-white px-5 py-2 text-sm font-black text-[#0377A3] shadow-sm">
              Guided music support for family caregivers
            </p>

            <h1 className="mb-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Make caregiving moments feel more connected.
            </h1>

            <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-700 md:text-2xl">
              SingFit STUDIO Caregiver helps you bring familiar songs into
              everyday care with simple guided music experiences you can use at
              home.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={checkoutUrl}
                className="rounded-full bg-[#F47534] px-8 py-4 text-center text-lg font-extrabold text-white shadow-xl transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Get SingFit STUDIO Caregiver
              </a>

              <span className="text-center text-sm font-bold text-slate-600 sm:text-left">
                No singing skill or planning required
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-[2rem] bg-[#F47534]" />
            <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-[2rem] bg-[#0377A3]" />

            <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[1.5rem]">
                <div className="relative aspect-video w-full bg-slate-100">
                  <iframe
                    src="https://player.vimeo.com/video/1175592420?h=b5ad0b8108&title=0&byline=0&portrait=0"
                    title="SingFit STUDIO Caregiver video"
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
      </section>

      {/* Strong Blue Band */}
      <section className="bg-[#002E5D] px-5 py-16 text-white md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              Why music
            </p>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Familiar songs can make shared time feel easier.
            </h2>
          </div>

          <div className="rounded-[2rem] bg-white/10 p-8 backdrop-blur">
            <p className="text-xl leading-relaxed text-blue-50">
              Music gives caregivers a simple way to create moments of
              familiarity, participation, and connection. SingFit makes that
              easier by guiding the experience from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* Three Cards */}
      <section className="bg-[#EAF7FB] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-4xl font-black leading-tight md:text-5xl">
              Built for real life at home.
            </h2>
            <p className="text-xl leading-relaxed text-slate-700">
              Simple, guided music sessions you can use during visits, routines,
              quiet time, or whenever you want a shared activity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-8 shadow-xl">
              <div className="mb-6 h-3 w-16 rounded-full bg-[#F47534]" />
              <h3 className="mb-3 text-2xl font-black">Choose a session</h3>
              <p className="text-lg leading-relaxed text-slate-700">
                Pick a guided music experience without having to create a plan
                from scratch.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-xl">
              <div className="mb-6 h-3 w-16 rounded-full bg-[#0377A3]" />
              <h3 className="mb-3 text-2xl font-black">Follow the prompts</h3>
              <p className="text-lg leading-relaxed text-slate-700">
                Use simple cues, lyrics, and familiar songs to participate
                together.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-xl">
              <div className="mb-6 h-3 w-16 rounded-full bg-[#0091C8]" />
              <h3 className="mb-3 text-2xl font-black">Share the moment</h3>
              <p className="text-lg leading-relaxed text-slate-700">
                Bring music into the day in a way that feels natural,
                repeatable, and human.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Split Visual Section */}
      <section className="relative overflow-hidden bg-[#FFF6EF] px-5 py-16 md:px-10 md:py-24">
        <div className="absolute left-0 top-0 hidden h-full w-1/2 bg-[#002E5D] md:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <img
              src="/heroimage.jpg"
              alt="Caregiver and older adult enjoying music together"
              className="rounded-[2rem] object-cover shadow-2xl"
            />
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl md:p-10">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              Why caregivers use it
            </p>

            <h2 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
              An easier way to begin.
            </h2>

            <div className="space-y-5">
              {[
                "Use music when conversation is hard to start.",
                "Create a shared activity without needing to prepare.",
                "Follow guided sessions that are simple and approachable.",
                "Bring familiar songs into everyday caregiving moments.",
              ].map((text) => (
                <div key={text} className="flex gap-4">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F47534] text-sm font-black text-white">
                    ✓
                  </div>
                  <p className="text-lg leading-relaxed text-slate-700">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={checkoutUrl}
              className="mt-8 inline-block rounded-full bg-[#F47534] px-8 py-4 text-lg font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Start with SingFit
            </a>
          </div>
        </div>
      </section>

      {/* Orange Section */}
      <section className="bg-[#F47534] px-5 py-16 text-white md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Everything is designed to keep it simple.
            </h2>
            <p className="text-xl leading-relaxed text-orange-50">
              SingFit focuses the experience around guided music, familiar songs,
              and easy participation.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {[
              "Guided music sessions",
              "Familiar song experiences",
              "Simple lyric support",
              "Easy at-home use",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] bg-white p-6 text-[#002E5D] shadow-xl"
              >
                <p className="text-xl font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002E5D] via-[#0377A3] to-[#0091C8] px-5 py-20 text-white md:px-10 md:py-28">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#F47534]/35 blur-2xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
            Bring more music into the moments you share.
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-blue-50">
            Start using SingFit STUDIO Caregiver and make music easier to share
            at home.
          </p>

          <a
            href={checkoutUrl}
            className="inline-block rounded-full bg-[#F47534] px-9 py-5 text-lg font-extrabold text-white shadow-xl transition hover:-translate-y-0.5 hover:opacity-95"
          >
            Get SingFit STUDIO Caregiver
          </a>
        </div>
      </section>
    </main>
  );
}