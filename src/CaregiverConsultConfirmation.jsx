import React, { useEffect } from "react";

const PAGE_ID = "caregiverconsult_confirmation";

function pushDataLayer(eventName, params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    page_id: PAGE_ID,
    ...params,
  });
}

export default function CaregiverConsultConfirmation() {
  useEffect(() => {
    pushDataLayer("landing_page_view", {
      page_path: window.location.pathname,
    });
  }, []);

  return (
    <main className="consult-confirmation-root">
      <style>{`
        :root {
          --ink: #162331;
          --ink-soft: #344a5b;
          --muted: #6f8090;
          --paper: #ffffff;
          --orange: #f37a4a;
          --teal: #249f9a;
          --teal-deep: #1f7275;
          --line: rgba(23, 33, 43, 0.10);
          --site-padding: clamp(22px, 4.7vw, 58px);
        }

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
        }

        .consult-confirmation-root {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: var(--ink);
          font-family: "Source Sans 3", "Segoe UI", system-ui, sans-serif;
          background:
            radial-gradient(
              circle at 84% 0%,
              rgba(36, 159, 154, 0.10),
              transparent 34%
            ),
            radial-gradient(
              circle at 0% 16%,
              rgba(243, 122, 74, 0.08),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #fbffff 0%,
              #f6fbfb 52%,
              #ffffff 100%
            );
        }

        .confirmation-header {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px var(--site-padding);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: inherit;
          text-decoration: none;
        }

        .singfit-logo-img {
          display: block;
          width: auto;
          height: 34px;
          max-width: 170px;
          object-fit: contain;
        }

        .brand-product {
          display: block;
          margin-left: 2px;
          color: var(--muted);
          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          white-space: nowrap;
        }

        .confirmation-content {
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding:
            clamp(34px, 5vw, 68px)
            var(--site-padding)
            clamp(70px, 8vw, 110px);
        }

        .confirmation-card {
          position: relative;
          width: 100%;
          max-width: 820px;
          overflow: hidden;
          padding: clamp(34px, 6vw, 64px);
          border: 1px solid rgba(23, 33, 43, 0.08);
          border-radius: 44px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 30px 90px rgba(23, 33, 43, 0.11);
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .confirmation-card-content {
          position: relative;
          z-index: 1;
        }

        .confirmation-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 24px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #fff1e9;
          color: var(--orange);
          font-size: 34px;
          font-weight: 700;
          box-shadow: 0 14px 30px rgba(243, 122, 74, 0.14);
        }

        .confirmation-eyebrow {
          margin: 0 0 14px;
          color: var(--teal-deep);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .confirmation-card h1 {
          max-width: 680px;
          margin: 0 auto;
          color: var(--ink);
          font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 500;
          line-height: 1.02;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        .confirmation-intro {
          max-width: 610px;
          margin: 22px auto 0;
          color: var(--ink-soft);
          font-size: clamp(18px, 2vw, 21px);
          line-height: 1.65;
        }

        .next-steps {
          width: 100%;
          max-width: 590px;
          margin: 34px auto 0;
          padding: 26px 28px;
          border: 1px solid rgba(36, 159, 154, 0.14);
          border-radius: 28px;
          background:
            radial-gradient(
              circle at 92% 10%,
              rgba(255, 255, 255, 0.56),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #e6f6f4 0%,
              #f5fbfb 62%,
              #ffffff 100%
            );
          text-align: left;
        }

        .next-steps h2 {
          margin: 0 0 18px;
          color: var(--ink);
          font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
          font-size: clamp(26px, 3.5vw, 34px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.035em;
        }

        .next-step {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding: 13px 0;
          border-bottom: 1px solid var(--line);
        }

        .next-step:last-child {
          border-bottom: 0;
        }

        .step-check {
          width: 21px;
          height: 21px;
          flex: 0 0 21px;
          display: grid;
          place-items: center;
          margin-top: 2px;
          border-radius: 50%;
          background: #fff1e9;
          color: var(--orange);
          font-size: 13px;
          font-weight: 700;
        }

        .next-step span:last-child {
          color: var(--ink-soft);
          font-size: 16px;
          line-height: 1.55;
        }

        .confirmation-note {
          max-width: 560px;
          margin: 26px auto 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
        }

        .confirmation-footer {
          width: 100%;
          display: grid;
          grid-template-columns: max-content minmax(260px, 340px) max-content;
          justify-content: space-between;
          align-items: center;
          gap: 24px 36px;
          padding:
            30px
            max(
              var(--site-padding),
              calc((100vw - 1280px) / 2 + var(--site-padding))
            );
          border-top: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.72);
        }

        .footer-logo-brand {
          flex-direction: column;
          align-items: flex-start;
          gap: 7px;
        }

        .footer-logo-brand .singfit-logo-img {
          height: 30px;
          max-width: 150px;
        }

        .footer-logo-brand .brand-product {
          margin-left: 0;
        }

        .footer-legal {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
        }

        .footer-links {
          display: grid;
          justify-items: start;
          gap: 9px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.5;
        }

        .footer-links a {
          color: inherit;
          text-decoration: none;
        }

        .footer-links a:hover {
          color: var(--ink);
        }

        a:focus-visible {
          outline: 3px solid rgba(31, 114, 117, 0.6);
          outline-offset: 4px;
        }

        @media (max-width: 800px) {
          .confirmation-footer {
            grid-template-columns: 1fr 1fr;
            align-items: start;
          }

          .footer-legal {
            grid-column: 1;
            grid-row: 2;
          }

          .footer-links {
            grid-column: 2;
            grid-row: 1 / span 2;
          }
        }

        @media (max-width: 560px) {
          .confirmation-header {
            padding-top: 22px;
            padding-bottom: 18px;
          }

          .singfit-logo-img {
            height: 30px;
            max-width: 150px;
          }

          .confirmation-content {
            align-items: flex-start;
            padding-top: 24px;
            padding-bottom: 64px;
          }

          .confirmation-card {
            padding: 34px 22px;
            border-radius: 32px;
          }

          .confirmation-icon {
            width: 64px;
            height: 64px;
            font-size: 30px;
          }

          .next-steps {
            padding: 22px 20px;
            border-radius: 24px;
          }

          .confirmation-footer {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 18px;
            padding-left: 20px;
            padding-right: 20px;
            text-align: center;
          }

          .footer-logo-brand,
          .footer-legal,
          .footer-links {
            grid-column: 1;
            grid-row: auto;
            justify-self: center;
          }

          .footer-logo-brand {
            align-items: center;
          }

          .footer-legal {
            max-width: 23rem;
          }

          .footer-links {
            justify-items: center;
            gap: 8px;
          }
        }
      `}</style>

      <header className="confirmation-header">
        <div className="brand">
          <img
            className="singfit-logo-img"
            src="/asset-01.png"
            alt="SingFit"
          />
          <span className="brand-product">STUDIO Caregiver</span>
        </div>
      </header>

      <section className="confirmation-content">
        <div className="confirmation-card">
          <div className="confirmation-card-content">
            <div className="confirmation-icon" aria-hidden="true">
              ✓
            </div>

            <p className="confirmation-eyebrow">
              Your walkthrough is scheduled
            </p>

            <h1>Thank you for scheduling with SingFit.</h1>

            <p className="confirmation-intro">
              Your complimentary 20-minute STUDIO Caregiver walkthrough has
              been booked. You will receive an email with the meeting details
              and calendar invitation.
            </p>

            <div className="next-steps">
              <h2>What to expect</h2>

              <div className="next-step">
                <span className="step-check" aria-hidden="true">
                  ✓
                </span>
                <span>
                  We will show you how guided singing sessions work.
                </span>
              </div>

              <div className="next-step">
                <span className="step-check" aria-hidden="true">
                  ✓
                </span>
                <span>
                  You will see the lyric coaching, guide vocals, and built-in
                  prompts.
                </span>
              </div>

              <div className="next-step">
                <span className="step-check" aria-hidden="true">
                  ✓
                </span>
                <span>
                  You will have time to ask questions about the app and how to
                  get started.
                </span>
              </div>
            </div>

            <p className="confirmation-note">
              Please check your spam or promotions folder if the confirmation
              email does not arrive within a few minutes.
            </p>
          </div>
        </div>
      </section>

      <footer className="confirmation-footer">
        <div className="brand footer-logo-brand">
          <img
            className="singfit-logo-img"
            src="/asset-01.png"
            alt="SingFit"
          />
          <span className="brand-product">STUDIO Caregiver</span>
        </div>

        <p className="footer-legal">
          ©2026 Musical Health Technologies. All Rights Reserved.
          <br />
          1010 Wilshire Blvd. Los Angeles, CA 90017
        </p>

        <nav className="footer-links" aria-label="Footer navigation">
          <a
            href="https://musicismedicine.singfit.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>

          <a
            href="https://musicismedicine.singfit.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>

          <a
            href="https://musicismedicine.singfit.com/accessibility"
            target="_blank"
            rel="noopener noreferrer"
          >
            Accessibility Statement
          </a>
        </nav>
      </footer>
    </main>
  );
}