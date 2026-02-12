## Technical Documentation: Songs Collection & ChordPro Architecture
This technical documentation outlines the architectural logic and functional design of the **Songs Collection**, emphasizing the "Single Source of Truth" philosophy that powers the "Tiempo de Alabar" digital platform.

---

### 1. The "Single Source of Truth" Philosophy

To maintain a scalable and consistent database, each song is managed through a single Markdown (`.md`) file where data is never duplicated. This architecture separates structured data from musical content:

* **Frontmatter (YAML):** Dedicated to technical specifications, metadata, distribution links, and SEO.
* **Body (Markdown):** Reserved exclusively for the **ChordPro** musical score, ensuring no textual content is repeated in the frontmatter.

### 2. Functional Data Architecture

The data is organized into logical blocks that serve specific frontend functions rather than just acting as static text fields.

#### **Musical Intelligence**

The `technical` object defines the song's "ground truth".

* **Transposition Baseline:** By declaring an original `key`, the system provides a mathematical reference point for the transposition engine to calculate shifts in real-time.
* **Time & Tempo Sync:** Storing `tempo` and `time` allows the frontend to implement interactive tools such as metronomes or tap-tempo indicators.

#### **Resource & Media Logic**

The system employs a specific mapping logic to distinguish between consumption and education:

* **Internal Resources:** The `resources` list handles physical file delivery (PDFs, MP3s, PPTs) stored in the `/public` folder for direct, unoptimized download.
* **External Educational Media:** The `resources_videos` section is logically separated to handle third-party hosted content (YouTube tutorials), preventing bloated local storage and allowing for embedded video players.
* **Distribution Hub:** The `streaming` object centralizes platform IDs, allowing the UI to dynamically render buttons only for platforms where the song is actually available.

### 3. Dynamic Rendering States

The core of the frontend logic revolves around the **ChordPro Engine**, which processes the `body` field into three distinct user experiences:

1. **Public View (Lyric Sheet):** A logic filter strips all bracketed chords (e.g., `[E]`) to provide a clean reading experience for the general congregation.
2. **Musician View (Full Score):** Displays chords and lyrics in a fixed-width alignment, utilizing the `{start_of_grid}` and `{start_of_section}` tags to render visual song maps and intros.
3. **Interactive Transposition:** Programmatically shifts the chord notations within the text based on the user's requested key, using the `technical.key` metadata as the starting index.

### 4. Performance & Delivery Strategy

* **Asset Optimization:** While technical files are delivered statically, visual assets (cover art and social images) are handled via **Cloudflare Images**. The frontend requests dynamically transformed versions (WebP, resized, cached) based on the paths stored in the `design` and `seo` objects.
* **SEO Decoupling:** The architecture allows for independent SEO titles and descriptions, enabling the platform to target specific keywords for search engines without affecting the song's display title in the application UI.