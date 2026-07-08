import React, { useEffect, useMemo, useRef, useState } from "react";

const PAGE_ID = "caregiverlanding7";
const VIDEO_NAME = "caregiver_session_walkthrough";
const CHECKOUT_URL = "#pricing";

function pushDataLayer(eventName, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    page_id: PAGE_ID,
    ...params,
  });
}

function trackCta(buttonText, destinationUrl, ctaLocation) {
  pushDataLayer("click_cta", {
    button_text: buttonText,
    destination_url: destinationUrl,
    cta_location: ctaLocation,
  });
}

const testimonials = [
  {
    quote:
      "My mom has suffered with severe chronic pain for years. Her main activity is to watch TV. During our 1st SingFit session, she sang 15 songs... She's really enjoying this.",
    attribution:
      "— Gabriella, Caregiver of her mother, who has MCI (vascular dementia) and chronic pain",
  },
  {
    quote:
      "I think his mood is more stable...In fact, he will say 'I think I'm coming back.' He's feeling more like himself. And I think this is really good.",
    attribution: "— Jan, Caregiver of her husband who has MCI",
  },
  {
    quote:
      "We laughed a lot during the SingFit session - he was a different person totally. I'm so grateful for these memories. I can’t wait to tell my kids to try this.",
    attribution: "— Jeanne, Caregiver of her husband with dementia",
  },
  {
    quote:
      "Frances looks forward to each SingFit session. She is very vocal about how much the singing helps her feel better.",
    attribution:
      "— Mary Anne, Homecare Worker of her client Frances, who has dementia",
  },
];

function CtaButton({ children, href = CHECKOUT_URL, variant = "primary", location }) {
  const className = variant === "secondary" ? "btn btn-secondary" : "btn btn-primary";
  return (
    <a
      className={className}
      href={href}
      onClick={() => trackCta(String(children), href, location)}
    >
      {children}
    </a>
  );
}

export default function CaregiverLandingPageV7() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const iframeRef = useRef(null);
  const trackedProgressRef = useRef(new Set());
  const hasTrackedStartRef = useRef(false);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    pushDataLayer("landing_page_view", { page_path: window.location.pathname });
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (reduceMotion || isCarouselPaused) return undefined;
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isCarouselPaused, reduceMotion]);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll(".caregiver-v7-root .product-video"));
    if (!videos.length) return undefined;

    const playVideo = (video) => {
      video.muted = true;
      video.defaultMuted = true;
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") playAttempt.catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      videos.forEach(playVideo);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) playVideo(video);
          else video.pause();
        });
      },
      { rootMargin: "180px 0px", threshold: 0.2 }
    );

    videos.forEach((video) => {
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMessage = (event) => {
      if (!String(event.origin || "").includes("vimeo.com")) return;

      let payload = event.data;
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }

      if (!payload || typeof payload !== "object") return;

      if (payload.event === "play" && !hasTrackedStartRef.current) {
        hasTrackedStartRef.current = true;
        pushDataLayer("video_start", { video_name: VIDEO_NAME });
      }

      if (payload.event === "timeupdate" && payload.data) {
        const percent = Math.floor((payload.data.percent || 0) * 100);
        [25, 50, 75].forEach((milestone) => {
          if (percent >= milestone && !trackedProgressRef.current.has(milestone)) {
            trackedProgressRef.current.add(milestone);
            pushDataLayer("video_progress", {
              video_name: VIDEO_NAME,
              percent: milestone,
            });
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
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    ["play", "timeupdate", "ended"].forEach((eventName) => {
      iframe.contentWindow.postMessage(
        JSON.stringify({ method: "addEventListener", value: eventName }),
        "https://player.vimeo.com"
      );
    });
  };

  const previousSlide = () => setSlideIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  const nextSlide = () => setSlideIndex((current) => (current + 1) % testimonials.length);

  return (
    <main className={`caregiver-v7-root ${menuOpen ? "menu-open" : ""}`}>
      <style>{`
:root{
  --ink:#162331;
  --ink-soft:#344a5b;
  --muted:#6f8090;
  --paper:#ffffff;
  --warm:#f6fbfb;
  --warm-2:#edf8f7;
  --orange:#f37a4a;
  --orange-soft:#ffe3d7;
  --teal:#249f9a;
  --teal-deep:#1f7275;
  --teal-soft:#e4f5f2;
  --lav:#eef2ff;
  --line:rgba(23,33,43,.10);
  --shadow:0 30px 90px rgba(23,33,43,.11);
  --soft-shadow:0 20px 56px rgba(23,33,43,.075);
  --site-padding:clamp(22px, 4.7vw, 58px);
  --section-gap:clamp(68px, 7vw, 92px);
}

*{box-sizing:border-box}

html{
  width:100%;
  min-height:100%;
  scroll-behavior:smooth;
}

.caregiver-v7-root{
  width:100%;
  min-height:100%;
  margin:0;
  font-family:"Source Sans 3","Segoe UI",system-ui,sans-serif;
  color:var(--ink);
  background:
    radial-gradient(circle at 84% 0%,rgba(36,159,154,.10),transparent 34%),
    radial-gradient(circle at 0% 16%,rgba(243,122,74,.08),transparent 30%),
    linear-gradient(180deg,#fbffff 0%,#f6fbfb 48%,#ffffff 100%);
}

img{
  display:block;
  max-width:100%;
}

h1,h2,h3,p{margin:0}

h1,h2,h3{
  color:var(--ink);
  font-family:"Source Serif 4",Georgia,"Times New Roman",serif;
  font-weight:500;
  letter-spacing:-.045em;
  text-wrap:balance;
}

p{
  color:var(--muted);
  font-size:17px;
  line-height:1.7;
  text-wrap:pretty;
}

:focus-visible{
  outline:3px solid rgba(31,114,117,.55);
  outline-offset:4px;
}

.skip-link{
  position:absolute;
  top:12px;
  left:16px;
  z-index:9999;
  transform:translateY(-160%);
  padding:10px 14px;
  border-radius:999px;
  background:var(--ink);
  color:#fff;
  text-decoration:none;
  font-weight:700;
  box-shadow:0 10px 24px rgba(23,33,43,.18);
  transition:transform .2s ease;
}

.skip-link:focus{
  transform:translateY(0);
  outline:3px solid rgba(244,124,69,.55);
  outline-offset:3px;
}

/* Layout */

.page{
  width:100%;
  margin:0;
  padding:0;
}

.site{
  width:100%;
  min-height:100vh;
  overflow:hidden;
  background:transparent;
}

.topbar,
.hero,
.section,
.footer{
  width:100%;
}

.topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  max-width:1280px;
  margin-inline:auto;
  padding:28px var(--site-padding);
}

.hero{
  display:grid;
  grid-template-columns:minmax(0,.84fr) minmax(640px,1.16fr);
  gap:clamp(44px, 5vw, 84px);
  align-items:center;
  max-width:1280px;
  margin-inline:auto;
  padding:clamp(40px,6vw,96px) var(--site-padding) clamp(72px,8vw,104px);
}

.section{
  padding:0 var(--site-padding) var(--section-gap);
}

.section > *{
  max-width:1180px;
  margin-left:auto;
  margin-right:auto;
}

.section.center{text-align:center}

.section.center > *{
  margin-left:auto;
  margin-right:auto;
}

.section h2{
  max-width:min(820px, 100%);
  font-size:clamp(36px, 4.9vw, 64px);
  line-height:1.03;
}

.section.center h2,
.testimonial-intro h2,
.who-intro h2{
  max-width:min(780px, 100%);
  margin-left:auto;
  margin-right:auto;
}

.lead{
  max-width:44rem;
  margin-top:20px;
  color:var(--ink-soft);
  font-size:clamp(18px, 1.9vw, 21px);
  line-height:1.68;
}

.section.center .lead{
  margin-left:auto;
  margin-right:auto;
}

.microcopy{
  margin-top:16px;
  color:var(--muted);
}

/* Brand / navigation */

.brand{
  display:flex;
  align-items:center;
  gap:12px;
  min-width:0;
  color:inherit;
  text-decoration:none;
}

.logo-brand{display:flex}

.singfit-logo-img{
  display:block;
  width:auto;
  height:34px;
  max-width:170px;
  object-fit:contain;
}

.brand-product{
  display:block;
  margin-left:2px;
  color:var(--muted);
  font-size:12px;
  font-weight:600;
  line-height:1;
  white-space:nowrap;
}

.nav{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:flex-end;
  gap:16px 24px;
  color:var(--muted);
  font-size:16px;
  font-weight:500;
}

.nav a{
  color:inherit;
  text-decoration:none;
}

.nav .nav-cta{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:11px 18px;
  border-radius:999px;
  background:var(--orange);
  color:#fff;
  box-shadow:0 10px 24px rgba(244,124,69,.22);
  font-size:15px;
  font-weight:700;
  line-height:1;
  white-space:nowrap;
}

.nav .nav-cta:hover{filter:brightness(.98)}

.desktop-nav{display:flex}

.menu-toggle{
  display:none;
  width:46px;
  height:46px;
  border:0;
  border-radius:999px;
  background:rgba(255,255,255,.82);
  box-shadow:0 10px 24px rgba(23,33,43,.08);
  align-items:center;
  justify-content:center;
  flex:0 0 46px;
  flex-direction:column;
  gap:5px;
  cursor:pointer;
}

.menu-toggle span{
  width:18px;
  height:2px;
  border-radius:999px;
  background:var(--ink);
  transition:transform .2s ease, opacity .2s ease;
}

.menu-overlay{
  position:fixed;
  inset:0;
  z-index:90;
  background:rgba(23,33,43,.28);
  opacity:0;
  pointer-events:none;
  transition:opacity .25s ease;
}

.mobile-drawer{
  position:fixed;
  top:0;
  right:0;
  z-index:100;
  width:min(390px, calc(100vw - 28px));
  height:100dvh;
  padding:22px;
  display:flex;
  flex-direction:column;
  background:
    radial-gradient(circle at 90% 4%,rgba(244,124,69,.12),transparent 32%),
    linear-gradient(180deg,#fffaf4,#ffffff);
  border-left:1px solid rgba(23,33,43,.08);
  box-shadow:-24px 0 70px rgba(23,33,43,.18);
  transform:translateX(105%);
  transition:transform .32s cubic-bezier(.22,1,.36,1);
}

.drawer-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:18px;
  padding-bottom:24px;
  border-bottom:1px solid var(--line);
}

.drawer-close{
  width:42px;
  height:42px;
  border:0;
  border-radius:999px;
  display:grid;
  place-items:center;
  background:#fff1e4;
  color:var(--ink);
  font-size:28px;
  line-height:1;
  cursor:pointer;
}

.drawer-nav{
  display:grid;
  gap:0;
  padding:18px 0;
}

.drawer-nav a{
  padding:18px 0;
  border-bottom:1px solid var(--line);
  color:var(--ink);
  text-decoration:none;
  font-family:"Source Serif 4",Georgia,"Times New Roman",serif;
  font-size:32px;
  line-height:1.05;
  letter-spacing:-.04em;
}

.drawer-nav a:last-child{
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:56px;
  margin-top:18px;
  padding:15px 18px;
  border:0;
  border-radius:999px;
  background:var(--orange);
  color:#fff;
  font-family:"Source Sans 3",system-ui,sans-serif;
  font-size:16px;
  font-weight:700;
  letter-spacing:0;
  text-align:center;
}

.drawer-note{
  margin-top:auto;
  padding:18px;
  border-radius:24px;
  background:#f6fbfb;
  border:1px solid rgba(244,124,69,.12);
}

.drawer-note strong{
  display:block;
  color:var(--ink);
  font-size:16px;
}

.drawer-note span{
  display:block;
  margin-top:4px;
}

.menu-overlay[aria-hidden="true"],
.mobile-drawer[aria-hidden="true"]{
  visibility:hidden;
}

.caregiver-v7-root.menu-open{overflow:hidden}

.caregiver-v7-root.menu-open .menu-overlay{
  visibility:visible;
  opacity:1;
  pointer-events:auto;
}

.caregiver-v7-root.menu-open .mobile-drawer{
  visibility:visible;
  transform:translateX(0);
}

/* Buttons */

.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:56px;
  padding:15px 24px;
  border-radius:999px;
  text-decoration:none;
  text-align:center;
  font-size:16px;
  font-weight:700;
}

.btn-primary{
  color:#fff;
  background:var(--orange);
  box-shadow:0 18px 32px rgba(244,124,69,.24);
}

.btn-secondary{
  color:var(--ink);
  background:rgba(255,255,255,.84);
  border:1px solid var(--line);
  box-shadow:0 8px 22px rgba(23,33,43,.05);
}

.btn:focus-visible,
.nav a:focus-visible,
.drawer-nav a:focus-visible,
.menu-toggle:focus-visible,
.drawer-close:focus-visible,
.carousel-arrow:focus-visible,
.carousel-dots button:focus-visible{
  outline:3px solid rgba(31,114,117,.65);
  outline-offset:4px;
}

.drawer-nav a:last-child:focus-visible,
.btn-primary:focus-visible{
  outline-color:rgba(23,33,43,.75);
}

/* Hero */

.hero h1{
  max-width:15.5ch;
  font-size:clamp(44px, 7vw, 82px);
  line-height:.95;
}

.hero-copy{
  max-width:36rem;
  margin-top:24px;
  color:var(--ink-soft);
  font-size:clamp(18px, 1.9vw, 21px);
  line-height:1.68;
}

.actions{
  display:flex;
  flex-wrap:wrap;
  gap:14px;
  margin-top:30px;
}

.hero-visual{
  position:relative;
  width:100%;
  max-width:780px;
  min-height:640px;
  margin-left:auto;
}

.hero-stage{
  position:relative;
  width:100%;
  min-height:inherit;
  overflow:visible;
}

.hero-image-panel{
  position:absolute;
  left:0;
  right:72px;
  top:56px;
  bottom:82px;
  overflow:hidden;
  border-radius:42px;
  background:rgba(255,255,255,.62);
  border:1px solid rgba(255,255,255,.78);
  box-shadow:0 22px 60px rgba(23,33,43,.10);
  backdrop-filter:blur(12px);
}

.hero-image-art{
  position:absolute;
  inset:16px;
  overflow:hidden;
  border-radius:32px;
  background:
    radial-gradient(circle at 22% 18%,rgba(255,255,255,.48),transparent 20%),
    radial-gradient(circle at 84% 82%,rgba(44,166,161,.08),transparent 22%),
    linear-gradient(135deg,#edd1c0 0%,#efe0d0 42%,#ddeae7 100%);
}

.hero-photo-art{background:none}

.hero-photo-art img{
  width:100%;
  height:100%;
  min-height:inherit;
  object-fit:cover;
  object-position:42% center;
  border-radius:inherit;
}

.hero-accent-card{
  position:absolute;
  left:clamp(22px, 5vw, 54px);
  bottom:clamp(24px, 5vw, 42px);
  z-index:6;
  width:clamp(124px, 18vw, 160px);
  padding:14px;
  border-radius:22px;
  background:rgba(255,255,255,.76);
  border:1px solid rgba(255,255,255,.74);
  box-shadow:0 16px 34px rgba(23,33,43,.10);
  backdrop-filter:blur(12px);
}

.accent-line{
  height:8px;
  margin-top:8px;
  border-radius:999px;
  background:rgba(44,166,161,.20);
}

.accent-line.short{
  width:48%;
  margin-top:0;
  background:rgba(244,124,69,.28);
}

.accent-line.mid{width:66%}

.hero-phone-image{
  position:absolute;
  right:-58px;
  bottom:-34px;
  z-index:18;
  width:clamp(300px, 32vw, 430px);
  padding:0;
  background:transparent;
  border-radius:0;
  box-shadow:none;
  pointer-events:none;
}

.hero-phone-image img{
  display:block;
  width:100%;
  height:auto;
  filter:drop-shadow(0 24px 42px rgba(15,23,42,.24));
}

/* Shared section CTAs */

.section-cta{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  margin-top:28px;
  text-align:center;
}

.section-cta .btn{
  width:min(100%, 360px);
}

.section-cta-note{
  max-width:30rem;
  margin-top:10px;
  color:var(--muted);
  font-size:15px;
  line-height:1.5;
}

/* Who it's for */

.who-situation-layout{
  display:grid;
  grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);
  grid-template-areas:
    "image intro"
    "image list";
  gap:clamp(24px, 4vw, 42px);
  align-items:start;
}

.who-intro{
  grid-area:intro;
  max-width:none;
  margin-bottom:0;
}

.who-image-panel{
  grid-area:image;
  min-height:clamp(300px, 42vw, 520px);
  overflow:visible;
}

.who-image-stage{
  position:relative;
  min-height:inherit;
  padding:0 0 clamp(54px, 7vw, 86px) clamp(10px, 1.6vw, 18px);
  overflow:visible;
}

.who-situation-list{
  grid-area:list;
  display:grid;
  gap:6px;
  align-content:start;
}

.who-situation{
  display:grid;
  grid-template-columns:52px minmax(0,1fr);
  gap:18px;
  padding:22px 0;
  border-bottom:1px solid var(--line);
}

.who-situation:first-child{
  border-top:1px solid var(--line);
}

.who-situation > span{
  width:38px;
  height:38px;
  border-radius:999px;
  display:grid;
  place-items:center;
  background:#fff1e4;
  color:var(--orange);
  font-size:13px;
  font-weight:700;
}

.who-situation h3{
  font-size:clamp(24px, 3.2vw, 30px);
  line-height:1.08;
}

.who-situation p{
  margin-top:10px;
  max-width:35rem;
}

/* Video */

.video-panel{
  display:grid;
  grid-template-columns:minmax(0,.88fr) minmax(0,1.12fr);
  gap:clamp(24px, 4vw, 42px);
  align-items:center;
  padding:clamp(22px, 3vw, 36px);
  border-radius:46px;
  background:#fff;
  border:1px solid var(--line);
  box-shadow:var(--soft-shadow);
}

.video-box{
  position:relative;
  min-height:clamp(270px, 34vw, 410px);
  display:grid;
  place-items:center;
  overflow:hidden;
  border-radius:36px;
  background:
    radial-gradient(circle at 24% 24%,rgba(255,255,255,.16),transparent 30%),
    linear-gradient(135deg,#176d72,#249f9a);
}

.video-embed{
  display:block;
  position:relative;
  min-height:0;
  aspect-ratio:16 / 9;
  background:#0f2e38;
}

.video-embed::after{display:none}

.video-embed iframe{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  border:0;
  border-radius:inherit;
}

/* Benefits */

.benefits-intro-row{
  display:grid;
  grid-template-columns:minmax(0, 1.3fr) minmax(190px, .72fr);
  justify-content:space-between;
  gap:clamp(18px, 2.6vw, 28px);
  align-items:start;
  max-width:1080px;
  margin:0 auto;
  text-align:left;
}

.benefits-intro-copy{
  width:min(100%, 42rem);
}

.benefits-intro-copy h2{
  max-width:100%;
  margin-left:0;
  margin-right:0;
}

.benefits-intro-copy .lead{
  max-width:100%;
  margin-top:18px;
  margin-left:0;
  margin-right:0;
}

.benefits-intro-media{
  position:relative;
  display:grid;
  place-items:center;
  justify-self:end;
  align-self:start;
  min-height:clamp(280px, 28vw, 420px);
  padding-top:8px;
}

.benefits-intro-media::before{
  content:"";
  position:absolute;
  inset:8% 5%;
  border-radius:50%;
  background:
    radial-gradient(circle, rgba(122,223,240,.17) 0%, rgba(122,223,240,.08) 38%, rgba(122,223,240,0) 72%);
  filter:blur(8px);
  pointer-events:none;
}

.benefit-editorial{
  display:grid;
  gap:clamp(46px, 6vw, 72px);
  max-width:1080px;
  margin:clamp(34px, 4.5vw, 50px) auto 0;
  text-align:left;
}

.benefit-row{
  display:grid;
  grid-template-columns:minmax(0,.72fr) minmax(0,1fr);
  gap:clamp(24px, 4vw, 48px);
  align-items:center;
  padding:clamp(18px, 2.6vw, 28px);
  border-radius:38px;
  background:rgba(255,255,255,.78);
  border:1px solid rgba(23,33,43,.08);
  box-shadow:0 14px 34px rgba(23,33,43,.06);
}

.benefit-row:nth-child(even){
  grid-template-columns:minmax(0,1fr) minmax(0,.72fr);
}

.benefit-row:nth-child(even) .benefit-image{order:2}

.benefit-image{
  min-height:clamp(220px, 28vw, 310px);
  border-radius:38px;
  background:
    radial-gradient(circle at 68% 28%,rgba(243,122,74,.16),transparent 26%),
    linear-gradient(135deg,#edf8f7,#ffffff);
  box-shadow:var(--soft-shadow);
}

.benefit-row:nth-child(2) .benefit-image{
  background:
    radial-gradient(circle at 24% 26%,rgba(36,159,154,.16),transparent 28%),
    linear-gradient(135deg,#e2f5f3,#fbffff);
}

.benefit-row:nth-child(3) .benefit-image{
  background:
    radial-gradient(circle at 65% 30%,rgba(89,102,165,.14),transparent 28%),
    linear-gradient(135deg,#eef2ff,#ffffff);
}

.benefit-copy h3{
  font-size:clamp(34px, 4vw, 46px);
  line-height:1.04;
}

.benefit-copy p{
  max-width:34rem;
  margin-top:14px;
}

/* Product videos */

.product-phone{
  position:relative;
  z-index:2;
  padding:8px;
  border-radius:38px;
  background:
    linear-gradient(180deg,#2f3136 0%,#111214 16%,#060708 52%,#1c1d20 100%);
  border:1px solid rgba(255,255,255,.10);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.10),
    inset 0 -1px 0 rgba(255,255,255,.05),
    0 24px 42px rgba(15,23,42,.22);
  filter:drop-shadow(0 18px 34px rgba(15,23,42,.18));
}

.product-phone::before{
  content:"";
  position:absolute;
  top:14px;
  left:50%;
  z-index:4;
  width:36%;
  height:18px;
  transform:translateX(-50%);
  border-radius:999px;
  background:linear-gradient(180deg,#050607,#15161a 72%,#0c0d10 100%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.04),
    0 1px 0 rgba(255,255,255,.05);
}

.product-phone::after{
  content:"";
  position:absolute;
  inset:1px;
  border-radius:37px;
  border:1px solid rgba(255,255,255,.05);
  pointer-events:none;
}

.product-phone-screen{
  position:relative;
  overflow:hidden;
  border-radius:31px;
  background:#0f141b;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.04),
    inset 0 14px 26px rgba(255,255,255,.03);
}

.product-video{
  display:block;
  width:100%;
  height:100%;
  aspect-ratio:9 / 19.5;
  object-fit:cover;
  object-position:top center;
  background:#101a24;
}

.product-phone-floating{
  position:absolute;
  left:0;
  bottom:0;
  z-index:3;
  width:clamp(170px, 34%, 222px);
  transform:translate(-6%, 11%) rotate(-1.8deg);
}

.product-phone-intro{
  width:min(100%, 206px);
  transform:rotate(1.75deg);
}

/* Testimonials */

.testimonial-flow{
  padding-top:0;
}

.testimonial-intro{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,.8fr);
  gap:clamp(24px, 4vw, 48px);
  align-items:end;
  margin-bottom:26px;
}

.testimonial-intro p{
  color:var(--muted);
}

.testimonial-carousel{
  position:relative;
  min-height:clamp(330px, 38vw, 410px);
  overflow:hidden;
  border-radius:48px;
  background:
    radial-gradient(circle at 84% 12%,rgba(255,255,255,.58),transparent 34%),
    radial-gradient(circle at 8% 70%,rgba(36,159,154,.10),transparent 28%),
    linear-gradient(135deg,#eef2ff,#ffffff);
  border:1px solid rgba(103,86,174,.12);
  box-shadow:var(--soft-shadow);
}

.carousel-viewport{overflow:hidden}

.carousel-track{
  display:flex;
  transition:transform .72s cubic-bezier(.22,1,.36,1);
  will-change:transform;
}

.carousel-slide{
  flex:0 0 100%;
  min-width:100%;
  padding:clamp(34px, 5vw, 52px) clamp(28px, 8vw, 92px) 74px;
}

.slide-inner{max-width:980px}

.carousel-slide blockquote{
  color:var(--ink);
  font-family:"Source Serif 4",Georgia,serif;
  font-size:clamp(28px, 4.6vw, 58px);
  line-height:1.08;
  letter-spacing:-.05em;
}

.carousel-slide p{
  max-width:50rem;
  margin-top:22px;
  color:var(--muted);
  font-size:16px;
  line-height:1.6;
  font-weight:500;
}

.carousel-arrow{
  position:absolute;
  top:50%;
  z-index:5;
  width:46px;
  height:46px;
  border:0;
  border-radius:999px;
  display:grid;
  place-items:center;
  background:rgba(255,255,255,.78);
  color:var(--ink);
  box-shadow:0 12px 28px rgba(23,33,43,.10);
  cursor:pointer;
  transform:translateY(-50%);
  transition:transform .2s ease, background .2s ease;
}

.carousel-arrow:hover{
  background:#fff;
  transform:translateY(-50%) scale(1.04);
}

.carousel-arrow span{
  display:block;
  margin-top:-3px;
  font-family:Georgia,serif;
  font-size:40px;
  line-height:1;
}

.carousel-prev{left:20px}
.carousel-next{right:20px}

.carousel-dots{
  position:absolute;
  left:clamp(28px, 8vw, 92px);
  bottom:28px;
  z-index:6;
  display:flex;
  gap:10px;
}

.carousel-dots button{
  width:9px;
  height:9px;
  padding:0;
  border:0;
  border-radius:999px;
  background:rgba(23,33,43,.20);
  cursor:pointer;
  transition:width .28s ease, background .28s ease;
}

.carousel-dots button.is-active{
  width:34px;
  background:var(--ink);
}

.carousel-pause,
[data-carousel-pause]{
  display:none !important;
}

/* FAQ */

.faq{
  max-width:900px;
  margin:34px auto 0;
  border-top:1px solid var(--line);
  text-align:left;
}

.faq-row{
  display:grid;
  grid-template-columns:minmax(0,.42fr) minmax(0,.58fr);
  gap:24px;
  padding:24px 0;
  border-bottom:1px solid var(--line);
}

.faq-row h3{
  font-size:clamp(22px, 2.4vw, 25px);
  line-height:1.12;
}

/* Pricing / final CTA */

.final-cta{
  display:grid;
  grid-template-columns:minmax(0, 1fr) minmax(360px, 460px);
  gap:clamp(40px, 5vw, 64px);
  align-items:center;
  max-width:1120px;
  margin-inline:auto;
}

.final-copy{
  max-width:620px;
}

.proof-line{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:32px;
}

.proof-line span{
  display:inline-flex;
  align-items:center;
  min-height:36px;
  padding:8px 13px;
  border-radius:999px;
  background:rgba(255,255,255,.78);
  border:1px solid rgba(23,33,43,.08);
  color:var(--ink-soft);
  font-size:13px;
  font-weight:600;
  box-shadow:0 8px 18px rgba(23,33,43,.045);
}

.price-card{
  padding:clamp(20px, 3vw, 28px);
  border-radius:42px;
  background:rgba(255,255,255,.92);
  border:1px solid rgba(23,33,43,.08);
  box-shadow:0 24px 60px rgba(23,33,43,.10);
  backdrop-filter:blur(8px);
}

.price-top{
  padding:24px;
  border-radius:30px;
  background:
    radial-gradient(circle at 92% 10%,rgba(255,255,255,.52),transparent 28%),
    linear-gradient(135deg,#e6f6f4 0%,#f5fbfb 62%,#ffffff 100%);
  border:1px solid rgba(44,166,161,.14);
}

.price-top small{
  display:block;
  color:var(--teal-deep);
  text-transform:uppercase;
  letter-spacing:.16em;
  font-size:12px;
  font-weight:700;
}

.price-inline{
  display:flex;
  flex-wrap:wrap;
  align-items:flex-end;
  gap:8px;
  margin-top:12px;
}

.price-inline strong{
  color:var(--ink);
  font-size:clamp(46px, 6vw, 60px);
  line-height:.9;
  letter-spacing:-.06em;
  font-weight:600;
}

.price-inline span{
  padding-bottom:7px;
  color:var(--ink-soft);
  font-size:clamp(22px, 3vw, 28px);
}

.price-sub{
  margin-top:14px;
  color:var(--ink-soft);
}

.price-list{
  padding:20px 6px 4px;
}

.price-list div{
  padding:14px 0;
  border-bottom:1px solid var(--line);
  color:var(--ink-soft);
  font-weight:500;
}

.price-card .btn{
  width:100%;
  margin-top:22px;
}

.store-signal{
  margin-top:18px;
}

.store-signal-label{
  margin-bottom:10px;
  color:var(--muted);
  font-size:13px;
  font-weight:600;
}

/* Footer / store badges */

.official-store-badges,
.store-signal .official-store-badges,
.stores.official-footer-badges .official-store-badges{
  display:flex;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
}

.store-signal .official-store-badges{
  margin-top:12px;
}

.official-store-badges a{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:0;
  margin:0;
  line-height:0;
  background:transparent;
  border:0;
  border-radius:8px;
  box-shadow:none;
  transition:transform .18s ease, opacity .18s ease;
}

.official-store-badges a:hover{
  transform:translateY(-1px);
}

.official-store-badges a:focus-visible{
  outline:3px solid rgba(247,111,64,.55);
  outline-offset:4px;
}

.official-store-badges img{
  display:block;
  width:auto;
  height:46px;
}

.footer{
  display:grid;
  grid-template-columns:max-content minmax(260px, 320px) max-content max-content;
  justify-content:space-between;
  align-items:center;
  gap:22px clamp(28px, 3.2vw, 44px);
  margin:0;
  padding:32px max(var(--site-padding), calc((100vw - 1280px) / 2 + var(--site-padding)));
  border-top:1px solid var(--line);
  background:rgba(255,255,255,.72);
}

.footer > *{
  max-width:none;
  min-width:0;
}

.footer-logo-brand{
  flex-direction:column;
  align-items:flex-start;
  align-self:center;
  gap:7px;
}

.footer-logo-brand .singfit-logo-img{
  height:30px;
  max-width:150px;
}

.footer-logo-brand .brand-product{
  margin-left:0;
}

.footer-legal{
  margin:0;
  color:var(--muted);
  font-size:13px;
  line-height:1.6;
  justify-self:start;
}

.footer-links{
  display:grid;
  justify-items:start;
  gap:10px;
  color:var(--muted);
  font-size:14px;
  line-height:1.5;
}

.footer-links a{
  color:inherit;
  text-decoration:none;
}

.footer-links a:hover{
  color:var(--ink);
}

.stores{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

.stores.official-footer-badges{
  display:flex;
  align-items:center;
  justify-content:flex-end;
  justify-self:end;
}

/* Shared framed images */

.who-real-image-panel,
.benefit-real-image{
  position:relative;
  overflow:hidden;
  padding:18px;
  border-radius:42px;
  background:rgba(255,255,255,.62);
  border:1px solid rgba(255,255,255,.78);
  box-shadow:0 22px 60px rgba(23,33,43,.10);
  backdrop-filter:blur(12px);
}

.who-real-image-panel::before,
.who-real-image-panel::after,
.benefit-real-image::before,
.benefit-real-image::after{
  display:none;
  content:none;
}

.who-real-image-panel > img,
.benefit-real-image img{
  display:block;
  width:100%;
  height:100%;
  min-height:inherit;
  object-fit:cover;
  border-radius:30px;
}

.who-real-image-panel > img{
  object-position:32% center;
}

.benefit-row:nth-child(1) .benefit-real-image img{
  object-position:44% center;
}

.benefit-row:nth-child(2) .benefit-real-image img,
.benefit-row:nth-child(3) .benefit-real-image img{
  object-position:50% center;
}

/* Responsive */

@media (min-width:1320px){
  .topbar,
  .hero,
  .section{
    padding-left:40px;
    padding-right:40px;
  }
}

@media (max-width:1120px){
  .desktop-nav{display:none}

  .menu-toggle{display:flex}

  .hero{
    grid-template-columns:1fr;
    gap:42px;
  }

  .hero-visual{
    max-width:860px;
    min-height:580px;
    margin-inline:auto;
  }

  .hero-stage{
    min-height:580px;
  }

  .hero-image-panel{
    right:68px;
    top:52px;
    bottom:74px;
    border-radius:36px;
  }

  .hero-image-art{
    inset:14px;
    border-radius:28px;
  }

  .hero-phone-image{
    right:-42px;
    bottom:-28px;
    width:clamp(270px, 40vw, 390px);
  }

  .section h2,
  .testimonial-intro h2,
  .who-intro h2{
    max-width:22ch;
  }

  .final-copy{
    max-width:52rem;
  }
}

@media (max-width:920px){
  .nav{
    font-size:15px;
    gap:12px 16px;
  }

  .benefits-intro-row,
  .video-panel,
  .final-cta{
    grid-template-columns:1fr;
  }

  .benefits-intro-row{
    gap:24px;
    text-align:left;
  }

  .benefits-intro-copy{
    width:100%;
  }

  .benefits-intro-copy h2,
  .benefits-intro-copy .lead{
    max-width:none;
  }

  .benefits-intro-media{
    min-height:unset;
    padding-top:0;
  }

  .product-phone-intro{
    width:min(100%, 194px);
  }

  .benefit-row,
  .benefit-row:nth-child(even){
    grid-template-columns:1fr;
  }

  .benefit-row:nth-child(even) .benefit-image{
    order:0;
  }

  .who-situation-layout{
    grid-template-columns:1fr;
    grid-template-areas:
      "intro"
      "image"
      "list";
  }

  .who-image-stage{
    padding-left:0;
    padding-bottom:78px;
  }

  .product-phone-floating{
    left:18px;
    width:clamp(154px, 30vw, 198px);
    transform:translateY(10%) rotate(-1.5deg);
  }

  .testimonial-intro{
    grid-template-columns:1fr;
    max-width:900px;
  }

  .testimonial-intro p{
    max-width:46rem;
  }

  .faq-row{
    grid-template-columns:1fr;
    gap:12px;
  }

  .price-card{
    max-width:560px;
  }

  .final-copy{
    max-width:52rem;
  }

  .footer{
    grid-template-columns:minmax(0, 1fr) minmax(0, 1fr);
    align-items:start;
    gap:24px 28px;
  }

  .footer-legal{
    grid-column:1 / 2;
    grid-row:2 / 3;
  }

  .footer-links{
    grid-column:2 / 3;
    grid-row:1 / 2;
    align-self:start;
  }

  .stores.official-footer-badges{
    grid-column:2 / 3;
    grid-row:2 / 3;
    justify-self:start;
    justify-content:flex-start;
  }

  .section-cta{
    margin-top:24px;
  }
}

@media (max-width:720px){
  :root{
    --section-gap:72px;
  }

  p,
  .price-list div,
  .footer-links,
  .drawer-note span{
    font-size:16px;
  }

  .lead,
  .hero-copy{
    font-size:18px;
  }

  .btn{
    min-height:54px;
    font-size:15.5px;
  }

  .drawer-nav a:last-child{
    min-height:54px;
    font-size:15.5px;
  }

  .hero{
    gap:34px;
  }

  .hero-visual{
    min-height:480px;
  }

  .hero-stage{
    min-height:480px;
  }

  .hero-image-panel{
    right:42px;
    top:40px;
    bottom:66px;
    border-radius:28px;
  }

  .hero-image-art{
    inset:12px;
    border-radius:22px;
  }

  .hero-photo-art img{
    object-position:40% center;
  }

  .hero-accent-card{
    left:16px;
    bottom:18px;
    width:128px;
    padding:12px;
    border-radius:18px;
  }

  .hero-phone-image{
    right:-24px;
    bottom:-12px;
    width:clamp(220px, 52vw, 320px);
  }

  .benefit-real-image img{
    object-position:center;
  }

  .who-real-image-panel,
  .benefit-real-image{
    padding:14px;
    border-radius:32px;
  }

  .who-real-image-panel > img,
  .benefit-real-image img{
    border-radius:22px;
  }

  .who-real-image-panel > img{
    object-position:40% center;
  }

  .benefit-row{
    gap:22px;
    padding:18px;
    border-radius:32px;
  }

  .product-phone{
    padding:7px;
    border-radius:32px;
  }

  .product-phone::before{
    top:12px;
    height:16px;
  }

  .product-phone::after{
    border-radius:31px;
  }

  .product-phone-screen{
    border-radius:26px;
  }

  .product-phone-floating{
    left:16px;
    width:clamp(138px, 36vw, 186px);
    transform:translateY(7%) rotate(-1.25deg);
  }

  .product-phone-intro{
    width:min(100%, 176px);
  }

  .testimonial-carousel{
    min-height:390px;
    border-radius:32px;
  }

  .carousel-slide{
    padding:30px 22px 88px;
  }

  .carousel-slide blockquote{
    font-size:clamp(25px, 8.4vw, 34px);
  }

  .carousel-slide p{
    font-size:15px;
  }

  .carousel-prev{left:14px}
  .carousel-next{right:14px}

  .carousel-dots{
    bottom:36px;
  }

  .official-store-badges{
    gap:10px;
  }

  .official-store-badges img{
    height:42px;
  }

  .singfit-logo-img{
    height:30px;
    max-width:150px;
  }

  .brand-product{
    display:none;
  }

  .footer-logo-brand .brand-product{
    display:block;
  }

  .footer-legal{
    font-size:12.5px;
  }

  .section-cta .btn{
    width:100%;
  }

  .section-cta-note{
    font-size:14.5px;
  }
}

@media (max-width:768px){
  .benefits-intro-row{
    display:block;
    text-align:center;
  }

  .benefits-intro-copy h2,
  .benefits-intro-copy .lead{
    margin-left:auto;
    margin-right:auto;
    max-width:min(31rem, 100%);
  }

  .benefits-intro-media{
    display:none;
  }

  .benefit-editorial{
    margin-top:30px;
  }
}

@media (max-width:560px){
  .mobile-drawer{
    width:calc(100vw - 16px);
    padding:18px;
  }

  .drawer-nav a{
    font-size:29px;
  }

  .hero-visual{
    min-height:430px;
  }

  .hero-stage{
    min-height:430px;
  }

  .hero-image-panel{
    right:30px;
    top:34px;
    bottom:58px;
    border-radius:24px;
  }

  .hero-image-art{
    inset:10px;
    border-radius:18px;
  }

  .hero-photo-art img{
    object-position:38% center;
  }

  .hero-accent-card{
    display:none;
  }

  .hero-phone-image{
    right:-18px;
    bottom:-8px;
    width:clamp(190px, 54vw, 260px);
  }

  .who-real-image-panel,
  .benefit-real-image{
    padding:12px;
    border-radius:28px;
  }

  .who-real-image-panel > img,
  .benefit-real-image img{
    border-radius:20px;
  }

  .who-real-image-panel > img{
    object-position:42% center;
  }

  .benefit-row{
    padding:16px;
    border-radius:28px;
  }

  .who-image-stage{
    padding-bottom:68px;
  }

  .product-phone-floating{
    left:10px;
    width:min(42vw, 168px);
    transform:translateY(5%) rotate(-1deg);
  }

  .benefits-intro-row{
    text-align:center;
  }

  .benefits-intro-copy h2,
  .benefits-intro-copy .lead{
    margin-left:auto;
    margin-right:auto;
  }

  .product-phone-intro{
    width:min(100%, 166px);
    transform:rotate(1.2deg);
  }

  .video-embed{
    min-height:0;
    aspect-ratio:16 / 9;
  }

  .footer{
    grid-template-columns:1fr;
    justify-items:center;
    text-align:center;
    gap:18px;
    padding-left:20px;
    padding-right:20px;
  }

  .footer-logo-brand,
  .footer-legal,
  .footer-links,
  .stores.official-footer-badges{
    grid-column:1;
    grid-row:auto;
    justify-self:center;
    align-items:center;
  }

  .footer-logo-brand{
    align-items:center;
  }

  .footer-legal{
    width:100%;
    max-width:22rem;
  }

  .footer-links{
    width:100%;
    justify-items:center;
    gap:8px;
  }

  .stores.official-footer-badges{
    width:100%;
    justify-content:center;
  }

  .stores.official-footer-badges .official-store-badges{
    justify-content:center;
  }
}

@media (max-width:420px){
  .hero-visual{
    min-height:395px;
  }

  .hero-stage{
    min-height:395px;
  }

  .hero-image-panel{
    right:24px;
    top:30px;
    bottom:54px;
  }

  .hero-phone-image{
    width:clamp(170px, 55vw, 230px);
  }

  .official-store-badges img{
    height:38px;
  }
}

@media (prefers-reduced-motion: reduce){
  *,
  *::before,
  *::after{
    animation-duration:.001ms !important;
    animation-iteration-count:1 !important;
    scroll-behavior:auto !important;
    transition-duration:.001ms !important;
  }

  .carousel-track{
    transition:none !important;
  }
}
`}</style>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="page" id="main-content">
        <div className="site">
          <header className="topbar" role="banner">
            <div className="brand logo-brand">
              <img className="singfit-logo-img" src="/asset-01.png" alt="SingFit" />
              <span className="brand-product">STUDIO Caregiver</span>
            </div>

            <nav className="nav desktop-nav" aria-label="Primary navigation">
              <a href="#video">See a session</a>
              <a href="#who">Who it’s for</a>
              <a href="#benefits">Benefits</a>
              <a href="#stories">Stories</a>
              <a href="#questions">Questions</a>
              <a className="nav-cta" href="#pricing" onClick={() => trackCta("Get started", "#pricing", "desktop_nav")}>Get started</a>
            </nav>

            <button
              className="menu-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-drawer"
              onClick={() => setMenuOpen(true)}
            >
              <span></span><span></span><span></span>
            </button>

            <div
              className="menu-overlay"
              aria-hidden={!menuOpen}
              onClick={() => setMenuOpen(false)}
            ></div>

            <aside id="mobile-menu-drawer" className="mobile-drawer" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
              <div className="drawer-top">
                <div className="brand logo-brand">
                  <img className="singfit-logo-img" src="/asset-01.png" alt="SingFit" />
                  <span className="brand-product">STUDIO Caregiver</span>
                </div>
                <button className="drawer-close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
              </div>

              <nav className="drawer-nav">
                {[
                  ["See a session", "#video"],
                  ["Who it’s for", "#who"],
                  ["Benefits", "#benefits"],
                  ["Stories", "#stories"],
                  ["Questions", "#questions"],
                  ["Get started", "#pricing"],
                ].map(([label, href]) => (
                  <a key={label} href={href} onClick={() => { setMenuOpen(false); trackCta(label, href, "mobile_drawer"); }}>{label}</a>
                ))}
              </nav>

              <div className="drawer-note">
                <strong>$11.99/month</strong>
                <span>Subscribe online, then download the app.</span>
              </div>
            </aside>
          </header>

          <section className="hero">
            <div>
              <h1>A guided music experience for dementia and memory care.</h1>
              <p className="hero-copy">SingFit STUDIO Caregiver helps family caregivers create warm, reassuring moments with someone living with dementia, memory loss, or cognitive decline through personalized music, guided singing, and built-in lyrics.</p>
              <div className="actions">
                <CtaButton location="hero_primary">Start with STUDIO Caregiver</CtaButton>
                <CtaButton href="#video" variant="secondary" location="hero_secondary">See a session</CtaButton>
              </div>
              <p className="microcopy">$11.99/month. Subscribe online, then download the app to get started.</p>
            </div>

            <div className="hero-visual">
              <div className="hero-stage">
                <div className="hero-image-panel">
                  <div className="hero-image-art hero-photo-art">
                    <img src="/asset-02.webp"
                         alt="Caregiver and older loved one sharing a joyful music moment at home"
                         width="1600"
                         height="1200"
                         fetchPriority="high"
                         decoding="async"
                     />
                  </div>
                </div>
                <div className="hero-accent-card" aria-hidden="true">
                  <div className="accent-line short"></div>
                  <div className="accent-line"></div>
                  <div className="accent-line mid"></div>
                </div>
                <div className="iphone hero-phone-image">
                  <img src="/asset-03.webp" alt="SingFit STUDIO Caregiver app screens shown on two mobile phones" />
                </div>
              </div>
            </div>
          </section>

          <section className="section who-redesign" id="who">
            <div className="who-situation-layout">
              <div className="who-intro">
                <h2>Some days, it is hard to know what to do together.</h2>
                <p className="lead">STUDIO Caregiver is designed for family caregivers supporting an older loved one when conversation, shared activities, or engagement feel harder than they used to.</p>
              </div>
              <div className="who-image-panel">
                <div className="who-image-stage">
                  <div className="who-real-image-panel">
                    <img src="/asset-04.webp" 
                         alt="A caregiver and an older man using a tablet together on a couch at home" 
                         loading="lazy"
decoding="async"/>
                  </div>
                  <div className="product-phone product-phone-floating">
                    <div className="product-phone-screen">
                      <video className="product-video" loop muted playsInline preload="none" disablePictureInPicture aria-label="Preview of the SingFit STUDIO Caregiver Lyric Coach experience">
                        <source src="/screen-capture2.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <div className="who-situation-list">
                {[
                  ["01", "Dementia, memory loss, or cognitive decline", "Use familiar music when words, attention, or conversation feel harder to reach."],
                  ["02", "Reduced engagement or withdrawal", "Create an active alternative to passive routines like watching TV or sitting quietly."],
                  ["03", "Care routines that need more structure", "Give visits, afternoons, or home-care moments a gentle activity to follow together."],
                ].map(([number, title, copy]) => (
                  <div className="who-situation" key={number}>
                    <span>{number}</span>
                    <div><h3>{title}</h3><p>{copy}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="video">
            <div className="video-panel">
              <div>
                <h2>See what a session looks like.</h2>
                <p className="lead">Watch a short walkthrough of SingFit STUDIO Caregiver and see how personalized music, guided singing, and built-in lyrics help create meaningful moments together.</p>
              </div>
              <div className="video-box video-embed">
                <iframe
                  ref={iframeRef}
                  id="singfit-session-video"
                  src="https://player.vimeo.com/video/1194167243?api=1&badge=0&autopause=0&player_id=singfit-session-video&app_id=58479"
                  title="Watch how a SingFit STUDIO Caregiver session works"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  onLoad={registerVimeoListeners}
                ></iframe>
              </div>
            </div>
            <div className="section-cta">
              <CtaButton location="video_section">Start Your Subscription</CtaButton>
              <p className="section-cta-note">$11.99/month • Download the app after subscribing</p>
            </div>
          </section>

          <section className="section center" id="benefits">
            <div className="benefits-intro-row">
              <div className="benefits-intro-copy">
                <h2>Designed to support mood, memory, and meaningful connection.</h2>
                <p className="lead">Music has a unique way of reaching parts of us that remain deeply familiar. A favorite song can brighten a difficult day, spark recognition, or create a moment to share together.</p>
              </div>
              <div className="benefits-intro-media">
                <div className="product-phone product-phone-intro">
                  <div className="product-phone-screen">
                    <video className="product-video" loop muted playsInline preload="none" disablePictureInPicture aria-label="Preview of a guided SingFit STUDIO Caregiver session">
                      <source src="/screen-capture1.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
            <div className="benefit-editorial">
              {[
                ["/asset-07.webp", "A caregiver sitting beside an older man listening to music with headphones in a calm home setting", "Music can support mood", "Familiar songs can help shift the feeling of a routine, visit, or difficult moment."],
                ["/asset-08.webp", "A caregiver and older loved one laughing together while a SingFit session plays on a tablet", "Music can spark memory", "Songs tied to someone’s life can bring back memories, recognition, and conversation."],
                ["/asset-09.webp", "A caregiver and older loved one actively using the SingFit STUDIO app together on a tablet", "SingFit makes it easier to begin", "Guided lyrics, personalized sessions, and activity prompts give caregivers a clear next step."],
              ].map(([src, alt, title, copy]) => (
                <article className="benefit-row" key={title}>
                  <div className="benefit-image benefit-real-image"><img
  src={src}
  alt={alt}
  loading="lazy"
  decoding="async"
/></div>
                  <div className="benefit-copy"><h3>{title}</h3><p>{copy}</p></div>
                </article>
              ))}
            </div>
            <div className="section-cta">
              <CtaButton location="benefits_section">Get STUDIO Caregiver</CtaButton>
              <p className="section-cta-note">Personalized music and guided activities for caregivers</p>
            </div>
          </section>

          <section className="section testimonial-flow" id="stories">
            <div className="testimonial-intro">
              <div><h2>Real stories that show how SingFit is being used.</h2></div>
              <p>Caregivers are using SingFit to bring more music, laughter, and connection into everyday time with someone they love.</p>
            </div>
            <div
              className="testimonial-carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label="Caregiver testimonials"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocus={() => setIsCarouselPaused(true)}
              onBlur={() => setIsCarouselPaused(false)}
            >
              <button className="carousel-arrow carousel-prev" type="button" aria-label="Previous testimonial" onClick={previousSlide}><span>‹</span></button>
              <div className="carousel-viewport" aria-live="polite">
                <div className="carousel-track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                  {testimonials.map((item, index) => (
                    <article className="carousel-slide" aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}`} key={item.attribution}>
                      <div className="slide-inner">
                        <blockquote>“{item.quote}”</blockquote>
                        <p>{item.attribution}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <button className="carousel-arrow carousel-next" type="button" aria-label="Next testimonial" onClick={nextSlide}><span>›</span></button>
              <div className="carousel-dots" aria-label="Testimonial slides">
                {testimonials.map((item, index) => (
                  <button
                    key={item.attribution}
                    type="button"
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={slideIndex === index ? "true" : "false"}
                    className={slideIndex === index ? "is-active" : ""}
                    onClick={() => setSlideIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="section-cta">
              <CtaButton location="stories_section">Start Using STUDIO Caregiver</CtaButton>
              <p className="section-cta-note">Subscribe today and download the app</p>
            </div>
          </section>

          <section className="section center" id="questions">
            <h2>Questions before you begin.</h2>
            <div className="faq">
              {[
                ["Do I need to be musical?", "No. STUDIO Caregiver is designed for everyday caregivers. The built-in lyric prompter and guided session structure help you sing along without needing to read, remember lyrics, or perform."],
                ["Who is this designed for?", "Family caregivers supporting an older loved one, including people experiencing dementia, cognitive decline, or related health challenges."],
                ["What happens after I subscribe?", "After subscribing online, download the app, log in, and begin your first guided music session."],
                ["Is support available?", "Yes. Customer support is included to help caregivers get set up and feel confident using the app."],
              ].map(([question, answer]) => (
                <div className="faq-row" key={question}>
                  <h3>{question}</h3><p>{answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section final-cta" id="pricing">
            <div className="final-copy">
              <h2>Begin a guided music session with someone you care for.</h2>
              <p className="lead">Subscribe online, download the app, and use STUDIO Caregiver to create a guided shared moment through personalized music and singing.</p>
              <div className="proof-line">
                <span>Award-winning therapeutic music technology</span>
                <span>Designed by music therapists</span>
                <span>Available for iOS and Android</span>
              </div>
            </div>
            <div className="price-card">
              <div className="price-top">
                <small>STUDIO Caregiver</small>
                <div className="price-inline"><strong>$11.99</strong><span>/month</span></div>
                <p className="price-sub">Subscribe online, then download the app and log in to get started.</p>
              </div>
              <div className="price-list">
                <div>Guided music sessions</div>
                <div>Personalized music activities</div>
                <div>Built-in lyric prompter</div>
                <div>App access and support</div>
              </div>
              <CtaButton location="pricing_card">Subscribe and begin your first session</CtaButton>
              <div className="store-signal">
                <div className="store-signal-label">Available on</div>
                <div className="official-store-badges">
                  <a href="https://apps.apple.com/us/app/singfit/id442827581" aria-label="Download SingFit on the App Store" target="_blank" rel="noopener noreferrer">
                    <img src="/asset-10.svg" alt="Download on the App Store" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.singfit&hl=en_US" aria-label="Get SingFit on Google Play" target="_blank" rel="noopener noreferrer">
                    <img src="/asset-11.png" alt="Get it on Google Play" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="brand logo-brand footer-logo-brand">
              <img className="singfit-logo-img" src="/asset-01.png" alt="SingFit" />
              <span className="brand-product">STUDIO Caregiver</span>
            </div>
            <p className="footer-legal">©2026 Musical Health Technologies. All Rights Reserved.<br />1010 Wilshire Blvd. Los Angeles, CA 90017</p>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="https://musicismedicine.singfit.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="https://musicismedicine.singfit.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
              <a href="https://musicismedicine.singfit.com/accessibility" target="_blank" rel="noopener noreferrer">Accessibility Statement</a>
            </nav>
            <div className="stores official-footer-badges">
              <div className="official-store-badges">
                <a href="https://apps.apple.com/us/app/singfit/id442827581" aria-label="Download SingFit on the App Store" target="_blank" rel="noopener noreferrer">
                  <img src="/asset-10.svg" alt="Download on the App Store" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.singfit&hl=en_US" aria-label="Get SingFit on Google Play" target="_blank" rel="noopener noreferrer">
                  <img src="/asset-11.png" alt="Get it on Google Play" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
