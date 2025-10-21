"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AVATARS, getAvatarsByFilter } from "@/data/avatars";
import { Search, Filter, Play, Star } from "lucide-react";
import type { Avatar, AvatarFilters } from "@/types";

export default function AvatarsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AvatarFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const filteredAvatars = getAvatarsByFilter({
    ...filters,
    search: searchQuery,
  });

  const handleFilterChange = (key: keyof AvatarFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Avatar Library</h1>
        <p className="text-gray-600">
          Choose from {AVATARS.length}+ diverse AI avatars for your videos
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
              placeholder="Search avatars by name, style, or tags..."
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
                <option value="non-binary">Non-binary</option>
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
                <option value="casual">Casual</option>
                <option value="athletic">Athletic</option>
                <option value="elegant">Elegant</option>
                <option value="creative">Creative</option>
                <option value="tech">Tech</option>
                <option value="medical">Medical</option>
                <option value="business">Business</option>
                <option value="influencer">Influencer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range
              </label>
              <select
                value={filters.age_range || "all"}
                onChange={(e) => handleFilterChange("age_range", e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none"
              >
                <option value="all">All Ages</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>
                <option value="46-55">46-55</option>
                <option value="56+">56+</option>
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
                Showing {filteredAvatars.length} avatars
              </p>
              <Button variant="ghost" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Avatar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAvatars.map((avatar) => (
          <div
            key={avatar.id}
            className="bg-white rounded-xl border-2 border-gray-200 hover:border-violet-500 transition-all cursor-pointer overflow-hidden group"
            onClick={() => setSelectedAvatar(avatar)}
          >
            {/* Avatar Image */}
            <div className="relative aspect-square bg-gradient-to-br from-violet-100 to-purple-100">
              <img
                src={avatar.thumbnail_url}
                alt={avatar.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
              {avatar.tier !== "free" && (
                <div className="absolute top-2 right-2 bg-violet-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  {avatar.tier}
                </div>
              )}
            </div>

            {/* Avatar Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{avatar.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {avatar.gender} • {avatar.age_range}
              </p>
              <p className="text-xs text-gray-500 mb-3">{avatar.sample_text}</p>
              <div className="flex flex-wrap gap-1">
                {avatar.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAvatars.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No avatars found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Avatar Preview Modal */}
      {selectedAvatar && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setSelectedAvatar(null)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-white rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedAvatar.name}
                </h2>
                <p className="text-gray-600">
                  {selectedAvatar.gender} • {selectedAvatar.age_range} •{" "}
                  {selectedAvatar.ethnicity}
                </p>
              </div>
              <button
                onClick={() => setSelectedAvatar(null)}
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

            <div className="aspect-video bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center">
              <img
                src={selectedAvatar.thumbnail_url}
                alt={selectedAvatar.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Style</h3>
                <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">
                  {selectedAvatar.style}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Sample Script</h3>
                <p className="text-gray-700 italic">{selectedAvatar.sample_text}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAvatar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  variant="gradient"
                  className="flex-1"
                  onClick={() => {
                    // TODO: Add to project
                    setSelectedAvatar(null);
                  }}
                >
                  Use This Avatar
                </Button>
                <Button variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
