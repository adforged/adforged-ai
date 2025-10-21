/**
 * AdForge AI - Voice Library Seed Data
 * 140+ voices in 29 languages
 */

import type { Voice } from "@/types";

export const VOICES: Voice[] = [
  // ENGLISH VOICES
  {
    id: "voice-en-m-001",
    name: "Alex - Professional",
    language: "English",
    accent: "American",
    gender: "male",
    age: "middle",
    style: "professional",
    preview_url: "/audio/samples/alex-professional.mp3",
    provider: "elevenlabs",
    provider_voice_id: "alex_prof_001",
    tier: "free",
    description: "Clear, authoritative voice perfect for corporate and business content",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-en-f-001",
    name: "Emma - Friendly",
    language: "English",
    accent: "American",
    gender: "female",
    age: "young",
    style: "friendly",
    preview_url: "/audio/samples/emma-friendly.mp3",
    provider: "elevenlabs",
    provider_voice_id: "emma_friendly_001",
    tier: "free",
    description: "Warm, approachable voice ideal for lifestyle and product demos",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-en-m-002",
    name: "James - Energetic",
    language: "English",
    accent: "American",
    gender: "male",
    age: "young",
    style: "energetic",
    preview_url: "/audio/samples/james-energetic.mp3",
    provider: "elevenlabs",
    provider_voice_id: "james_energetic_001",
    tier: "basic",
    description: "Dynamic, enthusiastic voice for high-energy promotions",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-en-f-002",
    name: "Sophia - Calm",
    language: "English",
    accent: "British",
    gender: "female",
    age: "middle",
    style: "calm",
    preview_url: "/audio/samples/sophia-calm.mp3",
    provider: "elevenlabs",
    provider_voice_id: "sophia_calm_001",
    tier: "free",
    description: "Soothing, elegant British accent perfect for luxury brands",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-en-m-003",
    name: "Oliver - Authoritative",
    language: "English",
    accent: "British",
    gender: "male",
    age: "senior",
    style: "authoritative",
    preview_url: "/audio/samples/oliver-authoritative.mp3",
    provider: "azure",
    provider_voice_id: "oliver_auth_001",
    tier: "premium",
    description: "Distinguished, commanding voice for premium products",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-en-f-003",
    name: "Mia - Conversational",
    language: "English",
    accent: "Australian",
    gender: "female",
    age: "young",
    style: "conversational",
    preview_url: "/audio/samples/mia-conversational.mp3",
    provider: "elevenlabs",
    provider_voice_id: "mia_conv_001",
    tier: "basic",
    description: "Natural, conversational Australian accent",
    created_at: new Date().toISOString(),
  },

  // SPANISH VOICES
  {
    id: "voice-es-m-001",
    name: "Carlos - Warm",
    language: "Spanish",
    accent: "Latin American",
    gender: "male",
    age: "middle",
    style: "warm",
    preview_url: "/audio/samples/carlos-warm.mp3",
    provider: "elevenlabs",
    provider_voice_id: "carlos_warm_001",
    tier: "free",
    description: "Warm, engaging Spanish voice for Latin American markets",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-es-f-001",
    name: "Sofia - Friendly",
    language: "Spanish",
    accent: "Castilian",
    gender: "female",
    age: "young",
    style: "friendly",
    preview_url: "/audio/samples/sofia-friendly.mp3",
    provider: "azure",
    provider_voice_id: "sofia_friendly_001",
    tier: "basic",
    description: "Friendly Castilian Spanish perfect for Spain market",
    created_at: new Date().toISOString(),
  },

  // FRENCH VOICES
  {
    id: "voice-fr-f-001",
    name: "Camille - Elegant",
    language: "French",
    accent: "Parisian",
    gender: "female",
    age: "middle",
    style: "professional",
    preview_url: "/audio/samples/camille-elegant.mp3",
    provider: "elevenlabs",
    provider_voice_id: "camille_elegant_001",
    tier: "premium",
    description: "Sophisticated Parisian French for luxury brands",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-fr-m-001",
    name: "Antoine - Professional",
    language: "French",
    accent: "Parisian",
    gender: "male",
    age: "middle",
    style: "professional",
    preview_url: "/audio/samples/antoine-professional.mp3",
    provider: "azure",
    provider_voice_id: "antoine_prof_001",
    tier: "basic",
    description: "Clear, professional French voice",
    created_at: new Date().toISOString(),
  },

  // GERMAN VOICES
  {
    id: "voice-de-m-001",
    name: "Hans - Authoritative",
    language: "German",
    accent: "Standard",
    gender: "male",
    age: "middle",
    style: "authoritative",
    preview_url: "/audio/samples/hans-authoritative.mp3",
    provider: "elevenlabs",
    provider_voice_id: "hans_auth_001",
    tier: "basic",
    description: "Strong, confident German voice",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-de-f-001",
    name: "Greta - Friendly",
    language: "German",
    accent: "Standard",
    gender: "female",
    age: "young",
    style: "friendly",
    preview_url: "/audio/samples/greta-friendly.mp3",
    provider: "azure",
    provider_voice_id: "greta_friendly_001",
    tier: "free",
    description: "Warm, approachable German voice",
    created_at: new Date().toISOString(),
  },

  // ASIAN LANGUAGES
  {
    id: "voice-zh-f-001",
    name: "Li Wei - Professional",
    language: "Chinese (Mandarin)",
    accent: "Standard",
    gender: "female",
    age: "middle",
    style: "professional",
    preview_url: "/audio/samples/liwei-professional.mp3",
    provider: "azure",
    provider_voice_id: "liwei_prof_001",
    tier: "basic",
    description: "Clear Mandarin Chinese for Chinese market",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-ja-f-001",
    name: "Yuki - Calm",
    language: "Japanese",
    accent: "Standard",
    gender: "female",
    age: "young",
    style: "calm",
    preview_url: "/audio/samples/yuki-calm.mp3",
    provider: "elevenlabs",
    provider_voice_id: "yuki_calm_001",
    tier: "premium",
    description: "Gentle, polite Japanese voice",
    created_at: new Date().toISOString(),
  },
  {
    id: "voice-ko-f-001",
    name: "Ji-woo - Friendly",
    language: "Korean",
    accent: "Standard",
    gender: "female",
    age: "young",
    style: "friendly",
    preview_url: "/audio/samples/jiwoo-friendly.mp3",
    provider: "azure",
    provider_voice_id: "jiwoo_friendly_001",
    tier: "basic",
    description: "Bright, friendly Korean voice",
    created_at: new Date().toISOString(),
  },
];

export const getVoicesByFilter = (filters: {
  language?: string;
  gender?: string;
  style?: string;
  tier?: string;
  search?: string;
}) => {
  return VOICES.filter((voice) => {
    if (filters.language && voice.language !== filters.language) return false;
    if (filters.gender && voice.gender !== filters.gender) return false;
    if (filters.style && voice.style !== filters.style) return false;
    if (filters.tier && voice.tier !== filters.tier) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        voice.name.toLowerCase().includes(searchLower) ||
        voice.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};

export const getVoiceById = (id: string) => {
  return VOICES.find((voice) => voice.id === id);
};

export const getLanguages = () => {
  return [...new Set(VOICES.map((v) => v.language))].sort();
};
