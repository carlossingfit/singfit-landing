import React, { useEffect, useRef } from "react";
import Player from "@vimeo/player";

export default function CaregiverLandingPageV3() {
  const PAGE_ID = "CaregiverLandingV3";
  const iframeRef = useRef(null);
  const checkoutUrl = "https://www.singfit.com/caregiver-pricing";
  const videoIframeRef = useRef(null);
  const videoStartedRef = useRef(false);
  const videoProgressRef = useRef(new Set());

  const attributionParams = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ];

  const pushTrackingEvent = (eventData) => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      page_id: PAGE_ID,
      ...eventData,
    });
  };

  const buildUrlWithAttribution = (destinationUrl) => {
    if (typeof window === "undefined") return destinationUrl;

    try {
      const url = new URL(destinationUrl, window.location.origin);
      const currentParams = new URLSearchParams(window.location.search);

      attributionParams.forEach((param) => {
        const value = currentParams.get(param);
        if (value && !url.searchParams.has(param)) {
          url.searchParams.set(param, value);
        }
      });

      return url.toString();
    } catch (error) {
      return destinationUrl;
    }
  };

  const trackCtaClick = ({ buttonText, destinationUrl }) => {
    const finalDestinationUrl = buildUrlWithAttribution(destinationUrl);

    pushTrackingEvent({
      event: "click_cta",
      button_text: buttonText,
      destination_url: finalDestinationUrl,
    });

    return finalDestinationUrl;
  };

  const handleCtaNavigation = (event, { buttonText, destinationUrl }) => {
    const finalDestinationUrl = trackCtaClick({ buttonText, destinationUrl });

    if (
      event &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault();
      window.location.assign(finalDestinationUrl);
    }
  };


  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) return;

      const percentScrolled = Math.round((scrollTop / documentHeight) * 100);

      thresholds.forEach((threshold) => {
        if (percentScrolled >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          pushTrackingEvent({
            event: "scroll_depth",
            percent_scrolled: threshold,
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  if (!videoIframeRef.current) return undefined;

  const player = new Player(videoIframeRef.current);

  const progressMilestones = new Set();
  let hasStarted = false;
  let hasCompleted = false;

  const handlePlay = () => {
    if (hasStarted) return;

    hasStarted = true;

    pushTrackingEvent({
      event: "video_start",
      page_id: PAGE_ID,
      video_name: "laina_story",
    });
  };

  const handleTimeUpdate = ({ percent }) => {
    const progress = Math.floor(percent * 100);

    [25, 50, 75].forEach((milestone) => {
      if (progress >= milestone && !progressMilestones.has(milestone)) {
        progressMilestones.add(milestone);

        pushTrackingEvent({
          event: "video_progress",
          page_id: PAGE_ID,
          video_name: "laina_story",
          percent: milestone,
        });
      }
    });
  };

  const handleEnded = () => {
    if (hasCompleted) return;

    hasCompleted = true;

    pushTrackingEvent({
      event: "video_complete",
      page_id: PAGE_ID,
      video_name: "laina_story",
    });
  };

  player.on("play", handlePlay);
  player.on("timeupdate", handleTimeUpdate);
  player.on("ended", handleEnded);

  return () => {
    player.off("play", handlePlay);
    player.off("timeupdate", handleTimeUpdate);
    player.off("ended", handleEnded);
  };
}, []);

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
            href={buildUrlWithAttribution(checkoutUrl)}
            onClick={(event) =>
              handleCtaNavigation(event, {
                buttonText: "Header - Start One Good Moment",
                destinationUrl: checkoutUrl,
              })
            }
            className="rounded-full bg-[#F47534] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)] md:px-6"
          >
            Start One Good Moment
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-5 pb-8 pt-6 md:px-10 md:pb-12 md:pt-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(0,145,200,0.12),transparent_32%),radial-gradient(circle_at_12%_82%,rgba(244,117,52,0.10),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
          <div>
           
            <h1 className="max-w-5xl text-[2.8rem] font-black leading-[0.94] tracking-[-0.05em] md:text-[4.4rem] lg:text-[5rem]">
              Caregivers, you are not alone in this. When agitation and anxiety attack, music has your back.
            </h1>

            <p className="mt-6 max-w-2xl text-[1.35rem] leading-snug text-slate-700 md:text-[1.8rem]">
                Receive a complimentary 20 minute
consultation with a certified music
therapist to learn how singing can
make caregiving easier.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
  href="https://calendly.com/jubilee-musicalhealthtech/15min"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-full bg-[#F47534] px-12 py-6 text-center text-xl font-bold text-white shadow-[0_18px_46px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(244,117,52,0.40)] sm:px-16"
>
  Schedule Now
</a>

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

            <div className="absolute -bottom-20 left-1/2 z-30 w-[min(94%,500px)] -translate-x-1/2 rounded-[2rem] border border-slate-200 bg-white/95 px-7 py-7 text-center shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur md:px-9 md:py-8">
  <p className="text-2xl font-black leading-tight text-[#062B49] md:text-3xl">
    Active music making has been shown to be one of the most effective tools for caregivers of people with dementia.
  </p>
</div>
          </div>
        </div>
      </section>

{/* Lifestyle / Emotional Proof */}
<section className="px-5 py-10 md:px-10 md:py-14">
  <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">

    {/* Video + Quote */}
    <div className="flex h-full flex-col justify-between gap-5">
      <div className="overflow-hidden rounded-[3rem] bg-white p-4 shadow-[0_34px_90px_rgba(15,23,42,0.10)]">
        <div className="relative aspect-video overflow-hidden rounded-[2rem]">
          <iframe
            ref={videoIframeRef}
            src="https://player.vimeo.com/video/1194167243?h=0&title=0&byline=0&portrait=0"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-3 rounded-[1.5rem] border border-[#F6D4BF] bg-[#FFF8F4] px-6 py-3">
  <p className="text-lg font-medium leading-snug text-[#062B49]">
          “I’m so happy I learned of the SingFit program.
          It’s been life changing.”
        </p>

        <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#F47534]">
          LAINA
        </p>
      </div>
    </div>

    {/* Text Card */}
    <div className="flex h-full flex-col justify-center rounded-[3rem] border border-slate-200 bg-white px-9 py-9 shadow-[0_34px_90px_rgba(15,23,42,0.09)] md:px-11 md:py-10">
      <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
        WHY IT MATTERS
      </p>

      <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] text-[#062B49] md:text-[3rem]">
  When words are hard,
  music gives you
  somewhere to begin.
</h2>

<p className="mt-5 max-w-xl text-xl leading-relaxed text-slate-700 md:text-[1.35rem]">
  A familiar song can create a shared place to start. Not a task.
  Not a performance. Just a few minutes together, supported by music.
</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={buildUrlWithAttribution(checkoutUrl)}
          onClick={(event) =>
            handleCtaNavigation(event, {
              buttonText: "Why It Matters - Start Today",
              destinationUrl: checkoutUrl,
            })
          }
          className="inline-flex items-center justify-center rounded-full bg-[#F47534] px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)]"
        >
          Start Today
        </a>

        <span className="text-base font-medium text-slate-600">
          $11.99/month. Cancel anytime.
        </span>
      </div>
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
          className="relative flex min-h-[360px] flex-col justify-between rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.09)]"
        >
          <div className="flex flex-1 flex-col">
            <div className="mb-1 text-6xl font-black leading-[0.65] text-[#F47534]/25">
              “
            </div>

            <p className="pr-6 text-xl font-black leading-snug tracking-[-0.035em] text-[#062B49]">
              {item.quote}
            </p>

            <div className="absolute bottom-[88px] right-8 text-6xl font-black leading-[0.65] text-[#F47534]/25">
              ”
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-5">
            <p className="font-black text-[#062B49]">{item.name}</p>

            <p className="text-lg font-semibold text-slate-600">
              {item.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Statement */}
      <section className="px-5 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl border-y border-slate-200 py-12 md:py-14">
          <div className="grid gap-10 md:grid-cols-[0.88fr_1.12fr]">
            <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-6xl">
              You do not need the perfect plan. You just need a little help from a friend.
            </h2>

            <div className="space-y-8">
  <div className="space-y-5 text-2xl leading-relaxed text-slate-700 md:text-[1.7rem]">
    <p>
      With caregiving, sometimes it feels like you are never doing enough. Talk with a certified music therapist to discover how music can help. 
    </p>
  </div>

  <div className="flex flex-col items-start gap-3">
  <a
    href="https://calendly.com/jubilee-musicalhealthtech/15min"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-full bg-[#F47534] px-8 py-4 text-xl font-bold text-white shadow-[0_12px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)]"
  >
    Schedule a Free Consultation
  </a>

  <p className="text-base text-slate-600">
    Free 20-minute conversation with a certified music therapist. No obligation.
  </p>
</div>
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
          title: "Hit songs",
          text: "Use music that feels recognizable, personal, and easy to share. Familiar songs, including Over the Rainbow, Lean on Me, and Amazing Grace can help create comfort and connection in moments that otherwise feel difficult. Even a few minutes together can shift the tone of the day.",
        },
        {
          title: "Simple prompts",
          text: "SingFit's unique Lyric Coach™ track helps guide participation so you are not leading alone. Our technology supplies the lyrics with a spoken prompt just before each line of the song, removing the anxiety of trying to read lyrics and keep up. Just press play to follow along and sing together.",
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
              href={buildUrlWithAttribution(checkoutUrl)}
              onClick={(event) =>
                handleCtaNavigation(event, {
                  buttonText: "How It Works - Start Today",
                  destinationUrl: checkoutUrl,
                })
              }
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
                title: "Sing a song",
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

    

    {/* FAQ */}
<section className="px-5 py-10 md:px-10 md:py-14">
  <div className="mx-auto grid max-w-7xl items-stretch gap-10 md:grid-cols-[0.82fr_1.18fr]">
    <div>
      <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
        Questions
      </p>

      <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-7xl">
        Common caregiver concerns.
      </h2>

      <div className="mt-8">
        <div className="overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
          <div className="relative aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1194167243?h=0&title=0&byline=0&portrait=0"
              title="Laina Story"
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <p className="mt-4 text-lg font-semibold leading-relaxed text-[#062B49]">
          Listen to Laina talk about her experience using SingFit.
        </p>
      </div>
    </div>

    <div className="flex rounded-[2.75rem] border border-slate-200 bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.09)] md:p-10">
      <div className="flex w-full flex-col justify-between divide-y divide-slate-200">
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
            a: "You can get up and running in just a few minutes. Once set up, starting a SingFit session takes only seconds.",
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
           
              <h2 className="mx-auto max-w-6xl text-5xl font-black leading-[0.94] tracking-[-0.05em] md:text-8xl">
                Start with one good moment now.
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-xl leading-relaxed text-blue-50 md:text-2xl">
                Subscribe here. Download the app. Sign in and begin your first
                guided music session.
              </p>

              <a
                href={buildUrlWithAttribution(checkoutUrl)}
                onClick={(event) =>
                  handleCtaNavigation(event, {
                    buttonText: "Final - Start One Good Moment",
                    destinationUrl: checkoutUrl,
                  })
                }
                className="mt-10 inline-block rounded-full bg-[#F47534] px-10 py-5 text-lg font-bold text-white shadow-[0_18px_46px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(244,117,52,0.40)]"
              >
                Start One Good Moment
              </a>

              <p className="mt-5 text-sm font-semibold text-blue-100">
                $11.99/month. Cancel anytime.
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