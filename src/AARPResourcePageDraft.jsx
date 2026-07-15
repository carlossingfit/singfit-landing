import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Button } from "./components/ui/button";
import { useAnalytics } from "./useAnalytics";

const PAGE_ID = "MemberResources";
const ANALYTICS_PAGE_ID = "FreeContent";

const GUIDES = [
  {
    id: "guide-harmonious-home",
    title: "5 Tips for Using Music to Create a More Harmonious Home Life",
    description:
      "Download our free guide to start using music as a caregiving tool.",
    href: "/5 Tips for Using Music to Create a More Harmonious Home Life_Members.pdf",
    buttonText: "Download 5 Tips PDF",
    accent: "from-[#E6F0F7] to-white",
  },
  {
    id: "guide-connecting-through-music",
    title: "Connecting Through Music",
    description:
      "Download our free guide to start using music as a caregiving tool.",
    href: "/Connecting Through Music_AARP Member.pdf",
    buttonText: "Download Caregiver PDF",
    accent: "from-[#F5EFEA] to-white",
  },
];

const LIVE_WEBINARS = [
  {
    id: "live-august-11",
    title: "Caregivers: Singing for Self-Expression and Confidence",
    image: "/Aug_11.png",
    imageAlt: "August 11, 2026",
    href: "https://www.eventbrite.com/e/singing-for-self-expression-and-confidence-tickets-1992855649895?aff=oddtdtcreator",
  },
  {
    id: "live-july-14",
    title:
      "Caregivers: An Introduction to Using Music to Connect with Your Loved One",
    image: "/July_14.png",
    imageAlt: "July 14, 2026",
    href: "https://www.eventbrite.com/e/caregivers-an-introduction-to-using-music-to-connect-with-your-loved-one-tickets-1990199670790?aff=oddtdtcreator",
  },
];

const RECORDED_WEBINARS = [
  {
    id: "webinar-001",
    title: "Caregivers: Using Music to Connect with Your Loved One",
    duration: "56 min",
    videoEmbedUrl:
      "https://player.vimeo.com/video/1164185752?h=d0796ce4f1",
  },
  {
    id: "webinar-002",
    title: "Caregivers: How to Select the Right Music for Your Goal",
    duration: "50 min",
    videoEmbedUrl:
      "https://player.vimeo.com/video/1173355484?h=85d323d74e",
  },
  {
    id: "webinar-003",
    title:
      "Caregivers: A Deep Dive into the Musical Preferences of Your Loved One",
    duration: "50 min",
    videoEmbedUrl:
      "https://player.vimeo.com/video/1181333165?h=4fe87d8edd",
  },
  {
    id: "webinar-004",
    title: "Caregivers: Using Music to Create a More Harmonious Home Life",
    duration: "50 min",
    videoEmbedUrl:
      "https://player.vimeo.com/video/1201986610?h=4fe87d8edd",
  },
];

const EXPERT_VIDEOS = [
  {
    id: "IvonpE_5mPU",
    title: "Expert Conversation 1",
    embedUrl:
      "https://www.youtube.com/embed/IvonpE_5mPU?autoplay=1&rel=0",
    thumbnail: "https://img.youtube.com/vi/IvonpE_5mPU/hqdefault.jpg",
  },
  {
    id: "rTLm_Z9ydXM",
    title: "Expert Conversation 2",
    embedUrl:
      "https://www.youtube.com/embed/rTLm_Z9ydXM?autoplay=1&rel=0",
    thumbnail: "https://img.youtube.com/vi/rTLm_Z9ydXM/hqdefault.jpg",
  },
  {
    id: "YpA_s5wt_8U",
    title: "Expert Conversation 3",
    embedUrl:
      "https://www.youtube.com/embed/YpA_s5wt_8U?autoplay=1&rel=0",
    thumbnail: "https://img.youtube.com/vi/YpA_s5wt_8U/hqdefault.jpg",
  },
];

function DownloadIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m7 10 5 5 5-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
    </svg>
  );
}

function PlayIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.14v13.72c0 .78.86 1.26 1.53.85l10.25-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}


function ResourceNavIcon({ type }) {
  const commonProps = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    "aria-hidden": "true",
  };

  if (type === "guides") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...commonProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5A2.5 2.5 0 0 1 7 3h4v16H7a2.5 2.5 0 0 0-2.5 2V5.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.5A2.5 2.5 0 0 0 17 3h-4v16h4a2.5 2.5 0 0 1 2.5 2V5.5Z" />
      </svg>
    );
  }

  if (type === "live") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...commonProps}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path strokeLinecap="round" d="M8 3v4M16 3v4M3.5 9.5h17" />
        <circle cx="12" cy="14.5" r="2.2" />
      </svg>
    );
  }

  if (type === "recorded") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...commonProps}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m10 9 5 3-5 3V9Z" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V6l10-2v12" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  );
}

function SectionEyebrow({ children }) {
  return (
    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F47534]">
      {children}
    </p>
  );
}

export default function AARPResourcePageDraft() {
  const [successMessage, setSuccessMessage] = useState("");
  const [isRecordedModalOpen, setIsRecordedModalOpen] = useState(false);
  const [activeRecording, setActiveRecording] = useState(null);
  const [activeExpertVideo, setActiveExpertVideo] = useState(null);
  const { track } = useAnalytics(ANALYTICS_PAGE_ID);

  const vimeoIframeRef = useRef(null);
  const firedMilestonesRef = useRef(new Set());

  useEffect(() => {
    document.title = "SingFit AARP Member Resources";
  }, []);

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const triggered = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percentScrolled = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((threshold) => {
        if (percentScrolled >= threshold && !triggered.has(threshold)) {
          triggered.add(threshold);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "Scroll Depth",
            percent_scrolled: threshold,
            page_id: ANALYTICS_PAGE_ID,
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isRecordedModalOpen) return;
    if (!activeRecording?.videoEmbedUrl) return;
    if (!vimeoIframeRef.current) return;

    firedMilestonesRef.current = new Set();
    const player = new Player(vimeoIframeRef.current);

    const pushEvent = (eventName) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        page_id: PAGE_ID,
        recording_id: activeRecording.id || "",
        recording_title: activeRecording.title || "",
      });
    };

    player.on("play", () => pushEvent("recorded_webinar_play"));
    player.on("pause", () => pushEvent("recorded_webinar_pause"));
    player.on("ended", () => pushEvent("recorded_webinar_complete"));
    player.on("timeupdate", (data) => {
      const duration = data?.duration || 0;
      const seconds = data?.seconds || 0;
      if (!duration) return;

      const percent = Math.floor((seconds / duration) * 100);
      [25, 50, 75, 90, 100].forEach((milestone) => {
        if (
          percent >= milestone &&
          !firedMilestonesRef.current.has(milestone)
        ) {
          firedMilestonesRef.current.add(milestone);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "recorded_webinar_progress",
            page_id: PAGE_ID,
            recording_id: activeRecording.id || "",
            recording_title: activeRecording.title || "",
            percent_watched: milestone,
          });
        }
      });
    });

    return () => {
      try {
        player.unload();
      } catch (error) {
        // No action needed if the iframe has already been removed.
      }
    };
  }, [isRecordedModalOpen, activeRecording]);

  const pushClickEvent = (buttonText, destinationUrl) => {
    const eventData = {
      event: "click_cta",
      button_text: buttonText,
      destination_url: destinationUrl,
      page_id: PAGE_ID,
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
    return eventData;
  };

  const openRecordedModal = (recordingId = null) => {
    const selected =
      RECORDED_WEBINARS.find((recording) => recording.id === recordingId) ||
      RECORDED_WEBINARS[0] ||
      null;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "recorded_webinar_modal_open",
      page_id: PAGE_ID,
      recording_id: selected?.id || "",
      recording_title: selected?.title || "",
    });

    setActiveRecording(selected);
    setIsRecordedModalOpen(true);
  };

  const closeRecordedModal = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "recorded_webinar_modal_close",
      page_id: PAGE_ID,
    });

    setIsRecordedModalOpen(false);
    setActiveRecording(null);
  };

  const openExpertVideo = (video) => {
    pushClickEvent(video.title, `youtube:${video.id}`);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "video_start",
      page_id: PAGE_ID,
      video_id: video.id,
      video_title: video.title,
      video_platform: "YouTube",
    });
    setActiveExpertVideo(video);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F7F9FC] font-sans text-[#243B53]">
      <main className="mx-auto max-w-7xl px-5 pb-16 pt-0 sm:px-8">
        <section className="relative overflow-hidden rounded-b-[2.5rem] border border-[#C9D8E6] bg-gradient-to-br from-[#DCEAF5] via-[#EEF5FA] to-white px-6 py-12 shadow-[0_24px_70px_rgba(0,47,108,0.16)] sm:px-10 sm:py-16">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/45" />
          <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#F47534]/10" />

          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-[#002F6C] sm:text-5xl">
              Discover the Power of Music with SingFit — For Free
            </h1>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-lg font-medium text-[#002F6C]">
              Brought to you by SingFit in collaboration with
              <img
                src="/aarp-logo.png"
                alt="AARP Logo"
                className="h-5 w-auto"
              />
            </p>
          </div>
        </section>

        <nav
          aria-label="Resource sections"
          className="sticky top-3 z-30 mx-auto -mt-5 max-w-6xl rounded-[1.4rem] border border-[#D6E0E9] bg-white/95 px-2 py-2.5 sm:px-4 sm:py-3 shadow-[0_16px_40px_rgba(36,59,83,0.16)] backdrop-blur-md sm:px-4"
        >
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="hidden shrink-0 border-r border-[#DCE5EC] px-4 pr-6 lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F47534]">
                Browse Resources
              </p>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
              {[
                ["Free Guides", "guides", "guides"],
                ["Upcoming Webinars", "upcoming-webinars", "live"],
                ["Past Webinars", "past-webinars", "recorded"],
                ["Expert Videos", "expert-videos", "expert"],
              ].map(([label, id, icon]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="group flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2.5 text-center text-sm font-bold leading-tight text-[#002F6C] transition duration-200 hover:-translate-y-0.5 hover:bg-[#EEF5FA] hover:text-[#F47534] sm:min-h-[46px] sm:flex-row sm:gap-2 sm:px-4 sm:py-3 sm:text-[15px]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E6F0F7] text-[#002F6C] transition group-hover:bg-white group-hover:text-[#F47534] sm:h-8 sm:w-8">
                    <ResourceNavIcon type={icon} />
                  </span>
                  <span className="max-w-full sm:whitespace-nowrap">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        <section id="guides" className="scroll-mt-28 relative pb-12 pt-9 sm:pb-14 sm:pt-10">
          <div className="pointer-events-none absolute -right-20 top-4 h-48 w-48 rounded-full bg-[#E6F0F7]/60 blur-3xl" />
          <div className="max-w-3xl">
            <SectionEyebrow>Download and keep</SectionEyebrow>
            <h2 className="mt-2 text-3xl font-extrabold text-[#002F6C] sm:text-4xl">
              Free Guides for Using Music in Caregiving
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Download practical resources that can help you use music to support
              connection, engagement, and meaningful moments.
            </p>
          </div>

          <div className="mt-7 grid gap-7 lg:grid-cols-2">
            {GUIDES.map((guide, index) => (
              <a
                key={guide.id}
                href={guide.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("click_cta", {
                    button_text: guide.buttonText,
                    destination_url: guide.href,
                    page_id: PAGE_ID,
                  })
                }
                className="group relative grid min-h-[320px] overflow-hidden rounded-[2rem] border border-[#D7E1EB] bg-white shadow-[0_18px_45px_rgba(36,59,83,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_65px_rgba(0,47,108,0.20)] sm:grid-cols-[42%_58%]"
              >
                <div
                  className={`flex items-center justify-center bg-gradient-to-br ${guide.accent} p-8`}
                >
                  <div className="relative flex aspect-[8.5/11] w-full max-w-[210px] -rotate-1 flex-col overflow-hidden rounded-lg border border-white/80 bg-white p-6 shadow-[0_20px_45px_rgba(0,47,108,0.24)] transition duration-300 group-hover:rotate-0 group-hover:scale-[1.03]">
                    <img
                      src="/aarp-logo.png"
                      alt=""
                      className="h-5 w-auto self-start"
                    />
                    <div className="mt-7 text-xl font-extrabold leading-tight text-[#002F6C]">
                      {guide.title}
                    </div>
                    <div className="mt-auto rounded-full bg-[#E6F0F7] px-3 py-2 text-center text-xs font-semibold text-[#002F6C]">
                      Temporary cover placeholder
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <p className="text-sm font-bold uppercase tracking-[0.13em] text-[#F47534]">
                    Guide {index + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold leading-snug text-[#002F6C]">
                    {guide.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-700">
                    {guide.description}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 font-bold text-[#F47534]">
                    <DownloadIcon />
                    Download PDF
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-[#E8CDBE] bg-gradient-to-r from-[#FFF8F3] to-[#FAF6F2] p-5 shadow-[0_10px_28px_rgba(244,117,52,0.08)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.13em] text-[#F47534]">
                More resources are on the way
              </p>
              <h3 className="mt-1 text-xl font-bold text-[#002F6C]">
                New Content Coming Soon
              </h3>
              <p className="mt-1 text-sm text-gray-700">
                Enter your email below to sign up for updates.
              </p>
            </div>

            <form
              className="flex w-full max-w-lg flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const email = form.email.value;

                fetch(
                  "https://hook.us2.make.com/vl4dwb7wcunr13bghvani6mvji8imygv",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  }
                )
                  .then((response) => {
                    if (response.ok) {
                      setSuccessMessage(
                        "Thanks! Check your inbox for updates."
                      );
                      track("submit_form", {
                        form_id: "notify_me",
                        page_id: PAGE_ID,
                      });
                      form.reset();
                      setTimeout(() => setSuccessMessage(""), 5000);
                    } else {
                      setSuccessMessage(
                        "There was a problem. Please try again."
                      );
                    }
                  })
                  .catch(() => {
                    setSuccessMessage(
                      "There was a problem. Please try again."
                    );
                  });
              }}
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="min-h-[44px] flex-1 rounded-lg border border-gray-300 px-4 text-sm transition focus:border-[#F47534] focus:outline-none focus:ring-2 focus:ring-[#F47534]/25"
              />
              <Button
                type="submit"
                className="min-h-[44px] bg-[#F47534] px-5 text-white shadow hover:bg-[#d9652c]"
              >
                Notify Me
              </Button>
            </form>
          </div>

          {successMessage && (
            <p className="mt-3 text-center text-sm text-green-700">
              {successMessage}
            </p>
          )}
        </section>

        <section
          id="upcoming-webinars"
          className="scroll-mt-28 relative overflow-hidden rounded-[2.25rem] border border-[#E9D8CC] bg-gradient-to-br from-[#FFF9F5] via-[#FAF6F2] to-white px-5 py-9 shadow-[0_22px_55px_rgba(36,59,83,0.10)] sm:px-8 sm:py-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#F47534]/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div>
                <SectionEyebrow>Join us live</SectionEyebrow>
                <h2 className="mt-2 text-3xl font-extrabold text-[#002F6C] sm:text-4xl">
                  Upcoming Caregiver Webinars
                </h2>
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src="/andyheadshot.jpg"
                    alt="Andy Tubman"
                    className="h-12 w-12 rounded-full object-cover shadow"
                  />
                  <p className="text-base leading-relaxed text-gray-700">
                    Board Certified Music Therapist Andy Tubman hosts a series of
                    webinars for Caregivers.
                  </p>
                </div>
              </div>


            </div>

            <div className="mt-7 grid gap-4">
              {LIVE_WEBINARS.map((webinar) => (
                <button
                  key={webinar.id}
                  type="button"
                  onClick={() => {
                    const eventData = pushClickEvent(
                      webinar.title,
                      webinar.href
                    );
                    window.open(eventData.destination_url, "_blank");
                  }}
                  className="group grid w-full gap-5 rounded-2xl border border-[#DDE5EC] bg-white p-5 text-left shadow-[0_12px_30px_rgba(36,59,83,0.10)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD0DF] hover:shadow-[0_22px_45px_rgba(0,47,108,0.16)] sm:grid-cols-[110px_1fr_auto] sm:items-center"
                >
                  <img
                    src={webinar.image}
                    alt={webinar.imageAlt}
                    className="h-24 w-24 rounded-xl object-contain shadow"
                  />
                  <div>
                    <h3 className="text-xl font-bold leading-snug text-[#002F6C]">
                      {webinar.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-[#F47534]">
                      (Click to sign up for webinar)
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full bg-[#002F6C] px-5 py-3 text-sm font-bold text-white transition group-hover:bg-[#F47534]">
                    Register
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  pushClickEvent(
                    "Using Music to Create a More Harmonious Home Life",
                    "modal:recorded_webinars"
                  );
                  openRecordedModal("webinar-004");
                }}
                className="group grid w-full gap-5 rounded-2xl border border-[#DDE5EC] bg-white p-5 text-left shadow-[0_12px_30px_rgba(36,59,83,0.10)] transition duration-300 hover:-translate-y-1 hover:border-[#BFD0DF] hover:shadow-[0_22px_45px_rgba(0,47,108,0.16)] sm:grid-cols-[110px_1fr_auto] sm:items-center"
              >
                <img
                  src="/june16.png"
                  alt="June 16, 2026"
                  className="h-24 w-24 rounded-xl object-contain shadow"
                />
                <div>
                  <h3 className="text-xl font-bold leading-snug text-[#002F6C]">
                    Caregivers: Using Music to Create a More Harmonious Home Life
                  </h3>
                  <p className="mt-2 text-sm font-bold text-[#F47534]">
                    (Click to watch recording)
                  </p>
                </div>
                <span className="inline-flex items-center justify-center gap-2 rounded-full bg-[#002F6C] px-5 py-3 text-sm font-bold text-white transition group-hover:bg-[#F47534]">
                  <PlayIcon className="h-4 w-4" /> Watch
                </span>
              </button>
            </div>
          </div>
        </section>

        <section id="past-webinars" className="scroll-mt-28 py-12 sm:py-14">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>Watch anytime</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-extrabold text-[#002F6C] sm:text-4xl">
                Past Webinars
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Recorded sessions are available whenever you are ready to watch.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                pushClickEvent(
                  "Watch Past Webinars",
                  "modal:recorded_webinars"
                );
                openRecordedModal();
              }}
              className="text-left font-bold text-[#F47534] hover:underline"
            >
              View all recordings →
            </button>
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {RECORDED_WEBINARS.map((recording, index) => (
              <button
                key={recording.id}
                type="button"
                onClick={() => {
                  pushClickEvent(recording.title, "modal:recorded_webinars");
                  openRecordedModal(recording.id);
                }}
                className="group overflow-hidden rounded-2xl border border-[#D7E1EB] bg-white text-left shadow-[0_12px_30px_rgba(36,59,83,0.11)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,47,108,0.18)]"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-[#002F6C] via-[#124C85] to-[#E6F0F7] p-5">
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#002F6C]">
                    Recording {index + 1}
                  </span>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F47534] text-white shadow-lg transition group-hover:scale-110">
                    <PlayIcon />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold leading-snug text-[#002F6C]">
                    {recording.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">
                    {recording.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          id="expert-videos"
          className="scroll-mt-28 relative overflow-hidden rounded-[2.5rem] border border-[#CFDCE8] bg-gradient-to-br from-white via-[#F7FAFD] to-[#E9F2F8] px-6 py-12 shadow-[0_24px_65px_rgba(0,47,108,0.14)] sm:px-10 sm:py-14"
        >
          <div className="pointer-events-none absolute -left-20 -top-16 h-56 w-56 rounded-full bg-[#002F6C]/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl text-center">
            <SectionEyebrow>Featured conversations</SectionEyebrow>
            <h2 className="mt-2 text-3xl font-extrabold text-[#002F6C] sm:text-4xl">
              Expert Conversations on Music and Caregiving
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
              Hear Amy Goyer, AARP's National Family & Caregiving Expert, and Andy
              Tubman, Co-Founder and Chief Clinical Officer of SingFit, share how
              music and singing can create moments of connection, engagement, and
              joy for older adults.
            </p>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {EXPERT_VIDEOS.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => openExpertVideo(video)}
                className="group overflow-hidden rounded-2xl border border-[#D7E1EB] bg-white text-left shadow-[0_12px_30px_rgba(36,59,83,0.11)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,47,108,0.18)]"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={video.thumbnail}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/25" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F47534] text-white shadow-xl transition group-hover:scale-110">
                    <PlayIcon />
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#F47534]">
                    Amy Goyer and Andy Tubman
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[#002F6C]">
                    {video.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-gray-600">
                    Watch conversation →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2.5rem] bg-gradient-to-br from-[#002F6C] via-[#0B477D] to-[#002F6C] px-6 py-12 text-center text-white shadow-[0_26px_60px_rgba(0,47,108,0.28)] sm:px-10">
          <h2 className="text-3xl font-extrabold">Ready to experience SingFit?</h2>
          <div className="mt-7">
            <Button
              onClick={() => {
                const eventData = {
                  event: "click_cta",
                  button_text: "Buy SingFit Now",
                  destination_url:
                    "https://www.singfit.com/aarp-member-pricing",
                  page_id: PAGE_ID,
                };

                if (typeof track === "function") {
                  track("click_cta", eventData);
                }

                window.open(eventData.destination_url, "_blank");
              }}
              aria-label="Start using SingFit today"
              className="min-h-[48px] bg-[#F47534] px-10 py-4 text-xl text-white shadow-lg hover:bg-[#d9652c]"
            >
              Get SingFit Now
            </Button>
          </div>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-3 text-base text-white sm:text-lg">
            <img
              src="/aarp-member-benefit.png"
              alt="AARP badge"
              className="h-8 w-auto"
            />
            AARP Member Price: $8.39/month (includes 30% discount).
          </p>
        </section>

        <footer className="mt-12 border-t border-gray-200 px-4 pt-6 text-center text-xs text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>©2026 Musical Health Technologies. All Rights Reserved.</span>
            <span>1010 Wilshire Blvd. Los Angeles, CA 90017</span>
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Terms of Service
            </a>
            <a
              href="/accessibility"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Accessibility Statement
            </a>
          </div>
        </footer>
      </main>

      {isRecordedModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Watch past webinars"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={closeRecordedModal}
            aria-label="Close"
          />

          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Watch Past Webinars
                </h3>
                <p className="mt-0.5 text-xs text-gray-600">
                  Recorded session
                </p>
              </div>
              <button
                type="button"
                onClick={closeRecordedModal}
                className="text-sm font-semibold text-gray-700 hover:underline"
              >
                Close
              </button>
            </div>

            <div className="p-5">
              {activeRecording ? (
                <>
                  <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                    <iframe
                      ref={vimeoIframeRef}
                      title={activeRecording.title}
                      src={activeRecording.videoEmbedUrl}
                      className="h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="mt-4">
                    <div className="text-base font-semibold text-gray-900">
                      {activeRecording.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {activeRecording.duration}
                    </div>
                  </div>

                  {RECORDED_WEBINARS.length > 1 && (
                    <div className="mt-5 border-t border-gray-200 pt-4">
                      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-600">
                        Other recordings
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {RECORDED_WEBINARS.map((recording) => (
                          <button
                            key={recording.id}
                            type="button"
                            onClick={() => setActiveRecording(recording)}
                            className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                              activeRecording.id === recording.id
                                ? "border-[#002F6C] bg-[#E6F0F7] text-[#002F6C]"
                                : "border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <div className="font-medium">{recording.title}</div>
                            <div className="mt-1 text-xs text-gray-600">
                              {recording.duration}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-gray-600">
                  No recorded webinars available yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeExpertVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Watch expert conversation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => setActiveExpertVideo(null)}
            aria-label="Close"
          />

          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h3 className="text-base font-semibold text-gray-900">
                {activeExpertVideo.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveExpertVideo(null)}
                className="text-sm font-semibold text-gray-700 hover:underline"
              >
                Close
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                title={activeExpertVideo.title}
                src={activeExpertVideo.embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
