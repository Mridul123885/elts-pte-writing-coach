# IELTS & PTE AI Writing Coach

A production-quality AI writing assessment app for IELTS and PTE students, built by **Mridul**.

Write your answer → get an AI examiner's assessment → understand every mistake → track your progress over time.

## Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Mobile:** Capacitor (Android / iOS)
- **Backend:** Supabase Edge Functions (TypeScript)
- **Database / Auth:** Supabase (PostgreSQL, Row Level Security)
- **AI:** OpenAI API (server-side only, never exposed to the client)

See `docs/ARCHITECTURE.md` for the full system design and `docs/DATABASE.md` for the schema.

## Getting started

```bash
npm install
cp .env.example .env
# fill in .env with your own Supabase project + AI keys
npm run dev
```

## Project structure

```
apps/web/            React + Vite + Capacitor app
supabase/functions/  Edge Functions (the AI backend)
supabase/migrations/ SQL schema migrations
docs/                Project documentation
```

## Environment variables

See `.env.example`. Never commit a real `.env` file — it's already covered by `.gitignore`.

## Development principle

This project is built incrementally: one feature at a time, tested and committed before moving on. See `docs/PROJECT_SPEC.md` for the full specification and roadmap.

## Disclaimer

Scores produced by this app are AI-generated estimates for practice purposes only and are not official IELTS or PTE results.
