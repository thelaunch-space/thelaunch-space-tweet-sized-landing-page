# Repository Guidelines

## Project Vision & Core Principles
- **Concept:** A "tweet-sized" landing page. The core value proposition must be delivered instantly, reflecting the agency's ethos of cutting through bureaucracy and delivering value at speed.
- **Target Audience:** Ambitious, fast-moving founders and product leaders who prioritize execution and clarity over lengthy process.
- **Layout (Non-Negotiable):** All primary content must be visible within the first fold on both desktop and mobile. The main pitch must not require any vertical scrolling.
- **Responsiveness:** The design must be fully responsive, providing a premium, seamless experience on all devices, from small mobile phones to large desktops.

## Features & Components
- **Hero Section:** A direct, high-impact headline communicating the "21 days, idea to revenue" value proposition.
- **Services Overview ("What We Do"):** A secondary view detailing the agency's offerings (Landing Pages, MVPs, Retainers) with clear pricing tiers, accessible without leaving the main page context.
- **Animated Client Dock:** An interactive, macOS-style dock showcasing logos of past clients.
  - **Desktop:** A magnification effect with a descriptive tooltip appears on hover.
  - **Mobile:** The tooltip appears on tap, with logic to handle which icon is active.
  - **Implementation:** The tooltip is rendered in a React Portal to prevent it from being clipped by parent containers, ensuring it is always visible.
- **Lead Capture Modal:** A modal form for potential clients to submit their project needs, integrated with a Make.com webhook for lead processing.

## Development Log
- **Initial Setup:** Project bootstrapped with Vite, React, TypeScript, and Tailwind CSS. Lead submissions are sent directly to Make.com via webhook.
- **Client Logo Display:** Replaced an initial static, scrolling logo banner with a dynamic, animated `Dock` component for superior visual appeal and interactivity.
- **Dock Component Refactor:**
  - **Portal Implementation:** Resolved a complex tooltip clipping issue by refactoring the component to use a React Portal, ensuring the tooltip always appears on top of other UI elements.
  - **Enhanced Tooltips:** Upgraded tooltips to include both the client's name and a description of the project outcome.
  - **Cross-Device Interactions:** Implemented distinct interaction models for desktop (hover) and mobile (tap) to provide a native feel on all platforms.
  - **Robust Data Flow:** Refactored the component's data flow from using `React.children` to a more stable `items` prop, simplifying the architecture.

---

## Project Structure & Module Organization
- `src/` holds the React 18 + TypeScript app; `main.tsx` wires `App.tsx`, `components/` stores UI atoms such as `Modal`, and `lib/` houses integration helpers (e.g., `webhook.ts`).
- Tailwind styles live in `src/index.css` with supporting config in `tailwind.config.js` and `postcss.config.js`.
- Static assets (logo, portraits) are served from `public/`; keep filenames stable because they are referenced directly via `/asset.png` paths inside JSX.

## Build, Test, and Development Commands
- `npm install` boots the toolchain (Vite, ESLint 9, Tailwind).
- `npm run dev` starts the Vite dev server with HMR at `http://localhost:5173`.
- `npm run build` emits the production bundle into `dist/`; pair it with `npm run preview` for a local smoke test of the built assets.
- `npm run lint` runs the flat ESLint config (`eslint.config.js`) against TS/JS and JSX files; fix warnings before committing.
- `npm run typecheck` performs a strict `tsc --noEmit` using `tsconfig.app.json` to catch typing regressions even when Vite still compiles.

## Coding Style & Naming Conventions
- Use 2-space indentation, TypeScript types for props/state, and functional React components with hooks; avoid default exports for components unless there is only one per file.
- Prefer descriptive file names (`HeroSection.tsx`, `LeadForm.tsx`) and keep shared utilities in `src/lib/`.
- Tailwind utility classes drive layout and color; extract repeated class clusters into small wrapper components instead of inline duplication.
- ESLint already enforces React Hooks rules and globals; run linting before pushing to surface stale imports or unsafe dependencies.

## Testing Guidelines
- Automated tests are not yet wired up—when introducing them, colocate specs under `src/__tests__/` or alongside the component (`Component.test.tsx`) and use Vitest + React Testing Library so they align with the Vite stack.
- Until a formal suite exists, document manual QA steps in PRs (scenarios exercised, browsers used) and rely on `npm run lint` plus `npm run typecheck` as a minimum gate.
- Target coverage for customer-facing flows (lead capture modal, webhook submissions, routing) before shipping net-new features.

## Commit & Pull Request Guidelines
- Keep commits short, imperative, and scoped (e.g., `add lead form validation` rather than narrative tense); amend only your own work.
- Each PR should describe motivation, implementation notes, and screenshots or recordings for UI-visible changes; link Linear/GitHub issues when available.
- Block PRs on failing lint/typecheck runs and call out any required environment changes (`.env.local` vars) in the description.

## Security & Configuration Tips
- Create a `.env.local` with `VITE_WEBHOOK_URL`; never commit real webhook URLs. Provide sanitized examples (`https://hook.make.com/xxx`) in docs instead.
- Keep webhook URLs secure and rotate them if they are exposed in preview builds.
