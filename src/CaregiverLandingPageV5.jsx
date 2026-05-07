import React from "react";

export default function CaregiverLandingPageV5() {
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#002E5D] antialiased">
      {/* Header */}
      <header className="px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[165px] md:w-[210px]"
          />

          <a
            href={checkoutUrl}
            className="hidden rounded-full bg-[#F47534] px-6 py-3 text-base font-bold text-white shadow-[0_12px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(244,117,52,0.34)] md:inline-block"
          >
            Get SingFit
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-6 md:px-10 md:pb-24 md:pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(0,145,200,0.10),transparent_32%),radial-gradient(circle_at_14%_78%,rgba(244,117,52,0.10),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#0377A3] shadow-sm">
              For caregivers supporting someone with memory loss
            </p>

            <h1 className="mb-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.05em] md:text-7xl">
              You’re not looking for a miracle. Just one good moment today.
            </h1>

            <p className="mb-5 max-w-2xl text-xl leading-relaxed text-slate-700 md:text-2xl">
              Dementia is hard. You’re showing up every day, even when it’s
              heavy.
            </p>

            <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-700">
              SingFit STUDIO Caregiver helps you use familiar music in a simple,
              guided way, right from your phone.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={checkoutUrl}
                className="rounded-full bg-[#F47534] px-8 py-4 text-center text-lg font-bold text-white shadow-[0_14px_34px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.36)]"
              >
                Get SingFit STUDIO Caregiver
              </a>

              <p className="text-sm font-semibold text-slate-600">
                Start in minutes. Cancel anytime.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["No training", "Guided step by step", "Use at home today"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#002E5D] shadow-sm"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[390px]">
            <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-[#F47534]/16 blur-2xl" />
            <div className="absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-[#0091C8]/16 blur-2xl" />

            <div className="relative rounded-[2.25rem] border border-slate-200 bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
              <div className="overflow-hidden rounded-[1.75rem] bg-white">
                <div className="relative aspect-[9/16] w-full">
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

            <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-bold text-[#002E5D]">
                One familiar song can help create a more connected moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Bridge */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-5xl border-y border-slate-200 py-12 text-center">
          <h2 className="mb-5 text-3xl font-black tracking-[-0.03em] md:text-5xl">
            Music gives you somewhere to begin.
          </h2>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-700">
            A song can bring a smile. A lyric can spark recognition. A few
            minutes of music can create a moment that feels more connected.
          </p>
        </div>
      </section>

      {/* Product Explanation */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              What it does
            </p>

            <h2 className="mb-5 text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
              Guided music sessions you can start in seconds.
            </h2>

            <p className="text-xl leading-relaxed text-slate-700">
              No searching for songs. No guessing what to do. Just press play
              and follow along.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.09)] md:p-9">
            <div className="space-y-6">
              {[
                {
                  title: "Familiar songs",
                  text: "Use music that feels recognizable, personal, and easy to share.",
                },
                {
                  title: "Lyrics and prompts",
                  text: "The app helps guide participation so you do not have to lead alone.",
                },
                {
                  title: "Built for home use",
                  text: "Use SingFit during visits, quiet time, routines, or whenever you want one good moment.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#F47534]" />
                  <div>
                    <h3 className="text-xl font-black tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-lg leading-relaxed text-slate-700">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
                How it works
              </p>

              <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Simple enough for today.
              </h2>
            </div>

            <a
              href={checkoutUrl}
              className="w-fit rounded-full bg-[#F47534] px-6 py-3 text-base font-bold text-white shadow-[0_10px_28px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5"
            >
              Start now
            </a>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 shadow-[0_22px_60px_rgba(15,23,42,0.08)] md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose a session",
                text: "Pick a guided music experience without creating a plan from scratch.",
              },
              {
                step: "02",
                title: "Follow the prompts",
                text: "Use lyrics, cues, and familiar songs to participate together.",
              },
              {
                step: "03",
                title: "Share the moment",
                text: "Let music create a simple, repeatable way to connect.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white p-7 md:p-8">
                <p className="mb-10 text-sm font-black text-[#F47534]">
                  {item.step}
                </p>
                <h3 className="mb-3 text-2xl font-black tracking-[-0.03em]">
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

      {/* Image Benefit */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-[0_26px_80px_rgba(15,23,42,0.09)] md:grid-cols-2 md:p-8">
          <div className="overflow-hidden rounded-[1.75rem]">
            <img
              src="/heroimage.jpg"
              alt="Caregiver and older adult enjoying music together"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-2 py-4 md:px-4">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              Why caregivers use it
            </p>

            <h2 className="mb-5 text-4xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
              When words are hard, music gives you somewhere to begin.
            </h2>

            <p className="mb-5 text-lg leading-relaxed text-slate-700">
              SingFit keeps the experience focused and easy, so you can spend
              less time preparing and more time sharing the moment.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
                <p className="font-bold">No music experience needed</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
                <p className="font-bold">Cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 text-7xl font-black leading-none text-[#F47534]/25">
            “
          </div>

          <p className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#002E5D] md:text-5xl">
            I hadn’t seen her smile like that in weeks. Then a song came on and
            she started singing every word.
          </p>

          <p className="mt-6 text-base font-bold text-slate-600">
            Family caregiver
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              Questions
            </p>

            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">
              Common caregiver concerns.
            </h2>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] md:p-9">
            <div className="divide-y divide-slate-200">
              {[
                {
                  q: "What if I’m not musical?",
                  a: "You don’t need to be. The app guides everything step by step.",
                },
                {
                  q: "What if they don’t respond?",
                  a: "Every day is different. SingFit gives you a simple way to try a familiar song and create space for a response, even a small one.",
                },
                {
                  q: "How long does it take?",
                  a: "You can start in seconds. Even a few minutes can create a more connected moment.",
                },
                {
                  q: "Am I locked into a long-term commitment?",
                  a: "No. You can cancel anytime.",
                },
              ].map((item) => (
                <div key={item.q} className="py-5 first:pt-0 last:pb-0">
                  <p className="text-lg font-black text-[#002E5D]">{item.q}</p>
                  <p className="mt-2 text-lg leading-relaxed text-slate-700">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-16 pt-4 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] bg-[#071F3F] shadow-[0_30px_80px_rgba(7,31,63,0.25)]">
          <div className="relative px-6 py-14 text-center text-white md:px-12 md:py-20">
            <div className="absolute left-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#F47534]/28 blur-3xl" />
            <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-[#0091C8]/22 blur-3xl" />

            <div className="relative">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
                Start today
              </p>

              <h2 className="mx-auto mb-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
                You don’t need to fix everything today.
              </h2>

              <p className="mb-8 text-xl leading-relaxed text-blue-50">
                Just create one good moment.
              </p>

              <a
                href={checkoutUrl}
                className="inline-block rounded-full bg-[#F47534] px-9 py-5 text-lg font-bold text-white shadow-[0_14px_34px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.36)]"
              >
                Start with SingFit Today
              </a>

              <p className="mt-4 text-sm text-blue-100">
                Start in minutes. Use it today. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}