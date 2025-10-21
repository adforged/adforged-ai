"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Video,
  Plus,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Sparkles,
  DollarSign,
  Target,
  ShoppingBag,
  Play,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  BarChart3,
  Activity,
  Bell,
  Settings,
  Download,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  Calendar,
  Users,
  Crown,
} from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  // Mock data - replace with real data from API/Supabase
  const [stats] = useState({
    videosThisMonth: 5,
    videosLastMonth: 3,
    creditsRemaining: 45,
    totalCredits: 100,
    totalRevenue: 2847.32,
    revenueChange: 23.5,
    totalSpend: 856.20,
    roas: 3.32,
    campaignsActive: 2,
  });

  const [recentProjects] = useState([
    {
      id: 1,
      name: "Summer Collection Promo",
      status: "completed",
      thumbnail: "https://placehold.co/400x400/8B5CF6/white?text=Video+1",
      createdAt: "2 hours ago",
      views: 1234,
      platform: "TikTok"
    },
    {
      id: 2,
      name: "Product Demo - Smart Watch",
      status: "generating",
      thumbnail: "https://placehold.co/400x400/3B82F6/white?text=Video+2",
      createdAt: "5 hours ago",
      progress: 65,
      platform: "Instagram"
    },
    {
      id: 3,
      name: "Holiday Sale Announcement",
      status: "completed",
      thumbnail: "https://placehold.co/400x400/EC4899/white?text=Video+3",
      createdAt: "1 day ago",
      views: 5678,
      platform: "YouTube"
    },
  ]);

  const [integrations] = useState([
    { name: "Shopify", connected: false, icon: ShoppingBag, color: "bg-green-500" },
    { name: "Meta Ads", connected: false, icon: Target, color: "bg-blue-500" },
    { name: "TikTok Ads", connected: false, icon: Play, color: "bg-black" },
  ]);

  const [recentActivity] = useState([
    { action: "Video generated", item: "Summer Collection Promo", time: "2 hours ago", icon: Video, color: "text-green-600" },
    { action: "Script created", item: "Product Demo - Smart Watch", time: "5 hours ago", icon: Edit, color: "text-blue-600" },
    { action: "Campaign launched", item: "Holiday Sale", time: "1 day ago", icon: Target, color: "text-violet-600" },
    { action: "Credits purchased", item: "Pro Plan - 100 credits", time: "2 days ago", icon: Zap, color: "text-yellow-600" },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your account.</p>
        </div>
        <Link href="/dashboard/new-project">
          <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
            <Plus className="w-5 h-5 mr-2" />
            Create Video
          </Button>
        </Link>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Video}
          label="Videos This Month"
          value={stats.videosThisMonth}
          change={`+${Math.round(((stats.videosThisMonth - stats.videosLastMonth) / stats.videosLastMonth) * 100)}%`}
          trend="up"
          color="violet"
        />
        <MetricCard
          icon={Zap}
          label="Credits Remaining"
          value={stats.creditsRemaining}
          subtitle={`of ${stats.totalCredits} total`}
          progress={(stats.creditsRemaining / stats.totalCredits) * 100}
          color="blue"
        />
        <MetricCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={`+${stats.revenueChange}%`}
          trend="up"
          color="green"
        />
        <MetricCard
          icon={Target}
          label="ROAS"
          value={`${stats.roas}x`}
          subtitle={`$${stats.totalSpend.toLocaleString()} spent`}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Projects */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
                  <p className="text-sm text-gray-600 mt-1">Your latest video creations</p>
                </div>
                <Link href="/dashboard/projects">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-6">
              {recentProjects.length > 0 ? (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:shadow-md transition-all">
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          {project.status === "completed" ? (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Completed
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                              Generating {project.progress}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {project.platform} • {project.createdAt}
                          {project.views && ` • ${project.views.toLocaleString()} views`}
                        </p>
                        {project.status === "generating" && (
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-violet-600 to-purple-600 h-1.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {project.status === "completed" && (
                          <>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No projects yet</p>
                  <Link href="/dashboard/new-project">
                    <Button variant="outline">Create Your First Video</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Performance Insights</h2>
              <p className="text-sm text-gray-600 mt-1">Your campaigns at a glance</p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-5 h-5 text-violet-600" />
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.campaignsActive}</div>
                  <div className="text-sm text-gray-600">Active Campaigns</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span className="text-xs text-gray-600">Last 7 days</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">12.5K</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-medium text-green-600">+23%</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$2.8K</div>
                  <div className="text-sm text-gray-600">Revenue (7d)</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">AI Recommendation</h4>
                    <p className="text-sm text-blue-800">
                      Your TikTok campaigns are performing 45% better than Instagram. Consider allocating more budget to TikTok ads.
                    </p>
                    <Link href="/dashboard/analytics">
                      <Button variant="ghost" size="sm" className="mt-2 text-blue-600 hover:text-blue-700">
                        View Full Analytics
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Account Overview */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Free Plan</h3>
                <p className="text-xs text-gray-600">2 videos remaining</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Credits Used</span>
                <span className="font-semibold text-gray-900">{stats.totalCredits - stats.creditsRemaining} / {stats.totalCredits}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full"
                  style={{ width: `${((stats.totalCredits - stats.creditsRemaining) / stats.totalCredits) * 100}%` }}
                />
              </div>
            </div>
            <Link href="/dashboard/settings/billing">
              <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </Link>
          </div>

          {/* Platform Integrations */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Platform Connections</h3>
              <p className="text-xs text-gray-600 mt-1">Connect to track performance</p>
            </div>
            <div className="p-6 space-y-3">
              {integrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-violet-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${integration.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{integration.name}</div>
                        <div className="text-xs text-gray-500">
                          {integration.connected ? "Connected" : "Not connected"}
                        </div>
                      </div>
                    </div>
                    {integration.connected ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Link href="/dashboard/analytics">
                        <Button variant="ghost" size="sm" className="text-xs">
                          Connect
                        </Button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Recent Activity</h3>
              <p className="text-xs text-gray-600 mt-1">Your latest actions</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600 truncate">{activity.item}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-2">
              <Link href="/dashboard/new-project">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Video
                </Button>
              </Link>
              <Link href="/dashboard/projects">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  View All Projects
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">💡 Pro Tips for Better Performance</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <p className="text-sm text-gray-700">Use short, punchy scripts (15-30s) for TikTok to maximize engagement</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <p className="text-sm text-gray-700">Test multiple avatars to find what resonates with your audience</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <p className="text-sm text-gray-700">A/B test different hooks in your first 3 seconds</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <p className="text-sm text-gray-700">Connect your Shopify store to track actual ROI from your videos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, change, trend, subtitle, progress, color }: any) {
  const colorClasses = {
    violet: "from-violet-500 to-purple-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-2">{subtitle}</div>}
      {progress !== undefined && (
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} h-2 rounded-full transition-all`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
