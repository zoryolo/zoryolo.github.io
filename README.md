# Los Tresoles · Réplica estática de `docs`

Este proyecto contiene una **réplica en HTML/CSS/JS puro** de la web de `docs/` (antes hecha con React/Vite).

## Objetivo

- Mantener el mismo enfoque visual y de contenido de `docs`.
- Eliminar dependencias de build para poder desplegar como sitio estático.
- Conservar navegación multipágina y comportamiento interactivo.

## Estructura principal

- `index.html`: página Inicio.
- `sobre-la-casa/index.html`
- `galeria/index.html`
- `ubicacion/index.html`
- `contacto/index.html`
- `privacidad/index.html` y `terminos/index.html` (placeholders legales)
- `404.html`
- `assets/css/styles.css`: estilos globales.
- `assets/js/app.js`: interacción global (menú móvil, animaciones, carrusel, lightbox, formulario).
- `images/`: librería de imágenes reales disponible en proyecto.
- `docs/`: implementación original en React (se mantiene como referencia).

## Funcionalidad implementada

- Header sticky con estado activo por página.
- Menú móvil lateral.
- Secciones equivalentes a `docs` por página.
- Carrusel destacado en Inicio.
- Galería con lightbox en `galeria`.
- Formulario de contacto con validación y persistencia en `localStorage`.
- Footer unificado con enlaces rápidos, contacto y legales.

## Ejecución local

No requiere instalación. Abre `index.html` con un servidor estático local para probar rutas limpias.

Ejemplo:

```bash
npx serve .
```

