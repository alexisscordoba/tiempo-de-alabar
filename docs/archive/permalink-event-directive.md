## **Events "Permalink" (Permanent Link) Strategy**

1. **SEO Authority:** A single URL (`/eventos/slug`) accumulates all search value from the moment the event is announced until years after it has ended.
2. **Technical Simplicity:** In Astro, you simply create a file at `src/pages/eventos/[slug].astro` and you're set.
3. **User Experience (UX):** If someone bookmarks the link or shares it via WhatsApp, they will always reach the correct information. The page design adapts automatically: if the event has passed, they will see the gallery; if not, they will see the booking button.

---

### **Navigation Architecture**

Your site map, clean and scalable:

| Context | Navigation URL (List Pages) | Resource URL (Detail Page) |
| --- | --- | --- |
| **Upcoming** | `/agenda` | `/eventos/2026-festival-esperanza` |
| **Past** | `/historial-eventos` | `/eventos/2020-concierto-esperanza` |

### **CMS Collection Name (`config.yml`)**

To maintain consistency (**Semantics**), the collection name will be: `eventos`. This ensures the folder name in your code, the CMS name, and the URL match perfectly.

* **Folder:** `src/content/eventos/`
* **Config Name:** `name: "eventos"`
