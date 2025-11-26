import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
// Optional analytics hook
import { useAnalytics } from "./useAnalytics";
import { HealtcareIcon, StethoscopeIcon, House03Icon } from "hugeicons-react";

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

// --- YouTube tracking helper (kept for future flexibility, but not used on this page) ---
function loadYouTubeSDK() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve();

    const existing = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
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

    (function check() {
      if (window.YT && window.YT.Player) return resolve();
      setTimeout(check, 50);
    })();
  });
}

export default function UKLanding() {
  const { track = () => {} } = useAnalytics
    ? useAnalytics("UKLanding")
    : { track: () => {} };

  const PAGE_ID = "UKLanding";

  const BRAND_ORANGE = "#F47534";
  const MAKE_WEBHOOK_URL = "/api/lead";

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

  // ---------- PANELS CONFIG (UK) ----------
  const PANELS = {
    caregiver: {
      icon: <HealtcareIcon className="h-10 w-10 text-[#F47534]" />,
      label: "Caregiver",
      title: "SingFit STUDIO Caregiver",
      desc: "For individuals supporting loved ones at home",
      bullets: [
        "Foster a sense of connection with your loved one",
        "Structured sessions tailored to your loved one’s goals",
        "Lyric prompting supports a failure free singing experience",
      ],
      video:
        "https://player.vimeo.com/video/736275780?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      // Replaced link CTAs with inline contact form
      cta: { type: "form", formType: "Caregiver" },
    },
    therapist: {
      icon: <StethoscopeIcon className="h-10 w-10 text-[#F47534]" />,
      label: "Rehab Therapy",
      title: "SingFit STUDIO PRO",
      desc: "For individual therapists and clinical use",
      bullets: [
        "Designed by board certified music therapists",
        "Track client progress towards goals over time",
        "Personalise sessions for each client’s goals and needs",
      ],
      // Updated video URL
      video:
  "https://player.vimeo.com/video/1140200543?h=0560ed1816&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",

      cta: { type: "form", label: "Get Pricing & Details", formType: "Rehab Therapy" },
    },
    homehealth: {
      icon: <House03Icon className="h-10 w-10 text-[#F47534]" />,
      label: "Home Health/Care",
      title: "Home Health/Care",
      desc: "For home health and home care professionals",
      bullets: [
        "Captivate users with age appropriate popular songs",
        "Clinical and family facing options",
        "Easily fits into existing care workflows",
      ],
      // Updated video URL
      video:
  "https://player.vimeo.com/video/1140200543?h=0560ed1816&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",

      cta: { type: "form", label: "Discuss Home Health", formType: "Home Health/Care" },
    },
  };

  // Senior Living removed; only 3 blocks
  const ORDER = ["caregiver", "therapist", "homehealth"];

  const [activeKey, setActiveKey] = useState("caregiver");
  const active = PANELS[activeKey];

  // Track YouTube video events (no YouTube videos configured on this page now, but kept as a no op if all videos are Vimeo)
  useEffect(() => {
    if (!active?.video || !/youtube\.com\/embed/i.test(active.video)) {
      return;
    }

    let player;
    let started = false;
    let completed = false;

    (async () => {
      await loadYouTubeSDK();

      const iframeId = `video-${activeKey}`;
      const iframe = document.getElementById(iframeId);
      if (!iframe || !window.YT || !window.YT.Player) return;

      player = new window.YT.Player(iframe, {
        events: {
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

              track("video_start", {
                video_provider: "youtube",
                video_title: title,
                video_id: videoId,
                page_id: PAGE_ID,
                utm_source: utmParams.utm_source,
                utm_medium: utmParams.utm_medium,
                utm_campaign: utmParams.utm_campaign,
                utm_term: utmParams.utm_term,
                utm_content: utmParams.utm_content,
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

              track("video_complete", {
                video_provider: "youtube",
                video_title: title,
                video_id: videoId,
                page_id: PAGE_ID,
                utm_source: utmParams.utm_source,
                utm_medium: utmParams.utm_medium,
                utm_campaign: utmParams.utm_campaign,
                utm_term: utmParams.utm_term,
                utm_content: utmParams.utm_content,
                sleeve_key: activeKey,
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
  }, [activeKey, active?.video, utmParams, PAGE_ID]);

  // Track Vimeo video events
  useEffect(() => {
    if (!active?.video || !/vimeo\.com/i.test(active.video)) {
      return;
    }

    let player;
    let started = false;
    let completed = false;

    (async () => {
      await loadVimeoSDK();
      const iframeId = `video-${activeKey}`;
      const iframe = document.getElementById(iframeId);

      if (!iframe || !window.Vimeo || !window.Vimeo.Player) return;

      player = new window.Vimeo.Player(iframe);

      player.on("play", async () => {
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

        track("video_start", {
          video_provider: "vimeo",
          video_title: title,
          video_id: videoId,
          page_id: PAGE_ID,
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_term: utmParams.utm_term,
          utm_content: utmParams.utm_content,
          sleeve_key: activeKey,
        });
      });

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

        track("video_complete", {
          video_provider: "vimeo",
          video_title: title,
          video_id: videoId,
          page_id: PAGE_ID,
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_term: utmParams.utm_term,
          utm_content: utmParams.utm_content,
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
  }, [activeKey, active?.video, utmParams, PAGE_ID]);

  // Profile selection tracking
  const onSelect = (key) => {
    setActiveKey(key);

    try {
      const STORE_KEY = "uk_profile_keys";
      const prev = JSON.parse(sessionStorage.getItem(STORE_KEY) || "[]");
      const set = new Set(prev);
      set.add(key);
      const arr = Array.from(set);
      sessionStorage.setItem(STORE_KEY, JSON.stringify(arr));

      track("sleeve_select", {
        key,
        selection_index: arr.length,
        selection_keys: arr.join(","),
        page_id: PAGE_ID,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      });

      if (arr.length === 2 && !sessionStorage.getItem("uk_multi_fired")) {
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
        sessionStorage.setItem("uk_multi_fired", "true");
      }
    } catch {
      track("sleeve_select", {
        key,
        selection_index: 1,
        selection_keys: key,
        page_id: PAGE_ID,
      });
    }

    document
      .getElementById("detail-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const InlineForm = ({ formType }) => {
    const [status, setStatus] = useState("");
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

          const email = e.currentTarget.email.value.trim();
          const name = e.currentTarget.name?.value?.trim() || "";
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

            if (res.status >= 200 && res.status < 300) {
              setStatus("ok");
              setMsg("Thanks. We will be in touch soon.");
              e.target.reset?.();
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
          <p
            role="status"
            aria-live="polite"
            className={`text-sm mt-1 ${
              status === "ok" ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    );
  };

  return (
    <div className="bg-white min-h-screen px-6 py-8 max-w-6xl mx-auto font-sans text-gray-900">
      {/* HERO */}
      <section className="bg-[#0091C8] rounded-2xl shadow-xl border border-gray-200 px-6 pt-6 pb-10 relative overflow-hidden mb-8">
        <div className="max-w-3xl mx-auto text-center mt-6 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.5] mb-2">
            <span className="block mb-3">Unlock The Power of Music</span>
            <span className="inline-flex items-center justify-center gap-2">
              <span>with</span>
              <a
                href="https://www.singfit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                onClick={() => {
                  track("click_cta", {
                    button_text: "SingFit Logo",
                    destination_url: "https://www.singfit.com/",
                    page_id: PAGE_ID,
                    utm_source: utmParams.utm_source,
                    utm_medium: utmParams.utm_medium,
                    utm_campaign: utmParams.utm_campaign,
                    utm_term: utmParams.utm_term,
                    utm_content: utmParams.utm_content,
                    sleeve_key: activeKey,
                  });
                }}
              >
                <img
                  src="/White no smile.png"
                  alt="SingFit"
                  className="h-10 md:h-12 relative top-[2.8px] hover:opacity-80 transition-opacity duration-200"
                />
              </a>
            </span>
          </h1>
          <p className="text-xl text-white font-medium">
            Discover how singing can supercharge your care team and uplift every
            resident or client you serve.
          </p>
        </div>
      </section>

      {/* Header above content */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
          Find the Right <span className="text-[#F47534]">FIT</span> for You
        </h2>
      </div>

      {/* Selection grid with 3 blocks */}
      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ORDER.map((key) => {
            const p = PANELS[key];
            const isActive = key === activeKey;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                aria-pressed={isActive}
                className={`w-full min-h-48 rounded-2xl text-center transition
                  focus:outline-none focus:ring-2 focus:ring-[#F47534]
                  ${
                    isActive
                      ? "bg-[#FFF5F0] border-2 border-[#F47534] shadow-md"
                      : "bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F47534]/50 hover:bg-gradient-to-br hover:from-[#FEF8F5] hover:to-white"
                  }
                `}
              >
                <div className="p-5 h-full flex flex-col items-center justify-between">
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

      {/* New promo line between blocks and detail section */}
    <div className="text-center mb-10 mt-6">
  <p className="text-xl md:text-2xl font-semibold text-[#002F6C]">
    <span className="relative">
      Sign up now and enjoy SingFit STUDIO free through the end of 2025.
      <span className="absolute left-0 bottom-0 w-full h-2 bg-[#FDE7D8] -z-10 rounded-sm"></span>
    </span>
  </p>
</div>



      {/* Detail panel */}
      <section
        id="detail-panel"
        className="rounded-2xl shadow-xl border border-gray-200 overflow-hidden bg-gradient-to-br from-[#EEF6FA] via-white to-[#FAF6F2]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* Left: video */}
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

          {/* Right: copy and CTA/form */}
          <div className="p-5 md:p-6 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white/70 backdrop-blur flex flex-col justify-between h-full">
            <div>
              <h3
                className="text-3xl font-extrabold"
                style={{ color: BRAND_ORANGE }}
              >
                {active.title}
              </h3>
              <p className="mt-3 text-xl text-gray-800 leading-relaxed">
                {active.desc}
              </p>
              {active.bullets?.length ? (
                <ul className="mt-4 list-disc pl-6 text-lg text-gray-800 space-y-2">
                  {active.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : null}

              {activeKey === "caregiver" && (
                <p className="mt-6 text-base text-gray-600 italic">
                  Ready to see how SingFit can support you and your loved one.
                </p>
              )}
            </div>

            <div className="mt-6">
              {Array.isArray(active.cta) ? (
                <div className="flex flex-wrap gap-3">
                  {active.cta.map((cta, idx) => (
                    <Button
                      key={idx}
                      className="text-base px-5 py-2 bg-[#F47534] text-white hover:bg-[#d9652c] shadow"
                      asChild
                    >
                      <a
                        href={cta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          track("click_cta", {
                            button_text: cta.label,
                            destination_url: cta.url,
                            page_id: PAGE_ID,
                            utm_source: utmParams.utm_source,
                            utm_medium: utmParams.utm_medium,
                            utm_campaign: utmParams.utm_campaign,
                            utm_term: utmParams.utm_term,
                            utm_content: utmParams.utm_content,
                          });
                        }}
                      >
                        {cta.label}
                      </a>
                    </Button>
                  ))}
                </div>
              ) : active.cta?.type === "link" ? (
                <Button className="text-base px-5 py-2 bg-[#F47534] text-white hover:bg-[#d9652c] shadow" asChild>
                  <a
                    href={active.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      track("click_cta", {
                        button_text: active.cta.label,
                        destination_url: active.cta.url,
                        page_id: PAGE_ID,
                        utm_source: utmParams.utm_source,
                        utm_medium: utmParams.utm_medium,
                        utm_campaign: utmParams.utm_campaign,
                        utm_term: utmParams.utm_term,
                        utm_content: utmParams.utm_content,
                      });
                    }}
                  >
                    {active.cta.label}
                  </a>
                </Button>
              ) : (
                <div>
                  <div className="text-base text-gray-700 mb-2">
                    Enter your details and our team will reach out.
                  </div>
                  <InlineForm formType={active.cta?.formType ?? active.label} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
