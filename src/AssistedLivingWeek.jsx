import React, { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

const FEEDBACK_WEBHOOK =
  "https://hook.us2.make.com/rprgdxjsljmn4iungrue627h999kiedg";

const PAGE_ID = "assisted_living_week_2026";
const FORM_ID = "assisted_living_week_feedback";

const VIDEO_TITLE = "A short message from Andy";
const VIDEO_ID = "1225803892";

const TRAINING_URL =
  "https://singfit.as.me/schedule/4acff743/appointment/1968667/calendar/477845?appointmentTypeIds[]=1968667";

const pushToDataLayer = (payload) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    page_id: PAGE_ID,
    ...payload,
  });
};

export default function AssistedLivingWeek() {
  const [formStatus, setFormStatus] = useState("idle");
  const formStartedAt = useRef(Date.now());

  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);

  useEffect(() => {
    const playerCleanups = [];

    const setupPlayerTracking = (iframe, placement) => {
      if (!iframe) return;

      const player = new Player(iframe);

      let hasStarted = false;
      let hasCompleted = false;
      const firedMilestones = new Set();

      const baseVideoData = {
  video_id: VIDEO_ID,
  video_name: VIDEO_TITLE,
  video_provider: "vimeo",
  video_placement: placement,
};

      const handlePlay = () => {
        if (hasStarted) return;

        hasStarted = true;

        pushToDataLayer({
          event: "video_start",
          ...baseVideoData,
        });
      };

      const handleTimeUpdate = (data) => {
        const percent = data.percent || 0;

        [25, 50, 75].forEach((milestone) => {
          if (
            percent >= milestone / 100 &&
            !firedMilestones.has(milestone)
          ) {
            firedMilestones.add(milestone);

            pushToDataLayer({
              event: "video_progress",
              ...baseVideoData,
              video_percent: milestone,
            });
          }
        });
      };

      const handleEnded = () => {
        if (hasCompleted) return;

        hasCompleted = true;

        pushToDataLayer({
          event: "video_complete",
          ...baseVideoData,
          video_percent: 100,
        });
      };

      player.on("play", handlePlay);
      player.on("timeupdate", handleTimeUpdate);
      player.on("ended", handleEnded);

      playerCleanups.push(() => {
        player.off("play", handlePlay);
        player.off("timeupdate", handleTimeUpdate);
        player.off("ended", handleEnded);
      });
    };

    setupPlayerTracking(mobileVideoRef.current, "mobile_hero");
    setupPlayerTracking(desktopVideoRef.current, "desktop_hero");

    return () => {
      playerCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const handleTrainingClick = () => {
    pushToDataLayer({
      event: "click_cta",
      button_text: "View the PRIME training calendar",
      link_url: TRAINING_URL,
    });
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();

    if (formStatus === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot. Bots that fill this field are treated as submitted
    // without actually sending anything to Make.
    const website = String(formData.get("website") || "").trim();

    if (website) {
      setFormStatus("success");
      return;
    }

    // Very fast submissions are likely automated.
    const elapsed = Date.now() - formStartedAt.current;

    if (elapsed < 1500) {
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    try {
      const urlParams = new URLSearchParams(window.location.search);

      formData.append("page", window.location.href);
      formData.append("page_id", PAGE_ID);
      formData.append("form_id", FORM_ID);
      formData.append("submittedAt", new Date().toISOString());
      formData.append("referrer", document.referrer || "");

      [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "fbclid",
        "gclid",
      ].forEach((key) => {
        const value = urlParams.get(key);

        if (value) {
          formData.append(key, value);
        }
      });

      await fetch(FEEDBACK_WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      pushToDataLayer({
        event: "submit_form",
        form_id: FORM_ID,
      });

      setFormStatus("success");
    } catch (error) {
      console.error("Feedback submission failed:", error);
      setFormStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#062B49] antialiased">

      {/* HEADER */}
      <header className="bg-[#061D33] px-5 py-6 md:px-10 md:py-7">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center text-center">
          <img
            src="/SingFit-Logo-Horizontal-White.png"
            alt="SingFit"
            className="h-auto w-[190px] md:w-[220px]"
          />

          <p className="mt-3 max-w-2xl text-base font-semibold leading-relaxed text-white/90">
            Celebrating the people who make assisted living communities shine.
          </p>
        </div>
      </header>

      <div className="h-[5px] bg-[#F47534]" />

      {/* MOBILE HERO */}
      <section className="bg-[#FAFBFC] px-5 py-8 lg:hidden">
        <div className="mx-auto max-w-xl">

          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0377A3]">
            National Assisted Living Week • September 13–19
          </p>

          <h1 className="mt-4 font-serif text-[2.55rem] font-bold leading-[1.03] tracking-[-0.04em] text-[#062B49]">
            A short message from Andy
          </h1>

          {/* VIDEO */}
          <div className="mt-7">
            <div className="overflow-hidden rounded-[1.8rem] border-[4px] border-[#F47534] bg-[#061D33] shadow-[0_20px_55px_rgba(15,23,42,0.14)]">
              <div className="relative aspect-video w-full overflow-hidden">
                <iframe
                  ref={mobileVideoRef}
                  src="https://player.vimeo.com/video/1225803892"
                  title="A short message from Andy"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-lg font-black text-[#062B49]">
                Andy Tubman, MT-BC
              </p>

              <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">
                Co-Founder &amp; Chief Clinical Officer, SingFit
              </p>
            </div>
          </div>

          {/* INTRO COPY MOVED BELOW VIDEO ON MOBILE */}

        </div>
      </section>

      {/* DESKTOP HERO */}
      <section className="hidden bg-[#FAFBFC] px-10 py-16 lg:block">
        <div className="mx-auto grid max-w-[1180px] items-center gap-16 lg:grid-cols-[0.88fr_1.12fr]">

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0377A3]">
              National Assisted Living Week • September 13–19
            </p>

            <h1 className="mt-5 max-w-xl font-serif text-[4rem] font-bold leading-[1.03] tracking-[-0.04em] text-[#062B49]">
              A short message from Andy
            </h1>
          </div>

          <div>
            <div className="overflow-hidden rounded-[2rem] border-[5px] border-[#F47534] bg-[#061D33] shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
              <div className="relative aspect-video w-full overflow-hidden">
                <iframe
                  ref={desktopVideoRef}
                  src="https://player.vimeo.com/video/1225803892"
                  title="A short message from Andy"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xl font-black text-[#062B49]">
                Andy Tubman, MT-BC
              </p>

              <p className="mt-1 text-base font-semibold text-slate-600">
                Co-Founder &amp; Chief Clinical Officer, SingFit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT INTRO */}
      <section className="px-5 pb-7 pt-9 md:px-10 md:pb-8 md:pt-10">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="font-serif text-[2.15rem] font-bold leading-tight text-[#062B49] md:text-[2.8rem]">
            We’re here to support you!
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-[1.6] text-slate-700 md:text-xl">
            Whether you’re new to SingFit, could use a refresher, or have ideas
            about how we can better support your community, we’d love to hear
            from you.
          </p>
        </div>
      </section>

      {/* TRAINING BANNER */}
      <section className="px-5 pb-6 md:px-10 md:pb-7">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid items-center gap-7 rounded-[2rem] border border-[#C8E3EE] bg-[#F1F8FB] px-6 py-7 shadow-[0_16px_42px_rgba(15,23,42,0.05)] md:px-9 md:py-8 lg:grid-cols-[1fr_auto]">

            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0377A3]">
                PRIME Training
              </p>

              <h2 className="mt-3 font-serif text-[2rem] font-bold leading-tight text-[#062B49] md:text-[2.35rem]">
                Want a refresher or have new team members?
              </h2>

              <p className="mt-3 max-w-3xl text-lg leading-[1.6] text-slate-700">
                Join one of our regularly scheduled PRIME training webinars to
                refresh your skills or help a new team member get started.
              </p>
            </div>

            <div className="w-full lg:w-auto lg:pl-6">
              <a
                href={TRAINING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTrainingClick}
                className="flex w-full items-center justify-center rounded-full bg-[#0377A3] px-5 py-4 text-center text-sm font-bold leading-snug text-white shadow-[0_12px_28px_rgba(3,119,163,0.18)] transition hover:-translate-y-0.5 sm:text-base lg:inline-flex lg:w-auto lg:whitespace-nowrap lg:px-7"
              >
                View the PRIME training calendar →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="px-5 pb-10 md:px-10 md:pb-14">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[2rem] border border-[#FFD3C0] bg-[#FFF5EF] shadow-[0_18px_50px_rgba(15,23,42,0.06)]">

          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">

            {/* FEEDBACK COPY */}
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#E86424]">
                We’d love to hear from you
              </p>

              <h2 className="mt-4 font-serif text-[2.15rem] font-bold leading-[1.08] text-[#062B49] md:text-[2.75rem]">
                How can we better support you?
              </h2>

              <p className="mt-5 text-lg leading-[1.65] text-slate-700">
                Have a question, an idea, or something that would make SingFit
                easier or more valuable for your community? Let us know. Even a
                quick note helps.
              </p>
            </div>

            {/* FORM */}
            <div className="bg-white px-6 py-8 md:px-9 md:py-9">
              {formStatus !== "success" ? (
                <form
                  onSubmit={handleFeedbackSubmit}
                  className="relative grid gap-5"
                >
                  {/* HONEYPOT */}
                  <div
                    className="absolute -left-[9999px] h-px w-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <label>
                      Website
                      <input
                        type="text"
                        name="website"
                        tabIndex="-1"
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <label className="block">
                      <span className="text-base font-black text-[#062B49]">
                        Your name
                      </span>

                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                      />
                    </label>

                    <label className="block">
                      <span className="text-base font-black text-[#062B49]">
                        Email address
                      </span>

                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                      />
                    </label>

                  </div>

                  <label className="block">
                    <span className="text-base font-black text-[#062B49]">
                      Community / Organization
                    </span>

                    <input
                      type="text"
                      name="organization"
                      required
                      autoComplete="organization"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                    />
                  </label>

                  <label className="block">
                    <span className="text-base font-black text-[#062B49]">
                      What can we help with?
                    </span>

                    <textarea
                      name="message"
                      rows="4"
                      required
                      className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                    />
                  </label>

                  {formStatus === "error" && (
                    <p
                      className="text-sm font-semibold text-red-700"
                      role="alert"
                    >
                      We couldn’t send your feedback. Please try again.
                    </p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full rounded-full bg-[#F47534] px-8 py-4 text-base font-bold text-white shadow-[0_12px_28px_rgba(244,117,52,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {formStatus === "submitting"
                        ? "Sending..."
                        : "Send feedback"}
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  className="flex min-h-[260px] flex-col items-center justify-center text-center"
                  aria-live="polite"
                >
                  <p className="text-2xl font-black text-[#062B49]">
                    Thanks for letting us know.
                  </p>

                  <p className="mt-3 text-lg leading-relaxed text-slate-600">
                    Our team will take a look and follow up if needed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white px-4 py-7 text-center text-xs text-gray-500">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span>
            ©2026 Musical Health Technologies. All Rights Reserved.
          </span>

          <span>
            1010 Wilshire Blvd. Los Angeles, CA 90017
          </span>

          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0377A3] hover:underline"
          >
            Privacy Policy
          </a>

          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0377A3] hover:underline"
          >
            Terms of Service
          </a>

          <a
            href="/accessibility"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0377A3] hover:underline"
          >
            Accessibility Statement
          </a>
        </div>
      </footer>
    </main>
  );
}