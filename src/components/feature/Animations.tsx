import { useEffect, useRef, useState, ReactNode } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#@$%&*";

// ── ScrambleText ─────────────────────────────────────────────────────────────
export function ScrambleText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [output, setOutput] = useState(text.split("").map((c) => (c === " " ? " " : SCRAMBLE_CHARS[0])).join(""));
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        obs.disconnect();
        const FRAMES = 52;
        let frame = 0;
        setTimeout(() => {
          const interval = setInterval(() => {
            frame++;
            const p = frame / FRAMES;
            setOutput(text.split("").map((char, i) => {
              if (char === " ") return " ";
              const cp = Math.max(0, (p - (i / text.length) * 0.35) / 0.65);
              if (cp >= 1) return char;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }).join(""));
            if (frame >= FRAMES) { setOutput(text); clearInterval(interval); }
          }, 36);
        }, delay);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [text, delay]);
  return <span ref={ref} className={className}>{output}</span>;
}

// ── WipeText ─────────────────────────────────────────────────────────────────
export function WipeText({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { el.style.clipPath = "inset(0 0% 0 0)"; }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className} style={{ clipPath: "inset(0 100% 0 0)", transition: `clip-path 1.1s cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

// ── WordReveal ────────────────────────────────────────────────────────────────
export function WordReveal({ text, className = "", wordClassName = "", delay = 0, stagger = 55 }: { text: string; className?: string; wordClassName?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className={`inline-block ${wordClassName}`} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(110%)", transition: `opacity 0.65s ease ${delay + i * stagger}ms, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * stagger}ms`, marginRight: "0.28em" }}>{word}</span>
      ))}
    </div>
  );
}

// ── DrawLine ──────────────────────────────────────────────────────────────────
export function DrawLine({ className = "", delay = 0, color = "rgba(77,166,255,0.3)", thickness = 1 }: { className?: string; delay?: number; color?: string; thickness?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => { el.style.width = "100%"; }, delay); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className} style={{ height: `${thickness}px`, width: "0%", background: color, transition: `width 1.5s cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms` }} />
  );
}

// ── ZoomReveal ────────────────────────────────────────────────────────────────
export function ZoomReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { el.style.opacity = "1"; el.style.transform = "scale(1) translateY(0)"; }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: "scale(0.82) translateY(28px)", transition: `opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

// ── SplitLetters ─────────────────────────────────────────────────────────────
export function SplitLetters({ text, className = "", delay = 0, stagger = 40 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} aria-hidden="true" style={{ display: "inline-block", opacity: visible ? 1 : 0, transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(70%) rotateX(-90deg)", transition: `opacity 0.5s ease ${delay + i * stagger}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * stagger}ms`, ...(char === " " ? { width: "0.3em" } : {}) }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// ── TiltCard ──────────────────────────────────────────────────────────────────
export function TiltCard({ children, className = "", intensity = 10, style }: { children: ReactNode; className?: string; intensity?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`;
    ref.current.style.transition = "transform 0.1s ease";
  };
  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  };
  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", willChange: "transform", ...style }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

// ── MagneticButton ────────────────────────────────────────────────────────────
export function MagneticButton({ children, className = "", strength = 0.28 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    ref.current.style.transition = "transform 0.15s ease";
  };
  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
  };
  return (
    <div ref={ref} className={`inline-block ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

// ── ParallaxLayer ─────────────────────────────────────────────────────────────
export function ParallaxLayer({ children, speed = 0.35, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      ref.current.style.transform = `translateY(${centerOffset * speed}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

// ── FloatingParticles ─────────────────────────────────────────────────────────
export function FloatingParticles({ count = 45, className = "" }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      alpha: Math.random() * 0.35 + 0.08,
    }));
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77,166,255,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [count]);
  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
}

// ── ScrollProgress ────────────────────────────────────────────────────────────
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-[200] pointer-events-none" style={{ height: "2px" }}>
      <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #1e6aff, #60c8ff)", transition: "width 0.05s linear" }} />
    </div>
  );
}

// ── CustomCursor ──────────────────────────────────────────────────────────────
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.style.cursor = "none";

    const moveMouse = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const handleIn = () => { hovering.current = true; };
    const handleOut = () => { hovering.current = false; };

    const refreshListeners = () => {
      document.querySelectorAll("a, button, [role=\"button\"], [class*=\"cursor-pointer\"]").forEach((el) => {
        el.addEventListener("mouseenter", handleIn);
        el.addEventListener("mouseleave", handleOut);
      });
    };
    refreshListeners();

    let animId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const sz = hovering.current ? 52 : 32;
        ringRef.current.style.transform = `translate(${ring.current.x - sz / 2}px, ${ring.current.y - sz / 2}px)`;
        ringRef.current.style.width = `${sz}px`;
        ringRef.current.style.height = `${sz}px`;
        ringRef.current.style.opacity = hovering.current ? "0.8" : "0.5";
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("mousemove", moveMouse);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", moveMouse);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#4da6ff]" style={{ width: 8, height: 8, willChange: "transform" }} />
      <div ref={ringRef} className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-[#4da6ff]" style={{ width: 32, height: 32, willChange: "transform", transition: "width 0.2s cubic-bezier(0.22,1,0.36,1), height 0.2s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease" }} />
    </>
  );
}
