<p align="center">
  <img src="public/favicon.svg" alt="Axiom Logo" width="80" height="80" />
</p>

<h1 align="center">Axiom — AI-Powered E-Learning Platform</h1>

<p align="center">
  A next-generation learning operating system that autonomously generates full-stack curricula, tracks granular progress, and provides intelligent mentorship through AI personas.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-environment-variables">Environment Variables</a> •
  <a href="#-running-tests">Running Tests</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-license">License</a>
</p>

---

## ✨ Features

| Category | Description |
|---|---|
| **Autonomous Curriculum Engine** | 15+ pre-built, deeply structured curricula covering HTML, CSS, JavaScript, TypeScript, React, Node.js, MongoDB, SQL, DSA, Git, Interview Prep, and more. Each curriculum is broken into phases (Theory → Practice → Projects). |
| **AI Mentorship (Sensei)** | Context-aware AI assistant powered by Groq with multi-key rotation for high availability. Understands your current learning phase, code context, and struggle points. Multiple persona modes for different mentorship styles. |
| **Neural Flashcards** | Spaced repetition system powered by AI to ensure long-term retention of concepts, with a weakness detection engine that identifies knowledge gaps. |
| **Live Code Editor** | Integrated Monaco Editor for in-browser coding practice with syntax highlighting, multi-tab support, and live preview. |
| **Deep Progress Tracking** | Granular progress tracking per topic, phase, and concept — persisted across sessions with MongoDB. |
| **Resource Discovery** | Integrated YouTube & Google Search APIs for curated supplementary learning resources alongside each topic. |
| **Leaderboard & Social** | Gamified learning with user rankings and social features to encourage community engagement. |
| **Cinematic UI** | Immersive, premium design system with fluid Framer Motion animations, dark mode, glassmorphism, and a Bento-grid dashboard. 21 reusable UI components. |
| **Authentication** | Secure Google OAuth via NextAuth.js v5 (Auth.js) with MongoDB adapter for session persistence. |
| **SEO Optimized** | Programmatic `robots.ts`, `sitemap.ts`, and semantic meta tags for search engine discoverability. |
| **Security Hardened** | Custom security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`) and Zod-validated API payloads. |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, React Server Components) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) |
| **Database** | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) (schema validation + indexing) |
| **Caching** | [Upstash Redis](https://upstash.com/) (rate limiting) |
| **Authentication** | [NextAuth.js v5](https://authjs.dev/) (Google OAuth, MongoDB Adapter) |
| **AI / LLM** | [Groq SDK](https://groq.com/) (multi-key rotation pool for rate limit resilience) |
| **Code Editor** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) (via `@monaco-editor/react`) |
| **Validation** | [Zod](https://zod.dev/) (runtime API payload validation) |
| **State Management** | [TanStack React Query](https://tanstack.com/query) |
| **Testing** | [Jest 30](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) |
| **Deployment** | [Vercel](https://vercel.com/) (serverless / edge) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights) |
| **Bundle Analysis** | [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                           │
│   React 19 + Framer Motion + TailwindCSS + Monaco Editor            │
│   ┌──────────┐  ┌──────────────┐  ┌─────────────┐  ┌────────────┐  │
│   │ Landing   │  │ Curriculum   │  │ Learning    │  │ AI Chat    │  │
│   │ Page      │  │ Browser      │  │ Dashboard   │  │ (Sensei)   │  │
│   └──────────┘  └──────────────┘  └─────────────┘  └────────────┘  │
└───────────────────────────┬──────────────────────────────────────────┘
                            │  HTTPS / Fetch
┌───────────────────────────▼──────────────────────────────────────────┐
│                     NEXT.JS API ROUTES (/api)                        │
│  ┌────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ ┌──────────────┐   │
│  │ /auth  │ │ /ai      │ │/progress │ │/topics │ │ /resources   │   │
│  │ /chat  │ │ /agent   │ │ /search  │ │/social │ │ /user        │   │
│  └────────┘ └──────────┘ └──────────┘ └────────┘ └──────────────┘   │
│                     Zod Validation · Rate Limiting                    │
└────────┬──────────────────────┬──────────────────────┬───────────────┘
         │                      │                      │
    ┌────▼────┐           ┌─────▼─────┐         ┌─────▼──────┐
    │ MongoDB │           │ Groq AI   │         │ Google APIs│
    │(Mongoose)│          │(10-key    │         │ (Search,   │
    │         │           │ rotation) │         │  YouTube)  │
    └─────────┘           └───────────┘         └────────────┘
```

### Key Design Principles

- **Feature-Based Architecture**: Code is organized by domain (`features/ai`, `features/curriculum`, `features/learning`, `features/search`) rather than by technical role, promoting cohesion.
- **Server Components First**: Leverages Next.js 16 RSC for faster initial loads; client components are used only when interactivity is required (`"use client"`).
- **AI Resilience**: A pool of 10 Groq API keys rotated sequentially ensures the platform stays responsive under heavy AI workloads.
- **Schema-Driven Data**: All MongoDB models use strict Mongoose schemas with validation and indexing for data integrity and query performance.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or Bun)
- **MongoDB** instance (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- **Groq API Key** ([console.groq.com](https://console.groq.com/))
- **Google OAuth Credentials** ([console.cloud.google.com](https://console.cloud.google.com/))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nashid-k/axiom-e-learning.git
cd axiom-e-learning

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your actual keys (see Environment Variables section below)

# 4. Start development server
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## 📁 Project Structure

```
axiom-e-learning/
├── public/                     # Static assets (icons, avatars, manifest)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Authentication pages (sign-in)
│   │   ├── (marketing)/        # Landing / marketing pages
│   │   ├── (platform)/         # Core platform pages
│   │   │   ├── learn/          # Learning dashboard
│   │   │   ├── paths/          # Curriculum browser
│   │   │   ├── leaderboard/    # User rankings
│   │   │   └── vitals/         # Performance vitals
│   │   ├── api/                # API routes (11 route groups)
│   │   │   ├── ai/             # AI generation endpoints
│   │   │   ├── auth/           # NextAuth handler
│   │   │   ├── chat/           # Chat/conversation API
│   │   │   ├── progress/       # Progress tracking CRUD
│   │   │   ├── resources/      # Resource discovery
│   │   │   ├── search/         # Search API
│   │   │   ├── social/         # Social features
│   │   │   ├── topics/         # Topic management
│   │   │   ├── user/           # User profile
│   │   │   └── vitals/         # Web vitals reporting
│   │   ├── globals.css         # Global styles & Tailwind directives
│   │   ├── layout.tsx          # Root layout (providers, metadata)
│   │   ├── robots.ts           # SEO: robots.txt generation
│   │   └── sitemap.ts          # SEO: sitemap.xml generation
│   ├── components/
│   │   ├── ui/                 # 21 reusable UI components
│   │   └── monitoring/         # Performance monitoring
│   ├── data/                   # 15+ curriculum data files
│   │   ├── js-curriculum.ts    # JavaScript (61 KB)
│   │   ├── react-curriculum.ts # React (41 KB)
│   │   ├── dsa-curriculum.ts   # DSA (54 KB)
│   │   ├── ts-curriculum.ts    # TypeScript (30 KB)
│   │   └── ...                 # CSS, HTML, Git, SQL, MongoDB, etc.
│   ├── features/               # Feature modules
│   │   ├── ai/                 # AI service, prompts, personas, context
│   │   ├── auth/               # Auth components
│   │   ├── curriculum/         # Curriculum registry, context, constants
│   │   ├── landing/            # Landing page components
│   │   ├── learning/           # Learning engine, progress, spaced rep
│   │   └── search/             # Search functionality
│   ├── lib/                    # Core library code
│   │   ├── db/                 # MongoDB connection, models, Redis client
│   │   ├── auth.ts             # NextAuth configuration
│   │   ├── config/             # App configuration
│   │   ├── middleware/         # API middleware
│   │   ├── providers/          # React context providers
│   │   └── utils/              # Utility functions
│   └── types/                  # TypeScript type definitions
├── .env.example                # Environment variable template
├── .gitignore                  # Git ignore rules
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── jest.config.mjs             # Jest testing configuration
├── vercel.json                 # Vercel deployment settings
├── package.json                # Dependencies & scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Description | Required |
|---|---|---|
| `GOOGLE_SEARCH_API_KEY` | Google Custom Search API key | ✅ |
| `GOOGLE_SEARCH_ENGINE_ID` | Google Programmable Search Engine ID | ✅ |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | ✅ |
| `AUTH_SECRET` | Auth.js encryption secret | ✅ |
| `NEXTAUTH_SECRET` | NextAuth.js session signing secret | ✅ |
| `NEXTAUTH_URL` | Canonical URL of your deployment | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID | ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 2.0 Client Secret | ✅ |
| `GROQ_API_KEY_1` through `GROQ_API_KEY_10` | Groq LLM API keys (rotation pool) | ✅ (min 1) |
| `MONGODB_URI` | MongoDB connection string | ✅ |

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npx jest --watch

# Run with coverage
npx jest --coverage
```

---

## 🚢 Deployment

Axiom is optimized for **Vercel** deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repository directly in the [Vercel Dashboard](https://vercel.com/dashboard) for automatic deployments on push.

**Production Checklist:**
- [ ] Set all environment variables in Vercel project settings
- [ ] Use strong, unique values for `AUTH_SECRET` and `NEXTAUTH_SECRET`
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Enable Vercel Analytics in project settings

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run dev:vitals` | Start dev server with Web Vitals logging |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest test suite |

---

## 📄 License

This project is licensed under the **MIT License**.

---


<br/>

---

<p align="center">
  Built with 💜 by <a href="https://github.com/Nashid-k">Nashid K</a>
</p>
