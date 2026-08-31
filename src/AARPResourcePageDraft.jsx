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
    coverImage: "/5_Tips_Cover.png",
  },
  {
    id: "guide-connecting-through-music",
    title: "Connecting Through Music",
    description:
      "Download our free guide to start using music as a caregiving tool.",
    href: "/Connecting Through Music_AARP Member.pdf",
    buttonText: "Download Caregiver PDF",
    accent: "from-[#F5EFEA] to-white",
    coverImage: "/Connecting_Cover.png",
  },
];

const LIVE_WEBINARS = [
  {
    id: "webinar-006",
    displayTitle: "Caregivers: Using Music to Connect with Your Loved One",
    image: "/Screenshot1.png",
    imageAlt: "Using Music to Connect with Your Loved One",
    dateImage: "/Sept_22.png",
    href: "https://us02web.zoom.us/webinar/register/2617881985835/WN_JQ-ul8G6QUeMB194ZzVK2g",
  },
  {
    id: "webinar-007",
    displayTitle:
      "Singing to Feel Good: Making Singing Part of Your Everyday Life",
    image: "/Screenshot2.png",
    imageAlt: "An Introduction to Using Music to Connect with Your Loved One",
    dateImage: "/Oct_27.png",
    href: "https://us02web.zoom.us/webinar/register/1217881986428/WN_Xlx7qVdgQSasEDs13fkBPg",
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
    thumbnail: "/Self_expression.png",
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

  if (type === "expert") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" {...commonProps}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <circle cx="9" cy="11" r="2" />
        <path strokeLinecap="round" d="M6.5 16c.7-1.8 1.9-2.7 3.5-2.7S12.8 14.2 13.5 16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m15 9 3 2-3 2V9Z" />
      </svg>
    );
  }

  return null;
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
      <main className="mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-8 sm:pt-6">
        <section className="relative overflow-hidden rounded-[1.9rem] border border-[#B9D4E1] bg-[linear-gradient(135deg,#E6F2F7_0%,#D5E9F2_52%,#C6E1ED_100%)] px-6 py-7 shadow-[0_14px_36px_rgba(0,46,93,0.10)] sm:px-10 sm:py-8">
   <div className="relative z-10 mx-auto max-w-4xl text-center">
    <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-[#002F6C] sm:text-5xl">
      Discover the Power of Music with SingFit — For Free
    </h1>

    <p className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[17px] font-medium text-[#002F6C] sm:text-lg">
      Brought to you by SingFit in collaboration with
      <img
        src="/aarp-logo.png"
        alt="AARP Logo"
        className="h-5 w-auto"
      />
    </p>
  </div>
</section>

        <nav aria-label="Resource sections" className="sticky top-3 z-30 mx-auto -mt-4 max-w-6xl rounded-[1.25rem] border border-[#D7E1EB] bg-white px-2 py-2 shadow-[0_10px_26px_rgba(0,46,93,0.10)] backdrop-blur-md sm:px-4 sm:py-2.5">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="hidden shrink-0 border-r border-[#E2E8EE] px-4 pr-6 lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F47534]">Browse Resources</p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-1.5">
              {[
                ["Free Guides", "guides", "guides"],
                ["Upcoming Webinars", "upcoming-webinars", "live"],
                ["Past Webinars", "past-webinars", "recorded"],
                ["Expert Videos", "expert-videos", "expert"],
              ].map(([label, id, icon]) => (
                <a key={id} href={`#${id}`} className="group flex min-w-0 items-center justify-center gap-2 rounded-lg px-2 py-2 text-center text-sm font-bold leading-tight text-[#002F6C] transition hover:bg-[#F7F9FC] hover:text-[#F47534] sm:min-h-[44px] sm:px-3 sm:text-[15px]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center text-[#0377A3] transition group-hover:text-[#F47534]"><ResourceNavIcon type={icon} /></span>
                  <span className="max-w-full sm:whitespace-nowrap">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        <section id="guides" className="scroll-mt-28 relative mt-8 rounded-[1.75rem] border border-[#D7E1EB] bg-white px-6 py-6 shadow-[0_12px_30px_rgba(0,46,93,0.08)] sm:px-8">
          <div className="max-w-[820px]">
            <SectionEyebrow>Download and keep</SectionEyebrow>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-[#002F6C] sm:text-[2.6rem]">Free Guides for Using Music in Caregiving</h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">Download practical resources that can help you use music to support connection, engagement, and meaningful moments.</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {GUIDES.map((guide) => (
              <a key={guide.id} href={guide.href} target="_blank" rel="noopener noreferrer" onClick={() => track("click_cta", { button_text: guide.buttonText, destination_url: guide.href, page_id: PAGE_ID })} className="group flex items-center gap-4 rounded-xl border border-[#DCE5EC] bg-[#FAFBFC] px-4 py-3 transition hover:-translate-y-0.5 hover:border-[#B8CBD8] hover:bg-white hover:shadow-[0_8px_20px_rgba(0,46,93,0.07)]">
                <img src={guide.coverImage} alt={guide.title} className="w-[78px] shrink-0 rounded-md shadow-[0_5px_12px_rgba(0,46,93,0.10)] sm:w-[84px]" />
                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold leading-[1.3] text-[#002F6C]">{guide.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#F47534] transition group-hover:text-[#0377A3]"><DownloadIcon className="h-4 w-4" />Download PDF</span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 rounded-lg border border-[#C7DCD8] bg-[#EEF5F3] px-5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
  <div className="min-w-0">
    <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#4D817B]">
      More resources are on the way
    </p>

    <p className="mt-0.5 text-[16px] font-semibold text-[#002F6C]">
      Get notified when new guides and caregiver resources are added.
    </p>
  </div>

  <form
    className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
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
            setSuccessMessage("Thanks! Check your inbox for updates.");

            track("submit_form", {
              form_id: "notify_me",
              page_id: PAGE_ID,
            });

            form.reset();
            setTimeout(() => setSuccessMessage(""), 5000);
          } else {
            setSuccessMessage("There was a problem. Please try again.");
          }
        })
        .catch(() =>
          setSuccessMessage("There was a problem. Please try again.")
        );
    }}
  >
    <input
      type="email"
      name="email"
      required
      placeholder="Enter your email"
      className="min-h-[40px] w-full rounded-lg border border-[#C9D7D4] bg-white px-4 text-sm transition focus:border-[#5E9C96] focus:outline-none focus:ring-2 focus:ring-[#5E9C96]/20 sm:w-[210px]"
    />

    <Button
      type="submit"
      className="min-h-[40px] whitespace-nowrap bg-[#F47534] px-5 text-white shadow-none hover:bg-[#d9652c]"
    >
      Notify Me
    </Button>
  </form>
</div>

{successMessage && (
  <p className="mt-2 text-center text-sm text-green-700">
    {successMessage}
  </p>
)}
        </section>

        <section
  id="upcoming-webinars"
  className="scroll-mt-28 relative mt-8 overflow-hidden rounded-[1.75rem] border border-[#D7E1EB] bg-white px-5 py-8 shadow-[0_12px_30px_rgba(0,46,93,0.08)] sm:px-8 sm:py-9"
>
  <div className="relative mx-auto max-w-7xl">
    <div className="max-w-4xl">
      <SectionEyebrow>Join us live</SectionEyebrow>

      <h2 className="mt-2 text-3xl font-extrabold text-[#002F6C] sm:text-4xl">
        Upcoming Caregiver Webinars
      </h2>

      <div className="mt-3 flex items-center gap-3">
        <img
          src="/andyheadshot.jpg"
          alt="Andy Tubman"
          className="h-12 w-12 rounded-full object-cover shadow-sm"
        />

        <p className="text-base leading-relaxed text-gray-700">
          Board Certified Music Therapist Andy Tubman hosts a series of webinars
          for Caregivers.
        </p>
      </div>
    </div>

    <div className="mt-6 grid gap-3">
  {LIVE_WEBINARS.map((webinar) => (
    <button
      key={webinar.id}
      type="button"
      onClick={() => {
        pushClickEvent(
          webinar.displayTitle,
          webinar.href
        );

        window.open(
          webinar.href,
          "_blank",
          "noopener,noreferrer"
        );
      }}
      className="group grid w-full gap-4 rounded-xl border border-[#DDE5EC] bg-[#FAFBFC] px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-[#B8CBD8] hover:bg-white hover:shadow-[0_10px_24px_rgba(0,46,93,0.07)] sm:grid-cols-[88px_1fr_auto] sm:items-center sm:gap-6"
    >
      {/* DATE */}
      <div className="flex justify-start sm:justify-center">
        <img
          src={webinar.dateImage}
          alt=""
          className="h-[72px] w-[72px] object-contain"
        />
      </div>

      {/* WEBINAR INFO */}
      <div className="min-w-0">
        <h3 className="text-[17px] font-bold leading-[1.35] text-[#002F6C] sm:text-lg">
          {webinar.displayTitle}
        </h3>

        <p className="mt-1.5 text-sm font-bold text-[#F47534]">
          Registration open
        </p>
      </div>

      {/* ACTION */}
      <span className="inline-flex min-h-[44px] w-full items-center justify-center whitespace-nowrap rounded-full bg-[#002F6C] px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-[#F47534] sm:w-auto">
        Register Now
      </span>
    </button>
  ))}
</div>
  </div>
</section>

        <section id="past-webinars" className="scroll-mt-28 py-12 sm:py-14">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <SectionEyebrow>Watch anytime</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-extrabold text-[#002F6C] sm:text-4xl">Past Webinars</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">Recorded sessions are available whenever you are ready to watch.</p>
            </div>
            <button type="button" onClick={() => { pushClickEvent("Watch Past Webinars", "modal:recorded_webinars"); openRecordedModal(); }} className="text-left font-bold text-[#F47534] hover:underline">View all recordings →</button>
          </div>
          <div className="mt-9 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
            {RECORDED_WEBINARS.map((recording) => (
              <button key={recording.id} type="button" onClick={() => { pushClickEvent(recording.title, "modal:recorded_webinars"); openRecordedModal(recording.id); }} className="group flex h-[296px] w-full flex-col overflow-hidden rounded-xl border border-[#D7E1EB] bg-white text-left shadow-[0_8px_22px_rgba(0,46,93,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,46,93,0.10)]">
                <div className="relative h-[160px] w-full shrink-0 overflow-hidden bg-[#E9EEF3]">
  <img
    src={recording.thumbnail}
    alt={recording.title}
    className="h-full w-full object-cover"
  />
</div>
                <div className="flex h-[136px] w-full flex-col px-5 py-4">
                  <h3 className="text-[17px] font-bold leading-[1.35] text-[#002F6C]">{recording.title}</h3>
                  <p className="mt-auto pt-2 text-sm text-gray-600">{recording.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="expert-videos" className="scroll-mt-28 relative overflow-hidden rounded-[1.75rem] border border-[#D7E1EB] bg-white px-6 py-9 shadow-[0_12px_30px_rgba(0,46,93,0.08)] sm:px-8 sm:py-10">
          <div className="relative">
            <div className="max-w-[820px]">
              <SectionEyebrow>Featured conversations</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-[#002F6C] sm:text-4xl">Expert Conversations on Music and Caregiving</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">Hear Amy Goyer, AARP&apos;s National Family &amp; Caregiving Expert, and Andy Tubman, Co-Founder and Chief Clinical Officer of SingFit, share how music and singing can create moments of connection, engagement, and joy for older adults.</p>
            </div>
            <div className="mx-auto mt-7 grid max-w-[1080px] gap-5 md:grid-cols-3">
              {EXPERT_VIDEOS.map((video) => (
                <button key={video.id} type="button" onClick={() => openExpertVideo(video)} className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#D7E1EB] bg-white text-left shadow-[0_8px_22px_rgba(0,46,93,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,46,93,0.10)]">
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-gray-100"><img src={video.thumbnail} alt={video.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.01]" /></div>
                  <div className="flex min-h-[122px] flex-col px-5 py-4">
                    <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#F47534]">Amy Goyer and Andy Tubman</p>
                    <h3 className="mt-2 text-[17px] font-bold leading-[1.4] text-[#002F6C]">{video.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] bg-[#002F6C] px-6 py-11 text-center text-white shadow-[0_16px_38px_rgba(0,47,108,0.18)] sm:px-10">
          <h2 className="text-3xl font-extrabold">Ready to experience SingFit?</h2>
          <div className="mt-7">
            <Button onClick={() => {
              const eventData = { event: "click_cta", button_text: "Buy SingFit Now", destination_url: "https://www.singfit.com/aarp-member-pricing", page_id: PAGE_ID };
              if (typeof track === "function") track("click_cta", eventData);
              window.open(eventData.destination_url, "_blank");
            }} aria-label="Start using SingFit today" className="min-h-[48px] bg-[#F47534] px-10 py-4 text-xl text-white shadow-sm hover:bg-[#d9652c]">Get SingFit Now</Button>
          </div>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-3 text-base text-white sm:text-lg"><img src="/aarp-member-benefit.png" alt="AARP badge" className="h-8 w-auto" />AARP Member Price: $8.39/month (includes 30% discount).</p>
        </section>

        <footer className="mt-10 border-t border-gray-200 px-4 pt-6 text-center text-xs text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>©2026 Musical Health Technologies. All Rights Reserved.</span>
            <span>1010 Wilshire Blvd. Los Angeles, CA 90017</span>
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0377A3] hover:underline">Privacy Policy</a>
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#0377A3] hover:underline">Terms of Service</a>
            <a href="/accessibility" target="_blank" rel="noopener noreferrer" className="text-[#0377A3] hover:underline">Accessibility Statement</a>
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
