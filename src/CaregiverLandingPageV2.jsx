import React from "react";

export default function CaregiverLandingPageV2() {
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";

  const PhoneMockup = ({ src, alt = "", className = "" }) => (
    <div
      className={`rounded-[2.4rem] border border-slate-200 bg-[#071F3F] p-2.5 shadow-[0_30px_80px_rgba(15,23,42,0.18)] ${className}`}
    >
      <div className="rounded-[2rem] bg-black p-1.5">
        <div className="overflow-hidden rounded-[1.65rem] bg-white">
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );

  const testimonials = [
    {
      quote: "During our first SingFit session, she sang 15 songs. She's really enjoying this.", 
      name: "Gabriella", 
      role: "Family caregiver",
    },
    {
      quote:
        "We laughed a lot during the SingFit session. He was a different person totally. I'm so grateful for these memories. I can’t wait to tell my kids to try this.",
      name: "Jeanne",
      role: "Family caregiver",
    },
    {
      quote:
        "He will say, 'I think I'm coming back.' He's feeling more like himself.",
      name: "Jan",
      role: "Family caregiver",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F9FC] text-[#062B49] antialiased">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[150px] md:w-[200px]"
          />

          <a
            href={checkoutUrl}
            className="rounded-full bg-[#F47534] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)] md:px-6"
          >
            Start One Good Moment
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(0,145,200,0.12),transparent_32%),radial-gradient(circle_at_12%_82%,rgba(244,117,52,0.10),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
          <div>
           
            <h1 className="max-w-5xl text-[3.2rem] font-black leading-[0.94] tracking-[-0.05em] md:text-[5rem] lg:text-[5.7rem]">
              Caregivers, one good moment can change the whole day.
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-700 md:text-2xl">
                SingFit gives you guided music sessions you can start in seconds: choose a
                session, press play, follow SingFit's Lyric Coach, and sing hit songs together
                from your phone.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={checkoutUrl}
                className="rounded-full bg-[#F47534] px-9 py-5 text-center text-lg font-bold text-white shadow-[0_18px_46px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(244,117,52,0.40)]"
              >
                Start One Good Moment Today
              </a>

              <p className="text-sm font-bold text-slate-600">
                Just $11.99/month. Cancel anytime.
              </p>
            </div>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {["1. Subscribe here", "2. Download the app", "3. Sign in and start"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-100/80 px-4 py-3"
                  >
                    <p className="text-center text-sm font-bold text-[#062B49]">
  {item}
</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Product Composition */}
          <div className="relative mx-auto h-[620px] w-full max-w-[590px]">
            <div className="absolute left-12 top-8 h-[420px] w-[420px] rounded-full bg-[#0091C8]/12 blur-3xl" />
            <div className="absolute bottom-12 right-8 h-[360px] w-[360px] rounded-full bg-[#F47534]/14 blur-3xl" />

            <PhoneMockup
              src="/studio-player-screen2.jpeg"
              alt="SingFit music player screen"
              className="absolute left-1/2 top-0 z-20 w-[285px] -translate-x-1/2"
            />

            <PhoneMockup
              src="/studio-home-screen2.jpeg"
              alt="SingFit home screen"
              className="absolute left-0 top-32 z-10 hidden w-[210px] rotate-[-8deg] opacity-95 md:block"
            />

            <PhoneMockup
              src="/studio-guided-screen.png"
              alt="SingFit guided session screen"
              className="absolute right-0 top-40 z-10 hidden w-[210px] rotate-[8deg] opacity-95 md:block"
            />

            <div className="absolute bottom-8 left-1/2 z-30 w-[min(92%,430px)] -translate-x-1/2 rounded-[2rem] border border-slate-200 bg-white/95 p-5 text-center shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
                How access works
              </p>
              <p className="mt-2 text-lg font-black leading-tight text-[#062B49]">
                Start your subscription, download the app, sign in, and begin
                your first guided music session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl border-y border-slate-200 py-12 md:py-14">
          <div className="grid gap-10 md:grid-cols-[0.88fr_1.12fr]">
            <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-6xl">
              You do not need the perfect plan.
            </h2>

            <div className="space-y-5 text-xl leading-relaxed text-slate-700">
              <p>
                Somtimes dementia can make everyday connection feel unpredictable.
                Sometimes conversation is hard. Sometimes nothing seems to land.
              </p>

              <p>
                Designed by music therapists, SingFit gives caregivers guided music sessions built for real moments of connection, comfort, and engagement at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle / Emotional Proof */}
<section className="px-5 py-10 md:px-10 md:py-14">
  <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
    {/* Video Card */}
    <div className="overflow-hidden rounded-[3rem] bg-white p-4 shadow-[0_34px_90px_rgba(15,23,42,0.10)]">
      <div className="relative aspect-video overflow-hidden rounded-[2rem]">
        <iframe
          src="https://player.vimeo.com/video/1194167243?h=0&title=0&byline=0&portrait=0"
          title="Caregiver sharing a SingFit music moment"
          className="absolute inset-0 h-full w-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>

    {/* Text Card */}
    <div className="flex flex-col justify-center rounded-[3rem] border border-slate-200 bg-white p-8 shadow-[0_34px_90px_rgba(15,23,42,0.09)] md:p-12">
      <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
        Why it matters
      </p>

      <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-5xl">
        When words are hard, music gives you somewhere to begin.
      </h2>

      <div className="mt-8 rounded-[2rem] border-l-4 border-[#F47534] bg-[#FFF7F2] px-6 py-6">
        <p className="text-xl font-semibold leading-relaxed text-[#062B49]">
          “SingFit gave us a simple way to connect through music, even on days
          when conversation felt harder.”
        </p>

        <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-[#F47534]">
          Laina
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Product Story */}
<section className="px-5 py-10 md:px-10 md:py-14">
  <div className="mx-auto max-w-7xl">
    <div className="mb-10 max-w-5xl">
      <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
        What SingFit gives you
      </p>

      <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
        A guided way to bring music into care.
      </h2>
    </div>

    <div className="grid gap-px overflow-hidden rounded-[2.75rem] border border-slate-200 bg-slate-200 shadow-[0_34px_90px_rgba(15,23,42,0.09)] md:grid-cols-2">
      {[
        {
          title: "Familiar songs",
          text: "Use music that feels recognizable, personal, and easy to share. Familiar songs can help create comfort and connection in moments that otherwise feel difficult. Even a few minutes together can shift the tone of the day.",
        },
        {
          title: "Simple prompts",
          text: "Lyrics and cues help guide participation so you are not leading alone. SingFit helps reduce the pressure of figuring out what to say or do next. Just press play and follow along together.",
        },
      ].map((item) => (
        <div key={item.title} className="bg-white p-8 md:p-10">
          <div className="mb-10 h-1.5 w-12 rounded-full bg-[#F47534]" />

          <h3 className="text-3xl font-black tracking-[-0.045em] md:text-4xl">
            {item.title}
          </h3>

          <p className="mt-5 text-lg leading-relaxed text-slate-700">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* App Screens Section */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-[#061D33] px-6 py-12 text-white shadow-[0_40px_110px_rgba(6,29,51,0.28)] md:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
                Inside the app
              </p>

              <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-6xl">
                Simple enough to open when the day is already hard.
              </h2>

              <p className="mt-6 text-xl leading-relaxed text-blue-50">
                Choose a session, follow the music, and let the app guide the
                next step.
              </p>
            </div>

            <div className="grid grid-cols-3 items-end gap-4">
              <PhoneMockup
                src="/studio-home-screen2.jpeg"
                alt="SingFit home screen"
                className="w-full translate-y-8"
              />
              <PhoneMockup
                src="/studio-player-screen2.jpeg"
                alt="SingFit music player screen"
                className="w-full"
              />
              <PhoneMockup
                src="/studio-guided-screen.png"
                alt="SingFit guided screen"
                className="w-full translate-y-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
                How it works
              </p>

              <h2 className="text-5xl font-black tracking-[-0.06em] md:text-7xl">
                Three simple steps.
              </h2>
            </div>

            <a
              href={checkoutUrl}
              className="w-fit rounded-full bg-[#F47534] px-7 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(244,117,52,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)]"
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
                text: "Use familiar songs and SingFit's Lyric Coach to easily participate together.",
              },
              {
                step: "03",
                title: "Share the moment",
                text: "Let the music create a natural way to connect.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_26px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(15,23,42,0.12)] md:p-10"
              >
                <p className="text-sm font-black tracking-[0.18em] text-[#F47534]">
                  {item.step}
                </p>
                <h3 className="mt-10 text-3xl font-black tracking-[-0.045em] md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Caregiver stories
            </p>

            <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
              Real moments caregivers remember.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="flex min-h-[360px] flex-col justify-between rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.09)]"
              >
                <div>
                  <div className="mb-6 text-6xl font-black leading-none text-[#F47534]/25">
                    “
                  </div>
                  <p className="text-xl font-black leading-snug tracking-[-0.035em] text-[#062B49]">
                    {item.quote}
                  </p>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-5">
                  <p className="font-black text-[#062B49]">{item.name}</p>
                  <p className="text-sm font-semibold text-slate-600">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Questions
            </p>

            <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
              Common caregiver concerns.
            </h2>
          </div>

          <div className="rounded-[2.75rem] border border-slate-200 bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.09)] md:p-10">
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
                  a: "You can start in seconds. Even a few minutes of singing can create more connection with your loved one.",
                },
                {
                  q: "Am I locked into a long-term commitment?",
                  a: "No. You can cancel anytime.",
                },
              ].map((item) => (
                <div key={item.q} className="py-5 first:pt-0 last:pb-0">
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
      <section className="px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[3.25rem] bg-[#061D33] shadow-[0_44px_120px_rgba(6,29,51,0.32)]">
          <div className="relative px-6 py-14 text-center text-white md:px-16 md:py-20">
            <div className="absolute left-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#F47534]/26 blur-3xl" />
            <div className="absolute bottom-[-140px] right-[-140px] h-96 w-96 rounded-full bg-[#0091C8]/23 blur-3xl" />

            <div className="relative">
              <p className="mb-6 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
                Start today
              </p>

              <h2 className="mx-auto max-w-6xl text-5xl font-black leading-[0.94] tracking-[-0.05em] md:text-8xl">
                Start with one good moment today.
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-xl leading-relaxed text-blue-50 md:text-2xl">
                Subscribe here. Download the app. Sign in and begin your first
                guided music session.
              </p>

              <a
                href={checkoutUrl}
                className="mt-10 inline-block rounded-full bg-[#F47534] px-10 py-5 text-lg font-bold text-white shadow-[0_18px_46px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(244,117,52,0.40)]"
              >
                Start One Good Moment Today
              </a>

              <p className="mt-5 text-sm font-semibold text-blue-100">
                Start in minutes. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
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
    </main>
  );
}