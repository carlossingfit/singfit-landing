import { useState, useRef, useEffect } from "react";

/**
 * CampaignLanding6 — clean hero + oval selector (infinite pulse until click)
 * + hidden-until-selected product intro + continuous press ticker (safe)
 */
export default function CampaignLanding6() {
  const [active, setActive] = useState(null); // null | caregivers | therapists | senior | homehealth
  const [pulseOn, setPulseOn] = useState(true);

  const BRAND_ORANGE = "#F47534";
  const BRAND_NAVY = "#002F6C";

  // One tiny CSS block for the looping pulse (until click)
  const styleBlock = `
    @keyframes sf-pulse-loop {
      0%   { box-shadow: 0 0 0 0 rgba(244,117,52,0.35); transform: scale(1); }
      60%  { box-shadow: 0 0 0 12px rgba(244,117,52,0);  transform: scale(1.007); }
      100% { box-shadow: 0 0 0 0 rgba(244,117,52,0);    transform: scale(1); }
    }
    .sf-pulse-loop {
      animation: sf-pulse-loop 1200ms ease-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .sf-pulse-loop { animation: none !important; }
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
      tagline: "Guided music sessions you can lead at home.",
      bullets: [
        "Step-by-step activities with on-screen lyrics",
        "Coaching cues and mood tracking",
        "Designed for everyday use",
      ],
      video: "https://player.vimeo.com/video/736275780?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: { type: "link", label: "Go to Caregiver App", href: "https://www.singfit.com/studiocaregiver" },
    },
    therapists: {
      title: "SingFit STUDIO PRO",
      tagline: "Clinical tools for 1:1 and small-group work.",
      bullets: [
        "Flexible session building",
        "Supports documentation needs",
        "Built by board-certified music therapists",
      ],
      video: "https://player.vimeo.com/video/1089881903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: { type: "link", label: "For Therapists", href: "https://www.singfit.com/studiopro" },
    },
    senior: {
      title: "SingFit PRIME",
      tagline: "Turnkey group programming for senior living.",
      bullets: [
        "Train staff quickly and consistently",
        "Evidence-based sessions ready to run",
        "Implementation and ongoing support",
      ],
      video: "https://www.youtube.com/embed/7a2YFIkNbrM?si=5nrz4ZWD6m8YrMWe",
      cta: { type: "form", label: "Get Pricing & Details", formType: "Senior Living" },
    },
    homehealth: {
      title: "Home Health/Care",
      tagline: "Deploy across distributed teams and families.",
      bullets: [
        "Clinical & family-facing options",
        "Program design and onboarding",
        "Fits existing care workflows",
      ],
      video: "https://player.vimeo.com/video/1089881903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      cta: { type: "form", label: "Discuss Home Health", formType: "Home Health/Care" },
    },
  };

  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/YOUR_UNIQUE_WEBHOOK";

  const InlineForm = ({ formType }) => (
    <form
      className="mt-4 flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value.trim();
        const name = e.currentTarget.name?.value?.trim() || "";
        const company = e.currentTarget.company?.value?.trim() || "";
        try {
          await fetch(MAKE_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name, company, formType }),
          });
        } catch {}
        e.currentTarget.reset();
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
          className="px-4 py-3 rounded-md text-white text-sm bg-[#F47534] hover:bg-[#d9652c] shadow"
        >
          Submit
        </button>
      </div>
      <p className="text-xs text-gray-500">We’ll reach out with next steps for {formType}.</p>
    </form>
  );

  // -------- Continuous ticker (safe, no resets) --------
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

  // Press logos from /public
  const FEATURED_LOGOS = [
    { src: "/billboard.png", alt: "Billboard", href: "https://www.singfit.com/press" },
    { src: "/forbes.png", alt: "Forbes", href: "https://www.singfit.com/press" },
    { src: "/temple.png", alt: "Temple University", href: "https://www.singfit.com/press" },
    { src: "/Senior-Housing-News-Logo.png", alt: "Senior Housing News", href: "https://www.singfit.com/press" },
    { src: "/aarp-logo.png", alt: "AARP", href: "https://www.singfit.com/press" },
  ];

  const product = active ? PRODUCTS[active] : null;

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
          Discover the Power of Music
        </h1>
        <p
          className="mt-4 text-center text-gray-700 mx-auto text-[18px] md:text-[29px] max-w-4xl leading-snug"
          style={{ fontFamily: "Gotham Light, Gotham, Montserrat, Inter, Arial, sans-serif", fontWeight: 300 }}
        >
          A digital therapeutic platform built to support wellness through song — at home, in therapy, and in senior living.
        </p>
      </section>

      {/* Oval segmented selector — same size as before; pulsing until click */}
      {/* Oval segmented selector — slimmer pill, same full width */}
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
            onClick={() => {
              setActive(key);
              setPulseOn(false);
            }}
            className={`w-full rounded-full transition font-semibold text-center
                        px-6 md:px-7 py-4 md:py-4 text-base
                        ${isActive
                          ? "text-white"
                          : "text-[#243B53] bg-white border border-gray-300 hover:bg-white/80"}`}
            style={{
              backgroundColor: isActive ? "#002F6C" : undefined,
              boxShadow: isActive ? "0 0 0 3px #F47534" : "none",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  </div>
</section>


      {/* Product Intro Panel — only after a selection */}
      {product && (
        <section className="max-w-6xl mx-auto px-6 pb-14">
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
                <p className="mt-2 text-gray-800 text-base md:text-lg">{product.tagline}</p>
                {product.bullets?.length ? (
                  <ul className="mt-4 list-disc pl-5 text-sm md:text-base text-gray-800 space-y-1">
                    {product.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {product.cta?.type === "link" ? (
                  <div className="mt-6">
                    <a
                      href={product.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-3 rounded-md text-white bg-[#F47534] hover:bg-[#d9652c] shadow text-sm md:text-base"
                    >
                      {product.cta.label}
                    </a>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div className="text-sm text-gray-700 mb-2">Enter your details and our team will reach out.</div>
                    <InlineForm formType={product.cta.formType} />
                  </div>
                )}
              </div>
              {product.video ? (
                <div className="md:col-span-6">
                  <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow ring-1 ring-black/5">
                    <iframe
                      key={active}
                      className="w-full h-[220px] md:h-[340px]"
                      src={product.video}
                      title={`${product.title} video`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">Video is illustrative; content may vary by product.</p>
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
    </div>
  );
}
