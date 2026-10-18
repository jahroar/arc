# ARC — versión para iPhone / iPad (PWA)

Editor de guion + tablero de beats + moodboard. Se instala en la pantalla de inicio desde Safari,
**gratis, sin App Store, sin cuenta de desarrollador y sin IA**. Funciona sin conexión.

## 1. Publicarla gratis con GitHub Pages (5 minutos, solo desde el navegador)

1. Crea una cuenta gratuita en <https://github.com/signup> (si no la tienes).
2. Arriba a la derecha: **＋ → New repository**.
   - Repository name: `arc`
   - Marca **Public** (GitHub Pages es gratis solo con repos públicos).
   - Pulsa **Create repository**.
3. En la página del repo nuevo pulsa **uploading an existing file**.
4. Arrastra **todo el contenido de esta carpeta** (`index.html`, `sw.js`, `manifest.webmanifest`, `icon.png`
   y la carpeta `icons`) dentro del recuadro. Espera a que terminen de subir y pulsa **Commit changes**.
5. Ve a **Settings → Pages**. En *Build and deployment* elige:
   - Source: **Deploy from a branch**
   - Branch: **main** y carpeta **/ (root)** → **Save**.
6. Espera 1–2 minutos y recarga esa pantalla: aparecerá tu dirección
   `https://TU-USUARIO.github.io/arc/`

> Tus proyectos **no** se suben a GitHub: viven solo dentro de tu iPhone. El repo contiene únicamente el código de la app.

## 2. Instalarla en el iPhone

1. Abre `https://TU-USUARIO.github.io/arc/` en **Safari** (tiene que ser Safari, no Chrome).
2. Botón **Compartir** (cuadrado con flecha) → **Añadir a pantalla de inicio** → **Añadir**.
3. Ábrela desde el icono ARC. Va a pantalla completa y funciona sin internet.

Importante: **usa siempre el icono de la pantalla de inicio**. iOS puede borrar los datos de una web
abierta en Safari si no la usas en 7 días, pero no los de una app instalada en la pantalla de inicio.

## 3. Cómo guardar y pasar proyectos entre móvil y ordenador

- Los proyectos se **autoguardan** en la biblioteca interna de la app (cada segundo).
- **Archivo → Exportar .arc a Archivos…** abre la hoja de compartir: elige *Guardar en Archivos*
  (por ejemplo iCloud Drive). Ese `.arc` lo abres en ARC del ordenador con **Abrir…**
- **Archivo → Abrir…** elige un `.arc` de la app Archivos y lo copia a la biblioteca del móvil.
  Ojo: es una copia. Para devolver los cambios al ordenador, vuelve a **Exportar**.
- Haz una exportación de vez en cuando como copia de seguridad.

## 4. Actualizar la app más adelante

Sube los archivos nuevos al repo (reemplazando los antiguos) y **cambia el número de versión** en `sw.js`
(`const VERSION = 'arc-v1'` → `'arc-v2'`). La próxima vez que abras la app con conexión se actualiza sola.

## Limitaciones

- El tablero de beats está pensado para ratón: en el móvil se pueden crear y editar beats, pero arrastrarlos
  con el dedo no está optimizado. El editor de guion y la pestaña Documento sí están pensados para el móvil.
- Sin IA (no hay modelo local en el móvil).
- Las tipografías de Google se descargan la primera vez con conexión y luego quedan guardadas.

## Alternativa con terminal (si usas `gh`)

```bash
cd carpeta-de-esta-app
git init -b main && git add . && git commit -m "ARC para iPhone"
gh repo create arc --public --source=. --push
gh api -X POST repos/:owner/arc/pages -f 'source[branch]=main' -f 'source[path]=/'
```
