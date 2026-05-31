# Superbaking — Estado de funcionalidad

Documento de referencia sobre qué partes de la app **funcionan de verdad** y cuáles son **solo diseño, datos de ejemplo o incompletas**.

Última revisión: mayo 2026.

---

## Feature flags — activar funciones ocultas

Las partes que **aún no funcionan** están ocultas por defecto. Para mostrarlas de nuevo (aunque sigan siendo maqueta), edita un solo archivo:

**`src/config/feature-flags.ts`**

Cambia `false` → `true` en la flag que quieras activar. Ejemplos:

| Flag | Qué muestra |
|------|-------------|
| `timerPage` | Página `/timer` + enlace «Hermann» en la nav |
| `timerActions` | Botones Gefüttert / Foto / Notiz (requiere `timerPage: true`) |
| `timerJournal` | Diario estático (requiere `timerPage: true`) |
| `herminePage` | Página `/hermine` completa |
| `homeHermineQuickAccess` | Acceso rápido KI-Coach en home |
| `homeHermannCard` | Tarjeta Hermann con datos demo |
| `homeCategories` | Grid de categorías con contadores |
| `recipeFavorites` | Botón ❤️ en detalle de receta |
| `recipeFilterGlutenfrei` | Filtro Glutenfrei en listado |
| `profileStats` | Estadísticas del perfil |
| `profileFavorites` … `profileSupport` | Menús del perfil |
| `onboardingFeaturePills` | Pills decorativas en onboarding |

Si una página completa está desactivada (`timerPage`, `herminePage`) y alguien entra por URL directa, verá «Demnächst verfügbar» en lugar de la maqueta rota.

---

## ✅ Lo que funciona

### Navegación y estructura

| Función | Detalle |
|---------|---------|
| Navegación inferior | Home, Rezepte, Blog, Hermann (timer), Profil — enlaces activos |
| Onboarding | Pantalla inicial con botones «Loslegen» y «Später» → `/home` |
| Rutas estáticas | Todas las páginas principales cargan sin error |
| Build de producción | `npm run build` genera el sitio estático correctamente |

### Contenido (Markdown)

| Función | Detalle |
|---------|---------|
| Recetas desde `.md` | 8 recetas en `src/content/rezepte/` |
| Blog desde `.md` | 4 artículos en `src/content/blog/` |
| Rutas dinámicas | `/rezepte/[slug]` y `/blog/[slug]` generadas desde el contenido |
| Frontmatter | Título, descripción, categoría, tiempos, ingredientes, pasos, tips, etc. |
| Imágenes de portada | Campo `cover` en `.md` con optimización Astro (`RecipeCover`, `BlogCover`) |
| Fallback sin imagen | Si no hay `cover`, se muestra emoji + degradado |

### Listado de recetas (`/rezepte`)

| Función | Detalle |
|---------|---------|
| Listado dinámico | Lee todas las recetas de la colección |
| Buscador | Filtra por título, descripción, categoría, dificultad, tag e **ingredientes** |
| Filtro «Alle» | Muestra todas |
| Filtro «Anfänger» | Recetas con dificultad «Einfach» |
| Filtro «Schnell <6h» | Recetas con tiempo total ≤ 6 horas |
| Filtro «Roggen» | Recetas que mencionan roggen en texto o ingredientes |
| Filtro «Süß» | Categoría «Süßes» |
| Combinación | Búsqueda + filtro activo a la vez |
| Sin resultados | Mensaje «Keine Rezepte gefunden» |

### Detalle de receta (`/rezepte/[slug]`)

| Función | Detalle |
|---------|---------|
| Contenido completo | Zutaten, Schritte, paso a paso hornear, Tipps |
| Imagen hero | Portada de la receta |
| Volver atrás | Enlace a `/rezepte` |
| Checklist de ingredientes | Checkbox por ingrediente |
| Persistencia checklist | Guardado en `localStorage` por receta (`superbaking-ingredients-{slug}`) |
| Progreso | Contador «X/Y bereit» |
| Estado al recargar | Los ingredientes marcados se mantienen |

### Blog (`/blog`)

| Función | Detalle |
|---------|---------|
| Listado dinámico | Artículos ordenados por fecha |
| Buscador | Filtra por título, descripción, categoría y badge |
| Filtros por categoría | Wissenschaft, Geschichte, Technik, Reisen |
| Combinación | Búsqueda + filtro |
| Sin resultados | Mensaje «Keine Artikel gefunden» |
| Artículo completo | Markdown renderizado (párrafos, `##`, citas) |

### Home (`/home`)

| Función | Detalle |
|---------|---------|
| Recetas destacadas | Muestra recetas con `featured: true` en el `.md` |
| Teaser del blog | Enlace al post con `featured: true` |
| Accesos rápidos | Enlaces a Hermine, Kit, Geschichte, Timer |
| Tarjeta Hermann | Enlace a `/timer` |

### Otras páginas (contenido estático visible)

| Página | Qué hace |
|--------|----------|
| `/kit` | Muestra lista de 7 herramientas con descripción |
| `/geschichte` | Timeline histórica del sauerteig (solo lectura) |
| `/timer` | Cuenta atrás visual que decrementa cada segundo |
| `/hermine` | Interfaz del coach KI (solo UI) |
| `/profil` | Perfil y menús (mayoría sin destino real) |

### Diseño

| Función | Detalle |
|---------|---------|
| Paleta de colores | Burdeos, crema, arena, marrón |
| Tipografías | Bebas Neue (títulos) + Bricolage Grotesque (texto) |
| Layout móvil | Max-width 480px, bottom nav, animaciones fade-in |

---

## ❌ Lo que NO funciona (o es solo maqueta)

### Perfil (`/profil`)

| Elemento | Problema |
|----------|----------|
| Estadísticas (12 Brote, 28 Tage, 7 Favoriten) | Números **fijos**, no calculados |
| Nombre «Baker» y avatar «B» | **Hardcoded**, no editable |
| «Mitglied seit Mai 2026» | Texto fijo |
| Meine Favoriten | `href="#"` — **no abre nada** |
| Meine Rezepte | `href="#"` — **no abre nada** |
| Einkaufsliste | `href="#"` — **no abre nada** |
| Benachrichtigungen | `href="#"` — **no abre nada** |
| Sprache / Einheiten | `href="#"` — **no cambia nada** |
| Dark Mode | `href="#"` — **no implementado** |
| Premium upgraden | `href="#"` — **no implementado** |
| Support kontaktieren | `href="#"` — **no implementado** |
| Mein Kit | ✅ Sí enlaza a `/kit` |
| Über Superbaking | ✅ Sí enlaza a `/geschichte` |

### Favoritos en recetas

| Elemento | Problema |
|----------|----------|
| Botón 🤍 / ❤️ en detalle | Solo cambia el emoji en memoria |
| Persistencia | **No guarda** en localStorage ni base de datos |
| Sincronización con perfil | El contador de favoritos del perfil **no se actualiza** |

### Timer / Hermann (`/timer`)

| Elemento | Problema |
|----------|----------|
| Cuenta atrás | Arranca siempre en **02:14:38** (demo) |
| «Heute, 18:30 Uhr» | Texto **fijo**, no calculado |
| Botón «Gefüttert» | **Sin acción** |
| Botón «Foto» | **Sin acción** |
| Botón «Notiz» | **Sin acción** |
| Tagebuch (diario) | Entradas **hardcoded**, no se pueden añadir ni editar |
| Persistencia del timer | **No guarda** hora de próxima alimentación |
| Notificaciones | **No existen** |

### Home — tarjeta Hermann

| Elemento | Problema |
|----------|----------|
| «Hermann ist aktiv» | Texto **fijo** |
| «Zuletzt gefüttert vor 6h» | **Fijo** |
| Barra de progreso 68% | **Fija** |
| «Nächste Fütterung in 2h» | **Fijo** |

### Home — categorías

| Elemento | Problema |
|----------|----------|
| Contadores (12, 28, 14 recetas…) | Números **inventados** |
| Clic en categoría | Todas van a `/rezepte` **sin filtrar** por esa categoría |

### Hermine — KI Coach (`/hermine`)

| Elemento | Problema |
|----------|----------|
| Subir foto | **No hay** `<input type="file">` ni API de IA |
| Análisis de imagen | **No implementado** |
| Preguntas frecuentes | Clic **no hace nada** (no abre chat ni respuesta) |
| Chat / conversación | **No existe** |

### Kit (`/kit`)

| Elemento | Problema |
|----------|----------|
| Lista de herramientas | Solo lectura; **no se puede marcar** lo que tienes |
| Datos | Hardcoded en el `.astro`, **no en `.md`** |

### Geschichte (`/geschichte`)

| Elemento | Problema |
|----------|----------|
| Timeline | Hardcoded en el `.astro`, **no en `.md`** |

### Onboarding (`/`)

| Elemento | Problema |
|----------|----------|
| Pills (100+ Rezepte, KI-Coach, Offline, Werbefrei…) | **Decorativas**, no reflejan estado real |
| «Offline» | **No hay** PWA ni service worker |
| «Werbefrei» | No hay sistema de anuncios ni premium real |

### Filtros y búsqueda — limitaciones

| Elemento | Problema |
|----------|----------|
| Filtro «Glutenfrei» | **Funciona**, pero ninguna receta actual lo cumple → lista vacía |
| Filtros en home | Las categorías de home **no filtran** la lista de recetas |

### Usuario y backend

| Función | Estado |
|---------|--------|
| Login / registro | **No existe** |
| Base de datos | **No existe** |
| API | **No existe** |
| Sincronización entre dispositivos | **No** (solo localStorage en checklist) |
| i18n (cambio de idioma) | UI en alemán **fija** |

### Contenido — mejoras pendientes

| Tema | Detalle |
|------|---------|
| Imágenes repetidas | Varias recetas usan la misma `bauernbrot.webp` |
| Imágenes del blog | Varios posts comparten el mismo `.avif` |
| Recetas propias del usuario | **No se pueden crear** desde la app |

---

## Resumen rápido

| Área | Estado general |
|------|----------------|
| Recetas (listado, detalle, búsqueda, filtros) | ✅ Funcional |
| Checklist ingredientes + localStorage | ✅ Funcional |
| Blog (listado, detalle, búsqueda, filtros) | ✅ Funcional |
| Contenido Markdown | ✅ Funcional |
| Navegación y diseño | ✅ Funcional |
| Timer / Hermann real | ❌ Solo demo visual |
| Hermine (IA) | ❌ Solo UI |
| Perfil y ajustes | ❌ Mayormente mock |
| Favoritos | ❌ Solo toggle visual |
| Home (stats Hermann, categorías) | ❌ Datos fijos |
| Usuario / backend / offline | ❌ No implementado |

---

## Archivos clave (referencia técnica)

| Qué | Dónde |
|-----|-------|
| Recetas `.md` | `src/content/rezepte/` |
| Blog `.md` | `src/content/blog/` |
| Esquema de contenido | `src/content/config.ts` |
| Filtros recetas | `src/lib/recipe-filters.ts` |
| Buscador/filtros UI | `src/scripts/list-filter.ts` |
| Checklist ingredientes | `src/pages/rezepte/[slug].astro` (script + localStorage) |
