# Tus fotos y tu logo van aquí

Copiá tus fotos en esta carpeta con **estos nombres exactos** y el sitio
las usará automáticamente al compilar (no hay que tocar código).

## Logo del local

| Nombre del archivo | Dónde aparece                                        | Formato recomendado                  |
| ------------------ | ---------------------------------------------------- | ------------------------------------ |
| `logo.svg`         | Navbar · Hero · Footer · Favicon (ícono de pestaña) | SVG o PNG con **fondo transparente** |

- También acepta `logo.png`, `logo.webp`, `logo.jpg` (prioridad: svg > png > webp > jpg).
- **Importante:** el sitio es oscuro, así que el logo tiene que ser en versión
  clara (dorado, blanco o crema). Un logo negro no se va a ver.
- Tamaño sugerido: mínimo 400px de alto; si es SVG, sin límite.

## Fotos

| Nombre del archivo       | Dónde aparece                                    | Tamaño recomendado            |
| ------------------------ | ------------------------------------------------ | ----------------------------- |
| `hero.jpg`               | Fondo de la pantalla de inicio                   | 1920×1200 (apaisada, nocturna)|
| `nosotros.jpg`           | Sección "Nosotros" (foto grande)                 | 1200×900                      |
| `nosotros-detalle.jpg`   | Sección "Nosotros" (foto chica superpuesta)      | 800×800                       |
| `tablas.jpg`             | Card "Tablas" + card delivery Bar De Tablas      | 940×650                       |
| `cafeteria.jpg`          | Card "Cafetería & Pastelería"                    | 940×650                       |
| `menu-ejecutivo.jpg`     | Card "Menú Ejecutivo"                            | 940×650                       |
| `hamburguesas.jpg`       | Card "Hamburguesas & Sandwiches"                 | 940×650                       |
| `cocteleria.jpg`         | Card "Coctelería & Bebidas"                      | 940×650                       |
| `sin-gluten.jpg`         | Card "Sin Gluten Agregado"                       | 940×650                       |
| `delivery-coffe.jpg`     | Card delivery "Filipo Coffe"                     | 940×650                       |

Formatos aceptados: `.jpg`, `.jpeg`, `.webp`, `.png`, `.avif`
(preferí JPG o WebP).

## MUY IMPORTANTE: comprimí las fotos antes

El sitio se genera como un solo archivo, así que fotos pesadas lo harían lento.
Antes de copiarlas:

1. Entrá a **https://squoosh.app**
2. Arrastrá cada foto, achicala a ~1600px de ancho máximo,
   formato JPG calidad 75–80.
3. Objetivo: cada foto de **200 a 500 KB** (total < 4 MB).

Si falta alguna foto, el sitio sigue mostrando la imagen provisoria
de esa sección, así que podés subirlas de a poco.

## Cómo ver el resultado

- En desarrollo: guardá las fotos y `npm run dev` se actualiza solo.
- Para la versión final: corré `npm run build` y el `dist/index.html`
  ya trae tus fotos incrustadas.