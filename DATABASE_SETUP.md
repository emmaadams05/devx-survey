# Database Setup Guide

## PostgreSQL Setup

### 1. Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

### 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE devx_survey;
CREATE USER survey_user WITH ENCRYPTED PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE devx_survey TO survey_user;

# Exit
\q
```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://survey_user:your_password_here@localhost:5432/devx_survey?schema=public"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 4. Run Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Create and run migration
npx prisma migrate dev --name init

# Optional: View database in Prisma Studio
npx prisma studio
```

### 5. Development Workflow

**Reset database:**
```bash
npx prisma migrate reset
```

**Apply new migrations:**
```bash
npx prisma migrate dev
```

**Deploy to production:**
```bash
npx prisma migrate deploy
```

## Database Schema

The survey uses a single `survey_responses` table with:

- **Primary fields**: id, sessionId, timestamps
- **Demographics**: location, tech
- **Likert scale responses**: All survey questions (1-5 scale)
- **Text feedback**: biggestFriction, bestChange
- **Status**: isDraft, isComplete

## Features

✅ **Anonymous responses** with session tracking
✅ **Draft saving** for incomplete surveys  
✅ **Data validation** with Zod schemas
✅ **Type safety** with Prisma client
✅ **Connection pooling** for Next.js
✅ **Upsert operations** for drafts 