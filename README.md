# Frizaski Al Fath — Interactive GSAP Portfolio

An immersive, highly interactive, and motion-heavy personal portfolio website custom-tailored for the **Front-End Developer** internship application at **Cretivox**. Built using Next.js, React, and TypeScript, and powered by GSAP for premium web animation flows.

## 🚀 Key Visual & Motion Features

- **Liquid SVG Cursor Mask** (Hero Section): A fluid liquid gooey filter mask that dynamically stretches and morphs to follow the cursor movement.
- **3D Parallax Panels** (Proof/Projects Section): Custom 3D tilt-and-parallax layers that transition and reveal project details on scroll.
- **Smooth Scroll Transitions** (Sisi Lain Section): Sequenced image-stack swaps tracking active categories on scroll.
- **Hover-Triggered Image Trail** (Perjalanan Section): A dynamic photo trail that spawns journey snapshots at the cursor coordinates as the mouse hovers over the viewport, with a scroll-pinned word-by-word reveal text overlay.
- **Interactive WebGL Line Waves** (Info Page Background): WebGL shader wave meshes utilizing the low-level graphics library `ogl` that warp and color-cycle in response to cursor positions.
- **Smooth Scrolling**: Powered by **Lenis** scroll-inertia engine for seamless frame rates and uniform scroll feel.

## 🛠️ Tech Stack

- **Core Framework**: [Next.js v16 (App Router)](https://nextjs.org/) + React 19 + TypeScript
- **Animation Engine**: [GSAP](https://gsap.com/) & `@gsap/react` (GSAP ScrollTrigger)
- **WebGL Rendering**: [ogl](https://github.com/oogl/ogl)
- **Scroll Inertia**: [Lenis](https://lenis.darkroom.engineering/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS Modules (custom variables, HSL color palettes, responsive flex/grid layouts)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Frizaski/CretivoxFrizaski.git
   cd CretivoxFrizaski
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
