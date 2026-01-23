import { useState, useRef, useEffect } from "react";
import { useAnalytics } from "./useAnalytics";

export default function CampaignLandingConferences() {
  const PAGE_ID = "AHCA";
  const { track = () => {} } = useAnalytics ? useAnalytics(PAGE_ID) : { track: () => {} };
  const safeTrack = (event, params) => {
    try { if (typeof track === "function") track(event, params); } catch (_) {}
  };

  // UTM capture (unchanged)
  const [utmParams, setUtmParams] = useState({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    };
    setUtmParams(utms);
  }, []);

  const BRAND_ORANGE = "#F47534";
  const BRAND_NAVY = "#002F6C";

  // Video SDK helpers (from CL6)
  function loadVimeoSDK() {
    return new Promise((resolve) => {
      if (window.Vimeo && window.Vimeo.Player) return resolve();
      const s = document.createElement("script");
      s.src = "https://player.vimeo.com/api/player.js";
      s.async = true;
      s.onload = () => resolve();
      document.head.appendChild(s);
    });
  }
  function loadYouTubeSDK() {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) return resolve();
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof prev === "function") prev();
        resolve();
      };
      (function poll() {
        if (window.YT && window.YT.Player) return resolve();
        setTimeout(poll, 50);
      })();
    });
  }

  // Inline CSS (ticker + minor effects retained)
  const styleBlock = `
  @keyframes sf-pulse-loop {
    0%   { box-shadow: 0 0 0 0 rgba(244,117,52,0.35); transform: scale(1); }
    60%  { box-shadow: 0 0 0 12px rgba(244,117,52,0);  transform: scale(1.007); }
    100% { box-shadow: 0 0 0 0 rgba(244,117,52,0);    transform: scale(1); }
  }
  .sf-ticker { --ticker-gap: 3rem; gap: var(--ticker-gap); }
  .sf-ticker-item {
    width: 200px; height: 60px; flex: 0 0 auto; min-width: 200px; max-width: 200px;
  }
  @media (min-width: 768px) {
    .sf-ticker-item {
      width: 240px; height: 72px; flex: 0 0 auto; min-width: 240px; max-width: 240px;
    }
  }`;

  // PRODUCTS: we only use the senior (PRIME) config
  const PRODUCTS = {
    senior: {
      title: "SingFit PRIME",
      tagline: "Group programming for senior living",
      bullets: [
        "Promote brain health, mood elevation and socialization",
        "Online training and implementation support",
        "Full-body therapeutic singing program to engage residents",
      ],
      // IMPORTANT: YouTube embed has enablejsapi=1 for tracking
      video: "https://www.youtube.com/embed/7a2YFIkNbrM?enablejsapi=1",
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
    },
  };

  const MAKE_WEBHOOK_URL = "/api/lead";

  // ===== Inline Form (adds Community field, keeps same Make/GA4 patterns) =====
  const InlineForm = ({ formType }) => {
    const [status, setStatus] = useState("");   // "", "ok", "err"
    const [msg, setMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);

    return (
      <form
        className="mt-4 flex flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          if (submitting) return;

          const formEl = e.currentTarget;
          const email     = formEl.email.value.trim();
          const name      = formEl.name?.value?.trim() || "";
          const community = formEl.community?.value?.trim() || "";

          if (!name || !email) {
            setStatus("err");
            setMsg("Please enter your name and email.");
            return;
          }

          setStatus("ok");
          setMsg("Thanks! We’ll be in touch soon.");
          formEl?.reset();

          setSubmitting(true);
          setTimeout(() => setSubmitting(false), 800);

          // Payload to Make — keep original 'company' for backward compatibility
          const payload = {
            name,
            email,
            community,
            company: community,     // mirrors 'community' to the legacy 'company' key
            page_id: PAGE_ID,       // "ICAA"
            product: formType,
          };

          try {
            let sent = false;
            if (navigator.sendBeacon) {
              try {
                const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
                sent = navigator.sendBeacon(MAKE_WEBHOOK_URL, blob);
              } catch {}
            }
            if (!sent) {
              fetch(MAKE_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              }).catch(() => {});
            }
          } catch {}

          try {
            if (typeof track === "function") {
              track("submit_form", { form_id: "campaign_inline", formType, page_id: PAGE_ID });
            }
          } catch {}
        }}
      >
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full focus:ring-2 focus:ring-[#F47534]"
        />
        <input
          type="text"
          name="community"
          placeholder="Community"
          className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full focus:ring-2 focus:ring-[#F47534]"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full focus:ring-2 focus:ring-[#F47534]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-3 rounded-md text-white text-sm bg-[#F47534] hover:bg-[#d9652c] shadow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {msg && (
          <p role="status" aria-live="polite" className={`text-sm mt-1 ${status === "ok" ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </p>
        )}
      </form>
    );
  };

  // ---- PRIME (senior) is the only active product on this page ----
  const active = "senior";
  const product = PRODUCTS[active];
  const videoIdAttr = `video-${active}`;

  // ---- YouTube tracking (PRIME video is YouTube) ----
  useEffect(() => {
    if (!product?.video || !/youtube\.com\/embed/i.test(product.video)) return;

    let player;
    let started = false;
    let completed = false;

    (async () => {
      await loadYouTubeSDK();

      const iframe = document.getElementById(videoIdAttr);
      if (!iframe || !window.YT || !window.YT.Player) return;

      player = new window.YT.Player(iframe, {
        events: {
          onStateChange: (e) => {
            if (!window.YT || !player) return;

            if (e.data === window.YT.PlayerState.PLAYING && !started) {
              started = true;

              let vid = "";
              let title = product.title || "Unknown";
              try {
                const data = player.getVideoData();
                if (data) {
                  vid = data.video_id || "";
                  title = data.title || title;
                }
              } catch {}

              track("video_start", {
                video_provider: "youtube",
                video_title: title,
                video_id: vid,
                page_id: PAGE_ID,
                ...utmParams,
                sleeve_key: "senior",
              });
            }

            if (e.data === window.YT.PlayerState.ENDED && !completed) {
              completed = true;

              let vid = "";
              let title = product.title || "Unknown";
              try {
                const data = player.getVideoData();
                if (data) {
                  vid = data.video_id || "";
                  title = data.title || title;
                }
              } catch {}

              track("video_complete", {
                video_provider: "youtube",
                video_title: title,
                video_id: vid,
                page_id: PAGE_ID,
                ...utmParams,
                sleeve_key: "senior",
              });
            }
          },
        },
      });
    })();

    return () => {
      try { if (player && player.destroy) player.destroy(); } catch {}
    };
  }, [product?.video]); // product is stable

  // ---- Continuous ticker (unchanged from CL6) ----
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    const trackEl = trackRef.current;
    if (!wrap || !trackEl) return;

    const mql = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql && mql.matches) return;

    const waitForImages = () => {
      const imgs = Array.from(trackEl.querySelectorAll("img"));
      if (!imgs.length) return Promise.resolve();
      let pending = imgs.length;
      return new Promise((resolve) => {
        const done = () => (--pending <= 0 ? resolve() : null);
        imgs.forEach((img) => {
          if (img.complete) done();
          else {
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          }
        });
      });
    };

    let rafId = 0;
    let paused = false;
    let offset = 0;
    const PX_PER_FRAME_AT_60FPS = 0.45;
    let lastTime = 0;

    const getGap = () => {
      const cs = getComputedStyle(trackEl);
      const fromVar = parseFloat(cs.getPropertyValue("--ticker-gap")) || 0;
      const fromInline = parseFloat(cs.columnGap || cs.gap || "0") || 0;
      return fromVar || fromInline || 0;
    };

    const step = (now) => {
      if (!lastTime) lastTime = now;
      const dt = now - lastTime;
      lastTime = now;
      if (!paused) {
        const dx = PX_PER_FRAME_AT_60FPS * (dt / 16.6667);
        offset -= dx;
        trackEl.style.transform = `translate3d(${offset}px,0,0)`;
        const loopLength = trackEl.scrollWidth / 3;
        if (-offset >= loopLength) {
          offset += loopLength;
          trackEl.style.transform = `translate3d(${offset}px,0,0)`;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    const onResize = () => { offset = 0; trackEl.style.transform = "translate3d(0,0,0)"; };

    let cleanup = () => {};
    waitForImages().then(() => {
      // clone 2x for continuous loop
      if (trackEl.dataset.cloned !== "1") {
        const originals = Array.from(trackEl.children);
        for (let i = 0; i < 2; i++) originals.forEach((n) => trackEl.appendChild(n.cloneNode(true)));
        trackEl.dataset.cloned = "1";
      }
      wrap.addEventListener("mouseenter", onEnter);
      wrap.addEventListener("mouseleave", onLeave);
      wrap.addEventListener("focusin", onEnter);
      wrap.addEventListener("focusout", onLeave);
      window.addEventListener("resize", onResize);
      rafId = requestAnimationFrame(step);
      cleanup = () => {
        cancelAnimationFrame(rafId);
        wrap.removeEventListener("mouseenter", onEnter);
        wrap.removeEventListener("mouseleave", onLeave);
        wrap.removeEventListener("focusin", onEnter);
        wrap.removeEventListener("focusout", onLeave);
        window.removeEventListener("resize", onResize);
      };
    });
    return () => cleanup();
  }, []);

  const FEATURED_LOGOS = [
    { src: "/Billboard_logo.svg-2.png", alt: "Billboard", href: "https://www.singfit.com/post/singfit-featured-in-billboard " },
    { src: "/forbes.png", alt: "Forbes", href: "https://www.singfit.com/post/singfit-featured-in-forbes " },
    { src: "/Temple_University_Logo.svg", alt: "Temple University", href: "https://www.singfit.com/post/temple-university-features-singfit" },
    { src: "/Senior-Housing-News-Logo.png", alt: "Senior Housing News", href: "https://www.singfit.com/post/singfit-featured-in-senior-housing-news " },
    { src: "/aarp-logo.png", alt: "AARP", href: "https://www.singfit.com/post/rachel-francine-ceo-of-singfit-named-a-50-innovation-leader" },
    { src: "/Keck_logo.svg.png", alt: "Keck", href: "https://www.singfit.com/about" },
    { src: "/Fast-Company-Logo.png", alt: "Fast Company", href: "https://www.singfit.com/post/singfit-featured-in-fast-company" },
    { src: "/fierce.jpeg", alt: "Fierce", href: "https://www.fiercehealthcare.com/payers/longevity-health-plan-now-covering-therapeutic-music-platform-singfit " },
    { src: "/BBC-logo.jpg", alt: "BBC", href: "https://www.singfit.com/videos?pgid=jzsr2nh4-2e38cc47-e723-4de9-bded-bc4211fd9abe  " },
  ];

  // Floating contact nudge (unchanged)
  const [showContactNudge, setShowContactNudge] = useState(false);
  const [nudgeBottom, setNudgeBottom] = useState(24);
  const contactNudgeSentinelRef = useRef(null);
  const [nudgeEntered, setNudgeEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowContactNudge(true), 5000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!showContactNudge) return;
    setNudgeEntered(false);
    const r = requestAnimationFrame(() => setNudgeEntered(true));
    return () => cancelAnimationFrame(r);
  }, [showContactNudge]);
  useEffect(() => {
    const el = contactNudgeSentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setNudgeBottom(entry.isIntersecting ? 120 : 24);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: styleBlock }} />

      {/* Top bar with logo (kept) */}
      <header className="w-full mb-8 md:mb-12 lg:mb-14">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center">
          <a
            href="https://www.singfit.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
            aria-label="SingFit website"
            onClick={() =>
              track("click_cta", {
                button_text: "SingFit Logo",
                destination_url: "https://www.singfit.com/",
                page_id: PAGE_ID,
                ...utmParams,
              })
            }
          >
            <img src="/SingFit New Brand Logo.png" alt="SingFit" className="h-9 md:h-11 w-auto" />
          </a>
        </div>
      </header>

      {/* Hero (unchanged copy; tweak if needed) */}
      <section className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <h1
          className="text-center leading-tight tracking-tight text-black text-[34px] md:text-[57px]"
          style={{ fontFamily: "Gotham, Montserrat, Inter, Arial, sans-serif", fontWeight: 700 }}
        >
          Timeless Music. Endless Joy
        </h1>
        <p
          className="mt-4 text-center text-gray-700 mx-auto text-[18px] md:text-[29px] max-w-4xl leading-snug"
          style={{ fontFamily: "Gotham Light, Gotham, Montserrat, Inter, Arial, sans-serif", fontWeight: 300 }}
        >
          SingFit PRIME turns beloved tunes into meaningful moments of connection, movement, and expression.
        </p>
      </section>

      {/* NOTE: Pill selector removed per spec */}

      {/* PRIME: Product Intro Panel (always visible) */}
      <section className="max-w-6xl mx-auto px-6 pb-4">
        <div className="rounded-2xl border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm transition-opacity duration-200 ease-out opacity-100">
          <div className="h-1 w-full rounded-t-2xl" style={{ backgroundColor: BRAND_ORANGE }} />
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6">
              <h3
                className="text-2xl md:text-3xl font-bold text-black"
                style={{ fontFamily: "Gotham, Montserrat, Inter, Arial, sans-serif" }}
              >
                {product.title}
              </h3>
              <p className="mt-2 text-gray-800 text-base md:text-xl">{product.tagline}</p>
              {product.bullets?.length ? (
                <ul className="mt-4 list-disc pl-5 text-base md:text-lg text-gray-800 space-y-1">
                  {product.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : null}

              {/* Form variant (with updated header copy) */}
              <div className="mt-6">
                <div className="text- text-gray-700 mb-2">Enter your details to learn more.</div>
                <InlineForm formType={product.cta?.formType ?? product.title} />
              </div>
            </div>

            {product.video ? (
              <div className="md:col-span-6">
                <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow ring-1 ring-black/5">
                  <iframe
                    id={videoIdAttr}
                    className="w-full h-[220px] md:h-[340px]"
                    src={product.video}
                    title={`${product.title} video`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Featured on — continuous ticker (kept) */}
      <section className="relative border-t border-gray-100 mt-6 md:mt-10">
        <div className="bg-gradient-to-b from-white via-[#FAFAFF] to-white">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <p className="text-center text-sm text-gray-600 mb-6">As featured on</p>
            <div className="relative overflow-hidden" ref={wrapRef}>
              <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
              <ul
                ref={trackRef}
                className="sf-ticker flex items-center will-change-transform"
                style={{ gap: "3rem" }}
                aria-label="Press logos"
              >
                {FEATURED_LOGOS.map((logo, i) => (
                  <li key={i} className="shrink-0">
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center opacity-70 hover:opacity-100 transition"
                      aria-label={logo.alt}
                    >
                      <div className="sf-ticker-item flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center p-1">
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className={`h-[85%] w-auto max-w-full object-contain ${logo.alt === "Keck" ? "scale-175" : ""}`}
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="sr-only">Logos scroll continuously. Hover to pause.</p>
          </div>
        </div>
      </section>

      {/* Floating Contact Nudge sentinel */}
      <div ref={contactNudgeSentinelRef} aria-hidden="true" />

      {/* Floating Contact Nudge */}
      {showContactNudge && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out ${
            nudgeEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          } motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
          style={{ right: 16, bottom: nudgeBottom, left: "auto" }}
        >
          <div className="flex items-center gap-3 rounded-full bg-white/95 backdrop-blur border border-gray-200 shadow-lg px-4 py-2">
            <span className="text-sm text-gray-700 hidden sm:inline">Need Help?</span>
            <a
              href="https://www.singfit.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-1 rounded-full bg-[#F47534] text-white hover:bg-[#d9652c] transition"
              onClick={() =>
                track("click_contact", {
                  placement: "nudge",
                  destination_url: "https://www.singfit.com/contact",
                  page_id: PAGE_ID,
                  ...utmParams,
                })
              }
            >
              Contact us
            </a>
            <button
              aria-label="Dismiss"
              onClick={() => setShowContactNudge(false)}
              className="ml-1 p-1 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FOOTER (kept) */}
      <footer className="text-center text-xs text-gray-500 border-t border-gray-200 pt-6 mt-8 px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
          <span>©2025 Musical Health Technologies. All Rights Reserved.</span>
          <span>1010 Wilshire Blvd. Los Angeles, CA 90017</span>
          <a href="https://www.singfit.com/privacypolicy" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
            Privacy Policy
          </a>
          <a href="https://www.singfit.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
            SingFit.com
          </a>
        </div>
      </footer>
    </div>
  );
}
