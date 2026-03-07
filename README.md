# PPD — Personal Productivity Dashboard

A modern, dark-themed personal productivity dashboard built to help you track tasks, habits, notes, and personal insights — all in one place.

🔗 **Live Demo (TypeScript):** https://ppd-git-ts-migration-koumolous-projects.vercel.app/
🔗 **Live Demo (JavaScript):** https://ppd-brown.vercel.app/

---

## About

PPD was built in three iterations:

- **Version 1** — Pure JavaScript
- **Version 2** — React.js (JavaScript)
- **Version 3** — React.js + TypeScript *(current)*

This project was a deliberate learning exercise — each version was built to deepen understanding of the respective technology, with the final iteration serving as a hands-on TypeScript migration of a live production app.

---

## Features

- ✅ **Task Management** — Create, complete, and delete tasks with productivity insights
- 🔥 **Habit Tracking** — Build streaks and track daily habit completion
- 📝 **Notes** — Create, view, and delete personal notes
- 📊 **Dashboard Insights** — Visual stats, progress bars, and today vs yesterday comparisons
- 👤 **User Profile** — Editable profile with localStorage persistence
- 📱 **Responsive** — Mobile sidebar, desktop layout with collapsible navigation

---

## Tech Stack

- **React 18** with TypeScript
- **Vite** — build tool
- **Tailwind CSS** — styling
- **React Router v6** — navigation
- **localStorage** — data persistence

---

## Project Structure
```
src/
├── component/       # Reusable UI components
├── context/         # React context providers
├── pages/           # Page-level components
├── types/           # Shared TypeScript interfaces
└── assets/          # Static assets
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/learningsin2024-source/PPD-.git

# Navigate into the project
cd PPD-

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## TypeScript Highlights

This project was migrated from JavaScript to TypeScript as a learning exercise. Key patterns used:

- Shared entity interfaces (`Task`, `Note`, `Habit`, `User`) in a central `types/index.ts`
- Context typing with `createContext<ContextType | null>(null)` and null safety checks
- Utility types — `Partial<User>` for profile updates, `Record<string, number>` for data maps
- Union types for constrained values like `"up" | "down" | "same"`
- Native vs React event types (`KeyboardEvent` vs `SyntheticEvent`)

---


## License

MIT
