import { Sparkles, UtensilsCrossed, Wine } from "lucide-react";
import Reveal from "./Reveal";
import { IMAGES, LOGO } from "../data/site";

const FEATURES = [
  { icon: UtensilsCrossed, title: "Carta abierta todo el día", text: "Toda la propuesta gastronómica a cualquier hora" },
  { icon: Wine, title: "Ambiente único", text: "Cálido de día, con onda de noche" },
  { icon: Sparkles, title: "Servicio atento", text: "Equipo presente en cada detalle" },
];

export default function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-ink py-24 md:py-32">
      {/* Resplandor ámbar decorativo */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(221,124,52,0.08) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Composición de imágenes */}
        <Reveal className="relative">
          <div className="relative">
            {/* Marco dorado desplazado */}
            <div
              className="absolute -top-4 -left-4 h-full w-full rounded-2xl border border-gold/30"
              aria-hidden="true"
            />
            <img
              src={IMAGES.about}
              alt="Noche cálida dentro de Filipo, vista a través de su ventana"
              className="img-warm relative aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)]"
              loading="lazy"
            />
            {/* Imagen secundaria superpuesta */}
            <img
              src={IMAGES.aboutDetail}
              alt="Detalle de la barra de café de Filipo con luz íntima"
              className="img-warm absolute -right-5 -bottom-8 hidden w-2/5 rounded-xl border-4 border-ink object-cover shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] md:block"
              loading="lazy"
            />
            {/* Sello flotante */}
            <div className="absolute -bottom-7 left-6 flex items-center gap-3 rounded-full border border-gold/25 bg-coal/90 px-5 py-3 backdrop-blur-md md:-bottom-6">
              <span className="flex size-12 items-center justify-center p-1">
                {LOGO ? (
                  <img
                    src={LOGO}
                    alt="Logo Filipo"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="font-display text-xl font-bold text-gold">F</span>
                )}
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[0.28em] text-cream/80">
                Hecho en Salta
              </span>
            </div>
          </div>
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal>
            <span className="eyebrow text-gold">
              <span className="inline-block h-px w-8 bg-gold/60" aria-hidden="true" />
              Nosotros
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl leading-tight text-cream md:text-5xl">
              Un espacio creado
              <span className="block font-elegant italic text-gold-grad">para quedarse</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 text-[15px] leading-relaxed text-cream/70 md:text-base">
              Somos Filipo, un espacio creado para pausar, compartir y quedarse un rato más. Ubicados en el corazón gastronómico de Salta, sobre la Av. del Bicentenario, somos el lugar favorito de los salteños para cada momento. Un rincón con aroma a café recién hecho, una colección de libros en nuestras repisas para acompañar tus lecturas y juguetes pensados para que los más pequeños también disfruten su visita sin apuro.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/70 md:text-base">
              Café de mañana, almuerzo ejecutivo, tablas y tragos para compartir: contamos con <span className="font-semibold text-gold">carta abierta todo el día</span> para que pidas cualquier opción de nuestro menú en cualquier momento, sin horarios restrictivos de cocina.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <blockquote className="mt-7 border-l-2 border-gold pl-5 font-elegant text-2xl italic text-cream/90 md:text-[1.7rem]">
              “Aquí el tiempo pasa diferente.”
            </blockquote>
          </Reveal>

          {/* Íconos destacados */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={340 + i * 110}>
                <div className="group flex items-center gap-4 sm:flex-col sm:items-start">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/8 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                    <f.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-cream">{f.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-cream/50">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}