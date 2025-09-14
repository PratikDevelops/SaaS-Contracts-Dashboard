# SaaS Contracts Dashboard

This is a **React + Tailwind CSS** single-page application (SPA) simulating a **SaaS contracts management dashboard**, built as per the **UI/UX Developer Assignment** requirements.

The app allows users to:
1. Login with mock authentication
2. Upload contract files (mocked)
3. View a contracts dashboard (list, search, filters, pagination)
4. Explore detailed contract insights (clauses, AI risks, evidence)

---

## Features

- **Login Page**
  - Username + password fields, login button
  - Mock authentication: any username, password must be `test123`
  - On success → saves mock JWT in `localStorage` and navigates to Dashboard

- **Contracts Dashboard**
  - Sidebar: Contracts, Insights, Reports, Settings
  - Topbar: User profile dropdown
  - Table of contracts from mock API
  - Columns: Contract Name, Parties, Expiry Date, Status, Risk Score
  - Search by name or parties
  - Filters: Status (Active, Expired, Renewal Due), Risk (Low, Medium, High)
  - Pagination: 10 rows per page
  - States: Loading, Empty (“No contracts yet”), Error

- **Contract Detail Page**
  - Metadata: Contract title, parties, start & expiry dates, status, risk score
  - Clauses section: title, summary, confidence score
  - AI Insights section: risks & recommendations with severity labels
  - Evidence panel: side drawer with snippets & relevance scores

- **Upload Modal**
  - Drag & drop or browse files
  - Shows upload status: Uploading, Success, Error
  - Simulates upload with a timeout

- **UI / UX**
  - Clean, modern design
  - Fully responsive for desktop & mobile
  - Dark mode toggle (state saved in localStorage)
  - Smooth navigation between pages

- **Tech Stack**
  - React (functional components + hooks)
  - Tailwind CSS v3.4.14
  - Context API for state management
  - Mock API in `/public` folder
  - Can be deployed on Vercel or Netlify

---

## Mock API

- Contracts List: `public/contracts.json`
- Contract Detail: `public/contract-details/{id}.json`
- Example structure included in the project

---

## Setup & Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PratikDevelops/saas-contracts-dashboard.git
   cd saas-contracts-dashboard

2. **Install dependencies:**
   ```bash
   npm install

3. **Start the development server:**
      ```bash
   npm run dev
   
