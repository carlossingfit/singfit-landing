import React, { useEffect, useRef, useState } from "react";
import CrispChat from "./CrispChat";

export default function PrimeLandingPageTest() {
  const PAGE_ID = "PrimeLandingPageTest";
  const SESSION_VIDEO_NAME = "prime_session_overview";
  const TESTIMONIAL_VIDEO_NAME = "prime_customer_testimonial";

  // ==================== COMPONENT STATE & REFS ====================
  const [formStatus, setFormStatus] = useState("idle");
  const [formStartTime] = useState(Date.now());
  const youtubePlayerRef = useRef(null);
  const youtubeProgressIntervalRef = useRef(null);
  const youtubeStartedRef = useRef(false);
  const youtubeCompletedRef = useRef(false);
  const youtubeMilestonesRef = useRef(new Set());
  const vimeoStartedRef = useRef(false);
  const vimeoCompletedRef = useRef(false);
  const vimeoMilestonesRef = useRef(new Set());
  const [showSummerPricing, setShowSummerPricing] = useState(false);
  const [summerPricingDismissed, setSummerPricingDismissed] = useState(false);

  // ==================== GTM / ANALYTICS HELPERS ====================
  const pushToDataLayer = (payload) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ page_id: PAGE_ID, ...payload });
  };

  const trackCTA = (buttonText, destinationUrl = "#prime-demo-form") => {
    pushToDataLayer({
      event: "click_cta",
      button_text: buttonText,
      destination_url: destinationUrl,
    });
  };

  const trackVideoEvent = (eventName, videoName, extra = {}) => {
    pushToDataLayer({
      event: eventName,
      video_name: videoName,
      ...extra,
    });
  };

  const scrollToDemoForm = (buttonText = "Schedule a PRIME Demo") => {
    trackCTA(buttonText, "#prime-demo-form");

    const formSection = document.getElementById("prime-demo-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ==================== SUMMER PRICING POPUP HELPERS ====================
  const dismissSummerPricing = () => {
    setShowSummerPricing(false);
    setSummerPricingDismissed(true);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("prime_summer_pricing_dismissed", "true");
    }
  };

  const handleSummerPricingClick = () => {
    dismissSummerPricing();
    scrollToDemoForm("Ask About Summer Pricing");
  };
  // ==================== ATTRIBUTION / UTM CAPTURE ====================
  const getTrackingData = () => {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      gclid: "",
      fbclid: "",
      landing_page: "",
      referrer: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
  ];

  const tracking = {};

  keys.forEach((key) => {
    const value = params.get(key);

    if (value) {
      window.sessionStorage.setItem(key, value);
      tracking[key] = value;
    } else {
      tracking[key] = window.sessionStorage.getItem(key) || "";
    }
  });

  tracking.landing_page = window.location.href;
  tracking.referrer = document.referrer || "";

  return tracking;
};

  // ==================== SUMMER PRICING SESSION STATE ====================
  useEffect(() => {
  if (typeof window === "undefined") return undefined;

  const wasDismissed =
    window.sessionStorage.getItem("prime_summer_pricing_dismissed") ===
    "true";

  if (wasDismissed) {
    setSummerPricingDismissed(true);
    setShowSummerPricing(false);
  } else {
    setShowSummerPricing(true);
  }

  return undefined;
}, []);

  // ==================== YOUTUBE VIDEO TRACKING ====================
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const clearProgressInterval = () => {
      if (youtubeProgressIntervalRef.current) {
        window.clearInterval(youtubeProgressIntervalRef.current);
        youtubeProgressIntervalRef.current = null;
      }
    };

    const checkYouTubeProgress = () => {
      const player = youtubePlayerRef.current;
      if (!player || typeof player.getDuration !== "function") return;

      const duration = player.getDuration();
      const currentTime = player.getCurrentTime();
      if (!duration || !currentTime) return;

      const percentWatched = (currentTime / duration) * 100;
      [25, 50, 75].forEach((milestone) => {
        if (
          percentWatched >= milestone &&
          !youtubeMilestonesRef.current.has(milestone)
        ) {
          youtubeMilestonesRef.current.add(milestone);
          trackVideoEvent("video_progress", SESSION_VIDEO_NAME, {
            percent: milestone,
          });
        }
      });
    };

    const initializeYouTubePlayer = () => {
      if (!window.YT || !window.YT.Player || youtubePlayerRef.current) return;

      youtubePlayerRef.current = new window.YT.Player("prime-session-video", {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              if (!youtubeStartedRef.current) {
                youtubeStartedRef.current = true;
                trackVideoEvent("video_start", SESSION_VIDEO_NAME);
              }

              clearProgressInterval();
              youtubeProgressIntervalRef.current = window.setInterval(
                checkYouTubeProgress,
                1000
              );
            }

            if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.BUFFERING
            ) {
              clearProgressInterval();
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              clearProgressInterval();
              if (!youtubeCompletedRef.current) {
                youtubeCompletedRef.current = true;
                trackVideoEvent("video_complete", SESSION_VIDEO_NAME);
              }
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initializeYouTubePlayer();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }

      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === "function") previousCallback();
        initializeYouTubePlayer();
      };
    }

    return () => {
      clearProgressInterval();
    };
  }, []);

  // ==================== VIMEO TESTIMONIAL TRACKING ====================
  useEffect(() => {
  if (typeof window === "undefined") return undefined;

  let cleanupIframe = null;

  const setupVimeoTracking = () => {
    const vimeoIframe = document.getElementById("prime-testimonial-video");
    if (!vimeoIframe || !vimeoIframe.contentWindow) return false;

    const subscribeToVimeoEvent = (eventName) => {
      vimeoIframe.contentWindow.postMessage(
        JSON.stringify({ method: "addEventListener", value: eventName }),
        "https://player.vimeo.com"
      );
    };

    const handleVimeoMessage = (event) => {
      if (event.origin !== "https://player.vimeo.com") return;

      let data;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch (error) {
        return;
      }

      if (!data || !data.event) return;

      if (data.event === "play" && !vimeoStartedRef.current) {
        vimeoStartedRef.current = true;
        trackVideoEvent("video_start", TESTIMONIAL_VIDEO_NAME);
      }

      if (data.event === "timeupdate" && data.data?.percent) {
        const percentWatched = data.data.percent * 100;
        [25, 50, 75].forEach((milestone) => {
          if (
            percentWatched >= milestone &&
            !vimeoMilestonesRef.current.has(milestone)
          ) {
            vimeoMilestonesRef.current.add(milestone);
            trackVideoEvent("video_progress", TESTIMONIAL_VIDEO_NAME, {
              percent: milestone,
            });
          }
        });
      }

      if (data.event === "ended" && !vimeoCompletedRef.current) {
        vimeoCompletedRef.current = true;
        trackVideoEvent("video_complete", TESTIMONIAL_VIDEO_NAME);
      }
    };

    const subscribeToVimeoEvents = () => {
      subscribeToVimeoEvent("play");
      subscribeToVimeoEvent("timeupdate");
      subscribeToVimeoEvent("ended");
    };

    window.addEventListener("message", handleVimeoMessage);
    vimeoIframe.addEventListener("load", subscribeToVimeoEvents);
    subscribeToVimeoEvents();

    cleanupIframe = () => {
      window.removeEventListener("message", handleVimeoMessage);
      vimeoIframe.removeEventListener("load", subscribeToVimeoEvents);
    };

    return true;
  };

  const setupTimer = window.setTimeout(setupVimeoTracking, 300);

  return () => {
    window.clearTimeout(setupTimer);
    if (cleanupIframe) cleanupIframe();
  };
}, []);

  // ==================== DEMO FORM SUBMISSION ====================
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("website")) {
      setFormStatus("success");
      form.reset();
      return;
    }

    const elapsedSeconds = (Date.now() - formStartTime) / 1000;

    if (elapsedSeconds < 3) {
      setFormStatus("success");
      form.reset();
      return;
    }

    const payload = {
  ...Object.fromEntries(formData.entries()),
  ...getTrackingData(),
  page_id: "primelandingpage1",
  form_id: "prime_demo_form",
  formtype: "demo_request",
};

    try {
      await fetch("https://hook.us2.make.com/6jcyahnyj6xzes7yc2inqqykk9rlvpgl", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      pushToDataLayer({
        event: "submit_form",
        form_id: "prime_demo_form",
        formtype: "demo_request",
      });

      setFormStatus("success");
      form.reset();
    } catch (error) {
      setFormStatus("error");
    }
  };
  // ==================== HERO TRUST STATISTICS ====================
  const trustStats = [
    { value: "900+", label: "Communities using SingFit" },
    { value: "2,800+", label: "SingFit Certified Facilitators" },
    { value: "57,000+", label: "Older adults singing" },
  ];

  // ==================== PAGE RENDER ====================
  return (
      <>
    {/* ==================== CRISP LIVE CHAT ==================== */}
    <CrispChat />
    <main className="min-h-screen overflow-hidden bg-[#F7F9FC] text-[#062B49] antialiased">
      {/* ==================== STICKY HEADER ==================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[150px] md:w-[200px]"
          />

          <button
            type="button"
            onClick={() => scrollToDemoForm("Schedule a PRIME Demo")}
            className="rounded-full bg-[#F47534] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)] md:px-6"
          >
            Schedule a PRIME Demo
          </button>
        </div>
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative px-5 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(0,145,200,0.10),transparent_32%),radial-gradient(circle_at_12%_82%,rgba(244,117,52,0.08),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <h1 className="max-w-4xl text-[2.8rem] font-black leading-[1.02] tracking-[-0.055em] md:text-[3.8rem] lg:text-[4.2rem]">
                Disengaged residents? Let&apos;s change the tune.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
                SingFit PRIME is a turnkey therapeutic singing program that helps
                senior living teams create engaging, interactive experiences
                residents genuinely look forward to.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => scrollToDemoForm("Learn More About PRIME")}
                  className="rounded-full bg-[#F47534] px-8 py-4 text-center text-base font-bold text-white shadow-[0_16px_40px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(244,117,52,0.36)]"
                >
                  Learn More About PRIME
                </button>

                <p className="text-sm font-bold text-slate-600">
                  Built for activity, memory care, and wellness teams.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-8 h-[320px] w-[320px] rounded-full bg-[#0091C8]/12 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#F47534]/12 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-white bg-white shadow-[0_30px_90px_rgba(15,23,42,0.16)]">
                <img
                  src="/jessiewithgroup-optimized.webp"
                  alt="SingFit PRIME group music session in a senior living community"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-auto max-h-[480px] w-full object-contain"
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {trustStats.map((item) => (
                  <div
                    key={item.label}
                    className="flex min-h-[96px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm"
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
          </div>
        </div>
      </section>

      {/* ==================== THE SINGFIT DIFFERENCE ==================== */}
      <section className="px-5 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-5xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              The SingFit difference
            </p>
            <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-5xl">
              Move beyond background music.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
              Access to music is easy. Creating an experience that gets residents
              actively involved takes structure, guidance, and a program designed
              around participation.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2.75rem] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] md:p-9">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                Passive listening
              </p>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.045em] text-[#062B49]">
                Music plays in the background.
              </h3>
              <div className="mt-6 space-y-4">
                {[
                  "Residents listen",
                  "Staff manage another activity",
                  "Participation can be difficult to sustain",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-500">
                      –
                    </span>
                    <p className="text-lg font-semibold leading-relaxed text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.75rem] bg-[#061D33] p-7 text-white shadow-[0_30px_86px_rgba(6,29,51,0.20)] md:p-9">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
                Guided singing with PRIME
              </p>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Residents become part of the music.
              </h3>
              <div className="mt-6 space-y-4">
                {[
                  "Residents sing, move, and reminisce",
                  "Staff follow ready-to-use guidance",
                  "The group shares an active social experience",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F47534] text-sm font-black text-white">
                      ✓
                    </span>
                    <p className="text-lg font-semibold leading-relaxed text-slate-100">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PAULA HARDER CUSTOMER TESTIMONIAL ==================== */}
      <section className="px-5 py-6 md:px-10 md:py-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2.75rem] border border-slate-200 bg-white p-7 shadow-[0_24px_72px_rgba(15,23,42,0.08)] md:p-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-10">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Customer perspective
            </p>

            <h2 className="text-3xl font-black leading-[1.05] tracking-[-0.05em] md:text-4xl">
              Hear why residents respond to PRIME.
            </h2>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <p className="text-lg font-black text-[#062B49]">Paula Harder</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                VP Resident Programs &amp; Memory Care
              </p>
            </div>

            <p className="mt-5 w-fit rounded-full bg-[#EAF6FB] px-4 py-2 text-sm font-black text-[#062B49]">
              44-second customer testimonial
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border-[10px] border-[#061D33] bg-black shadow-[0_20px_58px_rgba(6,29,51,0.16)]">
            <div className="relative aspect-video w-full">
              <iframe
                id="prime-testimonial-video"
                className="absolute inset-0 h-full w-full"
                src="https://player.vimeo.com/video/1196403668?api=1&player_id=prime-testimonial-video&autopause=0"
                title="SingFit PRIME customer testimonial"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRUSTED ORGANIZATIONS ==================== */}
      <section className="px-5 py-6 md:px-10 md:py-8">
  <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-200 bg-white px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] md:px-10 md:py-7">
    <p className="mb-5 text-center text-sm font-black uppercase tracking-[0.22em] text-slate-500">
      Trusted by leading senior living organizations
    </p>

    <div className="grid items-center gap-4 md:grid-cols-4">
      <div className="flex h-16 items-center justify-center">
        <img
          src="/arbor_logo.jpg"
          alt="The Arbor Company"
          className="max-h-14 w-auto object-contain opacity-90"
        />
      </div>

      <div className="flex h-16 items-center justify-center">
        <img
          src="/kisco_logo.png"
          alt="Kisco Senior Living"
          className="max-h-14 w-auto object-contain opacity-90"
        />
      </div>

      <div className="flex h-16 items-center justify-center overflow-hidden">
        <img
          src="/commonwealth-senior-living-logo.svg"
          alt="Commonwealth Senior Living"
          className="max-h-12 w-auto object-contain opacity-90"
        />
      </div>

      <div className="flex h-16 items-center justify-center">
        <img
          src="/silverado_logo.png"
          alt="Silverado"
          className="max-h-14 w-auto object-contain opacity-90"
        />
      </div>
    </div>
  </div>
</section>

      {/* ==================== WHY PRIME ==================== */}
      <section className="px-5 py-8 md:px-10 md:py-12">
  <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
    <div className="rounded-[2.5rem] bg-[#061D33] p-7 text-white shadow-[0_28px_80px_rgba(6,29,51,0.18)] md:p-8">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
        Why PRIME
      </p>

      <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-5xl">
        Better group programming without adding complexity.
      </h2>

      <p className="mt-5 text-lg leading-relaxed text-slate-200">
        PRIME is built for communities that need engaging resident programming,
        but cannot add more work to an already stretched team.
      </p>
      <div className="mt-7 grid gap-3">
  {[
    "Ready-to-use group sessions",
    "No musical background required",
    "Built for senior living teams",
  ].map((item) => (
    <div
      key={item}
      className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-black text-white"
    >
      {item}
    </div>
  ))}
</div>
    </div>

    <div className="grid gap-6">
      <div className="h-[330px] overflow-hidden rounded-[2.5rem] shadow-[0_26px_70px_rgba(15,23,42,0.10)]">
  <img
  src="/PRIME-session3-optimized.webp"
  alt="Residents participating in a SingFit PRIME session with props"
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover"
/>
</div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2.25rem] bg-white p-7 shadow-[0_20px_58px_rgba(15,23,42,0.07)]">
          <h3 className="text-2xl font-black tracking-[-0.04em]">
            Staff run it
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Sessions include the structure, prompts, and materials your team
            needs to facilitate with confidence.
          </p>
        </div>

        <div className="rounded-[2.25rem] bg-[#EAF6FB] p-7 shadow-[0_20px_58px_rgba(15,23,42,0.05)]">
          <h3 className="text-2xl font-black tracking-[-0.04em]">
            Residents join in
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Familiar songs, movement, trivia, and props help make sessions
            active and easy to participate in.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* ==================== PRIME SESSION VIDEO ==================== */}
<section className="px-5 py-10 md:px-10 md:py-16">
  <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-[3.25rem] bg-[#061D33] p-7 text-white shadow-[0_44px_120px_rgba(6,29,51,0.28)] md:p-12 lg:grid-cols-[0.75fr_1.25fr]">
    
    <div className="max-w-xl">
      <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
        See PRIME in action
      </p>

      <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-5xl">
        Watch how a PRIME session works.
      </h2>

      <p className="mt-6 text-xl leading-relaxed text-slate-200">
        See how staff use music, movement, props, and guided facilitation to lead
        engaging group sessions residents can actively participate in.
      </p>

      <button
        type="button"
        onClick={() => scrollToDemoForm("Talk With Our Team")}
        className="mt-8 rounded-full bg-[#F47534] px-7 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(244,117,52,0.26)] transition hover:-translate-y-0.5"
      >
        Talk With Our Team
      </button>
    </div>

    <div className="overflow-hidden rounded-[2.75rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
      <div className="relative aspect-video w-full">
        <iframe
          id="prime-session-video"
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/stknfT1FagU?enablejsapi=1&origin=${window.location.origin}`}
          title="SingFit PRIME session video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>

  </div>
</section>

      {/* ==================== COMPLETE TOOLKIT ==================== */}
      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[3.25rem] bg-white p-6 shadow-[0_34px_100px_rgba(15,23,42,0.10)] md:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2.75rem] bg-[#F7F9FC]">
            <img
  src="/Toolkit-Image-optimized.webp"
  alt="SingFit PRIME toolkit materials"
  loading="lazy"
  decoding="async"
  className="h-full min-h-[440px] w-full object-cover"
/>
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Complete toolkit
            </p>

            <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-5xl">
              More than a playlist. A full engagement system.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              PRIME includes the app, playlist booklets, guided facilitation
              content, props, training, and support needed to help teams run
              repeatable music sessions.
            </p>

           <div className="mt-8 grid gap-4 sm:grid-cols-2">
  {[
    "PRIME app and music library",
    "Quarterly playlist booklets",
    "Online staff training",
    "Props, speakers, and support",
  ].map((item) => (
    <div
      key={item}
      className="flex min-h-[84px] items-center rounded-2xl border border-slate-200 bg-[#F7F9FC] px-6 py-4"
    >
      <span className="text-lg font-black leading-tight text-[#062B49]">
        {item}
      </span>
    </div>
  ))}
</div>

            <button
              type="button"
              onClick={() => scrollToDemoForm("Have Questions?")}
              className="mt-8 w-fit rounded-full bg-[#F47534] px-7 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(244,117,52,0.26)] transition hover:-translate-y-0.5"
            >
              Have Questions?
            </button>
          </div>
        </div>
      </section>

      {/* ==================== CUSTOMER QUOTES ==================== */}
     <section className="px-5 py-8 md:px-10 md:py-12">
  <div className="mx-auto max-w-7xl">
    <div className="mb-8 max-w-5xl">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
        What activity leaders are seeing
      </p>

      <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-5xl">
        Designed for the realities of senior living.
      </h2>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <div className="relative min-h-[300px] rounded-[2.5rem] border border-slate-200 bg-white p-7 pb-[108px] shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-9 md:pb-[112px]">
        <div className="mb-5 text-5xl font-black leading-none text-[#F47534]/25">“</div>
        <p className="max-w-xl text-xl font-black leading-snug tracking-[-0.025em] text-[#062B49]">
          From the first song you’re seeing the engagement, and it keeps
          building. As they walk out, they’re all talking to each other.
        </p>
        <div className="mt-6 text-right text-5xl font-black leading-none text-[#F47534]/25">”</div>
        <div className="absolute bottom-7 left-7 right-7 border-t border-slate-200 pt-5 md:left-9 md:right-9">
          <p className="font-black text-[#062B49]">Pam M.</p>
          <p className="text-sm font-semibold text-slate-600">Activities Director</p>
        </div>
      </div>

      <div className="relative min-h-[300px] rounded-[2.5rem] border border-slate-200 bg-[#EAF6FB] p-7 pb-[108px] shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-9 md:pb-[112px]">
        <div className="mb-5 text-5xl font-black leading-none text-[#F47534]/25">“</div>
        <p className="max-w-xl text-xl font-black leading-snug tracking-[-0.025em] text-[#062B49]">
          Our residents love SingFit. I end up extending SingFit longer than
          planned. It is amazing to watch the residents become involved.
        </p>
        <div className="mt-6 text-right text-5xl font-black leading-none text-[#F47534]/25">”</div>
        <div className="absolute bottom-7 left-7 right-7 border-t border-slate-300 pt-5 md:left-9 md:right-9">
          <p className="font-black text-[#062B49]">Vanessa King Love</p>
          <p className="text-sm font-semibold text-slate-600">Life Enrichment Director</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ==================== DEMO REQUEST FORM ==================== */}
      <section
        id="prime-demo-form"
        className="scroll-mt-28 px-5 py-10 md:px-10 md:py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[3.25rem] bg-[#061D33] p-7 text-white shadow-[0_44px_120px_rgba(6,29,51,0.32)] md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Schedule a demo
            </p>

            <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.055em] md:text-5xl">
              See how PRIME could fit your community.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
              Complete the form and our team will follow up to schedule a
              virtual demo, answer questions, and walk you through how PRIME
              works in a senior living setting.
            </p>

            <div className="mt-10 space-y-3">
  <div className="flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F47534] text-sm font-black text-white">
      ✓
    </div>
    <span className="font-semibold text-white">
      Ready-to-use session plans
    </span>
  </div>

  <div className="flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F47534] text-sm font-black text-white">
      ✓
    </div>
    <span className="font-semibold text-white">
      No music therapy background required
    </span>
  </div>

  <div className="flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F47534] text-sm font-black text-white">
      ✓
    </div>
    <span className="font-semibold text-white">
      Training included for your team
    </span>
  </div>

  <div className="flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F47534] text-sm font-black text-white">
      ✓
    </div>
    <span className="font-semibold text-white">
      Designed specifically for senior living
    </span>
  </div>

  <div className="flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F47534] text-sm font-black text-white">
      ✓
    </div>
    <span className="font-semibold text-white">
      Used by 900+ communities
    </span>
  </div>
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
              <input
  type="text"
  name="website"
  tabIndex="-1"
  autoComplete="off"
  className="hidden"
/>
            </div>

            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="mt-6 w-full rounded-full bg-[#F47534] px-8 py-5 text-lg font-bold text-white shadow-[0_18px_46px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(244,117,52,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {formStatus === "sending"
                ? "Sending..."
                : "Request a PRIME Demo"}
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

      {/* ==================== SUMMER PRICING POPUP (CURRENTLY DISABLED) ==================== */}
      {false && showSummerPricing && !summerPricingDismissed && (
        <div className="fixed bottom-4 left-4 right-4 z-[60] md:bottom-6 md:left-auto md:right-6 md:w-[320px]">
          <div className="relative rounded-[1.75rem] border border-[#F47534]/35 bg-white p-5 pr-12 shadow-[0_24px_70px_rgba(15,23,42,0.20)]">
            <button
              type="button"
              onClick={dismissSummerPricing}
              aria-label="Dismiss summer pricing message"
              className="absolute right-4 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold text-slate-400 transition hover:bg-slate-100 hover:text-[#062B49]"
            >
              ×
            </button>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F47534]">
              SPECIAL OFFER
            </p>

            <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[#062B49]">
              Summer Pricing Available
            </h2>

            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
              Ask about special pricing for new PRIME communities.
            </p>

            <button
              type="button"
              onClick={handleSummerPricingClick}
              className="mt-4 w-full rounded-full bg-[#F47534] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(244,117,52,0.36)]"
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      )}
    </main>
    </>
  );
}