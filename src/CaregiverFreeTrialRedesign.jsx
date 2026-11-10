import "./CaregiverFreeTrialRedesign.css";
import ApprovedCaregiverHero from "./ApprovedCaregiverHero";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * SingFit Caregiver: simplified landing-page redesign.
 * Drop-in replacement for the existing CaregiverFreeTrial component.
 *
 * BEFORE LAUNCH:
 * 1. Set INTERACTIVE_DEMO_URL to the approved public demo route.
 * 2. Replace EXPLAINER_VIDEO_URL with the finished 20–30-second product explainer.
 * 3. Confirm the existing /public image/video assets and Wix checkout URL.
 * 4. QA GTM/GA4, Meta, consent, Wix iframe navigation, and responsive layouts.
 *
 * No new packages or backend are required.
 */
const PAGE_ID = "caregiverfreetrial";
const VIDEO_NAME = "caregiver_free_trial_session_video"; // Retained for existing Vimeo reports
const EXPLAINER_VIDEO_NAME = "caregiver_lyric_coach_explainer";
const CHECKOUT_URL = "https://www.singfit.com/buy";

// Replace with the final public demo URL before publishing. The link is intentionally
// disabled until configured so visitors are never sent to an invented destination.
const INTERACTIVE_DEMO_URL = "https://singfit-free-git-feature-marketi-c46da5-carlossingfits-projects.vercel.app/";
// Place finished video in /public, or use an approved HTTPS video URL.
const EXPLAINER_VIDEO_URL = "";

const ATTRIBUTION_PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid",
];

function buildAttributedUrl(baseUrl) {
  if (!baseUrl || typeof window === "undefined") return baseUrl;
  const currentParams = new URLSearchParams(window.location.search);
  const target = new URL(baseUrl, window.location.origin);
  ATTRIBUTION_PARAMS.forEach((param) => {
    const current = currentParams.get(param);
    try {
      if (current) sessionStorage.setItem(`caregiverfreetrial_${param}`, current);
      const value = current || sessionStorage.getItem(`caregiverfreetrial_${param}`);
      if (value) target.searchParams.set(param, value);
    } catch {
      if (current) target.searchParams.set(param, current);
    }
  });
  return target.toString();
}

function pushDataLayer(eventName, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, page_id: PAGE_ID, ...params });
}

function trackCta(buttonText, destinationUrl, ctaLocation) {
  pushDataLayer("click_cta", {
    button_text: buttonText,
    destination_url: destinationUrl,
    cta_location: ctaLocation,
    offer_type: "30_day_free_trial",
    price_after_trial: 11.99,
  });
}

const faqs = [
  ["Do I need to be musical?", "No. Caregiver is designed for everyday caregivers. Lyric Coach speaks upcoming lyrics to help you sing along without needing to remember every word."],
  ["Is the Interactive Demo the free trial?", "No. The Interactive Demo is a limited browser-based sample of SingFit's music experience. The 30-day free trial gives you access to the full Caregiver app."],
  ["What happens after I start my free trial?", "After subscribing online, download the app, log in, and begin your first guided music session. The first 30 days are free, then the subscription renews at $11.99 per month unless canceled."],
  ["Can I cancel?", "Yes. Cancel anytime. A credit card is required to start the trial. We'll send a reminder three days before the trial ends."],
];

export default function CaregiverFreeTrial() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [explainerPlaying, setExplainerPlaying] = useState(false);
  const vimeoRef = useRef(null);
  const explainerRef = useRef(null);
  const vimeoStarted = useRef(false);
  const vimeoProgress = useRef(new Set());
  const explainerStarted = useRef(false);
  const explainerProgress = useRef(new Set());
  const checkoutUrl = useMemo(() => buildAttributedUrl(CHECKOUT_URL), []);
  const demoUrl = useMemo(() => buildAttributedUrl(INTERACTIVE_DEMO_URL), []);
  const demoReady = Boolean(INTERACTIVE_DEMO_URL);

  useEffect(() => {
    pushDataLayer("landing_page_view", { page_path: window.location.pathname });
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const escape = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== "https://player.vimeo.com") return;
      if (event.source !== vimeoRef.current?.contentWindow) return;
      let payload = event.data;
      if (typeof payload === "string") {
        try { payload = JSON.parse(payload); } catch { return; }
      }
      if (!payload || typeof payload !== "object") return;
      if (payload.event === "play" && !vimeoStarted.current) {
        vimeoStarted.current = true;
        pushDataLayer("video_start", { video_name: VIDEO_NAME });
      }
      if (payload.event === "timeupdate" && payload.data) {
        const percent = Math.floor((payload.data.percent || 0) * 100);
        [25, 50, 75].forEach((milestone) => {
          if (percent >= milestone && !vimeoProgress.current.has(milestone)) {
            vimeoProgress.current.add(milestone);
            pushDataLayer("video_progress", { video_name: VIDEO_NAME, percent: milestone });
          }
        });
      }
      if (payload.event === "ended") {
        pushDataLayer("video_complete", { video_name: VIDEO_NAME, percent: 100 });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const registerVimeoListeners = () => {
    if (!vimeoRef.current?.contentWindow) return;
    ["play", "timeupdate", "ended"].forEach((name) => {
      vimeoRef.current.contentWindow.postMessage(
        JSON.stringify({ method: "addEventListener", value: name }),
        "https://player.vimeo.com"
      );
    });
  };

  const trackExplainerProgress = () => {
    const video = explainerRef.current;
    if (!video || !video.duration) return;
    const percent = Math.floor((video.currentTime / video.duration) * 100);
    [25, 50, 75].forEach((milestone) => {
      if (percent >= milestone && !explainerProgress.current.has(milestone)) {
        explainerProgress.current.add(milestone);
        pushDataLayer("video_progress", { video_name: EXPLAINER_VIDEO_NAME, percent: milestone });
      }
    });
  };

  const trialLink = (label, location, variant = "primary") => (
    <a className={`sf-btn sf-btn-${variant}`} href={checkoutUrl}
      onClick={() => trackCta(label, checkoutUrl, location)}>{label}</a>
  );

  const demoLink = (label, location, variant = "primary") => demoReady ? (
    <a className={`sf-btn sf-btn-${variant}`} href={demoUrl}
      onClick={() => pushDataLayer("click_interactive_demo", {
        button_text: label, destination_url: demoUrl, cta_location: location,
      })}>{label}</a>
  ) : (
    <span className={`sf-btn sf-btn-${variant} sf-btn-disabled`} aria-disabled="true"
      title="Set INTERACTIVE_DEMO_URL to enable this link">{label}</span>
  );

  return (
    <main className="sf-caregiver-redesign" id="main-content">
      <a className="sf-skip" href="#sf-hero">Skip to content</a>
      <header className="sf-header">
        <a href="#sf-hero" className="sf-brand" aria-label="SingFit Caregiver home">
          <img src="/asset-01.png" alt="SingFit" />
          <span>Caregiver</span>
        </a>
        <nav className="sf-nav" aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#stories">Caregiver stories</a>
          <a href="#pricing">Free trial</a>
          {trialLink("Start 30-Day Free Trial", "desktop_nav", "nav")}
        </nav>
        <button className="sf-menu-button" type="button" aria-expanded={menuOpen}
          aria-controls="sf-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>
      {menuOpen && <nav className="sf-mobile-nav" id="sf-mobile-nav" aria-label="Mobile navigation">
        {[ ["How it works", "#how-it-works"], ["Caregiver stories", "#stories"], ["Free trial", "#pricing"] ].map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href={checkoutUrl} onClick={() => {
          trackCta("Start 30-Day Free Trial", checkoutUrl, "mobile_drawer");
          setMenuOpen(false);
        }}>Start 30-Day Free Trial</a>
      </nav>}

      {/* 1. Establish who the product is for and invite hands-on discovery. */}
      <ApprovedCaregiverHero
        demoAction={demoLink("Try the Interactive Demo", "hero_primary")}
        trialAction={trialLink("Start 30-Day Free Trial", "hero_secondary", "outline")}
      />

      {/* 2. Explain the mechanism before asking for payment details. */}
      <section className="sf-section sf-how" id="how-it-works" aria-labelledby="sf-how-title">
        <div className="sf-container">
          <div className="sf-feature-strip" aria-label="Three ways SingFit makes music interactive">
            <div className="sf-feature"><span className="sf-feature-icon"><svg viewBox="0 0 64 64" fill="none" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="var(--sf-mist)"/><path stroke="var(--sf-orange)" d="M27 42V21l18-4v22M27 28l18-4"/><ellipse stroke="var(--sf-orange)" cx="21" cy="43" rx="6" ry="4.5"/><ellipse stroke="var(--sf-orange)" cx="39" cy="40" rx="6" ry="4.5"/><path stroke="var(--sf-teal)" d="M14 24c-2 3-2 7 0 10M9 21c-4 5-4 11 0 16"/></svg></span><h3>Familiar songs</h3><p>Music you recognize and enjoy together.</p></div>
            <div className="sf-feature"><span className="sf-feature-icon"><svg viewBox="0 0 64 64" fill="none" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="var(--sf-mist)"/><path stroke="var(--sf-teal)" d="M50 37c3-3 4-7 4-11 0-10-9-16-21-16S12 17 12 27c0 6 3 11 8 14l-3 11 13-8c8 1 15-1 20-7Z"/><path stroke="var(--sf-orange)" d="M23 23h20M23 30h15M23 37h10"/></svg></span><h3>Lyric Coach</h3><p>Spoken lyric prompts help you sing along.</p></div>
            <div className="sf-feature"><span className="sf-feature-icon"><svg viewBox="0 0 64 64" fill="none" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="var(--sf-mist)"/><path stroke="var(--sf-orange)" d="M32 49 16 33C3 20 21 8 32 21 43 8 61 20 48 33Z"/><path stroke="var(--sf-teal)" d="m26 34 3-3a4 4 0 0 1 6 6l-2 2m5-9-3 3a4 4 0 0 1-6-6l2-2"/></svg></span><h3>Meaningful moments</h3><p>Conversation prompts help keep you connected.</p></div>
          </div>
          <div className="sf-explainer-layout">
            <div className="sf-explainer-copy">
              <p className="sf-eyebrow">Hear the difference</p>
              <h2 id="sf-how-title">Hear how SingFit makes music interactive.</h2>
              <p>SingFit’s Lyric Coach speaks the words before each musical phrase, helping you sing along without needing to remember the lyrics. Try it for yourself in our interactive sample.</p>
              {demoLink("Try the Interactive Demo", "how_it_works")}
              <p className="sf-small-note">Free to explore. No account or credit card required.</p>
            </div>
            <div className="sf-media">
            {EXPLAINER_VIDEO_URL ? (
              <video ref={explainerRef} controls playsInline preload="metadata"
                src={EXPLAINER_VIDEO_URL} aria-label="How SingFit Lyric Coach works"
                onPlay={() => {
                  setExplainerPlaying(true);
                  if (!explainerStarted.current) {
                    explainerStarted.current = true;
                    pushDataLayer("video_start", { video_name: EXPLAINER_VIDEO_NAME });
                  }
                }}
                onPause={() => setExplainerPlaying(false)}
                onTimeUpdate={trackExplainerProgress}
                onEnded={() => {
                  setExplainerPlaying(false);
                  pushDataLayer("video_complete", { video_name: EXPLAINER_VIDEO_NAME, percent: 100 });
                }} />
            ) : (
              <div className="sf-video-placeholder" role="img" aria-label="Placeholder for a future 20 to 30 second animated SingFit explainer">
                <div className="sf-placeholder-screen">
                  <span className="sf-placeholder-kicker">LYRIC COACH IN ACTION</span>
                  <span className="sf-placeholder-title">Music becomes a conversation.</span>
                  <div className="sf-lyric-preview">
                    <span>Lyric Coach speaks the next line</span>
                    <strong>♪ Then sing it together</strong>
                  </div>
                  <span className="sf-placeholder-duration">VIDEO COMING SOON · REAL SINGFIT AUDIO</span>
                </div>
              </div>
            )}
              {EXPLAINER_VIDEO_URL && <p className="sf-media-caption">{explainerPlaying ? "Playing Lyric Coach explainer" : "Press play to hear Lyric Coach in action."}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Present the full product immediately after the interactive sample. */}
      <section className="sf-section sf-full-app" id="pricing" aria-labelledby="sf-pricing-title">
        <div className="sf-container">
          <div className="sf-offer-copy">
            <div className="sf-section-heading">
              <p className="sf-eyebrow">The full SingFit Caregiver app</p>
              <h2 id="sf-pricing-title">More music. More ways to sing together.</h2>
              <p>When you're ready, move from the limited Interactive Demo to the complete SingFit Caregiver experience.</p>
            </div>
            <ul className="sf-app-benefits">
              <li>Explore a larger library of familiar songs</li>
              <li>Choose ready-made playlists or create your own</li>
              <li>Sing along with Lyric Coach and guide vocals</li>
              <li>Use conversation prompts to keep connecting</li>
            </ul>
            <div className="sf-integrated-offer">
              <p className="sf-offer-terms"><strong>30 days free</strong>, then $11.99/month. Cancel anytime.</p>
              {trialLink("Start 30-Day Free Trial", "pricing_card")}
              <p className="sf-offer-note">Credit card required. Renews automatically unless canceled. We'll remind you 3 days before the trial ends.</p>
            </div>
          </div>
          <div className="sf-product-visual">
            <img className="sf-app-image" src="/asset-03.webp" alt="Genuine SingFit app screens showing music selection and conversation prompts" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 3. Real-life use cases and genuine caregiver evidence. */}
      <section className="sf-section sf-stories" id="stories" aria-labelledby="sf-stories-title">
        <div className="sf-container">
          <div className="sf-proof">
            <div className="sf-proof-copy">
              <p className="sf-eyebrow">Real caregiver experiences</p>
              <h2 id="sf-stories-title">See what connection looks like.</h2>
              <p>Watch Laina and her mother share how singing together creates moments of joy and connection.</p>
            </div>
            <div className="sf-testimonial-video" style={{ "--sf-testimonial-poster": "url('/Fixed Laina Testimonial Image.png')" }}>
              <iframe ref={vimeoRef} id="singfit-session-video"
                src="https://player.vimeo.com/video/1194167243?api=1&badge=0&autopause=0&player_id=singfit-session-video&app_id=58479"
                title="Laina shares her experience using SingFit with her mother"
                loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
                allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen onLoad={registerVimeoListeners} />
            </div>
          </div>
        </div>
      </section>

      <section className="sf-faq-section" id="questions" aria-labelledby="sf-faq-title">
        <div className="sf-container sf-faq-container">
          <h2 id="sf-faq-title">Questions before you begin</h2>
          <div className="sf-faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <aside className="sf-disclaimer" aria-label="Legal disclaimer">
        SingFit Caregiver is designed to support engagement and shared musical experiences. It does not provide medical, therapeutic, or caregiving advice and is not intended to diagnose, treat, cure, or prevent any disease or health condition.
      </aside>
      <footer className="sf-footer">
        <div className="sf-footer-brand">
          <img src="/asset-01.png" alt="SingFit" />
          <span>Caregiver</span>
        </div>
        <p>©2026 Musical Health Technologies. All Rights Reserved.<br />1010 Wilshire Blvd. Los Angeles, CA 90017</p>
        <nav aria-label="Legal links">
          <a href="https://musicismedicine.singfit.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="https://musicismedicine.singfit.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          <a href="https://musicismedicine.singfit.com/accessibility" target="_blank" rel="noopener noreferrer">Accessibility Statement</a>
        </nav>
        {trialLink("Start 30-Day Free Trial", "footer")}
      </footer>
    </main>
  );
}
