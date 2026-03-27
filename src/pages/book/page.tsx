import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { services } from "../../mocks/siteData";
import { WipeText, WordReveal, ZoomReveal, DrawLine, ScrambleText, SplitLetters, MagneticButton, TiltCard } from "../../components/feature/Animations";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "../../lib/builder";

type Step = 1 | 2 | 3 | "done";

interface FormData {
  service: string;
  sessionType: string;
  sessionSize: string;
  availability: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  level: string;
  message: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function CustomBookPage() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    service: "",
    sessionType: "in-person",
    sessionSize: "individual",
    availability: [],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    level: "",
    message: "",
  });

  const update = (key: keyof FormData, value: string | string[]) => setFormData((p) => ({ ...p, [key]: value }));

  const toggleDay = (day: string) => {
    setFormData((p) => ({
      ...p,
      availability: p.availability.includes(day) ? p.availability.filter((d) => d !== day) : [...p.availability, day],
    }));
  };

  const canNext = () => {
    if (step === 1) return formData.service !== "";
    if (step === 2) return formData.sessionType !== "" && formData.sessionSize !== "";
    if (step === 3) return formData.firstName !== "" && formData.lastName !== "" && formData.email !== "" && formData.level !== "" && message.length <= 500;
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const body = new URLSearchParams();
    body.append("service", formData.service);
    body.append("session_type", formData.sessionType);
    body.append("session_size", formData.sessionSize);
    body.append("availability", formData.availability.join(", ") || "Flexible");
    body.append("first_name", formData.firstName);
    body.append("last_name", formData.lastName);
    body.append("email", formData.email);
    body.append("phone", formData.phone);
    body.append("player_level", formData.level);
    body.append("message", message);
    try {
      await fetch("https://readdy.ai/api/form/d70qc3j2m2156g4s71t0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // silent
    } finally {
      setLoading(false);
      setStep("done");
    }
  };

  const inputCls = "w-full border text-white placeholder-white/30 px-4 py-3 rounded-lg text-sm focus:outline-none";
  const inputStyle = { background: "rgba(77,166,255,0.05)", borderColor: "rgba(255,255,255,0.12)" };
  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      (e.target as HTMLElement).style.borderColor = "rgba(77,166,255,0.6)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
    },
  };

  return (
    <main className="bg-[#020810] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=closeup%20soccer%20cleat%20laces%20on%20green%20grass%20field%20dark%20navy%20moody%20cinematic%20background%20dramatic%20lighting%20minimal%20professional%20sports%20elegant%20dark%20blue%20atmosphere&width=1920&height=700&seq=bookHero1&orientation=landscape"
            alt="Book Training"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#020810]/88" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020810] via-transparent to-[#020810]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ZoomReveal delay={100}>
            <span className="inline-block text-[#4da6ff] text-xs font-bold uppercase tracking-[5px] mb-6 px-5 py-2 rounded-full" style={{ background: "rgba(77,166,255,0.08)", border: "1px solid rgba(77,166,255,0.2)" }}>
              <ScrambleText text="3-Step Booking" delay={300} />
            </span>
          </ZoomReveal>
          <WipeText delay={320}>
            <h1 className="text-white font-black uppercase leading-none mb-5" style={{ fontSize: "clamp(44px, 8vw, 96px)", letterSpacing: "-2px" }}>
              Book Your{" "}
              <span style={{ background: "linear-gradient(135deg, #60c8ff 0%, #4da6ff 40%, #1e6aff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Session
              </span>
            </h1>
          </WipeText>
          <WordReveal
            text="Choose your program, set your preferences, and submit your details. We'll confirm within 24 hours."
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
            delay={560}
            stagger={38}
          />
        </div>
      </section>

      {/* ─── STEPPER + CONTENT ─── */}
      {step !== "done" ? (
        <section className="py-16 px-6" style={{ position: "relative", zIndex: 10 }}>
          <div className="max-w-5xl mx-auto">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-0 mb-16">
              {[1, 2, 3].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500"
                      style={
                        step === s
                          ? { background: "linear-gradient(135deg, #1e6aff, #4da6ff)", color: "white", boxShadow: "0 0 20px rgba(77,166,255,0.5)" }
                          : (step as number) > s
                          ? { background: "rgba(77,166,255,0.2)", color: "#4da6ff", border: "1px solid rgba(77,166,255,0.5)" }
                          : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.12)" }
                      }
                    >
                      {(step as number) > s ? <i className="ri-check-line" /> : s}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: step === s ? "#4da6ff" : "rgba(255,255,255,0.35)" }}>
                      {s === 1 ? "Program" : s === 2 ? "Details" : "Your Info"}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="w-24 mx-2 mb-5" style={{ height: 1, background: (step as number) > s ? "rgba(77,166,255,0.5)" : "rgba(255,255,255,0.1)" }} />
                  )}
                </div>
              ))}
            </div>

            {/* ── STEP 1: Program ── */}
            {step === 1 && (
              <div>
                <WipeText delay={0}>
                  <h2 className="text-white text-3xl font-black uppercase mb-2 text-center">Choose Your Program</h2>
                </WipeText>
                <WordReveal text="Select the training format that best fits your goals." className="text-white/50 text-center mb-10" delay={200} stagger={45} />
                <DrawLine color="rgba(77,166,255,0.2)" delay={300} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                  {services.map((svc, i) => (
                    <ZoomReveal key={svc.id} delay={i * 80}>
                      <TiltCard intensity={8}>
                        <button
                          onClick={() => update("service", svc.title)}
                          className="w-full text-left rounded-2xl p-6 border transition-all duration-300 cursor-pointer"
                          style={
                            formData.service === svc.title
                              ? { background: "linear-gradient(145deg, #0f2a6e, #0a1e52)", borderColor: "rgba(77,166,255,0.6)", boxShadow: "0 0 30px rgba(77,166,255,0.2)" }
                              : { background: "#061020", borderColor: "rgba(255,255,255,0.1)" }
                          }
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-11 h-11 flex items-center justify-center rounded-xl text-[#4da6ff] text-xl shrink-0" style={{ background: "rgba(77,166,255,0.12)" }}>
                              <i className={svc.icon} />
                            </div>
                            {formData.service === svc.title && (
                              <div className="ml-auto w-6 h-6 flex items-center justify-center rounded-full text-white text-xs" style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)" }}>
                                <i className="ri-check-line" />
                              </div>
                            )}
                          </div>
                          <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-widest block mb-1">{svc.tagline}</span>
                          <h3 className="text-white text-xl font-black uppercase mb-2">{svc.title}</h3>
                          <p className="text-white/45 text-xs leading-relaxed line-clamp-2">{svc.description}</p>
                        </button>
                      </TiltCard>
                    </ZoomReveal>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 2: Session Details ── */}
            {step === 2 && (
              <div>
                <WipeText delay={0}>
                  <h2 className="text-white text-3xl font-black uppercase mb-2 text-center">Session Details</h2>
                </WipeText>
                <WordReveal text="Tell us how you'd like to train and when you're available." className="text-white/50 text-center mb-10" delay={200} stagger={45} />
                <DrawLine color="rgba(77,166,255,0.2)" delay={300} />

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Session Type */}
                  <ZoomReveal delay={100}>
                    <div className="rounded-2xl p-6 border" style={{ background: "#061020", borderColor: "rgba(255,255,255,0.1)" }}>
                      <h3 className="text-white font-black uppercase text-sm tracking-widest mb-5 flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center text-[#4da6ff]"><i className="ri-map-pin-line" /></span>
                        Training Location
                      </h3>
                      <div className="flex flex-col gap-3">
                        {[{ id: "in-person", label: "In-Person", sub: "Local field sessions", icon: "ri-map-2-line" }, { id: "online", label: "Online / Remote", sub: "Live video coaching", icon: "ri-global-line" }].map((opt) => (
                          <button key={opt.id} onClick={() => update("sessionType", opt.id)} className="flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer text-left"
                            style={formData.sessionType === opt.id ? { background: "rgba(77,166,255,0.1)", borderColor: "rgba(77,166,255,0.5)" } : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg text-[#4da6ff] shrink-0" style={{ background: "rgba(77,166,255,0.1)" }}>
                              <i className={opt.icon} />
                            </div>
                            <div>
                              <span className="text-white font-bold text-sm block">{opt.label}</span>
                              <span className="text-white/40 text-xs">{opt.sub}</span>
                            </div>
                            {formData.sessionType === opt.id && <i className="ri-checkbox-circle-fill text-[#4da6ff] ml-auto text-lg" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </ZoomReveal>

                  {/* Session Size */}
                  <ZoomReveal delay={180}>
                    <div className="rounded-2xl p-6 border" style={{ background: "#061020", borderColor: "rgba(255,255,255,0.1)" }}>
                      <h3 className="text-white font-black uppercase text-sm tracking-widest mb-5 flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center text-[#4da6ff]"><i className="ri-group-line" /></span>
                        Session Format
                      </h3>
                      <div className="flex flex-col gap-3">
                        {[{ id: "individual", label: "Individual", sub: "1-on-1 focused session", icon: "ri-user-line" }, { id: "group", label: "Small Group", sub: "2–5 players", icon: "ri-user-add-line" }, { id: "team", label: "Full Team", sub: "6+ players", icon: "ri-team-line" }].map((opt) => (
                          <button key={opt.id} onClick={() => update("sessionSize", opt.id)} className="flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer text-left"
                            style={formData.sessionSize === opt.id ? { background: "rgba(77,166,255,0.1)", borderColor: "rgba(77,166,255,0.5)" } : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg text-[#4da6ff] shrink-0" style={{ background: "rgba(77,166,255,0.1)" }}>
                              <i className={opt.icon} />
                            </div>
                            <div>
                              <span className="text-white font-bold text-sm block">{opt.label}</span>
                              <span className="text-white/40 text-xs">{opt.sub}</span>
                            </div>
                            {formData.sessionSize === opt.id && <i className="ri-checkbox-circle-fill text-[#4da6ff] ml-auto text-lg" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </ZoomReveal>

                  {/* Availability */}
                  <ZoomReveal delay={260} className="md:col-span-2">
                    <div className="rounded-2xl p-6 border" style={{ background: "#061020", borderColor: "rgba(255,255,255,0.1)" }}>
                      <h3 className="text-white font-black uppercase text-sm tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center text-[#4da6ff]"><i className="ri-calendar-line" /></span>
                        Preferred Days
                        <span className="text-white/30 normal-case font-normal text-xs">(optional — select all that apply)</span>
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {DAYS.map((day) => (
                          <button key={day} onClick={() => toggleDay(day)} className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap"
                            style={formData.availability.includes(day) ? { background: "rgba(77,166,255,0.15)", borderColor: "rgba(77,166,255,0.6)", color: "#4da6ff" } : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}>
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  </ZoomReveal>
                </div>
              </div>
            )}

            {/* ── STEP 3: Your Info ── */}
            {step === 3 && (
              <div>
                <WipeText delay={0}>
                  <h2 className="text-white text-3xl font-black uppercase mb-2 text-center">Your Details</h2>
                </WipeText>
                <WordReveal text="Almost there — just a few details so we can reach you." className="text-white/50 text-center mb-10" delay={200} stagger={45} />
                <DrawLine color="rgba(77,166,255,0.2)" delay={300} />

                <form data-readdy-form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="mt-10 rounded-2xl p-8 border" style={{ background: "#061020", borderColor: "rgba(255,255,255,0.1)" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ZoomReveal delay={100}>
                      <div>
                        <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">First Name *</label>
                        <input type="text" name="first_name" required value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputCls} style={inputStyle} {...focusHandlers} placeholder="Alex" />
                      </div>
                    </ZoomReveal>
                    <ZoomReveal delay={150}>
                      <div>
                        <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Last Name *</label>
                        <input type="text" name="last_name" required value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputCls} style={inputStyle} {...focusHandlers} placeholder="Johnson" />
                      </div>
                    </ZoomReveal>
                    <ZoomReveal delay={200}>
                      <div>
                        <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputCls} style={inputStyle} {...focusHandlers} placeholder="you@example.com" />
                      </div>
                    </ZoomReveal>
                    <ZoomReveal delay={250}>
                      <div>
                        <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} style={inputStyle} {...focusHandlers} placeholder="(555) 000-0000" />
                      </div>
                    </ZoomReveal>
                    <ZoomReveal delay={300} className="md:col-span-2">
                      <div>
                        <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Player Age / Level *</label>
                        <select name="player_level" required value={formData.level} onChange={(e) => update("level", e.target.value)} className={inputCls} style={{ ...inputStyle, background: "#061020" }} {...focusHandlers}>
                          <option value="" style={{ background: "#061020" }}>Select your level</option>
                          <option value="beginner_youth" style={{ background: "#061020" }}>Youth Beginner (U8–U12)</option>
                          <option value="intermediate_youth" style={{ background: "#061020" }}>Youth Intermediate (U13–U18)</option>
                          <option value="competitive" style={{ background: "#061020" }}>Competitive / Club Player</option>
                          <option value="adult_recreational" style={{ background: "#061020" }}>Adult Recreational</option>
                          <option value="adult_competitive" style={{ background: "#061020" }}>Adult Competitive</option>
                        </select>
                      </div>
                    </ZoomReveal>
                    <ZoomReveal delay={350} className="md:col-span-2">
                      <div>
                        <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">
                          Goals / Message <span className="normal-case font-normal">(optional, max 500 chars)</span>
                        </label>
                        <textarea name="message" rows={4} maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputCls} resize-none`} style={inputStyle} {...(focusHandlers as Record<string, unknown>)} placeholder="What are your main goals? Any questions for Coach Munoz?" />
                        <span className={`text-xs block text-right mt-1 ${message.length > 450 ? "text-[#4da6ff]" : "text-white/25"}`}>{message.length}/500</span>
                      </div>
                    </ZoomReveal>
                  </div>
                </form>
              </div>
            )}

            {/* Nav Buttons */}
            <div className="flex items-center justify-between mt-12">
              <div>
                {step !== 1 && (
                  <button onClick={() => setStep((s) => (s as number) - 1 as Step)} className="border border-white/25 text-white font-bold uppercase tracking-widest px-8 py-3 rounded-full text-sm hover:border-[#4da6ff] hover:text-[#4da6ff] transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-arrow-left-line mr-2" /> Back
                  </button>
                )}
              </div>

              {/* Summary pill */}
              {formData.service && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#4da6ff]" style={{ background: "rgba(77,166,255,0.08)", border: "1px solid rgba(77,166,255,0.2)" }}>
                  <i className="ri-checkbox-circle-fill" />
                  {formData.service}
                  {formData.sessionType && <> · {formData.sessionType === "in-person" ? "In-Person" : "Online"}</>}
                  {formData.sessionSize && <> · {formData.sessionSize}</>}
                </div>
              )}

              <MagneticButton>
                {step === 3 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!canNext() || loading}
                    className="font-black uppercase tracking-widest px-10 py-4 rounded-full text-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed text-white"
                    style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)", boxShadow: "0 0 30px rgba(77,166,255,0.35)" }}
                  >
                    {loading ? "Sending..." : "Submit Request"} <i className="ri-arrow-right-line ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={() => canNext() && setStep((s) => (s as number) + 1 as Step)}
                    disabled={!canNext()}
                    className="font-black uppercase tracking-widest px-10 py-4 rounded-full text-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed text-white"
                    style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)", boxShadow: "0 0 30px rgba(77,166,255,0.35)" }}
                  >
                    Next Step <i className="ri-arrow-right-line ml-2" />
                  </button>
                )}
              </MagneticButton>
            </div>
          </div>
        </section>
      ) : (
        /* ─── DONE ─── */
        <section className="py-32 px-6" style={{ position: "relative", zIndex: 10 }}>
          <div className="max-w-2xl mx-auto text-center">
            <ZoomReveal delay={0}>
              <div className="w-24 h-24 flex items-center justify-center rounded-full mx-auto mb-8 text-5xl" style={{ background: "rgba(77,166,255,0.12)", border: "2px solid rgba(77,166,255,0.4)" }}>
                <i className="ri-checkbox-circle-line text-[#4da6ff]" />
              </div>
            </ZoomReveal>
            <SplitLetters text="YOU'RE ALL SET!" className="text-white text-4xl md:text-5xl font-black uppercase block mb-4" delay={200} stagger={55} />
            <WordReveal
              text="Thanks for booking with Coach Munoz. We'll reach out within 24 hours to confirm your session details and get you started."
              className="text-white/60 text-lg leading-relaxed mb-10"
              delay={600}
              stagger={38}
            />
            <ZoomReveal delay={800}>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/" className="font-bold uppercase tracking-widest px-8 py-3 rounded-full text-sm cursor-pointer whitespace-nowrap text-white" style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)" }}>
                  Back to Home
                </Link>
                <Link to="/services" className="border border-white/25 text-white font-bold uppercase tracking-widest px-8 py-3 rounded-full text-sm hover:border-[#4da6ff] hover:text-[#4da6ff] transition-colors cursor-pointer whitespace-nowrap">
                  View All Programs
                </Link>
              </div>
            </ZoomReveal>
          </div>
        </section>
      )}

      {/* ─── WHY US MINI SECTION ─── */}
      {step !== "done" && (
        <section className="py-20 px-6" style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(77,166,255,0.12)" }}>
          <div className="max-w-5xl mx-auto">
            <DrawLine color="rgba(77,166,255,0.15)" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: "ri-time-line", title: "24-Hour Response", desc: "We confirm every booking within one business day — no waiting around." },
                { icon: "ri-star-line", title: "Free First Consult", desc: "New players get a free 15-min assessment to find the right program fit." },
                { icon: "ri-shield-check-line", title: "No Commitment", desc: "Start with a single session. No contracts, no pressure, just results." },
              ].map((item, i) => (
                <ZoomReveal key={item.title} delay={i * 100}>
                  <TiltCard className="rounded-2xl p-6 border" style={{ background: "#061020", borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl text-[#4da6ff] text-xl mb-4" style={{ background: "rgba(77,166,255,0.1)" }}>
                      <i className={item.icon} />
                    </div>
                    <h4 className="text-white font-black uppercase text-sm tracking-widest mb-2">{item.title}</h4>
                    <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                  </TiltCard>
                </ZoomReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// ─── Builder-powered Book ─────────────────────────────────────────────────────
export default function BookPage() {
  const isPreviewing = useIsPreviewing();
  const [builderContent, setBuilderContent] = useState<unknown>(undefined);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    builder
      .get("page", { url: "/book" })
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

  if (!checked && !isPreviewing) return <CustomBookPage />;

  if (builderContent || isPreviewing) {
    return (
      <BuilderComponent
        model="page"
        content={builderContent as Record<string, unknown>}
      />
    );
  }

  return <CustomBookPage />;
}
