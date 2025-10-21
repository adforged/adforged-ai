"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3x3, List, GitCompare, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list" | "compare";
export type SortOption = "engagement" | "hook-strength" | "duration" | "platform-match";
export type StrategyFilter = "all" | "hook-focused" | "problem-solution" | "social-proof" | "platform-optimized";

interface ScriptFiltersProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  strategyFilter: StrategyFilter;
  onStrategyFilterChange: (filter: StrategyFilter) => void;
  platformFilter?: string;
  onPlatformFilterChange?: (platform: string) => void;
  totalScripts: number;
  filteredCount: number;
  onGenerateMore?: () => void;
  isGenerating?: boolean;
}

export function ScriptFilters({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  strategyFilter,
  onStrategyFilterChange,
  platformFilter = "all",
  onPlatformFilterChange,
  totalScripts,
  filteredCount,
  onGenerateMore,
  isGenerating = false,
}: ScriptFiltersProps) {
  const strategyOptions: { value: StrategyFilter; label: string; emoji: string }[] = [
    { value: "all", label: "All Strategies", emoji: "🎯" },
    { value: "hook-focused", label: "Hook-Focused", emoji: "🎣" },
    { value: "problem-solution", label: "Problem-Solution", emoji: "💡" },
    { value: "social-proof", label: "Social Proof", emoji: "⭐" },
    { value: "platform-optimized", label: "Platform-Optimized", emoji: "📱" },
  ];

  const platformOptions = [
    { value: "all", label: "All Platforms", emoji: "🎬" },
    { value: "tiktok", label: "TikTok", emoji: "📱" },
    { value: "instagram", label: "Instagram", emoji: "📸" },
    { value: "youtube", label: "YouTube", emoji: "▶️" },
    { value: "facebook", label: "Facebook", emoji: "👥" },
  ];

  const hasActiveFilters = strategyFilter !== "all" || platformFilter !== "all";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      {/* Top row: View modes and results count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Showing {filteredCount} of {totalScripts} scripts
          </span>
          {hasActiveFilters && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                onStrategyFilterChange("all");
                onPlatformFilterChange?.("all");
              }}
              className="h-7 px-2 text-xs text-gray-600"
            >
              <X className="w-3 h-3 mr-1" />
              Clear filters
            </Button>
          )}
        </div>

        {/* View mode toggles */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Button
            size="sm"
            variant={viewMode === "grid" ? "default" : "ghost"}
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "h-8 px-3",
              viewMode === "grid" && "bg-white shadow-sm"
            )}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === "list" ? "default" : "ghost"}
            onClick={() => onViewModeChange("list")}
            className={cn(
              "h-8 px-3",
              viewMode === "list" && "bg-white shadow-sm"
            )}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === "compare" ? "default" : "ghost"}
            onClick={() => onViewModeChange("compare")}
            className={cn(
              "h-8 px-3",
              viewMode === "compare" && "bg-white shadow-sm"
            )}
          >
            <GitCompare className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter chips row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Strategy filters */}
        <div className="flex items-center gap-2">
          {strategyOptions.map((option) => (
            <Badge
              key={option.value}
              variant={strategyFilter === option.value ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all px-3 py-1",
                strategyFilter === option.value
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "hover:bg-gray-100"
              )}
              onClick={() => onStrategyFilterChange(option.value)}
            >
              <span className="mr-1">{option.emoji}</span>
              {option.label}
              {option.value !== "all" && strategyFilter === option.value && (
                <span className="ml-2 text-xs opacity-80">
                  ({/* Count would go here */})
                </span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Bottom row: Sort and platform filter */}
      <div className="flex items-center gap-3">
        {/* Sort by */}
        <div className="flex-1">
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="z-[200]">
              <SelectItem value="engagement">
                📊 Highest Engagement Prediction
              </SelectItem>
              <SelectItem value="hook-strength">
                ⚡ Best Hook Strength
              </SelectItem>
              <SelectItem value="duration">
                ⏱️ Shortest Duration
              </SelectItem>
              <SelectItem value="platform-match">
                🎯 Best Platform Match
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Platform filter */}
        {onPlatformFilterChange && (
          <div className="flex-1">
            <Select
              value={platformFilter}
              onValueChange={onPlatformFilterChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by platform" />
              </SelectTrigger>
              <SelectContent className="z-[200]">
                {platformOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.emoji} {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Generate more button */}
        <Button
          variant="outline"
          size="sm"
          className="whitespace-nowrap"
          onClick={onGenerateMore}
          disabled={isGenerating}
        >
          <span className="mr-1">✨</span>
          {isGenerating ? "Generating..." : "Generate 3 More"}
        </Button>
      </div>
    </div>
  );
}
