# 🍽️ Filipo Café Resto Bar · Landing Page & Sistema Web

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-DD7C34?style=flat-square)](LICENSE)

Sitio web oficial, vidriera gastronómica interactiva y plataforma de reservas de **Filipo Café Resto Bar**, ubicado en Av. del Bicentenario de la Batalla de Salta 1401, Salta Capital, Argentina.

Diseñado y desarrollado con un enfoque cinematográfico de alto impacto visual, optimizado para carga ultra-rápida, accesibilidad, SEO local y conversión directa a canales de venta (WhatsApp y PedidosYa).

---

## ✨ Características Principales

- **🖼️ Vidriera Gastronómica («La Carta»)**: Muestra fotográfica interactiva de alta definición con filtros dinámicos por categorías (Tablas, Platos, Burgers & Wraps, Cafetería, Coctelería y Sin Gluten), visor modal tipo lightbox con navegación por teclado y atajos directos al menú digital con precios en tiempo real.
- **🟢 Estado Comercial en Tiempo Real**: Baliza reactiva con cálculo en vivo de apertura y cierre según la hora local de Salta (horario diurno y nocturno, cálculo del próximo cambio de estado).
- **📅 Asistente de Reservas Inteligente**: Modal con selector de comensales, día, turno y ocasiones especiales que sanitiza los datos y redacta automáticamente el mensaje para WhatsApp listo para enviar con 1 clic.
- **🛵 Integración Dual con PedidosYa**: Acceso directo y diferenciado a los dos perfiles oficiales del local (*Filipo Bar de Tablas* y *Filipo Coffe*).
- **📸 Galería Social & Carruseles**: Feed visual interactivo de publicaciones de Instagram con navegación de miniaturas.
- **⭐ Reseñas Verificadas de Google Maps**: Carrusel con soporte táctil (swipe) para consultar opiniones reales y puntuación promedio (4.3/5).
- **♿ Accesibilidad y Rendimiento**: Soporte completo para `prefers-reduced-motion`, etiquetas semánticas, metadatos Open Graph, Schema.org (JSON-LD) y carga diferida inteligente (`loading="lazy"`).
- **📦 Single-File Production**: Empaquetado optimizado mediante Vite y Singlefile para despliegue inmediato en cualquier hosting estático o CDN.

---

## 🛠️ Stack Tecnológico

- **Framework**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Empaquetador & Dev Server**: [Vite 7](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Íconos**: [Lucide React](https://lucide.dev/)
- **Compresión de Assets**: Sharp & WebP

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/filipo-cafe-landing-page.git
cd filipo-cafe-landing-page
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copiá el archivo de plantilla `.env.example` para crear tu `.env` local:
```bash
# En Windows (PowerShell):
Copy-Item .env.example .env

# En Linux / macOS / Bash:
cp .env.example .env
```

### 4. Ejecutar el servidor de desarrollo
```bash
npm run dev
```
Abrí tu navegador en [http://localhost:5173](http://localhost:5173) para ver el sitio en tiempo real con recarga instantánea (HMR).

---

## ⚙️ Variables de Entorno

El proyecto soporta personalización mediante variables con prefijo `VITE_`:

| Variable | Descripción | Valor por Defecto |
| :--- | :--- | :--- |
| `VITE_WA_NUMBER` | Teléfono internacional de WhatsApp | `5493874540704` |
| `VITE_MENU_URL` | Enlace a la carta digital interactiva | `https://menu.systimes.com.ar/?Filipo=1` |
| `VITE_INSTAGRAM_URL` | Perfil de Instagram oficial | `https://www.instagram.com/filipocaferesto` |
| `VITE_FACEBOOK_URL` | Página de Facebook oficial | `https://www.facebook.com/filipocaferesto` |
| `VITE_PEYA_TABLAS_URL` | URL de PedidosYa Bar de Tablas | Perfil oficial en PedidosYa |
| `VITE_PEYA_COFFE_URL` | URL de PedidosYa Filipo Coffe | Perfil oficial en PedidosYa |
| `VITE_MAPS_URL` | Enlace directo a Google Maps | Ficha oficial de Filipo |
| `VITE_GOOGLE_RATING` | Puntuación de Google Reviews | `4.3` |
| `VITE_GOOGLE_REVIEWS_COUNT` | Cantidad de opiniones | `"más de 3000"` |

---

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo local.
- `npm run build`: Compila y genera el bundle optimizado para producción en `dist/`.
- `npm run preview`: Previsualiza localmente el build de producción generado.
- `npm run optimize`: Script de compresión y conversión automática de fotos a WebP con Sharp.

---

## 🌐 Despliegue en Producción

El comando `npm run build` genera la carpeta `dist/` totalmente lista para desplegar en cualquier plataforma:

- **Vercel**: `vercel --prod`
- **Netlify**: Arrastrar la carpeta `dist/` o vincular al repo con build command `npm run build` y publish directory `dist`.
- **Cloudflare Pages / GitHub Pages**: Configurar directorio de salida en `dist`.

---

## 📄 Licencia

Desarrollado para **Filipo Café Resto Bar**. Todos los derechos reservados.
