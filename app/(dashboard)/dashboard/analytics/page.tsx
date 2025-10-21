"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  ShoppingBag,
  Zap,
  Eye,
  MousePointer,
  ShoppingCart,
  BarChart3,
  Calendar,
  Download,
  RefreshCw,
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Sparkles,
  Play,
  Pause,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import ShopifyConnectModal from "@/components/analytics/ShopifyConnectModal";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [shopifyModalOpen, setShopifyModalOpen] = useState(false);

  // Integration status
  const integrations = [
    {
      name: "Shopify",
      connected: false,
      icon: ShoppingBag,
      color: "bg-green-500",
      stats: { products: 0, revenue: 0 },
      onConnect: () => setShopifyModalOpen(true),
    },
    {
      name: "Meta Ads",
      connected: false,
      icon: Target,
      color: "bg-blue-500",
      stats: { campaigns: 0, spend: 0 },
    },
    {
      name: "TikTok Ads",
      connected: false,
      icon: Play,
      color: "bg-black",
      stats: { campaigns: 0, spend: 0 },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Campaigns</h1>
          <p className="text-gray-600 mt-1">
            Track performance and manage campaigns across all platforms
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data
          </Button>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {integrations.map((integration, idx) => (
          <IntegrationCard key={idx} integration={integration} />
        ))}
      </div>

      {/* Key Metrics Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Spend"
          value="$0.00"
          change="+0%"
          trend="up"
          icon={DollarSign}
          description="Across all platforms"
        />
        <MetricCard
          title="Revenue"
          value="$0.00"
          change="+0%"
          trend="up"
          icon={TrendingUp}
          description="Total revenue generated"
        />
        <MetricCard
          title="ROAS"
          value="0.0x"
          change="+0%"
          trend="neutral"
          icon={Target}
          description="Return on ad spend"
        />
        <MetricCard
          title="Conversions"
          value="0"
          change="+0%"
          trend="up"
          icon={ShoppingCart}
          description="Total purchases"
        />
      </div>

      {/* Campaign Management */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Active Campaigns</h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage and monitor your ad campaigns
              </p>
            </div>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Platform Filter */}
          <div className="flex items-center space-x-2 mb-6">
            <button
              onClick={() => setSelectedPlatform("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlatform === "all"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Platforms
            </button>
            <button
              onClick={() => setSelectedPlatform("meta")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlatform === "meta"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Meta Ads
            </button>
            <button
              onClick={() => setSelectedPlatform("tiktok")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPlatform === "tiktok"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              TikTok Ads
            </button>
          </div>

          {/* Empty State */}
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No campaigns yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Connect your Shopify store and ad platforms to start managing campaigns
              and tracking performance.
            </p>
            <div className="flex justify-center space-x-3">
              <Button variant="outline">
                Connect Shopify
              </Button>
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Create First Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <PerformanceChart
          title="Video Performance"
          description="Views and engagement over time"
        />
        <PerformanceChart
          title="Revenue & Spend"
          description="Track your ROI"
        />
      </div>

      {/* Product Performance */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Top Performing Products</h2>
              <p className="text-sm text-gray-600 mt-1">
                Products driving the most revenue
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Connect your Shopify store to see product performance</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              AI-Powered Recommendations
            </h3>
            <p className="text-gray-600 mb-4">
              Get personalized insights to improve your campaign performance
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <RecommendationCard
                title="Optimize Budget Allocation"
                description="TikTok campaigns are outperforming Meta by 32%. Consider reallocating 20% of Meta budget."
                impact="high"
              />
              <RecommendationCard
                title="Test New Script Variation"
                description="Problem-solution scripts have 2.3x higher conversion rate. Generate more variations."
                impact="medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* A/B Testing Insights */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">A/B Testing Results</h2>
              <p className="text-sm text-gray-600 mt-1">
                Compare video variations and find winners
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Test
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-gray-500">
            <Zap className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Run A/B tests to optimize your video ads</p>
            <Button variant="outline" size="sm" className="mt-4">
              Learn About A/B Testing
            </Button>
          </div>
        </div>
      </div>

      {/* Shopify Connection Modal */}
      <ShopifyConnectModal
        isOpen={shopifyModalOpen}
        onClose={() => setShopifyModalOpen(false)}
      />
    </div>
  );
}

function IntegrationCard({ integration }: { integration: any }) {
  const Icon = integration.icon;
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
            <p className="text-xs text-gray-500">
              {integration.connected ? "Connected" : "Not connected"}
            </p>
          </div>
        </div>
        {integration.connected ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {integration.connected ? (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {integration.name === "Shopify" ? "Products" : "Campaigns"}
            </span>
            <span className="font-semibold text-gray-900">
              {integration.name === "Shopify"
                ? integration.stats.products
                : integration.stats.campaigns}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {integration.name === "Shopify" ? "Revenue" : "Spend"}
            </span>
            <span className="font-semibold text-gray-900">
              ${integration.name === "Shopify"
                ? integration.stats.revenue
                : integration.stats.spend}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600 mb-4">
          Connect your {integration.name} account to track performance and manage campaigns
        </p>
      )}

      <Button
        variant={integration.connected ? "outline" : "default"}
        className={`w-full ${
          !integration.connected &&
          "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
        }`}
        size="sm"
        onClick={() => {
          if (integration.name === "Shopify" && !integration.connected) {
            // Open Shopify modal if passed from parent
            if (integration.onConnect) integration.onConnect();
          }
        }}
      >
        {integration.connected ? (
          <>
            <ExternalLink className="w-4 h-4 mr-2" />
            Manage Connection
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Connect {integration.name}
          </>
        )}
      </Button>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: any;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-violet-600" />
        </div>
        <div
          className={`flex items-center space-x-1 text-sm font-medium ${
            trend === "up"
              ? "text-green-600"
              : trend === "down"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : trend === "down" ? (
            <ArrowDownRight className="w-4 h-4" />
          ) : null}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function PerformanceChart({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <Button variant="ghost" size="sm">
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center text-gray-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm">Chart will appear here once you have data</p>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  title,
  description,
  impact,
}: {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
}) {
  const impactColors = {
    high: "bg-green-100 text-green-700 border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="bg-white rounded-lg border border-violet-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border ${impactColors[impact]}`}
        >
          {impact.toUpperCase()} IMPACT
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <Button variant="outline" size="sm" className="w-full">
        Apply Recommendation
      </Button>
    </div>
  );
}
