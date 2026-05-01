# Los Tres Soles · Web estática (HTML/CSS/JS)

Proyecto estático listo para publicar en hosting sin build (GitHub Pages, Netlify estático, servidor simple).

## Qué incluye

- Sitio multipágina en HTML puro:
  - `index.html`
  - `sobre-la-casa/index.html`
  - `galeria/index.html`
  - `ubicacion/index.html`
  - `contacto/index.html`
  - `privacidad/index.html`
  - `terminos/index.html`
  - `404.html`
- Estilos globales: `assets/css/styles.css`
- Interacción ligera: `assets/js/app.js`
  - menú móvil
  - animaciones de entrada
  - carrusel en inicio
  - lightbox en galería
  - formulario de contacto (guardado local en `localStorage`)
- Imágenes optimizadas en `images-web/`.

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
