/**
 * AdForge AI - Zod Validation Schemas
 * Type-safe validation for all forms and API inputs
 */

import { z } from "zod";

// ============================================================================
// URL & PRODUCT VALIDATION
// ============================================================================

export const urlInputSchema = z.object({
  url: z
    .string()
    .min(1, "Please enter a URL")
    .url("Please enter a valid URL")
    .refine(
      (url) => {
        // Allow common e-commerce platforms
        const allowedDomains = [
          "amazon",
          "shopify",
          "etsy",
          "ebay",
          "walmart",
          "target",
        ];
        return allowedDomains.some((domain) => url.includes(domain));
      },
      {
        message:
          "Please enter a URL from a supported platform (Amazon, Shopify, Etsy, etc.)",
      }
    ),
});

export const productDataSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().min(10, "Product description must be at least 10 characters"),
  price: z.string().nullable(),
  currency: z.string().nullable(),
  images: z.array(z.string().url()).min(1, "At least one product image is required"),
  brand: z.string().nullable(),
  category: z.string().nullable(),
  features: z.array(z.string()),
  url: z.string().url(),
});

// ============================================================================
// SCRIPT VALIDATION
// ============================================================================

export const scriptSchema = z.object({
  id: z.string(),
  text: z.string().min(20, "Script must be at least 20 characters").max(2000, "Script must be less than 2000 characters"),
  style: z.enum([
    "problem-solution",
    "testimonial",
    "product-demo",
    "before-after",
    "lifestyle",
    "unboxing",
    "social-proof",
    "comparison",
    "educational",
    "humorous",
  ]),
  hook_type: z.string(),
  estimated_duration: z.number().min(15).max(180),
  key_message: z.string(),
  cta: z.string(),
});

export const customScriptSchema = z.object({
  text: z
    .string()
    .min(20, "Script must be at least 20 characters")
    .max(2000, "Script must be less than 2000 characters"),
});

// ============================================================================
// PROJECT VALIDATION
// ============================================================================

export const projectCreateSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100).optional(),
  product_url: z.string().url().optional(),
  product_data: productDataSchema.optional(),
  aspect_ratio: z.enum(["9:16", "16:9", "1:1", "4:5"]).default("9:16"),
  quality: z.enum(["720p", "1080p", "4k"]).default("1080p"),
});

export const projectUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  selected_script: z.string().optional(),
  avatar_id: z.string().optional(),
  voice_id: z.string().optional(),
  template_id: z.string().optional(),
  aspect_ratio: z.enum(["9:16", "16:9", "1:1", "4:5"]).optional(),
  quality: z.enum(["720p", "1080p", "4k"]).optional(),
});

// ============================================================================
// VIDEO CONFIGURATION VALIDATION
// ============================================================================

export const videoConfigSchema = z.object({
  project_id: z.string().uuid(),
  script: z.string().min(20).max(2000),
  avatar_id: z.string().min(1, "Please select an avatar"),
  voice_id: z.string().min(1, "Please select a voice"),
  template_id: z.string().min(1, "Please select a template"),
  aspect_ratio: z.enum(["9:16", "16:9", "1:1", "4:5"]),
  duration: z.number().min(15).max(180),
  quality: z.enum(["720p", "1080p", "4k"]),
  background_music: z.boolean().default(true),
  captions: z.boolean().default(true),
  caption_style: z.string().optional(),
});

export const projectCustomizationSchema = z.object({
  avatar_id: z.string().min(1, "Please select an avatar"),
  voice_id: z.string().min(1, "Please select a voice"),
  template_id: z.string().min(1, "Please select a template"),
  aspect_ratio: z.enum(["9:16", "16:9", "1:1", "4:5"]),
  duration: z.number().min(15).max(180),
  quality: z.enum(["720p", "1080p", "4k"]),
  background_music: z.boolean().default(true),
  captions: z.boolean().default(true),
  caption_style: z.string().optional(),
});

// ============================================================================
// USER & SETTINGS VALIDATION
// ============================================================================

export const userSettingsSchema = z.object({
  full_name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email"),
  default_aspect_ratio: z.enum(["9:16", "16:9", "1:1", "4:5"]).default("9:16"),
  default_duration: z.number().min(15).max(180).default(30),
  email_notifications: z.object({
    video_completed: z.boolean().default(true),
    credits_low: z.boolean().default(true),
    new_features: z.boolean().default(true),
    marketing: z.boolean().default(false),
  }),
  interface_preferences: z.object({
    dark_mode: z.boolean().default(false),
    language: z.string().default("en"),
  }),
});

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(8, "Password must be at least 8 characters"),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

// ============================================================================
// AUTH VALIDATION
// ============================================================================

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
  .object({
    full_name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirm_password: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

// ============================================================================
// FILTER VALIDATION
// ============================================================================

export const avatarFiltersSchema = z.object({
  gender: z.enum(["male", "female", "non-binary"]).optional(),
  age_range: z.enum(["18-25", "26-35", "36-45", "46-55", "56+"]).optional(),
  ethnicity: z.string().optional(),
  style: z
    .enum([
      "professional",
      "casual",
      "athletic",
      "elegant",
      "creative",
      "tech",
      "medical",
      "business",
      "influencer",
    ])
    .optional(),
  tier: z.enum(["free", "basic", "premium"]).optional(),
  search: z.string().optional(),
});

export const voiceFiltersSchema = z.object({
  language: z.string().optional(),
  gender: z.enum(["male", "female", "neutral"]).optional(),
  age: z.enum(["young", "middle", "senior"]).optional(),
  accent: z.string().optional(),
  style: z
    .enum([
      "energetic",
      "calm",
      "professional",
      "friendly",
      "authoritative",
      "warm",
      "dramatic",
      "conversational",
    ])
    .optional(),
  tier: z.enum(["free", "basic", "premium"]).optional(),
  search: z.string().optional(),
});

export const templateFiltersSchema = z.object({
  platform: z
    .enum(["tiktok", "instagram", "facebook", "youtube", "snapchat", "amazon"])
    .optional(),
  category: z
    .enum([
      "product-demo",
      "testimonial",
      "unboxing",
      "lifestyle",
      "comparison",
      "tutorial",
      "announcement",
      "promotion",
    ])
    .optional(),
  style: z
    .enum([
      "ugc",
      "professional",
      "animated",
      "minimal",
      "bold",
      "cinematic",
      "playful",
    ])
    .optional(),
  search: z.string().optional(),
});

// ============================================================================
// API VALIDATION
// ============================================================================

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export const searchParamsSchema = z.object({
  query: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// ============================================================================
// EXPORT TYPE INFERENCE
// ============================================================================

export type URLInputFormData = z.infer<typeof urlInputSchema>;
export type ProductDataFormData = z.infer<typeof productDataSchema>;
export type ScriptFormData = z.infer<typeof scriptSchema>;
export type ProjectCreateFormData = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateFormData = z.infer<typeof projectUpdateSchema>;
export type VideoConfigFormData = z.infer<typeof videoConfigSchema>;
export type ProjectCustomizationFormData = z.infer<typeof projectCustomizationSchema>;
export type UserSettingsFormData = z.infer<typeof userSettingsSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type AvatarFiltersFormData = z.infer<typeof avatarFiltersSchema>;
export type VoiceFiltersFormData = z.infer<typeof voiceFiltersSchema>;
export type TemplateFiltersFormData = z.infer<typeof templateFiltersSchema>;
