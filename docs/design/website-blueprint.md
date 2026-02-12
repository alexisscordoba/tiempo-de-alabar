# 🎵 BLUEPRINT v2.0 — TIEMPO DE ALABAR
## Sitio Web Oficial · Documento Definitivo

> Este documento es la **única fuente de verdad** para el diseño y desarrollo del sitio web.
> Toda discrepancia con archivos previos queda resuelta aquí.

---

## 📌 INFORMACIÓN DEL PROYECTO

**Cliente:** Tiempo de Alabar
**Tipo:** Sitio web institucional + plataforma de recursos
**Denominación:** Iglesia Adventista del Séptimo Día
**Ubicación:** Buenos Aires, Argentina

### Objetivos Principales
1. **Identidad**: Contar quiénes somos como banda
2. **Eventos**: Presentar agenda de presentaciones
3. **Música**: Mostrar discografía y lanzamientos
4. **Recursos**: Ofrecer material gratuito para adoración (letras, acordes, partituras, pistas)

---

## 🏗️ ARQUITECTURA TÉCNICA

### Stack Tecnológico (JAMstack)
| Componente | Tecnología |
|------------|-----------|
| **Framework** | Astro 5.x (SSG) |
| **Hosting** | Cloudflare Pages |
| **CI/CD** | GitHub Actions |
| **CMS** | Decap CMS (Git-based) |
| **Autenticación** | GitHub OAuth |
| **Estilos** | Tailwind CSS |
| **Imágenes (Desarrollo)** | Almacenamiento local (`public/assets/system`) |
| **Imágenes (Producción)** | Cloudflare Images (CDN con optimización automática) |
| **Repositorio** | GitHub (`alexisscordoba/tiempo-de-alabar`) |
| **Transiciones** | Astro View Transitions API |

### Estructura de Contenido
```
src/
├── content/
│   ├── musica/          → Colección dinámica (canciones)
│   ├── eventos/         → Colección dinámica (eventos/agenda)
│   ├── members/         → Colección dinámica (equipo)
│   ├── roles/           → Colección auxiliar (funciones/instrumentos)
│   ├── hitos/           → Colección dinámica (timeline/historial)
│   ├── data/
│   │   └── globals.yaml → Configuración global
│   └── pages/           → Páginas estáticas (singleton)
│       ├── inicio.md
│       ├── acerca-de.md
│       ├── musica.md
│       ├── agenda.md
│       ├── contacto.md
│       ├── apoyo.md
│       ├── organizar.md
│       ├── historial-eventos.md
│       └── bio.md
└── components/
    ├── Navbar.astro
    ├── Footer.astro
    ├── StreamingModal.astro
    └── ...
```

---

## 🎨 SISTEMA DE DISEÑO

### Concepto Creativo: "Ecos de Cristal"
Propuesta visual centrada en **tridimensionalidad** y **fluidez** a través de superficies de vidrio esmerilado. Mediante degradados envolventes y glassmorphism, el diseño logra profundidad orgánica donde el contenido parece levitar, transmitiendo **pureza** y **vanguardia tecnológica al servicio de la adoración**.

### Paleta de Colores
```css
--primary:   #3e8d8b  /* Teal — Identidad, botones, acentos activos */
--secondary: #40506d  /* Azul noche — Fondos profundos, tipografía */
--accent:    #d8c8e1  /* Lavanda suave — Detalles, énfasis emocional */
--neutral-1: #f3f4f7  /* Gris hielo — Fondos generales claros */
--neutral-2: #f5f7f9  /* Blanco roto — Superficies secundarias */
```

> **NOTA:** No se implementa modo oscuro. El sitio opera exclusivamente en modo claro.

### Principios de Diseño

#### A. Glassmorphism
Aplicado a todos los contenedores flotantes, modales y elementos superpuestos:
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
```
- Translucidez sutil que permite filtrar colores del fondo
- Desenfoque tipo "vidrio esmerilado" para separación de capas
- Reflejos lumínicos diagonales tenues simulando cristal pulido
- Bordes finos casi transparentes (como "canto de vidrio")

#### B. Contenedores y Bordes
- **Radio de borde:** Generoso y orgánico — evitar ángulos rectos en todo el sitio
- **Estructura de contorno:** Líneas extremadamente finas que definen límites con elegancia
- **Layout Bento Grid:** Los contenedores siguen un layout tipo Bento Grid donde sea posible — cards de distintos tamaños organizadas jerárquicamente en grillas asimétricas, creando composiciones visuales dinámicas y atractivas

#### C. Gradientes y Textura
- **Gradientes estáticos:** Transiciones de color suaves que evocan cielo en distintos momentos del día
- **Hover dinámico:** Al hacer hover sobre un contenedor con gradiente, los colores cambian sutilmente aportando dinamismo
- **Textura de grano:** Capa granulada sobre fondos para eliminar frialdad digital — sensación táctil y orgánica similar a fotografía analógica

#### D. Atmósfera Visual
- **Orbes flotantes:** Esferas difusas de color (`primary` y `accent`) posicionadas en el fondo de las secciones, con animación lenta de flotación. Crean profundidad atmosférica sin interferir con el contenido
- **Fondo atmosférico:** Las secciones utilizan estos elementos para generar una sensación etérea y viva

#### E. Tipografía
- **Títulos:** Tipografía de impacto — moderna, robusta, con letras muy juntas (tracking negativo/apretado). Deben sentirse como bloques sólidos y potentes
- **Cuerpo:** Limpio, con espaciado generoso, prioriza lectura cómoda. Tono suavizado para no competir con la fuerza de los títulos
- **Navlinks:** Mayúsculas (UPPERCASE) con letter-spacing amplio para legibilidad y elegancia
- **Prioridad absoluta:** Legibilidad. Aunque el estilo es vidrioso y artístico, el mensaje debe ser siempre el centro con **alto contraste** entre texto y capas de fondo

#### F. Animaciones y Micro-interacciones
- Pequeños movimientos al hacer hover sobre contenedores (expansión sutil, ganancia de luminosidad)
- Botones que brillan gradualmente (glow) al hover
- Efectos de carga al scroll: fade-in, slide-in (scroll-triggered animations)
- Transiciones suaves entre secciones
- Botones "vitales": movimiento de luz interno o pulso suave (sitio "vivo")
- **Scroll indicator:** Indicador animado de scroll (mouse wheel) en la parte inferior del hero de Inicio, invitando al usuario a explorar
- Continuidad visual: al navegar entre páginas, usar View Transitions para que la experiencia sea fluida

**Implementación:** A criterio del desarrollador, priorizando performance y accesibilidad.

---

## 📐 ARQUITECTURA DE NAVEGACIÓN

### Páginas Primary Navigation (Navbar)
| # | Página | URL |
|---|--------|-----|
| 1 | Inicio | `/` |
| 2 | Acerca de | `/acerca-de` |
| 3 | Música | `/musica` |
| 4 | Agenda | `/agenda` |
| 5 | Contacto | `/contacto` |

### Páginas Secundarias (Footer)
| # | Página | URL |
|---|--------|-----|
| 6 | Apoyo | `/apoyo` |
| 7 | Organizar un evento | `/organizar` |
| 8 | Historial de Eventos | `/historial-eventos` |

### Landing Page Independiente
| # | Página | URL |
|---|--------|-----|
| 9 | Bio/Streaming | `/bio` |

> Desconectada del sitio principal. Para compartir en redes sociales (tipo Linktree).

### Páginas Dinámicas (por colecciones)
| Tipo | URL | Fuente |
|------|-----|--------|
| Canción individual | `/musica/[slug]` | Colección `musica` |
| Evento individual | `/eventos/[slug]` | Colección `eventos` |
| Hito individual | `/hitos/[slug]` | Colección `hitos` (solo si `has_subpage: true`) |

> **Evento permalink:** Cada evento tiene una URL permanente en `/eventos/[slug]` que acumula valor SEO desde el anuncio hasta años después. La página adapta su diseño según el estado del evento.

---

## 🧩 COMPONENTES GLOBALES

### Navbar

**Estructura:**
```
[ ♫ ] Alabar ━━━━━ (  INICIO | ACERCA DE | MÚSICA | AGENDA | CONTACTO  ) ━━━━━ [ ▶ ]
```

**Zonas:**
- **Izquierda:** Logo — isotipo circular (contenedor redondeado con icono) + texto "Alabar" en tipografía bold
- **Centro:** Mini navbar tipo "píldora dentro de píldora" con enlaces a pages primary navigation
- **Derecha:** Botón Play circular (icono de play redondeado)

**Estado 1 — Transparente (Hero position):**
- Fondo: Completamente transparente
- Nav central: Cápsula con borde fino `1px solid rgba(255,255,255,0.3)`
- Tipografía: Color blanco
- Logo y botón "flotan" sobre el contenido

**Estado 2 — Scrolled (Sticky):**
- Transición orgánica y suave desde el estado transparente
- Fondo: Blanco con opacidad `rgba(255,255,255,0.8)` + `backdrop-filter: blur(10px)`
- Forma: Cápsula compacta con bordes muy redondeados
- Tipografía: Color oscuro (`--secondary`)
- Nav central: Tinte sutil más claro que el resto, asegurando legibilidad
- Acento visual: El enlace activo se resalta con gradiente y resplandor suave

**Botón Play:**
- Al hacer clic → abre Streaming Modal (fullscreen)
- Componente universal, presente en todas las páginas

**IMPORTANTE:** Solo versión desktop en Fase 1. Mobile se implementará en Fase 2.

---

### Streaming Modal (Fullscreen)

**Triggers:**
- Botón Play del navbar

**Layout:**
```
                                                                                                      [ X ]
                              |                               
Escucha nuestra música        |       [ Spotify       ]  [ Apple Music   ]  [ Amazon Music   ]
en tu plataforma preferida    |       [ YouTube Music ]  [ Deezer        ]  [ YouTube        ]  [ + ]
                              |                                                               
```

**Comportamiento:**
1. Cada botón redirige al link correspondiente de `globals.yaml` (filtrados por `type: "streaming"`)
2. Ver más: botón + a derecha de los iconos/botones, despliega el resto de las plataformas
3. Cerrar: botón X esquina superior derecha, o clic fuera del contenido
4. Animación de apertura: expansión circular desde el botón Play (clip-path)

**Variante en Inicio — Sección Streaming:**
- Solo iconos/botones de las 4 plataformas principales (Spotify, Apple Music, YouTube Music, Deezer)
- Sin modal — links directos
- Fuente: `globals.yaml` → `links` filtrados por `type: "streaming"` (primeros 4)

---

### Footer

**Estructura:**
```
════════════════════════════════════════════════════════════
         Tiempo de Alabar

[Inicio] [Acerca de] [Música] [Agenda] [Contacto]

[Instagram] [Facebook] [YouTube]

[♥ Apoyar a Tiempo de Alabar]    [⚙ Organizar un evento]

© 2026 Tiempo de Alabar  •  Powered by AKAE Multimedia
════════════════════════════════════════════════════════════
```

**Elementos:**
1. **Quick links:** Solo páginas primary navigation
2. **Redes sociales:** De `globals.yaml` filtradas por `type: "social"` y `type: "video"`
3. **Botón Donaciones:**
   - Texto: "Apoyar a Tiempo de Alabar"
   - Hover: Muestra icono de corazón
   - Clic: Redirige a `/apoyo`
4. **Botón Organizar:**
   - Texto: "Organizar un evento"
   - Hover: Muestra icono de engranaje (con rotación sutil animada)
   - Clic: Redirige a `/organizar`
5. **Créditos:** De `globals.yaml` → `site_info.legal` y `site_info.developed`

---

## 📄 ESPECIFICACIONES DE PÁGINAS

### 1. INICIO `/`

#### Hero Section (Fullscreen)
- **Fondo:** Video o imagen con overlay de gradiente oscuro
- **Badge:** Etiqueta personalizable flotante sobre el título (ej: "Nuevo Lanzamiento Disponible")
  - Fuente: CMS campo `hero.badge_text` (si está vacío, no se muestra)
  - Diseño: Pill con glassmorphism, icono de sparkle, efecto shimmer sutil
- **Contenido:**
  ```
  [Badge: Texto personalizable]

  "No importa dónde estés"
  "es Tiempo de Alabar."

  [▶ Nuestra música]  [📅 Ver agenda]
  ```
- **CTAs:**
  - Primario: Icono Play + "Nuestra música" → navega a `/musica`
  - Secundario: Icono Calendario + "Ver agenda" → navega a `/agenda`
- **Orbes flotantes:** Esferas difusas de color `primary` y `accent` animadas lentamente en el fondo
- **Scroll indicator:** Indicador de scroll animado (forma de mouse/wheel) centrado en la parte inferior, invitando a explorar

#### Inspirational Section
- Bloque con versículo bíblico o cita inspiracional
- Tipografía destacada, centrado
- Fuente CMS: `quote_block.text` y `quote_block.author`

#### Featured Section (Bento Grid)
Layout tipo Bento Grid con dos cards principales:
- **Nuevo lanzamiento:** Card grande con cover art + título + badge "Lanzamiento" + botón "Escuchar ahora"
  - Fuente: CMS `featured.song` (relación con colección `musica`)
- **Próximo show:** Card con flyer + fecha + ubicación + botón "Ver detalles"
  - Fuente: CMS `featured.event` (relación con colección `eventos`)
- **Card "Organizar evento":** Card con texto + icono de engranaje giratorio sutil
  - Redirige a `/organizar`

#### Música Snippet Section
- Título personalizable
- Texto de cierre personalizable
- Botón con etiqueta personalizable (ej: "Conoce nuestra música") → `/musica`
- Fuente CMS: `musica_snippet.title`, `musica_snippet.text`, `musica_snippet.button_label`

#### Streaming Section
- Iconos/botones de las 4 plataformas principales con links directos
- Fuente: `globals.yaml` → `links` filtrados por `type: "streaming"` (primeros 4)

---

### 2. ACERCA DE `/acerca-de`

#### Hero Section (Compacto)
- **Fondo:** Foto con gradiente
- **Título:** "¿Quiénes somos?"
- **Subtítulo:** Descripción corta de la banda
- Fuente CMS: `hero.title`, `hero.subtitle`, `hero.background`

#### About Section
- Descripción completa de la banda
- Historia (origen, trayectoria) en formato markdown
- Lista de objetivos y desafíos
- Galería de fotos (carousel)
- Fuente CMS: `identity.description`, `identity.history`, `identity.goals`, `gallery`

#### Members Section — Grid Interactivo

**Vista Grid (estado normal):**
- Contenedores con foto de perfil (aspect-ratio **2:3**, object-fit cover)
- Nombre del miembro alineado abajo-izquierda sobre gradiente para legibilidad

**Hover en contenedor:**
- Zoom-in sutil en foto
- Nombre slide-up para hacer espacio
- Aparecen debajo:
  - Icono de rol (de colección `roles` → `rol_icon`)
  - Bio corta (`bio_short`)
  - Botón "Ver más"

**Clic en "Ver más" → Modal:**
```
[ X cerrar ]

┌─────────────────────────────────┐
│ Foto principal   │ Nombre       │
│ (ph_profile)     │ 🎸 Rol       │
│                  │              │
│                  │ Bio completa │
│                  │ (body)       │
│                  │              │
│                  │ [Galería]    │
│                  │ [Redes]      │
└─────────────────────────────────┘
```
- Mobile: Foto arriba, info abajo
- Cerrar: botón X o clic fuera

**Filtro Activos/Ex-integrantes:**
- Por defecto: Solo `status: "active"`
- Botón "Ver los miembros anteriores" al final del grid
- Al clic: Grid se refresca mostrando solo `status: "former"`, aparece flecha ← para volver

**Fuente:** Colección `members` + relación con colección `roles`

#### Timeline Section (Vertical)

Hitos de la historia mostrados en timeline vertical cronológico:

**Orden:** Descendente por año (`year`) y luego por fecha (`date`).

```
    [ Bloque Izquierdo ]         [ Eje Central ]          [ Bloque Derecho ]
                                        |
       ___________________________      |
      |   Título del hito         |
      |                           |  ( 2024 )
      |   Descripción corta...    |
      |___________________________|     |
                                        |
                                        |      ___________________________
                                        |     |   Título del hito         |
                                        |     |                           |
                                        |     |   Descripción corta...    |
                                        |     |___________________________|
                                        |
       ___________________________      |
      |   Título del hito         |
      |                           |  ( 2021 )
      |   Descripción corta...    |     |
      |___________________________|     |
                                        |
```

**Clic en card → Expande/Modal:**
- Muestra: descripción corta (`summary`) + foto cover (`design.cover`)
- Botón "Ver más" (solo si `has_subpage: true`)
  - Al clic: Navega a `/hitos/[slug]`

**Relaciones:** Los hitos pueden vincular canciones (`design.related_song`) y eventos (`design.related_event`), funcionando como Hub de navegación.

**Destacado especial:** Si un hito tiene un ('design.related_song') muestra un icono de música, si tiene un ('design.related_event') muestra un icono de calendario.


**Fuente:** Colección `hitos`

#### Event History Section
- Botón "Historial de eventos" → `/historial-eventos`

---

### 3. MÚSICA `/musica`

#### Hero Section (Compacto)
- Fondo: Imagen con gradiente
- Título y subtítulo
- Fuente CMS: Página `musica.md` → `hero.title`, `hero.subtitle`, `hero.background`

#### Music Grid
Grilla de covers (aspect-ratio **1:1**, object-fit cover)

**Hover en cover:**
- Gradiente negro aparece
- Slide-up: Título de la canción (alineado abajo-izquierda)
- Aparece debajo: [▶ Play] [Ver más →]

**Botón Play → Modal:**
```
[ X cerrar ]

┌──────────────────────┐
│ Cover │ Plataformas  │
│       │ [Spotify]    │
│       │ [Apple]      │
│       │ [YouTube]    │
│       │              │
│       │ [Ver más →]  │
└──────────────────────┘
```
- Cerrar: botón X o clic fuera
- Streaming links vienen del campo `streaming` del frontmatter de la canción

**Botón "Ver más"** → `/musica/[slug]`

**Fuente:** Colección `musica` (solo `status: "published"`)

---

### 4. CANCIÓN INDIVIDUAL `/musica/[slug]`

#### Hero Section
```
┌──────────────────────────────────────────┐
│ Gradiente de color (de cover art)        │
│                                          │
│ ┌───────┐  2024                          │
│ │ Cover │  TÍTULO DE LA CANCIÓN          │
│ │  Art  │  🎼 Compositor | ✍️ Letrista  │
│ └───────┘                                │
│                                          │
└──────────────────────────────────────────┘
```
- Color de fondo: Campo `design.background_color`
- Cover: Campo `design.coverart`

#### Play Section
- Texto: "Escucha ahora"
- Botón Play → al clic revela:
  - Botones de plataformas (del campo `streaming` — solo mostrar plataformas con link)
  - Video clip embebido de YouTube (si existe `streaming.youtube_clip`)
  - Botón discreto para ocultar

#### Song Data Section
Contenedor con iconos:
| Icono | Dato         | Campo         |
|-------|--------------|---------------|
| 🎼   | Compositor   | `composer`    |
| ✍️   | Letrista     | `lyricist`    |
| 🎹   | Tonalidad    | `technical.key` |
| 🥁   | Tempo        | `technical.tempo` |
| ⏱️   | Compás       | `technical.time` |
| ⏰   | Duración     | `technical.duration` |

#### Lyrics & Chords Section (Interactivo)
```
┌─────────────────────────────────────────┐
│ Toolbox                                 │
│ [Solo Letra | Letra+Acordes] [A-] [A+]  │
│ [ -1 ] [ +1 ] [Fullscreen]              │
├─────────────────────────────────────────┤
│                                         │
│ [Contenido ChordPro parseado]           │
│                                         │
└─────────────────────────────────────────┘
```

**Funcionalidades:**
1. **Switch Letra/Acordes:** Oculta o muestra acordes del ChordPro
2. **Transposición:** Botones [-1] [+1] cambian tonalidad (solo si acordes visibles).
   Baseline: `technical.key`
3. **Font size:** Botones [A-] [A+]
4. **Fullscreen:** Pantalla completa con toolbox, botón X para cerrar

**Motor ChordPro:**
- Parsear campo `body` (formato ChordPro)
- **Vista pública:** Filtra acordes `[E]` → texto limpio
- **Vista músico:** Muestra acordes alineados sobre las sílabas
- **Transposición interactiva:** Calcula shift desde `technical.key`
- Librería recomendada: `chordsheetjs`

#### Resources Section
Organizado en 3 áreas. Solo mostrar recursos que existan:

**1. Musical**
- Tutorial (YouTube video embebido) — de `resources_videos`
- Partitura (PDF) — de `resources`
- Letras y acordes (PDF) — de `resources`
- ChordPro (archivo .cho) — de `resources`

**2. Audiovisual**
- Pista instrumental (MP3/WAV) — de `resources`
- Multipista (ZIP) — de `resources`
- Presentación PPT — de `resources`
- ProPresenter — de `resources`
- FreeShow — de `resources`

**3. Inspiración** (texto, no descargable)
- Descripción — campo `description`
- Referencias bíblicas — campo `meta.biblerefs`
- Historia — campo `history`
- Etiquetas — campo `meta.tags`

> **Nota:** El CMS almacena recursos como **lista genérica** (`resources` con `label` + `file_url`). El frontend organiza la presentación visual tipo bento grid en las 3 áreas según el `label` del recurso.

---

### 5. AGENDA `/agenda`

#### Hero Section (Compacto)
- Fondo: Foto con gradiente
- Título y subtítulo
- Fuente CMS: Página `agenda.md` → `hero.title`, `hero.subtitle`, `hero.background`

#### Events List
```
┌────────────────────────────────┐
│ [Cover] Nombre del Evento      │
│         📅 Fecha del evento    │
│                        [Ver +] │
└────────────────────────────────┘
```

**Hover en botón "+":** Se extiende → "Ver detalles"

**Clic:** Navega a `/eventos/[slug]` usando **Astro View Transitions**, creando efecto visual de que la grilla se transforma en el detalle del evento.

**Filtrado y orden:**
- Mostrar: `status` = `upcoming`, `scheduled`, `sold_out`, `finished` (calculado)
- Orden: Futuros primero (ascendente), luego finalizados (descendente)
- Eventos `finished` con estilo visualmente atenuado (menor opacidad) y badge "Finalizado"

#### Footer de Sección
- Botón "Historial de eventos" → `/historial-eventos`
- Card "Organizar evento": Card con texto + icono de engranaje giratorio sutil → `/organizar`

---

### 6. EVENTO INDIVIDUAL `/eventos/[slug]`

> URL **permanente** (permalink). Funciona tanto por navegación interna (con View Transition) como por acceso directo (link compartido).

**Contenido:**
```
┌─────────────────────────────────────┐
│ Cover Image (flyer/poster)          │
│                                     │
│ NOMBRE DEL EVENTO                   │
│                                     │
│ 📅 15 Mayo 2026 – 16 Mayo 2026     │
│ 🕐 20:00 – 22:30                   │
│ 📍 Teatro Central, Buenos Aires     │
│ 🗺️ [Ver en Google Maps]            │
│                                     │
│ Descripción del evento (body)       │
│                                     │
│ Invitados: [Lista]                  │
│                                     │
│ Setlist:                            │
│ 1. Canción A (linked)               │
│ 2. Canción B (linked)               │
│ 3. Himno de apertura (texto libre)  │
│                                     │
│ [Galería de fotos]                  │
│                                     │
│ 💰 Entrada libre y gratuita         │
│                                     │
│ [Reservar lugar]  [Descargar promo] │
└─────────────────────────────────────┘
```

**Vista adaptativa por estado (ver sección Ciclo de Vida):**
- `upcoming`: Solo info básica, "Ver detalles" deshabilitado
- `scheduled`: Todos los detalles + botones activos
- `sold_out`: Badge "Agotado", botón reserva deshabilitado
- `canceled`: Badge "Cancelado", alerta visual, botones deshabilitados
- `finished` (calculado): Badge "Finalizado", destaca setlist y galería, deshabilita reserva
- `archived`: Solo visible en `/historial-eventos`

**Fuente:** Colección `eventos`

---

### 7. CONTACTO `/contacto`

#### Layout de Dos Columnas

**Columna Izquierda:**
- Título: "Contáctanos"
- Subtítulo: "Organicemos un concierto juntos. Estamos aquí para hacer un momento especial de adoración."
- Fondo: Color sólido con gradiente

**Columna Derecha Superior:**
- Info de contacto con iconos (de `globals.yaml` → `contact_info`):
  - 📞 Teléfono
  - ✉️ Email
  - 📍 Ubicación
- Botones: WhatsApp y Telegram (de `globals.yaml` → `links` filtrados por `type: "contact"`)

**Columna Derecha Inferior — Formulario:**
```
Nombre:          [________]
Email:           [________]
Teléfono:        [________]
Fecha del evento:[________]
Ubicación:       [________]
Mensaje:         [________________]

[Enviar mensaje]
```

**Comportamiento:**
- Validación de campos requeridos
- Al enviar → mensaje de confirmación (de CMS: `form.success_message`)
- Texto del botón: de CMS `form.submit_label`
- **Backend:** Servicio externo (Formspree, Getform o similar — por definir en implementación)
- Email destino: `globals.yaml` → `contact_info.email`

---

### 8. APOYO `/apoyo`

#### Hero Section
- Título: "Tu ayuda" / Subtítulo: "Puede hacer la diferencia"
- Fondo: Imagen con gradiente oscuro
- Fuente CMS: `hero.title`, `hero.subtitle`, `hero.background`

#### Allocation Section
- Título: "¿En qué se utiliza tu ayuda?"
- Grid de cards con **glassmorphism** y borde accent
- Cada card: un ítem de inversión
- Fuente: `allocation.items`

#### Ways to Collaborate
- Título: "Formas de colaborar"
- Lista visual de categorías con animación de hover (glow-up)
- Fuente: `ways.categories`

#### Monetary Donation Methods
- Título personalizable
- Botón primario: MercadoPago → `donation.mp_link`
- Botón secundario: PayPal → `donation.paypal_link`
- Bloque transferencia bancaria:
  ```
  CBU:     [número]  [📋 Copiar]
  Alias:   [alias]   [📋 Copiar]
  Titular: [nombre]
  ```
  - Fuente: `donation.bank_cbu`, `donation.bank_alias`, `donation.bank_holder`

#### Gratitude Section
- Texto centrado: "Muchas gracias por colaborar"
- Imagen grupal con bordes redondeados y glow suave
- Fuente: `gratitude.text`, `gratitude.image`

**Fuente CMS:** Página `apoyo.md`

---

### 9. ORGANIZAR EVENTO `/organizar`

#### Hero Section
- Título: "Organicemos un evento juntos"
- Subtítulo: "Todos los detalles que tenés que saber"
- Fuente CMS: `hero.title`, `hero.subtitle`, `hero.background`

#### Introduction / Band Info (Dos columnas)
- **Izquierda:** Imagen destacada con bordes redondeados y glow
- **Derecha:** Badge con total de personas/staff (color accent) + texto descriptivo
- Fuente: `info.objective`, `info.group`, `info.featured_img`

#### Technical Rider

**Stageplot:**
- Imagen del stageplot
- Botón "Descargar PDF"
- Fuente: `rider.stageplot_img`, `rider.stageplot_pdf`

**Input List:**
- Tabla técnica o lista numerada
- Filas con fondos alternados (neutral backgrounds)
- Mobile: Colapsar en accordions expandibles
- Fuente: `rider.input_list`

#### Logistics Requirements

**General Needs:** Checklist de necesidades — Fuente: `logistics.needs`

**Backline Provided (Lo que trae la banda):**
- Card "Lo que llevamos" con lista de elementos
- Slider/carousel de imágenes de equipamiento
- Fuente: `logistics.backline_provided`, `logistics.backline_gallery`
- PDF de lista completa: `logistics.backline_list`

**Backline Required (Lo que necesita del organizador):**
- Título: "Qué necesitamos del organizador"
- Lista con iconos de info
- Fuente: `logistics.backline_required`

**Fuente CMS:** Página `organizar.md`

---

### 10. HISTORIAL DE EVENTOS `/historial-eventos`

#### Hero Section
- **Fondo:** Carousel de imágenes destacadas
- **Título:** "Momentos Vividos"
- **Subtítulo:** "Un recorrido por los lugares donde hemos compartido con vos"
- Fuente CMS: Página `historial-eventos.md` → `hero.title`, `hero.subtitle`, `hero.background`

#### Filtering Navigation
- **Search bar:** Input minimalista con glassmorphism para filtrar por nombre
- **Year buttons:** Botones dinámicos [2024] [2023] [Todos] — generados desde fechas de eventos archivados

#### Past Events Grid
- Layout: 3 columnas desktop, 1 columna mobile
- Orden: Fecha descendente (más reciente primero)
- Fuente: Colección `eventos` con `status: "archived"`

#### Event Card (History Version)
**Normal:** Cover image con **filtro grayscale**

**Hover:**
- Imagen pasa a color
- Zoom-in sutil
- Badge de fecha aparece (esquina superior derecha): año + mes

**Clic → Modal:**
```
[ X cerrar ]

┌─────────────────────────────┐
│ Cover Image                 │
│                             │
│ NOMBRE DEL EVENTO           │
│ 📅 15 Mayo 2024             │
│ 📍 Teatro Central           │
│ [Iglesia] ← Type tag        │
│                             │
│ Descripción                 │
│ Invitados                   │
│ [Galería de fotos]         │
└─────────────────────────────┘
```
- Cerrar: botón X o clic fuera

---

### 11. BIO/STREAMING `/bio`

**Tipo:** Landing page independiente — desconectada del sitio principal
**Uso:** Para compartir en redes sociales como bio page (tipo Linktree)

#### Layout
```
┌────────────────────────────┐
│       [Foto de Perfil]     │
│       Tiempo de Alabar     │
│  Banda de música cristiana │
│                            │
│  ┌─────────────────────┐   │
│  |Video Destacado (opt)|   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  | Próximo Evento (opt)|   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🎵 Spotify          │   │
│  │ 🎵 Apple music      │   │
│  │ 🎵 YouTube music    │   │
│  │ 🎵 Deezer           │   │
│  │ 📺 YouTube          │   │
│  │                     │   │
│  │ 📷 Instagram        │   │
│  │ 📷 Facebook         │   │
│  │ 📷 TikTok           │   │
│  │                     │   │
│  │ 🌐 Sitio Web        │   │
│  │                     │   │
│  │ 📞 Contacto         │   │
│  │ 📧 Email            │   │
│  └─────────────────────┘   │
└────────────────────────────┘
```

**Elementos:**
1. **Foto de perfil** circular: `identity.photo`
2. **Título y bio:** `identity.title`, `identity.bio_text`
3. **Fondo:** `style.background` (imagen) + `style.accent_color` (para botones)
4. **Video destacado** (opcional): Si `featured_video.active: true` → embed YouTube `featured_video.youtube_id`
5. **Botones de enlaces:** Todos de `globals.yaml` → `links`
6. **Evento destacado** (opcional): Si `featured_event.active: true` → card con info del evento

**Fuente CMS:** Página `bio.md` + `globals.yaml`

---

## 🔄 CICLO DE VIDA DE EVENTOS

### Estados Manuales (Admin en Decap CMS)
| Estado | Visibilidad | Comportamiento UI |
|--------|-------------|-------------------|
| `draft` | Oculto | No se renderiza en el build |
| `upcoming` | Agenda | Badge "Próximamente". Solo info básica. "Ver detalles" deshabilitado |
| `scheduled` | Agenda | Evento activo completo. Todos los detalles y botones |
| `sold_out` | Agenda | Badge "Agotado". Detalles visibles, botón reserva deshabilitado |
| `canceled` | Agenda | Badge "Cancelado". Alerta visual, sin botones de acción |
| `archived` | Historial | Removido de Agenda, aparece en `/historial-eventos` |

### Estado Automático (Frontend)
| Estado | Condición | Comportamiento UI |
|--------|-----------|-------------------|
| `finished` | Fecha actual > fecha del evento | Badge "Finalizado". Deshabilita reserva y descarga promo. Destaca setlist y galería |

**Timezone:** Todas las fechas se almacenan y calculan en UTC-3 (Argentina).

### Orden en Agenda
1. **Eventos futuros** (`upcoming`, `scheduled`, `sold_out`): Ascendente (el más cercano primero)
2. **Eventos finalizados** (`finished`): Descendente (el más reciente primero), con estilo visual atenuado
3. Los eventos `finished` permanecen en Agenda hasta que el admin los mueva a `archived`

### SEO & Deployment
- **Build semanal:** Trigger manual o automático para "hornear" el estado `finished` en el HTML estático (para que crawlers lo vean sin JavaScript)
- **Build por contenido:** Cada vez que se agrega una canción o se actualiza un setlist

---

## 🎵 SISTEMA DE SETLIST

### Filosofía: "Evento como Contenedor Autónomo"
Toda información del setlist reside dentro del archivo del evento. No hay tablas relacionales externas.

### Estructura del Setlist
Cada ítem del setlist contiene:
- `song_id` (opcional): Referencia (slug) a la colección `musica`
- `custom_name` (opcional): Texto libre
- **Orden:** Definido por posición en la lista del CMS

### Reglas de Procesamiento
| Caso | `song_id` | `custom_name` | Resultado |
|------|-----------|---------------|-----------|
| **Full Link** | ✅ existe | vacío | Título oficial, tonalidad y recursos vinculados |
| **Override (Alias)** | ✅ existe | tiene texto | Muestra `custom_name` pero mantiene link a la canción |
| **Manual** | null | tiene texto | Texto plano (para covers, momentos de oración, invitados) |

---

## 🎼 ARQUITECTURA DE CANCIONES (ChordPro)

### Filosofía: "Single Source of Truth"
Cada canción es un archivo `.md` donde los datos nunca se duplican:
- **Frontmatter (YAML):** Metadatos técnicos, streaming, recursos, SEO
- **Body (Markdown):** Exclusivamente la partitura ChordPro

### Inteligencia Musical
- `technical.key` → Baseline matemático para transposición
- `technical.tempo` + `technical.time` → Posibilidad de metrónomos/indicadores

### Lógica de Recursos
- **Internos** (`resources`): Archivos estáticos para descarga (PDF, MP3, PPT)
- **Externos** (`resources_videos`): Videos YouTube embebidos (tutoriales)
- **Hub de streaming** (`streaming`): Renderiza botones solo para plataformas donde la canción está disponible

### Optimización
- Assets visuales (covers, OG images) vía Cloudflare Images en producción
- SEO desacoplado: títulos/descripciones SEO independientes del título de la canción

---

## 📸 ESTRATEGIA DE MEDIOS

### Desarrollo (Actual)
- `media_folder: "public/assets/system"` — almacenamiento local
- Ideal para logos, favicons y assets del sistema

### Producción (Futuro)
- **Cloudflare Images** como CDN externo para:
  - Galerías de eventos
  - Fotos de miembros
  - Covers de canciones
- **Beneficios:** Repo liviano (<50MB), formatos modernos automáticos (WebP/AVIF), resize on-the-fly, entrega global Edge
- **Integración CMS:** Via Cloudflare Worker como bridge de upload
- **Política:** Alt text obligatorio en toda imagen para accesibilidad y SEO

---

## 🗂️ ESTRUCTURA DE DATOS (CMS)

> Fuente de verdad: `config.yml`. Todos los nombres de campo usan **snake_case**.

### Colecciones Dinámicas

#### 1. Música (`musica/`)
**Archivo:** `src/content/musica/[slug].md`
**Slug CMS:** `{{slug}}`

| Bloque | Campo | Tipo | Requerido |
|--------|-------|------|-----------|
| Identidad | `title` | string | ✅ |
| | `slug` | slug (from title) | ✅ |
| | `status` | select: published, draft | ✅ |
| | `year` | number | ✅ |
| | `composer` | string | ✅ |
| | `lyricist` | string | ✅ |
| Ficha Técnica (`technical`) | `key` | select (notas musicales) | ✅ |
| | `time` | string | ✅ |
| | `tempo` | number | ✅ |
| | `duration` | number (ms) | ❌ |
| | `structure` | string | ❌ |
| | `ccli` | number | ❌ |
| Diseño (`design`) | `coverart` | image | ✅ |
| | `coverart_alt` | string | ✅ |
| | `background_color` | color (HEX) | ✅ |
| Streaming (`streaming`) | `youtube_clip` | string | ❌ |
| | `spotify`, `apple`, `youtubemusic`, `deezer`, `amazon`, `tidal`, `soundcloud` | string | ❌ |
| Recursos (`resources`) | lista: `label` + `file_url` | list | ❌ |
| Videos externos (`resources_videos`) | lista: `label` + `youtube_id` | list | ❌ |
| Metadatos (`meta`) | `biblerefs` | list | ✅ |
| | `tags` | list | ✅ |
| Contenido | `description` | markdown | ❌ |
| | `history` | markdown | ❌ |
| SEO (`seo`) | `title`, `description`, `og_image` | — | ✅ |
| Body | `body` | code (ChordPro) | ✅ |

---

#### 2. Eventos (`eventos/`)
**Archivo:** `src/content/eventos/[year]-[slug].md`
**Slug CMS:** `{{year}}-{{slug}}`

| Bloque | Campo | Tipo | Requerido |
|--------|-------|------|-----------|
| Identidad | `title` | string | ✅ |
| | `year` | number | ✅ |
| | `slug` | slug (from title) | ✅ |
| | `cover` | image | ✅ |
| | `cover_alt` | string | ✅ |
| | `status` | select: draft, upcoming, scheduled, sold_out, canceled, archived | ✅ |
| | `featured` | boolean | ✅ |
| Logística | `date` | datetime (YYYY-MM-DD) | ✅ |
| | `end_date` | datetime (YYYY-MM-DD) | ❌ |
| | `time` | string (HH:mm) | ✅ |
| | `end_time` | string (HH:mm) | ❌ |
| | `price` | string | ✅ |
| | `link_reserve` | string | ❌ |
| Ubicación (`location`) | `type` | select: church, park, theater, auditorium, stadium, hall, other | ✅ |
| | `name` | string | ✅ |
| | `address` | string | ❌ |
| | `city` | string | ❌ |
| | `lat` | float | ❌ |
| | `lng` | float | ❌ |
| Contenido (`content`) | `guests` | string | ❌ |
| | `setlist` | list (ver Sistema de Setlist) | ❌ |
| | `gallery` | list de imágenes | ❌ |
| | `link_promo` | string | ❌ |
| SEO (`seo`) | `title`, `description`, `og_image` | — | ✅ |
| Body | `body` | markdown | ✅ |

---

#### 3. Miembros (`members/`)
**Archivo:** `src/content/members/[slug].md`
**Slug CMS:** `{{slug}}`

| Bloque | Campo | Tipo | Requerido |
|--------|-------|------|-----------|
| Identidad | `name` | string | ✅ |
| | `nickname` | string | ✅ |
| | `slug` | slug (from nickname) | ✅ |
| | `status` | select: draft, active, former | ✅ |
| | `order` | number | ✅ |
| Fechas | `start_date` | datetime (YYYY-MM-DD) | ✅ |
| | `end_date` | datetime (YYYY-MM-DD) | ❌ (obligatorio para former) |
| Roles | `roles` | relation → colección `roles` (multiple) | ✅ |
| Fotos (`photos`) | `ph_profile` | image (2:3) | ✅ |
| | `ph_profile_alt` | string | ✅ |
| | `ph_secondary` | image (2:3) | ❌ |
| | `ph_secondary_alt` | string | ❌ |
| | `gallery` | list de imágenes | ❌ |
| Bio | `bio_short` | string | ✅ |
| Redes (`social`) | `instagram`, `youtube`, `tiktok`, `facebook`, `x`, `soundcloud`, `spotify` | string | ❌ cada uno |
| Body | `body` | markdown (bio completa) | ✅ |

---

#### 4. Roles (`roles/`)
**Archivo:** `src/content/roles/[rol_id].md`
**Slug CMS:** `{{rol_id}}`

| Campo | Tipo | Ejemplo |
|-------|------|---------|
| `rol_id` | string (pattern: `rol-[a-z0-9-]+`) | `rol-vocal` |
| `rol_name` | string | "Voz" |
| `rol_icon` | string | ID del icono para frontend |

> Colección auxiliar vinculada a `members` por relación.

---

#### 5. Hitos (`hitos/`)
**Archivo:** `src/content/hitos/[year]-[slug].md`
**Slug CMS:** `{{year}}-{{slug}}`

| Bloque | Campo | Tipo | Requerido |
|--------|-------|------|-----------|
| Identidad | `title` | string | ✅ |
| | `year` | number | ✅ |
| | `date` | datetime (YYYY-MM-DD) | ❌ |
| | `featured` | boolean (resaltar visual) | ✅ |
| Navegación | `has_subpage` | boolean (genera `/hitos/[slug]`) | ✅ |
| | `slug` | slug (from title) | ✅ |
| Diseño (`design`) | `cover` | image (2:3) | ✅ |
| | `gallery` | list de imágenes | ❌ |
| | `related_song` | relation → `musica` (by slug) | ❌ |
| | `related_event` | relation → `eventos` (by slug) | ❌ |
| Contenido | `summary` | text | ✅ |
| | `body` | markdown (solo si has_subpage) | ❌ |
| | `body` | markdown (solo si has_subpage) | ❌ |
| SEO (`seo`) | `title`, `description`, `og_image` | — | ✅ |

> **Nota de Routing:** Se utiliza una estrategia **Dual-Slug**.
> - **Filesystem:** `{{year}}-{{slug}}.md` (para orden cronológico en repo).
> - **URL Web:** `/hitos/{{slug}}` (URL limpia sin año). Astro debe usar el campo `slug` del frontmatter para la ruta.


---

### Páginas Estáticas (Singletons en `pages/`)

#### Inicio (`inicio.md`)
| Bloque | Campos |
|--------|--------|
| Hero (`hero`) | `title`, `subtitle`, `background`, `badge_text`, `cta_primary_label`, `cta_primary_link`, `cta_secondary_label`, `cta_secondary_link` |
| Quote (`quote_block`) | `active`, `text`, `author` |
| Featured (`featured`) | `event` (relation → eventos), `song` (relation → musica) |
| Música snippet (`musica_snippet`) | `title`, `text`, `button_label` |
| SEO (`seo`) | `title`, `description`, `og_image` |

#### Acerca de (`acerca-de.md`)
| Bloque | Campos |
|--------|--------|
| Hero (`hero`) | `title`, `subtitle`, `background` |
| Identidad (`identity`) | `description`, `history` (markdown), `goals` (list) |
| Galería (`gallery`) | list de imágenes |
| SEO (`seo`) | `title`, `description`, `og_image` |

#### Música (`musica.md`)
| Bloque | Campos |
|--------|--------|
| Hero (`hero`) | `title`, `subtitle`, `background` |
| SEO (`seo`) | `title`, `description`, `og_image` |

#### Agenda (`agenda.md`)
| Bloque | Campos |
|--------|--------|
| Hero (`hero`) | `title`, `subtitle`, `background` |
| SEO (`seo`) | `title`, `description`, `og_image` |

#### Contacto (`contacto.md`)
| Bloque | Campos |
|--------|--------|
| Hero (`hero`) | `title`, `subtitle` |
| Form (`form`) | `submit_label`, `success_message` |
| SEO (`seo`) | `title`, `description`, `og_image` |

#### Apoyo/Donaciones (`apoyo.md`)
| Bloque | Campos |
|--------|--------|
| Hero (`hero`) | `title`, `subtitle`, `background` |
| Allocation (`allocation`) | `title`, `items` (list) |
| Ways (`ways`) | `title`, `categories` (list) |
| Donation (`donation`) | `title`, `mp_link`, `paypal_link`, `bank_cbu`, `bank_alias`, `bank_holder` |
| Gratitude (`gratitude`) | `text`, `image` |
| SEO (`seo`) | `title`, `description`, `og_image` |

#### Organizar Evento (`organizar.md`)
| Bloque | Campos |
|--------|--------|
| Hero (`hero`) | `title`, `subtitle`, `background` |
| Info (`info`) | `objective`, `group`, `featured_img` |
| Rider (`rider`) | `stageplot_img`, `stageplot_pdf`, `input_list` (list) |
| Logistics (`logistics`) | `needs` (list), `backline_provided` (list), `backline_gallery` (list), `backline_list` (file), `backline_required` (list) |
| SEO (`seo`) | `title`, `description`, `og_image` |

#### Historial de Eventos (`historial-eventos.md`)
| Bloque | Campos |
|--------|--------|
| Hero (`hero`) | `title`, `subtitle`, `background` |
| SEO (`seo`) | `title`, `description`, `og_image` |

#### Bio (`bio.md`)
| Bloque | Campos |
|--------|--------|
| Identity (`identity`) | `photo`, `title`, `bio_text` |
| Style (`style`) | `background`, `accent_color` |
| Featured Video (`featured_video`) | `active`, `youtube_id`, `title` |
| Featured Event (`featured_event`) | `active`, `event_ref` (relation → eventos), `cta_label` |
| SEO (`seo`) | `title`, `description` |

---

### Configuración Global (`globals.yaml`)
**Archivo:** `src/content/data/globals.yaml`

| Bloque | Campos |
|--------|--------|
| Site Info (`site_info`) | `legal`, `developed` |
| Contact Info (`contact_info`) | `phone`, `email`, `location` |
| Links (`links`) | Lista: `label`, `url`, `type` (streaming/video/social/contact), `icon` |

---

## 📝 NOTAS TÉCNICAS

### Iconos
- `simple-icons` → marcas (Spotify, Apple, etc.)
- `lucide` → iconos genéricos (calendario, ubicación, etc.)
- Instalación: `astro-icon`

### ChordPro
- Librería: `chordsheetjs`
- Parseo del campo `body` para separar letra de acordes

### Glassmorphism Utility
```css
.glass {
  @apply bg-white/10 backdrop-blur-xl border border-white/20;
}
```

### View Transitions
- Activar `<ViewTransitions />` en el layout base de Astro
- Aplicar `transition:name` a elementos compartidos entre la grilla de eventos y la página de detalle

### Formulario de Contacto
- Servicio externo: Formspree, Getform o similar (por definir)
- No requiere backend propio

### Timezone
- Todos los cálculos de fecha/hora: **UTC-3 (Argentina)**
- Para el estado `finished` calculado en frontend

---

## 🎯 PRIORIDADES DE IMPLEMENTACIÓN

### MVP (Fase 1 — Desktop Only)
1. Navbar (estados transparente + scrolled)
2. Footer
3. Streaming Modal
4. Inicio (Hero con badge, inspirational, featured bento, música snippet, streaming)
5. Música (grid + páginas individuales con ChordPro completo)
6. Acerca de (hero, about, members grid con modales — sin timeline)
7. Agenda (lista + View Transitions a páginas individuales de evento)
8. Contacto (con formulario funcional)

### Fase 2
9. Timeline de hitos (con subpáginas condicionales)
10. Historial de eventos
11. Organizar evento
12. Donaciones
13. Bio/Streaming (landing independiente)
14. Versión mobile responsive
15. Integración Cloudflare Images (migración de assets)
---

## ✅ CHECKLIST PRE-DESARROLLO

**Configuración:**
- [ ] Verificar `globals.yaml` con todos los links actualizados
- [ ] Actualizar `config.yml` con campos nuevos (`badge_text`, `author`, páginas `musica.md`, `agenda.md`, `historial-eventos.md`)
- [ ] Crear contenido dummy (mín. 3 canciones, 3 eventos, 3 miembros, 3 hitos, roles)
- [ ] Elegir form service para contacto

**Desarrollo:**
- [ ] Aspect ratio 2:3 verificado en fotos de miembros
- [ ] Glassmorphism aplicado consistentemente
- [ ] Modales con clic-fuera para cerrar
- [ ] Subpáginas de hitos solo si `has_subpage: true`
- [ ] Estado `finished` calculado en frontend con timezone UTC-3

**Pre-deploy:**
- [ ] SEO completo en todas las páginas
- [ ] Performance: Lighthouse > 90
- [ ] Accesibilidad: aria-labels en modales, iconos, forms
- [ ] Alt text en todas las imágenes

---

**Documento:** Febrero 2026
**Versión:** 2.0
**Estado:** Listo para desarrollo
