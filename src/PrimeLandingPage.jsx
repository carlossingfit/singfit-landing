import React, { useState } from "react";

export default function PrimeLandingPage() {
  const [formStatus, setFormStatus] = useState("idle");

  const scrollToDemoForm = () => {
    const formSection = document.getElementById("prime-demo-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/prime-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setFormStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      setFormStatus("error");
    }
  };

  const trustStats = [
    { value: "900+", label: "Communities using SingFit" },
    { value: "2,800+", label: "SingFit Certified Facilitators" },
    { value: "57,000+", label: "Older adults singing" },
  ];

  const benefits = [
    {
      title: "Structured programming staff can run",
      text: "PRIME gives your team ready-to-use group sessions with music, trivia, movement, and facilitation support built in.",
    },
    {
      title: "Designed for consistent participation",
      text: "Sessions are built around familiar songs and simple prompts that help residents take part, even when groups include mixed abilities.",
    },
    {
      title: "A premium experience without heavy lift",
      text: "Your community gets the app, playlist booklets, training, props, and support needed to run music engagement more consistently.",
    },
  ];

  const sessionSteps = [
    {
      step: "01",
      title: "Choose a session",
      text: "Select a ready-made music session designed for senior living groups.",
    },
    {
      step: "02",
      title: "Lead with confidence",
      text: "Staff follow guided content, lyric cues, trivia, movements, and simple prompts.",
    },
    {
      step: "03",
      title: "Create visible participation",
      text: "Residents sing, move, reminisce, and take part in a shared group experience.",
    },
  ];

  const toolkitItems = [
    {
      title: "PRIME App and Music Library",
      text: "Hundreds of playlists tailored for older adults, with familiar songs and lyric coaching built into each session.",
    },
    {
      title: "Quarterly Playlist Booklets",
      text: "Scripted booklets include music, trivia, movements, and activity prompts to keep programming fresh.",
    },
    {
      title: "Online Training",
      text: "Training helps current and new staff learn how to facilitate PRIME sessions without needing a musical background.",
    },
    {
      title: "Toolkit and Support",
      text: "Props, speakers, printed materials, and customer support help your team make sessions feel complete and easy to run.",
    },
  ];

  const testimonials = [
    {
      quote:
        "From the first song you’re seeing the engagement, and it keeps building. As they walk out, they’re all talking to each other.",
      name: "Pam M.",
      role: "Activities Director",
    },
    {
      quote:
        "Residents who hardly talk will sing along to songs with SingFit.",
      name: "Chris S.",
      role: "Life Enrichment Director",
    },
    {
      quote:
        "Our residents love SingFit. I end up extending SingFit longer than planned. It is amazing to watch the residents become involved.",
      name: "Vanessa King Love",
      role: "Life Enrichment Director",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F9FC] text-[#062B49] antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[150px] md:w-[200px]"
          />

          <button
            type="button"
            onClick={scrollToDemoForm}
            className="rounded-full bg-[#F47534] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)] md:px-6"
          >
            Schedule a PRIME Demo
          </button>
        </div>
      </header>

      <section className="relative px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(0,145,200,0.12),transparent_32%),radial-gradient(circle_at_12%_82%,rgba(244,117,52,0.10),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-[#0377A3] shadow-sm">
              For senior living communities
            </p>

            <h1 className="max-w-5xl text-[3.1rem] font-black leading-[0.94] tracking-[-0.075em] md:text-[5.5rem] lg:text-[6.6rem]">
              A turnkey music program your team can run consistently.
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-700 md:text-2xl">
              SingFit PRIME helps senior living teams lead engaging group music
              sessions with ready-to-use playlists, scripted booklets, training,
              and a complete toolkit built for resident participation.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={scrollToDemoForm}
                className="rounded-full bg-[#F47534] px-9 py-5 text-center text-lg font-bold text-white shadow-[0_18px_46px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(244,117,52,0.40)]"
              >
                Schedule a PRIME Demo
              </button>

              <p className="text-sm font-bold text-slate-600">
                Built for activity, memory care, and wellness teams.
              </p>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {trustStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
                >
                  <p className="text-2xl font-black tracking-[-0.04em] text-[#062B49]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute left-8 top-8 h-[420px] w-[420px] rounded-full bg-[#0091C8]/12 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#F47534]/14 blur-3xl" />

            <div className="relative overflow-hidden rounded-[3rem] border border-white bg-white p-3 shadow-[0_34px_100px_rgba(15,23,42,0.16)]">
              <img
                src="/jessiewithgroup.jpg"
                alt="SingFit PRIME group music session in a senior living community"
                className="h-[520px] w-full rounded-[2.4rem] object-cover"
              />

              <div className="absolute bottom-8 left-8 right-8 rounded-[2rem] border border-white/60 bg-white/92 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
                  Staff-led group sessions
                </p>
                <p className="mt-2 text-xl font-black leading-tight tracking-[-0.03em] text-[#062B49]">
                  Music, movement, trivia, and participation in one repeatable
                  program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-slate-200 bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.08)] md:p-10">
          <p className="mb-4 text-center text-sm font-black uppercase tracking-[0.22em] text-slate-500">
            Trusted by senior living teams
          </p>

          <div className="grid gap-4 md:grid-cols-4">
            {["Logo Placeholder", "Logo Placeholder", "Logo Placeholder", "Logo Placeholder"].map(
              (item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-[#F7F9FC] text-sm font-black uppercase tracking-[0.16em] text-slate-400"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Why PRIME
            </p>

            <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
              Better group programming without adding complexity.
            </h2>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-700">
              PRIME is designed for communities that want higher-quality resident
              engagement, but need something staff can actually run week after
              week.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_26px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(15,23,42,0.12)] md:p-10"
              >
                <h3 className="text-3xl font-black leading-tight tracking-[-0.045em]">
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

      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between rounded-[3rem] bg-[#061D33] p-8 text-white shadow-[0_34px_100px_rgba(6,29,51,0.22)] md:p-10">
            <div>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
                What it looks like
              </p>

              <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
                A complete session, ready when your team is.
              </h2>
            </div>

            <button
              type="button"
              onClick={scrollToDemoForm}
              className="mt-10 w-fit rounded-full bg-[#F47534] px-7 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(244,117,52,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)]"
            >
              See PRIME in Action
            </button>
          </div>

          <div className="grid gap-6">
            {sessionSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_26px_70px_rgba(15,23,42,0.08)] md:p-10"
              >
                <p className="text-sm font-black tracking-[0.18em] text-[#F47534]">
                  {item.step}
                </p>
                <h3 className="mt-6 text-3xl font-black tracking-[-0.045em] md:text-4xl">
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

      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Complete toolkit
            </p>

            <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
              More than a playlist. A full engagement system.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {toolkitItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] md:p-10"
              >
                <h3 className="text-3xl font-black leading-tight tracking-[-0.045em]">
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

      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Customer voices
            </p>

            <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
              Designed for the realities of senior living.
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

      <section
        id="prime-demo-form"
        className="scroll-mt-28 px-5 py-10 md:px-10 md:py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[3.25rem] bg-[#061D33] p-7 text-white shadow-[0_44px_120px_rgba(6,29,51,0.32)] md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Schedule a demo
            </p>

            <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
              See how PRIME could fit your community.
            </h2>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-200">
              Complete the form and our team will follow up to schedule a virtual
              demo, answer questions, and walk you through how PRIME works in a
              senior living setting.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Simple to launch", "Staff friendly", "Built for groups"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm font-black"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2.75rem] border border-white/10 bg-white p-6 text-[#062B49] shadow-[0_30px_90px_rgba(0,0,0,0.18)] md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-slate-700">
                  Name *
                </span>
                <input
                  name="name"
                  required
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                />
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-700">
                  Work Email *
                </span>
                <input
                  name="email"
                  required
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                />
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-700">
                  Phone
                </span>
                <input
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                />
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-700">
                  Job Title
                </span>
                <input
                  name="jobTitle"
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-black text-slate-700">
                  Community / Organization
                </span>
                <input
                  name="organization"
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-black text-slate-700">
                  Optional Message
                </span>
                <textarea
                  name="message"
                  rows="4"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="mt-6 w-full rounded-full bg-[#F47534] px-8 py-5 text-lg font-bold text-white shadow-[0_18px_46px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(244,117,52,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {formStatus === "sending"
                ? "Sending..."
                : "Schedule a PRIME Demo"}
            </button>

            {formStatus === "success" && (
              <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-800">
                Thank you. Your request has been sent to the SingFit team.
              </p>
            )}

            {formStatus === "error" && (
              <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
                Something went wrong. Please email sales@singfit.com directly.
              </p>
            )}

            <p className="mt-5 text-center text-xs font-semibold leading-relaxed text-slate-500">
              Required fields are marked with an asterisk.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}