# Propuesta de Reorganización y Mejores Prácticas

**Estado:** 🟡 Pendiente de Aprobación
**Objetivo:** Establecer una estructura de proyecto profesional, escalable y ordenada, separando claramente los artefactos de gestión, diseño, recursos y código fuente.

## 1. Análisis de Estado Actual

Actualmente, la carpeta raíz `development` contiene una mezcla de directorios con diferentes propósitos:
*   `tiempo-de-alabar/` ➜ **Código Fuente** (Correcto).
*   `directives/` ➜ **Diseño/Requisitos** (Nombre no estándar).
*   `docs/` ➜ **Gestión y Documentación** (Mezcla de planes y manuales).
*   `canciones pendientes en chordpro/` ➜ **Recursos Crudos** (Nombre largo y ubicación raíz).
*   `generic-assets/` ➜ **Recursos Crudos** (Ubicación raíz).

Esta estructura "plana" puede volverse caótica a medida que el proyecto crece.

## 2. Nueva Estructura Propuesta

Sugerimos adoptar una arquitectura basada en **Áreas de Funcionalidad**:

```
development/
├── 📂 planning/                # GESTIÓN DEL PROYECTO
│   ├── project_status.md       # Estado actual y roadmap
│   ├── task.md                 # Lista detallada de tareas técnica
│   └── sprints/                # (Futuro) Notas de cada sprint
│
├── 📂 design/                  # DISEÑO Y ESPECIFICACIONES
│   ├── website-blueprint.md    # La "Biblia" del proyecto
│   └── audits/                 # Reportes de auditoría y análisis
│       └── structure_audit.md
│
├── 📂 docs/                    # DOCUMENTACIÓN TÉCNICA
│   └── walkthroughs/           # Guías paso a paso de lo implementado
│       └── walkthrough-stage4.md
│
├── 📂 resources/               # MATERIA PRIMA (No código)
│   ├── music-backlog/          # (Antes "canciones pendientes...")
│   │   ├── canción-1.txt
│   │   └── ...
│   └── assets-library/         # (Antes "generic-assets")
│       └── placeholders/
│
└── 📂 tiempo-de-alabar/        # CÓDIGO FUENTE (Web App)
    ├── src/
    ├── public/
    └── README.md               # Guía técnica específica para desarrolladores
```

## 3. Justificación ("The Why")

1.  **Separation of Concerns:** Un desarrollador que solo quiere programar entra a `tiempo-de-alabar`. Un Project Manager entra a `planning`. Un Diseñador a `design`. No se mezclan contextos.
2.  **Scalability:** Si mañana necesitas "Marketing" o "Legales", creas carpetas hermanas sin ensuciar el código.
3.  **Onboarding:** Es obvio dónde encontrar cada cosa. "¿Dónde está el plan?" en `planning`. "¿Dónde están los assets originales?" en `resources`.
4.  **Clean Root:** La raíz queda limpia, facilitando la navegación.

## 4. Plan de Acción (Implementation Plan)

Si apruebas esta estructura, realizaré los siguientes movimientos:

### Fase 1: Creación de Estructura
- [ ] Crear carpetas: `planning`, `design`, `design/audits`, `resources/music-backlog`, `resources/assets-library`.

### Fase 2: Migración de Archivos
- [ ] Mover `docs/project_status.md` ➜ `planning/project_status.md`.
- [ ] Mover `docs/implementation_plan.md` ➜ `planning/implementation_plan.md`.
- [ ] Mover `directives/website-blueprint.md` ➜ `design/website-blueprint.md`.
- [ ] Mover `docs/structure_audit.md` ➜ `design/audits/structure_audit.md`.
- [ ] Mover contenido de `canciones pendientes...` ➜ `resources/music-backlog/`.
- [ ] Mover contenido de `generic-assets` ➜ `resources/assets-library/`.

### Fase 3: Limpieza
- [ ] Borrar carpetas vacías (`directives`, `canciones pendientes...`, `generic-assets`).
- [ ] Dejar `docs/` solo para documentación técnica real (walkthroughs, APIs).

### Fase 4: Verificación
- [ ] Verificar que no se rompieron enlaces relativos en los documentos movidos (actualizar links en `project_status.md` y `task.md` si es necesario).

## 5. Preguntas para el Usuario

*   ¿Estás de acuerdo con renombrar `directives` a `design`? (Es más estándar).
*   ¿Prefieres mantener los nombres en inglés para estructura (`planning`, `design`, `resources`) o usarlos en español?
