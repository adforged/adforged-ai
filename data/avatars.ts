/**
 * AdForge AI - Avatar Library Seed Data
 * Comprehensive avatar library with diverse options
 */

import type { Avatar } from "@/types";

export const AVATARS: Avatar[] = [
  // ============================================================================
  // PROFESSIONAL - MALE
  // ============================================================================
  {
    id: "avatar-prof-m-001",
    name: "David Miller",
    gender: "male",
    age_range: "36-45",
    ethnicity: "Caucasian",
    style: "professional",
    thumbnail_url: "https://i.pravatar.cc/300?img=12",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "Discover the future of business with our innovative solutions.",
    tags: ["business", "corporate", "executive", "confident"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-prof-m-002",
    name: "James Chen",
    gender: "male",
    age_range: "26-35",
    ethnicity: "Asian",
    style: "professional",
    thumbnail_url: "https://i.pravatar.cc/300?img=13",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "Transform your workflow with cutting-edge technology.",
    tags: ["tech", "modern", "innovative", "young professional"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-prof-m-003",
    name: "Marcus Johnson",
    gender: "male",
    age_range: "36-45",
    ethnicity: "African American",
    style: "professional",
    thumbnail_url: "https://i.pravatar.cc/300?img=14",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "basic",
    sample_text: "Leading the way in sustainable business practices.",
    tags: ["leadership", "corporate", "authoritative", "executive"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-prof-m-004",
    name: "Raj Patel",
    gender: "male",
    age_range: "26-35",
    ethnicity: "South Asian",
    style: "tech",
    thumbnail_url: "https://i.pravatar.cc/300?img=15",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "Innovation meets simplicity in our latest product.",
    tags: ["tech", "startup", "developer", "modern"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-prof-m-005",
    name: "Alessandro Romano",
    gender: "male",
    age_range: "46-55",
    ethnicity: "Mediterranean",
    style: "professional",
    thumbnail_url: "https://i.pravatar.cc/300?img=51",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "premium",
    sample_text: "Excellence is not an act, but a habit.",
    tags: ["executive", "luxury", "sophisticated", "experienced"],
    created_at: new Date().toISOString(),
  },

  // ============================================================================
  // PROFESSIONAL - FEMALE
  // ============================================================================
  {
    id: "avatar-prof-f-001",
    name: "Sarah Williams",
    gender: "female",
    age_range: "26-35",
    ethnicity: "Caucasian",
    style: "professional",
    thumbnail_url: "https://i.pravatar.cc/300?img=1",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "Empowering businesses to reach their full potential.",
    tags: ["business", "confident", "leader", "modern"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-prof-f-002",
    name: "Jessica Kim",
    gender: "female",
    age_range: "26-35",
    ethnicity: "Asian",
    style: "tech",
    thumbnail_url: "https://i.pravatar.cc/300?img=2",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "The future of AI is here, and it's transformative.",
    tags: ["tech", "innovative", "smart", "forward-thinking"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-prof-f-003",
    name: "Aisha Thompson",
    gender: "female",
    age_range: "36-45",
    ethnicity: "African American",
    style: "business",
    thumbnail_url: "https://i.pravatar.cc/300?img=3",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "basic",
    sample_text: "Strategic solutions for modern challenges.",
    tags: ["executive", "strategic", "powerful", "leader"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-prof-f-004",
    name: "Dr. Emily Rodriguez",
    gender: "female",
    age_range: "36-45",
    ethnicity: "Hispanic",
    style: "medical",
    thumbnail_url: "https://i.pravatar.cc/300?img=4",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "premium",
    sample_text: "Your health is our priority, backed by science.",
    tags: ["medical", "healthcare", "expert", "trustworthy"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-prof-f-005",
    name: "Priya Sharma",
    gender: "female",
    age_range: "26-35",
    ethnicity: "South Asian",
    style: "professional",
    thumbnail_url: "https://i.pravatar.cc/300?img=5",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "Bridging technology and human connection.",
    tags: ["tech", "friendly", "approachable", "modern"],
    created_at: new Date().toISOString(),
  },

  // ============================================================================
  // CASUAL - MALE
  // ============================================================================
  {
    id: "avatar-casual-m-001",
    name: "Jake Anderson",
    gender: "male",
    age_range: "18-25",
    ethnicity: "Caucasian",
    style: "casual",
    thumbnail_url: "https://i.pravatar.cc/300?img=16",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "Hey everyone! Check out this amazing product!",
    tags: ["young", "energetic", "relatable", "friendly"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-casual-m-002",
    name: "Tyler Brooks",
    gender: "male",
    age_range: "18-25",
    ethnicity: "Caucasian",
    style: "casual",
    thumbnail_url: "https://i.pravatar.cc/300?img=17",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "This literally changed my life, no joke!",
    tags: ["ugc", "authentic", "enthusiastic", "gen-z"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-casual-m-003",
    name: "Carlos Martinez",
    gender: "male",
    age_range: "26-35",
    ethnicity: "Hispanic",
    style: "casual",
    thumbnail_url: "https://i.pravatar.cc/300?img=18",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "basic",
    sample_text: "Real talk - this is exactly what you need.",
    tags: ["authentic", "relatable", "down-to-earth", "honest"],
    created_at: new Date().toISOString(),
  },

  // ============================================================================
  // CASUAL - FEMALE
  // ============================================================================
  {
    id: "avatar-casual-f-001",
    name: "Emma Taylor",
    gender: "female",
    age_range: "18-25",
    ethnicity: "Caucasian",
    style: "casual",
    thumbnail_url: "https://i.pravatar.cc/300?img=6",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "OMG you guys! I'm obsessed with this!",
    tags: ["young", "enthusiastic", "bubbly", "relatable"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-casual-f-002",
    name: "Zoe Carter",
    gender: "female",
    age_range: "18-25",
    ethnicity: "African American",
    style: "influencer",
    thumbnail_url: "https://i.pravatar.cc/300?img=7",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "basic",
    sample_text: "Let me tell you why I love this so much...",
    tags: ["influencer", "social media", "trendy", "authentic"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-casual-f-003",
    name: "Mia Lopez",
    gender: "female",
    age_range: "26-35",
    ethnicity: "Hispanic",
    style: "casual",
    thumbnail_url: "https://i.pravatar.cc/300?img=8",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "free",
    sample_text: "As a busy mom, this has been a game changer!",
    tags: ["mom", "practical", "relatable", "warm"],
    created_at: new Date().toISOString(),
  },

  // ============================================================================
  // CREATIVE - MIXED
  // ============================================================================
  {
    id: "avatar-creative-f-001",
    name: "Luna Zhang",
    gender: "female",
    age_range: "18-25",
    ethnicity: "Asian",
    style: "creative",
    thumbnail_url: "https://i.pravatar.cc/300?img=9",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "premium",
    sample_text: "Where creativity meets innovation.",
    tags: ["artistic", "unique", "creative", "trendsetter"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-creative-m-001",
    name: "Kai Morrison",
    gender: "male",
    age_range: "26-35",
    ethnicity: "Mixed",
    style: "creative",
    thumbnail_url: "https://i.pravatar.cc/300?img=19",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "premium",
    sample_text: "Breaking boundaries, one idea at a time.",
    tags: ["artist", "innovative", "unique", "creative"],
    created_at: new Date().toISOString(),
  },

  // ============================================================================
  // ATHLETIC - MIXED
  // ============================================================================
  {
    id: "avatar-athletic-m-001",
    name: "Derek Stone",
    gender: "male",
    age_range: "26-35",
    ethnicity: "Caucasian",
    style: "athletic",
    thumbnail_url: "https://i.pravatar.cc/300?img=20",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "basic",
    sample_text: "Push your limits. Achieve your goals.",
    tags: ["fitness", "active", "motivational", "energetic"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-athletic-f-001",
    name: "Jordan Rivers",
    gender: "female",
    age_range: "26-35",
    ethnicity: "African American",
    style: "athletic",
    thumbnail_url: "https://i.pravatar.cc/300?img=10",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "basic",
    sample_text: "Strength starts from within.",
    tags: ["fitness", "strong", "inspiring", "athletic"],
    created_at: new Date().toISOString(),
  },

  // ============================================================================
  // ELEGANT - FEMALE
  // ============================================================================
  {
    id: "avatar-elegant-f-001",
    name: "Isabella Laurent",
    gender: "female",
    age_range: "36-45",
    ethnicity: "Caucasian",
    style: "elegant",
    thumbnail_url: "https://i.pravatar.cc/300?img=11",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "premium",
    sample_text: "Timeless elegance meets modern luxury.",
    tags: ["luxury", "sophisticated", "elegant", "upscale"],
    created_at: new Date().toISOString(),
  },
  {
    id: "avatar-elegant-f-002",
    name: "Sophia Nakamura",
    gender: "female",
    age_range: "26-35",
    ethnicity: "Asian",
    style: "elegant",
    thumbnail_url: "https://i.pravatar.cc/300?img=45",
    preview_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    tier: "premium",
    sample_text: "Experience the art of refined living.",
    tags: ["beauty", "elegant", "refined", "graceful"],
    created_at: new Date().toISOString(),
  },

  // Add 30+ more avatars following similar patterns...
  // For brevity, I'm including a representative sample
];

// Helper function to get avatars by filter
export const getAvatarsByFilter = (filters: {
  gender?: string;
  age_range?: string;
  style?: string;
  tier?: string;
  search?: string;
}) => {
  return AVATARS.filter((avatar) => {
    if (filters.gender && avatar.gender !== filters.gender) return false;
    if (filters.age_range && avatar.age_range !== filters.age_range) return false;
    if (filters.style && avatar.style !== filters.style) return false;
    if (filters.tier && avatar.tier !== filters.tier) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        avatar.name.toLowerCase().includes(searchLower) ||
        avatar.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });
};

export const getAvatarById = (id: string) => {
  return AVATARS.find((avatar) => avatar.id === id);
};
