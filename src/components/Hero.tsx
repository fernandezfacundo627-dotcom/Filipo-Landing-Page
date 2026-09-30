import { useEffect, useRef, useState } from "react";
import { Bike, ChevronDown, MapPin, Sparkles, Star, StarHalf, UtensilsCrossed } from "lucide-react";
import { IMAGES, LINKS, LOGO, GOOGLE_RATING, GOOGLE_REVIEWS_COUNT } from "../data/site";
import { getBusinessStatus } from "../utils/businessHours";

interface HeroProps {
  onOpenDelivery: () => void;
  onOpenReservation: () => void;
  ready?: boolean;
}

export default function Hero({ onOpenDelivery, onOpenReservation, ready = true }: HeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const [status] = useState(() => getBusinessStatus());

  /* Parallax sutil del fondo respetando preferencias de movimiento reducido */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.32}px) scale(1.12)`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="inicio"
      className={`relative flex min-h-[100svh] items-center justify-center overflow-hidden ${
        ready ? "hero-ready" : ""
      }`}
      aria-label="Bienvenida"
    >
      {/* Fondo con parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <img
            src={IMAGES.hero}
            alt="Salón de Filipo iluminado con lámparas cálidas por la noche"
            fetchPriority="high"
            decoding="async"
            className="img-warm h-full w-full object-cover"
          />
        </div>
        {/* Overlays cinematográficos */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 60% at 50% 42%, transparent 30%, rgba(13,13,13,0.55) 100%)",
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 pt-28 pb-24 text-center">
{/* Logo / Sello */}
        <div className="hero-in mb-8 flex justify-center" style={{ ["--d" as string]: "80ms" }}>
          {LOGO ? (
            <img
              src={LOGO}
              alt="Logo de Filipo Café Resto Bar"
              className="h-28 w-auto object-contain drop-shadow-[0_8px_35px_rgba(13,13,13,0.75)] sm:h-36 md:h-48"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full border border-gold/60 bg-ink/50 font-display text-3xl font-bold text-gold shadow-[0_0_50px_-8px_rgba(221,124,52,0.5)] backdrop-blur-sm sm:size-24 sm:text-4xl md:size-28 md:text-5xl">
              F
            </div>
          )}
        </div>

        <p
          className="hero-in eyebrow justify-center text-gold text-[10px] sm:text-[11px]"
          style={{ ["--d" as string]: "220ms" }}
        >
          <span className="inline-block h-px w-6 sm:w-10 bg-gold/70" aria-hidden="true" />
          Filipo Café Resto Bar
          <span className="inline-block h-px w-6 sm:w-10 bg-gold/70" aria-hidden="true" />
        </p>

        <h1
          className="hero-in mt-5 font-display text-4xl leading-[1.08] text-cream sm:text-6xl md:text-7xl lg:text-[5.2rem]"
          style={{ ["--d" as string]: "340ms" }}
        >
          El punto de encuentro
          <span className="mt-2 block font-elegant italic text-gold-grad">de Salta</span>
        </h1>

        <p
          className="hero-in mt-4 font-elegant text-xl italic tracking-wide text-cream/85 sm:text-2xl md:text-3xl"
          style={{ ["--d" as string]: "480ms" }}
        >
          Café · Resto · Bar · Tablas
        </p>

        <div
          className="hero-in hairline mx-auto mt-6 w-40 sm:mt-8 sm:w-52"
          style={{ ["--d" as string]: "560ms" }}
          aria-hidden="true"
        />

        {/* CTAs principales */}
        <div
          className="hero-in mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          style={{ ["--d" as string]: "660ms" }}
        >
          <a
            href={LINKS.menu}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_14px_40px_-10px_rgba(221,124,52,0.55)]"
          >
            <UtensilsCrossed className="size-4 text-ink" />
            Ver Menú
          </a>

          <button
            type="button"
            onClick={onOpenDelivery}
            className="flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-peya px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-peya-dark hover:shadow-[0_14px_40px_-10px_rgba(250,0,80,0.55)]"
          >
            <Bike className="size-4" />
            Pedir Delivery
          </button>

          <button
            type="button"
            onClick={onOpenReservation}
            className="group flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-gold/80 bg-ink/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-cream backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/15 hover:shadow-[0_14px_40px_-12px_rgba(221,124,52,0.45)]"
          >
            <Sparkles className="size-4 text-gold transition-transform duration-300 group-hover:scale-110" />
            Reservar Mesa
          </button>
        </div>

        {/* Cartel Destacado de Google Reviews */}
        <div className="hero-in mt-9 flex justify-center" style={{ ["--d" as string]: "720ms" }}>
          <a
            href={LINKS.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-2xl border border-gold/30 bg-graphite/75 px-5 py-3 shadow-[0_12px_40px_-15px_rgba(221,124,52,0.3)] transition-all duration-300 hover:scale-[1.04] hover:border-gold/60 hover:bg-ink hover:shadow-[0_16px_50px_-12px_rgba(221,124,52,0.45)]"
          >
            {/* Ícono de Google estilizado */}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/10 font-display text-base font-black text-gold">
              G
            </span>
            <div className="text-left leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold tracking-wide text-cream">Google Reviews</span>
                <div className="flex gap-0.5" aria-hidden="true">
                  <Star className="size-3.5 fill-gold text-gold" />
                  <Star className="size-3.5 fill-gold text-gold" />
                  <Star className="size-3.5 fill-gold text-gold" />
                  <Star className="size-3.5 fill-gold text-gold" />
                  <StarHalf className="size-3.5 fill-gold text-gold" />
                </div>
              </div>
              <p className="mt-0.5 text-xs text-cream/65">
                Calificación de <strong className="text-gold">{GOOGLE_RATING} / 5</strong> basado en {GOOGLE_REVIEWS_COUNT} opiniones de Google Maps
              </p>
            </div>
          </a>
        </div>

        {/* Datos rápidos con estado en vivo */}
        <div
          className="hero-in mt-9 flex flex-col items-center justify-center gap-3 text-xs tracking-wide text-cream/70 sm:flex-row sm:gap-6"
          style={{ ["--d" as string]: "780ms" }}
        >
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5 text-gold" />
            Av. del Bicentenario 1401 · Salta
          </span>
          {/* Cartel animado de Estado Comercial en Vivo ("Abierto ahora") */}
          <span
            className={`inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs backdrop-blur-md transition-all duration-300 ${
              status.isOpen
                ? "live-badge-pulse border border-mint/40 bg-coal/90 text-cream"
                : "border border-amber-500/35 bg-coal/90 text-amber-200"
            }`}
          >
            {/* Baliza con efecto radar / sonar ping expansivo */}
            <span className="relative flex size-3 items-center justify-center">
              {status.isOpen && (
                <span className="live-beacon-wave absolute inline-flex h-full w-full rounded-full bg-mint" />
              )}
              <span
                className={`relative inline-flex size-2 rounded-full ${
                  status.isOpen
                    ? "bg-mint shadow-[0_0_10px_#48d1ba]"
                    : "bg-amber-400"
                }`}
                aria-hidden="true"
              />
            </span>
            <strong
              className={
                status.isOpen
                  ? "font-bold text-mint uppercase tracking-wider text-[11px]"
                  : "font-bold text-amber-400 uppercase tracking-wider text-[11px]"
              }
            >
              {status.statusText}
            </strong>
            <span className="text-cream/40">·</span>
            <span className="text-cream/80 text-[11px]">{status.nextChangeText}</span>
          </span>
          <span className="hidden h-3 w-px bg-cream/25 sm:block" aria-hidden="true" />
          <span className="flex items-center gap-2">
            <UtensilsCrossed className="size-3.5 text-gold" />
            Carta abierta todo el día
          </span>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#nosotros"
        className="scroll-cue absolute bottom-7 left-1/2 z-10 -translate-x-1/2 rounded-full p-3 text-gold/80 transition-colors hover:text-gold"
        aria-label="Bajar a la sección Nosotros"
      >
        <ChevronDown className="size-6" />
      </a>
    </section>
  );
}
