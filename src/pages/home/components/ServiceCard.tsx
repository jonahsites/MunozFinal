import { useState } from "react";
import { Link } from "react-router-dom";

interface Service {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group bg-[#0a1628] border border-white/10 rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        transition: "transform 0.35s ease, border-color 0.3s ease, box-shadow 0.35s ease",
        transform: hovered
          ? "perspective(900px) rotateY(-4deg) rotateX(2deg) translateY(-4px)"
          : "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)",
        borderColor: hovered ? "rgba(77,166,255,0.4)" : undefined,
        boxShadow: hovered ? "0 20px 50px rgba(77,166,255,0.15), 0 0 0 1px rgba(77,166,255,0.2)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
        <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-[#4da6ff] rounded-lg text-white text-lg">
          <i className={service.icon} />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[#4da6ff] text-xs font-bold uppercase tracking-widest mb-2">
          {service.tagline}
        </span>
        <h3 className="text-white text-xl font-black uppercase mb-3">{service.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{service.description}</p>
        <ul className="flex flex-col gap-2 mb-6">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-white/60 text-sm">
              <span className="text-[#4da6ff] mt-0.5 shrink-0 w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-s-line" />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <Link
          to="/services"
          className="text-[#4da6ff] text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
        >
          Learn More <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </div>
  );
}
