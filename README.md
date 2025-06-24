# devx-survey

A ready-to-use Developer Experience (DevX) survey app for engineering organizations and companies.

## Use Case

This app is designed for companies that want to run a Developer Experience (DevX) survey with their engineering teams. It collects feedback on various aspects of the developer workflow, tooling, and satisfaction, helping organizations identify friction points and track improvements over time.

## Features
- Presents a series of DevX questions (Likert, demographic, and qualitative)
- Two questions per page, grouped by theme
- Requires all questions to be answered before proceeding
- Anonymous, local-first (answers are saved in localStorage until submission)
- Submits results to a backend endpoint

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone this repository:
   ```sh
   git clone <your-fork-or-this-repo-url>
   cd devx-survey
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Backend Requirements

To collect survey results, you must provide an API endpoint that accepts survey submissions. By default, the app POSTs survey data to `/api/devex-survey`.

- The endpoint should accept a JSON payload matching the contract used in `src/api/submitSurvey.ts`:
  ```js
  // Example payload
  {
    "location": "...",
    "tech": "...",
    "q1_imp": 4,
    "q1_sat": 3,
    // ...
    "q_best_change": "..."
  }
  ```
- The endpoint should respond with a 2xx status code on success.

You can implement this endpoint in any backend of your choice (Node.js, Python, serverless, etc.).

## Customization
- Edit `src/data/questions.ts` to change or add questions.
- Adjust themes, UI, or survey flow as needed.

## License
MIT
