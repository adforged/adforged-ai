/**
 * AdForge AI - TypeScript Type Definitions
 * Production-ready type system for AI video ad generation platform
 */

// ============================================================================
// USER & AUTHENTICATION TYPES
// ============================================================================

export type SubscriptionTier = "free" | "creator" | "pro" | "agency";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  credits: number;
  subscription_tier: SubscriptionTier;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

export type ProjectStatus = "draft" | "generating" | "completed" | "failed";
export type AspectRatio = "9:16" | "16:9" | "1:1" | "4:5";
export type VideoQuality = "720p" | "1080p" | "4k";

export interface ProductData {
  title: string;
  description: string;
  price: string | null;
  currency: string | null;
  images: string[];
  brand: string | null;
  category: string | null;
  features: string[];
  url: string;
}

export interface Script {
  id: string;
  text: string;
  style: ScriptStyle;
  hook_type: string;
  estimated_duration: number; // in seconds
  key_message: string;
  cta: string;

  // Performance Indicators
  hook_strength: number; // 1-10 rating
  engagement_prediction: 'low' | 'medium' | 'high' | 'viral-potential';

  // Platform Optimization Scores (0-100)
  platform_scores: {
    tiktok: number;
    instagram: number;
    youtube: number;
    facebook: number;
  };

  // Content Analysis
  pacing: 'fast' | 'medium' | 'slow';
  emotion_level: 'calm' | 'energetic' | 'urgent' | 'aspirational';
  word_count: number;

  // Strategic Grouping
  strategy_type: 'hook-focused' | 'problem-solution' | 'social-proof' | 'platform-optimized';
}

export type ScriptStyle =
  | "problem-solution"
  | "testimonial"
  | "product-demo"
  | "before-after"
  | "lifestyle"
  | "unboxing"
  | "social-proof"
  | "comparison"
  | "educational"
  | "humorous"
  | "custom";

export interface Project {
  id: string;
  user_id: string;
  name: string;
  status: ProjectStatus;
  product_url: string | null;
  product_data: ProductData | null;
  scripts: Script[];
  selected_script: string | null;
  avatar_id: string | null;
  voice_id: string | null;
  template_id: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duration: number | null; // in seconds
  aspect_ratio: AspectRatio;
  quality: VideoQuality;
  credits_used: number;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface ProjectCreateInput {
  name?: string;
  product_url?: string;
  product_data?: ProductData;
  aspect_ratio?: AspectRatio;
  quality?: VideoQuality;
}

export interface ProjectUpdateInput {
  name?: string;
  selected_script?: string;
  avatar_id?: string;
  voice_id?: string;
  template_id?: string;
  aspect_ratio?: AspectRatio;
  quality?: VideoQuality;
}

// ============================================================================
// AVATAR TYPES
// ============================================================================

export type AvatarGender = "male" | "female" | "non-binary";
export type AvatarAgeRange = "18-25" | "26-35" | "36-45" | "46-55" | "56+";
export type AvatarTier = "free" | "basic" | "premium";
export type AvatarStyle =
  | "professional"
  | "casual"
  | "athletic"
  | "elegant"
  | "creative"
  | "tech"
  | "medical"
  | "business"
  | "influencer";

export interface Avatar {
  id: string;
  name: string;
  gender: AvatarGender;
  age_range: AvatarAgeRange;
  ethnicity: string;
  style: AvatarStyle;
  thumbnail_url: string;
  preview_url: string;
  tier: AvatarTier;
  sample_text: string;
  tags: string[];
  created_at: string;
}

export interface AvatarFilters {
  gender?: AvatarGender;
  age_range?: AvatarAgeRange;
  ethnicity?: string;
  style?: AvatarStyle;
  tier?: AvatarTier;
  search?: string;
}

// ============================================================================
// VOICE TYPES
// ============================================================================

export type VoiceGender = "male" | "female" | "neutral";
export type VoiceAge = "young" | "middle" | "senior";
export type VoiceStyle =
  | "energetic"
  | "calm"
  | "professional"
  | "friendly"
  | "authoritative"
  | "warm"
  | "dramatic"
  | "conversational";
export type VoiceProvider = "elevenlabs" | "azure" | "aws" | "google";
export type VoiceTier = "free" | "basic" | "premium";

export interface Voice {
  id: string;
  name: string;
  language: string;
  accent: string;
  gender: VoiceGender;
  age: VoiceAge;
  style: VoiceStyle;
  preview_url: string;
  provider: VoiceProvider;
  provider_voice_id: string;
  tier: VoiceTier;
  description: string;
  created_at: string;
}

export interface VoiceFilters {
  language?: string;
  gender?: VoiceGender;
  age?: VoiceAge;
  accent?: string;
  style?: VoiceStyle;
  tier?: VoiceTier;
  search?: string;
}

// ============================================================================
// TEMPLATE TYPES
// ============================================================================

export type TemplatePlatform =
  | "tiktok"
  | "instagram"
  | "facebook"
  | "youtube"
  | "snapchat"
  | "amazon";

export type TemplateCategory =
  | "product-demo"
  | "testimonial"
  | "unboxing"
  | "lifestyle"
  | "comparison"
  | "tutorial"
  | "announcement"
  | "promotion";

export type TemplateStyle =
  | "ugc"
  | "professional"
  | "animated"
  | "minimal"
  | "bold"
  | "cinematic"
  | "playful";

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnail_url: string;
  preview_url: string;
  style: TemplateStyle;
  platforms: TemplatePlatform[];
  description: string;
  best_for: string;
  features: string[];
  created_at: string;
}

export interface TemplateFilters {
  platform?: TemplatePlatform;
  category?: TemplateCategory;
  style?: TemplateStyle;
  search?: string;
}

// ============================================================================
// VIDEO GENERATION TYPES
// ============================================================================

export interface VideoConfig {
  project_id: string;
  script: string;
  avatar_id: string;
  voice_id: string;
  template_id: string;
  aspect_ratio: AspectRatio;
  duration: number;
  quality: VideoQuality;
  background_music?: boolean;
  captions?: boolean;
  caption_style?: string;
}

export interface VideoJob {
  job_id: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number; // 0-100
  current_stage: string;
  estimated_time: number | null; // seconds remaining
  created_at: string;
}

export interface VideoStatus {
  job_id: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  current_stage: string;
  stages: VideoStage[];
  error?: string;
}

export interface VideoStage {
  name: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  started_at?: string;
  completed_at?: string;
}

export interface VideoResult {
  job_id: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  file_size: number;
  format: string;
  metadata: VideoMetadata;
}

export interface VideoMetadata {
  width: number;
  height: number;
  fps: number;
  bitrate: number;
  codec: string;
}

// ============================================================================
// VIDEO PROVIDER INTERFACE
// ============================================================================

export interface VideoProvider {
  name: string;
  generateVideo(config: VideoConfig): Promise<VideoJob>;
  checkStatus(jobId: string): Promise<VideoStatus>;
  getVideo(jobId: string): Promise<VideoResult>;
  cancelVideo(jobId: string): Promise<void>;
}

// ============================================================================
// CREDITS & BILLING TYPES
// ============================================================================

export interface CreditCost {
  base: number;
  premium_avatar?: number;
  hd_export?: number;
  duration_per_30s?: number;
  total: number;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: "deduct" | "add" | "refund";
  reason: string;
  project_id?: string;
  created_at: string;
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price_monthly: number;
  price_yearly: number;
  credits_monthly: number;
  credits_yearly: number;
  features: PlanFeature[];
  limits: PlanLimits;
  is_popular?: boolean;
}

export interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
}

export interface PlanLimits {
  videos_per_month: number;
  max_video_duration: number; // seconds
  avatars_count: number;
  voices_count: number;
  has_watermark: boolean;
  max_quality: VideoQuality;
  batch_generation: boolean;
  api_access: boolean;
  team_seats: number;
  white_label: boolean;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// ============================================================================
// FORM & UI TYPES
// ============================================================================

export interface URLInputForm {
  url: string;
}

export interface ProjectCustomizationForm {
  avatar_id: string;
  voice_id: string;
  template_id: string;
  aspect_ratio: AspectRatio;
  duration: number;
  quality: VideoQuality;
  background_music: boolean;
  captions: boolean;
  caption_style?: string;
}

export interface UserSettingsForm {
  full_name: string;
  email: string;
  default_aspect_ratio: AspectRatio;
  default_duration: number;
  email_notifications: {
    video_completed: boolean;
    credits_low: boolean;
    new_features: boolean;
    marketing: boolean;
  };
  interface_preferences: {
    dark_mode: boolean;
    language: string;
  };
}

// ============================================================================
// ANALYTICS & STATS TYPES
// ============================================================================

export interface UserStats {
  videos_created_this_month: number;
  credits_used_this_month: number;
  total_credits: number;
  avg_generation_time: number; // seconds
  videos_completed: number;
  videos_failed: number;
}

export interface ProjectAnalytics {
  project_id: string;
  views: number;
  engagement_rate: number;
  avg_watch_time: number;
  shares: number;
  conversions: number;
}

// ============================================================================
// SCRIPT TEMPLATE TYPES
// ============================================================================

export interface ScriptTemplate {
  id: string;
  name: string;
  style: ScriptStyle;
  template: string; // Template with {{placeholders}}
  description: string;
  best_for: string[];
  example: string;
}

// ============================================================================
// SEARCH & FILTER TYPES
// ============================================================================

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// ============================================================================
// WEBHOOK TYPES
// ============================================================================

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  created_at: string;
}

export interface StripeWebhookEvent extends WebhookEvent {
  type:
    | "payment_intent.succeeded"
    | "customer.subscription.created"
    | "customer.subscription.updated"
    | "customer.subscription.deleted"
    | "invoice.payment_failed";
}
