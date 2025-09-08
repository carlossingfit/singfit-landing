import { useState, useEffect, useRef } from "react";
import { Button } from "./components/ui/button";
// Optional analytics hook — remove import + track calls if you don’t use it.
import { useAnalytics } from "./useAnalytics";
import { HealtcareIcon, StethoscopeIcon, UserGroupIcon, House03Icon } from "hugeicons-react";

// --- Vimeo tracking helper ---
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
// --- YouTube tracking helper ---
function loadYouTubeSDK() {
  return new Promise((resolve) => {
    // If it's already available, we're done
    if (window.YT && window.YT.Player) return resolve();

    // Inject the IFrame API script once
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    // The API calls this global when ready
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === "function") prev();
      resolve();
    };

    // Safety poll in case onYouTubeIframeAPIReady already fired
    (function check() {
      if (window.YT && window.YT.Player) return resolve();
      setTimeout(check, 50);
    })();
  });
}

export default function CampaignLanding5() {
  const { track = () => {} } = useAnalytics ? useAnalytics("CampaignLanding5") : { track: () => {} };

  // ---------- CONFIG ----------
  const BRAND_ORANGE = "#F47534";
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/YOUR_UNIQUE_WEBHOOK";

  // Swap these video URLs with your real embeds
  const PANELS = {
    caregiver: {
      icon: <HealtcareIcon className="h-10 w-10 text-[#F47534]" />,
      label: "Caregiver",
      title: "SingFit STUDIO Caregiver",
      desc: "For individuals supporting loved ones at home.",
      bullets: [
        "Guided, step-by-step sessions to help you do stuff more a",
        "Lyrics on screen with voice coaching",
        "Track mood and engagement over time",
      ],
      video: "https://player.vimeo.com/video/736275780?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta:[
       { type: "link", label: "Learn More", url: "https://www.singfit.com/studiocaregiver" },
       { type: "link", label: "Buy Now", url: "https://www.singfit.com/caregiver-pricing" }
      ],
    },
    therapist: {
      icon: <StethoscopeIcon className="h-10 w-10 text-[#F47534]" />,
      label: "Rehab Therapy",
      title: "SingFit STUDIO PRO",
      desc: "For individual therapists and clinical use.",
      bullets: [
        "Tools for 1:1 and small groups",
        "Clinical documentation support",
        "Flexible session building",
      ],
      video: "https://player.vimeo.com/video/1089881903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
    },
    senior: {
      icon: <UserGroupIcon className="h-10 w-10 text-[#F47534]" />,
      label: "Senior Living",
      title: "SingFit PRIME",
      desc: "Turnkey programming for senior living communities.",
      bullets: [
        "Staff-friendly group sessions",
        "Created by board-certified music therapists",
        "Training and implementation support",
      ],
      video: "https://www.youtube.com/embed/7a2YFIkNbrM?enablejsapi=1",
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
    },
    homehealth: {
      icon: <House03Icon className="h-10 w-10 text-[#F47534]" />,
      label: "Home Health/Care",
      title: "Home Health/Care",
      desc: "Implementations for home health and home care.",
      bullets: [
        "Deployable across distributed teams",
        "Clinical and family-facing options",
        "Program design and onboarding",
      ],
      video: "https://player.vimeo.com/video/1089881903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: { type: "form", label: "Discuss Home Health", formType: "Home Health/Care" },
    },
  };

  const ORDER = ["caregiver", "therapist", "senior", "homehealth"];
  
  // ---------- END CONFIG ----------
  const [showContactNudge, setShowContactNudge] = useState(false);
  const [nudgeBottom, setNudgeBottom] = useState(24); // px from bottom
  const contactNudgeSentinelRef = useRef(null);
  const [nudgeEntered, setNudgeEntered] = useState(false);

  // show after 5s
  useEffect(() => {
    const t = setTimeout(() => setShowContactNudge(true), 5000); // 5s
    return () => clearTimeout(t);
  }, []);
  // NEW: trigger entrance animation when it appears
  useEffect(() => {
    if (!showContactNudge) return;
    setNudgeEntered(false);
    const r = requestAnimationFrame(() => setNudgeEntered(true));
    return () => cancelAnimationFrame(r);
  }, [showContactNudge]);
  // lift above footer when it appears
  useEffect(() => {
    const el = contactNudgeSentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setNudgeBottom(entry.isIntersecting ? 120 : 24); // adjust 120 if needed
    }, { threshold: 0 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [activeKey, setActiveKey] = useState("caregiver");
  const active = PANELS[activeKey];

// Track YouTube "video_start" and "video_complete" (Senior Living)
useEffect(() => {
  if (!active?.video || !/youtube\.com\/embed/i.test(active.video)) {
    console.log("[YTDebug] Skipping: not a YouTube URL", active?.video);
    return;
  }

  let player;
  let started = false;
  let completed = false;

  (async () => {
    console.log("[YTDebug] Effect start for key:", activeKey, "url:", active.video);
    await loadYouTubeSDK();
    console.log("[YTDebug] SDK ready");

    const iframeId = `video-${activeKey}`;
    const iframe = document.getElementById(iframeId);
    console.log("[YTDebug] iframe lookup:", iframeId, iframe ? "found" : "NOT FOUND");
    if (!iframe || !window.YT || !window.YT.Player) return;

    player = new window.YT.Player(iframe, {
      events: {
        onReady: () => console.log("[YTDebug] Player ready"),
        onStateChange: (e) => {
          if (!window.YT || !player) return;

          if (e.data === window.YT.PlayerState.PLAYING && !started) {
            started = true;

            let videoId = "";
            let title = active.title || "Unknown";
            try {
              const data = player.getVideoData();
              if (data) {
                videoId = data.video_id || "";
                title = data.title || title;
              }
            } catch {}

            console.log("[YTDebug] Tracking video_start", { title, videoId });
            track("video_start", {
              video_provider: "youtube",
              video_title: title,
              video_id: videoId,
              page_id: "CampaignLanding5",
              sleeve_key: activeKey,
            });
          }

          if (e.data === window.YT.PlayerState.ENDED && !completed) {
            completed = true;

            let videoId = "";
            let title = active.title || "Unknown";
            try {
              const data = player.getVideoData();
              if (data) {
                videoId = data.video_id || "";
                title = data.title || title;
              }
            } catch {}

            console.log("[YTDebug] Tracking video_complete", { title, videoId });
            track("video_complete", {
              video_provider: "youtube",
              video_title: title,
              video_id: videoId,
              page_id: "CampaignLanding5",
              sleeve_key: activeKey,
            });
          }
        },
      },
    });
    console.log("[YTDebug] Player created");
  })();

  return () => {
    try {
      if (player && player.destroy) player.destroy();
    } catch {}
  };
}, [activeKey, active?.video]);


// Track Vimeo "video_start" and "video_complete"
useEffect(() => {
  if (!active?.video || !/vimeo\.com/i.test(active.video)) {
    console.log("[VimeoDebug] Skipping: not a Vimeo URL", active?.video);
    return;
  }

  let player;
  let started = false;
  let completed = false;

  (async () => {
    console.log("[VimeoDebug] Effect start for key:", activeKey, "url:", active.video);

    await loadVimeoSDK();
    const iframeId = `video-${activeKey}`;
    const iframe = document.getElementById(iframeId);
    console.log("[VimeoDebug] iframe lookup:", iframeId, iframe ? "found" : "NOT FOUND");

    if (!iframe || !window.Vimeo || !window.Vimeo.Player) return;

    player = new window.Vimeo.Player(iframe);
    console.log("[VimeoDebug] Player created");

    // START
    player.on("play", async () => {
      console.log("[VimeoDebug] 'play' event received");
      if (started) return;
      started = true;

      let title = active.title || "Unknown";
      try {
        const t = await player.getVideoTitle();
        if (t) title = t;
      } catch {}

      let videoId = "";
      try {
        const m = String(active.video).match(/video\/(\d+)/);
        if (m && m[1]) videoId = m[1];
      } catch {}

      console.log("[VimeoDebug] Tracking video_start", { title, videoId });
      track("video_start", {
        video_provider: "vimeo",
        video_title: title,
        video_id: videoId,
        page_id: "CampaignLanding5",
        sleeve_key: activeKey,
      });
    });

    // COMPLETE
    player.on("ended", async () => {
      if (completed) return;
      completed = true;

      let title = active.title || "Unknown";
      try {
        const t = await player.getVideoTitle();
        if (t) title = t;
      } catch {}

      let videoId = "";
      try {
        const m = String(active.video).match(/video\/(\d+)/);
        if (m && m[1]) videoId = m[1];
      } catch {}

      console.log("[VimeoDebug] Tracking video_complete", { title, videoId });
      track("video_complete", {
        video_provider: "vimeo",
        video_title: title,
        video_id: videoId,
        page_id: "CampaignLanding5",
        sleeve_key: activeKey,
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
}, [activeKey, active?.video]);




  // STEP 1: Enhanced profile selection tracking (unique count per session)
  const onSelect = (key) => {
  setActiveKey(key);

  try {
    const STORE_KEY = "cl5_profile_keys";
    const prev = JSON.parse(sessionStorage.getItem(STORE_KEY) || "[]");
    const set = new Set(prev);
    set.add(key);
    const arr = Array.from(set);
    sessionStorage.setItem(STORE_KEY, JSON.stringify(arr));

    // Always track the normal selection
    track("sleeve_select", {
      key,
      selection_index: arr.length,
      selection_keys: arr.join(","),
    });

    // NEW: fire multi_profile_select only the first time count reaches 2+
    if (arr.length === 2 && !sessionStorage.getItem("cl5_multi_fired")) {
      track("multi_profile_select", {
        count: arr.length,
        selection_keys: arr.join(","),
        page_id: "CampaignLanding5",
      });
      sessionStorage.setItem("cl5_multi_fired", "true");
    }
  } catch {
    track("sleeve_select", { key, selection_index: 1, selection_keys: key });
  }

  document
    .getElementById("detail-panel")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

  const InlineForm = ({ formType }) => {
    const [status, setStatus] = useState({ type: null, message: "" });
    const [submitting, setSubmitting] = useState(false);

    return (
      <form
        className="mt-4 flex flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const email = e.currentTarget.email.value.trim();
          const name = e.currentTarget.name?.value?.trim() || "";

          if (!email) {
            setStatus({ type: "error", message: "Please enter a valid email." });
            return;
          }

          setSubmitting(true);
          setStatus({ type: null, message: "" });

          track("submit_form", { form_id: "campaign_inline", formType, email });

          try {
            const res = await fetch(MAKE_WEBHOOK_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, name, formType }),
            });

            if (res.ok) {
              setStatus({ type: "success", message: "Thanks! We’ll be in touch shortly." });
              e.currentTarget.reset();
            } else {
              setStatus({ type: "error", message: "There was a problem. Please try again." });
            }
          } catch {
            setStatus({ type: "error", message: "Network error. Please try again." });
          } finally {
            setSubmitting(false);
            setTimeout(() => setStatus({ type: null, message: "" }), 6000);
          }
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your name (optional)"
          className="px-3 py-2 rounded-md border border-gray-300 text-base w-full focus:ring-2 focus:ring-[#F47534]"
          disabled={submitting}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder="Email (required)"
            className="px-3 py-2 rounded-md border border-gray-300 text-base w-full focus:ring-2 focus:ring-[#F47534]"
            disabled={submitting}
          />
          <Button
            type="submit"
            disabled={submitting}
            className={`text-base px-5 py-3 bg-[#F47534] text-white hover:bg-[#d9652c] shadow ${
              submitting ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Submitting…" : "Submit"}
          </Button>
        </div>

        {status.message ? (
          <div
            role="status"
            aria-live="polite"
            className={`text-sm mt-2 ${status.type === "success" ? "text-green-700" : "text-red-600"}`}
          >
            {status.message}
          </div>
        ) : null}
      </form>
    );
  };

  return (
    <div className="bg-white min-h-screen px-6 py-8 max-w-6xl mx-auto font-sans text-gray-900">
      {/* HERO (reuse your CampaignLanding2 hero styling) */}
      <section className="bg-[#0091C8] rounded-2xl shadow-xl border border-gray-200 px-6 pt-6 pb-10 relative overflow-hidden mb-8">
        <div className="max-w-3xl mx-auto text-center mt-6 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.5] mb-2">
            <span className="block mb-3">Discover the Power of Music</span>
            <span className="inline-flex items-center justify-center gap-2">
              <span>with</span>
              <a href="https://www.singfit.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img
                  src="/White no smile.png"
                  alt="SingFit"
                  className="h-10 md:h-12 relative top-[2.8px] hover:opacity-80 transition-opacity duration-200"
                />
              </a>
            </span>
          </h1>
          <p className="text-xl text-white font-medium">
            A digital therapeutic platform built to support wellness through song — at home, in therapy, and in senior living.
          </p>
        </div>
      </section>

      {/* Header above content */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          Find the Right <span className="text-[#F47534]">FIT</span> for You
        </h2>
      </div>

      {/* LAYERED SLEEVES GRID */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ORDER.map((key) => {
            const p = PANELS[key];
            const active = key === activeKey;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                aria-pressed={active}
                className={`w-full min-h-48 rounded-2xl text-center transition
                  focus:outline-none focus:ring-2 focus:ring-[#F47534]
                  ${
                    active
                      ? "bg-[#FFF5F0] border-2 border-[#F47534] shadow-md"
                      : "bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F47534]/50 hover:bg-gradient-to-br hover:from-[#FEF8F5] hover:to-white"
                  }
                `}
              >
                <div className="p-5 h-full flex flex-col items-center justify-between">
                  {/* Normalized icon box */}
                  <div className="flex items-center justify-center h-12 w-12">
                    {p.icon}
                  </div>

                  <div className="mt-2 font-bold text-lg md:text-xl text-[#002F6C]">
                    {p.label}
                  </div>
                  <div className="text-base md:text-lg text-gray-700 mt-1 line-clamp-2">
                    {p.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* DETAIL PANEL */}
      <section id="detail-panel" className="rounded-2xl shadow-xl border border-gray-200 overflow-hidden bg-gradient-to-br from-[#EEF6FA] via-white to-[#FAF6F2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* LEFT: VIDEO (left-justified; minimal padding) */}
          <div className="p-5 md:p-7">
            <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow ring-1 ring-black/5">
              <iframe
  id={`video-${activeKey}`}    
  key={activeKey}
  className="w-full h-[260px] md:h-[380px]"
  src={active.video}
  title={`${active.title} video`}
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
  allowFullScreen
  sandbox="allow-scripts allow-same-origin allow-presentation"
/>
            </div>
          </div>

          {/* RIGHT: COPY + CTA / FORM */}
          <div className="p-5 md:p-6 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white/70 backdrop-blur flex flex-col justify-between h-full">
            <div>
              <h3 className="text-3xl font-extrabold" style={{ color: BRAND_ORANGE }}>
                {active.title}
              </h3>
              <p className="mt-3 text-xl text-gray-800 leading-relaxed">{active.desc}</p>
              {active.bullets?.length ? (
                <ul className="mt-4 list-disc pl-6 text-lg text-gray-800 space-y-2">
                  {active.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {/* Caregiver-only filler */}
              {activeKey === "caregiver" && (
                <>
                  <p className="mt-20 text-base text-gray-500 italic">
                    Ready to see how SingFit can help you?
                  </p>
                </>
              )}
            </div>

            {/* CTA: sits directly under content, but pinned to bottom by justify-between */}
            <div className="mt-6">
              {Array.isArray(active.cta) ? (
                <div className="flex flex-wrap gap-3">
                  {active.cta.map((cta, idx) => (
                    <Button
                      key={idx}
                      onClick={() => {
                        track("click_cta", {
                          button_text: cta.label,
                          destination_url: cta.url,
                          page_id: "CampaignLanding5",
                        });
                        window.open(cta.url, "_blank");
                      }}
                      className="text-base px-5 py-2 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
                    >
                      {cta.label}
                    </Button>
                  ))}
                </div>
              ) : active.cta?.type === "link" ? (
                <Button
                  onClick={() => {
                    track("click_cta", {
                      button_text: active.cta.label,
                      destination_url: active.cta.url,
                      page_id: "CampaignLanding5",
                    });
                    window.open(active.cta.url, "_blank");
                  }}
                  className="text-base px-5 py-2 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
                >
                  {active.cta.label}
                </Button>
              ) : (
                <div>
                  <div className="text-base text-gray-700 mb-2">
                    Enter your details and our team will reach out.
                  </div>
                  <InlineForm formType={active.cta.formType} />
                </div>
              )}
            </div>
          </div>

        </div>       
      </section>
      {/* Existing CTA block(s) here… */}

      <div ref={contactNudgeSentinelRef} aria-hidden="true" />
      {showContactNudge && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out
            ${nudgeEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0
          `}
          style={{ right: 16, bottom: nudgeBottom, left: "auto" }}
        >
          <div className="flex items-center gap-3 rounded-full bg-white/95 backdrop-blur border border-gray-200 shadow-lg px-4 py-2">
            <span className="text-sm text-gray-700 hidden sm:inline">
              Need Help?
            </span>
            <a
              href="https://www.singfit.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-1 rounded-full bg-[#F47534] text-white hover:bg-[#d9652c] transition"
            >
              Contact us
            </a>
            <button
              aria-label="Dismiss"
              onClick={() => setShowContactNudge(false)}
              className="ml-1 p-1 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
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
          <a
            href="https://www.singfit.com/privacypolicy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
