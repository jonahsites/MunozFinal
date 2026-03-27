import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      style={scrolled ? { background: "rgba(2, 8, 16, 0.96)", borderBottom: "1px solid rgba(77,166,255,0.15)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://static.readdy.ai/image/afe716c2f1804486755ab4097ed768fd/ea423cb28eb4bca35098f590e2bf037c.png"
            alt="Coach Munoz Logo"
            className="h-12 w-auto object-contain filter invert"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                location.pathname === link.path
                  ? "text-[#4da6ff]"
                  : "text-white hover:text-[#4da6ff]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/book"
            className="text-sm font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer text-white"
            style={{
              background: "linear-gradient(135deg, #1e6aff, #4da6ff)",
              boxShadow: "0 0 20px rgba(77,166,255,0.3)",
            }}
          >
            Book Training
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden backdrop-blur-md px-6 pb-6 pt-2 flex flex-col gap-4" style={{ background: "rgba(2, 8, 16, 0.97)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold uppercase tracking-widest py-2 border-b border-white/10 cursor-pointer ${
                location.pathname === link.path ? "text-[#4da6ff]" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full text-center mt-2 whitespace-nowrap cursor-pointer text-white"
            style={{ background: "linear-gradient(135deg, #1e6aff, #4da6ff)" }}
          >
            Book Training
          </Link>
        </div>
      )}
    </nav>
  );
}
