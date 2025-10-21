# AdForge AI - Project Documentation

## 🎯 Project Vision

**AdForge AI** is a production-ready AI video ad generation platform that competes with Creatify. It allows users to paste product URLs and automatically generate multiple video ad variations using AI avatars, scripts, and templates.

### Key Differentiators
- **URL-to-Video Pipeline**: Instant product analysis and video generation
- **1000+ AI Avatars**: Diverse, realistic avatars for every brand
- **AI Script Generation**: GPT-4 powered script variations
- **Multi-Platform Export**: Optimized for TikTok, Instagram, YouTube, etc.
- **Sora 2 Ready**: Architecture prepared for Sora 2 API integration

## 🛠 Tech Stack

### Core Framework
- **Next.js 15.5.4**: App Router, Server Components, Server Actions
- **TypeScript 5.9+**: Strict mode enabled
- **React 19.2.0**: Latest React with concurrent features
- **Tailwind CSS 4.1+**: Utility-first styling with custom gradients

### UI Components
- **shadcn/ui**: Radix UI primitives with Tailwind styling
- **Framer Motion 12+**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications

### Backend & Database
- **Supabase**: PostgreSQL database, authentication, realtime
- **Supabase Auth**: User authentication and session management

### Forms & Validation
- **React Hook Form 7.65+**: Performant form management
- **Zod 4.1+**: Type-safe schema validation
- **@hookform/resolvers**: Bridge between RHF and Zod

### AI & Processing
- **OpenAI GPT-4**: Script generation
- **Axios**: HTTP client for URL scraping
- **Cheerio**: HTML parsing for product data extraction

### Video Generation
- **HeyGen API**: Temporary avatar video generation
- **Sora 2 API**: Future integration (prepared)
- **Mock Provider**: Development testing

### Payments
- **Stripe**: Subscriptions, payments, billing

### Additional Tools
- **date-fns**: Date formatting and manipulation
- **react-player**: Video preview and playback
- **class-variance-authority**: Component variant management
- **tailwind-merge**: Intelligent Tailwind class merging

## 📁 Project Structure

\`\`\`
adforge-ai/
├── .claude/
│   └── CLAUDE.md                 # This file
├── app/
│   ├── (marketing)/              # Public marketing pages
│   │   ├── page.tsx              # Landing page
│   │   ├── pricing/
│   │   ├── features/
│   │   └── layout.tsx
│   ├── (auth)/                   # Authentication pages
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── layout.tsx
│   ├── (dashboard)/              # Protected dashboard
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Dashboard home
│   │   │   ├── new-project/      # Main feature: URL→Video
│   │   │   ├── projects/
│   │   │   ├── avatars/
│   │   │   ├── voices/
│   │   │   ├── templates/
│   │   │   └── settings/
│   │   └── layout.tsx
│   ├── api/                      # API routes
│   │   ├── scrape-url/
│   │   ├── generate-scripts/
│   │   ├── generate-video/
│   │   ├── video-status/[id]/
│   │   └── webhooks/stripe/
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn components
│   ├── marketing/                # Marketing components
│   ├── dashboard/                # Dashboard components
│   ├── project-creation/         # Project creation flow
│   ├── video-editor/             # Video editing components
│   └── shared/                   # Shared components
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── url-scraper/
│   │   ├── scraper.ts
│   │   └── product-analyzer.ts
│   ├── ai/
│   │   ├── script-generator.ts
│   │   └── prompt-builder.ts
│   ├── video-generation/
│   │   ├── abstract-provider.ts
│   │   ├── sora-provider.ts
│   │   ├── heygen-provider.ts
│   │   └── mock-provider.ts
│   ├── stripe/
│   │   └── client.ts
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
├── types/
│   └── index.ts                  # All TypeScript types
├── hooks/
│   ├── use-credits.ts
│   ├── use-projects.ts
│   ├── use-avatars.ts
│   └── use-voices.ts
├── data/
│   ├── avatars.ts
│   ├── voices.ts
│   ├── templates.ts
│   └── script-templates.ts
├── public/
│   ├── logos/
│   ├── videos/
│   └── audio/
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
\`\`\`

## 🗄 Database Schema

### users
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  credits INTEGER DEFAULT 10,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'creator', 'pro', 'agency')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### projects
\`\`\`sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'failed')),
  product_url TEXT,
  product_data JSONB,
  scripts JSONB DEFAULT '[]'::jsonb,
  selected_script TEXT,
  avatar_id TEXT,
  voice_id TEXT,
  template_id TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  aspect_ratio TEXT DEFAULT '9:16' CHECK (aspect_ratio IN ('9:16', '16:9', '1:1', '4:5')),
  quality TEXT DEFAULT '1080p',
  credits_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
\`\`\`

### avatars
\`\`\`sql
CREATE TABLE avatars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  gender TEXT,
  age_range TEXT,
  ethnicity TEXT,
  style TEXT,
  thumbnail_url TEXT,
  preview_url TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'premium')),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### voices
\`\`\`sql
CREATE TABLE voices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  language TEXT NOT NULL,
  accent TEXT,
  gender TEXT,
  age TEXT,
  style TEXT,
  preview_url TEXT,
  provider TEXT,
  provider_voice_id TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'premium')),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### templates
\`\`\`sql
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  thumbnail_url TEXT,
  preview_url TEXT,
  style TEXT,
  platforms JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## 🔌 API Endpoints

### POST /api/scrape-url
Scrapes product URL and extracts product data

**Request:**
\`\`\`json
{ "url": "https://amazon.com/product/..." }
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "title": "Product Name",
    "description": "...",
    "price": "$29.99",
    "images": ["url1", "url2"],
    "features": ["feature1", "feature2"]
  }
}
\`\`\`

### POST /api/generate-scripts
Generates AI-powered script variations

**Request:**
\`\`\`json
{
  "productData": { ... },
  "count": 5,
  "platform": "tiktok"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "scripts": [
      {
        "id": "script-1",
        "text": "...",
        "style": "problem-solution",
        "estimated_duration": 30
      }
    ]
  }
}
\`\`\`

### POST /api/generate-video
Initiates video generation

**Request:**
\`\`\`json
{
  "project_id": "uuid",
  "script": "...",
  "avatar_id": "avatar-001",
  "voice_id": "voice-001",
  "template_id": "template-001",
  "aspect_ratio": "9:16"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "job_id": "job-123",
    "status": "queued",
    "estimated_time": 120
  }
}
\`\`\`

### GET /api/video-status/[id]
Checks video generation status

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "job_id": "job-123",
    "status": "processing",
    "progress": 65,
    "current_stage": "Rendering avatar",
    "stages": [...]
  }
}
\`\`\`

## 💳 Pricing Tiers

| Feature | Free | Creator | Pro | Agency |
|---------|------|---------|-----|--------|
| **Price** | $0 | $19/mo | $49/mo | $149/mo |
| **Credits/month** | 10 | 100 | 200 | 600 |
| **Videos/month** | 2 | 20 | 40 | 120 |
| **Avatars** | 100 | 1000+ | 1000+ | 1000+ |
| **Voices** | 20 | 100+ | 140+ | 140+ |
| **Quality** | 720p | 1080p | 1080p | 4K |
| **Watermark** | Yes | No | No | No |
| **Batch Mode** | ❌ | ❌ | ✅ | ✅ |
| **API Access** | ❌ | ❌ | Basic | Full |
| **Team Seats** | 1 | 1 | 1 | 5 |

## 🎨 Design System

### Colors
- **Primary**: Violet (#8B5CF6) - Used for CTAs, links, focus states
- **Secondary**: Blue - Supporting color
- **Accent**: Pink - Highlights and accents
- **Gradients**: violet → purple → pink

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, 2rem - 4rem
- **Body**: Regular, 1rem
- **Small**: 0.875rem

### Components
- **Radius**: 0.5rem (medium rounded corners)
- **Shadows**: Subtle, lifted effects
- **Animations**: 200ms transitions, smooth fades
- **Spacing**: 8px base unit

## 🔄 Core Workflows

### URL to Video Flow

1. **URL Input** (`/dashboard/new-project`)
   - User pastes product URL
   - Frontend validates URL format
   - Submits to `/api/scrape-url`

2. **Product Analysis**
   - Backend scrapes webpage
   - Extracts: title, description, price, images, features
   - Uses OpenGraph, JSON-LD, HTML parsing
   - Stores in `projects.product_data`

3. **Script Generation**
   - Calls `/api/generate-scripts`
   - GPT-4 generates 5-10 variations
   - Different styles: problem-solution, testimonial, demo, etc.
   - User selects preferred script

4. **Customization**
   - User selects:
     - Avatar (from library)
     - Voice (from library)
     - Template (from library)
     - Aspect ratio (9:16, 16:9, 1:1, 4:5)
     - Duration (15s - 120s)
     - Quality (720p, 1080p, 4K)

5. **Video Generation**
   - Calls `/api/generate-video`
   - Deducts credits upfront
   - Creates background job
   - Video provider (HeyGen/Sora) generates video
   - Stages: script analysis → avatar rendering → voiceover → effects → finalizing

6. **Completion**
   - Webhook updates project status
   - Video URL stored in database
   - User notified (in-app/email)
   - Video ready for download/share

## 🚀 Development

### Getting Started

1. **Clone and Install**
\`\`\`bash
git clone <repo>
cd adforge-ai
npm install
\`\`\`

2. **Environment Setup**
\`\`\`bash
cp .env.example .env.local
# Fill in your API keys
\`\`\`

3. **Supabase Setup**
   - Create project at supabase.com
   - Run SQL from "Database Schema" section
   - Copy URL and keys to `.env.local`

4. **Run Development Server**
\`\`\`bash
npm run dev
# Open http://localhost:3000
\`\`\`

### Code Style

- **Server Components by default**, client components only when needed
- **Server Actions for mutations**
- **All forms use React Hook Form + Zod**
- **All API routes return `ApiResponse<T>` format**
- **All errors handled gracefully with user-friendly messages**
- **All images use Next.js `Image` component**
- **All links use Next.js `Link` component**

### File Naming
- **Components**: PascalCase (`AvatarPicker.tsx`)
- **Utilities**: camelCase (`generateScripts.ts`)
- **Types**: PascalCase interfaces (`User`, `Project`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_CREDITS`)

## 🧪 Testing Strategy

### Unit Tests
- Utility functions (`lib/utils.ts`)
- Validation schemas (`lib/validations.ts`)
- URL scraper logic

### Integration Tests
- API routes
- Database operations
- Video generation flow

### E2E Tests (Playwright)
- Complete URL→Video flow
- Authentication flow
- Payment flow

## 📦 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Import project to Vercel
   - Auto-detects Next.js

2. **Environment Variables**
   - Add all from `.env.example`
   - Use Vercel's secret management

3. **Database**
   - Supabase hosted (no additional setup)

4. **Deploy**
\`\`\`bash
vercel --prod
\`\`\`

### Production Checklist
- [ ] All environment variables set
- [ ] Supabase project created and configured
- [ ] Stripe products and prices created
- [ ] OpenAI API key with sufficient credits
- [ ] HeyGen API key configured
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking enabled
- [ ] Error monitoring (Sentry) configured

## 🔮 Sora 2 Integration Plan

### Current State
- Abstract `VideoProvider` interface defined
- `sora-provider.ts` file created with comments
- All video generation goes through provider abstraction

### When Sora 2 API Available

1. **Implement SoraProvider**
\`\`\`typescript
// lib/video-generation/sora-provider.ts
export class SoraProvider implements VideoProvider {
  async generateVideo(config: VideoConfig): Promise<VideoJob> {
    // Call Sora 2 API with prompt
    // Return job ID
  }

  async checkStatus(jobId: string): Promise<VideoStatus> {
    // Poll Sora 2 API for status
  }

  async getVideo(jobId: string): Promise<VideoResult> {
    // Fetch completed video
  }
}
\`\`\`

2. **Update Provider Selection**
\`\`\`typescript
// lib/video-generation/index.ts
const provider = process.env.VIDEO_PROVIDER === 'sora'
  ? new SoraProvider()
  : new HeyGenProvider();
\`\`\`

3. **No UI Changes Required**
   - All UI components use abstract provider
   - Seamless transition

## 📊 Analytics Events

### User Actions
- `user_signed_up`
- `user_signed_in`
- `project_created`
- `url_scraped`
- `scripts_generated`
- `video_generation_started`
- `video_completed`
- `video_downloaded`
- `subscription_upgraded`

### Track with
\`\`\`typescript
analytics.track('video_generation_started', {
  project_id,
  avatar_id,
  voice_id,
  template_id,
  aspect_ratio,
});
\`\`\`

## 🐛 Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
- Check `.env.local` has all Supabase keys
- Verify keys are correct in Supabase dashboard

**"OpenAI API rate limit"**
- Check API key has sufficient quota
- Implement exponential backoff

**"Video generation failed"**
- Check HeyGen API key
- Verify credits available
- Check provider status

**"Build fails with TypeScript errors"**
- Run `npm run type-check`
- Fix any type errors
- Ensure `strict: true` in tsconfig.json

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Stripe Documentation](https://stripe.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## 🎯 Next Development Priorities

1. **Complete core shadcn/ui component installation**
2. **Build stunning landing page**
3. **Implement URL scraping logic**
4. **Integrate OpenAI for script generation**
5. **Build project creation flow (main feature)**
6. **Implement HeyGen video generation**
7. **Create dashboard and project management**
8. **Integrate Stripe payments**
9. **Add analytics tracking**
10. **Prepare Sora 2 integration**

---

**Built with ❤️ by the AdForge AI team**
