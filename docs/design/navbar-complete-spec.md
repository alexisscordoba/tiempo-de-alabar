# Navbar — Especificación Completa de Diseño

> **Documento definitivo.** Este archivo describe la totalidad del diseño, comportamiento, animaciones y lógica del componente Navbar tal como está implementado. Sirve como referencia única para reconstruirlo desde cero.

---

## 1. Visión General

El Navbar es el componente principal de navegación del sitio. Consta de **tres diseños independientes** según el ancho de pantalla:

| Modo | Breakpoint | Descripción |
|------|-----------|-------------|
| **Desktop** | ≥ 980px (`desktop:`) | Barra horizontal con glassmorphism, logo, mini-navbar central y botón play |
| **Tablet** | 768–979px (`md:`) | Mismo layout que desktop pero con espaciado reducido |
| **Mobile** | < 768px | Sistema de "pastillas flotantes" con menú morphing |

**Breakpoints en Tailwind**:
- `md`: 768px (estándar)
- `desktop`: 980px (custom, definido en `tailwind.config.mjs`)

---

## 2. Dependencias

| Paquete | Uso |
|---------|-----|
| `react` | Estado, efectos, eventos |
| `framer-motion` | `AnimatePresence`, `motion.div`, `layoutId` para transiciones |
| `lucide-react` | Íconos: `Menu`, `X`, `Play`, `Music`, `Calendar`, `Heart`, etc. |
| `clsx` + `tailwind-merge` | Fusión de clases vía utilidad `cn()` desde `src/lib/utils.ts` |

---

## 3. Datos y Configuración

### Enlaces de Navegación
```
INICIO      → /
ACERCA DE   → /acerca-de
MÚSICA      → /musica
AGENDA      → /agenda
CONTACTO    → /contacto
```

### Enlaces Sociales (Mobile)
```
Spotify (Music icon)  → #
YouTube (Play icon)   → #
Apoyo (Heart icon)    → /apoyo
```

### Props del Componente
```typescript
interface Props {
    streamingLinks?: { label: string; url: string; type: string }[];
}
```

---

## 4. Estado Interno

| Variable | Tipo | Propósito |
|----------|------|-----------|
| `isScrolled` | boolean | `true` cuando `scrollY > 100px`. Controla Hero ↔ Sticky |
| `isMenuOpen` | boolean | Menú mobile desplegado |
| `isModalOpen` | boolean | Modal de streaming |
| `showMobileNav` | boolean | Visibilidad del pill izquierdo mobile (scroll intelligence) |
| `lastScrollY` | number | Posición anterior del scroll para detectar dirección |
| `logoGlow` | boolean | Efecto glow temporal al hacer clic en el logo (600ms) |
| `mousePos` | `{x, y}` | Posición del cursor relativa al navbar (para reflección) |
| `currentPath` | string | Ruta actual del navegador (para link activo) |

---

## 5. Desktop + Tablet (≥ 768px)

Se renderiza con `hidden md:flex`. Desktop y Tablet comparten la misma estructura HTML; solo difieren en el espaciado vía clases responsivas.

### 5.1 Arquitectura: Estrategia de "Capa Independiente"

Para evitar glitches al transicionar `backdrop-filter` en elementos anidados (Main Navbar + Mini Navbar), se separan las responsabilidades:

```
<nav>                          ← Contenedor de posicionamiento (fixed, z-50)
  <div>                        ← Layout Container (flex, gap, padding)
    <div (absolute -z-10) />   ← Capa de Vidrio (bg, blur, border, shadow)
    <div (z-0) />              ← Mouse Glow
    <div>Logo + Texto</div>    ← Contenido
    <div>Mini Navbar</div>     ← Mini Navbar (inner pill)
    <div>Play Button</div>     ← Botón Play
  </div>
</nav>
```

> **CRÍTICO**: El Layout Container **NUNCA** tiene `background`, `border`, o `backdrop-filter`. Esos estilos viven exclusivamente en la Capa de Vidrio (`absolute inset-0 -z-10`).

### 5.2 Estados Visuales

El navbar interpola entre dos estados según `isScrolled` (threshold: 100px de scroll).

**Curva de transición global**: `duration-1000` con `cubic-bezier(0.4, 0, 0.2, 1)` — sensación líquida y orgánica.

#### Nav Exterior (Contenedor)

| Propiedad | Estado Hero | Estado Sticky |
|-----------|------------|---------------|
| Padding vertical | `py-5` | `py-2` |

#### Contenedor Interior (Layout)

| Propiedad | Tablet | Desktop | Hero | Sticky |
|-----------|--------|---------|------|--------|
| Gap | `gap-4` | `desktop:gap-20` | — | — |
| Padding X (hero) | `px-5` | `desktop:px-8` | — | — |
| Padding X (sticky) | `px-4` | `desktop:px-6` | — | — |
| Padding Y | — | — | `py-1.5` | `py-1` |

#### Capa de Vidrio (Background Layer)

| Propiedad | Hero | Sticky |
|-----------|------|--------|
| Background | `bg-transparent` | `bg-white/40` |
| Blur | `backdrop-blur-[0px]` | `backdrop-blur-2xl` |
| Border | `border-transparent` | `border-white/20` |
| Shadow | `shadow-none` | `shadow-lg` |

> **CRÍTICO**: Usar `backdrop-blur-[0px]` en vez de `backdrop-blur-none`. El valor `0px` fuerza al browser a interpolar numéricamente en lugar de eliminar la propiedad, previniendo "snaps" visuales.

### 5.3 Logo + Texto de Marca

#### Estructura
```
<div> (flex, select-none, draggable=false)
  <div> ♫ </div>          ← Logo circular
  <span>                   ← Contenedor de texto
    <span>Tiempo de </span>  ← Parte colapsable
    <span>Alabar</span>      ← Parte fija (italic)
  </span>
</div>
```

#### Logo (Círculo ♫)
- **Tamaño**: `w-8 h-8` (32px)
- **Fondo**: `bg-primary` (teal `#3e8d8b`)
- **Texto**: `text-white text-sm font-bold`
- **Sombra**: `shadow-lg shadow-primary/20`
- **Interacción**: `cursor-pointer`
- **Al hacer clic** (`active:`):
  - Glow: `shadow-[0_0_18px_rgba(62,141,139,0.6)]`
  - Escala: `active:scale-95`
- **Logo Glow Click** (solo en Hero):
  - Al hacer clic se activa `logoGlow = true` por **600ms**
  - El texto reacciona con un `text-shadow` orgánico y un micro `translateX(2px)` que simula una onda de energía del logo hacia el texto
  - En estado Sticky: `handleLogoClick` retorna sin efecto

#### Texto de Marca
- **Tipografía**: `font-black text-lg tracking-tighter`
- **Color**: Hero → `text-white` | Sticky → `text-secondary`
- **No seleccionable**: `pointer-events-none` + `select-none` en contenedor
- **No arrastrable**: `draggable={false}` en contenedor

##### Transición del Texto (Hero ↔ Sticky)
- **"Tiempo de\u00A0"** (parte colapsable):
  - `overflow-hidden` con `max-width` animado:
    - Hero: `max-width: 7em`, `opacity: 1`
    - Sticky: `max-width: 0px`, `opacity: 0`
  - Duración: `700ms` con `cubic-bezier(0.4, 0, 0.2, 1)`
  - Usa `\u00A0` (non-breaking space) al final para evitar salto de layout
- **"Alabar"** (parte fija):
  - Siempre visible, con `italic` para destaque sutil

##### Efecto Glow en Texto (Solo Hero)
Cuando `logoGlow && !isScrolled`:
```css
text-shadow: 0 0 12px rgba(62,141,139,0.7), 0 0 24px rgba(62,141,139,0.3);
transform: translateX(2px);
```
Cuando inactivo:
```css  
text-shadow: 0 0 0px transparent;
transform: translateX(0);
```
Transición: `duration-500`.

### 5.4 Mini Navbar (Inner Pill)

#### Contenedor
- **Layout**: `flex items-center gap-0.5 p-0.5 rounded-full`
- **Blur**: `backdrop-blur-md` (**constante** en ambos estados — previene re-composición de capas)
- **Border**: Hero → `border-white/30` | Sticky → `border-white/40`
- **Background**: Hero → `bg-white/0` | Sticky → `bg-white/50`
  > **CRÍTICO**: Usar `bg-white/0` en vez de `bg-transparent`. Evita artefactos de interpolación de color negro.
- **Shadow**: Hero → `shadow-none` | Sticky → `shadow-sm`

#### Reflección de Mouse (Mini Navbar)
- Overlay absoluto con `pointer-events-none`
- Gradiente: `radial-gradient(150px circle at Xpx Ypx, rgba(255,255,255,0.15), transparent 80%)`
- Visibilidad: `opacity-0` → `group-hover/mini:opacity-100`
- La coordenada X se ajusta con offset (`mousePos.x - 200`) porque el mini-navbar está desplazado del contenedor padre
- Transición: `duration-500`

#### Links de Navegación
- **Tipografía**: `font-black text-[10px] tracking-[0.05em]`
- **Padding**: Tablet → `px-2.5` | Desktop → `desktop:px-4`
- **Padding Y**: `py-1.5`
- **Forma**: `rounded-full`

##### Estado Activo
- Color: `text-white`
- Sombra: `shadow-md shadow-primary/20`
- Fondo animado: `motion.div` con `layoutId="active-pill"` y `bg-primary`
  - Transición spring: `bounce: 0.2`, `duration: 0.6`
  - **Se desliza suavemente** entre links activos gracias a `layoutId`

##### Estado Hover (links no activos)
- Hero: texto `text-white/80` → `hover:text-white` + underline `bg-white/80`
- Sticky: texto `text-secondary/70` → `hover:text-secondary` + underline `bg-primary/40`
- Underline animado: `w-0` → `group-hover/link:w-1/3`, `h-0.5`, centrado con `left-1/2 -translate-x-1/2`
- Transición: `duration-300`

### 5.5 Mouse-Driven Reflection (Global)

- Overlay absoluto sobre el navbar completo, `-inset-px`
- Gradiente: `radial-gradient(600px circle at Xpx Ypx, rgba(255,255,255,0.12), transparent 40%)`
- Visibilidad: `opacity-0` → `group-hover:opacity-100`
- Transición: `duration-300`
- `pointer-events-none` para no interferir con clics

### 5.6 Botón Play (Derecha)

- **Tamaño**: `w-9 h-9` (36px)
- **Forma**: `rounded-full`
- **Color**: `bg-primary text-white`
- **Ícono**: `Play` (16px), `fill="currentColor"`, con `ml-0.5` para centrado óptico
- **Border**: Solo en Hero → `border border-white/20`
- **Sombra**: `shadow-xl`
- **Hover**: `hover:scale-110`, ícono `group-hover:scale-110`
- **Active**: `active:scale-95`
- **Acción**: Abre el `StreamingModal`

---

## 6. Mobile (< 768px)

Se renderiza con `md:hidden`. Usa un sistema de dos "pastillas flotantes" independientes.

### 6.1 Pastilla Izquierda (Identidad)

Posición fija: `top-4 left-4 z-50`.

#### Visibilidad
- Se muestra cuando `showMobileNav && !isMenuOpen`
- Envuelta en `AnimatePresence` para animación de entrada/salida:
  - Entrada: `{ y: -100, opacity: 0 }` → `{ y: 0, opacity: 1 }`
  - Salida: `{ y: -100, opacity: 0 }`
  - Transición spring: `stiffness: 300`, `damping: 30`

#### Diseño
- **Forma**: `rounded-full`
- **Glass**: `backdrop-blur-md border border-white/10 shadow-lg`
- **Background**: Hero → `bg-black/30` | Sticky → `bg-black/20`
- **Logo**: `w-7 h-7` (28px), `bg-primary`, texto `♫` `text-[10px] font-bold`
- **Texto**: Solo visible en Hero (`!isScrolled`):
  - Contenido: `"Alabar"`
  - Estilo: `text-white font-black text-sm tracking-tighter pr-2`

### 6.2 Pastilla Derecha (Morphing Menu)

Posición fija: `top-4 right-4 z-[60]`.

Contenedor `motion.div` con `initial={false}` y `animate={isMenuOpen ? "open" : "closed"}`.

#### Glass
- `bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl`
- Forma: Cerrado → `rounded-full` | Abierto → `rounded-3xl`

#### Estado Cerrado (Compacto)
Variantes de `motion.div`:
```javascript
closed: {
    width: isScrolled ? 44 : 100,   // Círculo vs Píldora
    height: 44,
    backgroundColor: isScrolled ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.3)"
}
```
- **Modo compacto** (scrolled): Solo icono `Menu` (☰), 24px, `text-white`
- **Modo extendido** (hero): Botón `Play` a la izquierda (18px, fill) + separador (`border-r border-white/20 pr-2 mr-2`) + icono `Menu`

#### Estado Abierto (Menú Desplegado)
Variantes:
```javascript
open: {
    width: 300,
    height: 450,
    backgroundColor: "rgba(30, 41, 59, 0.95)",
    borderColor: "rgba(255,255,255,0.1)"
}
```
Transición spring: `stiffness: 400`, `damping: 30`

##### Contenido del Menú Abierto
- **Botón cerrar**: `X` (28px), posición `absolute top-6 right-6`, `text-white/70 hover:text-white`
- **Links de navegación**: Aparecen en cascada
  - `text-2xl font-bold text-white hover:text-primary`
  - Animación escalonada: `initial={{ opacity: 0, x: -20 }}` → `animate={{ opacity: 1, x: 0 }}`
  - Delay: `0.1 + index * 0.05`
  - Al hacer clic → cierra el menú
- **Footer / Sociales**: Pegado al fondo (`mt-auto`), separado por `border-t border-white/10 pt-6`
  - Íconos de 24px, `text-white/60 hover:text-white`
  - Animación: `initial={{ opacity: 0, y: 10 }}` → `animate={{ opacity: 1, y: 0 }}`
  - Delay: `0.4 + index * 0.05`

### 6.3 Lógica de Scroll Inteligente

```
scrollY > lastScrollY && scrollY > 100   → showMobileNav = false  (↓ Bajando)
scrollY < lastScrollY                     → showMobileNav = true   (↑ Subiendo)
```

Cuando `showMobileNav = false`:
- Pastilla izquierda se oculta (AnimatePresence exit)  
- Pastilla derecha se vuelve compacta (`width: 44`)

Cuando `showMobileNav = true`:
- Pastilla izquierda reaparece con spring animation
- Pastilla derecha se extiende (`width: 100`) si está en hero

---

## 7. StreamingModal

Se abre desde el botón Play (desktop y mobile). Componente externo `StreamingModal`:
```typescript
<StreamingModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    links={streamingLinks}
/>
```

---

## 8. Paleta de Colores

| Token | Valor | Uso en Navbar |
|-------|-------|---------------|
| `primary` | `#3e8d8b` | Logo, active pill, botón play, glow |
| `secondary` | `#40506d` | Texto en sticky state |
| `white/X` | Variable | Glass, borders, text en hero |
| `black/X` | Variable | Backgrounds mobile pills |

---

## 9. Resumen de Transiciones

| Elemento | Duración | Curva | Notas |
|----------|---------|-------|-------|
| Main navbar glass | 1000ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Líquida, orgánica |
| Mini navbar glass | 1000ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Sincronizada con main |
| Texto "Tiempo de" colapso | 700ms | `cubic-bezier(0.4, 0, 0.2, 1)` | `max-width` + `opacity` |
| Logo glow → texto | 500ms | ease (default) | `text-shadow` + `translateX` |
| Logo clic | 300ms | ease (default) | `shadow` + `scale` |
| Hover links | 300ms | ease (default) | Underline + color |
| Mouse reflection | 300ms (main) / 500ms (mini) | ease | Opacity fade |
| Mobile pill enter/exit | spring | `stiffness: 300, damping: 30` | Via AnimatePresence |
| Mobile menu morph | spring | `stiffness: 400, damping: 30` | Width/height/bg |
| Menu links cascade | spring | `delay: 0.1 + i*0.05` | Staggered |
| Active pill slide | spring | `bounce: 0.2, duration: 0.6` | `layoutId` |

---

## 10. Reglas Críticas (Anti-Glitch)

1. **Nunca poner `backdrop-filter` en el Layout Container** — solo en la Capa de Vidrio (`absolute -z-10`)
2. **Usar `backdrop-blur-[0px]`** en vez de `none` para permitir interpolación numérica
3. **Usar `bg-white/0`** en vez de `bg-transparent` en el mini navbar para evitar interpolación hacia negro
4. **Mantener `backdrop-blur-md` constante** en el mini navbar en ambos estados (Hero y Sticky) para evitar re-composición de capas del browser
5. **El texto de marca es `pointer-events-none`** para evitar selección; el contenedor tiene `select-none` y `draggable={false}`
