# Los Tres Soles · Web estática (HTML/CSS/JS)

Proyecto estático listo para publicar en hosting sin build (GitHub Pages, Netlify estático, servidor simple).

## Qué incluye

- Sitio multipágina en HTML puro:
  - `index.html`
  - `sobre-la-casa/index.html`
  - `galeria/index.html`
  - `ubicacion/index.html`
  - `contacto/index.html`
  - `en/index.html`
  - `en/sobre-la-casa/index.html`
  - `en/galeria/index.html`
  - `en/ubicacion/index.html`
  - `en/contacto/index.html`
  - `en/privacidad/index.html`
  - `en/terminos/index.html`
  - `privacidad/index.html`
  - `terminos/index.html`
  - `404.html`
- Estilos globales: `assets/css/styles.css`
- Interacción ligera: `assets/js/app.js`
  - menú móvil
  - animaciones de entrada
  - carrusel en inicio
  - lightbox global y zoom en imágenes
  - barra CTA fija en móvil (WhatsApp / Llamar)
  - navegación y acciones CTA directas (WhatsApp/teléfono)
- SEO local base:
  - metadatos OG/canonical en páginas principales
  - `hreflang` ES/EN en páginas de captación
  - `schema.org/LodgingBusiness` en portada
- Imágenes en `images-web/`.

## Fuentes de contenido

- Textos base reales: `content/lostressoles_texto/`
- Se han integrado y adaptado para copy web actual:
  - ubicación real en Silleda (Pontevedra)
  - apartamentos Sol, Luna y Estrella
  - servicios, contacto, GPS y legales

## Ejecución local

No requiere instalación. Sirve la carpeta como estática:

```bash
npx serve static-replica
```

Después abre la URL local que te muestre `serve`.

## Nota de idioma

- Español: rutas raíz (`/`, `/sobre-la-casa/`, etc.)
- Inglés: rutas bajo `/en/` (`/en/`, `/en/contacto/`, etc.)
