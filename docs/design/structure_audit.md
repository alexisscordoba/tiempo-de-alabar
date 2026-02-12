# Auditoría de Estructura del Proyecto

**Fecha:** 11/02/2026
**Objetivo:** Verificar la alineación del directorio `tiempo-de-alabar` con el `directives/website-blueprint.md`.

## 🟢 Puntos alineados correctamente

1.  **Estructura de Directorios `src/content`**:
    *   Todas las colecciones requeridas (`musica`, `eventos`, `members`, `roles`, `hitos`) existen como carpetas.
    *   La carpeta `data` contiene `globals.yaml` correctamente.
    *   La carpeta `pages` contiene los archivos markdown para los contenidos estáticos (`inicio.md`, `acerca-de.md`, etc.).

2.  **Configuración de Astro (`astro.config.mjs`)**:
    *   Integraciones de Tailwind y React están correctamente instaladas y configuradas.

3.  **Esquemas de Contenido (`content.config.ts`)**:
    *   Se han definido esquemas para todas las colecciones mencionadas en el Blueprint.

## 🟡 Desviaciones Detectadas (A revisar)

1.  **Tecnología de Componentes**:
    *   **Blueprint:** Especifica `Navbar.astro` y `StreamingModal.astro`.
    *   **Realidad:** Se están usando `Navbar.tsx` y `StreamingModal.tsx` (React).
    *   **Análisis:** Esto es aceptable y probablemente necesario para las animaciones complejas (Framer Motion) mencionadas en el Walkthrough.
    *   **Acción Recomendada:** Actualizar el Blueprint para reflejar que estos componentes son de React, o mantenerlo como está sabiendo que es una decisión técnica válida.

2.  **Rutas de Páginas (`src/pages`)**:
    *   **Blueprint:** Enumera páginas como `/acerca-de`, `/musica`, `/agenda`, etc.
    *   **Realidad:** Solo existen `index.astro` y `admin.astro`.
    *   **Impacto:** Los enlaces en el Navbar darán error 404 si se intentan usar ahora.
    *   **Acción Recomendada:** Crear archivos "placeholder" (borradores) para estas rutas (`acerca-de.astro`, `musica.astro`, etc.) para que la navegación básica funcione, aunque el contenido esté vacío.

## 🔴 Errores / Faltantes Críticos

*   No se encontraron errores estructurales graves que impidan el funcionamiento actual (Fase 5 - Inicio). La estructura es limpia y consistente.

## 💡 Sugerencias de Orden y Limpieza

1.  **Consolidación de Assets**:
    *   Asegurar que todas las imágenes referenciadas en `src/content` existan en una estructura organizada dentro de `src/assets` o `public/assets`. Actualmente `public/assets/system` existe, lo cual es correcto según el blueprint.

2.  **Limpieza de `task.md`**:
    *   El archivo de tareas actual es efectivo. Sugiero mantenerlo actualizado tras cada sesión.

3.  **Standardización**:
    *   En `components`, mezclar `.astro` y `.tsx` es normal, pero intenta mantener la lógica de "Islands" clara: usa `.astro` para estructura estática y `.tsx` solo para interactividad.

---

## ✅ Próximos Pasos Sugeridos

1.  **Crear Rutas Faltantes:** Generar los archivos `.astro` básicos en `src/pages` para completar el mapa del sitio.
2.  **Oficializar React:** Anotar en el `project_status.md` o Blueprint que Navbar y Modal usan React por requerimientos de animación.
