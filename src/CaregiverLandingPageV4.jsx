import React from "react";

export default function CaregiverLandingPageV4() {
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#002E5D] antialiased">
      {/* Header */}
      <header className="px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[170px] md:w-[210px]"
          />

          <a
            href={checkoutUrl}
            className="hidden rounded-full bg-[#F47534] px-6 py-3 text-base font-bold text-white shadow-[0_10px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(244,117,52,0.32)] md:inline-block"
          >
            Get SingFit
          </a>
        </div>
      </header>

      {/* Hero */}
<section className="relative overflow-hidden px-5 pb-14 pt-4 md:px-10 md:pb-20 md:pt-8">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,145,200,0.10),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(244,117,52,0.10),transparent_32%)]" />

  <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
    <div>
      <p className="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#0377A3] shadow-sm">
        For caregivers supporting someone with memory loss
      </p>

      <h1 className="mb-5 max-w-2xl text-4xl font-black leading-[1.04] tracking-[-0.04em] md:text-6xl">
        You’re not looking for a miracle. Just one good moment today.
      </h1>

      <p className="mb-5 max-w-xl text-xl leading-relaxed text-slate-700">
        Dementia is hard. You’re showing up every day, even when it’s heavy.
      </p>

      <p className="mb-7 max-w-xl text-xl leading-relaxed text-slate-700">
        SingFit STUDIO Caregiver helps you use familiar music in a simple,
        guided way, right from your phone.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={checkoutUrl}
          className="rounded-full bg-[#F47534] px-8 py-4 text-center text-lg font-bold text-white shadow-[0_12px_32px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(244,117,52,0.36)]"
        >
          Get SingFit STUDIO Caregiver
        </a>

        <p className="text-sm font-semibold text-slate-600">
          Cancel anytime
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
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#F47534]/20 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#0091C8]/20 blur-2xl" />

      <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
        <div className="overflow-hidden rounded-[1.5rem] bg-white">
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

      <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
        <p className="text-sm font-bold text-[#002E5D]">
          One familiar song can help create a more connected moment.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Emotional Bridge */}
      <section className="px-5 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-7 text-center shadow-[0_20px_60px_rgba(15,23,42,0.07)] md:p-10">
          <h2 className="mb-4 text-3xl font-black tracking-[-0.03em] md:text-5xl">
            One familiar song can open the door.
          </h2>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-700">
            A song can bring a smile. A lyric can spark recognition. A few
            minutes of music can create a moment that feels more connected.
          </p>
        </div>
      </section>

      {/* Testimonial + What It Is */}
      <section className="px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-9">
            <div className="mb-4 text-6xl font-black leading-none text-[#F47534]/25">
              “
            </div>

            <p className="mb-5 text-2xl font-bold leading-relaxed tracking-[-0.02em] text-[#002E5D]">
              I hadn’t seen her smile like that in weeks. Then a song came on and
              she started singing every word.
            </p>

            <p className="text-base font-semibold text-slate-600">
              Family caregiver
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-9">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              What it does
            </p>

            <h2 className="mb-5 text-3xl font-black leading-tight tracking-[-0.03em] md:text-4xl">
              SingFit was built for exactly this.
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-slate-700">
              <p>
                SingFit STUDIO Caregiver gives you guided music sessions you can
                start in seconds.
              </p>
              <p>
                No searching for songs. No guessing what to do. Just press play
                and follow along.
              </p>
              <p>
                The app brings together familiar songs, lyrics, and gentle prompts
                so you can share music without having to plan the moment yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-12 md:px-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              How it works
            </p>

            <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] md:text-5xl">
              Simple enough for today.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
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
              <div
                key={item.step}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(15,23,42,0.11)]"
              >
                <p className="mb-4 text-sm font-black text-[#F47534]">
                  {item.step}
                </p>
                <h3 className="mb-3 text-2xl font-bold tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="text-lg leading-relaxed text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white px-6 py-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:px-10">
            <p className="mb-4 text-xl font-bold">
              Start with one song today.
            </p>
            <a
              href={checkoutUrl}
              className="inline-block rounded-full bg-[#F47534] px-7 py-3 text-base font-bold text-white shadow-[0_10px_28px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(244,117,52,0.32)]"
            >
              Get SingFit STUDIO Caregiver
            </a>
          </div>
        </div>
      </section>

      {/* Image / Benefits */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full rounded-[2rem] bg-[#0377A3]/10" />
            <img
              src="/heroimage.jpg"
              alt="Caregiver and older adult enjoying music together"
              className="relative rounded-[2rem] object-cover shadow-[0_28px_70px_rgba(15,23,42,0.18)]"
            />
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-9">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
              Why caregivers use it
            </p>

            <h2 className="mb-5 text-3xl font-black leading-tight tracking-[-0.03em] md:text-5xl">
              When words are hard, music gives you somewhere to begin.
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-slate-700">
              <p>
                Use it during quiet time, visits, daily routines, or moments when
                you want something meaningful to do together.
              </p>

              <p>
                SingFit keeps the experience focused and easy, so you can spend
                less time preparing and more time sharing the moment.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

      {/* Questions */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-10">
          <h2 className="mb-6 text-3xl font-black tracking-[-0.03em] md:text-4xl">
            Common questions caregivers have
          </h2>

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
              <div key={item.q} className="py-4">
                <p className="font-bold text-[#002E5D]">{item.q}</p>
                <p className="mt-2 text-lg leading-relaxed text-slate-700">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-14 pt-4 md:px-10 md:pb-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#071F3F] shadow-[0_28px_80px_rgba(7,31,63,0.25)]">
          <div className="relative px-6 py-12 text-center text-white md:px-12 md:py-16">
            <div className="absolute left-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#F47534]/28 blur-3xl" />
            <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-[#0091C8]/22 blur-3xl" />

            <div className="relative">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
                Start today
              </p>

              <h2 className="mb-5 text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
                You don’t need to fix everything today.
              </h2>

              <p className="mb-7 text-xl leading-relaxed text-blue-50">
                Just create one good moment.
              </p>

              <a
                href={checkoutUrl}
                className="inline-block rounded-full bg-[#F47534] px-9 py-5 text-lg font-bold text-white shadow-[0_12px_34px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(244,117,52,0.36)]"
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