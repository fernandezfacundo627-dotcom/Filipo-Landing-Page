/**
 * ══════════════════════════════════════════════════════
 *  FILIPO CAFÉ RESTO BAR · Datos centralizados del sitio
 *  (Editar aquí cualquier link, teléfono u horario)
 * ══════════════════════════════════════════════════════
 */

/* ─── Fotos propias ──────────────────────────────────────────────
 *  Copiá tus fotos comprimidas en:  src/assets/fotos/
 *  con los nombres indicados en  src/assets/fotos/README.md
 *  (hero.jpg, tablas.jpg, cafeteria.jpg, etc.)
 *
 *  Al compilar, cualquier foto encontrada reemplaza automáticamente
 *  a la imagen provisoria de abajo. Los que falten siguen usando
 *  la provisoria.
 * ──────────────────────────────────────────────────────────────── */
const fotosPropias = import.meta.glob("../assets/fotos/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/* ─── Logo del local ───────────────────────────────────────────
 *  Colocá el archivo del logo en src/assets/fotos/ con el nombre
 *  "logo" (logo.svg · logo.png · logo.webp · logo.jpg).
 *  Se usa automáticamente en navbar, hero, footer y favicon.
 *  Recomendado: fondo transparente, versión clara (el sitio es oscuro).
 * ──────────────────────────────────────────────────────────────── */
const logoArchivos = import.meta.glob(
  "../assets/fotos/logo.{svg,png,webp,avif,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const logoKey = [".svg", ".png", ".webp", ".avif", ".jpg", ".jpeg"]
  .map((ext) =>
    Object.keys(logoArchivos).find((ruta) =>
      ruta.toLowerCase().endsWith(`logo${ext}`),
    ),
  )
  .find(Boolean);

/** URL del logo propio, o null si todavía no se subió (usa el monograma "F") */
export const LOGO: string | null = logoKey ? logoArchivos[logoKey] : null;

/** Devuelve la foto propia si existe en src/assets/fotos/, si no, la provisoria */
const photo = (nombre: string, provisoria: string): string => {
  const key = Object.keys(fotosPropias).find((ruta) =>
    ruta.toLowerCase().endsWith(`/${nombre.toLowerCase()}.jpg`) ||
    ruta.toLowerCase().endsWith(`/${nombre.toLowerCase()}.jpeg`) ||
    ruta.toLowerCase().endsWith(`/${nombre.toLowerCase()}.png`) ||
    ruta.toLowerCase().endsWith(`/${nombre.toLowerCase()}.webp`) ||
    ruta.toLowerCase().endsWith(`/${nombre.toLowerCase()}.avif`),
  );
  return key ? fotosPropias[key] : provisoria;
};

/* Imágenes provisorias (se reemplazan solas al subir tus fotos) */
export const IMAGES = {
  hero: photo(
    "hero",
    "https://images.pexels.com/photos/19445084/pexels-photo-19445084.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920&fm=webp&q=80",
  ),
  about: photo(
    "nosotros",
    "https://images.pexels.com/photos/6372159/pexels-photo-6372159.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200&fm=webp&q=80",
  ),
  aboutDetail: photo(
    "nosotros-detalle",
    "https://images.pexels.com/photos/29092896/pexels-photo-29092896.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200&fm=webp&q=80",
  ),
  tablas: photo(
    "tablas",
    "https://images.pexels.com/photos/29068723/pexels-photo-29068723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fm=webp&q=80",
  ),
  cafe: photo(
    "cafeteria",
    "https://images.pexels.com/photos/21370678/pexels-photo-21370678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fm=webp&q=80",
  ),
  ejecutivo: photo(
    "menu-ejecutivo",
    "https://images.pexels.com/photos/1639559/pexels-photo-1639559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fm=webp&q=80",
  ),
  burger: photo(
    "hamburguesas",
    "https://images.pexels.com/photos/16148038/pexels-photo-16148038.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fm=webp&q=80",
  ),
  coctel: photo(
    "cocteleria",
    "https://images.pexels.com/photos/15473888/pexels-photo-15473888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fm=webp&q=80",
  ),
  singluten: photo(
    "sin-gluten",
    "https://images.pexels.com/photos/38499044/pexels-photo-38499044.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fm=webp&q=80",
  ),
  deliveryCoffe: photo(
    "delivery-coffe",
    "https://images.pexels.com/photos/20164169/pexels-photo-20164169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fm=webp&q=80",
  ),
  pastas: photo(
    "pastas",
    "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fm=webp&q=80",
  ),
};

export const WA_NUMBER = import.meta.env.VITE_WA_NUMBER || "5493874540704";

export const WA_MESSAGES = {
  reserva: "Hola! Quiero hacer una reserva en Filipo 🍽️",
  retiro: "Hola! Quiero hacer un pedido para retirar en Filipo 🛵",
  consulta: "Hola! Quiero hacer una consulta sobre Filipo",
};

export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const LINKS = {
  menu: import.meta.env.VITE_MENU_URL || "https://menu.systimes.com.ar/?Filipo=1",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/filipocaferesto",
  facebook: import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/share/1DgGo4EJBx/?mibextid=wwXIfr",
  whatsapp: waLink(WA_MESSAGES.consulta),
  peyaTablas:
    import.meta.env.VITE_PEYA_TABLAS_URL ||
    "https://www.pedidosya.com.ar/restaurantes/salta/filipo-bar-de-tablas-6e94f3ff-329e-40aa-b7c2-b227c1545d93-menu",
  peyaCoffe:
    import.meta.env.VITE_PEYA_COFFE_URL ||
    "https://www.pedidosya.com.ar/restaurantes/salta/filipo-coffe-menu",
  mapsLink:
    import.meta.env.VITE_MAPS_URL ||
    "https://www.google.com/maps/search/?api=1&query=Filipo%20Bar%20de%20Tablas%20Salta",
};

export const GOOGLE_RATING = Number(import.meta.env.VITE_GOOGLE_RATING) || 4.3;
export const GOOGLE_REVIEWS_COUNT = import.meta.env.VITE_GOOGLE_REVIEWS_COUNT || "más de 3000";

export const MAPS_EMBED =
  import.meta.env.VITE_MAPS_EMBED_URL ||
  "https://maps.google.com/maps?q=Filipo%20Bar%20de%20Tablas%2C%20Av.%20del%20Bicentenario%20de%20la%20Batalla%20de%20Salta%201401%2C%20Salta&t=&z=16&ie=UTF8&iwloc=&output=embed";

export const CONTACT = {
  address: "Av. del Bicentenario de la Batalla de Salta 1401",
  addressExtra: "CP A4400 · Salta, Argentina",
  phoneDisplay: "0387 15-454-0704",
  phoneHref: "tel:+54 9 387 15-454-0704",
  whatsappDisplay: "+54 9 387 454-0704",
  instagram: "@filipocaferesto",
};

export interface DeliveryOption {
  id: string;
  brand: string;
  name: string;
  image: string;
  items: string[];
  url: string;
  accent: string;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "tablas",
    brand: "Filipo",
    name: "Bar De Tablas",
    image: IMAGES.tablas,
    items: ["Picadas", "Pollos", "Milanesas", "Menú completo", "Wraps", "Hamburguesas"],
    url: LINKS.peyaTablas,
    accent: "tablas",
  },
  {
    id: "coffe",
    brand: "Filipo",
    name: "Coffe",
    image: IMAGES.deliveryCoffe,
    items: ["Cafetería", "Bebidas", "Pastelería", "Desayunos", "Meriendas"],
    url: LINKS.peyaCoffe,
    accent: "coffe",
  },
];

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "La Carta", href: "#carta" },
  { label: "Galería", href: "#galeria" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Delivery", href: "#delivery" },
  { label: "Contacto", href: "#contacto" },
];
