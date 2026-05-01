# Los Tresoles · Web estática

Sitio promocional **100% estático** para la casa rural Los Tresoles, preparado para despliegue en GitHub Pages sin build, sin framework y sin dependencias de runtime.

## Objetivo del proyecto

- Mostrar la casa, su galería real y su entorno.
- Priorizar experiencia móvil y carga rápida.
- Mantener contacto directo (teléfono/email/WhatsApp), sin motor de reservas.

## Inspección realizada del proyecto existente

Al revisar esta carpeta se encontró:

- `images/`: biblioteca de imágenes reales de la casa y entorno (fuente principal del nuevo sitio).
- `docs/`: proyecto anterior con Vite/React/Tailwind y varias páginas.
- `package.json` y `package-lock.json` en raíz: restos del flujo anterior basado en Node.

La nueva entrega publicada para cliente está en **archivos estáticos en raíz** y no requiere instalación de nada.

## Estructura activa (sitio estático)

- `index.html`: contenido completo de la landing (secciones, navegación, SEO base).
- `styles.css`: diseño visual hipermoderno, mobile-first y responsive.
- `script.js`: interacción en vanilla JS (menú móvil, hero rotativo, reveal on scroll, lightbox de galería).
- `images/`: imágenes reales usadas por el sitio.

## Características implementadas

- Diseño mobile-first con navegación sticky y menú móvil accesible.
- Hero inmersivo con rotación automática de imágenes.
- Secciones informativas: casa, galería, entorno, servicios y contacto.
- Galería con lightbox nativo (`<dialog>`).
- Animaciones suaves de entrada con `IntersectionObserver`.
- CTA directas a teléfono, email y WhatsApp.

## Publicación en GitHub Pages

### Opción recomendada

1. Subir este repositorio a GitHub.
2. En GitHub: `Settings` → `Pages`.
3. En `Build and deployment`, elegir `Deploy from a branch`.
4. Seleccionar rama `main` y carpeta `/ (root)`.
5. Guardar y esperar la URL pública.

## Mantenimiento rápido

- Cambiar textos: editar directamente en `index.html`.
- Ajustar colores/estilo: editar variables en `:root` dentro de `styles.css`.
- Cambiar imágenes: sustituir archivos en `images/` manteniendo nombre, o actualizar rutas en `index.html`.
- Actualizar contacto: modificar enlaces `tel:`, `mailto:` y `wa.me` en `index.html`.

## Nota

La web actual está pensada como presentación comercial inicial. Se puede escalar después a multidioma, calendario externo o integración de reservas si el cliente lo solicita.
