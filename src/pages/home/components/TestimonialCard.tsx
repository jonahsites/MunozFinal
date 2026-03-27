interface Testimonial {
  id: number;
  quote: string;
  name: string;
  initials: string;
  date: string;
}

interface Props {
  testimonial: Testimonial;
}

const AVATAR_COLORS = [
  "linear-gradient(135deg, #1e6aff, #4da6ff)",
  "linear-gradient(135deg, #0a3d8f, #1e6aff)",
  "linear-gradient(135deg, #4da6ff, #60c8ff)",
  "linear-gradient(135deg, #0f2a6e, #4da6ff)",
  "linear-gradient(135deg, #1a55cc, #60c8ff)",
];

export default function TestimonialCard({ testimonial }: Props) {
  const colorIndex = testimonial.id % AVATAR_COLORS.length;

  return (
    <div className="break-inside-avoid mb-6 border border-white/10 rounded-2xl p-7 hover:border-[#4da6ff]/35 transition-colors duration-300" style={{ background: "rgba(77,166,255,0.04)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className="text-[#4da6ff] text-sm w-4 h-4 flex items-center justify-center">
              <i className="ri-star-fill" />
            </span>
          ))}
        </div>
        <span className="text-white/25 text-xs">{testimonial.date}</span>
      </div>
      <p className="text-white/80 text-sm leading-relaxed italic mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 border-[#4da6ff]/30"
          style={{ background: AVATAR_COLORS[colorIndex] }}
        >
          <span className="text-white text-sm font-black tracking-wide">{testimonial.initials}</span>
        </div>
        <div>
          <p className="text-white text-sm font-bold">{testimonial.name}</p>
          <p className="text-[#4da6ff]/70 text-xs mt-0.5 flex items-center gap-1">
            <i className="ri-star-fill text-[10px]" /> Verified Review
          </p>
        </div>
      </div>
    </div>
  );
}
