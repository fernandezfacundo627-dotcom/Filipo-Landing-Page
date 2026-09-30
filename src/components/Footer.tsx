import { FacebookIcon, InstagramIcon, PedidosYaIcon, WhatsAppIcon } from "./icons";
import { LINKS, LOGO, NAV_LINKS } from "../data/site";

export default function Footer() {
  return (
    <footer className="relative bg-coal pt-16 pb-8">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-5 text-center">
        {/* Logo */}
        <a href="#inicio" className="group inline-flex flex-col items-center" aria-label="Filipo — Volver al inicio">
          {LOGO ? (
            <img
              src={LOGO}
              alt="Logo de Filipo Café Resto Bar"
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <>
              <span className="flex size-14 items-center justify-center rounded-full border border-gold/60 font-display text-2xl font-bold text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-coal">
                F
              </span>
              <span className="mt-4 font-display text-lg font-bold tracking-[0.32em] text-cream">
                FILIPO
              </span>
            </>
          )}
          <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.35em] text-gold/70">
            Café · Resto · Bar · Tablas
          </span>
        </a>

        {/* Links rápidos */}
        <nav className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label="Enlaces del pie">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.24em] text-cream/55 transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Redes y canales de contacto oficiales */}
        <div className="mt-9 flex items-center justify-center gap-3.5 sm:gap-4">
          {/* Instagram */}
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full border border-cream/12 bg-graphite/40 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold hover:shadow-[0_10px_25px_-8px_rgba(221,124,52,0.4)]"
            aria-label="Instagram oficial de Filipo"
          >
            <InstagramIcon className="size-5" />
          </a>

          {/* WhatsApp */}
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full border border-cream/12 bg-graphite/40 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_10px_25px_-8px_rgba(37,211,102,0.4)]"
            aria-label="WhatsApp oficial de Filipo"
          >
            <WhatsAppIcon className="size-5" />
          </a>

          {/* Facebook */}
          <a
            href={LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full border border-cream/12 bg-graphite/40 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#1877F2] hover:text-[#1877F2] hover:shadow-[0_10px_25px_-8px_rgba(24,119,242,0.4)]"
            aria-label="Facebook oficial de Filipo"
          >
            <FacebookIcon className="size-5" />
          </a>

          {/* PedidosYa con logo oficial */}
          <a
            href={LINKS.peyaTablas}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full border border-cream/12 bg-graphite/40 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-peya hover:text-peya hover:shadow-[0_10px_25px_-8px_rgba(250,0,80,0.5)]"
            aria-label="Filipo en PedidosYa"
          >
            <PedidosYaIcon className="size-5" />
          </a>
        </div>

        <div className="hairline mx-auto mt-10 max-w-md" aria-hidden="true" />

        {/* Legal */}
        <p className="mt-7 text-xs tracking-wide text-cream/40">
          © {new Date().getFullYear()} Filipo Café Resto Bar · Salta, Argentina. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
