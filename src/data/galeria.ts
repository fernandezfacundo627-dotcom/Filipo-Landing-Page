import meriendas1 from "../assets/galeria/meriendas-1.webp";
import meriendas2 from "../assets/galeria/meriendas-2.webp";
import meriendas3 from "../assets/galeria/meriendas-3.webp";
import tablaPinchos1 from "../assets/galeria/tabla-pinchos-1.webp";
import tablaPinchos2 from "../assets/galeria/tabla-pinchos-2.webp";
import tablaPinchos3 from "../assets/galeria/tabla-pinchos-3.webp";
import wraps1 from "../assets/galeria/wraps-1.webp";
import wraps2 from "../assets/galeria/wraps-2.webp";
import combos1 from "../assets/galeria/combos-1.webp";
import combos2 from "../assets/galeria/combos-2.webp";
import combos3 from "../assets/galeria/combos-3.webp";
import combos4 from "../assets/galeria/combos-4.webp";
import combos5 from "../assets/galeria/combos-5.webp";

export interface GalleryPost {
  id: string;
  title: string;
  tag: string;
  images: string[];
  caption: string;
  location: string;
}

export const GALLERY_POSTS: GalleryPost[] = [
  {
    id: "post-combos",
    title: "Combos Saludables",
    tag: "Desayunos & Brunch",
    images: [combos1, combos2, combos3, combos4, combos5],
    caption: `3 combos saludables para empezar el día como se debe 🥑
Avocado Toast, Saludable y Filipo Power — elige el tuyo y cuéntanos cuál es tu favorito.
📍 Filipo Café · Resto · Bar`,
    location: "Filipo Café · Resto · Bar · Salta",
  },
  {
    id: "post-meriendas",
    title: "Meriendas 1, 2 & 3",
    tag: "Cafetería & Dulces",
    images: [meriendas1, meriendas2, meriendas3],
    caption: `¿De qué team sos vos? 🍫🥐
En Filipo hay merienda para el team dulce, el team salado y hasta para los indecisos.
Contanos en los comentarios cuál es el tuyo.`,
    location: "Filipo Café Resto Bar · Salta",
  },
  {
    id: "post-tablas",
    title: "Tabla de Pinchos 1, 2 & 3",
    tag: "Tablas & Para Compartir",
    images: [tablaPinchos1, tablaPinchos2, tablaPinchos3],
    caption: `🍢 OTRA VEZ EN LA CARTA: la Tabla de Pinchos volvió

¿Ya la habías probado o esta es tu primera vez? 👀

Contanos en los comentarios cuál pincho no puede faltar en tu tabla.`,
    location: "Av. del Bicentenario 1401 · Salta",
  },
  {
    id: "post-wraps",
    title: "Wraps 1 & 2",
    tag: "Wraps & Frescos",
    images: [wraps1, wraps2],
    caption: `Llegaron los nuevos wraps 🌯

Elige el tuyo:
🥩 Carne
🥗 Vegetariano
🍗 Pollo

Todos acompañados de papas fritas.`,
    location: "Filipo Café Resto Bar · Salta",
  },
];
