import React, { useState } from "react";

export default function PrimeLandingPage2() {
  const PAGE_ID = "primelandingpage2";
  const FORM_ID = "prime_referral_form";
  const FORM_TYPE = "referral";
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/6jcyahnyj6xzes7yc2inqqykk9rlvpgl";

  const [formStatus, setFormStatus] = useState("idle");
  const [formStartTime] = useState(Date.now());

  const pushToDataLayer = (payload) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ page_id: PAGE_ID, ...payload });
  };

  const trackCTA = (buttonText, destinationUrl = "#prime-referral-form") => {
    pushToDataLayer({
      event: "click_cta",
      button_text: buttonText,
      destination_url: destinationUrl,
    });
  };

  const scrollToReferralForm = (buttonText = "Submit Referral") => {
    trackCTA(buttonText, "#prime-referral-form");

    const formSection = document.getElementById("prime-referral-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getTrackingData = () => {
    if (typeof window === "undefined") {
      return {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: "",
        gclid: "",
        fbclid: "",
        landing_page: "",
        referrer: "",
      };
    }

    const params = new URLSearchParams(window.location.search);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
    ];

    const tracking = {};

    keys.forEach((key) => {
      const value = params.get(key);

      if (value) {
        window.sessionStorage.setItem(key, value);
        tracking[key] = value;
      } else {
        tracking[key] = window.sessionStorage.getItem(key) || "";
      }
    });

    tracking.landing_page = window.location.href;
    tracking.referrer = document.referrer || "";

    return tracking;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("website")) {
      setFormStatus("success");
      form.reset();
      return;
    }

    const elapsedSeconds = (Date.now() - formStartTime) / 1000;

    if (elapsedSeconds < 3) {
      setFormStatus("success");
      form.reset();
      return;
    }

    const payload = {
      page_id: PAGE_ID,
      form_id: FORM_ID,
      formtype: FORM_TYPE,
      submission_type: "prime_customer_referral",
      email_recipient: "sales@singfit.com",
      ...Object.fromEntries(formData.entries()),
      ...getTrackingData(),
    };

    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      pushToDataLayer({
        event: "submit_form",
        form_id: FORM_ID,
        formtype: FORM_TYPE,
      });

      setFormStatus("success");
      form.reset();
    } catch (error) {
      setFormStatus("error");
    }
  };

  const steps = [
    {
      title: "Submit Your Referral",
      text:
        "Know a senior living community, memory care program, adult day center, rehabilitation facility, or healthcare organization that could benefit from SingFit? Complete the form below with their information and your own so we can properly credit you.",
    },
    {
      title: "We'll Reach Out",
      text:
        "Our team will connect with your referral, introduce SingFit, and answer any questions they may have. We will mention your name as the referrer.",
    },
    {
      title: "Receive Your Rewards",
      text:
        "If they sign an annual agreement with SingFit within 60 days of your submission, we'll send a $50 Amazon Gift Card to your email address and a $50 Amazon Gift Card to your Executive Director's email address.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F9FC] text-[#062B49] antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <img
            src="/SingFit New Brand Logo.png"
            alt="SingFit"
            className="h-auto w-[150px] md:w-[200px]"
          />

          <button
            type="button"
            onClick={() => scrollToReferralForm("Submit Referral")}
            className="rounded-full bg-[#F47534] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(244,117,52,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(244,117,52,0.34)] md:px-6"
          >
            Submit Referral
          </button>
        </div>
      </header>

      <section className="relative px-5 pb-10 pt-10 md:px-10 md:pb-14 md:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(0,145,200,0.10),transparent_32%),radial-gradient(circle_at_12%_82%,rgba(244,117,52,0.08),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              SingFit Referral Program
            </p>

            <h1 className="max-w-4xl text-[2.75rem] font-black leading-[1.02] tracking-[-0.055em] md:text-[4rem] lg:text-[4.6rem]">
              Share SingFit. Earn Rewards. Make an Impact.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
              You've seen the difference music can make. Help another community
              experience it too, and receive $100 in Amazon gift cards when your
              referral joins SingFit.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => scrollToReferralForm("Submit Referral")}
                className="rounded-full bg-[#F47534] px-8 py-4 text-center text-base font-bold text-white shadow-[0_16px_40px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(244,117,52,0.36)]"
              >
                Submit Referral
              </button>

              <p className="text-sm font-bold text-slate-600">
                Limited-time referral reward for existing SingFit customers.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-8 h-[320px] w-[320px] rounded-full bg-[#0091C8]/12 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#F47534]/12 blur-3xl" />

            <div className="relative rounded-[2.75rem] border border-slate-200 bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.14)] md:p-9">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
                Referral Reward
              </p>

              <div className="mt-6 rounded-[2.25rem] bg-[#061D33] p-7 text-white">
                <p className="text-6xl font-black tracking-[-0.06em] md:text-7xl">
                  $100
                </p>
                <p className="mt-3 text-lg font-bold leading-relaxed text-slate-200">
                  In Amazon gift cards when your referral signs an annual
                  agreement within 60 days.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#FFF3EC] p-5">
                  <p className="text-3xl font-black tracking-[-0.04em] text-[#062B49]">
                    $50
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-slate-700">
                    Gift card to your email address
                  </p>
                </div>

                <div className="rounded-2xl bg-[#EAF6FB] p-5">
                  <p className="text-3xl font-black tracking-[-0.04em] text-[#062B49]">
                    $50
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-slate-700">
                    Gift card to your Executive Director's email address
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm font-semibold leading-relaxed text-slate-600">
                Use it for a team celebration, pizza party, resident activities,
                supplies, or anything else your community needs. And don't worry,
                we'll let them know how awesome you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-white p-7 shadow-[0_28px_80px_rgba(15,23,42,0.08)] md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              How the Referral Program Works
            </p>
            <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-5xl">
              A simple way to share SingFit with another organization.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              As a thank you for spreading the word, we're offering a special
              referral reward for a limited time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[2.5rem] border border-slate-200 bg-[#F7F9FC] p-7 shadow-[0_18px_48px_rgba(15,23,42,0.05)]"
              >
                <p className="text-sm font-black tracking-[0.18em] text-[#F47534]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-2xl font-black tracking-[-0.04em]">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="prime-referral-form"
        className="scroll-mt-28 px-5 py-10 md:px-10 md:py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[3.25rem] bg-[#061D33] p-7 text-white shadow-[0_44px_120px_rgba(6,29,51,0.32)] md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#F47534]">
              Ready to Refer Someone?
            </p>

            <h2 className="text-5xl font-black leading-[1.02] tracking-[-0.055em] md:text-5xl">
              Complete the form and help another community discover SingFit.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
              Share your referral's contact information and your own details so
              our team can follow up and properly credit you.
            </p>

            <div className="mt-10 space-y-3">
              {[
                "We will mention your name as the referrer.",
                "Reward eligibility is based on an annual agreement within 60 days.",
                "Questions? Contact hello@singfit.com.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 px-5 py-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F47534] text-sm font-black text-white">
                    ✓
                  </div>
                  <span className="font-semibold leading-relaxed text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2.75rem] border border-white/10 bg-white p-6 text-[#062B49] shadow-[0_30px_90px_rgba(0,0,0,0.18)] md:p-8"
          >
            <input type="hidden" name="page_id" value={PAGE_ID} />
            <input type="hidden" name="form_id" value={FORM_ID} />
            <input type="hidden" name="formtype" value={FORM_TYPE} />
            <input
              type="hidden"
              name="submission_type"
              value="prime_customer_referral"
            />
            <input type="hidden" name="email_recipient" value="sales@singfit.com" />

            <div className="mb-7 rounded-[2rem] bg-[#F7F9FC] p-5">
              <h3 className="text-2xl font-black tracking-[-0.04em]">
                Their Contact Info
              </h3>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Name *
                  </span>
                  <input
                    name="referral_name"
                    required
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Community Name *
                  </span>
                  <input
                    name="referral_community"
                    required
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Email *
                  </span>
                  <input
                    name="referral_email"
                    required
                    type="email"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Phone
                  </span>
                  <input
                    name="referral_phone"
                    type="tel"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#FFF3EC] p-5">
              <h3 className="text-2xl font-black tracking-[-0.04em]">
                Your Contact Info
              </h3>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Name *
                  </span>
                  <input
                    name="referrer_name"
                    required
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Community Name *
                  </span>
                  <input
                    name="referrer_community"
                    required
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Email *
                  </span>
                  <input
                    name="referrer_email"
                    required
                    type="email"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-slate-700">
                    Phone Number *
                  </span>
                  <input
                    name="referrer_phone"
                    required
                    type="tel"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none transition focus:border-[#F47534] focus:ring-4 focus:ring-[#F47534]/15"
                  />
                </label>
              </div>
            </div>

            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
            />

            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="mt-6 w-full rounded-full bg-[#F47534] px-8 py-5 text-lg font-bold text-white shadow-[0_18px_46px_rgba(244,117,52,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(244,117,52,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {formStatus === "sending" ? "Sending..." : "Submit Referral"}
            </button>

            {formStatus === "success" && (
              <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-800">
                Thank you. Your referral has been submitted.
              </p>
            )}

            {formStatus === "error" && (
              <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
                Something went wrong. Please email sales@singfit.com directly.
              </p>
            )}

            <p className="mt-5 text-center text-xs font-semibold leading-relaxed text-slate-500">
              Required fields are marked with an asterisk. Referral reward subject
              to eligibility and annual agreement completion within 60 days.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
