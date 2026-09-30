import { Diamond } from "lucide-react";

const ITEMS = [
  "Café de especialidad",
  "Carta abierta todo el día",
  "Tablas para compartir",
  "Menú ejecutivo",
  "Coctelería clásica",
  "Pastelería artesanal",
  "Delivery por PedidosYa",
];

/** Cinta infinita con las especialidades de la casa */
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y border-gold/15 bg-coal py-4"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.32em] whitespace-nowrap text-gold/80"
          >
            {item}
            <Diamond className="size-2.5 fill-gold/50 text-gold/50" />
          </span>
        ))}
      </div>
      {/* Fundidos laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-coal to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-coal to-transparent" />
    </div>
  );
}
