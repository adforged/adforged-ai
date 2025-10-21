"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Edit3,
  Save,
  RotateCcw,
  Sparkles,
  Clock,
  Type,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { Script } from "@/types";

interface ScriptEditorProps {
  script: Script;
  onSave: (editedScript: Script) => void;
  onCancel?: () => void;
  mode?: "edit" | "create";
}

export default function ScriptEditor({
  script: initialScript,
  onSave,
  onCancel,
  mode = "edit",
}: ScriptEditorProps) {
  const [isEditing, setIsEditing] = useState(mode === "create");
  const [editedText, setEditedText] = useState(initialScript.text);
  const [originalText] = useState(initialScript.text);
  const [hasChanges, setHasChanges] = useState(false);

  // Calculate real-time metrics
  const wordCount = editedText.trim().split(/\s+/).length;
  const estimatedDuration = Math.ceil(wordCount / 2.5); // ~150 words per minute = 2.5 words per second
  const charCount = editedText.length;

  useEffect(() => {
    setHasChanges(editedText !== originalText);
  }, [editedText, originalText]);

  const handleSave = () => {
    const updatedScript: Script = {
      ...initialScript,
      text: editedText,
      word_count: wordCount,
      estimated_duration: estimatedDuration,
    };
    onSave(updatedScript);
    setIsEditing(false);
  };

  const handleReset = () => {
    setEditedText(originalText);
    setHasChanges(false);
  };

  const handleAIEnhance = async () => {
    // TODO: Call OpenAI to enhance/improve the script
    // For now, just show a placeholder
    alert("AI Enhancement coming soon! This will use GPT-4 to improve your script.");
  };

  if (!isEditing && mode === "edit") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Selected Script</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Script
          </Button>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-lg p-6">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {editedText}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Type className="w-4 h-4" />
            {wordCount} words
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            ~{estimatedDuration}s
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-violet-600" />
            {mode === "create" ? "Write Your Script" : "Edit Script"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Create your own script from scratch or use AI recommendations as a starting point"
              : "Customize the AI-generated script to match your vision"
            }
          </p>
        </div>
        {hasChanges && (
          <Badge variant="secondary" className="animate-pulse">
            Unsaved changes
          </Badge>
        )}
      </div>

      {/* Editor Textarea */}
      <div className="relative">
        <Textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          placeholder={mode === "create"
            ? "Start typing your script here... Think about:\n\n1. Hook (first 3 seconds)\n2. Problem/Pain point\n3. Solution/Benefit\n4. Call to action\n\nKeep it concise and engaging!"
            : "Edit your script..."
          }
          className="min-h-[300px] text-base leading-relaxed resize-none font-mono"
        />

        {/* Character count overlay */}
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
          {charCount} characters
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-700 mb-1">
            <Type className="w-4 h-4" />
            <span className="text-xs font-semibold">Words</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{wordCount}</p>
          <p className="text-xs text-blue-600">
            {wordCount < 50 ? "Too short" : wordCount > 200 ? "Consider shortening" : "Good length"}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-green-700 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold">Duration</span>
          </div>
          <p className="text-2xl font-bold text-green-900">~{estimatedDuration}s</p>
          <p className="text-xs text-green-600">
            {estimatedDuration < 15 ? "Very short" : estimatedDuration > 90 ? "Too long" : "Perfect"}
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-purple-700 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-semibold">Readability</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">
            {wordCount > 0 ? Math.round((wordCount / estimatedDuration) * 10) / 10 : 0} wpm
          </p>
          <p className="text-xs text-purple-600">Words per second</p>
        </div>
      </div>

      {/* AI Tips */}
      {mode === "create" && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Script Writing Tips
          </h4>
          <ul className="space-y-1 text-sm text-amber-800">
            <li>• <strong>Hook (0-3s):</strong> Grab attention immediately with a question, stat, or bold claim</li>
            <li>• <strong>Problem (3-10s):</strong> Identify the pain point your audience faces</li>
            <li>• <strong>Solution (10-25s):</strong> Show how your product solves it uniquely</li>
            <li>• <strong>CTA (25-30s):</strong> Clear call to action - what should they do next?</li>
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleAIEnhance}
            className="border-violet-300 text-violet-700 hover:bg-violet-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Enhance
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <Button
            onClick={handleSave}
            disabled={editedText.trim().length < 10}
            className="bg-gradient-to-r from-violet-600 to-purple-600"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Save Script
          </Button>
        </div>
      </div>
    </div>
  );
}
