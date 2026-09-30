import { ArrowUpRight, Lightbulb } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { PedidosYaIcon, WhatsAppIcon } from "./icons";
import { DELIVERY_OPTIONS, WA_MESSAGES, waLink } from "../data/site";

/** Sección protagonista: doble perfil de PedidosYa */
export default function Delivery() {
  return (
    <section
      id="delivery"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(250,0,80,0.13) 0%, transparent 62%), #120e0e",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <SectionHeading
          eyebrow="Delivery"
          title="Pedí desde donde estés"
          subtitle="Tenemos dos perfiles en PedidosYa según lo que quieras pedir"
          tone="peya"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {DELIVERY_OPTIONS.map((opt, i) => (
            <Reveal key={opt.id} delay={i * 150}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream/8 bg-graphite transition-all duration-500 hover:-translate-y-2 hover:border-peya/50 hover:shadow-[0_35px_80px_-25px_rgba(250,0,80,0.4)]">
                {/* Imagen de cabecera */}
                <div className="relative h-52 overflow-hidden sm:h-60">
                  <img
                    src={opt.image}
                    alt={`${opt.brand} ${opt.name} — pedidos por PedidosYa`}
                    loading="lazy"
                    className="img-warm h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-107"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/25 to-transparent" />
                  {/* Chip PedidosYa */}
                  <span className="absolute top-5 right-5 flex items-center gap-2 rounded-full border border-peya/40 bg-coal/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    <PedidosYaIcon className="size-3.5" />
                    PedidosYa
                  </span>
                  {/* Título sobre imagen */}
                  <div className="absolute bottom-4 left-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-gold">
                      {opt.brand}
                    </p>
                    <h3 className="mt-1 font-display text-3xl text-cream sm:text-4xl">
                      {opt.name}
                    </h3>
                  </div>
                </div>

                {/* Cuerpo */}
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {opt.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-cream/70"
                      >
                        <span
                          className="size-1.5 shrink-0 rotate-45 bg-gold"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={opt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center justify-center gap-2.5 rounded-2xl bg-peya px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-peya-dark hover:shadow-[0_18px_45px_-12px_rgba(250,0,80,0.6)]"
                  >
                    <PedidosYaIcon className="size-4.5" />
                    Pedir en PedidosYa
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Nota orientativa */}
        <Reveal delay={200}>
          <div className="mx-auto mt-12 flex max-w-2xl items-start gap-4 rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-gold" />
            <p className="text-sm leading-relaxed text-cream/75">
              <span className="font-bold text-cream">¿No sabés cuál elegir?</span> Si querés
              tablas, comida o tragos → <span className="font-bold text-gold">Filipo Bar De Tablas</span>.
              Si querés café, medialunas o algo dulce →{" "}
              <span className="font-bold text-gold">Filipo Coffe</span>.
            </p>
          </div>
        </Reveal>

        {/* CTA secundario: retiro en local */}
        <Reveal delay={280} className="mt-10 text-center">
          <a
            href={waLink(WA_MESSAGES.retiro)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-cream/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-cream/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
          >
            <WhatsAppIcon className="size-4 text-gold" />
            ¿Preferís retirar en local? Escribinos
          </a>
        </Reveal>
      </div>
    </section>
  );
}
