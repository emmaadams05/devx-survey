# devx-survey

A ready-to-use Developer Experience (DevX) survey app for engineering organizations. It collects structured feedback on the developer workflow, tooling, and overall satisfaction so teams can surface friction points and measure improvements over time.

## Live Demo

🌐 **Try the survey**: [http://devxsurvey.surge.sh/survey/0](http://devxsurvey.surge.sh/survey/0)

Experience the complete survey flow with all question types, responsive design, and user interface before setting up your own instance.

## Features

### Survey Structure
- **6-page survey flow**: Intro → Demographics → Delivery & Flow → Quality & Safety → Team Dynamics & Well-being → Additional Feedback
- **Focused question groups**: Delivery & Flow (4 pairs), Quality & Safety (5 pairs), and Team Dynamics & Well-being (4 pairs) of satisfaction/importance question pairs
- **Progress tracking**: Visual progress bar and step indicators
- **Validation**: Requires all questions to be answered before proceeding

### Question Types
- **Demographics**: Location, technology areas
- **Likert scale pairs**: Satisfaction vs. Importance ratings (1-5 scale)
- **Open-ended feedback**: Qualitative questions with character counters

### User Experience
- **Modern pill-button interface**: Responsive buttons with proper touch targets
- **Multi-line text support**: Long labels automatically wrap for readability
- **Character limits**: 280-character limit with live counters on feedback questions (adjust `CHAR_LIMIT` in `src/ui/SurveyPage.tsx` if you need a different size)
- **Responsive design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Proper ARIA labels, fieldsets, and keyboard navigation

### Data & Privacy
- **Anonymous collection**: No personal identifiers required
- **Local-first**: Answers saved in localStorage until submission
- **Progress preservation**: Users can return to complete the survey later
- **Secure submission**: Results submitted to configurable backend endpoint

## Survey Content

The survey covers 13 key areas of developer experience:

**Delivery & Flow** (4 questions):
- Delivery speed and predictability
- Build/test cycle efficiency  
- Development tool reliability
- Deployment autonomy

**Quality & Safety** (5 questions):
- Code review processes
- Incident response capabilities
- Security/compliance workflows
- Codebase clarity and architecture
- Test environment stability

**Team Dynamics & Well-being** (4 questions):
- Day-to-day work satisfaction
- Engineer onboarding effectiveness
- Meeting and handoff efficiency
- Sustainable development pace

## Getting Started

### Try the Demo First
Before setting up your own instance, check out the [live demo](http://devxsurvey.surge.sh/survey/0) to see the complete survey experience.

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

### Development Commands
```sh
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run test     # Run tests (if configured)
npm run preview  # Preview production build
```

## Backend Integration

To collect survey results, you must provide an API endpoint that accepts survey submissions. By default, the app POSTs survey data to `/api/devex-survey`.

> **Changing the endpoint** – Edit the relative path inside [`src/api/submitSurvey.ts`](src/api/submitSurvey.ts) or replace it with your own absolute URL.

### API Contract
The endpoint should accept a JSON payload matching the structure in `src/api/submitSurvey.ts`:

```typescript
{
  // Demographics
  "location": "string",
  "tech": ["string"],
  
  // Likert scale responses (1-5)
  "delivery_speed_impact": 4,
  "delivery_speed_satisfaction": 3,
  "build_test_impact": 5,
  "build_test_satisfaction": 2,
  // ... (26 total Likert questions)
  
  // Open-ended feedback
  "q_biggest_friction": "string",
  "q_best_change": "string"
}
```

### Response Requirements
- Respond with a **2xx status code** on successful submission
- Optionally return a confirmation message or survey ID
- Handle validation errors with appropriate error responses

You can implement this endpoint in any backend framework (Express.js, FastAPI, serverless functions, etc.).

## Customization

### Questions & Content
- **Questions**: Edit `src/const/questions.ts` to modify survey questions
- **Themes**: Update question groupings in `src/utils/questionPairs.ts`
- **Copy**: Adjust titles and descriptions in survey components

### Styling & UI
- **Design system**: Modify CSS variables in `src/index.css`
- **Responsive breakpoints**: Adjust media queries for different screen sizes
- **Color scheme**: Update accent colors and gradients

### Survey Flow
- **Page structure**: Modify routing logic in `src/ui/SurveyPage.tsx`
- **Validation**: Customize completion requirements in `src/utils/surveyProgress.ts`
- **Storage**: Adjust localStorage behavior in `src/hooks/useSurvey.ts`
- **Character limit**: Update `CHAR_LIMIT` constant in `src/ui/SurveyPage.tsx`

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with CSS Grid and Flexbox
- **Routing**: React Router v7
- **State Management**: React hooks + localStorage
- **Code Quality**: ESLint + TypeScript strict mode
- **Testing**: Vitest (configured)

## License

MIT - Feel free to use this in your organization or contribute improvements back to the community.
