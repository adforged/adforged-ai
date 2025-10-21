/**
 * AdForge AI - Application Constants
 * Centralized configuration and constants
 */

import type { SubscriptionPlan, SubscriptionTier } from "@/types";

// ============================================================================
// APPLICATION INFO
// ============================================================================

export const APP_NAME = "AdForge AI";
export const APP_DESCRIPTION =
  "Turn any product URL into winning video ads with AI avatars";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const APP_VERSION = "1.0.0";

// ============================================================================
// CREDITS & PRICING
// ============================================================================

export const CREDIT_COSTS = {
  BASE_VIDEO: 5,
  PREMIUM_AVATAR: 2,
  HD_1080P: 1,
  HD_4K: 3,
  DURATION_PER_30S: 1,
} as const;

export const FREE_CREDITS_ON_SIGNUP = 10;

// ============================================================================
// SUBSCRIPTION PLANS
// ============================================================================

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    id: "free",
    name: "Free",
    price_monthly: 0,
    price_yearly: 0,
    credits_monthly: 10,
    credits_yearly: 10,
    features: [
      { name: "10 credits/month", included: true },
      { name: "2 video ads", included: true },
      { name: "Basic avatars (100 avatars)", included: true },
      { name: "Basic voices", included: true },
      { name: "Watermark on exports", included: true, description: "AdForge watermark" },
      { name: "720p quality", included: true },
      { name: "All standard features", included: true },
      { name: "Email support", included: false },
    ],
    limits: {
      videos_per_month: 2,
      max_video_duration: 60,
      avatars_count: 100,
      voices_count: 20,
      has_watermark: true,
      max_quality: "720p",
      batch_generation: false,
      api_access: false,
      team_seats: 1,
      white_label: false,
    },
  },
  creator: {
    id: "creator",
    name: "Creator",
    price_monthly: 19,
    price_yearly: 190,
    credits_monthly: 100,
    credits_yearly: 1200,
    features: [
      { name: "100 credits/month", included: true },
      { name: "20 videos/month", included: true },
      { name: "Full avatar library (1000+ avatars)", included: true },
      { name: "100+ voices in 29 languages", included: true },
      { name: "No watermark", included: true },
      { name: "1080p quality", included: true },
      { name: "Priority processing", included: true },
      { name: "Email support", included: true },
    ],
    limits: {
      videos_per_month: 20,
      max_video_duration: 120,
      avatars_count: 1000,
      voices_count: 100,
      has_watermark: false,
      max_quality: "1080p",
      batch_generation: false,
      api_access: false,
      team_seats: 1,
      white_label: false,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    price_monthly: 49,
    price_yearly: 490,
    credits_monthly: 200,
    credits_yearly: 2400,
    features: [
      { name: "200 credits/month", included: true },
      { name: "40 videos/month", included: true },
      { name: "Everything in Creator", included: true },
      { name: "Premium avatars", included: true },
      { name: "Advanced templates", included: true },
      { name: "Batch mode (10 videos at once)", included: true },
      { name: "Custom branding", included: true },
      { name: "API access (basic)", included: true },
      { name: "Priority support", included: true },
    ],
    limits: {
      videos_per_month: 40,
      max_video_duration: 180,
      avatars_count: 1000,
      voices_count: 140,
      has_watermark: false,
      max_quality: "1080p",
      batch_generation: true,
      api_access: true,
      team_seats: 1,
      white_label: false,
    },
    is_popular: true,
  },
  agency: {
    id: "agency",
    name: "Agency",
    price_monthly: 149,
    price_yearly: 1490,
    credits_monthly: 600,
    credits_yearly: 7200,
    features: [
      { name: "600 credits/month", included: true },
      { name: "120 videos/month", included: true },
      { name: "Everything in Pro", included: true },
      { name: "Full API access", included: true },
      { name: "Team workspaces (5 seats)", included: true },
      { name: "White-label exports", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "SLA guarantee", included: true },
      { name: "Custom integrations", included: true },
    ],
    limits: {
      videos_per_month: 120,
      max_video_duration: 180,
      avatars_count: 1000,
      voices_count: 140,
      has_watermark: false,
      max_quality: "4k",
      batch_generation: true,
      api_access: true,
      team_seats: 5,
      white_label: true,
    },
  },
};

// ============================================================================
// VIDEO SETTINGS
// ============================================================================

export const ASPECT_RATIOS = [
  { value: "9:16", label: "9:16 (TikTok/Reels)", width: 1080, height: 1920 },
  { value: "1:1", label: "1:1 (Instagram Feed)", width: 1080, height: 1080 },
  { value: "16:9", label: "16:9 (YouTube)", width: 1920, height: 1080 },
  { value: "4:5", label: "4:5 (Facebook/IG)", width: 1080, height: 1350 },
] as const;

export const VIDEO_DURATIONS = [
  { value: 15, label: "15 seconds" },
  { value: 30, label: "30 seconds" },
  { value: 60, label: "60 seconds" },
  { value: 90, label: "90 seconds" },
  { value: 120, label: "120 seconds" },
] as const;

export const VIDEO_QUALITIES = [
  { value: "720p", label: "720p (HD)", description: "Good for most platforms" },
  { value: "1080p", label: "1080p (Full HD)", description: "Best quality" },
  { value: "4k", label: "4K (Ultra HD)", description: "Agency only" },
] as const;

// ============================================================================
// PLATFORMS
// ============================================================================

export const PLATFORMS = [
  { id: "tiktok", name: "TikTok", icon: "TrendingUp" },
  { id: "instagram", name: "Instagram", icon: "Instagram" },
  { id: "facebook", name: "Facebook", icon: "Facebook" },
  { id: "youtube", name: "YouTube", icon: "Youtube" },
  { id: "snapchat", name: "Snapchat", icon: "Ghost" },
  { id: "amazon", name: "Amazon", icon: "ShoppingBag" },
] as const;

// ============================================================================
// SUPPORTED E-COMMERCE PLATFORMS
// ============================================================================

export const SUPPORTED_ECOMMERCE_PLATFORMS = [
  { name: "Amazon", domain: "amazon.com", icon: "🛒" },
  { name: "Shopify", domain: "shopify", icon: "🏪" },
  { name: "Etsy", domain: "etsy.com", icon: "🎨" },
  { name: "eBay", domain: "ebay.com", icon: "🔨" },
  { name: "Walmart", domain: "walmart.com", icon: "🏬" },
  { name: "Target", domain: "target.com", icon: "🎯" },
] as const;

// ============================================================================
// SCRIPT STYLES
// ============================================================================

export const SCRIPT_STYLES = [
  {
    value: "problem-solution",
    label: "Problem-Solution",
    description: "Highlight a problem and show how your product solves it",
  },
  {
    value: "testimonial",
    label: "Testimonial",
    description: "Social proof with customer reviews and experiences",
  },
  {
    value: "product-demo",
    label: "Product Demo",
    description: "Show the product in action with features and benefits",
  },
  {
    value: "before-after",
    label: "Before-After",
    description: "Dramatic transformation or improvement",
  },
  {
    value: "lifestyle",
    label: "Lifestyle",
    description: "Show the product in aspirational lifestyle context",
  },
  {
    value: "unboxing",
    label: "Unboxing",
    description: "First impressions and excitement of opening the product",
  },
  {
    value: "social-proof",
    label: "Social Proof",
    description: "Leverage popularity, reviews, and trust indicators",
  },
  {
    value: "comparison",
    label: "Comparison",
    description: "Compare with alternatives to highlight advantages",
  },
  {
    value: "educational",
    label: "Educational",
    description: "Teach something valuable while featuring the product",
  },
  {
    value: "humorous",
    label: "Humorous",
    description: "Entertaining and funny approach to grab attention",
  },
] as const;

// ============================================================================
// VIDEO GENERATION STAGES
// ============================================================================

export const VIDEO_GENERATION_STAGES = [
  { name: "Analyzing script", description: "Processing your script and content" },
  { name: "Rendering avatar", description: "Creating AI avatar video" },
  { name: "Generating voiceover", description: "Synthesizing voice audio" },
  { name: "Adding effects", description: "Applying template and effects" },
  { name: "Finalizing video", description: "Encoding and optimizing" },
] as const;

// ============================================================================
// LANGUAGES
// ============================================================================

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  // Add more languages as needed
] as const;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULT_PROJECT_NAME = "Untitled Video Ad";
export const DEFAULT_ASPECT_RATIO = "9:16";
export const DEFAULT_DURATION = 30;
export const DEFAULT_QUALITY = "1080p";
export const MAX_SCRIPT_LENGTH = 2000;
export const MIN_SCRIPT_LENGTH = 20;

// ============================================================================
// PAGINATION
// ============================================================================

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ============================================================================
// LINKS
// ============================================================================

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/adforgeai",
  linkedin: "https://linkedin.com/company/adforge-ai",
  instagram: "https://instagram.com/adforgeai",
  youtube: "https://youtube.com/@adforgeai",
} as const;

export const FOOTER_LINKS = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "API", href: "/api" },
    { name: "Templates", href: "/templates" },
  ],
  useCases: [
    { name: "E-commerce", href: "/use-cases/ecommerce" },
    { name: "Apps & Games", href: "/use-cases/apps" },
    { name: "DTC Brands", href: "/use-cases/dtc" },
    { name: "Agencies", href: "/use-cases/agencies" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
  ],
} as const;

// ============================================================================
// STATS (for marketing page)
// ============================================================================

export const MARKETING_STATS = {
  videosGenerated: "2M+",
  activeUsers: "50K+",
  g2Rating: "4.7/5",
  socCompliant: "SOC 2 Type II",
} as const;

// ============================================================================
// TESTIMONIALS
// ============================================================================

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "StyleHub",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "AdForge AI transformed our video production. We went from spending $500 per video to generating dozens of high-quality ads in minutes.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "TechGadgets",
    avatar: "https://i.pravatar.cc/150?img=2",
    text: "The AI avatars are incredibly realistic. Our TikTok engagement increased by 300% after switching to AdForge AI.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "E-commerce Manager",
    company: "BeautyBox",
    avatar: "https://i.pravatar.cc/150?img=3",
    text: "Game changer for our Amazon product launches. We can test multiple ad variations before spending on production.",
    rating: 5,
  },
] as const;

// ============================================================================
// FEATURED IN (logos)
// ============================================================================

export const FEATURED_IN = [
  { name: "TechCrunch", logo: "/logos/techcrunch.svg" },
  { name: "Bloomberg", logo: "/logos/bloomberg.svg" },
  { name: "Fast Company", logo: "/logos/fastcompany.svg" },
  { name: "Forbes", logo: "/logos/forbes.svg" },
] as const;

// ============================================================================
// TRUSTED BY (company logos)
// ============================================================================

export const TRUSTED_BY = [
  { name: "Shopify", logo: "/logos/shopify.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "TikTok", logo: "/logos/tiktok.svg" },
] as const;
