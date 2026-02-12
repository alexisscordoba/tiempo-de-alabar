# Implementation Plan: Inspirational & Featured Sections

This phase focuses on implementing the "Inspirational" quote block and the "Featured" Bento Grid on the homepage, following the Blueprint v2.0.

## User Review Required

> [!NOTE]
> The `inicio.md` content file currently only has `text` for the quote block. The blueprint mentions an `author` field. I will add support for it but it might be empty initially.

## Proposed Changes

### 🔧 Navbar Refinement (Current Focus)

The Navbar requires a final polish pass to ensure strict adherence to the **Blueprint v2.0** before moving to other sections.

#### [MODIFY] [Navbar.tsx](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/Navbar.tsx)
- [x] **Structure**: Logo (Left), Nav Pills (Center), Play Button (Right).
- [x] **Scroll Logic**: `isScrolled` state toggles between "Transparent" and "Glass/Sticky".
- [x] **Mobile Menu**: Morphing animation and responsive behavior.
- [ ] **Visual Polish**:
    - [x] **Mouse-driven Reflection**: Replace automatic loop animation with mouse-following sheen/glow on both Main and Mini navbars.
    - [x] **Transition Smoothness**: Prevent "border pop" by ensuring the border is present but transparent in the Hero state. Harmonize shadow and background fades.
    - [x] **Fix mini-navbar transition glitch**: Decoupled glass layers to prevent nested backdrop-filter snap.
    - [ ] Verify border colors against Blueprint (`rgba(255,255,255,0.3)` vs current `white/10`).
    - [ ] Ensure "Nav Central" pill style matches "State 1" specific requirements.
    - [ ] Verify z-index layering with Hero content.

### 🧩 Homepage Components (Up Next)

### 🧩 Homepage Components (Up Next)

#### [NEW] [Inspirational.astro](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/Inspirational.astro)
- **Layout**: Centered text block with generous padding.
- **Content**: Bible verse or inspirational quote from `inicio.md` (`quote_block`).
- **Style**: Large, elegant typography (serif or display), high contrast against neutral background.

#### [NEW] [FeaturedGrid.astro](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/FeaturedGrid.astro)
- **Layout**: Bento Grid (CSS Grid).
- **Cards**:
    - **New Release**: Fetches `featured.song` from `musica` collection. Displays cover art, title, badge.
    - **Next Show**: Fetches `featured.event` from `eventos` collection. Displays date, location, flyer.
    - **Organize**: Static card linking to `/organizar` with rotating gear icon interaction.

#### [NEW] [MusicPreview.astro](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/MusicPreview.astro)
- **Content**: Text from `musica_snippet` in `inicio.md`.
- **Action**: Button to `/musica`.
- **Visuals**: Abstract background or simple clean layout focusing on the call to action.

#### [NEW] [Footer.astro](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/Footer.astro)
- **Content**: Links from Blueprint (Primary Nav, Socials, Support, Organize).
- **Style**: Clean, organized, copyright info.

#### [MODIFY] [index.astro](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/pages/index.astro)
- [ ] Import and render `Inspirational`, `FeaturedGrid`, `MusicPreview`.
- [ ] Fetch necessary data (including resolving relations for Featured Grid).
- [ ] Add `Footer` to `Layout.astro` (or here if specific). *Correction: Footer should likely be in Layout.astro globally.*
- **Typography**: High-impact font for the quote, subtle style for the reference/author.
- **Background**: Minimalist/Textured background to separate from Hero.

#### [NEW] [FeaturedGrid.astro](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/FeaturedGrid.astro)
- **Layout**: CSS Grid / Bento Grid layout (responsive).
- **Cards**:
    1.  **New Release (Song)**: Fetches data from `musica` collection using `featured.song` slug. Displays cover, title, "Lanzamiento" badge, and Play button.
    2.  **Next Show (Event)**: Fetches data from `eventos` collection using `featured.event` slug. Displays flyer/date/location.
    3.  **Organize**: Static card linking to `/organizar` with rotating gear icon.
- **Interactions**: Hover effects (scale, glow) as per "Glassmorphism" design system.

#### [MODIFY] [index.astro](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/pages/index.astro)
- Import and use `Inspirational` and `FeaturedGrid` components.
- Pass data from `inicio` collection to these components.
- Implement data fetching logic for the referenced Song and Event.

### 🎨 Styling
- Ensure `Glassmorphism` tokens are applied correctly to the Bento cards.
- precise responsive adjustments for the Grid (1 col mobile -> 2/3 cols desktop).

## Verification Plan

### Manual Verification
1.  **Visual Check**: Verify the Inspirational section matches the design (centered, typographic).
2.  **Data Fetching**: Confirm that the Song and Event cards display the *correct* data corresponding to the slugs in `inicio.md`.
3.  **Links**: Click "Escuchar ahora" (Song) and "Ver detalles" (Event) to ensure they navigate correctly.
4.  **Responsive Grid**: Resize browser to verify Bento grid stacks correctly on mobile.
