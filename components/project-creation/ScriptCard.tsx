"use client";

import { Script } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  Copy,
  Edit
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScriptCardProps {
  script: Script;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}

export function ScriptCard({ script, selected, onSelect, compact = false }: ScriptCardProps) {
  // Color coding for engagement prediction
  const engagementColors = {
    low: "text-gray-500 bg-gray-100",
    medium: "text-blue-600 bg-blue-100",
    high: "text-green-600 bg-green-100",
    "viral-potential": "text-purple-600 bg-purple-100",
  };

  // Get hook strength color
  const getHookStrengthColor = (strength: number) => {
    if (strength >= 8) return "text-green-600";
    if (strength >= 6) return "text-blue-600";
    return "text-gray-600";
  };

  // Get platform icon/emoji
  const getPlatformEmoji = (platform: string) => {
    switch (platform) {
      case "tiktok": return "📱";
      case "instagram": return "📸";
      case "youtube": return "▶️";
      case "facebook": return "👥";
      default: return "🎬";
    }
  };

  // Get best platform
  const bestPlatform = Object.entries(script.platform_scores)
    .sort(([, a], [, b]) => b - a)[0];

  // Get emotion emoji
  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case "energetic": return "⚡";
      case "urgent": return "🔥";
      case "aspirational": return "✨";
      case "calm": return "🌊";
      default: return "💫";
    }
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative rounded-xl border-2 cursor-pointer transition-all duration-200",
        "hover:shadow-lg hover:scale-[1.01]",
        selected
          ? "border-violet-600 bg-violet-50 shadow-md"
          : "border-gray-200 hover:border-violet-300 bg-white"
      )}
    >
      {/* Selection indicator */}
      <div className="absolute top-4 right-4">
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            selected
              ? "border-violet-600 bg-violet-600"
              : "border-gray-300 bg-white"
          )}
        >
          {selected && (
            <div className="w-3 h-3 bg-white rounded-full"></div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Header with badges */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="capitalize">
                {script.style.replace('-', ' ')}
              </Badge>
              <Badge
                variant="secondary"
                className={cn("capitalize", engagementColors[script.engagement_prediction])}
              >
                {script.engagement_prediction === "viral-potential"
                  ? "🚀 Viral Potential"
                  : script.engagement_prediction}
              </Badge>
            </div>
          </div>
        </div>

        {/* Metrics row */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          {/* Hook strength */}
          <div className="flex items-center gap-1.5">
            <Zap className={cn("w-4 h-4", getHookStrengthColor(script.hook_strength))} />
            <span className="text-gray-600">Hook:</span>
            <span className={cn("font-semibold", getHookStrengthColor(script.hook_strength))}>
              {script.hook_strength}/10
            </span>
          </div>

          {/* Best platform */}
          <div className="flex items-center gap-1.5">
            <span>{getPlatformEmoji(bestPlatform[0])}</span>
            <span className="text-gray-600">Best for:</span>
            <span className="font-semibold capitalize">{bestPlatform[0]}</span>
            <span className="text-violet-600 font-semibold">{bestPlatform[1]}%</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{script.estimated_duration}s</span>
          </div>
        </div>

        {/* Script text */}
        <div className="mb-4">
          <p className={cn(
            "text-gray-700 leading-relaxed",
            compact ? "line-clamp-3" : ""
          )}>
            <span className="font-semibold text-violet-600">{script.text.split('.')[0]}.</span>
            {script.text.substring(script.text.indexOf('.') + 1)}
          </p>
        </div>

        {/* Additional metadata */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            {getEmotionEmoji(script.emotion_level)}
            <span className="capitalize">{script.emotion_level}</span>
          </span>
          <span>•</span>
          <span className="capitalize">{script.pacing} paced</span>
          <span>•</span>
          <span>{script.word_count} words</span>
          <span>•</span>
          <span className="capitalize">{script.hook_type.replace('-', ' ')} hook</span>
        </div>

        {/* Strategy type badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500 capitalize">
              {script.strategy_type.replace('-', ' ')} strategy
            </span>
          </div>

          {/* Quick actions (show on hover) */}
          {!compact && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement edit
                }}
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement duplicate
                }}
              >
                <Copy className="w-3 h-3 mr-1" />
                Duplicate
              </Button>
            </div>
          )}
        </div>

        {/* Platform scores breakdown with explanations (shown in expanded view) */}
        {selected && !compact && (
          <div className="mt-4 pt-4 border-t border-violet-200">
            <p className="text-xs font-medium text-gray-600 mb-3">
              📊 Platform Optimization Analysis
            </p>
            <div className="space-y-3">
              {Object.entries(script.platform_scores).map(([platform, score]) => {
                const reasons = getScoreReasons(platform, score, script);
                return (
                  <div key={platform} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{getPlatformEmoji(platform)}</span>
                        <span className="text-sm font-semibold capitalize text-gray-700">
                          {platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={cn(
                              "h-1.5 rounded-full transition-all",
                              score >= 80 ? "bg-green-500" : score >= 60 ? "bg-blue-500" : "bg-yellow-500"
                            )}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700 w-10 text-right">
                          {score}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {reasons}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs text-blue-800">
                💡 <strong>Tip:</strong> Scores are based on platform-specific best practices including
                duration, pacing, hook strength, and content style.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Best performer badge */}
      {script.engagement_prediction === "viral-potential" && (
        <div className="absolute -top-2 left-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3" />
            Top Pick
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to explain platform scores
function getScoreReasons(platform: string, score: number, script: Script): string {
  const duration = script.estimated_duration;
  const pacing = script.pacing;
  const hookStrength = script.hook_strength;
  const style = script.style;
  const emotion = script.emotion_level;

  const reasons: string[] = [];

  switch (platform) {
    case "tiktok":
      if (duration <= 30) {
        reasons.push("✅ Perfect length (15-30s)");
      } else if (duration <= 45) {
        reasons.push("⚠️ Slightly long (31-45s)");
      } else {
        reasons.push("❌ Too long for TikTok (46s+)");
      }

      if (pacing === "fast") {
        reasons.push("✅ Fast pacing matches TikTok's style");
      } else if (pacing === "medium") {
        reasons.push("⚠️ Medium pacing, faster would be better");
      }

      if (hookStrength >= 7) {
        reasons.push("✅ Strong hook for scroll-stopping");
      } else {
        reasons.push("❌ Weak hook, may get scrolled past");
      }

      if (emotion === "energetic" || emotion === "urgent") {
        reasons.push("✅ Energetic tone resonates well");
      }
      break;

    case "instagram":
      if (duration >= 20 && duration <= 30) {
        reasons.push("✅ Ideal duration (20-30s)");
      } else if (duration <= 45) {
        reasons.push("⚠️ Acceptable length");
      } else {
        reasons.push("❌ Too long for Reels");
      }

      if (style === "lifestyle" || style === "before-after" || emotion === "aspirational") {
        reasons.push("✅ Aesthetic/aspirational style fits Instagram");
      }

      if (style === "testimonial") {
        reasons.push("✅ Authentic testimonials perform well");
      }

      if (hookStrength >= 6) {
        reasons.push("✅ Good visual hook potential");
      }
      break;

    case "youtube":
      if (duration >= 30 && duration <= 60) {
        reasons.push("✅ Optimal length (30-60s)");
      } else if (duration < 30) {
        reasons.push("❌ Too short for YouTube Shorts");
      } else {
        reasons.push("⚠️ Long but acceptable");
      }

      if (style === "problem-solution" || style === "product-demo") {
        reasons.push("✅ Educational value drives retention");
      }

      if (script.word_count > 80) {
        reasons.push("✅ Detailed content, good for search");
      } else {
        reasons.push("⚠️ More detail would improve SEO");
      }
      break;

    case "facebook":
      if (duration >= 20 && duration <= 45) {
        reasons.push("✅ Good length (20-45s)");
      }

      if (style === "testimonial" || style.includes("social")) {
        reasons.push("✅ Social proof resonates with FB audience");
      }

      if (emotion === "aspirational" || emotion === "calm") {
        reasons.push("✅ Emotional connection fits demographic");
      }

      if (pacing !== "fast") {
        reasons.push("✅ Pacing suits older demographic");
      }
      break;
  }

  if (reasons.length === 0) {
    reasons.push("Standard optimization for this platform");
  }

  return reasons.join(" • ");
}
