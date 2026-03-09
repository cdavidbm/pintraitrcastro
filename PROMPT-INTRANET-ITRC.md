# Prompt: Intranet ITRC — Proyecto desde cero

Necesito crear una **intranet institucional** para la Agencia del Inspector General de Tributos, Rentas y Contribuciones Parafiscales (**ITRC**), una entidad del gobierno colombiano. Es un sitio interno para los funcionarios de la entidad.

---

## Stack técnico (obligatorio, no negociable)

| Capa | Tecnología | Notas |
|------|-----------|-------|
| **Framework** | Astro 4+ | Static site generation, output: 'static' |
| **CMS** | Sveltia CMS | Git-based, sin base de datos, admin en `/admin` |
| **Lenguaje** | TypeScript | Strict mode |
| **Estilos** | CSS custom properties | Sin frameworks CSS (sin Tailwind). Variables semánticas en `src/styles/global.css` |
| **Iconos** | Font Awesome 6 | Vía CDN |
| **Fuente** | Nunito Sans | Google Fonts |
| **Deploy** | GitHub Pages | CI/CD con GitHub Actions, branch `gh-pages` |
| **CMS Config** | Generador modular JS | Archivos en `cms/` generan `public/admin/config.yml` con `js-yaml` |

---

## Arquitectura de referencia (proyecto hermano: sitio institucional ITRC)

Esta intranet es el proyecto hermano del sitio web público de la Agencia ITRC. Comparten la misma infraestructura backend pero el frontend es independiente. El sitio público usa esta arquitectura que DEBE replicarse:

### Estructura de directorios

```
├── astro.config.mjs          # Config Astro con base path condicional (dev vs prod)
├── tsconfig.json              # Aliases: @/*, @components/*, @layouts/*, @content/*
├── package.json               # Scripts: cms:generate, dev, build, preview
├── cms/                       # Generador modular de config.yml
│   ├── generate.js            # Script principal (ensambla config, dump YAML, inyecta comentarios)
│   ├── base.js                # Backend config (GitHub repo, media folder, slug)
│   ├── templates/
│   │   └── fields.js          # Templates reutilizables (DISPLAY_MODE como shared ref → YAML anchor)
│   └── collections/           # Un archivo JS por sección del CMS
│       ├── seccion1.js
│       └── seccion2.js
├── public/
│   └── admin/
│       ├── index.html         # Punto de entrada Sveltia CMS
│       └── config.yml         # GENERADO por cms/generate.js — NO editar manualmente
├── src/
│   ├── components/
│   │   └── layout/            # Header, Footer, Navigation, Sidebar
│   ├── content/               # JSON y Markdown gestionados por el CMS
│   │   ├── pages/
│   │   └── settings/
│   ├── layouts/
│   │   └── Base.astro         # Layout principal con <head>, scripts globales
│   ├── pages/                 # File-based routing
│   └── styles/
│       └── global.css         # Design tokens + tema semántico con CSS variables
└── .github/
    └── workflows/
        └── deploy.yml         # CI/CD: validate en PR, deploy en push a main
```

### Patrones clave del proyecto hermano que DEBEN mantenerse

1. **Generador modular CMS**: Los archivos en `cms/` generan `config.yml`. Los scripts `npm run dev` y `npm run build` ejecutan `node cms/generate.js` automáticamente antes de Astro. Las templates reutilizables (`DISPLAY_MODE`, `documentSections()`, `pageHeader()`) eliminan repetición. Los objetos JS compartidos por referencia generan YAML anchors (`&display_mode` / `*display_mode`).

2. **Sistema de temas con CSS variables**: Capa semántica `--theme-*` sobre tokens de marca. Los componentes SOLO usan `--theme-*`, NUNCA colores hardcoded. Temas via clase en `<html>`: sin clase = default, `html.theme-X` = alternativo. Persistencia en localStorage. Script inline en `<head>` para prevenir FOUC.

3. **Contenido como datos**: Todo el contenido vive en `src/content/` como JSON/Markdown. Las páginas `.astro` importan los JSON estáticamente y renderizan. El CMS edita estos archivos directamente (Git-based).

4. **Componentes reutilizables**: Accordion, Tabs, SectionTitle, HeroPage, RelatedLinks. Cada componente acepta props tipadas y usa estilos scoped. No duplicar CSS entre componentes.

5. **Accesibilidad WCAG**: Skip link, ARIA roles, `prefers-reduced-motion`, widget de accesibilidad (tamaño de texto, contraste, escala de grises).

6. **Colores institucionales**: Gold (#b38b40), Navy (#002147), Gov.co Blue (#0943b5). Estos colores de marca son los mismos para la intranet.

### astro.config.mjs (patrón)

```js
import { defineConfig } from 'astro/config';

const isProduction = process.env.NODE_ENV === 'production';
const githubRepo = 'NOMBRE-REPO-INTRANET';

export default defineConfig({
  site: isProduction ? 'https://cdavidbm.github.io' : 'http://localhost:4321',
  base: isProduction ? `/${githubRepo}/` : '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { assets: 'assets' },
  vite: { css: { devSourcemap: true } }
});
```

### deploy.yml (patrón)

GitHub Actions con dos jobs: `validate` (en PRs y push) y `deploy` (solo push a main). Usa `peaceiris/actions-gh-pages@v4`. Node 20. Commits de deploy como `Chris Bec <cdavidbm@gmail.com>`.

### Sveltia CMS (patrón de config)

```yaml
backend:
  name: github
  repo: cdavidbm/NOMBRE-REPO-INTRANET
  branch: main
  base_url: https://sveltia-cms-auth.cdavidbm.workers.dev

media_folder: "public/uploads"
public_folder: "/uploads"
site_url: "https://cdavidbm.github.io/NOMBRE-REPO-INTRANET"

slug:
  encoding: "ascii"
  clean_accents: true
  sanitize_replacement: "-"
```

---

## Contenido específico de la intranet

La intranet debe gestionar las siguientes secciones y tipos de contenido (adaptar según convenga):

### Secciones principales

1. **Inicio (Dashboard)**
   - Anuncios internos destacados
   - Accesos rápidos a herramientas y sistemas internos
   - Calendario de eventos próximos
   - Noticias internas recientes

2. **Directorio de funcionarios**
   - Lista de personal por dependencia/subdirección
   - Nombre, cargo, extensión, correo
   - Foto (opcional)

3. **Documentos internos**
   - Manuales de procedimientos
   - Formatos y plantillas (descargables)
   - Circulares internas
   - Actas de reuniones
   - Organizado por dependencia o categoría

4. **Comunicaciones internas**
   - Noticias/anuncios internos (similar a blog con frontmatter Markdown)
   - Circulares
   - Boletines internos

5. **Gestión del conocimiento**
   - Capacitaciones y material de estudio
   - Videos de capacitación (embeds YouTube)
   - Guías y tutoriales internos

6. **Bienestar laboral**
   - Actividades de bienestar
   - Beneficios para funcionarios
   - Salud ocupacional

7. **Herramientas y enlaces**
   - Enlaces a sistemas internos (SIGEP, SECOP, correo institucional, etc.)
   - Accesos directos a aplicaciones web internas

8. **Configuración global** (settings del CMS)
   - Datos de contacto internos (mesa de ayuda TI, extensiones)
   - Navegación (menú principal, menú lateral)
   - Información del sitio (nombre, descripción)
   - Accesos rápidos del dashboard

### Colecciones CMS sugeridas

```
src/content/
├── pages/               # Páginas estáticas (JSON)
│   ├── directorio/      # Directorio por dependencia
│   ├── documentos/      # Páginas de documentos internos
│   └── bienestar/       # Páginas de bienestar
├── anuncios/            # Noticias/anuncios internos (Markdown, frontmatter)
├── circulares/          # Circulares internas (Markdown + archivo PDF)
├── capacitaciones/      # Material de capacitación (JSON)
├── eventos/             # Eventos internos (JSON)
├── enlaces/             # Enlaces a sistemas externos (JSON)
└── settings/            # Configuración global (JSON)
    ├── contact.json     # Mesa de ayuda, extensiones
    ├── navigation.json  # Menú principal
    ├── site.json        # Nombre, descripción
    └── quickAccess.json # Accesos rápidos del dashboard
```

---

## Diseño frontend

El diseño de la intranet **NO debe ser idéntico** al sitio público. Debe sentirse como una herramienta de trabajo interna, no como un sitio institucional de cara al público.

### Directrices de diseño

- **Mobile First** — Responsive. Debe funcionar en móvil para consulta rápida, aunque probablemente el uso principal será en escritorio en las oficinas de la institución.
- **Navegación lateral (sidebar)** en vez de nav horizontal — más práctico para herramientas internas
- **Diseño compacto** — menos espaciado heroico, más densidad de información
- **Dashboard funcional** — cards con métricas, accesos rápidos, calendario
- **Búsqueda prominente** — los funcionarios necesitan encontrar documentos rápidamente
- **Tonalidad**: profesional pero amigable. Puede usar los colores institucionales (gold, navy) de forma más sutil
- **Sin barra Gov.co** — es un sitio interno, no requiere la barra de identidad de gobierno
- **Sin HeroSlider** — la intranet no necesita carruseles heroicos, sino información útil arriba
- **Tema claro por defecto** — con opción de tema oscuro


### Componentes sugeridos (diferentes al sitio público)

| Componente | Propósito |
|-----------|----------|
| `Sidebar.astro` | Navegación lateral colapsable |
| `DashboardCard.astro` | Card para el dashboard (anuncios, enlaces, estadísticas) |
| `DocumentTable.astro` | Tabla de documentos con filtro y búsqueda |
| `FuncionarioCard.astro` | Tarjeta de funcionario (foto, nombre, cargo, contacto) |
| `AnuncioCard.astro` | Card de anuncio/noticia interna |
| `QuickLinks.astro` | Grid de accesos rápidos con iconos |
| `SearchBar.astro` | Barra de búsqueda global |
| `Breadcrumb.astro` | Navegación por breadcrumbs |
| `EventoItem.astro` | Ítem de evento en el calendario/lista |
| `WcagWidget.astro` | Widget de accesibilidad (mismo del sitio público) |

---

## Principios de desarrollo

Estos son principios no negociables para todo el desarrollo:

1. **Cero vibe coding**: Cada línea de código es deliberada. No copiar-pegar sin entender. No generar código genérico.

2. **Código senior**: Nombres de dominio específicos (no `data`, `item`, `handleClick`). Arquitectura deliberada. Manejo robusto de errores. Sin comentarios genéricos tipo `// Loop through items`.

3. **Sin sobre-ingeniería**: Solo construir lo que se necesita ahora. Tres líneas similares son mejores que una abstracción prematura. No agregar features que nadie pidió.

4. **CSS limpio**: Variables semánticas `--theme-*`. Estilos scoped en cada componente. No duplicar CSS entre archivos. No usar `!important` salvo casos excepcionales justificados.

5. **Accesibilidad desde el inicio**: No es un add-on posterior. ARIA roles, contraste adecuado, navegación por teclado, skip links.

6. **Git disciplinado**: Commits descriptivos en español. Nunca commit/push sin confirmación explícita del usuario. Formato: `feat:`, `fix:`, `refactor:`, `docs:`.

---

## Para iniciar

1. Crea el proyecto Astro desde cero (`npm create astro@latest`)
2. Configura TypeScript strict con los aliases
3. Instala `js-yaml` como devDependency
4. Crea la estructura base: `cms/`, `src/content/settings/`, `src/components/layout/`
5. Implementa el layout base con sidebar navigation
6. Configura el generador modular CMS (`cms/generate.js` + `cms/base.js`)
7. Crea las primeras colecciones (settings, anuncios)
8. Implementa el dashboard de inicio
9. Configura GitHub Actions para deploy

Empieza paso a paso, confirmando cada fase antes de avanzar a la siguiente.
