## Technical Documentation: Hitos collection (Milestones)
This directive establishes the technical structure and business logic for the **Hitos** (Milestones) collection. It is designed to power a dynamic vertical timeline that differentiates between simple historical markers and complex stories requiring dedicated subpages.

---

## 1. Architectural Philosophy: "Hybrid Display Model"

To balance performance and depth of content, the **Hitos** collection follows a hybrid logic:

* **The Modal (Primary Interaction):** Every milestone triggered from the vertical timeline opens a modal containing a `summary` and a `cover`.
* **The Subpage (Deep Dive):** If the field `has_subpage` is set to `true`, the modal reveals a "Ver más" (View more) button that redirects the user to a unique URL (`/hitos/slug`) where the full Markdown `body` is rendered.

---

## 2. Technical Structure (YAML Front Matter)

The files are stored in `src/content/hitos/` using the naming convention `YYYY-slug.md`.

### Field Definitions:

| Identifier (Field) | Type | Purpose |
| --- | --- | --- |
| `title` | String | Main title of the milestone (e.g., "Debut at Caleb"). |
| `year` | Number | Integer (YYYY) used for chronological sorting. |
| `date` | Date | Specific ISO 8601 date for precise ordering. |
| `featured` | Boolean | If `true`, the UI highlights this milestone in the timeline. |
| `has_subpage` | Boolean | Toggle to enable/disable the "Ver más" link and subpage generation. |
| `slug` | Slug | The URL segment (e.g., `el-comienzo`). |
| `design.cover` | Image | Main visual for the timeline card and modal. |
| `design.gallery` | List | Optional array of images for the subpage/modal slider. |
| `design.related_song` | Relation | Link to the `musica` collection via its slug. |
| `design.related_event` | Relation | Link to the `eventos` collection via its slug. |
| `summary` | Text | Short description for the initial modal view. |
| `body` | Markdown | The "Full Story" content rendered only on the subpage. |

---

## 3. CMS & Routing Logic

### Slug and Filename Generation

The system implements a **dual-slug strategy**:

1. **File System (`config.yml`):** Uses `slug: "{{year}}-{{slug}}"` to ensure files are organized chronologically in the repository (e.g., `2016-el-comienzo.md`).
2. **Web Routing:** Astro uses the internal `slug` field for the URL. This allows for clean URLs like `tiempodealabar.com.ar/hitos/el-comienzo` while keeping the backend sorted by date.

### Relational Data Integration

The `related_song` and `related_event` fields allow the Milestone to act as a **Hub**.

* If a milestone is a "Song Release," linking it to `musica` allows the UI to automatically pull Spotify links or sheet music buttons without duplicating data.
* If it is a "Historical Concert," linking it to `eventos` allows the user to jump straight to the event's setlist and photo gallery.

---

## 4. UI/UX Business Rules

* **Timeline Sorting:** The frontend must sort the collection by `year` (Descending/Ascending) and then by `date`.
* **Conditional Rendering:** * If `has_subpage` is `false`: The "Ver más" button is hidden. The Markdown `body` is ignored.
* If `has_subpage` is `true`: The button is displayed, and the build engine generates a static page at `/hitos/[slug]`.


* **Modal Behavior:** The modal must close if the user clicks the "X" button or anywhere outside the container (Dark/Blur background).

---

## 5. Implementation Example

**File:** `src/content/hitos/2020-sesiones-acusticas.md`

```yaml
---
title: "Sesión Especial Feliz7Play"
year: 2020
has_subpage: false
slug: "sesiones-feliz-7-play"
design:
  cover: "/src/assets/images/hitos/f7p-session.jpg"
  related_song: "gracias"
  related_event: null
summary: "Grabación de sesiones acústicas para la plataforma de la iglesia."
seo:
  title: "Sesión Feliz7Play | Tiempo de Alabar"
  description: "Detalles de nuestra grabación en video."
---
# Full story content (Hidden if has_subpage is false)

```