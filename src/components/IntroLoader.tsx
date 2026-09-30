import { useEffect, useState } from "react";
import { LOGO } from "../data/site";

interface IntroLoaderProps {
  onReveal?: () => void;
}

/**
 * Animación cinematográfica de entrada al sitio.
 * Muestra el emblema oficial y tipografía de Filipo con resplandor dorado,
 * y se abre como un telón vertical de dos paneles al revelar la página.
 */
export default function IntroLoader({ onReveal }: IntroLoaderProps) {
  const [phase, setPhase] = useState<"visible" | "parting" | "done">("visible");

  useEffect(() => {
    // Si el usuario tiene activada la preferencia de reducción de movimiento, saltar la intro
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      onReveal?.();
      return;
    }

    // Bloquear el scroll mientras dura la animación de bienvenida
    document.body.style.overflow = "hidden";

    // 1. A los 1300ms se inicia la apertura del telón y se revela el Hero
    const timerParting = setTimeout(() => {
      setPhase("parting");
      onReveal?.();
    }, 1300);

    // 2. A los 2200ms los paneles salieron de pantalla por completo; restaurar scroll y desmontar
    const timerDone = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 2200);

    return () => {
      clearTimeout(timerParting);
      clearTimeout(timerDone);
      document.body.style.overflow = "";
    };
  }, [onReveal]);

  // Permitir al usuario saltar la animación de inmediato haciendo clic en cualquier parte
  const handleSkip = () => {
    setPhase("done");
    document.body.style.overflow = "";
    onReveal?.();
  };

  if (phase === "done") return null;

  const isParting = phase === "parting";

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
      role="status"
      aria-label="Cargando experiencia Filipo"
      title="Hacé clic para continuar"
    >
      {/* Panel Superior del Telón */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 border-b border-gold/35 bg-coal transition-transform duration-900 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isParting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      </div>

      {/* Panel Inferior del Telón */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 border-t border-gold/35 bg-coal transition-transform duration-900 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isParting ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      </div>

      {/* Contenido Central (Emblema, Título, Subtítulo y Barra de Carga) */}
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center justify-center px-6 transition-all duration-400 ease-out ${
          isParting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Resplandor ámbar ambiental */}
        <div
          className="pointer-events-none absolute h-72 w-72 rounded-full opacity-60 animate-pulse sm:h-96 sm:w-96"
          style={{
            background: "radial-gradient(circle, rgba(221,124,52,0.25) 0%, transparent 68%)",
          }}
          aria-hidden="true"
        />

        <div className="intro-fade-scale flex flex-col items-center text-center">
          {/* Logo o Monograma */}
          {LOGO ? (
            <img
              src={LOGO}
              alt="Filipo"
              className="h-20 w-auto object-contain drop-shadow-[0_10px_35px_rgba(221,124,52,0.5)] sm:h-24"
            />
          ) : (
            <div className="relative flex size-20 items-center justify-center rounded-full border border-gold/60 bg-graphite/60 font-display text-4xl font-bold text-gold shadow-[0_0_45px_-10px_rgba(221,124,52,0.5)] sm:size-24 sm:text-5xl">
              <span>F</span>
              <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping opacity-25" />
            </div>
          )}

          {/* Nombre con tipografía distintiva */}
          <h2 className="mt-5 font-display text-3xl font-bold tracking-[0.28em] text-cream sm:text-4xl">
            FILIPO
          </h2>

          {/* Subtítulo de propuesta */}
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.38em] text-gold sm:text-xs">
            Café · Resto · Bar · Tablas
          </p>

          {/* Línea dorada de carga progresiva */}
          <div className="mt-6 h-[2px] w-36 overflow-hidden rounded-full bg-gold/20 sm:w-48">
            <div className="intro-line h-full w-full bg-gradient-to-r from-gold-light via-gold to-gold-dark" />
          </div>

          <span className="mt-4 text-[9px] font-bold uppercase tracking-[0.32em] text-cream/40">
            Salta · Argentina
          </span>
        </div>
      </div>
    </div>
  );
}

