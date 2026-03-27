import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const body = new URLSearchParams();
      body.append("email", email);
      await fetch("https://readdy.ai/api/form/d70n46hqa83q0hmd1d40", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer style={{ background: "#030b1a" }}>
      {/* Newsletter */}
      <div className="py-16" style={{ background: "#040e22", borderBottom: "1px solid rgba(77,166,255,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-[4px]">Stay Updated</span>
          <h3 className="text-white text-3xl font-black uppercase tracking-tight">
            Get Training Tips &amp; Exclusive Offers
          </h3>
          {subscribed ? (
            <p className="text-[#4da6ff] text-lg font-semibold">You&apos;re in! Welcome to the family.</p>
          ) : (
            <form
              data-readdy-form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border border-white/15 text-white placeholder-white/40 px-5 py-3 rounded-lg text-sm focus:outline-none focus:border-[#4da6ff] transition-colors"
                style={{ background: "rgba(77,166,255,0.06)" }}
              />
              <button
                type="submit"
                className="font-bold uppercase tracking-widest px-8 py-3 rounded-lg text-sm transition-colors whitespace-nowrap cursor-pointer text-white"
                style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)" }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <img
            src="https://static.readdy.ai/image/afe716c2f1804486755ab4097ed768fd/ea423cb28eb4bca35098f590e2bf037c.png"
            alt="Coach Munoz"
            className="h-16 w-auto object-contain filter invert self-start"
          />
          <p className="text-white/50 text-sm leading-relaxed">
            Elite soccer training for players ready to dominate. Family-run, passion-driven since 2019.
          </p>
          <div className="flex gap-4">
            {["instagram", "facebook", "youtube", "tiktok"].map((social) => (
              <a
                key={social}
                href="#"
                rel="nofollow"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-white transition-all duration-200 cursor-pointer text-sm"
                style={{ background: "rgba(77,166,255,0.06)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg,#1e6aff,#4da6ff)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "transparent";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(77,166,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <i className={`ri-${social}-line`} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[#4da6ff] text-xs font-bold uppercase tracking-[3px] mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Services", path: "/services" },
            ].map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="text-white/55 text-sm hover:text-[#4da6ff] transition-colors cursor-pointer"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h4 className="text-[#4da6ff] text-xs font-bold uppercase tracking-[3px] mb-6">Programs</h4>
          <ul className="flex flex-col gap-3">
            {[
              "Individual Training",
              "Group Training",
              "Team Training",
              "Match Analysis",
              "Online Training",
            ].map((s) => (
              <li key={s}>
                <Link
                  to="/services"
                  className="text-white/55 text-sm hover:text-[#4da6ff] transition-colors cursor-pointer"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#4da6ff] text-xs font-bold uppercase tracking-[3px] mb-6">Get In Touch</h4>
          <ul className="flex flex-col gap-4 mb-6">
            <li className="flex items-center gap-3 text-white/55 text-sm">
              <span className="w-5 h-5 flex items-center justify-center text-[#4da6ff]">
                <i className="ri-mail-line" />
              </span>
              contact@coachmunoz.com
            </li>
            <li className="flex items-center gap-3 text-white/55 text-sm">
              <span className="w-5 h-5 flex items-center justify-center text-[#4da6ff]">
                <i className="ri-phone-line" />
              </span>
              Available upon booking
            </li>
          </ul>
          <Link
            to="/services"
            className="block text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg text-center transition-colors cursor-pointer whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)" }}
          >
            Book a Session
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(77,166,255,0.12)" }} className="py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">© 2026 3 Coach Munoz. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-white/35">
            <a href="#" rel="nofollow" className="hover:text-white/65 transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <span className="text-[#4da6ff]">·</span>
            <a href="#" rel="nofollow" className="hover:text-white/65 transition-colors cursor-pointer">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
