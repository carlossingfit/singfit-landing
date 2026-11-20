import React, { cloneElement } from "react";
import "./ApprovedCaregiverHero.css";

// The approved hybrid hero is shared by the local preview and the landing page.
// Keep the caller's links, attribution, and event handlers when styling the CTAs.
export default function ApprovedCaregiverHero({ id = "sf-hero", demoAction, trialAction }) {
  const demo = cloneElement(demoAction, {
    className: `${demoAction.props.className || ""} hp-button hp-primary`,
  }, <>
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 3 11 7-11 7Z" fill="currentColor" /></svg>
    {demoAction.props.children}
  </>);
  const trial = cloneElement(trialAction, {
    className: `${trialAction.props.className || ""} hp-button hp-secondary`,
  });

  return (
    <div className="sf-approved-hero hp-hybrid is-approved">
      <section className="hp-hero" id={id} aria-labelledby={`${id}-title`}>
        <div className="hp-copy">
          <p className="hp-eyebrow">Music for caregivers</p>
          <h1 id={`${id}-title`}><span>Turn familiar</span>{" "}<span>songs into moments</span>{" "}<span>of connection.</span></h1>
          <p className="hp-lead">SingFit Caregiver is a guided sing-along app that uses familiar music and spoken lyric prompts to help you share moments of joy and connection.</p>
          <div className="hp-actions">{demo}{trial}</div>
          <p className="hp-note">Try a sample in your browser. No account or credit card needed for the demo.</p>
        </div>
        <div className="hp-visual">
          <img className="hp-photo" src="/Fixed Laina Testimonial Image.png"
            alt="Laina and her mother smiling together at their kitchen table" fetchPriority="high" />
          <img className="hp-phones" src="/asset-03.webp" alt="Genuine SingFit product screens" />
        </div>
      </section>
    </div>
  );
}
