import { useState, useRef, useEffect } from "react";

/**
 * CampaignLanding7 — gag variant:
 * Same clean layout as 6, but ANY selection triggers a full-screen image takeover.
 */
export default function CampaignLanding7() {
  const [active, setActive] = useState(null);
  const [pulseOn, setPulseOn] = useState(true);
  const [showPrank, setShowPrank] = useState(false);

  const BRAND_ORANGE = "#F47534";
  const BRAND_NAVY = "#002F6C";

  // Pulse (loops until click)
  const styleBlock = `
    @keyframes sf-pulse-loop {
      0%   { box-shadow: 0 0 0 0 rgba(244,117,52,0.35); transform: scale(1); }
      60%  { box-shadow: 0 0 0 12px rgba(244,117,52,0);  transform: scale(1.007); }
      100% { box-shadow: 0 0 0 0 rgba(244,117,52,0);    transform: scale(1); }
    }
    .sf-pulse-loop { animation: sf-pulse-loop 1200ms ease-out infinite; }
    @keyframes sf-fade-in { from { opacity: 0 } to { opacity: 1 } }
    .sf-fade-in { animation: sf-fade-in 220ms ease-out both; }
    @media (prefers-reduced-motion: reduce) {
      .sf-pulse-loop { animation: none !important; }
      .sf-fade-in { animation: none !important; opacity: 1; }
    }
  `;

  const options = [
    { key: "caregivers", label: "For Caregivers" },
    { key: "therapists", label: "For Rehab Therapists" },
    { key: "senior", label: "For Senior Living" },
    { key: "homehealth", label: "For Home Health/Care" },
  ];

  // --- Continuous ticker (safe, no CSS reset) ---
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const mql = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql && mql.matches) return;

    const waitForImages = () => {
      const imgs = Array.from(track.querySelectorAll("img"));
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
    const SPEED = 0.45; // px/frame

    const getFirstSpan = () => {
      const first = track.children[0];
      if (!first) return 0;
      const rect = first.getBoundingClientRect();
      const cs = getComputedStyle(track);
      const gap = parseFloat(cs.columnGap || cs.gap || "0") || 0;
      return rect.width + gap;
    };

    const step = () => {
      if (!paused) {
        offset -= SPEED;
        track.style.transform = `translate3d(${offset}px,0,0)`;
        let span = getFirstSpan();
        while (span > 0 && -offset >= span) {
          track.appendChild(track.children[0]);
          offset += span;
          track.style.transform = `translate3d(${offset}px,0,0)`;
          span = getFirstSpan();
        }
      }
      rafId = requestAnimationFrame(step);
    };

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    const onResize = () => {
      offset = 0;
      track.style.transform = "translate3d(0,0,0)";
    };

    let cleanup = () => {};
    waitForImages().then(() => {
      if (!track.dataset.cloned) {
        const originals = Array.from(track.children);
        if (track.scrollWidth < wrap.offsetWidth + 200) {
          originals.forEach((n) => track.appendChild(n.cloneNode(true)));
        }
        track.dataset.cloned = "1";
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

  // Disable page scroll when prank is active (so it truly “takes over”)
  useEffect(() => {
    if (showPrank) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [showPrank]);

  // Press logos from /public (same as 6 — change as you like)
  const FEATURED_LOGOS = [
    { src: "/billboard.png", alt: "Billboard", href: "https://www.singfit.com/press" },
    { src: "/forbes.png", alt: "Forbes", href: "https://www.singfit.com/press" },
    { src: "/temple.png", alt: "Temple University", href: "https://www.singfit.com/press" },
    { src: "/Senior-Housing-News-Logo.png", alt: "Senior Housing News", href: "https://www.singfit.com/press" },
    { src: "/aarp-logo.png", alt: "AARP", href: "https://www.singfit.com/press" },
  ];

  const handleSelect = (key) => {
    setActive(key);
    setPulseOn(false);
    setShowPrank(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: styleBlock }} />

      {/* Header */}
      <header className="w-full mb-8 md:mb-12 lg:mb-14">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center">
          <a
            href="https://www.singfit.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
            aria-label="SingFit website"
          >
            <img src="/SingFit New Brand Logo.png" alt="SingFit" className="h-9 md:h-11 w-auto" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-0 pb-12">
        <h1
          className="text-center leading-tight tracking-tight text-black text-[34px] md:text-[57px]"
          style={{ fontFamily: "Gotham, Montserrat, Inter, Arial, sans-serif", fontWeight: 700 }}
        >
          Discover the Power of Music
        </h1>
        <p
          className="mt-4 text-center text-gray-700 mx-auto text-[18px] md:text-[29px] max-w-4xl leading-snug"
          style={{ fontFamily: "Gotham Light, Gotham, Montserrat, Inter, Arial, sans-serif", fontWeight: 300 }}
        >
          A digital therapeutic platform built to support wellness through song — at home, in therapy, and in senior living.
        </p>
      </section>

      {/* Oval segmented selector — slim, full width, pulsing until click */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div
          className={`w-full rounded-full bg-[#DAECF6] border border-gray-200 shadow-md
                      px-4 md:px-5 py-3 md:py-4 ${pulseOn ? "sf-pulse-loop" : ""}`}
          role="tablist"
          aria-label="Choose your audience"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {options.map(({ key, label }) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={!!isActive}
                  onClick={() => handleSelect(key)}
                  className={`w-full rounded-full transition font-semibold text-center
                              px-6 md:px-7 py-4 md:py-4 text-base
                              ${isActive
                                ? "text-white"
                                : "text-[#243B53] bg-white border border-gray-300 hover:bg-white/80"}`}
                  style={{
                    backgroundColor: isActive ? BRAND_NAVY : undefined,
                    boxShadow: isActive ? `0 0 0 3px ${BRAND_ORANGE}` : "none",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

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
                className="flex items-center will-change-transform"
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
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-8 md:h-10 w-auto object-contain"
                        loading="eager"
                        decoding="async"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="sr-only">Logos scroll continuously. Hover to pause.</p>
          </div>
        </div>
      </section>

      {/* FULL-PAGE TAKEOVER on click */}
      {showPrank && (
        <div className="fixed inset-0 z-[9999] bg-black sf-fade-in">
          <img
            src="/John Birthday Dad Joke.png"
            alt="Happy Birthday, John! Dad Joke Takeover"
            className="w-screen h-screen object-contain"
          />
        </div>
      )}
    </div>
  );
}
