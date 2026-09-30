import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star, StarHalf } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { LINKS, GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from "../data/site";
import Reveal from "./Reveal";

export interface ReviewItem {
  author: string;
  text: string;
  rating: number;
  source: string;
  timeAgo?: string;
  initial: string;
  url?: string;
}

/** Helper para validar URLs y hacer fallback seguro a la ficha oficial de Google Maps si es un placeholder */
const getReviewUrl = (url?: string) => {
  if (url && url.trim() !== "" && !url.includes("TU_ENLACE_AQUI")) {
    return url;
  }
  return LINKS.mapsLink;
};

/** Opiniones reales extraídas directamente de la ficha oficial de Filipo en Google Maps con sus puntuaciones individuales exactas */
const REAL_GOOGLE_REVIEWS: ReviewItem[] = [
  {
    author: "Carla A.",
    initial: "C",
    text: "Ubicado en Tres Cerritos, tiene un amplio horario que permite tanto ir a desayunar como almorzar, cenar o tomar algo. Tiene muy buenas promociones tanto para desayuno y merienda como para almuerzo. El local tiene dos plantas y también mesas afuera. En lo particular prefiero la ambientación del piso superior. Muy buena atención del personal, excelente relación precio calidad.",
    source: "Google Maps · Reseña Verificada",
    rating: 5,
    timeAgo: "Hace 6 meses",
    url: LINKS.mapsLink,
  },
  {
    author: "Fabiana N.",
    initial: "F",
    text: "Fui a merendar hay mucha variedad de cafe pedi un cafe en jarrito y acompañe con un roll de canela. Muy rico!! Si van varias personas hay distintas tablas dulces y saladas para compartir . Lo recomiendo",
    source: "Google Maps · Reseña Verificada",
    rating: 5,
    timeAgo: "Hace 4 meses",
    url: LINKS.mapsLink,
  },
  {
    author: "Ricardo G.",
    initial: "R",
    text: "Excelente ubicación con un ambiente agradable. La atención es fenomenal. Menú variado y amplio. Buen lugar para picar algo.",
    source: "Google Maps · Reseña Verificada",
    rating: 5,
    timeAgo: "Hace 4 meses",
    url: LINKS.mapsLink,
  },
  {
    author: "Hugo G.",
    initial: "H",
    text: "Muy buen lugar, con opciones Sin Gluten Agregado y muy buena atención, los precios razonables.",
    source: "Google Maps · Reseña Verificada",
    rating: 5,
    timeAgo: "Hace 1 mes",
    url: LINKS.mapsLink,
  },
  {
    author: "Maria C.",
    initial: "M",
    text: "Fuimos a merendar con amigas y nuestros niños. Excelente atención de los mozos, ambiente agradable, los precios super accesibles y todo muy rico. La verdad quedamos muy contenta, así que volveremos a ir.",
    source: "Google Maps · Reseña Verificada",
    rating: 5,
    timeAgo: "Hace 2 meses",
    url: LINKS.mapsLink,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = REAL_GOOGLE_REVIEWS.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const go = (dir: 1 | -1) => setIndex((p) => (p + dir + total) % total);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((p) => (p + 1) % total), 6500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 45) {
        // Swipe izquierda -> siguiente
        go(1);
      } else if (diff < -45) {
        // Swipe derecha -> anterior
        go(-1);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setPaused(false);
  };

  return (
    <section id="opiniones" className="relative bg-ink py-14 md:py-20">
      {/* Resplandor superior */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-72 w-[720px] -translate-x-1/2 opacity-70"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(221,124,52,0.07), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="Google Reviews" title="Opiniones reales de nuestros clientes" />

        {/* Badge de calificación de Google Maps */}
        <Reveal className="mb-6 flex justify-center">
          <a
            href={LINKS.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 rounded-2xl border border-gold/30 bg-graphite/80 px-6 py-3.5 text-center shadow-[0_15px_40px_-15px_rgba(221,124,52,0.15)] backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-ink hover:scale-[1.02] sm:px-8 sm:py-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-black text-cream sm:text-3xl">{GOOGLE_RATING}</span>
              <div className="flex gap-1">
                <Star className="size-4 fill-gold text-gold" />
                <Star className="size-4 fill-gold text-gold" />
                <Star className="size-4 fill-gold text-gold" />
                <Star className="size-4 fill-gold text-gold" />
                <StarHalf className="size-4 fill-gold text-gold" />
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold transition-colors duration-300 group-hover:text-gold-light">
              Puntuación en Google Reviews
            </p>
            <span className="text-[11px] text-cream/55">
              Basado en {GOOGLE_REVIEWS_COUNT} opiniones de Google Maps de clientes en Salta
            </span>
          </a>
        </Reveal>

        <Reveal>
          <div
            className="relative select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Flechas laterales fijas a los costados de la tarjeta */}
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute -left-3 sm:-left-5 md:-left-7 top-1/2 -translate-y-1/2 z-20 flex size-10 sm:size-12 cursor-pointer items-center justify-center rounded-full border border-gold/35 bg-ink/95 text-cream/90 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-gold hover:text-ink"
              aria-label="Opinión anterior"
            >
              <ChevronLeft className="size-5 sm:size-6" />
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              className="absolute -right-3 sm:-right-5 md:-right-7 top-1/2 -translate-y-1/2 z-20 flex size-10 sm:size-12 cursor-pointer items-center justify-center rounded-full border border-gold/35 bg-ink/95 text-cream/90 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-gold hover:text-ink"
              aria-label="Siguiente opinión"
            >
              <ChevronRight className="size-5 sm:size-6" />
            </button>

            {/* Pista del carrusel */}
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {REAL_GOOGLE_REVIEWS.map((t, i) => (
                  <figure
                    key={i}
                    className="min-w-full px-1"
                    aria-hidden={i !== index}
                  >
                    <a
                      href={getReviewUrl(t.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/card flex h-full flex-col items-center rounded-3xl border border-cream/8 bg-graphite/80 px-5 py-6 text-center transition-all duration-300 hover:border-gold/50 hover:bg-graphite hover:shadow-[0_20px_50px_-15px_rgba(221,124,52,0.25)] sm:px-10 sm:py-7"
                    >
                      {/* Avatar del usuario con inicial y marca de Google */}
                      <div className="relative flex items-center justify-center">
                        <span className="flex size-11 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10 font-display text-base font-bold text-gold shadow-inner transition-transform duration-300 group-hover/card:scale-110">
                          {t.initial}
                        </span>
                        <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border border-gold/50 bg-ink text-[8px] font-bold text-gold">
                          G
                        </span>
                      </div>

                      {/* Estrellas */}
                      <div className="mt-2.5 flex gap-1" aria-label={`Calificación: ${t.rating} de 5`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star 
                            key={s} 
                            className={`size-3.5 ${s < t.rating ? "fill-gold text-gold" : "text-gold/30"}`} 
                          />
                        ))}
                      </div>

                      <blockquote className="mt-3.5 max-w-2xl font-elegant text-lg leading-relaxed italic text-cream/90 transition-colors duration-300 group-hover/card:text-cream sm:text-xl md:text-[22px]">
                        “{t.text}”
                      </blockquote>

                      <figcaption className="mt-3.5 flex flex-col items-center gap-1.5">
                        <span className="hairline w-10" aria-hidden="true" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream">
                          {t.author}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-cream/50">
                          <span className="rounded-full border border-mint/30 bg-mint/10 px-2.5 py-0.5 font-bold uppercase tracking-wider text-mint">
                            {t.source}
                          </span>
                          {t.timeAgo && <span>· {t.timeAgo}</span>}
                        </div>
                        {/* Botón interactivo para ver en Google Maps */}
                        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold transition-all duration-300 group-hover/card:border-gold group-hover/card:bg-gold group-hover/card:text-ink">
                          <span>Ver en Google Maps</span>
                          <ExternalLink className="size-2.5" />
                        </span>
                      </figcaption>
                    </a>
                  </figure>
                ))}
              </div>
            </div>

            {/* Indicadores de paginación (dots) */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {REAL_GOOGLE_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? "w-7 bg-gold" : "w-2 bg-cream/20 hover:bg-cream/40"
                  }`}
                  aria-label={`Ir a la opinión ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}