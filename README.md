# Developer Experience Survey

A modern survey application built with Next.js 15, PostgreSQL, and Prisma for collecting developer experience feedback.

## 🚀 Features

- **Next.js 15** with App Router for optimal performance
- **PostgreSQL** database with Prisma ORM for type-safe operations
- **Anonymous responses** with session tracking
- **Draft saving** for incomplete surveys
- **Real-time validation** with Zod schemas
- **Responsive design** with custom CSS
- **Type-safe** throughout with TypeScript

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod
- **Styling**: Custom CSS (responsive)
- **Development**: ESLint, Prettier, tsx

## 🏗️ Project Structure

```
├── app/                          # Next.js App Router
│   ├── (survey)/                 # Survey route group
│   │   ├── layout.tsx            # Survey layout
│   │   ├── survey/
│   │   │   ├── intro/page.tsx    # Survey intro
│   │   │   └── [page]/page.tsx   # Dynamic survey pages
│   │   └── finish/page.tsx       # Completion page
│   ├── api/survey/route.ts       # Survey API endpoint
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── page.tsx                  # Home page
├── lib/                          # Business logic
│   ├── database/prisma.ts        # Prisma client config
│   ├── services/surveyService.ts # API service layer
│   ├── validations/survey.ts     # Zod schemas
│   ├── hooks/useSurvey.ts        # Survey state management
│   ├── types/survey.ts           # TypeScript types
│   ├── const/questions.ts        # Survey questions
│   └── utils/                    # Utility functions
├── components/                   # React components
├── prisma/
│   └── schema.prisma            # Database schema
└── scripts/
    └── seed.ts                  # Database seeding
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- PostgreSQL 12 or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devx-survey
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   
   See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.

   Quick setup:
   ```bash
   # Create database
   createdb devx_survey
   
   # Create .env file
   cp .env.example .env
   # Update DATABASE_URL in .env
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   npm run db:seed  # Optional: Add sample data
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Database Schema

The survey uses a single `survey_responses` table with:

- **Identity**: id, sessionId, timestamps
- **Demographics**: location, tech  
- **Likert responses**: All survey questions (1-5 scale)
- **Text feedback**: biggestFriction, bestChange
- **Status**: isDraft, isComplete

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🌐 API Endpoints

### POST /api/survey
Submit survey response or save draft

**Body:**
```json
{
  "location": "San Francisco, CA",
  "tech": "Frontend Development", 
  "dayToDayImpact": 4,
  "dayToDaySatisfaction": 3,
  // ... other survey fields
  "sessionId": "optional-session-id",
  "isDraft": false
}
```

### GET /api/survey?sessionId=xxx
Retrieve draft by session ID

## 🛡️ Data Privacy

- All responses are **anonymous**
- Session IDs used only for draft recovery
- No personal identifying information collected
- Responses aggregated for insights

## 🚀 Deployment

1. **Environment variables**
   ```bash
   DATABASE_URL="your-production-db-url"
   NEXTAUTH_SECRET="your-secret-key"
   ```

2. **Deploy database**
   ```bash
   npm run db:deploy
   ```

3. **Build and deploy**
   ```bash
   npm run build
   npm run start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes  
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.
