"use client";

import { Button } from "@/components/ui/button";
import { Sliders, Sparkles } from "lucide-react";
import { useState } from "react";

export interface ScriptOptions {
  tone: 'professional' | 'casual' | 'energetic' | 'educational' | 'humorous';
  length: 'short' | 'medium' | 'long';
  platform: 'tiktok' | 'instagram' | 'youtube' | 'facebook' | 'all';
}

interface ScriptGenerationOptionsProps {
  onOptionsChange: (options: ScriptOptions) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

export default function ScriptGenerationOptions({
  onOptionsChange,
  onGenerate,
  isGenerating = false
}: ScriptGenerationOptionsProps) {
  const [tone, setTone] = useState<ScriptOptions['tone']>('casual');
  const [length, setLength] = useState<ScriptOptions['length']>('medium');
  const [platform, setPlatform] = useState<ScriptOptions['platform']>('all');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleToneChange = (newTone: ScriptOptions['tone']) => {
    setTone(newTone);
    onOptionsChange({ tone: newTone, length, platform });
  };

  const handleLengthChange = (newLength: ScriptOptions['length']) => {
    setLength(newLength);
    onOptionsChange({ tone, length: newLength, platform });
  };

  const handlePlatformChange = (newPlatform: ScriptOptions['platform']) => {
    setPlatform(newPlatform);
    onOptionsChange({ tone, length, platform: newPlatform });
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">AI Script Customization</h3>
            <p className="text-sm text-gray-600">Fine-tune your script generation</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-violet-600 hover:text-violet-700"
        >
          <Sliders className="w-4 h-4 mr-2" />
          {showAdvanced ? 'Hide' : 'Show'} Options
        </Button>
      </div>

      {showAdvanced && (
        <div className="space-y-6 pt-4 border-t border-violet-200">
          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Tone & Style
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['professional', 'casual', 'energetic', 'educational', 'humorous'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => handleToneChange(t)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    tone === t
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {tone === 'professional' && '📊 Authority-driven, data-focused, credible'}
              {tone === 'casual' && '💬 Conversational, relatable, friendly'}
              {tone === 'energetic' && '⚡ High-energy, exciting, action-packed'}
              {tone === 'educational' && '📚 Informative, helpful, expert guidance'}
              {tone === 'humorous' && '😄 Witty, entertaining, light-hearted'}
            </p>
          </div>

          {/* Length Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Video Length
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['short', 'medium', 'long'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLengthChange(l)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    length === l
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="font-bold">{l.charAt(0).toUpperCase() + l.slice(1)}</div>
                  <div className="text-xs opacity-90 mt-1">
                    {l === 'short' && '15-25s • Quick'}
                    {l === 'medium' && '25-40s • Balanced'}
                    {l === 'long' && '40-60s • Detailed'}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {length === 'short' && '⚡ Fast-paced, single benefit focus, perfect for TikTok'}
              {length === 'medium' && '⚖️ Balanced storytelling, works across all platforms'}
              {length === 'long' && '📖 Detailed demonstration, best for YouTube & education'}
            </p>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Target Platform
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['all', 'tiktok', 'instagram', 'youtube', 'facebook'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePlatformChange(p)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    platform === p
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {p === 'all' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {platform === 'all' && '🌐 Versatile scripts optimized for maximum reach'}
              {platform === 'tiktok' && '🎵 Fast-paced, trend-aware, authentic feel'}
              {platform === 'instagram' && '📸 Aesthetic, aspirational, lifestyle-focused'}
              {platform === 'youtube' && '🎥 Educational, detailed, value-driven'}
              {platform === 'facebook' && '👥 Social proof, community-focused, shareable'}
            </p>
          </div>

          {/* Generate Button */}
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 py-6 text-base font-semibold"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Regenerating AI Scripts...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Regenerate Scripts with These Settings
              </>
            )}
          </Button>

          {/* Preview Summary */}
          <div className="bg-white rounded-lg p-4 border border-violet-200">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Generation Preview:</h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p>✨ <strong>Tone:</strong> {tone.charAt(0).toUpperCase() + tone.slice(1)}</p>
              <p>⏱️ <strong>Duration:</strong> {
                length === 'short' ? '15-25 seconds' :
                length === 'medium' ? '25-40 seconds' :
                '40-60 seconds'
              }</p>
              <p>📱 <strong>Platform:</strong> {
                platform === 'all' ? 'All platforms' :
                platform.charAt(0).toUpperCase() + platform.slice(1)
              }</p>
              <p>📊 <strong>Scripts:</strong> 12 diverse variations</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
