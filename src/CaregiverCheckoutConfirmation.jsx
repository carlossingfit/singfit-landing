import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CaregiverCheckoutConfirmation.css";

// Verification is read-only. Account provisioning remains a separate integration.
export default function CaregiverCheckoutConfirmation() {
  const { search } = useLocation();
  const ids = new URLSearchParams(search).getAll("session_id");
  const sessionId = ids.length === 1 ? ids[0] : "";
  const [verification, setVerification] = useState({ sessionId: null, status: "loading" });
  useEffect(() => {
    if (!/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(sessionId)) {
      setVerification({ sessionId, status: "error" });
      return undefined;
    }
    const controller = new AbortController();
    let disposed = false;
    const timer = setTimeout(() => controller.abort(), 20000);
    setVerification({ sessionId, status: "loading" });
    fetch(`/api/stripe/verify-checkout?session_id=${encodeURIComponent(sessionId)}`, {
      signal: controller.signal, cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer",
    }).then(async response => {
      const result = await response.json();
      if (!disposed && !controller.signal.aborted) setVerification({ sessionId, status: response.ok && result.verified === true ? "verified" : "error" });
    }).catch(() => { if (!disposed) setVerification({ sessionId, status: "error" }); }).finally(() => clearTimeout(timer));
    return () => { disposed = true; clearTimeout(timer); controller.abort(); };
  }, [sessionId]);
  const status = verification.sessionId === sessionId ? verification.status : "loading";
  return (
    <div className="sf-checkout-confirmation">
      <a className="scc-skip" href="#scc-content">Skip to content</a>
      <header className="scc-header scc-container">
        <Link className="scc-brand" to="/caregiver-free-trial" aria-label="SingFit Caregiver home">
          <img src="/asset-01.png" alt="SingFit" /><span>Caregiver</span>
        </Link>
        <Link className="scc-back" to="/caregiver-free-trial">Back to Caregiver</Link>
      </header>
      <main id="scc-content" className="scc-container">
        {status !== "verified" ? <section className="scc-intro" aria-live="polite" aria-busy={status === "loading"}>
          <h1>{status === "loading" ? "Checking your checkout…" : "We’re unable to verify your checkout."}</h1>
          <p className="scc-lead">{status === "loading" ? "Please wait while we securely check your subscription with Stripe." : "This page does not confirm an active subscription. Please return using the link from your completed checkout, or try again later. You do not need to start another checkout."}</p>
        </section> : <>
        <p className="scc-preview" role="note">Checkout verified. App account setup is separate and is not confirmed by this page.</p>
        <section className="scc-intro" aria-labelledby="scc-title">
          <p className="scc-eyebrow">Welcome to SingFit Caregiver</p>
          <h1 id="scc-title">Your 30-day free trial has started!</h1>
          <p className="scc-lead">SingFit is preparing your app account so you can start sharing moments of music and connection.</p>
          <p>Your email with your app username and password should arrive within approximately 10 minutes. If you don't see it, please check your spam or junk folder.</p>
        </section>
        <section className="scc-offer" aria-labelledby="scc-offer-title">
          <h2 id="scc-offer-title">Your trial at a glance</h2>
          <p><strong>$0 due today</strong> · 30-day free trial</p>
          <p>Then $11.99/month, automatically renewing until canceled. Cancel anytime.</p>
        </section>
        <section className="scc-start" aria-labelledby="scc-start-title">
          <div>
            <p className="scc-eyebrow">A little music. A meaningful moment.</p>
            <h2 id="scc-start-title">Get ready to sing together.</h2>
            <ol className="scc-steps">
              <li><h3>Check your email</h3><p>Look for your SingFit app username and password. Your account is being prepared; please wait for your credentials before signing in.</p></li>
              <li><h3>Download the SingFit app</h3><p>Choose the store for your phone or tablet.</p>
                <div className="scc-stores">
                  <a href="https://apps.apple.com/us/app/singfit/id442827581" target="_blank" rel="noopener noreferrer">Download for iOS <span>(App Store, new tab)</span></a>
                  <a href="https://play.google.com/store/apps/details?id=com.singfit" target="_blank" rel="noopener noreferrer">Download for Android <span>(Google Play, new tab)</span></a>
                </div>
              </li>
              <li><h3>Sign in and start using SingFit</h3><p>Once your credentials arrive, open the app, sign in, and enjoy your first guided sing-along.</p></li>
            </ol>
          </div>
          <div className="scc-video">
            <h3>Watch: getting started with SingFit</h3>
            <iframe src="https://player.vimeo.com/video/1175592420?h=b5ad0b8108" title="Getting started with SingFit" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            <a href="https://vimeo.com/1175592420/b5ad0b8108?fl=pl&fe=sh" target="_blank" rel="noopener noreferrer">Watch the getting-started video on Vimeo (new tab)</a>
          </div>
        </section>
        </>}
      </main>
      <footer className="scc-footer scc-container">
        <p>SingFit Caregiver</p>
        <nav aria-label="Legal"><a href="https://musicismedicine.singfit.com/privacy">Privacy Policy</a><a href="https://musicismedicine.singfit.com/terms">Terms of Service</a><a href="https://musicismedicine.singfit.com/accessibility">Accessibility Statement</a></nav>
      </footer>
    </div>
  );
}
