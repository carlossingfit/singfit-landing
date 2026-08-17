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
    description: "Download our free guide to start using music as a caregiving tool.",
    href: "/5 Tips for Using Music to Create a More Harmonious Home Life_Members.pdf",
    buttonText: "Download 5 Tips PDF",
    coverImage: "/5_Tips_Cover.png",
  },
  {
    id: "guide-connecting-through-music",
    title: "Connecting Through Music",
    description: "Download our free guide to start using music as a caregiving tool.",
    href: "/Connecting Through Music_AARP Member.pdf",
    buttonText: "Download Caregiver PDF",
    coverImage: "/Connecting_Cover.png",
  },
];

const FEATURED_RECORDINGS = [
  {
    id: "webinar-005",
    displayTitle: "Caregivers: Singing for Self-Expression and Confidence",
    image: "/Screenshot1.png",
    imageAlt: "Singing for Self-Expression and Confidence",
    dateImage: "/Aug_11.png",
  },
  {
    id: "webinar-001",
    displayTitle:
      "Caregivers: An Introduction to Using Music to Connect with Your Loved One",
    image: "/Screenshot2.png",
    imageAlt: "An Introduction to Using Music to Connect with Your Loved One",
    dateImage: "/July_14.png",
  },
];

const RECORDED_WEBINARS = [
  {
    id: "webinar-001",
    title: "Caregivers: Using Music to Connect with Your Loved One",
    duration: "56 min",
    videoEmbedUrl: "https://player.vimeo.com/video/1210564808?h=5df23db571",
    thumbnail: "/Connect_webinar.png",
  },
  {
    id: "webinar-002",
    title: "Caregivers: How to Select the Right Music for Your Goal",
    duration: "50 min",
    videoEmbedUrl: "https://player.vimeo.com/video/1173355484?h=85d323d74e",
    thumbnail: "/Goal_webinar.png",
  },
  {
    id: "webinar-003",
    title: "Caregivers: A Deep Dive into the Musical Preferences of Your Loved One",
    duration: "50 min",
    videoEmbedUrl: "https://player.vimeo.com/video/1181333165?h=4fe87d8edd",
    thumbnail: "/Musical_preferences_webinar.png",
  },
  {
    id: "webinar-004",
    title: "Caregivers: Using Music to Create a More Harmonious Home Life",
    duration: "50 min",
    videoEmbedUrl: "https://player.vimeo.com/video/1201986610?h=4fe87d8edd",
    thumbnail: "/Harmonious_webinar.png",
  },
  {
    id: "webinar-005",
    title: "Caregivers: Singing for Self-Expression and Confidence",
    duration: "50 min",
    videoEmbedUrl: "https://player.vimeo.com/video/1217821993?h=c7d5d5125d",
    thumbnail: "/Screenshot1.png",
  },
];

const EXPERT_VIDEOS = [
  {
    id: "IvonpE_5mPU",
    title: "Sundowners Syndrome: How Family Caregivers Can Use Music to Help",
    embedUrl: "https://www.youtube.com/embed/IvonpE_5mPU?autoplay=1&rel=0",
    thumbnail: "/Sundowners_Syndrome_thumbnail.png",
  },
  {
    id: "rTLm_Z9ydXM",
    title: "How Music Can Help Loved Ones Get Going in the Morning and Lower Stress When Caregiving",
    embedUrl: "https://www.youtube.com/embed/rTLm_Z9ydXM?autoplay=1&rel=0",
    thumbnail: "/Morning_thumbnail.png",
  },
  {
    id: "YpA_s5wt_8U",
    title: "Music: A Caregiving Tool to Get Your Loved Ones Moving and Doing Exercises",
    embedUrl: "https://www.youtube.com/embed/YpA_s5wt_8U?autoplay=1&rel=0",
    thumbnail: "/Exercise_thumbnail.png",
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

export default function AARPResourcePagePrototypeB() {
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
    <div className="min-h-screen overflow-x-clip bg-white font-sans text-[#243B53]">
      <main className="pb-16">

        {/* TOP BRAND / RESOURCE NAV */}
        <header className="sticky top-0 z-40 border-b border-[#E2E8EC] bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex min-h-[74px] max-w-[1360px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
            <div className="flex shrink-0 items-center gap-4">
              <img
                src="/SingFit New Brand Logo.png"
                alt="SingFit"
                className="h-auto w-[118px] sm:w-[138px]"
              />
              <div className="h-7 w-px bg-[#D8E0E5]" />
              <img
                src="/aarp-logo.png"
                alt="AARP"
                className="h-7 w-auto"
              />
            </div>

            <nav
              aria-label="Resource sections"
              className="hidden items-center gap-7 lg:flex"
            >
              {[
                ["Free Guides", "guides", "guides"],
                ["Upcoming Webinars", "featured-recordings", "live"],
                ["Past Webinars", "past-webinars", "recorded"],
                ["Expert Videos", "expert-videos", "expert"],
              ].map(([label, id, icon]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="group flex items-center gap-2 text-sm font-bold text-[#002E5D] transition hover:text-[#0377A3]"
                >
                  <span className="text-[#0377A3]">
                    <ResourceNavIcon type={icon} />
                  </span>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* MOBILE RESOURCE NAV */}
        <nav
          aria-label="Resource sections mobile"
          className="sticky top-[74px] z-30 border-b border-[#E2E8EC] bg-white/95 px-3 py-2 backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto grid max-w-xl grid-cols-4 gap-1">
            {[
              ["Guides", "guides", "guides"],
              ["Upcoming", "featured-recordings", "live"],
              ["Past", "past-webinars", "recorded"],
              ["Experts", "expert-videos", "expert"],
            ].map(([label, id, icon]) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-2 text-[11px] font-bold text-[#002E5D]"
              >
                <span className="text-[#0377A3]">
                  <ResourceNavIcon type={icon} />
                </span>
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </nav>

    <section className="mx-auto max-w-[1360px] px-5 pt-4 sm:px-8 lg:px-12 lg:pt-5">

  {/* DESKTOP HERO */}
  <div className="relative hidden h-[360px] overflow-hidden lg:block">

    {/* Full hero photography */}
    <div
  className="absolute inset-y-0 left-[38%] right-0 overflow-hidden"
  style={{
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 7%, rgba(0,0,0,0.72) 18%, black 30%, black 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 7%, rgba(0,0,0,0.72) 18%, black 30%, black 100%)",
  }}
>
      <img
        src="/Screenshot1.png"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>

    {/* White editorial shape */}
   

   {/* Copy */}
<div className="absolute inset-y-0 left-0 z-[2] flex w-[52%] items-center">
 <div className="relative h-[300px] max-w-[610px]">

  <div>
    <h1 className="text-[2.65rem] font-extrabold leading-[1.03] tracking-[-0.03em] text-[#002E5D]">
      Discover the Power of Music with SingFit — For Free
    </h1>

    <p className="mt-5 max-w-[570px] text-[19px] leading-[1.6] text-[#414141]">
      Guides, webinar recordings, and expert conversations designed to
      help caregivers use music to support connection, engagement, and
      meaningful moments.
    </p>
  </div>

  <p className="absolute bottom-0 left-0 flex flex-wrap items-center gap-2 text-[16px] font-semibold text-[#414141]">
    Brought to you by SingFit in collaboration with
    <img
      src="/aarp-logo.png"
      alt="AARP Logo"
      className="h-6 w-auto"
    />
  </p>

</div>
    </div>
    </div>

  {/* MOBILE / TABLET */}
  <div className="lg:hidden">
    <div className="py-8">
      <SectionEyebrow>
        SingFit + AARP Member Resources
      </SectionEyebrow>

      <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#002E5D] sm:text-5xl">
        Discover the Power of Music with SingFit — For Free
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-[#414141]">
        Guides, webinar recordings, and expert conversations designed to
        help caregivers use music to support connection, engagement, and
        meaningful moments.
      </p>

      <p className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#414141]">
        Brought to you by SingFit in collaboration with
        <img
          src="/aarp-logo.png"
          alt="AARP Logo"
          className="h-5 w-auto"
        />
      </p>
    </div>

    <img
      src="/Screenshot1.png"
      alt=""
      className="w-full object-cover"
    />
  </div>

</section>

       {/* FREE GUIDES BAND */}
<section
  id="guides"
  className="scroll-mt-36 mt-4 bg-[linear-gradient(180deg,#F7FBFD_0%,#EEF6FB_100%)]"
>
  <div className="mx-auto max-w-[1360px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">

    <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">

      {/* Section copy */}
      <div className="max-w-md lg:pt-16">
        <SectionEyebrow>Download and keep</SectionEyebrow>

        <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.025em] text-[#002E5D] lg:text-[2.5rem]">
          Free Guides for Using Music in Caregiving
        </h2>

        <p className="mt-5 text-[18px] leading-[1.65] text-[#414141]">
          Download practical resources that can help you use music to support
          connection, engagement, and meaningful moments.
        </p>
      </div>

      {/* Guide covers */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {GUIDES.map((guide) => (
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
            className="group flex flex-col items-center"
          >
            <div className="relative w-full max-w-[250px] justify-self-center transition duration-300 group-hover:-translate-y-1">
              <div className="absolute inset-x-8 bottom-0 h-8 rounded-full bg-[#002E5D]/10 blur-xl" />

              <img
                src={guide.coverImage}
                alt={guide.title}
                className="relative h-auto w-full rounded-lg bg-white shadow-[0_18px_42px_rgba(0,46,93,0.16)]"
              />
            </div>

            <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#F47534] transition group-hover:text-[#0377A3] sm:mt-4 sm:gap-2 sm:text-sm">
              <DownloadIcon className="h-4 w-4" />
              Download PDF
            </span>
          </a>
        ))}
      </div>
    </div>

    {/* SIGNUP STRIP */}
    <div className="mx-auto mt-8 grid max-w-[1180px] gap-4 rounded-xl border border-[#D8E3EA] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(0,46,93,0.06)] sm:mt-10 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7">

      <div className="flex items-center gap-4">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0377A3] shadow-[0_6px_18px_rgba(0,46,93,0.09)] sm:flex">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M3 5h18v14H3z" />
            <path d="m3 6 9 7 9-7" />
          </svg>
        </div>

        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#0377A3]">
            More resources are on the way
          </p>

          <h3 className="mt-1 text-xl font-bold text-[#002E5D]">
            New Content Coming Soon
          </h3>

          <p className="mt-1 text-[16px] leading-relaxed text-[#414141]">
            Enter your email below to sign up for updates.
          </p>
        </div>
      </div>

      <form
        className="flex w-full max-w-[500px] flex-col gap-2 sm:flex-row"
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
          className="min-h-[44px] flex-1 rounded-lg border border-[#B9CEDA] bg-white px-4 text-sm transition focus:border-[#0377A3] focus:outline-none focus:ring-2 focus:ring-[#0377A3]/20"
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

  </div>
</section>

        {/* Upcoming Webinars BAND */}
        <section
          id="featured-recordings"
          className="scroll-mt-36 bg-white"
        >
          <div className="mx-auto max-w-[1260px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
        <div className="mb-7 grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
  {/* Section heading */}
  <div>
    <SectionEyebrow>Join Us Live</SectionEyebrow>

    <h2 className="mt-3 text-[2.45rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#002E5D]">
      Upcoming Webinars
    </h2>

    <p className="mt-4 max-w-[650px] text-[18px] leading-[1.65] text-[#414141]">
      Join SingFit&apos;s caregiver webinar series for practical ways to use
      music to support connection, engagement, and meaningful moments.
    </p>
  </div>

  {/* Host */}
  <div className="flex items-center gap-4 pb-1 lg:justify-end">
    <img
      src="/andyheadshot.jpg"
      alt="Andy Tubman"
      className="h-12 w-12 shrink-0 rounded-full object-cover"
    />

    <p className="max-w-[410px] text-[16px] leading-[1.5] text-[#414141]">
      Board Certified Music Therapist{" "}
      <span className="font-semibold text-[#002E5D]">Andy Tubman</span>{" "}
      hosts SingFit&apos;s caregiver webinar series.
    </p>
  </div>
</div>

    <div className="mt-7 space-y-4">
  {FEATURED_RECORDINGS.map((item) => (
    <button
      key={item.id}
      type="button"
      onClick={() => {
        pushClickEvent(
          item.displayTitle,
          "modal:recorded_webinars"
        );
        openRecordedModal(item.id);
      }}
      className="group relative grid w-full grid-cols-[82px_1fr] overflow-hidden rounded-xl border border-[#DCE4E8] bg-[#FAFAFA] text-left shadow-[0_8px_22px_rgba(0,46,93,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,46,93,0.11)] md:grid-cols-[96px_1fr_34%]"
    >
      {/* Date card */}
      <div className="flex items-center justify-center px-2 py-4 md:px-4 md:py-5">
        <img
          src={item.dateImage}
          alt=""
          className="h-auto w-[82px] scale-[1.32] md:scale-[1.22]"
        />
      </div>

      {/* Copy */}
      <div className="relative z-10 flex min-h-[132px] flex-col justify-center px-2 py-4 md:min-h-[145px] md:px-5 md:py-5">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#0377A3]">
          Recording Available
        </p>

        <h3 className="mt-2 max-w-[620px] text-[20px] font-bold leading-[1.3] text-[#002E5D]">
          {item.displayTitle}
        </h3>

        <span className="mt-4 inline-flex min-h-[42px] w-fit items-center justify-center gap-2 rounded-lg bg-[#F47534] px-5 text-[16px] font-bold text-white transition group-hover:bg-[#002E5D]">
          <PlayIcon className="h-4 w-4" />
          Watch Recording
        </span>
      </div>

      {/* Image */}
      <div className="relative col-span-2 h-[118px] overflow-hidden md:col-span-1 md:h-auto md:min-h-[145px]">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/5 to-transparent md:-left-10" />
      </div>
    </button>
  ))}
</div>
          </div>
        </section>

        {/* PAST WEBINARS BAND */}
        <section
          id="past-webinars"
          className="scroll-mt-36 border-y border-[#E3E8EB] bg-[#FAFAFA]"
        >
          <div className="mx-auto max-w-[1260px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionEyebrow>Watch anytime</SectionEyebrow>
               <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.025em] text-[#002E5D] lg:text-[2.5rem]">
  Past Webinars
</h2>
                <p className="mt-4 text-lg leading-relaxed text-[#414141]">
                  Recorded sessions are available whenever you are ready to watch.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  pushClickEvent(
                    "View all recordings",
                    "modal:recorded_webinars"
                  );
                  openRecordedModal();
                }}
                className="text-[16px] font-bold text-[#F47534] hover:underline"
              >
                View all recordings →
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-10 sm:gap-7 lg:grid-cols-4">
              {RECORDED_WEBINARS.filter((recording) =>
                ["webinar-001", "webinar-002", "webinar-003", "webinar-004"].includes(
                  recording.id
                )
              ).map((recording) => (
                <button
                  key={recording.id}
                  type="button"
                  onClick={() => {
                    pushClickEvent(
                      recording.title,
                      "modal:recorded_webinars"
                    );
                    openRecordedModal(recording.id);
                  }}
                  className="group text-left"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-[#E9EEF1] shadow-[0_14px_32px_rgba(0,46,93,0.13)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_42px_rgba(0,46,93,0.18)]">
                    <img
                      src={recording.thumbnail}
                      alt={recording.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h3 className="mt-3 text-[16px] font-bold leading-[1.35] text-[#002E5D] sm:mt-4 sm:text-[17px] sm:leading-[1.4]">
  {recording.title}
</h3>
                 <p className="mt-1.5 text-[16px] leading-normal text-[#414141] sm:mt-2">
  {recording.duration}
</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERT VIDEOS BAND */}
<section
  id="expert-videos"
  className="scroll-mt-36 bg-[#F7FBFD]"
>
  <div className="mx-auto max-w-[1260px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">

    {/* Section heading */}
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div>
        <SectionEyebrow>Expert Videos</SectionEyebrow>

        <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.025em] text-[#002E5D] lg:text-[2.5rem]">
          Expert Videos on Music and Caregiving
        </h2>
      </div>

      <p className="max-w-[660px] text-[18px] leading-[1.65] text-[#414141] lg:justify-self-end">
        Hear Amy Goyer, AARP&apos;s National Family &amp; Caregiving Expert,
        and Andy Tubman, Co-Founder and Chief Clinical Officer of SingFit,
        share practical ways music can support connection, engagement, and
        meaningful moments for older adults and caregivers.
      </p>
    </div>

    {/* Video cards */}
    <div className="mt-7 grid items-start gap-6 sm:gap-7 md:mt-8 md:grid-cols-3">
      {EXPERT_VIDEOS.map((video) => (
        <button
          key={video.id}
          type="button"
          onClick={() => openExpertVideo(video)}
          className="group self-start text-left"
        >
          <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-[0_10px_26px_rgba(0,46,93,0.10)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_34px_rgba(0,46,93,0.16)]" style={{ aspectRatio: "16 / 9" }}>
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.13em] text-[#0377A3]">
            Amy Goyer + Andy Tubman
          </p>

          <h3 className="mt-2 text-[18px] font-bold leading-[1.4] text-[#002E5D]">
            {video.title}
          </h3>

          <p className="mt-3 text-[16px] font-bold text-[#F47534]">
            Watch Video →
          </p>
        </button>
      ))}
    </div>

  </div>
</section>

        {/* MEMBER CTA */}
        <section className="bg-[#002E5D]">
          <div className="mx-auto max-w-[1260px] px-5 py-12 text-center text-white sm:px-8 sm:py-14 lg:px-12">
            <h2 className="text-3xl font-extrabold">
              Ready to experience SingFit?
            </h2>

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
          </div>
        </section>

        {/* TRADITIONAL FOOTER */}
        <footer className="mx-auto max-w-[1260px] px-5 py-6 text-center text-[13px] leading-relaxed text-gray-500 sm:px-8 sm:pt-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>©2026 Musical Health Technologies. All Rights Reserved.</span>
            <span>1010 Wilshire Blvd. Los Angeles, CA 90017</span>
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0377A3] hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0377A3] hover:underline"
            >
              Terms of Service
            </a>
            <a
              href="/accessibility"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0377A3] hover:underline"
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