# Walkthrough - Stage 4: Base Components

## Overview
This stage focused on implementing the core navigation and footer components, ensuring they align with the "Website Blueprint v2.0" and the specific mobile design directives.

## Changes Implemented

### 1. Navbar ([src/components/Navbar.tsx](file:///C:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/Navbar.tsx))
- **Technology**: React + Framer Motion.
- **Features**:
    - **Desktop**: Transparent to Glassmorphism transition on scroll. Pill-shaped navigation.
    - **Mobile**: "Dual Floating Pills" design.
    - **Interactions**:
        - Morphing animations for the menu distinct from the identity pill.
        - Scroll-aware visibility (hides on scroll down, shows on scroll up).
        - "Waterfall" animation for menu links using Framer Motion.

### 2. Footer ([src/components/Footer.astro](file:///C:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/Footer.astro))
- **Technology**: Astro Component.
- **Features**:
    - **Dynamic Data**: links and contact info pulled from [src/content/data/globals.yaml](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/content/data/globals.yaml).
    - **Structure**: Brand, Navigation, Social Icons, and Action Buttons ("Apoyar", "Organizar").
    - **Design**: Clean, centered layout with hover scale effects.

### 3. Layout Integration
- Updated [src/layouts/Layout.astro](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/layouts/Layout.astro) to include `<Navbar client:load />` and `<Footer />`.
- Enabled `ClientRouter` (View Transitions) for smooth page navigation.
- Fixed schema issues in [content.config.ts](file:///C:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/content.config.ts) to allow for nullable fields in existing content.

## Verification

> **Note**: Automated browser verification is currently unavailable. Please verify manually.

### Manual Verification Steps
1.  **Start Server**: Ensure `npm run dev` is running (it is currently active).
2.  **Open Browser**: Navigate to `http://localhost:4321`.
3.  **Check Navbar**:
    - **Desktop**: verify transparency at the top and white background when scrolling down.
    - **Mobile**: toggle device toolbar (F12 > Ctrl+Shift+M). Check the "two pills" layout. Scroll down to see them hide, up to see them show. Click the menu button to see the morphing animation.
4.  **Check Footer**:
    - Scroll to the bottom using the scroll indicator or manually.
    - Verify social icons matches [globals.yaml](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/content/data/globals.yaml).
    - Click "Apoyar" or "Organizar" buttons (should link to respective pages).

## Known Issues Resolved
- **Schema Mismatches**: Fixed errors in [content.config.ts](file:///C:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/content.config.ts) where `null` values in Markdown frontmatter caused build failures (specifically for event setlists, member end dates, and hito relations).
- **Rollup Parse Error**: Fixed an issue where [globals.yaml](file:///c:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/content/data/globals.yaml) was being imported directly in [Footer.astro](file:///C:/ALEX%20STORAGE/TdA/Website/development/tiempo-de-alabar/src/components/Footer.astro). Replaced with `getEntry` from `astro:content` to correctly fetch data from the collection.
