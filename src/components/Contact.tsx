import { useState } from "react";
import {
  Clock,
  MapPin,
  Phone,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, type IconComponent } from "./icons";
import { CONTACT, LINKS, MAPS_EMBED, WA_MESSAGES, waLink } from "../data/site";
import { getBusinessStatus } from "../utils/businessHours";

interface ContactProps {
  onOpenReservation?: () => void;
}

interface InfoRow {
  icon: IconComponent;
  label: string;
  value: string;
  sub?: string;
  href?: string;
}

const INFO: InfoRow[] = [
  {
    icon: MapPin,
    label: "Dirección",
    value: CONTACT.address,
    sub: CONTACT.addressExtra,
    href: LINKS.mapsLink,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: CONTACT.phoneDisplay,
    href: CONTACT.phoneHref,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    href: waLink(WA_MESSAGES.consulta),
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: CONTACT.instagram,
    href: LINKS.instagram,
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    value: "Filipo Café Resto Bar",
    href: LINKS.facebook,
  },
];

export default function Contact({ onOpenReservation }: ContactProps) {
  const [status] = useState(() => getBusinessStatus());
  return (
    <section id="contacto" className="relative bg-graphite py-24 md:py-32">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeading
          eyebrow="Reservas & Contacto"
          title="Te esperamos en Filipo"
          subtitle="Reservá tu mesa o pasá a conocernos"
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Columna: información */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-cream/8 bg-ink p-7 sm:p-9">
              <div className="space-y-6">
                {INFO.map((row) => (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.href?.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/8 text-gold transition-all duration-400 group-hover:bg-gold group-hover:text-ink">
                      <row.icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-cream/40">
                        {row.label}
                      </span>
                      <span className="mt-1 block font-display text-lg leading-snug text-cream transition-colors duration-300 group-hover:text-gold">
                        {row.value}
                      </span>
                      {row.sub && (
                        <span className="mt-0.5 block text-xs text-cream/45">{row.sub}</span>
                      )}
                      {row.label === "Dirección" && (
                        <span className="mt-1.5 inline-block border-b border-gold/40 pb-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                          Cómo llegar
                        </span>
                      )}
                    </span>
                  </a>
                ))}
              </div>

              {/* Horarios */}
              <div className="mt-8 rounded-2xl border border-cream/8 bg-cream/[0.03] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-gold" />
                    <h3 className="font-display text-xl text-cream">Horarios</h3>
                  </div>
                  {/* Badge de estado en tiempo real con acento Mint (#48D1BA) */}
                  <div
                    className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 text-[11px] font-medium text-cream backdrop-blur-md transition-all duration-300 ${
                      status.isOpen
                        ? "live-badge-pulse border border-mint/40 bg-coal/90"
                        : "border border-amber-500/35 bg-coal/90"
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
                    <span className={`font-bold ${status.isOpen ? "text-mint" : "text-amber-400"}`}>
                      {status.statusText}
                    </span>
                    <span className="text-cream/50">·</span>
                    <span className="text-cream/80">{status.nextChangeText}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 text-sm">
                  <p className="flex items-center justify-between gap-4 text-cream/70">
                    <span>Lunes a viernes</span>
                    <span className="font-bold text-cream text-right">
                      7:30 a.m. – 12:00 a.m.
                    </span>
                  </p>
                  <div className="hairline" aria-hidden="true" />
                  <p className="flex items-center justify-between gap-4 text-cream/70">
                    <span>Sábados y domingos</span>
                    <span className="font-bold text-cream text-right">
                      8:30 a.m. – 1:00 a.m.
                    </span>
                  </p>
                </div>
                <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-gold/20 bg-gold/6 px-4 py-3 text-xs leading-relaxed text-gold-light/90">
                  <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-gold" />
                  Carta abierta todo el día en horario corrido · Consultar horarios especiales vía WhatsApp
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {onOpenReservation ? (
                  <button
                    type="button"
                    onClick={onOpenReservation}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_16px_45px_-12px_rgba(221,124,52,0.5)]"
                  >
                    <Sparkles className="size-4" />
                    Asistente de Reservas
                  </button>
                ) : (
                  <a
                    href={waLink(WA_MESSAGES.reserva)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_16px_45px_-12px_rgba(221,124,52,0.5)]"
                  >
                    <WhatsAppIcon className="size-4" />
                    Reservar por WhatsApp
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* Columna: mapa */}
          <Reveal delay={150} className="h-full">
            <div className="map-dark relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-gold/20 lg:min-h-full">
              <iframe
                src={MAPS_EMBED}
                title="Mapa: Filipo Café Resto Bar, Av. del Bicentenario 1401, Salta Capital"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Chip de dirección sobre el mapa */}
              <a
                href={LINKS.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group absolute top-5 left-5 flex items-center gap-3 rounded-full border border-gold/25 bg-coal/85 py-3 pr-6 pl-4 backdrop-blur-md transition-all duration-300 hover:border-gold/60"
              >
                <MapPin className="size-5 text-gold" />
                <span>
                  <span className="block font-display text-sm leading-none text-cream group-hover:text-gold">
                    Av. del Bicentenario 1401
                  </span>
                  <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-cream/50">
                    Abrir en Google Maps
                  </span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}