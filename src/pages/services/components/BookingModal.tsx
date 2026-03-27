import { useState } from "react";

interface Props {
  serviceName: string;
  onClose: () => void;
}

export default function BookingModal({ serviceName, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (message.length > 500) return;

    const body = new URLSearchParams();
    data.forEach((value, key) => {
      body.append(key, value.toString());
    });

    setLoading(true);
    try {
      await fetch("https://readdy.ai/api/form/d70n42pqa83q0hmd1d3g", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="border rounded-2xl w-full max-w-lg relative"
        style={{ background: "#061020", borderColor: "rgba(77,166,255,0.25)", boxShadow: "0 0 60px rgba(77,166,255,0.15)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/55 hover:text-white cursor-pointer"
        >
          <i className="ri-close-line text-xl" />
        </button>

        <div className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-5 text-[#4da6ff] text-3xl"
                style={{ background: "rgba(77,166,255,0.1)" }}
              >
                <i className="ri-checkbox-circle-line" />
              </div>
              <h3 className="text-white text-2xl font-black uppercase mb-3">You&apos;re Booked!</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Thanks for reaching out! Coach Munoz will get back to you within 24 hours to confirm your session details.
              </p>
              <button
                onClick={onClose}
                className="font-bold uppercase tracking-widest px-8 py-3 rounded-full text-sm cursor-pointer whitespace-nowrap text-white"
                style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)" }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[4px] block mb-2">Book Session</span>
              <h3 className="text-white text-2xl font-black uppercase mb-6">{serviceName}</h3>

              <form data-readdy-form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="hidden" name="service" value={serviceName} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      className="w-full border text-white placeholder-white/30 px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                      style={{ background: "rgba(77,166,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(77,166,255,0.6)")}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.12)")}
                      placeholder="Alex"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      className="w-full border text-white placeholder-white/30 px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                      style={{ background: "rgba(77,166,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(77,166,255,0.6)")}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.12)")}
                      placeholder="Johnson"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border text-white placeholder-white/30 px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                    style={{ background: "rgba(77,166,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(77,166,255,0.6)")}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.12)")}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border text-white placeholder-white/30 px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                    style={{ background: "rgba(77,166,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(77,166,255,0.6)")}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.12)")}
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Player Age / Level</label>
                  <select
                    name="player_level"
                    required
                    className="w-full border text-white px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                    style={{ background: "#061020", borderColor: "rgba(255,255,255,0.12)" }}
                  >
                    <option value="" style={{ background: "#061020" }}>Select level</option>
                    <option value="beginner_youth" style={{ background: "#061020" }}>Youth Beginner (U8–U12)</option>
                    <option value="intermediate_youth" style={{ background: "#061020" }}>Youth Intermediate (U13–U18)</option>
                    <option value="competitive" style={{ background: "#061020" }}>Competitive / Club Player</option>
                    <option value="adult_recreational" style={{ background: "#061020" }}>Adult Recreational</option>
                    <option value="adult_competitive" style={{ background: "#061020" }}>Adult Competitive</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">
                    Message <span className="normal-case">(optional, max 500 chars)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    maxLength={500}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border text-white placeholder-white/30 px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors resize-none"
                    style={{ background: "rgba(77,166,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
                    placeholder="Tell us your goals, availability, or any questions..."
                  />
                  <span className="text-white/30 text-xs text-right block mt-1">{message.length}/500</span>
                </div>

                <button
                  type="submit"
                  disabled={loading || message.length > 500}
                  className="font-black uppercase tracking-widest py-4 rounded-full text-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed text-white"
                  style={{
                    background: "linear-gradient(135deg, #1e6aff, #4da6ff)",
                    boxShadow: "0 0 20px rgba(77,166,255,0.3)",
                  }}
                >
                  {loading ? "Sending..." : "Submit Booking Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
