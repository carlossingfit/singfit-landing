import React from "react";

export default function CaregiverLandingPageV6() {
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";

  return (
    <main className="min-h-screen bg-[#F7F9FB] text-[#062B49] antialiased">
      {/* Header */}
      <header className="relative z-20 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[160px] md:w-[205px]"
          />

          <a
            href={checkoutUrl}
            className="hidden rounded-full bg-[#F47534] px-6 py-3 text-sm font-black text-white shadow-[0_14px_36px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_46px_rgba(244,117,52,0.36)] md:inline-flex"
          >
            Get SingFit
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-8 md:px-10 md:pb-28 md:pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(0,145,200,0.13),transparent_31%),radial-gradient(circle_at_16%_86%,rgba(244,117,52,0.12),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-black text-[#0377A3] shadow-sm backdrop-blur">
              For family caregivers supporting someone with memory loss
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.065em] text-[#062B49] md:text-7xl lg:text-8xl">
              One good moment can change the whole day.
            </h1>

            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-slate-700 md:text-2xl">
              SingFit STUDIO Caregiver helps you use familiar songs, lyric cues,
              and guided music moments to connect when words feel hard.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={checkoutUrl}
                className="rounded-full bg-[#F47534] px-9 py-5 text-center text-lg font-black text-white shadow-[0_16px_42px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_52px_rgba(244,117,52,0.40)]"
              >
                Start with SingFit Today
              </a>

              <p className="text-sm font-bold text-slate-600">
                Start in minutes. Cancel anytime.
              </p>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {["No training", "Guided sessions", "Use at home"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur"
                >
                  <p className="text-sm font-black text-[#062B49]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Object */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute left-[-55px] top-16 h-44 w-44 rounded-full bg-[#0091C8]/18 blur-3xl" />
            <div className="absolute bottom-10 right-[-50px] h-48 w-48 rounded-full bg-[#F47534]/18 blur-3xl" />

            <div className="relative mx-auto w-[285px] rounded-[3rem] border border-slate-200 bg-[#071F3F] p-3 shadow-[0_38px_90px_rgba(7,31,63,0.30)]">
              <div className="rounded-[2.45rem] bg-black p-2">
                <div className="overflow-hidden rounded-[2rem] bg-white">
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
            </div>

            <div className="absolute -left-4 top-12 hidden w-48 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_22px_55px_rgba(15,23,42,0.12)] md:block">
              <p className="text-sm font-black text-[#F47534]">01</p>
              <p className="mt-2 text-sm font-black leading-snug text-[#062B49]">
                Press play and follow along.
              </p>
            </div>

            <div className="absolute -right-4 bottom-16 hidden w-52 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_22px_55px_rgba(15,23,42,0.12)] md:block">
              <p className="text-sm font-black text-[#0377A3]">02</p>
              <p className="mt-2 text-sm font-black leading-snug text-[#062B49]">
                Share a familiar song together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-y border-slate-200 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
            <h2 className="text-4xl font-black leading-tight tracking-[-0.045em] md:text-6xl">
              You do not need to create the perfect moment.
            </h2>

            <div className="space-y-6 text-xl leading-relaxed text-slate-700">
              <p>
                Dementia can make everyday connection feel unpredictable.
                Sometimes conversation is hard. Sometimes nothing seems to land.
              </p>
              <p>
                Music gives you another way in. SingFit makes that way easier to
                use, with guided sessions designed for real caregiving moments at
                home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product System */}
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#F47534]">
              What SingFit gives you
            </p>

            <h2 className="text-4xl font-black leading-tight tracking-[-0.045em] md:text-6xl">
              A guided way to bring music into care.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:grid-cols-3">
            {[
              {
                title: "Familiar songs",
                text: "Use music that feels recognizable, personal, and easy to share.",
              },
              {
                title: "Simple prompts",
                text: "Lyrics and cues help guide participation so you are not leading alone.",
              },
              {
                title: "Everyday use",
                text: "Start a session during quiet time, a visit, a routine, or one difficult moment.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 md:p-10">
                <div className="mb-10 h-1.5 w-12 rounded-full bg-[#F47534]" />
                <h3 className="mb-4 text-3xl font-black tracking-[-0.04em]">
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

      {/* Human Section */}
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2.75rem] border border-slate-200 bg-white p-5 shadow-[0_34px_90px_rgba(15,23,42,0.09)] md:grid-cols-[0.95fr_1.05fr] md:p-8">
          <div className="overflow-hidden rounded-[2.15rem]">
            <img
              src="/heroimage.jpg"
              alt="Caregiver and older adult enjoying music together"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-3 py-6 md:px-8 md:py-8">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#F47534]">
              Why it matters
            </p>

            <h2 className="text-4xl font-black leading-tight tracking-[-0.045em] md:text-6xl">
              When words are hard, music gives you somewhere to begin.
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-slate-700">
              A familiar song can create a shared place to start. Not a task.
              Not a performance. Just a few minutes together, supported by music.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6">
                <p className="text-lg font-black">No music experience needed</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6">
                <p className="text-lg font-black">Cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#F47534]">
                How it works
              </p>

              <h2 className="text-4xl font-black tracking-[-0.045em] md:text-6xl">
                Three simple steps.
              </h2>
            </div>

            <a
              href={checkoutUrl}
              className="w-fit rounded-full bg-[#F47534] px-7 py-4 text-base font-black text-white shadow-[0_14px_34px_rgba(244,117,52,0.26)] transition hover:-translate-y-0.5"
            >
              Start today
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose a session",
                text: "Pick a guided music experience without planning anything yourself.",
              },
              {
                step: "02",
                title: "Follow along",
                text: "Use songs, lyrics, and simple cues to participate together.",
              },
              {
                step: "03",
                title: "Share the moment",
                text: "Let the music create a natural way to connect.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_24px_64px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_34px_80px_rgba(15,23,42,0.11)]"
              >
                <p className="text-sm font-black text-[#F47534]">
                  {item.step}
                </p>
                <h3 className="mt-10 text-3xl font-black tracking-[-0.04em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl rounded-[2.75rem] bg-[#071F3F] px-6 py-14 text-center text-white shadow-[0_34px_90px_rgba(7,31,63,0.24)] md:px-16 md:py-20">
          <div className="mx-auto mb-8 h-1.5 w-14 rounded-full bg-[#F47534]" />

          <p className="mx-auto max-w-4xl text-3xl font-black leading-tight tracking-[-0.045em] md:text-6xl">
            “I hadn’t seen her smile like that in weeks. Then a song came on and
            she started singing every word.”
          </p>

          <p className="mt-7 text-base font-bold text-blue-100">
            Family caregiver
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#F47534]">
              Questions
            </p>

            <h2 className="text-4xl font-black leading-tight tracking-[-0.045em] md:text-6xl">
              Common caregiver concerns.
            </h2>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-[0_28px_80px_rgba(15,23,42,0.08)] md:p-10">
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
                <div key={item.q} className="py-6 first:pt-0 last:pb-0">
                  <p className="text-xl font-black tracking-[-0.025em]">
                    {item.q}
                  </p>
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
      <section className="px-5 pb-20 pt-8 md:px-10 md:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#062B49] shadow-[0_38px_100px_rgba(6,43,73,0.28)]">
          <div className="relative px-6 py-16 text-center text-white md:px-16 md:py-24">
            <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#F47534]/28 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-[#0091C8]/24 blur-3xl" />

            <div className="relative">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-[#F47534]">
                Start today
              </p>

              <h2 className="mx-auto max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
                You do not need to fix everything today.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-blue-50">
                Just create one good moment.
              </p>

              <a
                href={checkoutUrl}
                className="mt-9 inline-block rounded-full bg-[#F47534] px-10 py-5 text-lg font-black text-white shadow-[0_16px_42px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(244,117,52,0.40)]"
              >
                Get SingFit STUDIO Caregiver
              </a>

              <p className="mt-5 text-sm font-semibold text-blue-100">
                Start in minutes. Use it today. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}