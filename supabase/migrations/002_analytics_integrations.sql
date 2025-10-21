-- Analytics & Campaign Management Schema

-- Platform Integrations Table
CREATE TABLE IF NOT EXISTS platform_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('shopify', 'meta', 'tiktok')),

  -- OAuth credentials (encrypted in production)
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,

  -- Platform-specific IDs
  shop_domain TEXT, -- Shopify store domain
  ad_account_id TEXT, -- Meta/TikTok ad account ID
  business_id TEXT, -- Meta Business Manager ID

  -- Connection status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked', 'error')),
  last_synced_at TIMESTAMP,
  sync_error TEXT,

  -- Metadata
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Ensure one integration per platform per user
  UNIQUE(user_id, platform)
);

-- Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('meta', 'tiktok')),

  -- Platform campaign ID
  platform_campaign_id TEXT NOT NULL,

  -- Basic info
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'draft')),
  objective TEXT, -- CONVERSIONS, TRAFFIC, VIDEO_VIEWS, etc.

  -- Budget
  budget_type TEXT CHECK (budget_type IN ('daily', 'lifetime')),
  budget_amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',

  -- Video/Ad info
  video_url TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,

  -- Performance metrics (synced from platform)
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  spend DECIMAL(10, 2) DEFAULT 0,
  revenue DECIMAL(10, 2) DEFAULT 0,

  -- Calculated metrics
  ctr DECIMAL(5, 4), -- Click-through rate
  cpc DECIMAL(10, 2), -- Cost per click
  cpa DECIMAL(10, 2), -- Cost per acquisition
  roas DECIMAL(10, 2), -- Return on ad spend

  -- Timestamps
  platform_created_at TIMESTAMP,
  platform_updated_at TIMESTAMP,
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, platform, platform_campaign_id)
);

-- Shopify Products Table
CREATE TABLE IF NOT EXISTS shopify_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,

  -- Shopify product info
  shopify_product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  handle TEXT,
  description TEXT,
  vendor TEXT,
  product_type TEXT,

  -- Pricing
  price DECIMAL(10, 2),
  compare_at_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',

  -- Images
  image_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
  published_at TIMESTAMP,

  -- Analytics (synced from Shopify)
  total_sales INTEGER DEFAULT 0,
  total_revenue DECIMAL(10, 2) DEFAULT 0,

  -- Metadata
  tags JSONB DEFAULT '[]'::jsonb,
  variants JSONB DEFAULT '[]'::jsonb,
  options JSONB DEFAULT '[]'::jsonb,

  -- Timestamps
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, shopify_product_id)
);

-- Campaign Performance History (time-series data)
CREATE TABLE IF NOT EXISTS campaign_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,

  -- Metrics snapshot
  date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  spend DECIMAL(10, 2) DEFAULT 0,
  revenue DECIMAL(10, 2) DEFAULT 0,

  -- Calculated
  ctr DECIMAL(5, 4),
  cpc DECIMAL(10, 2),
  cpa DECIMAL(10, 2),
  roas DECIMAL(10, 2),

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(campaign_id, date)
);

-- Product Performance (linked to campaigns)
CREATE TABLE IF NOT EXISTS product_campaign_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES shopify_products(id) ON DELETE CASCADE NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,

  -- Performance metrics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(10, 2) DEFAULT 0,

  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(product_id, campaign_id, date)
);

-- AI Recommendations Table
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,

  -- Recommendation details
  type TEXT NOT NULL CHECK (type IN ('budget_optimization', 'script_variation', 'targeting', 'creative', 'schedule')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT CHECK (impact IN ('high', 'medium', 'low')),

  -- Data backing the recommendation
  data JSONB DEFAULT '{}'::jsonb,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'dismissed', 'applied')),
  applied_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- A/B Tests Table
CREATE TABLE IF NOT EXISTS ab_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,

  -- Test info
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'running' CHECK (status IN ('draft', 'running', 'completed', 'stopped')),

  -- Variants (array of video/campaign IDs)
  variant_a_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  variant_b_id UUID REFERENCES projects(id) ON DELETE SET NULL,

  -- Traffic split
  traffic_split_a INTEGER DEFAULT 50,
  traffic_split_b INTEGER DEFAULT 50,

  -- Results
  variant_a_conversions INTEGER DEFAULT 0,
  variant_b_conversions INTEGER DEFAULT 0,
  variant_a_revenue DECIMAL(10, 2) DEFAULT 0,
  variant_b_revenue DECIMAL(10, 2) DEFAULT 0,

  -- Winner
  winner TEXT CHECK (winner IN ('a', 'b', 'inconclusive')),
  confidence_level DECIMAL(5, 2), -- 0-100%

  -- Timestamps
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_platform_integrations_user ON platform_integrations(user_id);
CREATE INDEX idx_campaigns_user ON campaigns(user_id);
CREATE INDEX idx_campaigns_platform ON campaigns(platform, status);
CREATE INDEX idx_shopify_products_user ON shopify_products(user_id);
CREATE INDEX idx_campaign_performance_campaign_date ON campaign_performance(campaign_id, date DESC);
CREATE INDEX idx_ai_recommendations_user_status ON ai_recommendations(user_id, status);
CREATE INDEX idx_ab_tests_user_status ON ab_tests(user_id, status);

-- Row Level Security (RLS)
ALTER TABLE platform_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopify_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_campaign_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own integrations" ON platform_integrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own integrations" ON platform_integrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own integrations" ON platform_integrations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own campaigns" ON campaigns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own products" ON shopify_products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own performance" ON campaign_performance
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_performance.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own recommendations" ON ai_recommendations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own ab tests" ON ab_tests
  FOR ALL USING (auth.uid() = user_id);

-- Update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_platform_integrations_updated_at BEFORE UPDATE ON platform_integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopify_products_updated_at BEFORE UPDATE ON shopify_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ab_tests_updated_at BEFORE UPDATE ON ab_tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
