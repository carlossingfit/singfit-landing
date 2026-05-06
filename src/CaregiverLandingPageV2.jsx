import React from "react";

export default function CaregiverLandingPageV2() {
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-[#002E5D]">
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
            className="hidden rounded-full bg-[#F47534] px-6 py-3 text-base font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:opacity-95 md:inline-block"
          >
            Get SingFit
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-4 md:px-10 md:pb-24 md:pt-8">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#F47534]/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#0091C8]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0377A3] shadow-sm ring-1 ring-slate-100">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F47534]" />
              Guided music moments for family caregivers
            </div>

            <h1 className="mb-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-[#002E5D] md:text-7xl">
              Turn familiar songs into meaningful moments.
            </h1>

            <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-700 md:text-2xl">
              SingFit STUDIO Caregiver helps you bring music into everyday care
              with simple guided sessions, familiar songs, and an easy way to
              connect.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={checkoutUrl}
                className="rounded-full bg-[#F47534] px-8 py-4 text-center text-lg font-extrabold text-white shadow-xl shadow-orange-200 transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Get SingFit STUDIO Caregiver
              </a>

              <span className="text-center text-sm font-semibold text-slate-500 sm:text-left">
                No music experience needed
              </span>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-sm font-bold text-[#F47534]">Simple</p>
                <p className="mt-1 text-sm text-slate-600">
                  Open the app and follow along.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-sm font-bold text-[#0377A3]">Familiar</p>
                <p className="mt-1 text-sm text-slate-600">
                  Built around songs people know.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-sm font-bold text-[#0091C8]">Repeatable</p>
                <p className="mt-1 text-sm text-slate-600">
                  Use it in everyday moments.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-3xl bg-[#F47534]" />
            <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-3xl bg-[#0091C8]" />

            <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl ring-1 ring-slate-100">
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

              <div className="grid gap-3 px-2 py-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F7FAFC] p-4">
                  <p className="text-sm font-extrabold text-[#002E5D]">
                    Guided sessions
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Prompts help you begin quickly.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFF3EC] p-4">
                  <p className="text-sm font-extrabold text-[#002E5D]">
                    Music-centered care
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Designed for shared time together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Bridge */}
      <section className="px-5 py-14 md:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#002E5D] px-6 py-12 text-center text-white shadow-xl md:px-14 md:py-16">
          <p className="mx-auto mb-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            Sometimes the easiest way to connect is through a song you both know.
          </p>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-blue-50 md:text-xl">
            SingFit gives caregivers a practical way to use music without having
            to choose songs, plan activities, or figure out what to say next.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <h2 className="text-4xl font-black leading-tight text-[#002E5D] md:text-5xl">
              A simple app for real caregiving moments.
            </h2>
            <p className="text-xl leading-relaxed text-slate-700">
              Each session is designed to be easy to start, easy to follow, and
              easy to repeat when you want to bring music into the day.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Choose a music moment",
                text: "Pick a guided session based on the kind of shared time you want to create.",
                color: "#F47534",
              },
              {
                number: "02",
                title: "Follow the cues",
                text: "The app provides music, lyrics, and simple prompts so you can participate together.",
                color: "#0377A3",
              },
              {
                number: "03",
                title: "Enjoy the connection",
                text: "Use familiar songs to create a warmer, more personal moment in the day.",
                color: "#0091C8",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className="mb-8 inline-flex rounded-full px-4 py-2 text-sm font-black text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.number}
                </div>
                <h3 className="mb-4 text-2xl font-black text-[#002E5D]">
                  {item.title}
                </h3>
                <p className="text-lg leading-relaxed text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Benefit Section */}
      <section className="bg-white px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="absolute -bottom-6 -left-6 hidden h-full w-full rounded-[2rem] bg-[#F47534]/15 md:block" />
            <img
              src="/heroimage.jpg"
              alt="Caregiver and older adult enjoying music together"
              className="relative rounded-[2rem] object-cover shadow-2xl"
            />
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              Why caregivers use SingFit
            </p>

            <h2 className="mb-6 text-4xl font-black leading-tight text-[#002E5D] md:text-5xl">
              Music gives you something easy to do together.
            </h2>

            <div className="space-y-5">
              {[
                "Helpful when conversation feels difficult to start.",
                "Easy to use during visits, routines, or quiet time at home.",
                "Built around participation, not performance.",
                "Designed to make music feel accessible for caregivers.",
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
              className="mt-8 inline-block rounded-full bg-[#F47534] px-8 py-4 text-lg font-extrabold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Start with SingFit
            </a>
          </div>
        </div>
      </section>

      {/* Included Section */}
      <section className="bg-[#F7FAFC] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-5 text-4xl font-black text-[#002E5D] md:text-5xl">
              Everything you need to begin.
            </h2>
            <p className="text-xl leading-relaxed text-slate-700">
              SingFit STUDIO Caregiver keeps the experience focused, simple, and
              easy to understand.
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
                className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100"
              >
                <div className="mx-auto mb-4 h-3 w-14 rounded-full bg-[#F47534]" />
                <p className="text-lg font-black text-[#002E5D]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-24">
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-[#002E5D] via-[#0377A3] to-[#0091C8]" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#F47534]/30 blur-2xl" />

        <div className="relative mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
            Bring more music into the moments you share.
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-blue-50">
            Start using SingFit STUDIO Caregiver and make music easier to share
            at home.
          </p>

          <a
            href={checkoutUrl}
            className="inline-block rounded-full bg-[#F47534] px-9 py-5 text-lg font-extrabold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:opacity-95"
          >
            Get SingFit STUDIO Caregiver
          </a>
        </div>
      </section>
    </main>
  );
}