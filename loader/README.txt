PAQUETE TRANSPARENTE - LOS TRES SOLES

Este paquete corrige el problema del fondo.

Archivos principales:
- assets/logo-las-tres-soles-transparent.png
  Logo principal con fondo transparente.
- assets/logo-las-tres-soles-transparent.webp
  Versión WebP con transparencia.
- assets/logo-las-tres-soles-loader.webp
  Versión optimizada para animación de carga.
- assets/favicon.ico
  Icono clásico para navegador.
- assets/favicon-16.png, favicon-32.png, favicon-192.png, favicon-512.png
  Favicons transparentes en varios tamaños.
- assets/apple-touch-icon.png
  Icono para iOS.
- loader.css
  Animación visual del loader.
- loader.js
  Oculta el loader cuando la página termina de cargar.
- index-loader-demo.html
  Ejemplo completo de uso.

Integración mínima en tu HTML:
<link rel="icon" href="assets/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="stylesheet" href="loader.css">

Coloca el bloque #lts-loader al inicio del body y añade:
<script src="loader.js" defer></script>