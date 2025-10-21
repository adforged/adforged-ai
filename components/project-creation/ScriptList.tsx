"use client";

import { Script } from "@/types";
import { ScriptCard } from "./ScriptCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Clock, TrendingUp } from "lucide-react";

export type ViewMode = "grid" | "list" | "compare";

interface ScriptListProps {
  scripts: Script[];
  selectedIndex: number;
  onSelectScript: (index: number) => void;
  viewMode?: ViewMode;
  compareIndices?: [number, number];
  onCompareIndicesChange?: (indices: [number, number]) => void;
}

export function ScriptList({
  scripts,
  selectedIndex,
  onSelectScript,
  viewMode = "grid",
  compareIndices = [0, 1],
  onCompareIndicesChange,
}: ScriptListProps) {
  // Grid view
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scripts.map((script, index) => (
          <ScriptCard
            key={script.id}
            script={script}
            selected={selectedIndex === index}
            onSelect={() => onSelectScript(index)}
          />
        ))}
      </div>
    );
  }

  // List view
  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {scripts.map((script, index) => (
          <ScriptCard
            key={script.id}
            script={script}
            selected={selectedIndex === index}
            onSelect={() => onSelectScript(index)}
            compact={false}
          />
        ))}
      </div>
    );
  }

  // Compare view
  if (viewMode === "compare") {
    const [indexA, indexB] = compareIndices;
    const scriptA = scripts[indexA];
    const scriptB = scripts[indexB];

    if (!scriptA || !scriptB) {
      return (
        <div className="text-center py-12 text-gray-500">
          Please select two scripts to compare
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Comparison selectors */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Script A
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={indexA}
              onChange={(e) =>
                onCompareIndicesChange?.([parseInt(e.target.value), indexB])
              }
            >
              {scripts.map((script, index) => (
                <option key={script.id} value={index}>
                  {script.style} - {script.hook_type} ({script.estimated_duration}s)
                </option>
              ))}
            </select>
          </div>

          <div className="text-2xl font-bold text-violet-600">VS</div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Script B
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={indexB}
              onChange={(e) =>
                onCompareIndicesChange?.([indexA, parseInt(e.target.value)])
              }
            >
              {scripts.map((script, index) => (
                <option key={script.id} value={index}>
                  {script.style} - {script.hook_type} ({script.estimated_duration}s)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-side cards */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <ScriptCard
              script={scriptA}
              selected={selectedIndex === indexA}
              onSelect={() => onSelectScript(indexA)}
            />
          </div>
          <div>
            <ScriptCard
              script={scriptB}
              selected={selectedIndex === indexB}
              onSelect={() => onSelectScript(indexB)}
            />
          </div>
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Metric
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                  Script A
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                  Script B
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                  Winner
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Hook Strength */}
              <ComparisonRow
                label="Hook Strength"
                icon={<Zap className="w-4 h-4" />}
                valueA={`${scriptA.hook_strength}/10`}
                valueB={`${scriptB.hook_strength}/10`}
                winner={scriptA.hook_strength > scriptB.hook_strength ? "a" : scriptB.hook_strength > scriptA.hook_strength ? "b" : "tie"}
              />

              {/* Engagement Prediction */}
              <ComparisonRow
                label="Engagement Prediction"
                icon={<TrendingUp className="w-4 h-4" />}
                valueA={
                  <Badge
                    variant="secondary"
                    className={getEngagementColor(scriptA.engagement_prediction)}
                  >
                    {scriptA.engagement_prediction}
                  </Badge>
                }
                valueB={
                  <Badge
                    variant="secondary"
                    className={getEngagementColor(scriptB.engagement_prediction)}
                  >
                    {scriptB.engagement_prediction}
                  </Badge>
                }
                winner={
                  getEngagementScore(scriptA.engagement_prediction) >
                  getEngagementScore(scriptB.engagement_prediction)
                    ? "a"
                    : getEngagementScore(scriptB.engagement_prediction) >
                      getEngagementScore(scriptA.engagement_prediction)
                    ? "b"
                    : "tie"
                }
              />

              {/* Duration */}
              <ComparisonRow
                label="Duration"
                icon={<Clock className="w-4 h-4" />}
                valueA={`${scriptA.estimated_duration}s`}
                valueB={`${scriptB.estimated_duration}s`}
                winner={scriptA.estimated_duration < scriptB.estimated_duration ? "a" : scriptB.estimated_duration < scriptA.estimated_duration ? "b" : "tie"}
                reverseWinner={true}
              />

              {/* Platform Scores */}
              {["tiktok", "instagram", "youtube", "facebook"].map((platform) => (
                <ComparisonRow
                  key={platform}
                  label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Score`}
                  valueA={`${scriptA.platform_scores[platform as keyof typeof scriptA.platform_scores]}%`}
                  valueB={`${scriptB.platform_scores[platform as keyof typeof scriptB.platform_scores]}%`}
                  winner={
                    scriptA.platform_scores[platform as keyof typeof scriptA.platform_scores] >
                    scriptB.platform_scores[platform as keyof typeof scriptB.platform_scores]
                      ? "a"
                      : scriptB.platform_scores[platform as keyof typeof scriptB.platform_scores] >
                        scriptA.platform_scores[platform as keyof typeof scriptA.platform_scores]
                      ? "b"
                      : "tie"
                  }
                />
              ))}

              {/* Pacing */}
              <ComparisonRow
                label="Pacing"
                valueA={<span className="capitalize">{scriptA.pacing}</span>}
                valueB={<span className="capitalize">{scriptB.pacing}</span>}
                winner="tie"
              />

              {/* Emotion Level */}
              <ComparisonRow
                label="Emotion Level"
                valueA={<span className="capitalize">{scriptA.emotion_level}</span>}
                valueB={<span className="capitalize">{scriptB.emotion_level}</span>}
                winner="tie"
              />

              {/* Word Count */}
              <ComparisonRow
                label="Word Count"
                valueA={`${scriptA.word_count} words`}
                valueB={`${scriptB.word_count} words`}
                winner={scriptA.word_count < scriptB.word_count ? "a" : scriptB.word_count < scriptA.word_count ? "b" : "tie"}
                reverseWinner={true}
              />
            </tbody>
          </table>
        </div>

        {/* Quick action to select one */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={selectedIndex === indexA ? "default" : "outline"}
            onClick={() => onSelectScript(indexA)}
          >
            Select Script A
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant={selectedIndex === indexB ? "default" : "outline"}
            onClick={() => onSelectScript(indexB)}
          >
            Select Script B
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

// Helper component for comparison rows
function ComparisonRow({
  label,
  icon,
  valueA,
  valueB,
  winner,
  reverseWinner = false,
}: {
  label: string;
  icon?: React.ReactNode;
  valueA: React.ReactNode;
  valueB: React.ReactNode;
  winner: "a" | "b" | "tie";
  reverseWinner?: boolean;
}) {
  return (
    <tr>
      <td className="px-4 py-3 text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
      </td>
      <td
        className={cn(
          "px-4 py-3 text-center text-sm",
          winner === "a" && !reverseWinner && "bg-green-50 font-semibold text-green-700"
        )}
      >
        {valueA}
      </td>
      <td
        className={cn(
          "px-4 py-3 text-center text-sm",
          winner === "b" && !reverseWinner && "bg-green-50 font-semibold text-green-700"
        )}
      >
        {valueB}
      </td>
      <td className="px-4 py-3 text-center text-sm">
        {winner === "a" && !reverseWinner && "✅ A"}
        {winner === "b" && !reverseWinner && "✅ B"}
        {winner === "tie" && "—"}
      </td>
    </tr>
  );
}

// Helper functions
function getEngagementColor(level: string) {
  switch (level) {
    case "low":
      return "text-gray-600 bg-gray-100";
    case "medium":
      return "text-blue-600 bg-blue-100";
    case "high":
      return "text-green-600 bg-green-100";
    case "viral-potential":
      return "text-purple-600 bg-purple-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}

function getEngagementScore(level: string): number {
  switch (level) {
    case "low":
      return 1;
    case "medium":
      return 2;
    case "high":
      return 3;
    case "viral-potential":
      return 4;
    default:
      return 0;
  }
}
