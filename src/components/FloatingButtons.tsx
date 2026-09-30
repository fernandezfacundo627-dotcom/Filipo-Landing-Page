import { BookOpenText } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { LINKS } from "../data/site";

/** Accesos flotantes fijos: WhatsApp directo a chat oficial (derecha) y Carta digital (izquierda) */
export default function FloatingButtons() {
  return (
    <aside aria-label="Accesos rápidos flotantes">
      {/* Carta digital — abajo a la izquierda */}
      <a
        href={LINKS.menu}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver la carta completa de Filipo"
        className="fixed bottom-5 left-4 sm:left-6 z-[60] flex items-center gap-2 rounded-full bg-gold py-3 px-3.5 sm:py-3.5 sm:px-5 text-ink shadow-[0_15px_40px_-10px_rgba(221,124,52,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-gold-light cursor-pointer select-none"
      >
        <BookOpenText className="size-5 text-ink shrink-0" />
        <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.14em]">
          Carta
        </span>
      </a>

      {/* WhatsApp directo al chat oficial de Filipo — abajo a la derecha */}
      <a
        href={LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir directamente al WhatsApp de Filipo"
        className="fixed bottom-5 right-4 sm:right-6 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] py-3 px-4 sm:py-3.5 sm:px-5 text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_20px_50px_-10px_rgba(37,211,102,0.7)] cursor-pointer select-none"
      >
        <span className="relative flex items-center justify-center shrink-0">
          <span className="absolute -inset-1 rounded-full bg-white/35 animate-ping opacity-75 pointer-events-none" />
          <WhatsAppIcon className="size-5 sm:size-6 text-white relative z-10" />
        </span>
        <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.14em]">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
