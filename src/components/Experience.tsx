import { BadgeDollarSign, Cake, MapPin, MoonStar, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface Reason {
  icon: LucideIcon;
  title: string;
  text: string;
}

const REASONS: Reason[] = [
  {
    icon: MapPin,
    title: "Ubicación estratégica",
    text: "En el corazón de la ciudad, sobre Avenida Bicentenario.",
  },
  {
    icon: Cake,
    title: "Ideal para celebraciones",
    text: "El lugar preferido para cumpleaños y eventos especiales.",
  },
  {
    icon: BadgeDollarSign,
    title: "Calidad-Precio",
    text: "Porciones abundantes con la mejor relación precio-calidad.",
  },
  {
    icon: MoonStar,
    title: "Carta abierta todo el día",
    text: "Cocina activa en horario corrido: pedí lo que quieras, desde el desayuno hasta la madrugada.",
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="pattern-dots relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeading
          eyebrow="La experiencia Filipo"
          title="¿Por qué las personas eligen Filipo?"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 130}>
              <div className="group relative text-center">
                {/* Número decorativo */}
                <span
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 font-display text-7xl font-bold text-gold/8 transition-colors duration-500 group-hover:text-gold/15"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <span className="relative mx-auto flex size-16 items-center justify-center rounded-full border border-gold/30 bg-ink text-gold shadow-[0_0_35px_-10px_rgba(221,124,52,0.35)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:bg-gold group-hover:text-ink group-hover:shadow-[0_18px_40px_-12px_rgba(221,124,52,0.55)]">
                  <r.icon className="size-7" />
                </span>

                <h3 className="mt-6 font-display text-xl text-cream">{r.title}</h3>
                <div className="hairline mx-auto mt-4 w-10" aria-hidden="true" />
                <p className="mt-4 text-sm leading-relaxed text-cream/55">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
