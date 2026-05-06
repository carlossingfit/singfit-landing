import React from "react";

export default function CaregiverLandingPage() {
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";

  return (
    <main className="min-h-screen bg-white text-[#002E5D]">
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
            className="hidden rounded-full bg-[#F47534] px-6 py-3 text-base font-bold text-white shadow-sm transition hover:opacity-90 md:inline-block"
          >
            Get SingFit
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 pb-14 pt-6 md:px-10 md:pb-20 md:pt-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-[#F47534]/10 px-4 py-2 text-sm font-bold text-[#F47534]">
              Music support for everyday caregiving moments
            </p>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-[#002E5D] md:text-6xl">
              Make music easier to share with the person you care for.
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-slate-700">
              SingFit STUDIO Caregiver gives you simple, guided music experiences
              you can use at home to create moments of connection, familiarity,
              and joy.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={checkoutUrl}
                className="rounded-full bg-[#F47534] px-8 py-4 text-center text-lg font-bold text-white shadow-md transition hover:opacity-90"
              >
                Get SingFit STUDIO Caregiver
              </a>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Designed for caregivers. Easy to start. No music experience needed.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
            <div className="relative aspect-video w-full">
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
      </section>

      {/* Problem / Promise */}
      <section className="bg-[#F7FAFC] px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-5 text-3xl font-extrabold text-[#002E5D] md:text-4xl">
            Caregiving can feel hard. Music can help create a more natural way in.
          </h2>
          <p className="text-xl leading-relaxed text-slate-700">
            Familiar songs can bring comfort, spark conversation, and make shared
            time feel more personal. SingFit helps you use music in a simple,
            guided way without having to plan anything from scratch.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-3xl font-extrabold text-[#002E5D] md:text-4xl">
              Simple enough for everyday use.
            </h2>
            <p className="text-xl leading-relaxed text-slate-700">
              Open the app, choose a music experience, and follow along.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F47534] text-xl font-bold text-white">
                1
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#002E5D]">
                Choose a session
              </h3>
              <p className="text-lg leading-relaxed text-slate-700">
                Pick from guided music experiences designed for caregiving
                moments at home.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0377A3] text-xl font-bold text-white">
                2
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#002E5D]">
                Follow the prompts
              </h3>
              <p className="text-lg leading-relaxed text-slate-700">
                SingFit guides you through music, lyric cues, and simple
                participation.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0091C8] text-xl font-bold text-white">
                3
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#002E5D]">
                Share the moment
              </h3>
              <p className="text-lg leading-relaxed text-slate-700">
                Use music to create a shared experience that feels familiar,
                human, and easy to repeat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image / Benefits */}
      <section className="bg-[#002E5D] px-5 py-16 text-white md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/heroimage.jpg"
              alt="Caregiver and older adult enjoying music together"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-extrabold md:text-4xl">
              Built for caregivers who want a simple way to connect.
            </h2>

            <div className="space-y-5 text-lg leading-relaxed text-blue-50">
              <p>
                No need to be a singer. No need to build a playlist. No need to
                know where to begin.
              </p>
              <p>
                SingFit STUDIO Caregiver gives you a practical way to bring music
                into everyday care, using familiar songs and guided support.
              </p>
              <p>
                Whether you have a few minutes or more time together, the app is
                designed to make music easier to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-5 text-3xl font-extrabold text-[#002E5D] md:text-4xl">
            Made for family caregivers.
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-700">
            SingFit STUDIO Caregiver is for people caring for a loved one who
            want a simple, meaningful way to spend time together through music.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-[#F7FAFC] p-6 text-left">
              <h3 className="mb-2 text-xl font-bold">At home</h3>
              <p className="text-slate-700">
                Use it during quiet time, visits, routines, or shared moments.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7FAFC] p-6 text-left">
              <h3 className="mb-2 text-xl font-bold">Easy to follow</h3>
              <p className="text-slate-700">
                Guided sessions help you start without needing to plan ahead.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7FAFC] p-6 text-left">
              <h3 className="mb-2 text-xl font-bold">Music-centered</h3>
              <p className="text-slate-700">
                Built around songs, familiarity, participation, and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F47534] px-5 py-16 text-white md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">
            Bring more music into your caregiving moments.
          </h2>
          <p className="mb-8 text-xl leading-relaxed">
            Start using SingFit STUDIO Caregiver today.
          </p>

          <a
            href={checkoutUrl}
            className="inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-[#002E5D] shadow-md transition hover:opacity-90"
          >
            Get SingFit STUDIO Caregiver
          </a>
        </div>
      </section>
    </main>
  );
}