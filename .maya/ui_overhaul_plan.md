# UI Overhaul Plan: "Axiom Minimal"

**Objective:** Transform the current "cinematic" UI into an extremely simple, responsive, and performance-first interface while maintaining all existing backend functionality.

## 🎨 Design Principles: "Simple & Stark"
- **Color:** Monochrome (Black, White, Grayscale) with a single Indigo accent (`#4F46E5`).
- **Depth:** 0px shadows. 1px solid borders (`border-neutral-200` in light, `border-neutral-800` in dark).
- **Typography:** System fonts (Inter/Geist). Increased line-height for readability.
- **Motion:** Zero animations. Instant transitions for maximum utility.
- **Responsiveness:** Single-column mobile-first, clean grid for desktop.

---

## 🏗 Phase 1: Global Foundation
1.  **Tailwind Config:** Simplify colors and remove custom animation extensions.
2.  **Globals.css:**
    - Reset all "glassmorphism" and complex gradients.
    - Define standard border-radius (8px) and border-colors.
    - Disable all transition/animation durations globally or via Tailwind utilities.

## 🧱 Phase 2: Primitive UI Components (`src/components/ui/`)
Systematically rewrite the following to the new style:
- `Button.tsx`: Solid black/white or outlined, no gradients.
- `Input.tsx`: Plain rectangular fields with subtle borders.
- `ModalShell.tsx`: Simplified overlay, sharp corners or 8px radius, no backdrop blur.
- `BentoGrid.tsx` & `BentoCard.tsx`: Convert to a standard simple grid.
- `TechIcon.tsx`: Monochrome icons or simple grayscale icons.
- `LoadingSpinner.tsx`: Minimalist 1-color spinner.

## 📐 Phase 3: Structural Layouts
- **Shell (`ClientShell.tsx`):** Simplified navigation, top bar only or simple sidebar.
- **Platform Layout (`src/app/(platform)/layout.tsx`):** Clean header, standard content container (max-width: 1200px).
- **Authentication Pages:** Minimal center-aligned forms.

## 📱 Phase 4: Feature-Specific UI
- **Dashboard/Paths:** List or simple grid view of learning paths.
- **Learn View:** Clean vertical split: Content (Left) | Editor/AI (Right).
- **AI Assistant (Maya):**
    - `MayaAssistant.tsx`: Minimal bubble or side panel.
    - `MayaChatWindow.tsx`: Message-first, plain backgrounds, system-style typing.

## 🚀 Phase 5: Cleanup & Validation
- Remove `framer-motion` dependency (optional but recommended for speed).
- Audit all pages for responsiveness (320px to 4k).
- Ensure all "Functionality" (Progress tracking, AI streaming, Code execution) still works.

---

## 🛠 Execution Strategy
I will proceed turn-by-turn, starting with the foundation, then the primitive components, and then the page layouts.
