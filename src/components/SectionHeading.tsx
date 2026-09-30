import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Color de la etiqueta: dorado (default) o rojo PedidosYa */
  tone?: "gold" | "peya";
}

/** Encabezado estándar de sección: etiqueta + título serif + línea dorada */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "gold",
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
      <Reveal>
        <span
          className={`eyebrow ${tone === "peya" ? "text-peya" : "text-gold"}`}
        >
          <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
          {eyebrow}
          <span className="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
        </span>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-5 font-display text-4xl leading-tight text-cream md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={220}>
          <p className="mt-5 font-elegant text-xl italic text-cream/70 md:text-2xl">
            {subtitle}
          </p>
        </Reveal>
      )}
      <Reveal delay={300}>
        <div className="hairline mx-auto mt-8 w-40" aria-hidden="true" />
      </Reveal>
    </div>
  );
}
