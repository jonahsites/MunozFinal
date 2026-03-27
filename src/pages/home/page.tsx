import { useEffect, useState } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "../../lib/builder";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { services, stats, testimonials } from "../../mocks/siteData";
import TestimonialCard from "./components/TestimonialCard";
import ServiceCard from "./components/ServiceCard";
import SoccerBall3D from "./components/SoccerBall3D";
import {
  ScrambleText,
  WipeText,
  WordReveal,
  DrawLine,
  ZoomReveal,
  FloatingParticles,
  ParallaxLayer,
  TiltCard,
  MagneticButton,
} from "../../components/feature/Animations";

// ─── Builder-powered Home ─────────────────────────────────────────────────────
function BuilderHome() {
  const isPreviewing = useIsPreviewing();
  const [content, setContent] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    builder
      .get("page", { url: "/" })
      .toPromise()
      .then((res) => {
        setContent(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // If Builder has published content OR we're in preview mode, render it
  if (!loading && (content || isPreviewing)) {
    return (
      <BuilderComponent
        model="page"
        content={content as Record<string, unknown>}
      />
    );
  }

  // While loading: transparent (avoids flash)
  if (loading) {
    return null;
  }

  // No Builder content → fall through to custom page
  return null;
}

// ─── Custom (fallback) Home ───────────────────────────────────────────────────
function CustomHome() {
  const ballWrapperRef = useRef<HTMLDivElement>(null);
  const svcScrollRef = useRef<HTMLDivElement>(null);
  const svcTrackRef = useRef<HTMLDivElement>(null);

  /* ─── Ball scroll-follow ─── */
  useEffect(() => {
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const handleScroll = () => {
      if (!ballWrapperRef.current) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / (vh * 1.6), 1);
      const eased = ease(Math.min(progress, 1));
      const leftVw = 50 + eased * 26;
      const topVh = 50 + eased * 10;
      const scale = 1 - eased * 0.35;
      const opacity =
        progress > 0.42 ? Math.max(0, 1 - (progress - 0.42) / 0.28) : 1;
      ballWrapperRef.current.style.left = `${leftVw}vw`;
      ballWrapperRef.current.style.top = `${topVh}vh`;
      ballWrapperRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      ballWrapperRef.current.style.opacity = String(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ─── Horizontal scroll — services ─── */
  useEffect(() => {
    const outer = svcScrollRef.current;
    const track = svcTrackRef.current;
    if (!outer || !track) return;

    const setHeight = () => {
      const scrollDist = Math.max(
        0,
        track.scrollWidth - window.innerWidth + 140
      );
      outer.style.height = `calc(100vh + ${scrollDist + 180}px)`;
    };

    const handleScroll = () => {
      const rect = outer.getBoundingClientRect();
      const scrollable = outer.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const scrollDist = Math.max(
        0,
        track.scrollWidth - window.innerWidth + 140
      );
      track.style.transform = `translateX(${-progress * scrollDist}px)`;
    };

    setHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", setHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <main className="bg-[#020810] min-h-screen">
      {/* ═══ FIXED BALL ═══ */}
      <div
        ref={ballWrapperRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          left: "50vw",
          top: "50vh",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          willChange: "transform, left, top, opacity",
        }}
      >
        <SoccerBall3D size={1000} />
      </div>

      {/* ═══════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-start overflow-hidden">
        {/* Parallax background */}
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          <ParallaxLayer speed={0.4} className="w-full h-full scale-110">
            <img
              src="https://assets.cdn.filesafe.space/oJ5frEp0oe5qkawU9xTd/media/677d6c86fb9954527262a70d.jpeg"
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </ParallaxLayer>
        </div>

        {/* Floating particles */}
        <FloatingParticles count={50} />

        <div
          className="absolute top-0 left-0 right-0 z-[3] pointer-events-none"
          style={{
            height: "220px",
            background:
              "linear-gradient(to bottom, #020810 0%, rgba(2,8,16,0.7) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-[3] pointer-events-none"
          style={{
            height: "55%",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(2,8,16,0.55) 35%, rgba(2,8,16,0.92) 70%, #020810 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 z-[3] pointer-events-none"
          style={{
            width: "14%",
            background: "linear-gradient(to right, rgba(2,8,16,0.85), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 z-[3] pointer-events-none"
          style={{
            width: "14%",
            background: "linear-gradient(to left, rgba(2,8,16,0.85), transparent)",
          }}
        />

        <div className="relative z-[10] w-full max-w-7xl mx-auto px-6 pt-24 pb-52">
          <div className="flex flex-col items-center text-center">
            <ZoomReveal delay={150}>
              <span
                className="inline-block text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] mb-8 px-5 py-2 rounded-full"
                style={{
                  background: "rgba(2,8,16,0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(77,166,255,0.25)",
                }}
              >
                Elite Soccer Coaching · Since 2019
              </span>
            </ZoomReveal>

            <WipeText delay={360} className="mb-2">
              <h1
                className="text-white font-black uppercase leading-none"
                style={{
                  fontSize: "clamp(52px, 9vw, 130px)",
                  letterSpacing: "-3px",
                  textShadow:
                    "0 4px 60px rgba(0,0,0,0.9), 0 2px 20px rgba(0,0,0,0.8)",
                }}
              >
                Take Your Game
              </h1>
            </WipeText>

            <WipeText delay={570} className="mb-10">
              <h2
                className="font-black uppercase leading-none"
                style={{
                  fontSize: "clamp(52px, 9vw, 130px)",
                  letterSpacing: "-3px",
                  background:
                    "linear-gradient(135deg, #60c8ff 0%, #4da6ff 40%, #1e6aff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 4px 30px rgba(77,166,255,0.5))",
                }}
              >
                To The Next Level
              </h2>
            </WipeText>

            <WordReveal
              text="Family-run. Player-focused. Technical to the core. We turn raw talent into controlled, elite ability — one session at a time."
              className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
              delay={830}
              stagger={42}
            />

            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton>
                <Link
                  to="/book"
                  className="font-black uppercase tracking-widest px-10 py-4 rounded-full text-sm transition-all whitespace-nowrap cursor-pointer text-white"
                  style={{
                    background: "linear-gradient(135deg, #1e6aff, #4da6ff)",
                    boxShadow:
                      "0 0 40px rgba(77,166,255,0.5), 0 4px 20px rgba(0,0,0,0.5)",
                    display: "block",
                  }}
                >
                  Book Training <i className="ri-arrow-right-line ml-2" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/about"
                  className="border-2 border-white/35 text-white font-bold uppercase tracking-widest px-10 py-4 rounded-full text-sm hover:border-[#4da6ff] hover:text-[#4da6ff] transition-colors whitespace-nowrap cursor-pointer"
                  style={{
                    backdropFilter: "blur(8px)",
                    background: "rgba(2,8,16,0.4)",
                    display: "block",
                  }}
                >
                  Our Story
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="absolute bottom-0 left-0 w-full z-[20] border-t border-[#4da6ff]/15"
          style={{
            background: "rgba(2,8,16,0.95)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center md:justify-between gap-6">
            {stats.map((s, i) => (
              <ZoomReveal key={i} delay={1320 + i * 80}>
                <div className="flex items-center gap-3">
                  <span className="text-[#4da6ff] text-2xl font-black">
                    {s.value}
                  </span>
                  <span className="text-white/55 text-sm uppercase tracking-widest">
                    {s.label}
                  </span>
                  {i < stats.length - 1 && (
                    <span className="hidden md:block w-px h-5 bg-[#4da6ff]/25 ml-3" />
                  )}
                </div>
              </ZoomReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHAT WE OFFER — HORIZONTAL SCROLL ═══════════════════════ */}
      <div ref={svcScrollRef} style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "#020810",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DrawLine color="rgba(77,166,255,0.25)" />

          {/* depth grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(77,166,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(77,166,255,0.03) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 pt-10 pb-8 w-full flex-shrink-0 relative">
            <div className="flex items-end justify-between gap-4">
              <div>
                <ZoomReveal>
                  <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-3">
                    <ScrambleText text="What We Offer" delay={100} />
                  </span>
                </ZoomReveal>
                <WipeText delay={120}>
                  <h2 className="text-white text-4xl font-black uppercase tracking-tight">
                    Training Programs
                  </h2>
                </WipeText>
              </div>
              <ZoomReveal delay={250}>
                <div className="flex items-center gap-2 text-white/35 text-xs uppercase tracking-widest pb-1">
                  <span>Scroll to explore</span>
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line" />
                  </span>
                </div>
              </ZoomReveal>
            </div>
          </div>

          {/* Horizontal cards track */}
          <div
            className="relative"
            style={{
              paddingLeft:
                "max(24px, calc((100vw - 1280px) / 2 + 24px))",
              overflow: "visible",
              flexShrink: 0,
            }}
          >
            <div
              ref={svcTrackRef}
              style={{ display: "flex", gap: "20px", willChange: "transform" }}
            >
              {services.map((svc, i) => (
                <div
                  key={svc.id}
                  style={{
                    minWidth: "clamp(320px, 28vw, 380px)",
                    flexShrink: 0,
                  }}
                >
                  <ZoomReveal delay={i * 70}>
                    <TiltCard intensity={6}>
                      <ServiceCard service={svc} />
                    </TiltCard>
                  </ZoomReveal>
                </div>
              ))}
              <div
                style={{
                  minWidth:
                    "max(24px, calc((100vw - 1280px) / 2 + 24px))",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>

          {/* Bottom draw line */}
          <div className="flex-shrink-0 px-6 pt-8 pb-4 max-w-7xl mx-auto w-full">
            <DrawLine color="rgba(77,166,255,0.12)" delay={400} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════ PHILOSOPHY ═══════════════════════════ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="absolute inset-0">
          <img
            src="https://assets.cdn.filesafe.space/oJ5frEp0oe5qkawU9xTd/media/677d6af9aa77f64ae439b80b.jpeg"
            alt="Training philosophy"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#020810]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020810] via-[#020810]/70 to-[#020810]/60" />
        </div>

        <div className="relative z-10">
          <DrawLine color="rgba(77,166,255,0.2)" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 mt-8">
          <div className="max-w-2xl">
            <ZoomReveal>
              <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">
                <ScrambleText text="Our Philosophy" delay={150} />
              </span>
            </ZoomReveal>
            <h2 className="text-white text-4xl md:text-5xl font-black uppercase leading-tight mb-6">
              <WipeText delay={80}>
                <span className="block">Ball Mastery.</span>
              </WipeText>
              <WipeText delay={260}>
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, #4da6ff, #1e6aff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Technical Excellence.
                </span>
              </WipeText>
              <WipeText delay={440}>
                <span className="block">Game Intelligence.</span>
              </WipeText>
            </h2>
            <WordReveal
              text="We believe confidence on the ball comes from repetition, precision, and a deep understanding of the game. Every session is designed to build real, transferable skills."
              className="text-white/55 text-lg leading-relaxed"
              delay={580}
              stagger={40}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0">
            {[
              "Ball Mastery",
              "Position-Specific Dev",
              "Movement & Awareness",
              "Confidence Building",
            ].map((item, i) => (
              <ZoomReveal key={item} delay={i * 110}>
                <div
                  className="border border-[#4da6ff]/20 rounded-xl p-5 flex items-start gap-3 hover:border-[#4da6ff]/50 transition-colors"
                  style={{ background: "rgba(77,166,255,0.05)" }}
                >
                  <span className="text-[#4da6ff] mt-0.5 text-lg w-5 h-5 flex items-center justify-center">
                    <i className="ri-checkbox-circle-line" />
                  </span>
                  <span className="text-white text-sm font-semibold leading-snug">
                    {item}
                  </span>
                </div>
              </ZoomReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ TESTIMONIALS — GRID ═══════════════════════════ */}
      <section
        className="py-28 px-6"
        style={{ position: "relative", zIndex: 10, background: "#040c18" }}
      >
        <DrawLine color="rgba(77,166,255,0.2)" />
        <div className="max-w-7xl mx-auto mt-16">
          <div className="text-center mb-16">
            <ZoomReveal>
              <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">
                <ScrambleText text="Player Results" delay={100} />
              </span>
            </ZoomReveal>
            <WipeText delay={120}>
              <h2 className="text-white text-5xl font-black uppercase tracking-tight mb-4">
                What Our Clients Say
              </h2>
            </WipeText>
            <div className="flex items-center justify-center gap-2 mb-3">
              {[1,2,3,4,5].map((s) => (
                <span key={s} className="text-[#4da6ff] text-xl w-5 h-5 flex items-center justify-center">
                  <i className="ri-star-fill" />
                </span>
              ))}
              <span className="text-white font-black text-xl ml-2">5.00</span>
              <span className="text-white/40 text-sm ml-1">· 14 reviews</span>
            </div>
            <WordReveal
              text="Real clients, real results — every review is 100% verified"
              className="text-white/50 text-lg"
              delay={300}
              stagger={60}
            />
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {testimonials.map((t, i) => (
              <ZoomReveal key={t.id} delay={i * 70}>
                <TestimonialCard testimonial={t} />
              </ZoomReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{
          position: "relative",
          zIndex: 10,
          background:
            "linear-gradient(135deg, #0a1f4e 0%, #081530 50%, #020810 100%)",
          borderTop: "1px solid rgba(77,166,255,0.2)",
        }}
      >
        <DrawLine color="rgba(77,166,255,0.35)" />

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(77,166,255,0.14) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: 0.07 }}
        >
          {[320, 520, 720].map((sz) => (
            <div
              key={sz}
              className="absolute rounded-full border border-[#4da6ff]"
              style={{
                width: sz,
                height: sz,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
          <div className="max-w-xl">
            <ZoomReveal>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 text-[#4da6ff]"
                style={{
                  background: "rgba(77,166,255,0.1)",
                  border: "1px solid rgba(77,166,255,0.3)",
                }}
              >
                Limited Spots Available
              </span>
            </ZoomReveal>
            <WipeText delay={120}>
              <h2 className="text-white text-4xl md:text-5xl font-black uppercase leading-tight mb-4">
                Ready to Level Up Your Game?
              </h2>
            </WipeText>
            <WordReveal
              text="Start your journey with a free consultation. No commitment required."
              className="text-white/55 text-lg"
              delay={320}
              stagger={52}
            />
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <MagneticButton>
              <Link
                to="/book"
                className="font-black uppercase tracking-widest px-10 py-4 rounded-full text-sm transition-all whitespace-nowrap text-center cursor-pointer text-white"
                style={{
                  background: "linear-gradient(135deg, #1e6aff, #4da6ff)",
                  boxShadow: "0 0 25px rgba(77,166,255,0.35)",
                  display: "block",
                }}
              >
                Book Training Now <i className="ri-arrow-right-line ml-2" />
              </Link>
            </MagneticButton>
            <ZoomReveal delay={330}>
              <Link
                to="/about"
                className="border-2 border-white/25 text-white font-bold uppercase tracking-widest px-10 py-4 rounded-full text-sm hover:border-[#4da6ff] hover:text-[#4da6ff] transition-colors whitespace-nowrap text-center cursor-pointer"
              >
                Learn About Us
              </Link>
            </ZoomReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Default export: Builder first, custom fallback ──────────────────────────
export default function HomePage() {
  const isPreviewing = useIsPreviewing();
  const [builderContent, setBuilderContent] = useState<unknown>(undefined);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    builder
      .get("page", { url: "/" })
      .toPromise()
      .then((res) => {
        setBuilderContent(res ?? null);
        setChecked(true);
      })
      .catch(() => {
        setBuilderContent(null);
        setChecked(true);
      });
  }, []);

  // Still fetching
  if (!checked && !isPreviewing) {
    return <CustomHome />;
  }

  // Builder has content or we're in visual preview
  if (builderContent || isPreviewing) {
    return (
      <BuilderComponent
        model="page"
        content={builderContent as Record<string, unknown>}
      />
    );
  }

  // No Builder content — use our custom page
  return <CustomHome />;
}
