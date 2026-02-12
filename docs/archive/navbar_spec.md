# Navbar Component Specification

## Overview
The **Navbar** is the primary navigation component for the desktop experience. It features a sophisticated "double-glass" design (Main Navbar + Mini Navbar) with organic liquid transitions between its Top (Hero) and Scrolled (Sticky) states.

## Core Architecture: The "Independent Layer" Strategy
To achieve a glitch-free transition where a nested glass element (Mini Navbar) moves inside another glass element (Main Navbar), we use a **Layer Separation Strategy**.

### The Problem
If the Parent Container has `backdrop-filter`, browsers often fail to correctly render nested `backdrop-filter` elements during transitions, causing "snapping" or "popping" artifacts (Composite Layer repaints).

### The Solution
We decouple the **Visuals** from the **Layout**.

1.  **Layout Container (`relative`)**: Handles size (`width`, `height`, `padding`) and positioning. It **NEVER** has background, border, or blur styles.
2.  **Background Layer (`absolute inset-0 -z-10`)**: A dedicated sibling `div` that handles **ONLY** the glass effect (`bg`, `backdrop-blur`, `border`, `shadow`).
3.  **Content (`z-10`)**: Logo, Links, Buttons sit on top.

```tsx
<nav>
  {/* 1. Layout Container */}
  <div className="relative flex items-center ...">
  
     {/* 2. Independent Glass Layer */}
     <div className="absolute inset-0 -z-10 rounded-full ..." />
     
     {/* 3. Content */}
     <div className="z-10 ...">
        <Logo />
        <MiniNavbar />
        <PlayButton />
     </div>
  </div>
</nav>
```

## Visual States

The component interpolates between two distinct states based on `isScrolled` (>100px).

### 1. Main Navbar (Outer Shell)

| Property | Hero State (Top) | Sticky State (Scrolled) | Notes |
| :--- | :--- | :--- | :--- |
| **Background** | `bg-transparent` | `bg-white/40` |  |
| **Blur** | **`backdrop-blur-[0px]`** | `backdrop-blur-2xl` | **CRITICAL**: Using `0px` instead of `none` forces the browser to interpolate the value instead of removing the layer. |
| **Border** | `border-transparent` | `border-white/20` |  |
| **Shadow** | `shadow-none` | `shadow-lg` |  |
| **Padding** | `px-8 py-1.5` | `px-6 py-1` | Smooth expansion/contraction. |

**Transition**: `duration-1000` with `cubic-bezier(0.4, 0, 0.2, 1)` (Organic Liquid Feel).

### 2. Mini Navbar (Inner Pill)

| Property | Hero State (Top) | Sticky State (Scrolled) | Notes |
| :--- | :--- | :--- | :--- |
| **Background** | **`bg-white/0`** | `bg-white/50` | `white/0` prevents black-interpolation artifacts. |
| **Blur** | `backdrop-blur-md` | `backdrop-blur-md` | **CRITICAL**: Constant blur prevents layer promotion snapping. |
| **Border** | `border-white/30` | `border-white/40` |  |

**Transition**: Synchronized with Main Navbar (`duration-1000`, same bezier).

## Interactive Elements

### Mouse-Driven Reflection
A radial gradient follows the mouse cursor position (`mousemove` event).
- **Implementation**: An absolute overlay `div` with `pointer-events-none`.
- **Gradient**: `radial-gradient(600px circle at x y, rgba(255,255,255,0.12), transparent 40%)`.
- **Behavior**: `opacity-0` by default, `opacity-100` on `group-hover`.

### Navigation Links
- **Typography**: `font-black` (Weight 900), `tracking-[0.05em]`.
- **Active State**: White text, Primary color pill background (`layoutId="active-pill"`).
- **Hover**:
    - **Hero**: White underline (`bg-white/80`).
    - **Sticky**: Teal underline (`bg-primary/40`).
    - **Logic**: Underline only appears for the *specific* hovered link (`group-hover/link`).

## Mobile Navbar
- **Identity Pill**: Appears only when scrolled or menu is closed.
- **Morphing Menu**:
    - **Closed**: Small circular button.
    - **Open**: Expands to full-screen overlay (`layoutId` transition).
