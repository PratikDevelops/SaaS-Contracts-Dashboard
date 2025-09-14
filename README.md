# SaaS Contracts Dashboard (Complete)

This is a complete Vite + React + Tailwind CSS project implementing the SaaS Contracts Dashboard assignment.

## Features
- Login (mock): any username, password `test123`
- Contracts dashboard (search, filters, pagination)
- Contract detail with clauses, AI insights, evidence
- Upload modal (drag & drop) with simulated upload statuses
- Responsive design for desktop & mobile
- Dark mode toggle (saved in localStorage)
- Uses Context API for auth and UI state

## Run locally
1. Extract the ZIP.
2. Install deps:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173

## Notes
- Mock API files are in `public/` (contracts.json, contract-details/*.json)
- Tailwind is pinned to v3.4.14 to avoid v4 PostCSS changes.
- This is the full project. No external backend required.
