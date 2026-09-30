import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Eye,
  Leaf,
  Martini,
  Sandwich,
  Sparkles,
  Star,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { WhatsAppIcon } from "./icons";
import { IMAGES, LINKS, WA_MESSAGES, waLink } from "../data/site";
import tablaPinchos1 from "../assets/galeria/tabla-pinchos-1.webp";
import tablaPinchos2 from "../assets/galeria/tabla-pinchos-2.webp";
import wraps1 from "../assets/galeria/wraps-1.webp";
import combos1 from "../assets/galeria/combos-1.webp";
import meriendas1 from "../assets/galeria/meriendas-1.webp";

interface ShowcaseItem {
  id: string;
  category: "tablas" | "platos" | "burgers" | "cafe" | "coctel" | "singluten";
  title: string;
  tagline: string;
  shortDesc: string;
  image: string;
  alt: string;
  badge?: { label: string; tone: "gold" | "green" };
}

interface CategoryFilter {
  id: string;
  label: string;
  icon: LucideIcon;
}

const CATEGORIES: CategoryFilter[] = [
  { id: "todos", label: "Todos", icon: Sparkles },
  { id: "tablas", label: "Tablas", icon: UtensilsCrossed },
  { id: "platos", label: "Platos & Ejecutivo", icon: ChefHat },
  { id: "burgers", label: "Burgers & Wraps", icon: Sandwich },
  { id: "cafe", label: "Cafetería & Dulces", icon: Coffee },
  { id: "coctel", label: "Coctelería", icon: Martini },
  { id: "singluten", label: "Sin Gluten", icon: Leaf },
];

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "super-tabla",
    category: "tablas",
    title: "Súper Tabla Filipo",
    tagline: "Comen 2, Pican 4",
    shortDesc: "Lomo, bondiola de cerdo, pollo, sartén de quesos fundidos y papas fritas crocantes.",
    image: IMAGES.tablas,
    alt: "Famosa Súper Tabla Filipo con carnes, quesos fundidos y papas",
    badge: { label: "La Más Pedida", tone: "gold" },
  },
  {
    id: "tabla-pinchos",
    category: "tablas",
    title: "Tabla de Pinchos",
    tagline: "Para compartir",
    shortDesc: "Pinchos a la plancha de carnes seleccionadas, vegetales grillados, variedad de salsas y papas.",
    image: tablaPinchos1,
    alt: "Tabla de pinchos con carnes grilladas y salsas caseras",
    badge: { label: "Plato Estrella", tone: "gold" },
  },
  {
    id: "martillo-thor",
    category: "tablas",
    title: "Tabla El Martillo de Thor",
    tagline: "Cocción Ultra Lenta",
    shortDesc: "Osobuco braseado presentado con hueso central para untar caracú en tostadas de masa madre.",
    image: tablaPinchos2,
    alt: "Osobuco entero braseado presentado con hueso y tostadas de masa madre",
    badge: { label: "Especialidad", tone: "gold" },
  },
  {
    id: "medallon-lomo",
    category: "platos",
    title: "Medallón de Lomo al Malbec",
    tagline: "Cocina de Autor",
    shortDesc: "Medallón de lomo envuelto en panceta ahumada sobre colchón de cebollas caramelizadas.",
    image: IMAGES.ejecutivo,
    alt: "Medallón de lomo gourmet con reducción de vino Malbec",
    badge: { label: "Gourmet", tone: "gold" },
  },
  {
    id: "pastas-risotto",
    category: "platos",
    title: "Pastas Caseras & Risotto",
    tagline: "Almuerzos & Cenas",
    shortDesc: "Pastas con salsas artesanales y risotto cremoso con variedad de hongos silvestres.",
    image: IMAGES.pastas,
    alt: "Plato de pastas caseras con salsa y queso parmesano",
    badge: { label: "Elaboración Propia", tone: "gold" },
  },
  {
    id: "burger-cheddar",
    category: "burgers",
    title: "Hamburguesa Doble Cheddar",
    tagline: "Pan Brioche Casero",
    shortDesc: "Doble medallón casero, doble capa de queso cheddar fundido, panceta ahumada y papas fritas.",
    image: IMAGES.burger,
    alt: "Hamburguesa casera doble cheddar con panceta y papas",
    badge: { label: "Favorita", tone: "gold" },
  },
  {
    id: "wraps-plato",
    category: "burgers",
    title: "Wraps al Plato con Papas",
    tagline: "Carne · Pollo · Veggie",
    shortDesc: "Tortillas caseras con carne braseada o pechuga de pollo, hojas verdes y pimientos confitados.",
    image: wraps1,
    alt: "Wraps caseros servidos al plato con papas fritas",
    badge: { label: "Recién Dorado", tone: "gold" },
  },
  {
    id: "capuchino-pasteleria",
    category: "cafe",
    title: "Café Especial & Minicakes",
    tagline: "Desayunos & Meriendas",
    shortDesc: "Espresso italiano, capuchino con arte latte, cheesecake de frutos rojos y chocotorta.",
    image: IMAGES.cafe,
    alt: "Capuchino con arte latte y minicakes de pastelería artesanal",
    badge: { label: "Pastelería Propia", tone: "gold" },
  },
  {
    id: "avocado-brunch",
    category: "cafe",
    title: "Avocado Toast & Brunch",
    tagline: "Propuesta Saludable",
    shortDesc: "Pan de masa madre tostado, palta fresca pisada, huevos de campo y jugo de naranja.",
    image: combos1,
    alt: "Avocado toast saludable con huevo pochado y jugo",
    badge: { label: "Saludable", tone: "gold" },
  },
  {
    id: "waffles-meriendas",
    category: "cafe",
    title: "Waffles con Helado Artesanal",
    tagline: "Dulces & Salados",
    shortDesc: "Waffles tibios recién dorados con helado artesanal, frutas de estación o medialunas rellenas.",
    image: meriendas1,
    alt: "Waffles tibios con helado artesanal y frutas",
    badge: { label: "Para la Tarde", tone: "gold" },
  },
  {
    id: "trago-filipo",
    category: "coctel",
    title: "Trago Filipo & Coctelería",
    tagline: "Trago Insignia",
    shortDesc: "Vodka, sake, sirope artesanal de jengibre y jugo natural de pomelo rosado.",
    image: IMAGES.coctel,
    alt: "Coctelería de autor y barra nocturna en Filipo",
    badge: { label: "Creación de la Casa", tone: "gold" },
  },
  {
    id: "sin-gluten",
    category: "singluten",
    title: "Propuesta Sin Gluten Agregado",
    tagline: "Opciones Aptas",
    shortDesc: "Medallones de lomo, sándwiches en pan especial, ensaladas completas y desayunos sin TACC.",
    image: IMAGES.singluten,
    alt: "Opciones de platos y cafetería sin gluten agregado",
    badge: { label: "Sin Gluten", tone: "green" },
  },
];

export default function Specialties() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  const filteredItems =
    activeCategory === "todos"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  // Manejo de navegación en el modal
  const openModal = (item: ShowcaseItem) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const currentIndex = selectedItem
    ? filteredItems.findIndex((i) => i.id === selectedItem.id)
    : -1;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setSelectedItem(filteredItems[nextIndex]);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex >= 0) {
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      setSelectedItem(filteredItems[prevIndex]);
    }
  };

  // Atajos de teclado para el visor
  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem, currentIndex, filteredItems]);

  return (
    <section id="carta" className="relative bg-graphite py-16 md:py-24 overflow-hidden">
      {/* Resplandor ámbar ambiental de fondo */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(221,124,52,0.25) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="La Carta"
          title="Vidriera Gastronómica"
          subtitle="Carta abierta todo el día · Descubrí nuestros platos más elegidos"
        />

        {/* Banner destacado: Carta abierta todo el día */}
        <Reveal delay={80} className="mb-7 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs text-cream/90 shadow-[0_0_20px_-5px_rgba(221,124,52,0.25)] backdrop-blur-sm sm:px-5">
            <Clock className="size-4 shrink-0 text-gold" />
            <span className="text-center">
              <strong className="mr-1.5 font-bold uppercase tracking-wider text-[11px] text-gold">
                Cocina sin pausas:
              </strong>
              Carta abierta todo el día para pedir lo que tengas ganas, cuando tengas ganas.
            </span>
          </div>
        </Reveal>

        {/* Filtros visuales por categoría */}
        <Reveal delay={120} className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === "todos"
                  ? SHOWCASE_ITEMS.length
                  : SHOWCASE_ITEMS.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "scale-105 border border-gold bg-gold text-ink shadow-[0_0_20px_-4px_rgba(221,124,52,0.55)]"
                      : "border border-cream/10 bg-ink/70 text-cream/70 hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  <Icon className={`size-3.5 ${isActive ? "text-ink" : "text-gold"}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${
                      isActive ? "bg-ink/20 text-ink font-black" : "bg-cream/10 text-cream/60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Vidriera de Platos (Grid visual con foto como protagonista) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 90}>
              <article
                onClick={() => openModal(item)}
                className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-cream/10 bg-coal/80 shadow-lg transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-coal hover:shadow-[0_22px_45px_-15px_rgba(221,124,52,0.3)]"
              >
                {/* Contenedor fotográfico principal (Vidriera) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="img-warm h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradiente cinemático inferior suave */}
                  <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-black/25" />

                  {/* Tagline flotante superior izquierda */}
                  <span className="absolute top-3.5 left-3.5 rounded-full border border-cream/15 bg-ink/75 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cream/90 backdrop-blur-md">
                    {item.tagline}
                  </span>

                  {/* Badge superior derecha */}
                  {item.badge && (
                    <span
                      className={`absolute top-3.5 right-3.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                        item.badge.tone === "gold"
                          ? "border border-gold/50 bg-coal/90 text-gold"
                          : "border border-mint/40 bg-coal/90 text-mint shadow-[0_0_12px_rgba(72,209,186,0.3)]"
                      }`}
                    >
                      {item.badge.tone === "gold" ? (
                        <Star className="size-2.5 fill-current" />
                      ) : (
                        <Leaf className="size-2.5 text-mint" />
                      )}
                      {item.badge.label}
                    </span>
                  )}

                  {/* Efecto hover: botón "Ver plato" centrado con suave desenfoque */}
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                    <span className="flex translate-y-2 items-center gap-2 rounded-full border border-gold/70 bg-ink/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold shadow-xl transition-transform duration-300 group-hover:translate-y-0">
                      <Eye className="size-3.5" />
                      Ver plato
                    </span>
                  </div>
                </div>

                {/* Pie de foto limpio y sin exceso de texto */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug text-cream transition-colors duration-300 group-hover:text-gold sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-cream/65 line-clamp-2 sm:text-[13px]">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-cream/8 pt-3 text-[11px] font-bold uppercase tracking-wider text-gold/80">
                    <span className="flex items-center gap-1 group-hover:text-gold">
                      Carta abierta
                    </span>
                    <span className="inline-flex items-center gap-1 text-cream/45 transition-colors group-hover:text-gold">
                      Explorar
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                {/* Acento dorado inferior */}
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-400 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA General al menú digital */}
        <Reveal delay={150} className="mt-12 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={LINKS.menu}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-[0_10px_30px_-5px_rgba(221,124,52,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_16px_40px_-8px_rgba(221,124,52,0.6)]"
            >
              Ver Carta Completa con Precios
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
          <p className="mt-3 text-xs text-cream/50">
            Consultá la lista completa de platos, guarniciones y bebidas en nuestra carta digital oficial.
          </p>
        </Reveal>
      </div>

      {/* Modal / Lightbox Visor de Vidriera */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={closeModal}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-gold/40 bg-coal shadow-[0_25px_70px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Cabecera / Foto de alta resolución */}
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-ink sm:aspect-[16/9]">
              <img
                src={selectedItem.image}
                alt={selectedItem.alt}
                className="img-warm h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-black/40" />

              {/* Botón cerrar */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-coal/80 text-cream backdrop-blur-md transition-all hover:border-gold hover:text-gold active:scale-95"
                aria-label="Cerrar vista de plato"
              >
                <X className="size-5" />
              </button>

              {/* Navegación anterior / siguiente */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-coal/80 text-cream backdrop-blur-md transition-all hover:border-gold hover:text-gold active:scale-95"
                    aria-label="Plato anterior"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-coal/80 text-cream backdrop-blur-md transition-all hover:border-gold hover:text-gold active:scale-95"
                    aria-label="Plato siguiente"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              {/* Badges superiores en el visor */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cream/15 bg-ink/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cream/90 backdrop-blur-md">
                  {selectedItem.tagline}
                </span>
                {selectedItem.badge && (
                  <span
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                      selectedItem.badge.tone === "gold"
                        ? "border border-gold/50 bg-coal/90 text-gold"
                        : "border border-mint/40 bg-coal/90 text-mint"
                    }`}
                  >
                    {selectedItem.badge.tone === "gold" ? (
                      <Star className="size-2.5 fill-current" />
                    ) : (
                      <Leaf className="size-2.5 text-mint" />
                    )}
                    {selectedItem.badge.label}
                  </span>
                )}
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="flex flex-1 flex-col overflow-y-auto p-5 sm:p-7">
              <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
                {selectedItem.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-cream/80 sm:text-base">
                {selectedItem.shortDesc}
              </p>

              {/* Aviso de Carta Abierta */}
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-gold/25 bg-gold/8 px-4 py-2.5 text-xs text-gold-light">
                <Clock className="size-4 shrink-0 text-gold" />
                <span>
                  <strong className="font-bold text-gold">Carta abierta todo el día:</strong> Disponible
                  para pedir en salón, retiro o delivery en cualquier horario de apertura.
                </span>
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={LINKS.menu}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ink shadow-md transition-all hover:bg-gold-light"
                >
                  Ver en Carta Digital
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href={waLink(`${WA_MESSAGES.consulta} sobre ${selectedItem.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/60 bg-ink/50 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream transition-all hover:bg-gold/15"
                >
                  <WhatsAppIcon className="size-4 text-gold" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hairline absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
