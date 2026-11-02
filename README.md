# AlgoSphere — Reimagining VisuAlgo with Modern Visual Computing

An ultra-performant, multipage, aesthetically pleasing, UX-oriented interactive algorithm platform built according to strict **Web UI Design System** standards (`/web-ui-design-system`). Inspired by the academic foundation of **VisuAlgo** (developed by Dr. Steven Halim at the National University of Singapore).

---

## 🚀 Key Features

1. **Global Command Palette (`⌘K` / `Ctrl+K`)**:
   - Instant keyboard navigation across all 24 algorithmic modules, course codes (e.g., NUS CS2040), complexities, and data structures.

2. **The Tri-Engine Visualizer Workspace**:
   - **The Stage**: High-FPS responsive canvas supporting Sorting, BST & AVL tree self-balancing rotations, Graph traversals (BFS, DFS, Dijkstra), Pointer-linked lists, Stacks, and 2D Dynamic Programming matrix (0/1 Knapsack).
   - **The Synchronized Code Tracer**: Real-time pseudocode line execution tracking with active statement highlights.
   - **The Variable Watch & Telemetry Window**: Inspect live variable states (`i`, `j`, `min_idx`, `pivot`, distances, queues).
   - **Scrubbable Timeline Director**: Interactive progress scrubber, Step -1, Step +1, auto-play, speed controls (0.5x to 4x), and natural language step narration.

3. **Side-by-Side Algorithm Race Arena (`/compare`)**:
   - Benchmark up to 3 sorting algorithms simultaneously on identical randomized, reversed (worst-case), or nearly-sorted datasets.
   - Real-time comparison counters, memory write/swap tallies, and finish podium rankings.

4. **Automated Online Judge & Quiz System (`/quiz`)**:
   - Procedural challenge questions testing knowledge of algorithmic invariants, partition boundaries, and Big-O derivations with instant feedback and celebratory confetti.

5. **Interactive e-Lecture Slide Decks**:
   - Step-by-step pedagogical presentations for each module with motivation, key invariants, mathematical complexity proofs, and code references.

6. **Curated Learning Pathways (`/tracks`)**:
   - NUS CS2040 Core Syllabus, FAANG Technical Interview Sprint, and Algorithms 101.

---

## 🎨 Web UI Design System Compliance

- **Strict Design Tokens**: Hand-crafted 16-step spacing scale (`--space-1` to `--space-16`), 11-step type scale, dual-weight typography (`Inter` + `JetBrains Mono`), and uniform radius family.
- **HSL Color Ramp & Semantic States**: Inspecting (Amber), Swapping/Mutating (Purple), Finalized/Sorted (Emerald), Pivot/Marked (Coral Red), and Route/Visited (Cyan).
- **Reduced Visual Noise**: Elimination of unnecessary heavy borders, prioritizing surface elevation and ambient shadows.
- **Dark Mode Native**: High-contrast, eye-strain-free dark palette with a seamless light mode toggle.
- **Responsive & Touch-Friendly**: Collapsible drawers, fluid SVG viewports, and accessible 44px+ hit targets.

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
