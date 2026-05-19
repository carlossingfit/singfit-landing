import React, { useEffect, useMemo, useState } from "react";

const brand = {
  orange: "#F47534",
  steel: "#0377A3",
  cerulean: "#0091C8",
  midnight: "#002E5D",
  arctic: "#DAECF6",
};

const asset = (path) => `/${path}`;

const slides = [
  "Opening",
  "Active vs Passive",
  "What Makes PRIME Different",
  "See It in Action",
  "How a Session Works",
  "The PRIME App",
  "Built by Music Therapists",
  "Proof at Scale",
  "Staff Value",
  "UK Package",
  "Next Step",
];

const sessionElements = [
  {
    label: "Theme",
    text: "Each session is built around a clear, familiar theme.",
    dot: "left-[18%] top-[14%]",
  },
  {
    label: "7-song flow",
    text: "Songs are sequenced to guide energy and participation.",
    dot: "left-[17%] top-[39%]",
  },
  {
    label: "Trivia prompts",
    text: "Built-in questions help spark recall, conversation, and laughter.",
    dot: "left-[52%] top-[42%]",
  },
  {
    label: "Movement cues",
    text: "Facilitators can add simple physical participation without guessing.",
    dot: "left-[53%] top-[63%]",
  },
];

const proofStats = [
  { value: "1,000+", label: "sites using SingFit" },
  { value: "12M", label: "individual sessions delivered" },
  { value: "95%", label: "retention rate" },
  { value: "3,000", label: "trained facilitators" },
];

const staffStats = [
  {
    value: "85%",
    label: "say PRIME makes their job easier",
  },
  {
    value: "92%",
    label: "say PRIME makes their job more fulfilling",
  },
  {
    value: "100%",
    label: "observed positive participant impact",
  },
];

const packageRows = [
  {
    title: "Introductory Playlist Package",
    price: "£150 flat fee per organisation",
    items: [
      "6 uniquely themed playlists",
      "7 hit songs per playlist",
      "Trivia questions and movements included",
      "Downloadable playlists available at any time",
    ],
  },
  {
    title: "SingFit Service Subscription",
    price: "£360 per year, per site",
    items: [
      "SingFit mobile app",
      "Full music catalogue access",
      "Technology licences",
      "Online staff training",
      "Therapeutic music support",
      "Technical and customer service",
      "Unlimited phone and email support",
    ],
  },
];

function ProgressDots({ activeIndex, goToSlide }) {
  return (
    <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 xl:flex">
      {slides.map((slide, index) => (
        <button
          key={slide}
          type="button"
          onClick={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}: ${slide}`}
          className={`h-2.5 rounded-full transition-all ${
            activeIndex === index
              ? "w-9 bg-[#F47534]"
              : "w-2.5 bg-slate-300 hover:bg-slate-400"
          }`}
        />
      ))}
    </div>
  );
}

function SlideShell({
  id,
  children,
  className = "",
  contentClassName = "max-w-7xl",
  dark = false,
  label,
}) {
  return (
    <section
      id={id}
      data-slide
      className={`relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24 md:px-10 lg:px-14 ${
        dark ? "bg-[#061D33] text-white" : "bg-[#F7F9FC] text-[#062B49]"
      } ${className}`}
    >
      {label && (
        <div className="absolute left-5 top-5 z-20 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0377A3] shadow-sm backdrop-blur md:left-10 md:top-8">
          {label}
        </div>
      )}
      <div className={`relative z-10 mx-auto w-full ${contentClassName}`}>{children}</div>
    </section>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`mb-5 text-sm font-black uppercase tracking-[0.22em] ${
        light ? "text-[#F47534]" : "text-[#0377A3]"
      }`}
    >
      {children}
    </p>
  );
}

function BigHeadline({ children, light = false, className = "" }) {
  return (
    <h1
      className={`text-5xl font-black leading-[0.96] tracking-[-0.065em] md:text-7xl lg:text-8xl ${
        light ? "text-white" : "text-[#062B49]"
      } ${className}`}
    >
      {children}
    </h1>
  );
}

function BodyCopy({ children, light = false, className = "" }) {
  return (
    <p
      className={`text-xl leading-relaxed md:text-2xl ${
        light ? "text-slate-200" : "text-slate-700"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export default function PrimeUKSalesDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePlaylistNote, setActivePlaylistNote] = useState(sessionElements[0]);

  const slideIds = useMemo(
    () => slides.map((slide, index) => `prime-uk-slide-${index + 1}`),
    []
  );

 const goToSlide = (index) => {
  const safeIndex = Math.max(0, Math.min(index, slideIds.length - 1));
  const el = document.getElementById(slideIds[safeIndex]);
  if (!el) return;

  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + window.scrollY;
  const distance = target - start;
  const duration = 520;
  let startTime = null;

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * easedProgress);

    if (progress < 1) {
      window.requestAnimationFrame(animateScroll);
    }
  };

  window.requestAnimationFrame(animateScroll);
};

  useEffect(() => {
    const sections = slideIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const index = slideIds.indexOf(visible.target.id);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { threshold: [0.45, 0.6, 0.75] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [slideIds]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goToSlide(slideIds.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, slideIds.length]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F9FC] text-[#062B49] antialiased">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-white/85 px-5 py-3 shadow-sm backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goToSlide(0)}
            className="flex items-center gap-3"
            aria-label="Go to opening slide"
          >
            <img
              src={asset("SingFit New Brand Logo.png")}
              alt="SingFit"
              className="h-auto w-[132px] md:w-[170px]"
            />
          </button>

          <div className="hidden items-center gap-3 md:flex">
            <span className="rounded-full bg-[#DAECF6] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#002E5D]">
              PRIME UK Sales Deck
            </span>
            <span className="text-sm font-bold text-slate-500">
              {activeIndex + 1} / {slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToSlide(activeIndex - 1)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-[#002E5D] shadow-sm transition hover:-translate-y-0.5 disabled:opacity-35"
              disabled={activeIndex === 0}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => goToSlide(activeIndex + 1)}
              className="rounded-full bg-[#F47534] px-5 py-2 text-sm font-black text-white shadow-[0_12px_32px_rgba(244,117,52,0.28)] transition hover:-translate-y-0.5 disabled:opacity-35"
              disabled={activeIndex === slides.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </header>

      <ProgressDots activeIndex={activeIndex} goToSlide={goToSlide} />

      <SlideShell id={slideIds[0]} label="01 Opening" className="bg-white">
  <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
    <div className="relative z-10">
      <Eyebrow>Prime UK</Eyebrow>
      <BigHeadline>
        Successfully scaling music as medicine.
      </BigHeadline>
      <BodyCopy className="mt-7 max-w-2xl">
        A staff-led therapeutic singing programme built to help older adults
        participate, connect, move, remember, and sing together.
      </BodyCopy>

      <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
        {[
          ["♪", "Active music engagement"],
          ["☷", "Staff facilitated"],
          ["●", "Designed for scale"],
        ].map(([icon, label]) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-black text-[#002E5D] shadow-[0_12px_34px_rgba(15,23,42,0.08)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F47534]/12 text-lg text-[#F47534]">
              {icon}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="relative overflow-hidden rounded-[4rem] shadow-[0_34px_100px_rgba(15,23,42,0.16)]">
      <img
        src={asset("jessiewithgroup.jpg")}
        alt="SingFit PRIME group session"
        className="h-[620px] w-full object-cover object-left"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#002E5D]/34 via-transparent to-transparent" />

      <div className="absolute bottom-8 left-8 max-w-[420px] rounded-[2rem] bg-[#002E5D]/94 p-6 text-white shadow-[0_24px_70px_rgba(0,46,93,0.28)] backdrop-blur">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
          Live group participation
        </p>
        <p className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em] text-white">
          Music becomes something residents do together.
        </p>
      </div>
    </div>
  </div>
</SlideShell>

      <SlideShell id={slideIds[1]} label="02 The Shift" dark>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,117,52,0.18),transparent_28%),radial-gradient(circle_at_18%_85%,rgba(0,145,200,0.15),transparent_30%)]" />
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow light>Active vs passive</Eyebrow>
            <BigHeadline light>
              Listening is familiar. Participation is different.
            </BigHeadline>
            <BodyCopy light className="mt-8 max-w-2xl">
              PRIME is not designed around residents simply hearing music. It is
              designed around residents taking part.
            </BodyCopy>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
              <div className="mb-5 rounded-[2rem] bg-white/10 p-4">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-300">
                  Passive music
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] text-white">
                  Residents listen.
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-300">
                Listening can be enjoyable, but the resident remains primarily
                an observer.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white p-2 text-[#062B49] shadow-[0_34px_90px_rgba(0,0,0,0.25)]">
              <img
                src={asset("PRIME session3.jpg")}
                alt="Residents actively participating in a SingFit session"
                className="h-[360px] w-full rounded-[2rem] object-cover"
              />
              <div className="p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F47534]">
                  Active music
                </p>
                <h2 className="mt-2 text-4xl font-black tracking-[-0.055em]">
                  Residents participate.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                  Singing, movement, memory, language, and social connection are
                  brought together in one facilitated session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SlideShell>

      <SlideShell id={slideIds[2]} label="03 Differentiation">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Eyebrow>The PRIME model</Eyebrow>
            <BigHeadline>
              A whole-mind, full-body session structure.
            </BigHeadline>
            <BodyCopy className="mt-8 max-w-2xl">
              Each session combines familiar songs with facilitator prompts,
              reminiscence, movement, and social interaction.
            </BodyCopy>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Singing", "Lyric-based vocal engagement"],
              ["Trivia", "Simple prompts that invite recall"],
              ["Movement", "Guided physical participation"],
              ["Reminiscence", "Familiar songs that spark memory"],
              ["Connection", "Shared experience in a group setting"],
              ["Structure", "A repeatable format staff can follow"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.07)]"
              >
                <div className="mb-5 h-2 w-14 rounded-full bg-[#F47534]" />
                <h3 className="text-2xl font-black tracking-[-0.04em]">
                  {title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>

      <SlideShell id={slideIds[3]} label="04 Video" dark>
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow light>See it in action</Eyebrow>
            <BigHeadline light>
              The difference is easiest to understand when you see the room.
            </BigHeadline>
            <BodyCopy light className="mt-8 max-w-2xl">
              A PRIME session is not a playlist playing in the background. It is
              a facilitated group experience.
            </BodyCopy>
          </div>

          <div className="overflow-hidden rounded-[2.75rem] border border-white/15 bg-black shadow-[0_34px_100px_rgba(0,0,0,0.32)]">
            <div className="relative aspect-video w-full">
              <iframe
                title="SingFit PRIME UK video"
                src="https://player.vimeo.com/video/1168125480?h=a574056c46&title=0&byline=0&portrait=0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </SlideShell>

      <SlideShell
  id={slideIds[4]}
  label="05 Session Design"
  className="bg-white"
  contentClassName="max-w-[1380px]"
>
  <div className="grid items-center gap-12 lg:grid-cols-[0.34fr_0.66fr]">
    <div>
      <Eyebrow>How a session works</Eyebrow>

      <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[#062B49] md:text-6xl">
        Structured therapeutic sessions staff can actually lead.
      </h1>

      <p className="mt-7 text-xl leading-relaxed text-slate-700">
        PRIME playlists give facilitators the words, prompts, songs, movements,
        and flow they need to lead a full group session with confidence.
      </p>

      <div className="mt-10 space-y-4 max-w-[480px]">
  {[
    "Built-in facilitator script",
    "Trivia and reminiscence prompts",
    "Movement cues and follow-up questions",
  ].map((item) => (
    <div
      key={item}
      className="rounded-2xl border border-slate-200 bg-white px-7 py-5 text-[1.05rem] font-black text-[#002E5D] shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
    >
      {item}
    </div>
  ))}
</div>
    </div>

    <div className="relative">
  <div className="rounded-[3rem] bg-white p-4 shadow-[0_34px_100px_rgba(15,23,42,0.16)]">
    <img
      src={asset("UK Playlist Image.png")}
      alt="SingFit UK scripted playlist example"
      className="block h-[620px] w-full rounded-[2.25rem] object-contain"
    />
  </div>

  
</div>
  </div>
</SlideShell>

      <SlideShell id={slideIds[5]} label="06 App Experience" className="bg-white">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>The PRIME app</Eyebrow>
            <BigHeadline>
              The programme lives where staff can use it.
            </BigHeadline>
            <BodyCopy className="mt-8 max-w-2xl">
              Staff access the SingFit app, choose the playlist, and follow the
              session structure. The technology supports the facilitator instead
              of replacing the human connection.
            </BodyCopy>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-2">
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-slate-200 bg-[#F7F9FC] p-5 shadow-[0_26px_80px_rgba(15,23,42,0.10)]">
              <img
                src={asset("PrimeHomePage.jpeg")}
                alt="SingFit PRIME home page"
                className="mx-auto max-h-[580px] rounded-[2rem] object-contain"
              />
              <p className="mt-5 text-center text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                Home screen
              </p>
            </div>
            <div className="flex h-full flex-col justify-between rounded-[2.5rem] border border-slate-200 bg-[#F7F9FC] p-5 shadow-[0_26px_80px_rgba(15,23,42,0.10)]">
              <img
                src={asset("PrimePlaylistPage.jpeg")}
                alt="SingFit PRIME playlist page"
                className="mx-auto max-h-[580px] rounded-[2rem] object-contain"
              />
              <p className="mt-5 text-center text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                Playlist page
              </p>
            </div>
          </div>
        </div>
      </SlideShell>

      <SlideShell id={slideIds[6]} label="07 Credibility" dark>
        <div className="absolute inset-0 opacity-25">
          <img
            src={asset("jessiewithgroup.jpg")}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#061D33]" />
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow light>Designed by experts</Eyebrow>
            <BigHeadline light className="!text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              Built by music therapists, not just software designers.
            </BigHeadline>
          </div>
          <div className="rounded-[3rem] border border-white/15 bg-white/10 p-8 backdrop-blur md:p-10">
            <BodyCopy light>
              SingFit PRIME was created to help staff deliver structured
              therapeutic music sessions at scale. The programme embeds the
              protocol into the playlist experience, so teams can facilitate
              with consistency.
            </BodyCopy>
            <div className="mt-8 grid gap-4">
              {[
                "Therapeutic session structure",
                "Certified facilitator training",
                "Music selected for participant success",
                "Support for implementation and continued use",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-lg font-bold text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SlideShell>

      <SlideShell id={slideIds[7]} label="08 Proof">
        <div className="text-center">
          <Eyebrow>Market validation</Eyebrow>
          <BigHeadline className="mx-auto max-w-5xl">
            Proven across long-term care.
          </BigHeadline>
          <BodyCopy className="mx-auto mt-8 max-w-3xl">
            PRIME is not a pilot concept. It is a scaled programme with more
            than a decade of real-world use.
          </BodyCopy>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {proofStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
            >
              <p className="text-6xl font-black tracking-[-0.08em] text-[#002E5D] md:text-7xl">
                {stat.value}
              </p>
              <p className="mt-4 text-base font-black uppercase tracking-[0.13em] text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-full bg-[#DAECF6] px-7 py-4 text-center text-lg font-black text-[#002E5D]">
          Average session length: 45 minutes of active, structured engagement.
        </p>
      </SlideShell>

      <SlideShell id={slideIds[8]} label="09 Staff Value" className="bg-white">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Staff experience</Eyebrow>
            <BigHeadline>
              A resident engagement tool that also supports staff.
            </BigHeadline>
            <BodyCopy className="mt-8 max-w-2xl">
              PRIME gives facilitators a repeatable structure they can lead with
              confidence, even without a music background.
            </BodyCopy>
          </div>

          <div className="grid gap-5">
            {staffStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`rounded-[2.5rem] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.10)] ${
                  index === 1
                    ? "bg-[#002E5D] text-white"
                    : "border border-slate-200 bg-[#F7F9FC] text-[#062B49]"
                }`}
              >
                <div className="flex items-center gap-6">
                  <p
                    className={`text-6xl font-black tracking-[-0.08em] md:text-7xl ${
                      index === 1 ? "text-white" : "text-[#F47534]"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`text-xl font-black leading-tight tracking-[-0.03em] md:text-2xl ${
                      index === 1 ? "text-slate-100" : "text-[#062B49]"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>

      <SlideShell id={slideIds[9]} label="10 UK Package" className="py-20 md:py-20 lg:py-20">
        <div className="text-center">
          <Eyebrow>Programme details</Eyebrow>
          <h1 className="mx-auto max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.06em] text-[#062B49] md:text-6xl lg:text-7xl">
            Turnkey therapeutic programming for UK organisations.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
            PRIME combines ready-to-use playlists, app access, staff training,
            and ongoing support in a simple package.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {packageRows.map((row) => (
            <div
              key={row.title}
              className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-7"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F47534]">
                {row.title}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.055em] text-[#002E5D] md:text-4xl">
                {row.price}
              </h2>
              <div className="mt-5 grid gap-2.5">
                {row.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-[#F7F9FC] px-4 py-3"
                  >
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#F47534]" />
                    <p className="text-sm font-bold leading-snug text-slate-700 md:text-[15px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SlideShell>

      <SlideShell
  id={slideIds[10]}
  label="11 Close"
  dark
  className="bg-[#061D33]"
  contentClassName="max-w-[1380px]"
>
  <div className="absolute left-1/2 top-1/2 h-[100svh] w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden">
    <img
      src={asset("PRIME session3.jpg")}
      alt="SingFit PRIME session"
      className="h-full w-full object-cover object-center opacity-50"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#061D33] via-[#061D33]/88 to-[#061D33]/45" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#061D33] via-transparent to-[#061D33]/25" />
  </div>

  <div className="relative max-w-4xl">
    <Eyebrow light>Next step</Eyebrow>

    <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.055em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.28)] md:text-7xl">
      Ready to bring{" "}
      <span className="text-[#F47534]">SingFit PRIME</span> to your
      organisation?
    </h1>

    <div className="mt-8 h-2 w-20 rounded-full bg-[#F47534]" />

    <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white md:text-2xl">
      We can help you confirm the right package, set up your introductory
      playlists, and get your staff ready to launch.
    </p>

    <div className="mt-10">
      <button
        type="button"
        onClick={() => goToSlide(9)}
        className="rounded-full border border-white/35 bg-white/10 px-9 py-5 text-lg font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
      >
        Review package details
      </button>
    </div>
  </div>
</SlideShell>
    </main>
  );
}
