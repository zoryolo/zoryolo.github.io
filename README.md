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
  - carrusel principal de portada (imágenes)
  - carrusel propio de reseñas Google Maps (sin widget embebido)
  - lightbox global y zoom en imágenes
  - barra CTA fija en móvil (WhatsApp / Llamar)
  - navegación y acciones CTA directas (WhatsApp/teléfono)
  - asistente de estancia con validación al enviar (sin error visible por defecto)
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
  - reseñas reales seleccionadas manualmente (fuente Google Maps)

## Estado legal y cookies

- Privacidad reforzada en ES/EN con secciones de:
  - categorías de datos
  - base jurídica y conservación
  - destinatarios y transferencias internacionales
  - derechos + reclamación ante AEPD
  - carácter de los datos y seguridad
- Política de cookies ajustada al estado actual:
  - no se declaran cookies no técnicas activas
  - no hay banner/CMP porque no hay cookies de analítica/publicidad activas
  - si se añaden en el futuro, debe incorporarse consentimiento previo

## Ejecución local

No requiere instalación. Sirve la carpeta como estática:

```bash
npx serve static-replica
```

Después abre la URL local que te muestre `serve`.

## Nota de idioma

- Español: rutas raíz (`/`, `/sobre-la-casa/`, etc.)
- Inglés: rutas bajo `/en/` (`/en/`, `/en/contacto/`, etc.)

## Documentación para agentes AI

- Punto de entrada: `agents.md`
- Guías detalladas: carpeta `docs/`
  - `docs/00-PROYECTO-CONTEXTO.md`
  - `docs/01-ARQUITECTURA.md`
  - `docs/02-CONTENIDO-Y-COPY.md`
  - `docs/03-I18N-Y-RUTAS.md`
  - `docs/04-UX-Y-COMPONENTES.md`
  - `docs/05-QA-Y-OPERACION.md`
  - `docs/06-PLAYBOOK-CAMBIOS.md`
