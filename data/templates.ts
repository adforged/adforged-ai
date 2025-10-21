import type { Template } from "@/types";

export const TEMPLATES: Template[] = [
  {
    id: "template-001",
    name: "Modern Product Showcase",
    category: "product-demo",
    thumbnail_url: "https://placehold.co/600x400/8B5CF6/white?text=Modern+Showcase",
    preview_url: "/videos/template-modern.mp4",
    style: "professional",
    platforms: ["tiktok", "instagram", "facebook"],
    description: "Clean, modern template with dynamic product reveals",
    best_for: "Tech products, gadgets, and modern brands",
    features: ["Product zoom", "Text animations", "Call-to-action overlay"],
    created_at: new Date().toISOString(),
  },
  {
    id: "template-002",
    name: "UGC Testimonial",
    category: "testimonial",
    thumbnail_url: "https://placehold.co/600x400/8B5CF6/white?text=UGC+Style",
    preview_url: "/videos/template-ugc.mp4",
    style: "ugc",
    platforms: ["tiktok", "instagram"],
    description: "Authentic user-generated content style",
    best_for: "Building trust and social proof",
    features: ["Casual background", "Subtitle captions", "Authentic feel"],
    created_at: new Date().toISOString(),
  },
  {
    id: "template-003",
    name: "Bold Announcement",
    category: "announcement",
    thumbnail_url: "https://placehold.co/600x400/8B5CF6/white?text=Bold",
    preview_url: "/videos/template-bold.mp4",
    style: "bold",
    platforms: ["tiktok", "facebook", "youtube"],
    description: "High-impact template for product launches",
    best_for: "New product announcements and limited offers",
    features: ["Animated text", "Countdown timer", "Urgency indicators"],
    created_at: new Date().toISOString(),
  },
];

export const getTemplateById = (id: string) => TEMPLATES.find((t) => t.id === id);
