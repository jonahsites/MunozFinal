import { useEffect, useState } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "../../lib/builder";
import BookingModal from "./components/BookingModal";
import { ScrambleText, WipeText, WordReveal, DrawLine, ZoomReveal } from "../../components/feature/Animations";

const onlinePlans = [
  {
    id: "match-focus",
    icon: "ri-search-eye-line",
    title: "Match Focus Plan",
    price: "$80 USD",
    description: "Single match analysis focused on tactical, technical, decision-making, and positional insight.",
    subDesc: "Includes a comprehensive PDF report delivered via email.",
    features: [
      "In-possession and out-of-possession analysis",
      "Position profile: role, traits, physical and technical aspects",
      "Full match breakdown with minute-by-minute analysis",
      "Clips and annotations highlighting key coaching points",
      "Diagrams for better understanding of tactical concepts",
    ],
    highlighted: false,
  },
  {
    id: "match-breakdown",
    icon: "ri-movie-2-line",
    title: "Match Breakdown Plan",
    price: "$100 USD",
    description: "Single match analysis with a deeper dive into feedback and coaching points.",
    subDesc: "Includes a 45-minute video call to review match details, coaching points, and answer player\u2019s questions.",
    features: [
      "45-minute video call to review match details and coaching points",
      "Comprehensive PDF report delivered via email",
      "In-possession and out-of-possession analysis",
      "Full match breakdown with minute-by-minute analysis",
      "Clips and annotations highlighting key coaching points",
      "Diagrams for better understanding of tactical concepts",
    ],
    highlighted: false,
  },
  {
    id: "consistent-growth",
    icon: "ri-line-chart-line",
    title: "Consistent Growth Plan",
    price: "$180 USD",
    description: "Two matches analyzed per month, building on insights from each match.",
    subDesc: "Includes two 45-minute video calls to provide feedback, review coaching points, and track progress.",
    features: [
      "Two matches analyzed per month",
      "Two 45-minute video calls",
      "Comprehensive PDF reports for both matches",
      "In-possession and out-of-possession analysis",
      "Full match breakdown with minute-by-minute analysis",
      "Diagrams for better understanding of tactical concepts",
    ],
    highlighted: true,
  },
  {
    id: "elite-performance",
    icon: "ri-award-line",
    title: "Elite Performance Plan",
    price: "$250 USD",
    description: "Three matches analyzed per month for players committed to maximizing their development.",
    subDesc: "Includes three 45-minute video calls, building on progress from each match.",
    features: [
      "Three matches analyzed per month",
      "Three 45-minute video calls",
      "Comprehensive PDF reports for all matches",
      "In-possession and out-of-possession analysis",
      "Full match breakdown with minute-by-minute analysis",
      "Diagrams for better understanding of tactical concepts",
    ],
    highlighted: false,
  },
];

const inPersonPlans = [
  {
    id: "kickoff",
    tier: "Basic",
    title: "Kickoff Plan",
    price: "$75 USD",
    tagline: "Perfect for a quick and focused assessment",
    features: [
      "One-time training session lasting 60 minutes",
      "Training tailored to individual needs",
      "Focus on passing, receiving, dribbling, ball mastery, finishing, and technique",
      "Detailed evaluation highlighting strengths and areas for growth",
      "Personalized feedback on key areas for improvement",
    ],
    highlighted: false,
  },
  {
    id: "goal-getter",
    tier: "Premium",
    title: "Goal Getter Plan",
    price: "$150 USD",
    tagline: "Designed for players seeking consistent training",
    features: [
      "4 training sessions within 30 days (one session per week)",
      "Each session lasting 60 minutes",
      "Sessions build on the previous, targeting specific improvements",
      "Develops stronger technical abilities and tactical awareness",
      "Reinforces positive habits for success on the field",
    ],
    highlighted: true,
  },
  {
    id: "pro-performance",
    tier: "Elite",
    title: "Pro Performance Plan",
    price: "$200 USD",
    tagline: "Ideal for players committed to elevating their game to the next level",
    features: [
      "8 training sessions within 30 days (two sessions per week)",
      "Each session lasting 60 minutes",
      "Physical and mental preparation included",
      "Guidance on warm-ups and individual practice routines",
      "Tools for sustained improvement both on and off the field",
    ],
    highlighted: false,
  },
];

function CustomServicesPage() {
  const [bookingService, setBookingService] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  const openBooking = (serviceName: string) => {
    setBookingService(serviceName);
    setModalOpen(true);
  };

  return (
    <main className="bg-[#020810] min-h-screen pt-20">

      {/* ═══ HERO ═══ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://assets.cdn.filesafe.space/oJ5frEp0oe5qkawU9xTd/media/67746a139be26baf9a4ca843.jpeg"
            alt="Services"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#020810]/82" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2060]/25 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <ZoomReveal delay={100}>
            <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">
              <ScrambleText text="What We Offer" delay={150} />
            </span>
          </ZoomReveal>

          <WipeText delay={300}>
            <h1
              className="text-white font-black uppercase leading-none mb-6"
              style={{ fontSize: "clamp(40px, 7vw, 90px)", letterSpacing: "-1px" }}
            >
              Training{" "}
              <span
                style={{ background: "linear-gradient(135deg, #4da6ff, #1e6aff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Programs
              </span>
            </h1>
          </WipeText>

          <WordReveal
            text="Elite online analysis and in-person training designed to sharpen every aspect of your game"
            className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed"
            delay={550}
            stagger={38}
          />
        </div>
      </section>

      {/* ═══ ONLINE TRAINING ═══ */}
      <section className="py-24 px-6" style={{ position: "relative", zIndex: 10, background: "#020810" }}>
        <DrawLine color="rgba(77,166,255,0.22)" />

        <div className="max-w-7xl mx-auto mt-16">
          <div className="text-center mb-16">
            <ZoomReveal>
              <span className="inline-block text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] px-4 py-2 rounded-full mb-4" style={{ background: "rgba(77,166,255,0.08)", border: "1px solid rgba(77,166,255,0.2)" }}>
                <ScrambleText text="Online" delay={100} />
              </span>
            </ZoomReveal>
            <WipeText delay={150}>
              <h2 className="text-white text-5xl font-black uppercase tracking-tight mb-4">Online Training Plans</h2>
            </WipeText>
            <WordReveal
              text="In-depth match analysis delivered to you anywhere in the world"
              className="text-white/50 text-lg"
              delay={300}
              stagger={50}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {onlinePlans.map((plan, i) => (
              <ZoomReveal key={plan.id} delay={i * 90}>
                <div
                  className="rounded-2xl p-8 flex flex-col border h-full"
                  style={
                    plan.highlighted
                      ? { background: "linear-gradient(145deg, #0f2a6e, #0a1e52)", borderColor: "rgba(77,166,255,0.5)", boxShadow: "0 0 40px rgba(77,166,255,0.15)" }
                      : { background: "#061020", borderColor: "rgba(255,255,255,0.08)" }
                  }
                >
                  {plan.highlighted && (
                    <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 self-start" style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)", color: "white" }}>
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-xl text-[#4da6ff] text-xl shrink-0"
                      style={{ background: "rgba(77,166,255,0.1)" }}
                    >
                      <i className={plan.icon} />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-black uppercase leading-tight">{plan.title}</h3>
                      <span className="text-[#4da6ff] text-lg font-black">{plan.price}</span>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed mb-2">{plan.description}</p>
                  <p className="text-white/40 text-sm leading-relaxed mb-6 italic">{plan.subDesc}</p>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-white/70 text-sm">
                        <span
                          className="w-5 h-5 flex items-center justify-center rounded text-white text-xs shrink-0 mt-0.5"
                          style={plan.highlighted ? { background: "linear-gradient(135deg, #1e6aff, #4da6ff)" } : { background: "rgba(77,166,255,0.15)" }}
                        >
                          <i className="ri-check-line" style={{ color: plan.highlighted ? "white" : "#4da6ff" }} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openBooking(plan.title)}
                    className="font-black uppercase tracking-widest px-6 py-3 rounded-full text-sm transition-all cursor-pointer whitespace-nowrap text-white"
                    style={
                      plan.highlighted
                        ? { background: "linear-gradient(135deg, #1e6aff, #4da6ff)", boxShadow: "0 0 20px rgba(77,166,255,0.4)" }
                        : { background: "rgba(77,166,255,0.12)", border: "1px solid rgba(77,166,255,0.3)", color: "#4da6ff" }
                    }
                  >
                    Buy Now <i className="ri-arrow-right-line ml-2" />
                  </button>
                </div>
              </ZoomReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IN-PERSON TRAINING ═══ */}
      <section className="py-24 px-6 bg-[#040c18]" style={{ position: "relative", zIndex: 10 }}>
        <DrawLine color="rgba(77,166,255,0.2)" />

        <div className="max-w-7xl mx-auto mt-16">
          <div className="text-center mb-16">
            <ZoomReveal>
              <span className="inline-block text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] px-4 py-2 rounded-full mb-4" style={{ background: "rgba(77,166,255,0.08)", border: "1px solid rgba(77,166,255,0.2)" }}>
                <ScrambleText text="In-Person" delay={100} />
              </span>
            </ZoomReveal>
            <WipeText delay={150}>
              <h2 className="text-white text-5xl font-black uppercase tracking-tight mb-4">
                Affordable Pricing Plans<br />
                <span style={{ background: "linear-gradient(135deg, #4da6ff, #1e6aff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Tailored for You
                </span>
              </h2>
            </WipeText>
            <WordReveal
              text="One-on-one in-person sessions designed around your individual development"
              className="text-white/50 text-lg"
              delay={300}
              stagger={50}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inPersonPlans.map((plan, i) => (
              <ZoomReveal key={plan.id} delay={i * 100}>
                <div
                  className="rounded-2xl p-8 flex flex-col border h-full"
                  style={
                    plan.highlighted
                      ? { background: "linear-gradient(145deg, #0f2a6e, #0a1e52)", borderColor: "rgba(77,166,255,0.5)", boxShadow: "0 0 40px rgba(77,166,255,0.2)" }
                      : { background: "#0a1628", borderColor: "rgba(255,255,255,0.1)" }
                  }
                >
                  <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[4px] block mb-2">{plan.tier}</span>
                  <h3 className="text-white text-2xl font-black uppercase mb-1">{plan.title}</h3>
                  <span className="text-[#4da6ff] text-xl font-black block mb-2">{plan.price}</span>
                  <p className="text-white/50 text-sm mb-6 italic">{plan.tagline}</p>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/65">
                        <span
                          className="w-5 h-5 flex items-center justify-center rounded text-white text-xs shrink-0 mt-0.5"
                          style={plan.highlighted ? { background: "linear-gradient(135deg, #1e6aff, #4da6ff)" } : { background: "rgba(77,166,255,0.15)" }}
                        >
                          <i className="ri-check-line" style={{ color: plan.highlighted ? "white" : "#4da6ff" }} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openBooking(plan.title)}
                    className="font-black uppercase tracking-widest px-6 py-3 rounded-full text-sm transition-all cursor-pointer whitespace-nowrap text-white"
                    style={
                      plan.highlighted
                        ? { background: "linear-gradient(135deg, #1e6aff, #4da6ff)", boxShadow: "0 0 20px rgba(77,166,255,0.4)" }
                        : { background: "rgba(77,166,255,0.12)", border: "1px solid rgba(77,166,255,0.3)", color: "#4da6ff" }
                    }
                  >
                    Book Now <i className="ri-arrow-right-line ml-2" />
                  </button>
                </div>
              </ZoomReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 px-6" style={{ position: "relative", zIndex: 10, background: "#020810" }}>
        <DrawLine color="rgba(77,166,255,0.2)" />

        <div className="max-w-3xl mx-auto mt-16">
          <div className="text-center mb-16">
            <ZoomReveal>
              <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] block mb-4">
                <ScrambleText text="Questions" delay={100} />
              </span>
            </ZoomReveal>
            <WipeText delay={150}>
              <h2 className="text-white text-5xl font-black uppercase tracking-tight">FAQ</h2>
            </WipeText>
          </div>

          {[
            { q: "What age groups do you train?", a: "We train players of all ages — from youth beginners (U8+) all the way to adult recreational and competitive players. Every session is adapted to the player\'s current level and age." },
            { q: "How does online match analysis work?", a: "You submit your match footage, and we analyze it thoroughly based on your chosen plan. You\'ll receive a detailed PDF report via email, and depending on your plan, a video call to walk through all the coaching points together." },
            { q: "Where do in-person training sessions take place?", a: "Sessions are conducted at local fields in our area. Contact us for specific locations and availability. We\'ll always confirm the venue when booking." },
            { q: "How long does it take to receive my match analysis?", a: "Typically within 48-72 hours after submitting your footage. We take time to be thorough — your report and video call (if included) will be detailed and actionable." },
            { q: "How do I get started?", a: "Simply click \'Buy Now\' or \'Book Now\' on your chosen plan, fill out the form, and we\'ll reach out within 24 hours to confirm everything and get you started. Simple as that." },
          ].map((faq, i) => (
            <ZoomReveal key={i} delay={i * 70}>
              <details className="group border-b border-white/10 py-6">
                <summary className="flex items-center justify-between cursor-pointer text-white font-bold text-lg list-none">
                  {faq.q}
                  <span className="text-[#4da6ff] text-xl w-6 h-6 flex items-center justify-center group-open:rotate-45 transition-transform duration-200">
                    <i className="ri-add-line" />
                  </span>
                </summary>
                <p className="text-white/50 text-sm leading-relaxed mt-4">{faq.a}</p>
              </details>
            </ZoomReveal>
          ))}
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
              Your Next Level Starts Now
            </h2>
          </WipeText>
          <WordReveal
            text="Don\u2019t wait for the perfect time. The best time to level up is today."
            className="text-white/55 text-xl mb-10"
            delay={300}
            stagger={50}
          />
          <ZoomReveal delay={480}>
            <button
              onClick={() => openBooking("General")}
              className="inline-block font-black uppercase tracking-widest px-10 py-4 rounded-full text-sm transition-all whitespace-nowrap cursor-pointer text-white"
              style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)", boxShadow: "0 0 30px rgba(77,166,255,0.4)" }}
            >
              Get Started Today <i className="ri-arrow-right-line ml-2" />
            </button>
          </ZoomReveal>
        </div>
      </section>

      {modalOpen && (
        <BookingModal serviceName={bookingService} onClose={() => setModalOpen(false)} />
      )}
    </main>
  );
}

// ─── Builder-powered Services ─────────────────────────────────────────────────────
export default function ServicesPage() {
  const isPreviewing = useIsPreviewing();
  const [builderContent, setBuilderContent] = useState<unknown>(undefined);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    builder
      .get("page", { url: "/services" })
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

  if (!checked && !isPreviewing) return <CustomServicesPage />;

  if (builderContent || isPreviewing) {
    return (
      <BuilderComponent
        model="page"
        content={builderContent as Record<string, unknown>}
      />
    );
  }

  return <CustomServicesPage />;
}
