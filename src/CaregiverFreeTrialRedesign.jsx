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

const testimonials = [
  {
    quote: "My mom has suffered with severe chronic pain for years. Her main activity is to watch TV. During our 1st SingFit session, she sang 15 songs... She's really enjoying this.",
    attribution: "Gabriella, caregiver of her mother, who has MCI (vascular dementia) and chronic pain",
  },
  {
    quote: "I think his mood is more stable...In fact, he will say 'I think I'm coming back.' He's feeling more like himself. And I think this is really good.",
    attribution: "Jan, caregiver of her husband who has MCI",
  },
  {
    quote: "We laughed a lot during the SingFit session - he was a different person totally. I'm so grateful for these memories. I can’t wait to tell my kids to try this.",
    attribution: "Jeanne, caregiver of her husband with dementia",
  },
  {
    quote: "Frances looks forward to each SingFit session. She is very vocal about how much the singing helps her feel better.",
    attribution: "Mary Anne, homecare worker of her client Frances, who has dementia",
  },
];

const faqs = [
  ["Do I need to be musical?", "No. Caregiver is designed for everyday caregivers. Lyric Coach speaks upcoming lyrics to help you sing along without needing to remember every word."],
  ["Who is SingFit designed for?", "Family caregivers supporting an older loved one, including people experiencing dementia, memory loss, or cognitive decline."],
  ["Is the Interactive Demo the free trial?", "No. The Interactive Demo is a limited browser-based sample of SingFit's music experience. The 30-day free trial gives you access to the full Caregiver app."],
  ["What happens after I start my free trial?", "After subscribing online, download the app, log in, and begin your first guided music session. The first 30 days are free, then the subscription renews at $11.99 per month unless canceled."],
  ["Can I cancel?", "Yes. Cancel anytime. A credit card is required to start the trial. We'll send a reminder three days before the trial ends."],
  ["Is support available?", "Yes. Customer support is included to help you get started."],
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
      <style>{styles}</style>
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
      <section className="sf-hero" id="sf-hero" aria-labelledby="sf-hero-title">
        <div className="sf-container sf-hero-inner">
          <div className="sf-hero-content">
            <p className="sf-eyebrow">Music makes connection possible</p>
            <h1 id="sf-hero-title">Turn familiar songs into moments of connection.</h1>
            <p className="sf-hero-lead">A simple, engaging way to sing together, with guided lyrics and familiar music that brings more joy, confidence, and connection to everyday caregiving.</p>
            <div className="sf-actions">
              {demoLink("Try the Interactive Demo", "hero_primary")}
              {trialLink("Start 30-Day Free Trial", "hero_secondary", "outline")}
            </div>
            <p className="sf-small-note">Try a sample in your browser. No account or credit card needed for the demo.</p>
          </div>
          <div className="sf-hero-visual">
            <div className="sf-hero-photo-frame"><img src="/Fixed Laina Testimonial Image.png" alt="Caregiver and her mother smiling during a shared music session" fetchPriority="high" /></div>
            <img className="sf-hero-phones" src="/asset-03.webp" alt="Screens from the full SingFit Caregiver app" />
          </div>
        </div>
      </section>

      {/* 2. Explain the mechanism before asking for payment details. */}
      <section className="sf-section sf-how" id="how-it-works" aria-labelledby="sf-how-title">
        <div className="sf-container">
          <div className="sf-feature-strip" aria-label="Three ways SingFit makes music interactive">
            <div className="sf-feature"><span className="sf-feature-icon">♫</span><h3>Familiar songs</h3><p>Music you recognize and enjoy together.</p></div>
            <div className="sf-feature"><span className="sf-feature-icon">“</span><h3>Lyric Coach</h3><p>Spoken lyric prompts help you sing along.</p></div>
            <div className="sf-feature"><span className="sf-feature-icon">♡</span><h3>Meaningful moments</h3><p>Conversation prompts help keep you connected.</p></div>
          </div>
          <div className="sf-explainer-layout">
            <div className="sf-explainer-copy">
              <p className="sf-eyebrow">Hear the difference</p>
              <h2>Hear how SingFit makes music interactive.</h2>
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

      {/* 3. Real-life use cases and genuine caregiver evidence. */}
      <section className="sf-section sf-stories" id="stories" aria-labelledby="sf-stories-title">
        <div className="sf-container">
          <div className="sf-story-intro">
            <div>
              <p className="sf-eyebrow">Made for real life</p>
              <h2 id="sf-stories-title">A meaningful activity for everyday moments.</h2>
            </div>
            <p>When conversation feels difficult or you're not sure what to do together, a familiar song can open the door to a shared experience.</p>
          </div>
          <div className="sf-scenarios">
            <div className="sf-scenario"><img src="/E_YpTUiw.jpeg" alt="Caregiver and older adult enjoying music together" loading="lazy"/><div><strong>At home</strong><span>Bring a little more music into the day.</span></div></div>
            <div className="sf-scenario"><img src="/Sandy-Tubman-and-Caregiver-Picture-Light-Blue-Background.jpeg" alt="Older adult sharing a moment with a caregiver" loading="lazy"/><div><strong>During a visit</strong><span>Make your time together feel more connected.</span></div></div>
            <div className="sf-scenario"><img src="/Alicia-and-woman-pink-shirt-sing-clean.jpeg" alt="Caregiver singing with an older adult" loading="lazy"/><div><strong>When words are hard</strong><span>Let familiar music help you connect.</span></div></div>
          </div>
          <div className="sf-proof">
            <div className="sf-proof-copy">
              <p className="sf-eyebrow">Real caregiver experiences</p>
              <h2>See what caregivers are experiencing.</h2>
              <blockquote>“We laughed a lot during the SingFit session. He was a different person totally.”</blockquote>
              <p className="sf-quote-source">Jeanne, caregiver of her husband with dementia</p>
              <p>Watch Laina and her mother share their experience in their own words.</p>
            </div>
            <div className="sf-testimonial-video">
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

      {/* 4. Present the complete product and transparent trial terms. */}
      <section className="sf-section sf-full-app" id="pricing" aria-labelledby="sf-pricing-title">
        <div className="sf-container">
          <div className="sf-section-heading sf-heading-centered">
            <p className="sf-eyebrow">The full SingFit Caregiver app</p>
            <h2 id="sf-pricing-title">More music. More ways to sing together.</h2>
            <p>When you're ready, move from the limited Interactive Demo to the complete SingFit Caregiver experience.</p>
          </div>
          <div className="sf-offer-layout">
            <div className="sf-offer-copy">
              <img className="sf-app-image" src="/asset-03.webp" alt="SingFit Caregiver app screens showing music selection and conversation prompts" loading="lazy" />
              <ul className="sf-app-benefits">
                <li>Explore a larger library of familiar songs</li>
                <li>Choose ready-made playlists or create your own</li>
                <li>Sing along with Lyric Coach and guide vocals</li>
                <li>Use conversation prompts to keep connecting</li>
              </ul>
            </div>
            <div className="sf-price-card">
              <p className="sf-eyebrow">30-day free trial</p>
              <div className="sf-price"><strong>$0</strong><span>for your first 30 days</span></div>
              <p>Experience the complete SingFit Caregiver app.</p>
              {trialLink("Start 30-Day Free Trial", "pricing_card")}
              <p className="sf-price-note">Then $11.99/month. Credit card required. Renews automatically unless canceled. Cancel anytime. We'll remind you 3 days before the trial ends.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sf-conversion-banner" aria-label="Start your free trial">
        <div className="sf-container sf-banner-inner">
          <div className="sf-banner-icon" aria-hidden="true">30<br/><small>DAYS</small></div>
          <div><h2>Start your free trial today.</h2><p>Explore the complete SingFit Caregiver app. 30 days free, then $11.99/month. Cancel anytime.</p></div>
          {trialLink("Start Your 30-Day Free Trial", "final_banner")}
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

const styles = `
.sf-caregiver-redesign {
  --sf-ink:#162d49; --sf-soft:#344a5b; --sf-teal:#249f9a;
  --sf-orange:#f37a4a; --sf-line:#dce8e9; --sf-light:#eef9f9;
  color:var(--sf-ink); background:#f4faf9; font-family:"Source Sans 3","Segoe UI",system-ui,sans-serif;
  font-size:18px; line-height:1.55; overflow:hidden;
}
.sf-caregiver-redesign *{box-sizing:border-box}
.sf-caregiver-redesign h1,.sf-caregiver-redesign h2,.sf-caregiver-redesign h3,.sf-caregiver-redesign p{margin:0}
.sf-caregiver-redesign h1,.sf-caregiver-redesign h2{font-family:"Source Serif 4",Georgia,serif;font-weight:500;letter-spacing:-.045em;line-height:1.06}
.sf-caregiver-redesign h1{font-size:clamp(43px,4.6vw,64px)}
.sf-caregiver-redesign h2{font-size:clamp(36px,4vw,56px)}
.sf-caregiver-redesign p{line-height:1.6}
.sf-caregiver-redesign img{display:block;max-width:100%}
.sf-caregiver-redesign a{color:inherit}
.sf-caregiver-redesign :focus-visible{outline:3px solid var(--sf-teal);outline-offset:4px}
.sf-container{width:min(1160px,calc(100% - 64px));margin-inline:auto}
.sf-skip{position:absolute;left:12px;top:-100px;z-index:200;background:#fff;padding:12px}
.sf-skip:focus{top:12px}
.sf-header{width:min(1280px,calc(100% - 64px));margin:auto;min-height:90px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.sf-brand,.sf-footer-brand{display:flex;align-items:center;gap:14px;text-decoration:none;font-size:15px;font-weight:600;white-space:nowrap}
.sf-brand img,.sf-footer-brand img{width:155px;height:auto}
.sf-nav{display:flex;align-items:center;gap:25px;font-size:16px}
.sf-nav>a:not(.sf-btn){text-decoration:none}
.sf-menu-button{display:none;border:1px solid var(--sf-line);border-radius:30px;background:#fff;padding:9px 18px;font:inherit}
.sf-mobile-nav{display:none}
.sf-btn{display:inline-flex;align-items:center;justify-content:center;min-height:55px;padding:14px 25px;border-radius:999px;text-align:center;text-decoration:none!important;font-size:16px;font-weight:700;line-height:1.3;white-space:normal;transition:filter .2s ease,transform .2s ease}
.sf-btn:hover{filter:brightness(.96);transform:translateY(-1px)}
.sf-btn-primary,.sf-btn-nav{background:var(--sf-orange);color:#fff!important;box-shadow:0 8px 20px rgba(243,122,74,.15)}
.sf-btn-nav{min-height:44px;padding:10px 17px;font-size:14px}
.sf-btn-outline{background:#fff;color:var(--sf-ink)!important;border:1.5px solid var(--sf-ink)}
.sf-btn-disabled{opacity:.55;cursor:not-allowed;box-shadow:none}
.sf-btn-disabled:hover{transform:none;filter:none}
.sf-eyebrow{font-size:14px!important;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--sf-teal)}
/* Hero: preserve the original page's framed photo and overlapping app screens. */
.sf-hero{
  background:
    radial-gradient(circle at 72% 28%,rgba(224,246,245,.88),transparent 48%),
    linear-gradient(115deg,#f8fbfa 0%,#edf8f7 100%);
}
.sf-hero-inner{
  width:min(1280px,calc(100% - 80px));
  margin-inline:auto;
  display:grid;
  grid-template-columns:minmax(0,.88fr) minmax(0,1.12fr);
  align-items:center;
  gap:clamp(32px,4vw,64px);
  padding:36px 0 62px;
}
.sf-hero-content{min-width:0;padding:26px 0;position:relative;z-index:1}
.sf-hero h1{max-width:12.5ch;margin-top:15px;font-size:clamp(46px,5.3vw,76px);line-height:1.02}
.sf-hero-lead{max-width:520px;margin-top:24px;font-size:20px;color:var(--sf-soft)}
.sf-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.sf-small-note{max-width:520px;margin-top:15px;font-size:15px;color:#506675}
.sf-hero-visual{position:relative;width:100%;min-width:0;height:580px}
.sf-hero-photo-frame{
  position:absolute;inset:36px 46px 62px 0;
  padding:16px;border-radius:42px;
  background:rgba(255,255,255,.72);
  border:1px solid rgba(255,255,255,.85);
  box-shadow:0 22px 60px rgba(23,33,43,.10);
}
.sf-hero-photo-inner{height:100%;overflow:hidden;border-radius:30px}
.sf-hero-photo-inner img{
  width:100%;height:100%;max-width:none;
  object-fit:cover;object-position:42% center;
}
.sf-hero-phones{
  position:absolute;right:-38px;bottom:-22px;z-index:2;
  width:clamp(265px,29vw,410px);height:auto;
  filter:drop-shadow(0 24px 34px rgba(15,23,42,.23));
  pointer-events:none;
}
.sf-band{padding:85px 0}
.sf-how,.sf-full-app{background:transparent}
.sf-two-col{display:grid;grid-template-columns:.88fr 1.12fr;gap:62px;align-items:center}
.sf-section-copy h2,.sf-offer-copy h2{margin-top:13px}
.sf-section-copy>p:not(.sf-eyebrow),.sf-offer-copy>p:not(.sf-eyebrow){margin-top:20px;font-size:20px;color:var(--sf-soft)}
.sf-text-link{display:inline-block;margin-top:24px;color:#167b85!important;font-size:17px;font-weight:700;text-underline-offset:4px}
.sf-link-disabled{opacity:.65;text-decoration:none}
.sf-media video{width:100%;aspect-ratio:16/9;object-fit:contain;border-radius:20px;background:#0d2432}
.sf-video-placeholder{width:100%;aspect-ratio:16/9;border-radius:22px;padding:18px;background:#102e40;box-shadow:0 20px 50px rgba(16,46,64,.14)}
.sf-placeholder-screen{height:100%;border-radius:12px;background:linear-gradient(135deg,#fff,#eaf8f7);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;gap:12px}
.sf-placeholder-kicker{font-size:12px;font-weight:800;letter-spacing:.13em;color:#167b85}
.sf-placeholder-title{font-family:"Source Serif 4",Georgia,serif;font-size:clamp(21px,2.7vw,35px);line-height:1.1}
.sf-lyric-preview{width:min(360px,100%);display:flex;flex-direction:column;gap:7px;background:#fff;padding:14px;border-radius:12px;border:1px solid #dce8e9;font-size:15px;color:#536c7a}
.sf-lyric-preview strong{font-size:18px;color:var(--sf-orange)}
.sf-placeholder-duration,.sf-media-caption{font-size:14px;color:#506675}
.sf-media-caption{margin-top:10px}
.sf-story-heading{max-width:680px;margin-bottom:32px}
.sf-story-heading h2{margin-top:12px}
.sf-story-heading>p:last-child{margin-top:15px;font-size:20px;color:var(--sf-soft)}
.sf-story-layout{display:grid;grid-template-columns:1.18fr .82fr;gap:45px;align-items:center}
.sf-testimonial-video{position:relative;aspect-ratio:16/9;background:#112a3c;border-radius:20px;overflow:hidden}
.sf-testimonial-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.sf-quote{padding:12px 0}
.sf-quote-mark{display:block;font-family:Georgia,serif;color:var(--sf-orange);font-size:78px;height:64px;line-height:1}
.sf-quote blockquote{margin:0;font-family:"Source Serif 4",Georgia,serif;font-size:clamp(23px,2.6vw,32px);line-height:1.3;letter-spacing:-.02em}
.sf-quote>p{margin-top:15px;font-size:16px;color:var(--sf-soft)}
.sf-quote-controls{display:flex;align-items:center;gap:18px;margin-top:23px;color:#526a78;font-size:15px}
.sf-quote-controls button{width:39px;height:39px;border:1px solid var(--sf-line);background:#fff;border-radius:50%;font-size:25px;cursor:pointer;color:var(--sf-ink)}
.sf-offer-layout{display:grid;grid-template-columns:1.2fr .8fr;gap:65px;align-items:center}
.sf-offer-copy>p:not(.sf-eyebrow){max-width:540px}
.sf-app-image{width:min(500px,100%);max-height:345px;object-fit:contain;margin:18px auto 0}
.sf-price-card{background:#fff;border:1px solid #dce9e8;border-radius:22px;padding:30px;box-shadow:0 14px 35px rgba(18,58,69,.06)}
.sf-price{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin-top:10px}
.sf-price strong{font-size:64px;letter-spacing:-.06em;line-height:1.1}
.sf-price span{font-size:18px;color:var(--sf-soft)}
.sf-price-card ul{list-style:none;padding:0;margin:22px 0 25px}
.sf-price-card li{position:relative;padding:7px 0 7px 28px;font-size:17px}
.sf-price-card li:before{content:"✓";position:absolute;left:0;color:var(--sf-teal);font-weight:800}
.sf-price-card .sf-btn{width:100%}
.sf-price-note{font-size:15px;margin-top:15px;color:#4e6675}
.sf-faq-section{padding:65px 0 75px;background:transparent}
.sf-faq-container{max-width:820px}
.sf-faq-container h2{text-align:center;font-size:clamp(30px,3.2vw,42px);margin-bottom:24px}
.sf-faq-list{border-top:1px solid var(--sf-line)}
.sf-faq-list details{border-bottom:1px solid var(--sf-line)}
.sf-faq-list summary{cursor:pointer;list-style:none;padding:17px 35px 17px 5px;position:relative;font-size:19px;font-weight:600}
.sf-faq-list summary::-webkit-details-marker{display:none}
.sf-faq-list summary:after{content:"+";position:absolute;right:10px;font-size:24px;top:13px;font-weight:400}
.sf-faq-list details[open] summary:after{content:"−"}
.sf-faq-list details p{padding:0 25px 18px 5px;color:var(--sf-soft);font-size:17px}
.sf-disclaimer{max-width:1160px;margin:0 auto;padding:20px 32px;border-top:1px solid var(--sf-line);font-size:14px;color:#5b6e7b;line-height:1.6}
.sf-footer{display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:25px;padding:28px max(32px,calc((100vw - 1160px)/2));border-top:1px solid var(--sf-line);background:transparent}
.sf-footer-brand{display:flex;flex-direction:column;align-items:flex-start;gap:3px;font-size:13px}
.sf-footer-brand img{width:120px}
.sf-footer p{font-size:13px;color:#627783}
.sf-footer nav{display:flex;flex-direction:column;gap:5px;font-size:14px}
@media(max-width:1080px){
 .sf-nav{gap:13px}.sf-nav>a:not(.sf-btn){font-size:14px}
 .sf-hero-inner{gap:28px}.sf-hero-visual{height:510px}.sf-hero-phones{right:-16px;width:clamp(260px,31vw,340px)}.sf-two-col{gap:32px}.sf-offer-layout{gap:30px}
 .sf-footer{grid-template-columns:1fr 1fr;gap:20px}.sf-footer .sf-btn{justify-self:end}
}
@media(max-width:800px){
 .sf-header{min-height:75px}.sf-nav{display:none}.sf-menu-button{display:block}
 .sf-mobile-nav{display:flex;flex-direction:column;gap:0;padding:8px 32px 20px;background:#fff;border-bottom:1px solid var(--sf-line)}
 .sf-mobile-nav a{padding:13px 0;text-decoration:none;border-bottom:1px solid var(--sf-line);font-size:18px}
  .sf-hero-inner{grid-template-columns:minmax(0,1fr);gap:0;width:calc(100% - 48px);padding:12px 0 48px}
 .sf-hero-content{padding:38px 0 14px}
 .sf-hero-visual{height:490px;max-width:680px;margin-inline:auto}
 .sf-hero-photo-frame{inset:22px 50px 58px 0}
 .sf-hero-phones{right:-12px;bottom:-16px;width:clamp(260px,45vw,350px)}
 .sf-two-col,.sf-story-layout,.sf-offer-layout{grid-template-columns:1fr;gap:30px}
 .sf-band{padding:62px 0}.sf-story-heading{margin-bottom:25px}
 .sf-offer-copy .sf-app-image{max-height:280px}.sf-price-card{max-width:580px;width:100%;margin:auto}
}
@media(max-width:520px){
 .sf-container,.sf-header{width:calc(100% - 38px)}
 .sf-brand img{width:122px}.sf-brand{gap:8px;font-size:12px}
  .sf-hero-inner{width:calc(100% - 38px);padding-bottom:36px}
 .sf-hero-content{padding:32px 0 12px}
 .sf-hero h1{font-size:clamp(40px,10vw,53px)}
 .sf-hero-visual{height:350px}
 .sf-hero-photo-frame{inset:20px 32px 46px 0;padding:10px;border-radius:26px}
 .sf-hero-photo-inner{border-radius:18px}
 .sf-hero-phones{right:-9px;bottom:-6px;width:clamp(190px,55vw,265px)}
 .sf-hero-lead{font-size:19px}.sf-actions{flex-direction:column}.sf-actions .sf-btn{width:100%}
 .sf-section-copy>p:not(.sf-eyebrow),.sf-offer-copy>p:not(.sf-eyebrow){font-size:18px}
 .sf-video-placeholder{padding:8px}.sf-placeholder-screen{padding:8px;gap:6px}.sf-placeholder-duration{font-size:11px}
 .sf-lyric-preview{padding:8px;font-size:12px}.sf-lyric-preview strong{font-size:14px}
 .sf-story-heading>p:last-child{font-size:18px}.sf-price-card{padding:22px}
 .sf-footer{grid-template-columns:1fr;justify-items:start;padding:25px 19px}.sf-footer .sf-btn{justify-self:stretch}
 .sf-disclaimer{padding:18px 19px}
}

/* Continuous background and distinct, non-carousel caregiver stories. */
.sf-caregiver-redesign{background:linear-gradient(135deg,#f8fbfa 0%,#eff8f7 48%,#f7faf9 100%)}
.sf-hero{background:transparent}
.sf-band,.sf-faq-section{background:transparent}
.sf-featured-story{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:38px;align-items:center;margin-bottom:25px}
.sf-featured-story-copy{padding:16px 0}
.sf-featured-story-copy h3{font-family:"Source Serif 4",Georgia,serif;font-weight:500;letter-spacing:-.035em;line-height:1.16;font-size:clamp(26px,2.8vw,39px);margin:12px 0}
.sf-featured-story-copy>p:last-child{color:var(--sf-soft);font-size:18px}
.sf-testimonial-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.sf-testimonial-card{margin:0;padding:26px 30px;background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.95);border-radius:22px;box-shadow:0 12px 30px rgba(22,45,73,.055)}
.sf-testimonial-card blockquote{margin:0;font-family:"Source Serif 4",Georgia,serif;font-size:clamp(21px,2vw,27px);line-height:1.32;letter-spacing:-.02em}
.sf-testimonial-card figcaption{margin-top:16px;font-size:15px;color:var(--sf-soft);line-height:1.45}
@media(max-width:800px){.sf-featured-story{grid-template-columns:1fr;gap:20px}.sf-testimonial-cards{grid-template-columns:1fr}}

@media(prefers-reduced-motion:reduce){.sf-caregiver-redesign *{scroll-behavior:auto!important;transition:none!important}}

/* Final cohesive design overrides: one continuous light background, no alternating bands. */
.sf-caregiver-redesign{--sf-ink:#162b45;--sf-soft:#405668;--sf-orange:#f47534;--sf-teal:#249f9a;--sf-line:#dbe7e7;background:linear-gradient(115deg,#f8fcfb 0%,#eff9f8 55%,#f8fcfb 100%);color:var(--sf-ink);font-size:18px;overflow:hidden}
.sf-caregiver-redesign .sf-container{width:min(1160px,calc(100% - 72px));margin:auto}
.sf-caregiver-redesign h1,.sf-caregiver-redesign h2{font-family:"Source Serif 4",Georgia,serif;font-weight:500;letter-spacing:-.045em;line-height:1.07}
.sf-caregiver-redesign h1{font-size:clamp(46px,5vw,72px)}
.sf-caregiver-redesign h2{font-size:clamp(35px,3.7vw,54px)}
.sf-caregiver-redesign h3{font-size:clamp(23px,2.2vw,31px);line-height:1.2;font-family:"Source Serif 4",Georgia,serif;font-weight:500}
.sf-caregiver-redesign p{line-height:1.55}
.sf-caregiver-redesign .sf-header{min-height:84px;background:transparent}
.sf-caregiver-redesign .sf-btn-primary{background:var(--sf-orange);color:white!important}
.sf-caregiver-redesign .sf-btn-outline{border:1.5px solid var(--sf-ink);background:#fff;color:var(--sf-ink)!important}
.sf-caregiver-redesign .sf-btn-disabled{opacity:.6}
.sf-caregiver-redesign .sf-hero{background:transparent;padding:65px 0 98px}
.sf-caregiver-redesign .sf-hero-inner{display:grid;grid-template-columns:.93fr 1.07fr;gap:60px;align-items:center;min-height:530px}
.sf-caregiver-redesign .sf-hero-content{position:relative;z-index:2}
.sf-caregiver-redesign .sf-eyebrow{color:#128d91;font-size:14px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;margin-bottom:18px}
.sf-caregiver-redesign .sf-hero-content h1{max-width:560px;margin-bottom:23px}
.sf-caregiver-redesign .sf-hero-lead{max-width:500px;font-size:21px;margin-bottom:29px}
.sf-caregiver-redesign .sf-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.sf-caregiver-redesign .sf-small-note{font-size:15px;color:#647684;margin-top:13px}
.sf-caregiver-redesign .sf-hero-visual{position:relative;min-width:0;min-height:475px;display:flex;align-items:center}
.sf-caregiver-redesign .sf-hero-photo-frame{width:90%;height:405px;overflow:hidden;border:12px solid #fff;border-radius:35px;box-shadow:0 24px 60px rgba(17,47,62,.12);background:#e7e9e5}
.sf-caregiver-redesign .sf-hero-photo-frame img{width:100%;height:100%;object-fit:cover;object-position:52% center}
.sf-caregiver-redesign .sf-hero-phones{position:absolute;right:-4%;bottom:-3%;width:50%;filter:drop-shadow(0 20px 20px rgba(19,36,48,.23))}
.sf-caregiver-redesign .sf-section{padding:72px 0;background:transparent!important}
.sf-caregiver-redesign .sf-section-heading{max-width:780px;margin:0 auto 35px}
.sf-caregiver-redesign .sf-heading-centered{text-align:center}
.sf-caregiver-redesign .sf-section-heading h2{margin-bottom:16px}
.sf-caregiver-redesign .sf-section-heading>p:last-child{font-size:19px;color:var(--sf-soft)}
.sf-caregiver-redesign .sf-feature-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:35px 0 85px}
.sf-caregiver-redesign .sf-feature{background:rgba(255,255,255,.7);border:1px solid #dce8e8;border-radius:22px;padding:28px 25px;min-height:190px}
.sf-caregiver-redesign .sf-feature-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:#e3f3f3;color:#198e97;font-size:29px;margin-bottom:15px}
.sf-caregiver-redesign .sf-feature h3{font-family:"Source Sans 3",sans-serif;font-size:21px;font-weight:700;margin-bottom:6px}
.sf-caregiver-redesign .sf-feature p{font-size:17px;color:var(--sf-soft)}
.sf-caregiver-redesign .sf-explainer-layout{display:grid;grid-template-columns:.8fr 1.2fr;gap:65px;align-items:center}
.sf-caregiver-redesign .sf-explainer-copy h2{margin-bottom:20px}
.sf-caregiver-redesign .sf-explainer-copy>p:not(.sf-eyebrow){margin-bottom:22px}
.sf-caregiver-redesign .sf-media{min-width:0}
.sf-caregiver-redesign .sf-video-placeholder{border-radius:24px;background:#102e40;padding:13px;box-shadow:0 20px 55px rgba(16,46,64,.16)}
.sf-caregiver-redesign .sf-placeholder-screen{background:#f6fbfa;border-radius:16px}
.sf-caregiver-redesign .sf-story-layout{display:grid;grid-template-columns:.85fr 1.15fr;gap:65px;align-items:center;margin:0 0 85px}
.sf-caregiver-redesign .sf-story-photo{height:340px;border:10px solid #fff;border-radius:30px;overflow:hidden;box-shadow:0 14px 40px rgba(15,42,54,.1)}
.sf-caregiver-redesign .sf-story-photo img{width:100%;height:100%;object-fit:cover}
.sf-caregiver-redesign .sf-story-copy h3{margin-bottom:15px}
.sf-caregiver-redesign .sf-story-copy>p{margin-bottom:18px}
.sf-caregiver-redesign .sf-story-copy blockquote{font-family:"Source Serif 4",Georgia,serif;font-size:26px;line-height:1.3;margin:25px 0 12px;border-left:4px solid var(--sf-orange);padding-left:20px}
.sf-caregiver-redesign .sf-quote-source{font-size:15px;color:#617686}
.sf-caregiver-redesign .sf-featured-story{display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:center;padding:30px;background:rgba(255,255,255,.7);border:1px solid var(--sf-line);border-radius:28px}
.sf-caregiver-redesign .sf-featured-story-copy h3{margin-bottom:18px}
.sf-caregiver-redesign .sf-full-app{padding-bottom:90px}
.sf-caregiver-redesign .sf-offer-layout{display:grid;grid-template-columns:1.2fr .8fr;gap:60px;align-items:center}
.sf-caregiver-redesign .sf-offer-copy{display:grid;grid-template-columns:.9fr 1.1fr;align-items:center;gap:28px}
.sf-caregiver-redesign .sf-app-image{width:100%;max-height:420px;object-fit:contain;filter:drop-shadow(0 15px 20px rgba(20,42,55,.16))}
.sf-caregiver-redesign .sf-app-benefits{list-style:none;padding:0;margin:0}
.sf-caregiver-redesign .sf-app-benefits li{padding:13px 0 13px 28px;position:relative;border-bottom:1px solid var(--sf-line);font-size:18px}
.sf-caregiver-redesign .sf-app-benefits li:before{content:'✓';position:absolute;left:0;color:#199f9a;font-weight:800}
.sf-caregiver-redesign .sf-price-card{background:white;border:1px solid #e2eaea;border-radius:24px;padding:35px;box-shadow:0 16px 45px rgba(22,43,69,.09)}
.sf-caregiver-redesign .sf-price-card .sf-btn{margin:20px 0 12px;width:100%}
.sf-caregiver-redesign .sf-price-note{font-size:15px;color:#5b6d79}
.sf-caregiver-redesign .sf-faq-section{background:transparent;padding:45px 0 75px}
.sf-caregiver-redesign .sf-footer{background:transparent}
@media(max-width:950px){
 .sf-caregiver-redesign .sf-hero-inner{gap:24px}
 .sf-caregiver-redesign .sf-hero-photo-frame{height:340px}
 .sf-caregiver-redesign .sf-hero-visual{min-height:390px}
 .sf-caregiver-redesign .sf-explainer-layout,.sf-caregiver-redesign .sf-story-layout,.sf-caregiver-redesign .sf-offer-layout{gap:28px}
 .sf-caregiver-redesign .sf-offer-copy{grid-template-columns:1fr}
 .sf-caregiver-redesign .sf-app-image{max-height:290px}
}
@media(max-width:700px){
 .sf-caregiver-redesign .sf-container{width:calc(100% - 40px)}
 .sf-caregiver-redesign .sf-hero{padding:38px 0 45px}
 .sf-caregiver-redesign .sf-hero-inner,.sf-caregiver-redesign .sf-explainer-layout,.sf-caregiver-redesign .sf-story-layout,.sf-caregiver-redesign .sf-featured-story,.sf-caregiver-redesign .sf-offer-layout{grid-template-columns:1fr}
 .sf-caregiver-redesign .sf-hero-inner{min-height:0;gap:18px}
 .sf-caregiver-redesign h1{font-size:clamp(43px,10vw,57px)}
 .sf-caregiver-redesign h2{font-size:clamp(35px,8vw,46px)}
 .sf-caregiver-redesign .sf-hero-lead{font-size:19px}
 .sf-caregiver-redesign .sf-hero-visual{min-height:0;height:345px;margin-top:10px}
 .sf-caregiver-redesign .sf-hero-photo-frame{height:300px;width:92%;border-width:8px;border-radius:25px}
 .sf-caregiver-redesign .sf-hero-phones{width:43%;right:0;bottom:0}
 .sf-caregiver-redesign .sf-section{padding:48px 0}
 .sf-caregiver-redesign .sf-feature-strip{grid-template-columns:1fr;gap:12px;margin:30px 0 48px}
 .sf-caregiver-redesign .sf-feature{min-height:0;padding:18px 22px}
 .sf-caregiver-redesign .sf-story-layout{margin-bottom:45px}
 .sf-caregiver-redesign .sf-story-photo{height:300px}
 .sf-caregiver-redesign .sf-featured-story{padding:18px}
 .sf-caregiver-redesign .sf-offer-copy{grid-template-columns:1fr}
 .sf-caregiver-redesign .sf-app-image{max-height:330px}
 .sf-caregiver-redesign .sf-price-card{padding:25px}
 .sf-caregiver-redesign .sf-actions .sf-btn{min-width:0}
}
@media(max-width:420px){.sf-caregiver-redesign .sf-hero-visual{height:285px}.sf-caregiver-redesign .sf-hero-photo-frame{height:255px}.sf-caregiver-redesign .sf-actions{flex-direction:column;align-items:stretch}}

/* Editorial design system: deliberately replaces prior generic stacked-card layout. */
.sf-caregiver-redesign{--sf-ink:#18364a;--sf-soft:#355369;--sf-teal:#138d92;--sf-orange:#f47740;--sf-line:#dbe9e8;background:#f7fbfa;color:var(--sf-ink);font-size:18px;overflow-x:clip}
.sf-caregiver-redesign h1,.sf-caregiver-redesign h2{letter-spacing:-.052em;line-height:1.045}
.sf-caregiver-redesign h1{font-size:clamp(52px,5.4vw,83px)}
.sf-caregiver-redesign h2{font-size:clamp(40px,4.2vw,61px)}
.sf-caregiver-redesign .sf-container{width:min(1210px,calc(100% - 92px))}
.sf-caregiver-redesign .sf-header{width:min(1290px,calc(100% - 80px));min-height:88px}
.sf-caregiver-redesign .sf-brand img{width:165px}
.sf-caregiver-redesign .sf-nav{gap:30px}
.sf-caregiver-redesign .sf-btn{min-height:57px;padding:15px 27px}
.sf-caregiver-redesign .sf-btn-nav{min-height:45px;padding:10px 21px}
.sf-caregiver-redesign .sf-eyebrow{font-size:13px!important;letter-spacing:.16em;color:#138d92}
.sf-caregiver-redesign .sf-hero{background:linear-gradient(115deg,#f8fbfa,#e9f8f6);padding:0}
.sf-caregiver-redesign .sf-hero-inner{width:min(1290px,calc(100% - 80px));grid-template-columns:1.01fr .99fr;gap:24px;min-height:655px;padding:52px 0 80px}
.sf-caregiver-redesign .sf-hero-content{padding:0;align-self:center}
.sf-caregiver-redesign .sf-hero-content h1{max-width:640px;margin:13px 0 20px;font-size:clamp(52px,5.35vw,80px)}
.sf-caregiver-redesign .sf-hero-lead{font-size:21px;max-width:560px;line-height:1.55;margin:0 0 23px}
.sf-caregiver-redesign .sf-actions{margin-top:25px}
.sf-caregiver-redesign .sf-small-note{font-size:15px;margin-top:12px}
.sf-caregiver-redesign .sf-hero-visual{height:540px;min-height:0;display:block;position:relative}
.sf-caregiver-redesign .sf-hero-photo-frame{position:absolute;inset:28px 50px 56px 0;width:auto;height:auto;border:13px solid white;border-radius:36px;box-shadow:0 25px 60px rgba(13,52,61,.13);overflow:hidden;background:white}
.sf-caregiver-redesign .sf-hero-photo-frame img{height:100%;width:100%;object-fit:cover;object-position:51% center}
.sf-caregiver-redesign .sf-hero-phones{position:absolute;z-index:2;width:54%;right:-1%;bottom:0;filter:drop-shadow(0 20px 15px rgba(21,48,59,.19))}
.sf-caregiver-redesign .sf-section{padding:75px 0;background:transparent!important}
.sf-caregiver-redesign .sf-how{padding:0 0 80px!important}
.sf-caregiver-redesign .sf-feature-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin:0 0 90px;padding:25px 0;border-top:1px solid #dbe8e6;border-bottom:1px solid #dbe8e6}
.sf-caregiver-redesign .sf-feature{display:grid;grid-template-columns:50px 1fr;grid-template-rows:auto auto;align-items:center;gap:0 15px;padding:10px 26px;background:transparent;border:0;border-radius:0;min-height:80px;box-shadow:none}
.sf-caregiver-redesign .sf-feature+.sf-feature{border-left:1px solid #dbe8e6}
.sf-caregiver-redesign .sf-feature-icon{grid-row:1/3;display:grid;place-items:center;width:48px;height:48px;border-radius:15px;background:#e0f3f2;color:#078e94;font-size:27px}
.sf-caregiver-redesign .sf-feature h3{font-size:20px;margin:0}
.sf-caregiver-redesign .sf-feature p{font-size:16px;line-height:1.4;margin:3px 0 0}
.sf-caregiver-redesign .sf-explainer-layout{display:grid;grid-template-columns:.85fr 1.15fr;gap:75px;align-items:center}
.sf-caregiver-redesign .sf-explainer-copy h2{font-size:clamp(42px,4.3vw,62px);margin:14px 0 22px;max-width:480px}
.sf-caregiver-redesign .sf-explainer-copy>p:not(.sf-eyebrow){font-size:19px;max-width:470px;line-height:1.65}
.sf-caregiver-redesign .sf-explainer-copy .sf-btn{margin-top:24px}
.sf-caregiver-redesign .sf-media{min-width:0}
.sf-caregiver-redesign .sf-video-placeholder{aspect-ratio:1.62;background:#e6f4f4;border:0;border-radius:24px;box-shadow:0 18px 50px rgba(19,55,67,.12);padding:14px;overflow:hidden}
.sf-caregiver-redesign .sf-placeholder-screen{border-radius:16px;border:1px solid #cce4e5;background:linear-gradient(140deg,#fbfdfd,#e5f4f4);height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:30px}
.sf-caregiver-redesign .sf-placeholder-title{font-family:'Source Serif 4',Georgia,serif;font-size:clamp(27px,2.8vw,40px);text-align:center;line-height:1.13;max-width:380px;margin:12px 0}
.sf-caregiver-redesign .sf-placeholder-kicker,.sf-caregiver-redesign .sf-placeholder-duration{font-size:12px;letter-spacing:.1em;text-align:center}
.sf-caregiver-redesign .sf-lyric-preview{padding:15px 25px;border-radius:13px;background:white;border:1px solid #d7e6e6;text-align:center;margin:8px 0}
.sf-caregiver-redesign .sf-lyric-preview span{display:block;font-size:14px}
.sf-caregiver-redesign .sf-lyric-preview strong{display:block;font-size:19px;color:var(--sf-orange)}
.sf-caregiver-redesign .sf-stories{padding:60px 0 90px!important}
.sf-caregiver-redesign .sf-story-intro{display:grid;grid-template-columns:1fr .65fr;gap:75px;align-items:end;margin-bottom:32px}
.sf-caregiver-redesign .sf-story-intro h2{max-width:660px;margin-top:12px}
.sf-caregiver-redesign .sf-story-intro>p{font-size:19px;max-width:380px;padding-bottom:7px}
.sf-caregiver-redesign .sf-scenarios{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-bottom:95px}
.sf-caregiver-redesign .sf-scenario{position:relative;overflow:hidden;border-radius:20px;min-height:330px;background:#d8e8e5;box-shadow:0 10px 28px rgba(21,46,55,.07)}
.sf-caregiver-redesign .sf-scenario img{width:100%;height:330px;object-fit:cover}
.sf-caregiver-redesign .sf-scenario:after{content:'';position:absolute;inset:40% 0 0;background:linear-gradient(transparent,rgba(14,34,43,.8))}
.sf-caregiver-redesign .sf-scenario>div{position:absolute;z-index:1;bottom:22px;left:25px;right:20px;color:#fff}
.sf-caregiver-redesign .sf-scenario strong{display:block;font-family:'Source Serif 4',Georgia,serif;font-size:27px;font-weight:500}
.sf-caregiver-redesign .sf-scenario span{display:block;font-size:16px;line-height:1.35}
.sf-caregiver-redesign .sf-proof{display:grid;grid-template-columns:.8fr 1.2fr;gap:65px;align-items:center}
.sf-caregiver-redesign .sf-proof-copy h2{font-size:clamp(38px,3.6vw,55px);margin:13px 0 24px}
.sf-caregiver-redesign .sf-proof-copy blockquote{font-family:'Source Serif 4',Georgia,serif;font-size:27px;line-height:1.32;border-left:4px solid var(--sf-orange);padding-left:19px;margin:25px 0 12px}
.sf-caregiver-redesign .sf-proof-copy>p:last-child{margin-top:22px;font-size:18px}
.sf-caregiver-redesign .sf-quote-source{font-size:15px;color:#526a76}
.sf-caregiver-redesign .sf-testimonial-video{border-radius:20px;overflow:hidden;box-shadow:0 17px 40px rgba(18,42,52,.14);background:#122d40;aspect-ratio:16/9}
.sf-caregiver-redesign .sf-testimonial-video iframe{width:100%;height:100%;border:0}
.sf-caregiver-redesign .sf-full-app{padding:80px 0 100px!important}
.sf-caregiver-redesign .sf-full-app .sf-section-heading{max-width:none;text-align:left;margin:0 0 38px}
.sf-caregiver-redesign .sf-full-app .sf-section-heading h2{max-width:700px;margin:13px 0 16px}
.sf-caregiver-redesign .sf-full-app .sf-section-heading>p:last-child{max-width:650px}
.sf-caregiver-redesign .sf-offer-layout{grid-template-columns:1.35fr .65fr;gap:45px}
.sf-caregiver-redesign .sf-offer-copy{grid-template-columns:.9fr 1.1fr;gap:20px}
.sf-caregiver-redesign .sf-app-image{max-height:390px}
.sf-caregiver-redesign .sf-app-benefits li{font-size:18px;padding:12px 0 12px 29px}
.sf-caregiver-redesign .sf-price-card{border-radius:25px;padding:32px;box-shadow:0 15px 45px rgba(19,50,60,.09)}
.sf-caregiver-redesign .sf-conversion-banner{padding:0 0 65px}
.sf-caregiver-redesign .sf-banner-inner{display:flex;align-items:center;gap:25px;background:#e2f5f3;border:1px solid #c8e9e5;border-radius:22px;padding:27px 35px}
.sf-caregiver-redesign .sf-banner-icon{flex:none;background:white;color:#148e93;border-radius:14px;width:64px;height:65px;display:grid;place-content:center;text-align:center;font-size:23px;font-weight:800;line-height:1}
.sf-caregiver-redesign .sf-banner-icon small{font-size:11px;letter-spacing:.08em}
.sf-caregiver-redesign .sf-banner-inner>div:nth-child(2){flex:1}
.sf-caregiver-redesign .sf-banner-inner h2{font-size:32px;margin-bottom:5px}
.sf-caregiver-redesign .sf-banner-inner p{font-size:16px}
.sf-caregiver-redesign .sf-faq-section{padding:35px 0 75px}
@media(max-width:980px){
.sf-caregiver-redesign .sf-hero-inner{grid-template-columns:1fr 1fr;gap:15px;min-height:550px}
.sf-caregiver-redesign .sf-hero-content h1{font-size:clamp(43px,5.4vw,61px)}
.sf-caregiver-redesign .sf-hero-visual{height:425px}
.sf-caregiver-redesign .sf-hero-photo-frame{inset:20px 20px 45px 0}
.sf-caregiver-redesign .sf-explainer-layout{gap:35px}
.sf-caregiver-redesign .sf-proof{gap:35px}
.sf-caregiver-redesign .sf-offer-layout{gap:25px}
.sf-caregiver-redesign .sf-feature{padding:10px 12px}
}
@media(max-width:700px){
.sf-caregiver-redesign .sf-container,.sf-caregiver-redesign .sf-hero-inner{width:calc(100% - 38px)}
.sf-caregiver-redesign .sf-header{width:calc(100% - 38px);min-height:72px}
.sf-caregiver-redesign .sf-hero-inner{grid-template-columns:1fr;min-height:0;gap:20px;padding:35px 0 40px}
.sf-caregiver-redesign .sf-hero-content h1{font-size:clamp(46px,10.5vw,65px);max-width:540px}
.sf-caregiver-redesign .sf-hero-lead{font-size:19px}
.sf-caregiver-redesign .sf-hero-visual{height:360px;max-width:520px;width:100%;margin:0 auto}
.sf-caregiver-redesign .sf-hero-photo-frame{inset:12px 32px 42px 0;border-width:9px;border-radius:26px}
.sf-caregiver-redesign .sf-hero-phones{width:49%;right:0;bottom:0}
.sf-caregiver-redesign .sf-feature-strip{grid-template-columns:1fr;gap:0;margin-bottom:55px;padding:10px 0}
.sf-caregiver-redesign .sf-feature{padding:13px 6px}
.sf-caregiver-redesign .sf-feature+.sf-feature{border-left:0;border-top:1px solid var(--sf-line)}
.sf-caregiver-redesign .sf-explainer-layout,.sf-caregiver-redesign .sf-story-intro,.sf-caregiver-redesign .sf-proof,.sf-caregiver-redesign .sf-offer-layout{grid-template-columns:1fr;gap:25px}
.sf-caregiver-redesign .sf-scenarios{grid-template-columns:1fr;gap:16px;margin-bottom:55px}
.sf-caregiver-redesign .sf-scenario,.sf-caregiver-redesign .sf-scenario img{height:270px;min-height:270px}
.sf-caregiver-redesign .sf-story-intro h2{font-size:clamp(39px,9vw,50px)}
.sf-caregiver-redesign .sf-story-intro>p{padding:0}
.sf-caregiver-redesign .sf-offer-copy{grid-template-columns:1fr 1fr;gap:12px}
.sf-caregiver-redesign .sf-app-image{max-height:280px}
.sf-caregiver-redesign .sf-app-benefits li{font-size:16px}
.sf-caregiver-redesign .sf-banner-inner{flex-wrap:wrap;padding:24px 20px}
.sf-caregiver-redesign .sf-banner-inner .sf-btn{width:100%}
.sf-caregiver-redesign .sf-section{padding:45px 0!important}
.sf-caregiver-redesign .sf-full-app{padding:55px 0!important}
}
@media(max-width:420px){
.sf-caregiver-redesign .sf-hero-visual{height:290px}
.sf-caregiver-redesign .sf-hero-photo-frame{inset:8px 26px 36px 0}
.sf-caregiver-redesign .sf-offer-copy{grid-template-columns:1fr}
.sf-caregiver-redesign .sf-app-image{max-height:250px;margin:auto}
.sf-caregiver-redesign .sf-actions{flex-direction:column}
}

`;
