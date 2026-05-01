# Los Tresoles · Web estática

Sitio promocional **100% estático** para la casa rural Los Tresoles, preparado para despliegue sin build (ideal para GitHub Pages o cualquier hosting estático).

## Objetivo del proyecto

- Mantener una experiencia visual de alto nivel inspirada en el proyecto previo `docs/`.
- Tener una web totalmente funcional con solo `HTML + CSS + JS`.
- Priorizar móvil, rendimiento y mantenimiento simple.

## Qué se encontró al inspeccionar la carpeta

- `docs/`: versión anterior en React/Vite/Tailwind con muy buena base visual.
- `images/`: imágenes reales de la casa y del entorno.
- `package.json` y `package-lock.json`: restos del flujo con Node.

## Estructura activa actual

- `index.html`: landing principal y secciones de contenido.
- `styles.css`: sistema visual (tipografías, paleta, layout responsive y componentes).
- `script.js`: interacciones en JS vanilla (menú móvil, carrusel, reveals y lightbox).
- `images/`: imágenes reales utilizadas en la web.

## Diseño implementado

La versión estática actual replica el enfoque de `docs/` en:

- Tipografía (`Playfair Display` + `DM Sans`).
- Paleta cálida y natural.
- Secciones por bloques con cards, hero inmersivo y CTA.
- Carrusel destacado con controles e indicadores.
- Galería con lightbox y composición responsive.
- Navegación sticky con menú móvil accesible.

## Mantenimiento rápido

- Textos y secciones: editar `index.html`.
- Colores, espaciado y estilos: editar `styles.css`.
- Interacciones: editar `script.js`.
- Imágenes: cambiar en `images/` y actualizar rutas en `index.html` si cambia el nombre.

## Nota

No hay reservas online integradas: es una web de presentación y captación de contacto directo (teléfono, email y WhatsApp).
