"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VOICES, getVoicesByFilter, getLanguages } from "@/data/voices";
import { Search, Filter, Play, Volume2, Globe, Star } from "lucide-react";
import type { Voice, VoiceFilters } from "@/types";

export default function VoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<VoiceFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const filteredVoices = getVoicesByFilter({
    ...filters,
    search: searchQuery,
  });

  const languages = getLanguages();

  const handleFilterChange = (key: keyof VoiceFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const handlePlayPreview = (voiceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Play audio preview
    setPlayingVoice(voiceId);
    setTimeout(() => setPlayingVoice(null), 2000); // Simulate 2s audio playback
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Voice Library</h1>
        <p className="text-gray-600">
          Choose from {VOICES.length}+ natural voices in {languages.length} languages
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search voices by name, language, or style..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={filters.language || "all"}
                onChange={(e) => handleFilterChange("language", e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none"
              >
                <option value="all">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={filters.gender || "all"}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <select
                value={filters.style || "all"}
                onChange={(e) => handleFilterChange("style", e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none"
              >
                <option value="all">All Styles</option>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="energetic">Energetic</option>
                <option value="calm">Calm</option>
                <option value="authoritative">Authoritative</option>
                <option value="warm">Warm</option>
                <option value="conversational">Conversational</option>
                <option value="dramatic">Dramatic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tier
              </label>
              <select
                value={filters.tier || "all"}
                onChange={(e) => handleFilterChange("tier", e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none"
              >
                <option value="all">All Tiers</option>
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div className="md:col-span-4 flex justify-between items-center pt-2">
              <p className="text-sm text-gray-600">
                Showing {filteredVoices.length} voices
              </p>
              <Button variant="ghost" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Voice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVoices.map((voice) => (
          <div
            key={voice.id}
            className="bg-white rounded-xl border-2 border-gray-200 hover:border-violet-500 transition-all cursor-pointer p-6"
            onClick={() => setSelectedVoice(voice)}
          >
            {/* Voice Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{voice.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="w-3 h-3 mr-1" />
                    {voice.language}
                  </div>
                </div>
              </div>
              {voice.tier !== "free" && (
                <div className="bg-violet-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  {voice.tier}
                </div>
              )}
            </div>

            {/* Voice Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <span className="text-gray-600 w-20">Accent:</span>
                <span className="text-gray-900">{voice.accent}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-600 w-20">Gender:</span>
                <span className="text-gray-900 capitalize">{voice.gender}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-600 w-20">Style:</span>
                <span className="text-gray-900 capitalize">{voice.style}</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-4">{voice.description}</p>

            {/* Play Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={(e) => handlePlayPreview(voice.id, e)}
              disabled={playingVoice === voice.id}
            >
              {playingVoice === voice.id ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                  Playing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Preview Voice
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVoices.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No voices found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Voice Preview Modal */}
      {selectedVoice && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setSelectedVoice(null)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-white rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedVoice.name}
                </h2>
                <p className="text-gray-600 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {selectedVoice.language} ({selectedVoice.accent})
                </p>
              </div>
              <button
                onClick={() => setSelectedVoice(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Audio Preview */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-8 text-center border border-violet-200">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="w-10 h-10 text-white" />
                </div>
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={(e) => handlePlayPreview(selectedVoice.id, e)}
                  disabled={playingVoice === selectedVoice.id}
                  className="mb-2"
                >
                  {playingVoice === selectedVoice.id ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Playing Preview...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Play Voice Sample
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-600">
                  Listen to how this voice sounds
                </p>
              </div>

              {/* Voice Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Language</h3>
                  <p className="text-gray-700">{selectedVoice.language}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Accent</h3>
                  <p className="text-gray-700">{selectedVoice.accent}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gender</h3>
                  <p className="text-gray-700 capitalize">{selectedVoice.gender}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Age</h3>
                  <p className="text-gray-700 capitalize">{selectedVoice.age}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Style</h3>
                <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm capitalize">
                  {selectedVoice.style}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedVoice.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Provider</h3>
                <p className="text-gray-700 capitalize">{selectedVoice.provider}</p>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={() => {
                    // TODO: Add to project
                    setSelectedVoice(null);
                  }}
                >
                  Use This Voice
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
