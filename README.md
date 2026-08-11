<!-- ══════════════════════════════════════════════════════════════════ -->
<!--                     NASHID K  —  AXIOM E-LEARNING                  -->
<!-- ══════════════════════════════════════════════════════════════════ -->

# 🚀 Axiom — AI-Powered Learning Operating System

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.x-black?style=flat-square&logo=nextdotjs" alt="Next.js" />
  &nbsp;
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  &nbsp;
  <img src="https://img.shields.io/badge/MongoDB-7.x-green?style=flat-square&logo=mongodb" alt="MongoDB" />
  &nbsp;
  <img src="https://img.shields.io/badge/Redis-Upstash-red?style=flat-square&logo=redis" alt="Redis" />
  &nbsp;
  <img src="https://img.shields.io/badge/AI-Gemini%20Pro-purple?style=flat-square" alt="Gemini AI" />
</p>

<p align="center">
  <strong>A next-generation e-learning platform that autonomously generates full-stack curricula, tracks user progress, and provides context-aware mentorship via AI personas.</strong>
</p>

---

## 📌 Project Overview
Axiom transforms learning by shifting from static courses to **dynamic, AI-orchestrated curricula**. Users enter any topic, and the engine generates a structured syllabus complete with theory files, coding challenges, and mock project scopes, backed by active AI coaching.

### ✨ Core Capabilities
*   **Autonomous Syllabus Engine:** Generates customized learning paths (Theory, Practice, Projects) for any topic.
*   **Sensei AI Coach:** Context-aware assistant that understands your current module, reads your workspace code, and offers intelligent debugging guidance.
*   **Caching & Optimization:** Utilizes Upstash Redis cache to speed up API responses for frequently generated tracks by 30%.
*   **Type-Safe Architecture:** Built with strict TypeScript validations from frontend user components to Mongoose database layers.

---

## 📂 System Architecture

```text
src/
├── app/          # Next.js App Router (RSC, layouts, and pages)
├── components/   # Modular UI elements (curriculum cards, chat panels)
├── lib/          # Utilities (Redis config, Gemini model initializers)
├── models/       # Mongoose Schemas (User, Track, Session)
└── types/        # TypeScript interfaces
```

---

## ⚙️ Local Development Setup

### Prerequisites
*   Node.js v20.x+
*   MongoDB Instance (Atlas or Local)
*   Gemini API Key (Google AI Studio)

### Installation Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Nashid-k/axiom-e-learning.git
   cd axiom-e-learning
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Variables:**
   Copy the `.env.example` file and configure:
   ```env
   MONGODB_URI=your_mongodb_connection
   GEMINI_API_KEY=your_gemini_api_key
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```
4. **Run Dev Server:**
   ```bash
   npm run dev
   ```
