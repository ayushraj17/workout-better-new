```markdown
# Design System Document: Kinetic High-End Editorial

## 1. Overview & Creative North Star: "Kinetic Brutalism"

The Creative North Star for this design system is **Kinetic Brutalism**. Unlike standard fitness apps that rely on generic cards and thin lines, this system treats the UI as a high-performance engine. It breaks the "template" look by using intentional asymmetry, massive typographic scales, and deep, tonal layering that mimics a high-end, darkened weight room illuminated by neon lights.

We move away from "flat" design into a world of **Atmospheric Depth**. By overlapping bold display type with semi-transparent glass containers, we create a sense of motion even when the screen is static. This is not just a tracker; it is a digital coach that demands action through high-contrast energy and sophisticated editorial layouts.

---

## 2. Colors: High-Voltage Contrast

The palette is built on a foundation of "Deep Space" neutrals (`surface`) punctuated by "Electric Lime" (`primary`) and "Cyan Pulse" (`secondary`).

### The "No-Line" Rule

**Explicit Instruction:** Do not use 1px solid borders to section content. Traditional borders create visual clutter and "box in" the user’s energy. Instead, define boundaries through:

- **Background Shifts:** Place a `surface_container_high` card against a `surface` background.
- **Tonal Transitions:** Use a subtle gradient from `surface_container_low` to `surface_container_highest` to guide the eye.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. Use the surface-container tiers to create nested depth:

- **Level 0 (Base):** `surface` (#0f0f00) for the main application background.
- **Level 1 (Sections):** `surface_container_low` (#151400) for large structural areas.
- **Level 2 (Interactive Elements):** `surface_container_high` (#212100) for cards and primary data containers.
- **Level 3 (Floating/Pop):** `surface_bright` (#2f2e00) for active states or temporary overlays.

### The "Glass & Gradient" Rule

To achieve a premium feel, use **Glassmorphism** for floating action buttons or navigation bars. Use `surface_variant` at 60% opacity with a `20px` backdrop blur.

- **Signature Texture:** For main CTAs, apply a linear gradient from `primary` (#f3ffca) to `primary_container` (#cafd00) at a 135-degree angle. This provides a "glow" that feels liquid and energetic rather than static.

---

### 3. Typography: The Editorial Voice

Our typography is designed to shout. It uses a mix of technical precision and aggressive scale.

- **Display (Space Grotesk):** Used for PRs (Personal Records), heavy weights, and high-energy motivation. The wide stance of Space Grotesk feels mechanical and powerful.
  - _Display-LG:_ `3.5rem`. Use for "Workout Complete" or "New Record" hero moments.
- **Headline (Space Grotesk):** Used for section titles.
  - _Headline-MD:_ `1.75rem`. Bold, uppercase for a "Gym Poster" aesthetic.
- **Body (Manrope):** Used for exercise descriptions and instructions. Manrope’s geometric nature ensures legibility during high-intensity movement.
  - _Body-LG:_ `1rem`. Default for all text-heavy content.
- **Label (Lexend):** Used for technical data (e.g., "12 REPS", "60 SECS"). Lexend is built for rapid scanning.
  - _Label-MD:_ `0.75rem`. Always high-contrast (`on_surface`).

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional drop shadows in favor of **Ambient Glows** and **Tonal Stacking**.

- **The Layering Principle:** Depth is achieved by stacking. Place a `surface_container_lowest` (#000000) inset card inside a `surface_container_high` (#212100) parent to create a "carved out" look for data inputs.
- **Ambient Shadows:** If a floating element (like a timer) requires a shadow, it must be tinted. Use `surface_container_lowest` at 40% opacity with a `32px` blur and `8px` Y-offset. Never use pure grey/black shadows; they muddy the dark theme.
- **The "Ghost Border" Fallback:** If accessibility requires a stroke, use the `outline_variant` (#4b4a16) at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** Navigation bars should use `surface_container_low` with a `blur(12px)` and `opacity: 0.8`. This allows the vibrant neon content to scroll beneath, creating a sense of layered environment.

---

## 5. Components: Robust & Intentional

### Buttons (The Kinetic Triggers)

- **Primary:** Gradient of `primary` to `primary_container`. Black text (`on_primary_fixed`). Corners set to `md` (0.375rem) for a "machined" feel.
- **Secondary:** Transparent background with a `Ghost Border`. Text in `secondary` (#00e3fd).
- **Tertiary/Ghost:** No background. Text in `on_surface_variant` (#b0ae70). Use for "Cancel" or "Edit" actions.

### Cards & Lists (The Data Grid)

- **Rule:** Absolute prohibition of divider lines.
- Use `spacing-6` (1.5rem) as a vertical gutter between workout items.
- Individual sets within an exercise should use a background shift to `surface_container_highest` to denote the active row.

### Input Fields (The Performance Log)

- **States:** Default state uses `surface_container_highest`.
- **Focus:** The border becomes a 2px solid `secondary` (#00e3fd) with a subtle outer glow (4px blur) of the same color.
- **Error:** Shift the background to `error_container` (#b92902) with `on_error` (#450900) text.

### Progress Gauges (The Energy Meter)

- Use `tertiary` (#ff6e84) for "rest time" and `primary` (#f3ffca) for "work time."
- Gauges should be thick (8px+) to maintain the "Robust" aesthetic.

---

## 6. Do's and Don'ts

### Do:

- **Do** use `primary_fixed` for numbers that represent progress or success.
- **Do** allow typography to overlap the edge of containers (e.g., a large background "01" for Set 1) to create an editorial look.
- **Do** use the `full` (9999px) roundedness scale _only_ for status chips and toggle pills. Everything else stays at `md` or `lg`.

### Don't:

- **Don't** use pure white (#ffffff) for text. Always use `on_surface` (#fdfab4) to maintain the warm, high-end dark-mode feel.
- **Don't** use standard Material Design drop shadows. They look "cheap" in a high-energy gym context. Use background color steps instead.
- **Don't** use 1px dividers. They break the "flow" of energy. Use `spacing-4` or color blocks.
- **Don't** use center-aligned text for data. Keep it left-aligned or tabular-right for a professional, technical feel.
```
