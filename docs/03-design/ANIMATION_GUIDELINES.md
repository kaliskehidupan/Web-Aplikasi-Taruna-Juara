# Animation & Motion Guidelines

## 1. Core Principles

Animations in Taruna Juara Digital Platform serve a purpose: to guide focus, explain spatial changes, and celebrate student progress.

---

## 2. Motion Specifications (Framer Motion)

### 2.1 Page Transitions
```tsx
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};
```

### 2.2 Staggered Container Reveals
```tsx
export const containerStaggerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};
```

---

## 3. Micro-Interactions & Lottie Assets

- **Button Hover & Click**: Soft scale down on active state (`whileTap={{ scale: 0.97 }}`).
- **Success Milestone**: Confetti effect via canvas/Lottie when completing a Juz setoran.
- **Skeleton Loaders**: Soft shimmer pulses for skeleton cards during async state fetching.
