-- Initial Database Schema for AdForge AI (Safe Version)
-- This creates the core tables needed for the application
-- Safe to run even if some objects already exist

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,

  -- Subscription & Credits
  credits INTEGER DEFAULT 10 NOT NULL,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'creator', 'pro', 'agency')),

  -- Stripe integration
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  subscription_ends_at TIMESTAMP,

  -- Usage tracking
  videos_created INTEGER DEFAULT 0,
  credits_purchased INTEGER DEFAULT 0,

  -- Settings
  onboarding_completed BOOLEAN DEFAULT false,
  preferences JSONB DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

-- Projects table (some columns may already exist)
DO $$
BEGIN
  -- Add any missing columns to projects table if it exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'projects') THEN
    -- Add video_job_id if missing
    IF NOT EXISTS (SELECT FROM pg_attribute WHERE attrelid = 'public.projects'::regclass AND attname = 'video_job_id') THEN
      ALTER TABLE projects ADD COLUMN video_job_id TEXT;
    END IF;

    -- Add error_message if missing
    IF NOT EXISTS (SELECT FROM pg_attribute WHERE attrelid = 'public.projects'::regclass AND attname = 'error_message') THEN
      ALTER TABLE projects ADD COLUMN error_message TEXT;
    END IF;

    -- Add retry_count if missing
    IF NOT EXISTS (SELECT FROM pg_attribute WHERE attrelid = 'public.projects'::regclass AND attname = 'retry_count') THEN
      ALTER TABLE projects ADD COLUMN retry_count INTEGER DEFAULT 0;
    END IF;
  END IF;
END $$;

-- Avatars table
CREATE TABLE IF NOT EXISTS avatars (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'non-binary')),
  age_range TEXT CHECK (age_range IN ('young', 'middle', 'senior')),
  ethnicity TEXT,
  style TEXT CHECK (style IN ('professional', 'casual', 'creative', 'animated')),

  -- Media
  thumbnail_url TEXT NOT NULL,
  preview_url TEXT,

  -- Tier restrictions
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'premium')),

  -- Metadata
  tags JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Voices table
CREATE TABLE IF NOT EXISTS voices (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,

  -- Voice characteristics
  language TEXT NOT NULL DEFAULT 'en-US',
  accent TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'neutral')),
  age TEXT CHECK (age IN ('young', 'middle', 'senior')),
  style TEXT CHECK (style IN ('conversational', 'professional', 'energetic', 'calm', 'authoritative')),

  -- Provider info
  provider TEXT NOT NULL CHECK (provider IN ('elevenlabs', 'openai', 'google', 'azure')),
  provider_voice_id TEXT NOT NULL,

  -- Media
  preview_url TEXT,

  -- Tier restrictions
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'premium')),

  -- Metadata
  tags JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,

  -- Template characteristics
  category TEXT CHECK (category IN ('product', 'testimonial', 'tutorial', 'promo', 'story')),
  style TEXT CHECK (style IN ('minimal', 'bold', 'elegant', 'playful', 'corporate')),

  -- Media
  thumbnail_url TEXT NOT NULL,
  preview_url TEXT,

  -- Platform optimization
  platforms JSONB DEFAULT '["tiktok", "instagram", "youtube", "facebook"]'::jsonb,
  aspect_ratios JSONB DEFAULT '["9:16", "16:9", "1:1"]'::jsonb,

  -- Tier restrictions
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'premium')),

  -- Metadata
  tags JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

-- User Activity Log
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,

  action TEXT NOT NULL CHECK (action IN (
    'signup', 'login', 'video_created', 'video_downloaded', 'script_generated',
    'credits_purchased', 'subscription_upgraded', 'subscription_canceled',
    'project_created', 'project_deleted', 'settings_updated'
  )),

  -- Context
  resource_type TEXT,
  resource_id UUID,

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Credit Transactions
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,

  -- Transaction details
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'refund', 'bonus', 'subscription')),

  -- Reference
  description TEXT NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  stripe_payment_id TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes (with IF NOT EXISTS equivalent)
DO $$
BEGIN
  -- Users indexes
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_users_email') THEN
    CREATE INDEX idx_users_email ON users(email);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_users_stripe_customer') THEN
    CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
  END IF;

  -- Projects indexes
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_projects_user') THEN
    CREATE INDEX idx_projects_user ON projects(user_id);
  END IF;

  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_projects_created') THEN
    CREATE INDEX idx_projects_created ON projects(created_at DESC);
  END IF;

  -- Avatars indexes
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_avatars_tier') THEN
    CREATE INDEX idx_avatars_tier ON avatars(tier, is_active);
  END IF;

  -- Voices indexes
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_voices_tier') THEN
    CREATE INDEX idx_voices_tier ON voices(tier, is_active);
  END IF;

  -- Templates indexes
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_templates_tier') THEN
    CREATE INDEX idx_templates_tier ON templates(tier, is_active);
  END IF;

  -- User activity indexes
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_user_activity_user') THEN
    CREATE INDEX idx_user_activity_user ON user_activity(user_id, created_at DESC);
  END IF;

  -- Credit transactions indexes
  IF NOT EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_credit_transactions_user') THEN
    CREATE INDEX idx_credit_transactions_user ON credit_transactions(user_id, created_at DESC);
  END IF;
END $$;

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view own activity" ON user_activity;
CREATE POLICY "Users can view own activity" ON user_activity
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own transactions" ON credit_transactions;
CREATE POLICY "Users can view own transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Trigger: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to users (drop first if exists)
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ⭐ THE MOST IMPORTANT PART: Auto-create user on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Drop and recreate trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Log user signup
CREATE OR REPLACE FUNCTION log_user_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_activity (user_id, action, metadata)
  VALUES (NEW.id, 'signup', jsonb_build_object('email', NEW.email));

  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_signup ON public.users;
CREATE TRIGGER on_user_signup
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION log_user_signup();

-- Trigger: Track credits usage
CREATE OR REPLACE FUNCTION track_credit_usage()
RETURNS TRIGGER AS $$
BEGIN
  -- When a project is created with credits_used
  IF (TG_OP = 'INSERT' AND NEW.credits_used > 0) THEN
    -- Deduct credits from user
    UPDATE public.users
    SET credits = credits - NEW.credits_used
    WHERE id = NEW.user_id;

    -- Log transaction
    INSERT INTO public.credit_transactions (user_id, amount, balance_after, type, description, project_id)
    SELECT
      NEW.user_id,
      -NEW.credits_used,
      u.credits,
      'usage',
      'Video generation: ' || NEW.name,
      NEW.id
    FROM public.users u
    WHERE u.id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_project_credits_usage ON public.projects;
CREATE TRIGGER on_project_credits_usage
  AFTER INSERT ON public.projects
  FOR EACH ROW EXECUTE FUNCTION track_credit_usage();

-- Function: Add credits (for purchases)
CREATE OR REPLACE FUNCTION add_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_type TEXT DEFAULT 'purchase',
  p_description TEXT DEFAULT 'Credits purchased',
  p_stripe_payment_id TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_new_balance INTEGER;
BEGIN
  -- Add credits to user
  UPDATE public.users
  SET credits = credits + p_amount,
      credits_purchased = credits_purchased + p_amount
  WHERE id = p_user_id
  RETURNING credits INTO v_new_balance;

  -- Log transaction
  INSERT INTO public.credit_transactions (user_id, amount, balance_after, type, description, stripe_payment_id)
  VALUES (p_user_id, p_amount, v_new_balance, p_type, p_description, p_stripe_payment_id);
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Seed some default avatars
INSERT INTO avatars (id, name, gender, age_range, ethnicity, style, thumbnail_url, tier) VALUES
  ('avatar-001', 'Emma - Professional', 'female', 'young', 'caucasian', 'professional', 'https://placehold.co/400x400/8B5CF6/white?text=Avatar+1', 'free'),
  ('avatar-002', 'Marcus - Casual', 'male', 'middle', 'african', 'casual', 'https://placehold.co/400x400/3B82F6/white?text=Avatar+2', 'free'),
  ('avatar-003', 'Sofia - Creative', 'female', 'young', 'hispanic', 'creative', 'https://placehold.co/400x400/EC4899/white?text=Avatar+3', 'free')
ON CONFLICT (id) DO NOTHING;

-- Seed some default voices
INSERT INTO voices (id, name, language, gender, age, style, provider, provider_voice_id, tier) VALUES
  ('voice-001', 'Emily - Conversational', 'en-US', 'female', 'young', 'conversational', 'elevenlabs', 'emily_voice_id', 'free'),
  ('voice-002', 'David - Professional', 'en-US', 'male', 'middle', 'professional', 'elevenlabs', 'david_voice_id', 'free'),
  ('voice-003', 'Sarah - Energetic', 'en-US', 'female', 'young', 'energetic', 'elevenlabs', 'sarah_voice_id', 'free')
ON CONFLICT (id) DO NOTHING;

-- Seed some default templates
INSERT INTO templates (id, name, description, category, style, thumbnail_url, tier) VALUES
  ('template-001', 'Clean Product Showcase', 'Minimal design perfect for product demos', 'product', 'minimal', 'https://placehold.co/400x400/8B5CF6/white?text=Template+1', 'free'),
  ('template-002', 'Bold Announcement', 'Eye-catching style for promotions', 'promo', 'bold', 'https://placehold.co/400x400/3B82F6/white?text=Template+2', 'free'),
  ('template-003', 'Elegant Testimonial', 'Sophisticated template for social proof', 'testimonial', 'elegant', 'https://placehold.co/400x400/EC4899/white?text=Template+3', 'free')
ON CONFLICT (id) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Migration completed successfully!';
  RAISE NOTICE '✅ User auto-creation trigger is now active';
  RAISE NOTICE '✅ Next step: Run the backfill query to add existing users';
END $$;
