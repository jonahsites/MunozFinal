import { useEffect, useState } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "../../lib/builder";
import { Link } from "react-router-dom";
import { ScrambleText, WipeText, WordReveal, DrawLine, ZoomReveal } from "../../components/feature/Animations";

const values = [
  { icon: "ri-trophy-line", title: "Excellence First", desc: "We hold every player to a high standard because we believe they\'re capable of more than they know." },
  { icon: "ri-heart-pulse-line", title: "Passion Driven", desc: "Soccer isn\'t just a job to us — it\'s a lifelong passion that fuels every training session we run." },
  { icon: "ri-parent-line", title: "Family Culture", desc: "We treat every player like family. The support, care, and accountability go beyond the field." },
  { icon: "ri-focus-line", title: "Detail Oriented", desc: "The smallest details separate good players from great ones. We obsess over them so you can master them." },
];

const timeline = [
  { year: "2019", event: "Founded 3 Coach Munoz, starting with individual training in local parks" },
  { year: "2020", event: "Expanded to group training programs, serving 50+ players" },
  { year: "2021", event: "Launched team training packages for local club teams" },
  { year: "2022", event: "Introduced match analysis and video breakdown services" },
  { year: "2023", event: "Online training program launched, reaching players nationwide" },
  { year: "2024", event: "500+ players trained, 50+ teams worked with" },
];

function CustomAboutPage() {
  return (
    <main className="bg-[#020810] min-h-screen pt-20">

      {/* ═══ HERO ═══ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://assets.cdn.filesafe.space/oJ5frEp0oe5qkawU9xTd/media/67746a139be26baf9a4ca843.jpeg"
            alt="About Coach Munoz"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020810]/97 via-[#020810]/80 to-[#020810]/55" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2060]/30 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ZoomReveal delay={100}>
            <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">Our Story</span>
          </ZoomReveal>

          <h1 className="font-black uppercase leading-none mb-6" style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-1px" }}>
            <WipeText delay={200}>
              <span className="block text-white">Family-Run.</span>
            </WipeText>
            <WipeText delay={380}>
              <span
                className="block"
                style={{ background: "linear-gradient(135deg, #4da6ff, #1e6aff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Passion-Driven.
              </span>
            </WipeText>
            <WipeText delay={560}>
              <span className="block text-white">Player-Focused.</span>
            </WipeText>
          </h1>

          <WordReveal
            text="Since 2019, the Munoz family has been on a mission to develop soccer players from the ground up — with technical precision, personal care, and a genuine love for the game."
            className="text-white/60 text-xl max-w-xl leading-relaxed"
            delay={780}
            stagger={38}
          />
        </div>
      </section>

      {/* ═══ STORY + MISSION ═══ */}
      <section className="py-24 px-6" style={{ position: "relative", zIndex: 10, background: "#020810" }}>
        <DrawLine color="rgba(77,166,255,0.22)" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
          {/* Images collage */}
          <ZoomReveal>
            <div className="relative h-[500px]">
              <img
                src="https://assets.cdn.filesafe.space/oJ5frEp0oe5qkawU9xTd/media/677469402ec4ebe45b5fb26e.jpeg"
                alt="Coaching moment"
                className="absolute top-0 left-0 w-4/5 h-72 object-cover object-top rounded-2xl border-4 border-[#020810]"
              />
              <img
                src="https://assets.cdn.filesafe.space/oJ5frEp0oe5qkawU9xTd/media/67746a9fc7fbee51d33e3572.jpeg"
                alt="Team celebration"
                className="absolute bottom-0 right-0 w-3/5 h-56 object-cover object-top rounded-2xl border-4 border-[#020810]"
              />
              <div
                className="absolute top-1/2 right-0 -translate-y-1/2 p-6 rounded-2xl text-center w-28"
                style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)", boxShadow: "0 0 30px rgba(77,166,255,0.4)" }}
              >
                <span className="text-white text-3xl font-black block">6+</span>
                <span className="text-white/75 text-xs font-bold uppercase tracking-wide">Years of Excellence</span>
              </div>
            </div>
          </ZoomReveal>

          {/* Content */}
          <div>
            <ZoomReveal>
              <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">
                <ScrambleText text="About Coach Munoz" delay={100} />
              </span>
            </ZoomReveal>
            <WipeText delay={120}>
              <h2 className="text-white text-4xl font-black uppercase leading-tight mb-6">
                Built on a Lifelong Love of the Beautiful Game
              </h2>
            </WipeText>
            <WordReveal
              text="3 Coach Munoz was born out of a simple belief: every player deserves coaching that actually develops them. As a family of lifelong soccer players, we saw too many young athletes being taught drills without understanding — mechanics without purpose."
              className="text-white/60 leading-relaxed mb-6"
              delay={250}
              stagger={35}
            />
            <WordReveal
              text="Since founding in 2019, we've worked with over 500 players ranging from absolute beginners to competitive youth club athletes. Our approach is direct, technical, and deeply personal — because we know that real improvement requires a coach who actually knows and cares about the player."
              className="text-white/60 leading-relaxed mb-8"
              delay={400}
              stagger={30}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "Our Mission", text: "Teach, develop, and improve players\' skills and abilities — turning raw talent into technical, confident ability." },
                { label: "Our Vision", text: "Turn raw talent into controlled, technical ability — helping every player take their game to the next level." },
              ].map((item, i) => (
                <ZoomReveal key={item.label} delay={i * 100}>
                  <div className="border border-[#4da6ff]/20 rounded-xl p-6" style={{ background: "rgba(77,166,255,0.05)" }}>
                    <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-widest block mb-3">{item.label}</span>
                    <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </ZoomReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-24 px-6 bg-[#040c18]" style={{ position: "relative", zIndex: 10 }}>
        <DrawLine color="rgba(77,166,255,0.2)" />

        <div className="max-w-7xl mx-auto mt-16">
          <div className="text-center mb-16">
            <ZoomReveal>
              <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">
                <ScrambleText text="What Drives Us" delay={100} />
              </span>
            </ZoomReveal>
            <WipeText delay={150}>
              <h2 className="text-white text-5xl font-black uppercase tracking-tight mb-4">Our Core Values</h2>
            </WipeText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ZoomReveal key={v.title} delay={i * 100}>
                <div
                  className="border border-white/10 rounded-2xl p-8 text-center hover:border-[#4da6ff]/35 transition-colors"
                  style={{ background: "#0a1628" }}
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-5 text-[#4da6ff] text-2xl"
                    style={{ background: "rgba(77,166,255,0.1)" }}
                  >
                    <i className={v.icon} />
                  </div>
                  <h3 className="text-white text-lg font-black uppercase mb-3">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ZoomReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="py-24 px-6" style={{ position: "relative", zIndex: 10, background: "#020810" }}>
        <DrawLine color="rgba(77,166,255,0.2)" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
          <div>
            <ZoomReveal>
              <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">
                <ScrambleText text="Training Philosophy" delay={100} />
              </span>
            </ZoomReveal>
            <WipeText delay={150}>
              <h2 className="text-white text-4xl font-black uppercase leading-tight mb-6">
                We Build{" "}
                <span
                  style={{ background: "linear-gradient(135deg, #4da6ff, #1e6aff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  Complete Players
                </span>
                , Not Just Skilled Ones
              </h2>
            </WipeText>
            <WordReveal
              text="Technical ability without game intelligence is incomplete. Our philosophy bridges the gap — developing ball mastery, positional awareness, movement patterns, and mental clarity simultaneously."
              className="text-white/60 leading-relaxed mb-8"
              delay={280}
              stagger={35}
            />
            <div className="flex flex-col gap-4">
              {[
                { title: "Ball Mastery", desc: "Control the ball in any situation, under any pressure" },
                { title: "Position-Specific Development", desc: "Master the demands and movements of your role" },
                { title: "Movement & Awareness", desc: "Read the game before the play develops" },
                { title: "Confidence Building", desc: "Perform at your best when it matters most" },
              ].map((p, i) => (
                <ZoomReveal key={p.title} delay={i * 90}>
                  <div className="flex items-start gap-4">
                    <span
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-white text-sm shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)" }}
                    >
                      <i className="ri-check-line" />
                    </span>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{p.title}</h4>
                      <p className="text-white/50 text-sm">{p.desc}</p>
                    </div>
                  </div>
                </ZoomReveal>
              ))}
            </div>
          </div>

          <ZoomReveal delay={200} className="relative h-[480px] rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 60px rgba(77,166,255,0.15)" }}>
            <img
              src="https://assets.cdn.filesafe.space/oJ5frEp0oe5qkawU9xTd/media/677d6ab044e04aaa1c0a405a.jpeg"
              alt="Training philosophy"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020810] via-transparent to-transparent" />
          </ZoomReveal>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-24 px-6 bg-[#040c18]" style={{ position: "relative", zIndex: 10 }}>
        <DrawLine color="rgba(77,166,255,0.2)" />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-16">
            <ZoomReveal>
              <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">
                <ScrambleText text="Our Journey" delay={100} />
              </span>
            </ZoomReveal>
            <WipeText delay={150}>
              <h2 className="text-white text-5xl font-black uppercase tracking-tight">Built Year by Year</h2>
            </WipeText>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#4da6ff]/20" />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <ZoomReveal key={item.year} delay={i * 90}>
                  <div className="flex items-start gap-8 pl-16 relative">
                    <div
                      className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center rounded-full text-white font-black text-xs shrink-0"
                      style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)", boxShadow: "0 0 16px rgba(77,166,255,0.4)" }}
                    >
                      {item.year.slice(2)}
                    </div>
                    <div className="border border-white/10 rounded-xl p-5 flex-1" style={{ background: "#0a1628" }}>
                      <p className="text-white/70 text-sm leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                </ZoomReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{
          position: "relative",
          zIndex: 10,
          background: "linear-gradient(135deg, #0a1f4e 0%, #081530 50%, #020810 100%)",
          borderTop: "1px solid rgba(77,166,255,0.2)",
        }}
      >
        <DrawLine color="rgba(77,166,255,0.35)" />

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(77,166,255,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center mt-12">
          <WipeText delay={100}>
            <h2 className="text-white text-5xl font-black uppercase leading-tight mb-4">
              Ready to Be Part of the Story?
            </h2>
          </WipeText>
          <WordReveal
            text="Join the hundreds of players who have already taken their game to the next level with Coach Munoz."
            className="text-white/55 text-xl mb-10"
            delay={300}
            stagger={48}
          />
          <ZoomReveal delay={500}>
            <Link
              to="/services"
              className="inline-block font-black uppercase tracking-widest px-10 py-4 rounded-full text-sm transition-all whitespace-nowrap cursor-pointer text-white"
              style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)", boxShadow: "0 0 30px rgba(77,166,255,0.4)" }}
            >
              Explore Our Programs <i className="ri-arrow-right-line ml-2" />
            </Link>
          </ZoomReveal>
        </div>
      </section>
    </main>
  );
}

// ─── Builder-powered About ────────────────────────────────────────────────────
export default function AboutPage() {
  const isPreviewing = useIsPreviewing();
  const [builderContent, setBuilderContent] = useState<unknown>(undefined);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    builder
      .get("page", { url: "/about" })
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

  if (!checked && !isPreviewing) return <CustomAboutPage />;

  if (builderContent || isPreviewing) {
    return (
      <BuilderComponent
        model="page"
        content={builderContent as Record<string, unknown>}
      />
    );
  }

  return <CustomAboutPage />;
}
