# 🎬 AdForge AI

**AI-Powered Video Ad Generation Platform**

Transform product URLs into high-converting video ads in minutes using AI avatars, scripts, and templates.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- OpenAI API key

### Installation

```bash
# Clone and install
npm install

# Setup environment
cp .env.example .env.local
# Add your API keys to .env.local

# Run development server
npm run dev
```

Visit http://localhost:3001

---

## 📚 Setup Guides (Do These First!)

### 1️⃣ **[Database Setup](./SETUP-DATABASE-FIXED.md)** ⭐ **REQUIRED**
Run this FIRST or sign-ups won't work! Creates:
- Users table with auth trigger
- Credit tracking system
- All core database tables

### 2️⃣ **[OpenAI Setup](./OPENAI-SETUP-GUIDE.md)**
Configure AI script generation

### 3️⃣ **[Google Auth Setup](./GOOGLE-AUTH-SETUP.md)** (Optional)
Enable Google OAuth sign-in

### 📖 Reference Docs
- **[API Improvements](./API-IMPROVEMENTS.md)** - Rate limiting, caching, retry logic
- **[Technical Docs](./.claude/CLAUDE.md)** - Complete architecture & API reference

---

## ✨ Features

### ✅ Fully Implemented

- **URL to Product Data** - Paste any URL, extract product info automatically
- **AI Script Generation** - 12 variations per product (GPT-4o-mini)
  - 4 Categories: Hook-Focused, Problem-Solution, Social Proof, Platform-Optimized
  - Tones: Professional, Casual, Energetic, Educational, Humorous
  - Lengths: Short (15-25s), Medium (25-40s), Long (40-60s)
  - Platforms: TikTok, Instagram, YouTube, Facebook
- **Script Analysis** - Hook strength scoring, engagement prediction, platform optimization scores
- **Authentication** - Email/password + Google OAuth
- **Dashboard** - Projects overview, analytics, credit tracking, performance insights
- **Credit System** - Automatic usage tracking and transaction history
- **Production APIs** - Rate limiting, caching (50x faster), retry logic, validation
- **Beautiful UI** - Modern gradient design with shadcn/ui

### 🚧 In Progress (Mock Data)

- **Video Generation** - Using mock provider (HeyGen/Sora integration pending)
- **Avatar Library** - 1000+ avatars (placeholder data)
- **Voice Library** - 140+ voices (placeholder data)
- **Template Library** - Video templates (placeholder data)

### 🔮 Planned

- **Sora 2 Integration** - Real video generation
- **Shopify Integration** - Auto-sync products
- **Meta/TikTok Ads** - Campaign tracking
- **Stripe Payments** - Subscription tiers
- **A/B Testing** - Video variations testing

---

## 🗄️ Tech Stack

**Frontend**: Next.js 15.5.4, React 19, TypeScript, Tailwind CSS
**UI**: shadcn/ui, Framer Motion, Lucide Icons
**Backend**: Next.js API Routes, Supabase PostgreSQL
**Auth**: Supabase Auth (Email + Google OAuth)
**AI**: OpenAI GPT-4o-mini
**Video**: Mock (HeyGen/Sora ready)

---

## 🎯 Core Workflow

**URL → Video in 5 Steps:**

1. **Paste URL** → Scrapes product data (title, description, price, images)
2. **Generate Scripts** → AI creates 12 variations with analysis
3. **Customize** → Adjust tone/length/platform, regenerate if needed
4. **Configure** → Select avatar, voice, template, aspect ratio
5. **Generate** → Create video and download

**Time**: 3-5 minutes per video

---

## 💳 Pricing Tiers

| Feature | Free | Creator | Pro | Agency |
|---------|------|---------|-----|--------|
| **Price** | $0 | $19/mo | $49/mo | $149/mo |
| **Credits** | 10 | 100 | 200 | 600 |
| **Videos** | 2/mo | 20/mo | 40/mo | 120/mo |
| **Quality** | 720p | 1080p | 1080p | 4K |

---

## 🔑 Environment Variables

Create `.env.local` with:

```bash
# Supabase (https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (https://platform.openai.com)
OPENAI_API_KEY=your_openai_key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Video Provider (when available)
HEYGEN_API_KEY=your_heygen_key

# Stripe (when ready)
STRIPE_SECRET_KEY=your_stripe_secret
```

---

## 📁 Project Structure

```
adforge-ai/
├── app/
│   ├── (marketing)/              # Landing page
│   ├── (auth)/                   # Sign in/up
│   ├── (dashboard)/
│   │   ├── dashboard/            # Main dashboard
│   │   │   ├── page.tsx          # Overview with metrics
│   │   │   ├── new-project/      # URL → Video workflow
│   │   │   ├── projects/         # Project management
│   │   │   ├── analytics/        # Performance tracking
│   │   │   └── settings/         # User settings
│   └── api/
│       ├── scrape-url/           # Product scraper
│       ├── generate-scripts/     # AI scripts
│       ├── generate-video/       # Video generation
│       └── video-status/[id]/    # Status checking
├── components/
│   ├── ui/                       # shadcn components
│   ├── project-creation/         # Video creation flow
│   └── dashboard/                # Dashboard components
├── lib/
│   ├── supabase/                 # Database client
│   ├── auth/                     # Auth context
│   ├── ai/                       # Script generation
│   ├── api/                      # Middleware (rate limiting, caching)
│   ├── url-scraper/              # Product scraper
│   └── video-generation/         # Video providers
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema_safe.sql    # Core tables + triggers
│       └── 002_analytics_integrations.sql # Campaign tracking
└── .claude/
    └── CLAUDE.md                 # Complete technical docs
```

---

## 🐛 Troubleshooting

### Users not appearing in database?
→ **Run the database migration**: See [SETUP-DATABASE-FIXED.md](./SETUP-DATABASE-FIXED.md)

### Script generation failing?
→ Check OpenAI API key in `.env.local`
→ Verify OpenAI account has credits

### Video generation not working?
→ Expected - using mock provider currently
→ Real integration coming soon

### Can't sign in with Google?
→ Follow: [GOOGLE-AUTH-SETUP.md](./GOOGLE-AUTH-SETUP.md)

---

## 🚀 Production Checklist

- [x] Database schema with auto-triggers
- [x] User authentication (email + Google)
- [x] Credit tracking system
- [x] URL scraping & product extraction
- [x] AI script generation (12 variations)
- [x] Production APIs (rate limiting, caching, retries)
- [x] Dashboard with analytics UI
- [x] Beautiful UI/UX
- [ ] Real avatar library
- [ ] Real voice synthesis
- [ ] Video generation (HeyGen/Sora)
- [ ] Stripe integration
- [ ] Shopify/Meta/TikTok integrations
- [ ] Email notifications
- [ ] Deployment

---

## 🎉 Current Status

**Core Platform**: ✅ Production-ready for URL scraping and AI script generation
**Video Generation**: 🚧 Mock provider (integration pending)
**Analytics Dashboard**: ✅ Complete UI, integrations ready
**API Infrastructure**: ✅ Production-grade with rate limiting, caching, and retry logic

---

## 📖 Key Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | This file - quick start guide |
| `.claude/CLAUDE.md` | Complete technical documentation |
| `SETUP-DATABASE-FIXED.md` | **REQUIRED** - Database setup |
| `API-IMPROVEMENTS.md` | Production API features reference |
| `OPENAI-SETUP-GUIDE.md` | OpenAI configuration |
| `GOOGLE-AUTH-SETUP.md` | Google OAuth setup |

---

Built with ❤️ using Next.js, Supabase, and OpenAI
