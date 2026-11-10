import ApprovedCaregiverHero from "./ApprovedCaregiverHero";
import React, { useEffect, useMemo, useState } from "react";
import "./CaregiverHeroPreview.css";

// Isolated design explorations. Keep the existing landing-page event contract.
const PAGE_ID = "caregiverfreetrial";
const CHECKOUT_URL = "https://www.singfit.com/buy";
const INTERACTIVE_DEMO_URL = "https://singfit-free-git-feature-marketi-c46da5-carlossingfits-projects.vercel.app/";
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

const navigation = [
  ["How it works", "/caregiver-redesign#how-it-works"],
  ["Caregiver stories", "/caregiver-redesign#stories"],
  ["Free trial", "/caregiver-redesign#pricing"],
];

export default function CaregiverHeroPreview({ variant = "a" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const checkoutUrl = useMemo(() => buildAttributedUrl(CHECKOUT_URL), []);
  const demoUrl = useMemo(() => buildAttributedUrl(INTERACTIVE_DEMO_URL), []);

  useEffect(() => {
    pushDataLayer("landing_page_view", { page_path: window.location.pathname });
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const escape = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);

  const trialLink = (location, secondary = false) => (
    <a className={`hp-button ${secondary ? "hp-secondary" : "hp-primary"}`}
      href={checkoutUrl} onClick={() => trackCta("Start 30-Day Free Trial", checkoutUrl, location)}>
      Start 30-Day Free Trial
    </a>
  );

  return (
    <main className={`sf-hero-preview hp-${variant}`}>
      <a className="hp-skip" href="#hp-content">Skip to content</a>
      <header className="hp-header">
        <a className="hp-brand" href="/caregiver-redesign" aria-label="SingFit Caregiver home">
          <img src="/asset-01.png" alt="SingFit" /><span>Caregiver</span>
        </a>
        <nav className="hp-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          {trialLink("desktop_nav")}
        </nav>
        <button className="hp-menu" aria-expanded={menuOpen} aria-controls="hp-mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
      </header>
      {menuOpen && <nav className="hp-mobile-nav" id="hp-mobile-nav" aria-label="Mobile navigation">
        {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        <a href={checkoutUrl} onClick={() => {
          trackCta("Start 30-Day Free Trial", checkoutUrl, "mobile_drawer");
          setMenuOpen(false);
        }}>Start 30-Day Free Trial</a>
      </nav>}
      {variant === "hybrid" ? <ApprovedCaregiverHero
        id="hp-content"
        demoAction={<a href={demoUrl} onClick={() => pushDataLayer("click_interactive_demo", {
          button_text: "Try the Interactive Demo", destination_url: demoUrl, cta_location: "hero_primary",
        })}>Try the Interactive Demo</a>}
        trialAction={trialLink("hero_secondary", true)}
      /> : (
      <section className="hp-hero" id="hp-content" aria-labelledby="hp-heading">
        <div className="hp-copy">
          <p className="hp-eyebrow">Music for caregivers</p>
          <h1 id="hp-heading"><span>Turn familiar</span>{" "}<span>songs into moments</span>{" "}<span>of connection.</span></h1>
          <p className="hp-lead">{variant === "hybrid"
            ? "SingFit Caregiver is a guided sing-along app that uses familiar music and spoken lyric prompts to help you share moments of joy and connection."
            : "A simple, engaging way to sing together, with guided lyrics and familiar music that brings more joy, confidence, and connection to everyday caregiving."}</p>
          <div className="hp-actions">
            <a className="hp-button hp-primary" href={demoUrl}
              onClick={() => pushDataLayer("click_interactive_demo", {
                button_text: "Try the Interactive Demo", destination_url: demoUrl, cta_location: "hero_primary",
              })}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 3 11 7-11 7Z" fill="currentColor" /></svg>
              Try the Interactive Demo
            </a>
            {trialLink("hero_secondary", true)}
          </div>
          <p className="hp-note">Try a sample in your browser. No account or credit card needed for the demo.</p>
        </div>
        <div className="hp-visual">
          <img className="hp-photo" src="/Fixed Laina Testimonial Image.png"
            alt="Laina and her mother smiling together at their kitchen table" fetchPriority="high" />
          <img className="hp-phones" src="/asset-03.webp" alt="Genuine SingFit product screens" />
        </div>
      </section>
      )}
    </main>
  );
}
