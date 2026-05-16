# Los Tres Soles · Sitio web oficial

Sitio web estático desarrollado para **Los Tres Soles**, alojamiento rural ubicado en Silleda, Pontevedra.

La web está construida con HTML, CSS y JavaScript, sin CMS ni dependencias de backend. Está preparada para publicarse en hosting estático como GitHub Pages, Netlify o un servidor web tradicional.

## Características principales

- Sitio multipágina en español e inglés.
- Diseño responsive adaptado a móvil, tablet y escritorio.
- Páginas principales:
  - Inicio
  - Apartamentos
  - Galería
  - Ubicación
  - Contacto
  - Privacidad
  - Aviso legal
- Integración de llamadas a la acción mediante WhatsApp, teléfono y email.
- Galería de imágenes con lightbox.
- SEO local básico mediante metadatos, Open Graph, canonical, hreflang y datos estructurados.
- Código estático, ligero y fácil de mantener.

## Estructura general

```text
/
├── index.html
├── sobre-la-casa/
├── galeria/
├── ubicacion/
├── contacto/
├── privacidad/
├── terminos/
├── en/
├── assets/
│   ├── css/
│   └── js/
├── images-web/
└── 404.html
```

## Ejecución local

No requiere instalación ni proceso de build.

Para probarlo en local:

```bash
npx serve .
```

Después abre en el navegador la URL local que indique el comando.

## Idiomas

- Español: rutas principales del sitio.
- Inglés: rutas bajo `/en/`.

## Mantenimiento

El sitio está diseñado para permitir cambios sencillos en textos, imágenes, enlaces de contacto y contenido de las páginas sin depender de un CMS.
