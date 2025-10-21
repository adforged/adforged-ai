/**
 * AI Script Generator using OpenAI GPT-4
 * Generates conversion-focused video ad scripts
 */

import type { ProductData } from "@/lib/url-scraper/scraper";
import { generateScriptsOptimized, validateTokenLimits } from "@/lib/api/openai-client";

export interface Script {
  id: string;
  text: string;
  style: string;
  hook_type: string;
  estimated_duration: number;
  key_message: string;
  cta: string;
  hook_strength: number;
  engagement_prediction: 'low' | 'medium' | 'high' | 'viral-potential';
  platform_scores: {
    tiktok: number;
    instagram: number;
    youtube: number;
    facebook: number;
  };
  pacing: 'fast' | 'medium' | 'slow';
  emotion_level: 'calm' | 'energetic' | 'urgent' | 'aspirational';
  word_count: number;
  strategy_type: 'hook-focused' | 'problem-solution' | 'social-proof' | 'platform-optimized';
}

export interface ScriptGenerationOptions {
  tone?: 'professional' | 'casual' | 'energetic' | 'educational' | 'humorous';
  length?: 'short' | 'medium' | 'long';
  platform?: 'tiktok' | 'instagram' | 'youtube' | 'facebook' | 'all';
  count?: number;
}

export async function generateScripts(
  productData: ProductData,
  options: ScriptGenerationOptions = {}
): Promise<Script[]> {
  const {
    tone = 'casual',
    length = 'medium',
    platform = 'all',
    count = 12
  } = options;

  const prompt = buildPrompt(productData, { tone, length, platform, count });

  // Calculate duration based on length preset
  const durationRange = getDurationRange(length);
  const wordCountRange = getWordCountRange(length);

  const systemPrompt = `You are an expert video ad scriptwriter specializing in short-form video content for TikTok, Instagram Reels, and Facebook. Your scripts are conversion-focused, engaging, and optimized for social media algorithms.

TARGET TONE: ${tone.toUpperCase()}
${getToneGuidelines(tone)}

TARGET LENGTH: ${length.toUpperCase()} (${durationRange.min}-${durationRange.max} seconds, ${wordCountRange.min}-${wordCountRange.max} words)
${getLengthGuidelines(length)}

TARGET PLATFORM: ${platform.toUpperCase()}
${getPlatformGuidelines(platform)}

Generate ${count} strategically diverse video ad script variations organized into 4 categories:

**CATEGORY 1: Hook-Focused (3 scripts)**
- Each uses a different hook type: question, shocking-stat, pain-point
- Hook must grab attention in first 3 seconds
- Focus on maximizing hook strength

**CATEGORY 2: Problem-Solution (3 scripts)**
- Identify relatable problem → Present product as solution
- Different angles: identify-relate, before-after, transformation
- Emphasize emotional benefits

**CATEGORY 3: Social Proof (3 scripts)**
- Testimonial style, user statistics, expert endorsement
- Build trust and credibility
- Include specific numbers when possible

**CATEGORY 4: Platform-Optimized (3 scripts)**
- TikTok: Fast-paced, trending, authentic (15-25s)
- Instagram: Aesthetic, aspirational, lifestyle (20-30s)
- YouTube: Educational, detailed, value-driven (30-45s)

Each script must include:
- 15-45 seconds when spoken (varies by platform)
- Strong opening hook (first 3 seconds)
- Clear benefits (not just features)
- Compelling call-to-action
- Conversational, authentic tone
- Simple, engaging language

IMPORTANT: Return ONLY valid JSON. Do not include any text before or after the JSON object.

Return scripts in this EXACT JSON format:
{
  "scripts": [
    {
      "text": "full script text here",
      "style": "problem-solution|testimonial|product-demo|before-after|lifestyle|unboxing",
      "hook_type": "question|shocking-stat|pain-point|aspiration|curiosity",
      "estimated_duration": 30,
      "key_message": "main benefit",
      "cta": "call to action",
      "hook_strength": 8,
      "engagement_prediction": "high",
      "platform_scores": {
        "tiktok": 85,
        "instagram": 75,
        "youtube": 60,
        "facebook": 70
      },
      "pacing": "fast",
      "emotion_level": "energetic",
      "strategy_type": "hook-focused"
    }
  ]
}

IMPORTANT: You must analyze and score each script using these SPECIFIC criteria:

**hook_strength (1-10):** How attention-grabbing is the first 3 seconds?
- 9-10: Shocking, unexpected, or highly relatable opening
- 7-8: Strong question or bold statement
- 5-6: Decent but predictable hook
- 1-4: Weak or slow start

**engagement_prediction:** Based on hooks, pacing, emotional resonance, and watch-through likelihood
- viral-potential: Highly shareable, strong hook, fast pacing, emotional payoff
- high: Good hook, engaging throughout, clear value
- medium: Decent but missing key elements
- low: Slow start or unclear value prop

**Platform Optimization Scores (0-100) - Score based on these SPECIFIC platform requirements:**

TikTok (score based on):
- Duration: 15-30s = 100pts, 31-45s = 80pts, 46s+ = 60pts
- Pacing: Fast = +20pts, Medium = +10pts, Slow = -10pts
- Hook strength: Must be 7+ for high score
- Trending language/relatability: Conversational tone = +10pts
- Music/sound potential: Energetic tone = +10pts

Instagram (score based on):
- Duration: 20-30s = 100pts, 31-45s = 90pts, other = 70pts
- Aesthetic appeal: Lifestyle/aspirational = +15pts
- Visual storytelling: Before/after or transformation = +15pts
- Authenticity: Personal/testimonial style = +10pts
- Hashtag optimization: Clear niche = +10pts

YouTube (score based on):
- Duration: 30-60s = 100pts, 15-29s = 70pts (too short)
- Educational value: Problem-solution = +15pts
- Depth of information: Detailed explanations = +15pts
- Search intent: Clear benefit keywords = +10pts
- Watch time optimization: Strong retention = +10pts

Facebook (score based on):
- Duration: 20-45s = 100pts
- Social proof: Testimonials/stats = +15pts
- Emotional connection: Relatable stories = +15pts
- Share-ability: Inspiring or helpful = +10pts
- Older demographic appeal: Clear, not too trendy = +10pts

**pacing:** fast|medium|slow (information delivery speed)
**emotion_level:** calm|energetic|urgent|aspirational (emotional tone)
**strategy_type:** which category this script belongs to

Calculate scores mathematically based on these criteria and be precise.`;

  // Validate token limits before making request
  const validation = validateTokenLimits(systemPrompt, prompt, 4000, "gpt-4o-mini");
  if (!validation.valid) {
    console.error("[Script Generator] Token limit validation failed:", validation.error);
    throw new Error("Content too long. Please reduce product description length.");
  }

  try {
    // Use optimized OpenAI client with retry logic
    const content = await generateScriptsOptimized(prompt, systemPrompt, {
      temperature: 0.8,
      maxTokens: 4000,
      model: "gpt-4o-mini"
    });

    // Parse the JSON response
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON parsing error. Raw content:", content.substring(0, 200));
      throw new Error("Failed to parse OpenAI response as JSON");
    }
    const scripts: Script[] = parsed.scripts.map((script: any, index: number) => ({
      id: `script-${Date.now()}-${index}`,
      text: script.text,
      style: script.style,
      hook_type: script.hook_type,
      estimated_duration: script.estimated_duration || 30,
      key_message: script.key_message,
      cta: script.cta,
      hook_strength: script.hook_strength || 5,
      engagement_prediction: script.engagement_prediction || 'medium',
      platform_scores: script.platform_scores || {
        tiktok: 50,
        instagram: 50,
        youtube: 50,
        facebook: 50,
      },
      pacing: script.pacing || 'medium',
      emotion_level: script.emotion_level || 'energetic',
      word_count: script.text.split(' ').length,
      strategy_type: script.strategy_type || 'problem-solution',
    }));

    return scripts;
  } catch (error: any) {
    console.error("OpenAI error:", error);

    // Fallback: Return template-based scripts if OpenAI fails
    return generateFallbackScripts(productData);
  }
}

// Helper functions for tone, length, and platform guidelines
function getToneGuidelines(tone: string): string {
  const guidelines = {
    professional: `- Use industry terminology appropriately
- Maintain credibility and authority
- Focus on data, results, and ROI
- Avoid slang or casual language
- Speak to decision-makers and professionals`,

    casual: `- Conversational and relatable language
- Use contractions (you're, it's, we're)
- Natural, authentic voice like talking to a friend
- Include relatable situations and emotions
- Keep it light and approachable`,

    energetic: `- High energy, enthusiastic delivery
- Use exclamation points strategically
- Fast-paced with short punchy sentences
- Create excitement and urgency
- Action-oriented language (grab, discover, transform)`,

    educational: `- Clear, informative explanations
- Focus on how-to and problem-solving
- Use "Here's why" and "Let me show you" language
- Break down complex concepts simply
- Position as helpful expert sharing knowledge`,

    humorous: `- Clever wordplay and wit
- Relatable funny observations
- Light sarcasm or self-deprecating humor
- Don't force jokes - keep it natural
- Balance humor with actual product value`
  };
  return guidelines[tone as keyof typeof guidelines] || guidelines.casual;
}

function getLengthGuidelines(length: string): string {
  const guidelines = {
    short: `- Get to the point IMMEDIATELY
- Single key benefit focus
- Very strong hook (first 2 seconds critical)
- Quick demonstration or proof
- Direct, urgent CTA
- Perfect for TikTok and quick scrollers`,

    medium: `- Hook + 2-3 key benefits
- Time for brief story or demo
- Build some context and emotion
- Show transformation or results
- Works across all platforms
- Balanced depth and engagement`,

    long: `- Detailed storytelling or demonstration
- Multiple benefits and use cases
- Include social proof or testimonials
- Address objections or questions
- Comprehensive value proposition
- Best for YouTube, educational content`
  };
  return guidelines[length as keyof typeof guidelines] || guidelines.medium;
}

function getPlatformGuidelines(platform: string): string {
  const guidelines = {
    tiktok: `- Fast-paced, trend-aware content
- Authentic, unpolished feel (but still high quality)
- Strong hook in first 1-2 seconds
- Use trending sounds/formats when applicable
- Vertical format optimization
- Appeal to Gen Z/Millennial humor and style
- 15-30 seconds ideal`,

    instagram: `- Aesthetic and aspirational
- Lifestyle integration
- High production value feel
- Visual storytelling emphasis
- Use of popular formats (Reels trends)
- Appeal to style-conscious audience
- 20-30 seconds ideal`,

    youtube: `- Educational and value-driven
- Longer form allows for depth
- Clear structure: hook, value, CTA
- Searchable, evergreen content
- Address specific pain points thoroughly
- Professional quality
- 30-60 seconds minimum`,

    facebook: `- Social proof and community focus
- Shareable, relatable content
- Broader age demographic appeal
- Emotional connection and stories
- Clear value proposition
- Works well with testimonials
- 20-45 seconds`,

    all: `- Create versatile scripts that work across platforms
- Balance of energy, value, and authenticity
- Strong universal hooks
- Adaptable pacing
- Broad demographic appeal
- 20-40 seconds for maximum reach`
  };
  return guidelines[platform as keyof typeof guidelines] || guidelines.all;
}

function getDurationRange(length: string): { min: number; max: number } {
  const ranges = {
    short: { min: 15, max: 25 },
    medium: { min: 25, max: 40 },
    long: { min: 40, max: 60 }
  };
  return ranges[length as keyof typeof ranges] || ranges.medium;
}

function getWordCountRange(length: string): { min: number; max: number } {
  const ranges = {
    short: { min: 35, max: 65 },    // ~15-25 seconds at 2.5 words/sec
    medium: { min: 65, max: 100 },  // ~25-40 seconds
    long: { min: 100, max: 150 }    // ~40-60 seconds
  };
  return ranges[length as keyof typeof ranges] || ranges.medium;
}

function buildPrompt(productData: ProductData, options: ScriptGenerationOptions): string {
  const { tone = 'casual', length = 'medium', platform = 'all', count = 12 } = options;

  return `Generate ${count} video ad scripts for this product with SPECIFIC REQUIREMENTS:

**PRODUCT INFORMATION:**
Product Name: ${productData.title}
Description: ${productData.description}
Price: ${productData.price || "Premium pricing"}
Brand: ${productData.brand || "Unknown"}
Key Features: ${productData.features.join(", ") || "High quality product"}

**STRICT REQUIREMENTS:**
1. TONE: ${tone} - Follow the tone guidelines precisely
2. LENGTH: ${length} - Scripts must be ${getDurationRange(length).min}-${getDurationRange(length).max} seconds (${getWordCountRange(length).min}-${getWordCountRange(length).max} words)
3. PLATFORM: ${platform === 'all' ? 'Optimized for all platforms but prioritize versatility' : `Optimized specifically for ${platform.toUpperCase()}`}

**IMPORTANT SCORING ADJUSTMENTS:**
${platform !== 'all' ? `- ${platform} platform_scores should be 85-95 (this is the target platform)
- Other platforms can score lower (60-80) since they're secondary` : '- All platforms should have balanced scores (70-85)'}

Create diverse scripts using different strategic angles while maintaining the specified tone, length, and platform optimization.`;
}

function generateFallbackScripts(productData: ProductData): Script[] {
  const { title, description, price, features } = productData;

  const script1Text = `Tired of products that don't deliver? ${title} is different. ${description.substring(0, 100)}. With ${features[0] || "premium quality"}, you'll finally get the results you deserve. ${price ? `And at ${price}, it's an incredible value.` : ""} Get yours today!`;
  const script2Text = `I was skeptical at first, but ${title} completely changed my mind. ${description.substring(0, 100)}. The ${features[0] || "quality"} is amazing, and ${features[1] || "it works perfectly"}. If you're looking for ${title.toLowerCase()}, this is it.`;
  const script3Text = `Let me show you why everyone's talking about ${title}. First, ${features[0] || "the quality is incredible"}. Then, ${features[1] || "it's so easy to use"}. And the best part? ${features[2] || "It actually works"}. ${price ? `All for just ${price}.` : ""} This is a game-changer.`;

  return [
    {
      id: `script-${Date.now()}-1`,
      text: script1Text,
      style: "problem-solution",
      hook_type: "pain-point",
      estimated_duration: 30,
      key_message: "Solves a real problem with quality",
      cta: "Get yours today",
      hook_strength: 7,
      engagement_prediction: "medium" as const,
      platform_scores: { tiktok: 75, instagram: 70, youtube: 60, facebook: 70 },
      pacing: "fast" as const,
      emotion_level: "urgent" as const,
      word_count: script1Text.split(' ').length,
      strategy_type: "problem-solution" as const,
    },
    {
      id: `script-${Date.now()}-2`,
      text: script2Text,
      style: "testimonial",
      hook_type: "personal-story",
      estimated_duration: 25,
      key_message: "Authentic personal recommendation",
      cta: "Try it yourself",
      hook_strength: 6,
      engagement_prediction: "medium" as const,
      platform_scores: { tiktok: 70, instagram: 80, youtube: 65, facebook: 75 },
      pacing: "medium" as const,
      emotion_level: "calm" as const,
      word_count: script2Text.split(' ').length,
      strategy_type: "social-proof" as const,
    },
    {
      id: `script-${Date.now()}-3`,
      text: script3Text,
      style: "product-demo",
      hook_type: "curiosity",
      estimated_duration: 30,
      key_message: "Demonstrates key features",
      cta: "Get yours now",
      hook_strength: 8,
      engagement_prediction: "high" as const,
      platform_scores: { tiktok: 85, instagram: 75, youtube: 80, facebook: 70 },
      pacing: "fast" as const,
      emotion_level: "energetic" as const,
      word_count: script3Text.split(' ').length,
      strategy_type: "hook-focused" as const,
    },
  ];
}
