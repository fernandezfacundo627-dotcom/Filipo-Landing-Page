import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Sparkles,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { WA_NUMBER } from "../data/site";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
}

const DINER_OPTIONS = ["1-2 personas", "3-4 personas", "5-6 personas", "7-8 personas", "+8 personas"];

const DAY_OPTIONS = ["Hoy", "Mañana", "Otro día"];

const TIME_OPTIONS = [
  { label: "Desayuno", time: "08:30 - 12:00", icon: "☕" },
  { label: "Almuerzo Ejecutivo", time: "12:30 - 15:30", icon: "🍽️" },
  { label: "Merienda", time: "16:30 - 20:00", icon: "🍰" },
  { label: "Cena & Tablas", time: "20:30 - 00:00+", icon: "🍷" },
];

const OCCASION_OPTIONS = [
  "Salida casual",
  "Cumpleaños 🎂",
  "Con amigos 🍻",
  "Cita / Pareja 🍷",
  "Reunión / Trabajo 💼",
  "Mesa cerca de libros 📖",
];

export default function ReservationModal({ open, onClose }: ReservationModalProps) {
  const [diners, setDiners] = useState("3-4 personas");
  const [day, setDay] = useState("Hoy");
  const [customDate, setCustomDate] = useState("");
  const [timeShift, setTimeShift] = useState("Cena & Tablas");
  const [occasion, setOccasion] = useState("Salida casual");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

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

  // Fecha mínima para "Otro día" en hora local (evita desfases UTC)
  // Como "Hoy" y "Mañana" ya están cubiertos, el mínimo es pasado mañana
  const getLocalDateString = (daysOffset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const minDate = getLocalDateString(2); // pasado mañana en adelante


  // Fecha final: si eligió "Otro día" y completó el input, usa esa fecha; si no, pone "Otro día (a coordinar)"
  const dateValue =
    day === "Otro día"
      ? customDate
        ? new Date(customDate + "T00:00:00").toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        : "Otro día (a coordinar)"
      : day;

  const [isSending, setIsSending] = useState(false);

  // Validación y sanitización
  const sanitizeText = (str: string) => str.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
  const cleanName = sanitizeText(name);
  const cleanNote = sanitizeText(note);
  const canSend = cleanName.length > 0;

  // Construir mensaje de WhatsApp
  const generateMessage = () => {
    let msg = `Hola Filipo! 👋 Quiero hacer una reserva en el local:\n\n`;
    msg += `👥 *Comensales:* ${diners}\n`;
    msg += `📅 *Fecha:* ${dateValue}\n`;
    msg += `⏰ *Turno:* ${timeShift}\n`;
    if (occasion && occasion !== "Salida casual") {
      msg += `✨ *Ocasión:* ${occasion}\n`;
    }
    msg += `👤 *A nombre de:* ${cleanName}\n`;
    if (cleanNote) {
      msg += `📝 *Nota/Preferencia:* ${cleanNote}\n`;
    }
    msg += `\n¿Tienen mesa disponible? Muchas gracias!`;
    return msg;
  };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(generateMessage())}`;

  const handleSend = () => {
    if (!canSend || isSending) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onClose();
    }, 350);
  };

  return (
    <div
      className="backdrop-in fixed inset-0 z-[75] flex items-start justify-center overflow-y-auto bg-coal/85 px-4 py-8 backdrop-blur-md sm:py-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-title"
    >
      <div
        className="modal-in relative w-full max-w-xl rounded-3xl border border-gold/25 bg-graphite p-5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex size-10 cursor-pointer items-center justify-center rounded-full border border-cream/10 text-cream/60 transition-all duration-300 hover:rotate-90 hover:border-gold hover:text-gold"
          aria-label="Cerrar ventana de reserva"
        >
          <X className="size-5" />
        </button>

        {/* Encabezado */}
        <div className="pr-10">
          <span className="eyebrow text-gold">
            <UtensilsCrossed className="size-3.5" />
            Reservas Filipo
          </span>
          <h2 id="reservation-title" className="mt-2 font-display text-3xl text-cream sm:text-4xl">
            Reservá tu mesa
          </h2>
          <p className="mt-1 font-elegant text-lg italic text-cream/65">
            Elegí tus preferencias y te armamos el mensaje de WhatsApp al instante.
          </p>
        </div>

        <div className="hairline my-6" aria-hidden="true" />

        {/* Pasos / Selectores */}
        <div className="space-y-6 text-left">
          {/* 1. Comensales */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <Users className="size-3.5" />
              ¿Cuántas personas van?
            </label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {DINER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDiners(opt)}
                  className={`cursor-pointer rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide transition-all ${
                    diners === opt
                      ? "border border-gold bg-gold text-ink shadow-[0_0_20px_-5px_rgba(221,124,52,0.5)]"
                      : "border border-cream/10 bg-ink/70 text-cream/75 hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Día */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <Calendar className="size-3.5" />
              ¿Qué día?
            </label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {DAY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { setDay(opt); if (opt !== "Otro día") setCustomDate(""); }}
                  className={`cursor-pointer rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide transition-all ${
                    day === opt
                      ? "border border-gold bg-gold text-ink shadow-[0_0_20px_-5px_rgba(221,124,52,0.5)]"
                      : "border border-cream/10 bg-ink/70 text-cream/75 hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {/* Input de fecha cuando elige "Otro día" */}
            {day === "Otro día" && (
              <input
                type="date"
                value={customDate}
                min={minDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="mt-3 w-full rounded-xl border border-gold/30 bg-ink px-4 py-2.5 text-base sm:text-sm text-cream placeholder-cream/40 focus:border-gold focus:outline-none"
              />
            )}
          </div>

          {/* 3. Turno */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <Clock className="size-3.5" />
              Turno deseado
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setTimeShift(opt.label)}
                  className={`flex cursor-pointer flex-col rounded-2xl p-3 text-left transition-all ${
                    timeShift === opt.label
                      ? "border border-gold bg-gold/15 text-cream shadow-[0_0_25px_-8px_rgba(221,124,52,0.4)]"
                      : "border border-cream/8 bg-ink/50 text-cream/70 hover:border-cream/20 hover:text-cream"
                  }`}
                >
                  <span className="flex items-center gap-1.5 font-display text-sm font-bold text-cream">
                    <span>{opt.icon}</span> {opt.label}
                  </span>
                  <span className="mt-1 text-[11px] text-cream/50">{opt.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Ocasión (Opcional) */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <Sparkles className="size-3.5" />
              Ocasión especial (opcional)
            </label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {OCCASION_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setOccasion(opt)}
                  className={`cursor-pointer rounded-full px-3 py-1.5 text-xs transition-all ${
                    occasion === opt
                      ? "border border-gold/60 bg-gold/20 font-bold text-gold"
                      : "border border-cream/10 bg-ink/40 text-cream/60 hover:border-cream/25 hover:text-cream/90"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Nombre (requerido) y Preferencias */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-cream/60">
                Tu nombre <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Facundo"
                value={name}
                maxLength={60}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-base sm:text-sm text-cream placeholder-cream/30 transition-colors focus:outline-none ${
                  cleanName
                    ? "border-gold/50 bg-ink focus:border-gold"
                    : "border-red-500/40 bg-ink focus:border-red-400"
                }`}
              />
              {!cleanName && (
                <p className="mt-1 text-[10px] text-red-400">Ingresá tu nombre para continuar</p>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-cream/60">
                Preferencia (opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: Menú Sin Gluten Agregado / Terraza"
                value={note}
                maxLength={180}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-cream/10 bg-ink px-4 py-2.5 text-base sm:text-sm text-cream placeholder-cream/30 transition-colors focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Botón de WhatsApp */}
        <div className="mt-8">
          {canSend ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSend}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl bg-wa px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_16px_40px_-10px_rgba(37,211,102,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-[0_20px_50px_-10px_rgba(37,211,102,0.7)] ${
                isSending ? "opacity-75 pointer-events-none" : ""
              }`}
            >
              <WhatsAppIcon className="size-5" />
              {isSending ? "Abriendo WhatsApp..." : "Enviar Reserva por WhatsApp"}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-2xl bg-cream/10 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-cream/30"
            >
              <WhatsAppIcon className="size-5" />
              Completá tu nombre para continuar
            </button>
          )}

          <p className="mt-3 text-center text-[11px] text-cream/40">
            Se abrirá WhatsApp con los datos ya completados para confirmar tu mesa en minutos.
          </p>
        </div>
      </div>
    </div>
  );
}
