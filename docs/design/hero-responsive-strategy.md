# Estrategia de Diseño Responsive: Hero Section

Este documento define las mejores prácticas de diseño responsive aplicadas específicamente a la sección Hero de "Tiempo de Alabar", asegurando una experiencia visual impactante en cualquier dispositivo.

## 🎯 Objetivos de Diseño

1. **Impacto Visual Inmediato**: La imagen de fondo y el título deben capturar la atención en < 3 segundos.
2. **Legibilidad Absoluta**: El texto blanco debe ser legible sobre cualquier fondo mediante overlays inteligentes.
3. **Acción Clara**: Los botones de acción (CTA) deben ser accesibles y evidentes, especialmente en pantallas táctiles.

---

## 📱 Estrategia por Dispositivo

### 1. Mobile (Portrait)

*El espacio vertical es premium y la interacción es táctil.*

* **Imagen de Fondo**:
  * **Best Practice**: Usar `object-position: center` o focalizar el sujeto principal.
  * **Adaptación**: Asegurar que la imagen cubra el 100% de la altura de la ventana gráfica (`100dvh`) para evitar saltos por la barra de navegación del navegador mobile.
* **Tipografía**:
  * **Título**: Reducir drásticamente el tamaño (`text-5xl`) pero mantener el interlineado ajustado (`leading-[0.9]`) para conservar el impacto sin romper palabras excesivamente.
  * **Subtítulo**: Ajustar a un tamaño de lectura cómodo (`text-base` o `text-lg`), evitando que ocupe más de 3 líneas.
* **Botones (CTA)**:
  * **Best Practice**: Áreas de toque generosas (min 44px altura).
  * **Adaptación**: Disponer los botones en **columna** (vertical stack) y con ancho completo (`w-full`) pero **manteniendo márgenes laterales** (no tocar los bordes de la pantalla). Esto facilita el toque con el pulgar sin saturar la vista.
* **Elementos Ocultos**:
  * **Scroll Indicator**: Ocultar para ganar espacio vertical para el contenido principal.
  * **Badge**: Mantener, pero reducir escala si es necesario.

### 2. Mobile (Landscape) & Tablets Pequeñas

*La altura es reducida, el ancho es intermedio.*

* **Padding Vertical**: Reducir el padding superior/inferior para que el contenido quepa sin necesidad de mucho scroll inicial.
* **Grid**: Mantener botones en fila (`flex-row`) si el espacio lo permite, o columna si la altura es crítica.

### 3. Tablet (Portrait) & Desktop Pequeño

*Espacio equilibrado, lectura cómoda.*

* **Tipografía**: Escalar título a un tamaño intermedio (`text-7xl`).
* **Layout**: Botones en fila (`flex-row`).
* **Overlay**: Gradiente puede ser más sutil ya que las pantallas suelen tener mejor contraste y brillo.

### 4. Desktop (Large)

*Experiencia cinematográfica.*

* **Imagen**: Alta resolución.
* **Tipografía**: Máximo impacto (`text-8xl`+).
* **Interacciones**: Efectos de hover completos en botones y enlaces.
* **Scroll Indicator**: Visible y animado para invitar a la exploración.

---

## 🛠️ Implementación Técnica (Tailwind CSS)

| Elemento | Mobile (`default`) | Tablet (`md`) | Desktop (`lg`/`xl`) |
| :--- | :--- | :--- | :--- |
| **Altura** | `min-h-[100dvh]` | `min-h-screen` | `min-h-screen` |
| **Padding** | `px-6 pt-32 pb-20` | `px-12 pt-32 pb-32` | `px-20 pt-40 pb-40` |
| **Título** | `text-5xl` | `text-7xl` | `text-8xl` |
| **CTA Layout** | `flex-col w-full` | `flex-row w-auto` | `flex-row w-auto` |
| **Scroll Indicator** | `hidden` | `flex` | `flex` |

### Notas sobre el Overlay

Para garantizar contraste sin "ensuciar" la imagen:

* Usar un gradiente vertical: `bg-gradient-to-b from-black/60 via-black/20 to-black/80`.
* Esto oscurece arriba (para el Navbar y Badge) y abajo (para el Scroll Indicator y transición), dejando el centro más limpio para el sujeto de la imagen.
