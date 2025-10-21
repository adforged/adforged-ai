"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TEMPLATES, getTemplateById } from "@/data/templates";
import { Search, Play, Video, CheckCircle } from "lucide-react";
import type { Template } from "@/types";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: "all", label: "All Templates" },
    { value: "product-demo", label: "Product Demo" },
    { value: "testimonial", label: "Testimonial" },
    { value: "unboxing", label: "Unboxing" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "comparison", label: "Comparison" },
    { value: "tutorial", label: "Tutorial" },
    { value: "announcement", label: "Announcement" },
    { value: "promotion", label: "Promotion" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Templates</h1>
        <p className="text-gray-600">
          Choose from {TEMPLATES.length}+ professional templates optimized for every platform
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by name or description..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border-2 border-gray-200 hover:border-violet-500 transition-all cursor-pointer overflow-hidden"
            onClick={() => setSelectedTemplate(template)}
          >
            {/* Template Preview */}
            <div className="relative aspect-video bg-gradient-to-br from-violet-100 to-purple-100">
              <img
                src={template.thumbnail_url}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-violet-600 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
                <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full capitalize">
                  {template.style}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{template.description}</p>

              {/* Platforms */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <Video className="w-4 h-4 mr-2" />
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or category filter
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setSelectedTemplate(null)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl bg-white rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedTemplate.name}
                </h2>
                <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm capitalize">
                  {selectedTemplate.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
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

            {/* Video Preview */}
            <div className="aspect-video bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
              <img
                src={selectedTemplate.thumbnail_url}
                alt={selectedTemplate.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-10 h-10 text-violet-600 ml-2" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedTemplate.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Best For</h3>
                <p className="text-gray-700">{selectedTemplate.best_for}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="space-y-2">
                  {selectedTemplate.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Supported Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg capitalize text-sm font-medium"
                    >
                      {platform}
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
                    setSelectedTemplate(null);
                  }}
                >
                  Use This Template
                </Button>
                <Button variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
