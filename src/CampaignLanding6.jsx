import { useState, useRef, useEffect } from "react";
// Analytics helper (same pattern as CL5)
import { useAnalytics } from "./useAnalytics";

/**
 * CampaignLanding6 — clean hero + oval selector (infinite pulse until click)
 * + hidden-until-selected product intro + continuous press ticker (safe)
 */
export default function CampaignLanding6() {
  const PAGE_ID = "CampaignLanding6";
  const { track = () => {} } = useAnalytics ? useAnalytics(PAGE_ID) : { track: () => {} };
  // Never let analytics block the form
const safeTrack = (event, params) => {
  try { if (typeof track === "function") track(event, params); } catch (_) {}
};

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

  const [active, setActive] = useState(null); // null | caregivers | therapists | senior | homehealth
  const [pulseOn, setPulseOn] = useState(true);

  const BRAND_ORANGE = "#F47534";
  const BRAND_NAVY = "#002F6C";
  const [hovered, setHovered] = useState(null);

  // --- Map CL6 UI keys to the standardized analytics keys used in GTM/GA4 (same as CL5) ---
  const normalizeKey = (k) =>
    ({ caregivers: "caregiver", therapists: "therapist", senior: "senior", homehealth: "homehealth" }[k] || k);

  // --- Vimeo tracking helper (same as CL5) ---
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

  // --- YouTube tracking helper (same as CL5) ---
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

  // One tiny CSS block for the looping pulse (until click)
  const styleBlock = `
  @keyframes sf-pulse-loop {
    0%   { box-shadow: 0 0 0 0 rgba(244,117,52,0.35); transform: scale(1); }
    60%  { box-shadow: 0 0 0 12px rgba(244,117,52,0);  transform: scale(1.007); }
    100% { box-shadow: 0 0 0 0 rgba(244,117,52,0);    transform: scale(1); }
  }
  .sf-pulse-loop { animation: sf-pulse-loop 1200ms ease-out infinite; }
  @media (prefers-reduced-motion: reduce) { .sf-pulse-loop { animation: none !important; } }

  /* Ticker sizing (consistent visual footprint regardless of source image aspect ratio) */
  .sf-ticker { --ticker-gap: 3rem; gap: var(--ticker-gap); }
 .sf-ticker-item {
  width: 200px;
  height: 60px;
  flex: 0 0 auto;
  min-width: 200px;
  max-width: 200px;
}
@media (min-width: 768px) {
  .sf-ticker-item {
    width: 240px;
    height: 72px;
    flex: 0 0 auto;
    min-width: 240px;
    max-width: 240px;
  }
}

`;


  // Selector options
  const options = [
    { key: "caregivers", label: "For Caregivers" },
    { key: "therapists", label: "For Rehab Therapists" },
    { key: "senior", label: "For Senior Living" },
    { key: "homehealth", label: "For Home Health/Care" },
  ];

  // Product content
  const PRODUCTS = {
    caregivers: {
      title: "SingFit STUDIO Caregiver",
      tagline: "Guided music sessions you can lead at home",
      bullets: [
        "Improve cognitive health, communication and well-being",
        "Connect with your loved one through singing",
        "Easy to use, no training or musical experience required",
      ],
      video: "https://player.vimeo.com/video/736275780?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: {
        type: "link",
        label: "Learn More",
        href: "https://www.singfit.com/studiocaregiver",
        secondary: { label: "Buy Now", href: "https://www.singfit.com/caregiver-pricing" },
      },
    },
    therapists: {
      title: "SingFit STUDIO PRO",
      tagline: "Clinical tools for 1:1 and small-group work",
      bullets: [
        "Personalize sessions for each client’s goals and needs",
        "Supports SLP, OT, and other therapy-related goals",
        "In-app data capture to measure progress over time",
      ],
      video: "https://player.vimeo.com/video/1089881903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: { type: "form", label: "For Therapists", href: "https://www.singfit.com/studiopro", formType: "Rehab Therapy" },
    },
    senior: {
      title: "SingFit PRIME",
      tagline: "Group programming for senior living",
      bullets: [
        "Promote brain health, mood elevation and socialization",
        "Online training and implementation support",
        "Full-body therapeutic singing program to engage residents",
      ],
      // IMPORTANT: enable JS API for YT tracking
      video: "https://www.youtube.com/embed/7a2YFIkNbrM?enablejsapi=1",
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
    },
    homehealth: {
      title: "Home Health/Care",
      tagline: "For home health and home care professionals",
      bullets: [
        "Personalized music to facilitate progress towards goals",
        "Unlock joy while improving emotional and cognitive health",
        "In-app reporting tracks user progress over time",
      ],
      video: "https://player.vimeo.com/video/1089881903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: { type: "form", label: "Discuss Home Health", formType: "Home Health/Care" },
    },
  };

  const MAKE_WEBHOOK_URL = "/api/lead";


  // ---------- Inline Form (tracks submit_form; keeps PII out of GA) ----------
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

  setStatus("");
  setMsg("");
  setSubmitting(true);

  const email   = e.currentTarget.email.value.trim();
  const name    = e.currentTarget.name?.value?.trim() || "";
  const company = e.currentTarget.company?.value?.trim() || "";

  const payload = {
  name,
  email,
  company,
  page_id: PAGE_ID,
  product: formType,
  utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
};


  try {
    const res = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Accept any 2xx as success
    if (res.status >= 200 && res.status < 300) {
      setStatus("ok");
      setMsg("Thanks! We’ll be in touch soon.");
      e.currentTarget.reset();
    } else {
      setStatus("err");
      setMsg("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("Form submit error:", err);
    setStatus("err");
    setMsg("There was a network problem. Please try again.");
  } finally {
    setSubmitting(false);
  }

  // Fire analytics after (non-blocking)
  try {
    if (typeof track === "function") {
      track("submit_form", {
  form_id: "campaign_inline",
  formType,
  page_id: PAGE_ID,
  utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
});

    }
  } catch (_) {}
}}



    >
      <input
        type="text"
        name="name"
        placeholder="Your name (optional)"
        className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full focus:ring-2 focus:ring-[#F47534]"
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Email (required)"
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


  // -------- Continuous ticker (safe, no resets) --------
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
    // Prefer our CSS var; fall back to inline style or 0
    const cs = getComputedStyle(trackEl);
    const fromVar = parseFloat(cs.getPropertyValue("--ticker-gap")) || 0;
    const fromInline = parseFloat(cs.columnGap || cs.gap || "0") || 0;
    return fromVar || fromInline || 0;
  };

  const getFirstSpan = () => {
    const first = trackEl.children[0];
    if (!(first instanceof HTMLElement)) return 0;
    const gap = getGap();
    // offsetWidth is stable (not affected by current transform)
    return first.offsetWidth + gap;
  };

  const step = (now) => {
  if (!lastTime) lastTime = now;
  const dt = now - lastTime;
  lastTime = now;

  if (!paused) {
    const dx = PX_PER_FRAME_AT_60FPS * (dt / 16.6667);
    offset -= dx;

    // Always scroll leftward
    trackEl.style.transform = `translate3d(${offset}px,0,0)`;

    // If entire loop has gone off screen, reset cleanly
    const loopLength = trackEl.scrollWidth / 3; // We’ll clone 3x content
    if (-offset >= loopLength) {
      offset += loopLength;
      trackEl.style.transform = `translate3d(${offset}px,0,0)`;
    }
  }

  rafId = requestAnimationFrame(step);
};


  const onEnter = () => (paused = true);
  const onLeave = () => (paused = false);
  const onResize = () => {
    // Rebuild clones if needed and reset transform cleanly
    buildClones();
    offset = 0;
    trackEl.style.transform = "translate3d(0,0,0)";
  };

  const buildClones = () => {
  const originals = Array.from(trackEl.children);

  // Only run once
  if (trackEl.dataset.cloned === "1") return;

  // Clone the original logos 2 more times (3 total loops)
  for (let i = 0; i < 2; i++) {
    originals.forEach((n) => trackEl.appendChild(n.cloneNode(true)));
  }

  trackEl.dataset.cloned = "1";
};


  let cleanup = () => {};
  waitForImages().then(() => {
    buildClones();
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


  // Press logos from /public
  const FEATURED_LOGOS = [
    { src: "/Billboard_logo.svg-2.png", alt: "Billboard", href: "https://www.singfit.com/post/singfit-featured-in-billboard " },
    { src: "/forbes.png", alt: "Forbes", href: "https://www.singfit.com/post/singfit-featured-in-forbes " },
    { src: "/temple.png", alt: "Temple University", href: "https://www.singfit.com/post/temple-university-features-singfit" },
    { src: "/Senior-Housing-News-Logo.png", alt: "Senior Housing News", href: "https://www.singfit.com/post/singfit-featured-in-senior-housing-news " },
    { src: "/aarp-logo.png", alt: "AARP", href: "https://www.singfit.com/post/rachel-francine-ceo-of-singfit-named-a-50-innovation-leader" },
    { src: "/kecklogo-2.jpg", alt: "Keck", href: "https://www.singfit.com/about" },
    { src: "/Fast-Company-Logo.png", alt: "Fast Company", href: "https://www.singfit.com/post/singfit-featured-in-fast-company" },
    { src: "/fierce.jpeg", alt: "Fierce", href: "https://www.fiercehealthcare.com/payers/longevity-health-plan-now-covering-therapeutic-music-platform-singfit " },
    { src: "/imageedit_11_4620365173.png", alt: "BBC", href: "https://www.singfit.com/videos?pgid=jzsr2nh4-2e38cc47-e723-4de9-bded-bc4211fd9abe  " },
  ];

  const product = active ? PRODUCTS[active] : null;

  // ---------- Profile selection tracking ----------
  const onSelect = (uiKey) => {
    setActive(uiKey);
    const stdKey = normalizeKey(uiKey);

    try {
      const STORE_KEY = "cl6_profile_keys";
      const prev = JSON.parse(sessionStorage.getItem(STORE_KEY) || "[]");
      const set = new Set(prev);
      set.add(stdKey);
      const arr = Array.from(set);
      sessionStorage.setItem(STORE_KEY, JSON.stringify(arr));

      track("sleeve_select", {
        key: stdKey,
        selection_index: arr.length,
        selection_keys: arr.join(","),
        page_id: PAGE_ID,
         utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
      });

      if (arr.length === 2 && !sessionStorage.getItem("cl6_multi_fired")) {
        track("multi_profile_select", {
          count: arr.length,
          selection_keys: arr.join(","),
          page_id: PAGE_ID,
           utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
        });
        sessionStorage.setItem("cl6_multi_fired", "true");
      }
    } catch {
      track("sleeve_select", { key: stdKey, selection_index: 1, selection_keys: stdKey, page_id: PAGE_ID });
    }
  };

  // ---------- Video tracking (Vimeo + YouTube) ----------
  // Give the iframe a stable id whenever a product is active
  const videoIdAttr = active ? `video-${active}` : "";

  // Vimeo: play + ended
  useEffect(() => {
    if (!product?.video || !/vimeo\.com/i.test(product.video) || !active) return;

    let player;
    let started = false;
    let completed = false;

    (async () => {
      await loadVimeoSDK();
      const iframe = document.getElementById(videoIdAttr);
      if (!iframe || !window.Vimeo || !window.Vimeo.Player) return;

      player = new window.Vimeo.Player(iframe);

      player.on("play", async () => {
        if (started) return;
        started = true;

        let title = product.title || "Unknown";
        try {
          const t = await player.getVideoTitle();
          if (t) title = t;
        } catch {}

        let vid = "";
        try {
          const m = String(product.video).match(/video\/(\d+)/);
          if (m && m[1]) vid = m[1];
        } catch {}

        track("video_start", {
          video_provider: "vimeo",
          video_title: title,
          video_id: vid,
          page_id: PAGE_ID,
           utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
          sleeve_key: normalizeKey(active),
        });
      });

      player.on("ended", async () => {
        if (completed) return;
        completed = true;

        let title = product.title || "Unknown";
        try {
          const t = await player.getVideoTitle();
          if (t) title = t;
        } catch {}

        let vid = "";
        try {
          const m = String(product.video).match(/video\/(\d+)/);
          if (m && m[1]) vid = m[1];
        } catch {}

        track("video_complete", {
          video_provider: "vimeo",
          video_title: title,
          video_id: vid,
          page_id: PAGE_ID,
           utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
          sleeve_key: normalizeKey(active),
        });
      });
    })();

    return () => {
      try {
        if (player && player.off) {
          player.off("play");
          player.off("ended");
        }
      } catch {}
    };
    
  }, [active, product?.video]);

  // YouTube: play + ended
  useEffect(() => {
    if (!product?.video || !/youtube\.com\/embed/i.test(product.video) || !active) return;

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
                 utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
                sleeve_key: normalizeKey(active),
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
                 utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
                sleeve_key: normalizeKey(active),
              });
            }
          },
        },
      });
    })();

    return () => {
      try {
        if (player && player.destroy) player.destroy();
      } catch {}
    };
   
  }, [active, product?.video]);

  // -------- Floating "Contact us" nudge (copied from CL5; tracked as click_contact) --------
  const [showContactNudge, setShowContactNudge] = useState(false);
  const [nudgeBottom, setNudgeBottom] = useState(24); // px from bottom
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
      {/* Inline CSS */}
      <style dangerouslySetInnerHTML={{ __html: styleBlock }} />

      {/* Top bar with logo */}
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
                 utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
              })
            }
          >
            <img src="/SingFit New Brand Logo.png" alt="SingFit" className="h-9 md:h-11 w-auto" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <h1
          className="text-center leading-tight tracking-tight text-black text-[34px] md:text-[57px]"
          style={{ fontFamily: "Gotham, Montserrat, Inter, Arial, sans-serif", fontWeight: 700 }}
        >
          Discover the Power of Music with SingFit
        </h1>
        <p
          className="mt-4 text-center text-gray-700 mx-auto text-[18px] md:text-[29px] max-w-4xl leading-snug"
          style={{ fontFamily: "Gotham Light, Gotham, Montserrat, Inter, Arial, sans-serif", fontWeight: 300 }}
        >
          From clinical settings to home care, SingFit engages, uplifts, and supports clients and loved ones through the proven power of singing. 
        </p>
      </section>

      {/* Oval segmented selector */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div
          className="w-full rounded-full bg-[#DAEDF6] border border-gray-200 shadow-md px-4 md:px-5 py-3 md:py-4"
          role="tablist"
          aria-label="Choose your audience"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {options.map(({ key, label }) => {
              const isActive = active === key;
              const isHovered = hovered === key;

              // Shadows
              const inactiveShadow =
                "0 6px 0 rgba(0,0,0,0.08), 0 14px 22px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.60), inset 0 -3px 6px rgba(0,0,0,0.04)";
              const hoverShadow =
                "0 8px 0 rgba(0,0,0,0.10), 0 18px 26px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.60), inset 0 -3px 6px rgba(0,0,0,0.05)";

              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={!!isActive}
                  onClick={() => onSelect(key)}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(key)}
                  onBlur={() => setHovered(null)}
                  className="relative w-full rounded-full select-none cursor-pointer font-semibold text-center text-base md:text-lg
                       transition-[transform,box-shadow,background] duration-150 ease-out
                       focus:outline-none focus:ring-2 focus:ring-[#F47534] focus:ring-offset-1"
                  style={{
                    padding: "0.95rem 1.4rem",
                    color: isActive ? "#F47534" : "#243B53",
                    background: "linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)",
                    border: isActive ? "2px solid #F47534" : "1px solid #D1D5DB",
                    boxShadow: isActive ? "inset 0 0 6px rgba(244,117,52,0.3), 0 2px 0 rgba(0,0,0,0.1)" : isHovered ? hoverShadow : inactiveShadow,
                    transform: isActive ? "translateY(3px)" : isHovered ? "translateY(-2px)" : "translateY(0)",
                    willChange: "transform, box-shadow",
                  }}
                >
                  {/* bevel highlights */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.04)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-2 top-0 rounded-full"
                    style={{ height: "50%", background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)" }}
                  />
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Intro Panel — only after a selection */}
      {product && (
        <section className="max-w-6xl mx-auto px-6 pb-4">
          <div
            key={active}
            className="rounded-2xl border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm transition-opacity duration-200 ease-out opacity-100"
          >
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

                {/* Link CTAs (with tracking) or Form */}
                {product.cta?.type === "link" ? (
                  <div className="mt-6 flex gap-3 flex-wrap">
                    <a
                      href={product.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-3 rounded-md text-white bg-[#F47534] hover:bg-[#d9652c] shadow text-sm md:text-base"
                      onClick={() =>
                        track("click_cta", {
                          button_text: product.cta.label,
                          destination_url: product.cta.href,
                          page_id: PAGE_ID,
                           utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
                          sleeve_key: normalizeKey(active),
                        })
                      }
                    >
                      {product.cta.label}
                    </a>
                    {product.cta.secondary && (
                      <a
                        href={product.cta.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-md text-white bg-[#F47534] hover:bg-[#001F4A] shadow text-sm md:text-base"
                        onClick={() =>
                          track("click_cta", {
                            button_text: product.cta.secondary.label,
                            destination_url: product.cta.secondary.href,
                            page_id: PAGE_ID,
                             utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
                            sleeve_key: normalizeKey(active),
                          })
                        }
                      >
                        {product.cta.secondary.label}
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="mt-6">
                    <div className="text-sm text-gray-700 mb-2">Enter your details and our team will reach out.</div>
                    <InlineForm formType={product.cta?.formType ?? product.title} />
                  </div>
                )}
              </div>

              {product.video ? (
                <div className="md:col-span-6">
                  <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow ring-1 ring-black/5">
                    <iframe
                      id={videoIdAttr}
                      key={active}
                      className="w-full h-[220px] md:h-[340px]"
                      src={product.video}
                      title={`${product.title} video`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* Featured on — continuous ticker */}
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
        {/* Fixed-size logo box for consistent visual size */}
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
                   utm_source: utmParams.utm_source,
  utm_medium: utmParams.utm_medium,
  utm_campaign: utmParams.utm_campaign,
  utm_term: utmParams.utm_term,
  utm_content: utmParams.utm_content,
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

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 border-t border-gray-200 pt-6 mt-8 px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
          <span>©2025 Musical Health Technologies. All Rights Reserved.</span>
          <span>1010 Wilshire Blvd. Los Angeles, CA 90017</span>
          <a href="https://www.singfit.com/privacypolicy" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
