import { useEffect } from "react";
import { ArrowUpRight, Croissant, UtensilsCrossed, X } from "lucide-react";
import { PedidosYaIcon } from "./icons";
import { DELIVERY_OPTIONS } from "../data/site";

interface DeliveryModalProps {
  open: boolean;
  onClose: () => void;
}

/** Modal con las dos opciones de PedidosYa del local */
export default function DeliveryModal({ open, onClose }: DeliveryModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="backdrop-in fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-coal/80 px-4 py-[7vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Opciones de delivery por PedidosYa"
    >
      <div
        className="modal-in relative w-full max-w-lg rounded-3xl border border-gold/15 bg-graphite p-6 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full border border-cream/10 text-cream/60 transition-all duration-300 hover:rotate-90 hover:border-gold hover:text-gold"
          aria-label="Cerrar"
        >
          <X className="size-4.5" />
        </button>

        {/* Encabezado */}
        <div className="mb-7 pr-10">
          <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-peya/15 text-peya">
            <PedidosYaIcon className="size-7" />
          </span>
          <h3 className="font-display text-3xl text-cream">Pedí tu Filipo a domicilio</h3>
          <p className="mt-2 font-elegant text-lg italic text-cream/60">
            Dos perfiles en PedidosYa. Elegí el tuyo.
          </p>
        </div>

        {/* Opciones */}
        <div className="space-y-4">
          {DELIVERY_OPTIONS.map((opt) => {
            const Icon = opt.accent === "tablas" ? UtensilsCrossed : Croissant;
            return (
              <div
                key={opt.id}
                className="group flex items-center gap-4 rounded-2xl border border-cream/8 bg-ink/60 p-4 transition-all duration-300 hover:border-peya/40 hover:bg-ink sm:gap-5 sm:p-5"
              >
                <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-peya/15 group-hover:text-peya">
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight text-cream">
                    {opt.brand}{" "}
                    <span className="text-gold">{opt.name}</span>
                  </p>
                  <p className="mt-1 truncate text-xs tracking-wide text-cream/50 sm:text-[13px]">
                    {opt.items.join(" · ")}
                  </p>
                </div>
                <a
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-peya px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-peya-dark hover:shadow-[0_10px_25px_-8px_rgba(250,0,80,0.6)] sm:px-4"
                >
                  <span className="hidden sm:inline">Pedir</span>
                  PedidosYa
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed tracking-wide text-cream/40">
          Serás redirigido a PedidosYa para completar tu pedido.
        </p>
      </div>
    </div>
  );
}
