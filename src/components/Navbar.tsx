import { useEffect, useState } from "react";
import { Bike, Menu, X } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { LOGO, NAV_LINKS } from "../data/site";
import { getBusinessStatus } from "../utils/businessHours";

interface NavbarProps {
  onOpenDelivery: () => void;
  onOpenReservation: () => void;
  ready?: boolean;
}

/** Logo oficial del local, o monograma "F" si aún no se subió */
export function LogoMark({
  compact = false,
  scrolled = false,
}: {
  compact?: boolean;
  scrolled?: boolean;
}) {
  if (LOGO) {
    return (
      <a href="#inicio" className="group flex items-center" aria-label="Filipo — Inicio">
        <img
          src={LOGO}
          alt="Filipo Café Resto Bar"
          className={`w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] ${
            scrolled ? "h-9" : "h-10 sm:h-11"
          }`}
        />
      </a>
    );
  }
  return (
    <a href="#inicio" className="group flex items-center gap-3" aria-label="Filipo — Inicio">
      <span
        className={`flex items-center justify-center rounded-full border border-gold/70 bg-ink/60 font-display font-bold text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink ${
          scrolled ? "size-8 text-base" : "size-9 sm:size-10 text-lg sm:text-xl"
        }`}
      >
        F
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display font-bold tracking-[0.28em] text-cream transition-all duration-300 ${
              scrolled ? "text-base" : "text-lg"
            }`}
          >
            FILIPO
          </span>
          <span className="mt-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] text-gold/80">
            Café · Resto · Bar
          </span>
        </span>
      )}
    </a>
  );
}

export default function Navbar({ onOpenDelivery, onOpenReservation, ready = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(() => getBusinessStatus());
  const [activeSection, setActiveSection] = useState("inicio");

  // Detección de scroll para ajustar estilo de navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Actualizar estado comercial cada 60 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Bloquear scroll de la página cuando el menú móvil está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ScrollSpy para destacar la sección activa de manera fluida
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("inicio");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          ready ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${
          scrolled
            ? "border-b border-gold/15 bg-ink/90 backdrop-blur-xl shadow-lg shadow-black/30 py-3"
            : "border-b border-transparent bg-gradient-to-b from-ink/90 via-ink/40 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* 1. Lado Izquierdo: Logotipo */}
          <div className="flex shrink-0 items-center">
            <LogoMark scrolled={scrolled} />
          </div>

          {/* 2. Centro: Navegación de escritorio en dock flotante */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 rounded-full border border-cream/10 bg-coal/60 px-3 py-1.5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                    isActive
                      ? "bg-gold/15 text-gold shadow-[0_0_12px_rgba(221,124,52,0.25)]"
                      : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* 3. Lado Derecho: Live Status con acento Mint (#48D1BA) + Acciones (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {/* Badge de estado en vivo ("Abierto ahora") */}
            <div
              className={`hidden xl:inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 text-[10.5px] tracking-wider text-cream/90 backdrop-blur-md transition-all duration-300 ${
                status.isOpen
                  ? "live-badge-pulse border border-mint/40 bg-coal/80"
                  : "border border-amber-500/35 bg-coal/80"
              }`}
            >
              <span className="relative flex size-2.5 items-center justify-center">
                {status.isOpen && (
                  <span className="live-beacon-wave absolute inline-flex h-full w-full rounded-full bg-mint" />
                )}
                <span
                  className={`relative inline-flex size-1.5 rounded-full ${
                    status.isOpen
                      ? "bg-mint shadow-[0_0_8px_#48d1ba]"
                      : "bg-amber-400"
                  }`}
                  aria-hidden="true"
                />
              </span>
              <span className={`font-bold uppercase tracking-wider ${status.isOpen ? "text-mint" : "text-amber-400"}`}>
                {status.statusText}
              </span>
              <span className="text-cream/40">·</span>
              <span className="text-cream/80">{status.nextChangeText}</span>
            </div>

            {/* Botón Delivery */}
            <button
              type="button"
              onClick={onOpenDelivery}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-cream/15 bg-coal/50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-cream/90 transition-all duration-200 hover:border-peya/60 hover:bg-peya/10 hover:text-peya hover:shadow-[0_0_14px_rgba(250,0,80,0.25)] active:scale-95"
              title="Pedir por PedidosYa"
            >
              <Bike className="size-3.5 text-peya" />
              <span>Delivery</span>
            </button>

            {/* Botón Reservar */}
            <button
              type="button"
              onClick={onOpenReservation}
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold-light px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink shadow-[0_4px_14px_-2px_rgba(221,124,52,0.4)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(221,124,52,0.6)] hover:brightness-110 active:scale-95"
            >
              <WhatsAppIcon className="size-3.5" />
              <span>Reservar</span>
            </button>
          </div>

          {/* 4. Controles para Móviles y Tablets (< lg) */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              type="button"
              onClick={onOpenReservation}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gold/70 bg-gold/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-ink active:scale-95"
              aria-label="Reservar mesa"
            >
              <WhatsAppIcon className="size-3.5" />
              <span>Reservar</span>
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-cream/15 bg-coal/70 text-cream backdrop-blur-md transition-all hover:border-gold hover:text-gold active:scale-95"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil a pantalla completa */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto bg-coal/98 backdrop-blur-2xl px-6 py-5 lg:hidden"
          style={{ animation: "fadeIn 0.25s ease both" }}
        >
          {/* Header del menú móvil */}
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-cream/10 pb-2">
            <LogoMark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-coal text-cream transition-transform duration-200 hover:border-gold hover:text-gold hover:rotate-90 active:scale-95"
              aria-label="Cerrar menú"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Cuerpo del menú móvil */}
          <div className="my-auto flex flex-col items-center justify-center py-6 w-full max-w-sm mx-auto">
            {/* Estado comercial en vivo con acento Mint (#48D1BA) */}
            <div
              className={`mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs text-cream backdrop-blur-md transition-all duration-300 ${
                status.isOpen
                  ? "live-badge-pulse border border-mint/40 bg-coal/90"
                  : "border border-amber-500/35 bg-coal/90"
              }`}
            >
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
              <span className={`font-bold ${status.isOpen ? "text-mint" : "text-amber-400"}`}>
                {status.statusText}
              </span>
              <span className="text-cream/50">·</span>
              <span className="text-cream/80">{status.nextChangeText}</span>
            </div>

            {/* Lista de Enlaces */}
            <nav className="flex w-full flex-col gap-1.5" aria-label="Navegación móvil">
              {NAV_LINKS.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-gold/15 text-gold font-bold"
                        : "text-cream/85 hover:bg-cream/5 hover:text-gold"
                    }`}
                  >
                    <span className="font-display text-2xl tracking-wide">
                      {link.label}
                    </span>
                    <span
                      className={`text-xs font-mono tracking-widest transition-opacity ${
                        isActive
                          ? "opacity-100 text-gold font-bold"
                          : "opacity-30 group-hover:opacity-80"
                      }`}
                    >
                      {`0${i + 1}`}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Acciones inferiores del menú móvil */}
          <div className="flex shrink-0 flex-col gap-3 w-full max-w-sm mx-auto border-t border-cream/10 pt-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenReservation();
              }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-light py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ink shadow-[0_4px_16px_rgba(221,124,52,0.4)] transition-transform active:scale-95"
            >
              <WhatsAppIcon className="size-4" />
              Reservar Mesa
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenDelivery();
              }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-peya/50 bg-peya/15 py-3 text-xs font-bold uppercase tracking-[0.16em] text-peya transition-colors hover:bg-peya hover:text-white active:scale-95"
            >
              <Bike className="size-4" />
              Pedir Delivery (PedidosYa)
            </button>

            <p className="mt-1 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-cream/40">
              Av. del Bicentenario 1401 · Salta
            </p>
          </div>
        </div>
      )}
    </>
  );
}
