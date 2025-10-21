"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/auth-context";
import {
  User,
  Mail,
  Bell,
  Video,
  CreditCard,
  Shield,
  Save,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [saved, setSaved] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [defaultAspectRatio, setDefaultAspectRatio] = useState("9:16");
  const [defaultQuality, setDefaultQuality] = useState("1080p");
  const [notifications, setNotifications] = useState({
    videoCompleted: true,
    creditsLow: true,
    newFeatures: false,
    marketing: false,
  });

  const handleSave = async () => {
    // TODO: Save to database
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "preferences", label: "Preferences", icon: Video },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-violet-600 text-violet-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Account Information
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Update your account details and profile information
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Contact support to change your email address
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Status
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <Check className="w-4 h-4 mr-1" />
                      Active
                    </span>
                    <span className="text-sm text-gray-600">
                      Member since {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Video Preferences
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Set default preferences for your video projects
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Aspect Ratio
                  </label>
                  <select
                    value={defaultAspectRatio}
                    onChange={(e) => setDefaultAspectRatio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  >
                    <option value="9:16">9:16 (TikTok, Instagram Reels)</option>
                    <option value="16:9">16:9 (YouTube)</option>
                    <option value="1:1">1:1 (Instagram Feed)</option>
                    <option value="4:5">4:5 (Facebook, Instagram)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Video Quality
                  </label>
                  <select
                    value={defaultQuality}
                    onChange={(e) => setDefaultQuality(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  >
                    <option value="720p">720p (Good, 3 credits)</option>
                    <option value="1080p">1080p (Better, 5 credits)</option>
                    <option value="4k">4K (Best, 10 credits)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Video Duration
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                    <option value="15">15 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="60">60 seconds</option>
                    <option value="90">90 seconds</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Notification Preferences
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Choose what notifications you want to receive
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Video Completed</p>
                    <p className="text-sm text-gray-600">
                      Get notified when your video generation is complete
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.videoCompleted}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          videoCompleted: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Credits Low</p>
                    <p className="text-sm text-gray-600">
                      Alert when your credits are running low
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.creditsLow}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          creditsLow: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">New Features</p>
                    <p className="text-sm text-gray-600">
                      Stay updated on new features and improvements
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.newFeatures}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          newFeatures: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Marketing Emails</p>
                    <p className="text-sm text-gray-600">
                      Receive tips, best practices, and special offers
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.marketing}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          marketing: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Billing & Subscription
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Manage your subscription and billing information
                </p>
              </div>

              {/* Current Plan */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-6 border border-violet-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Free Plan</h3>
                    <p className="text-sm text-gray-600">$0 / month</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-violet-100 text-violet-800">
                    Current Plan
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-gray-900">
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    <span>10 credits per month</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    <span>2 videos per month</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    <span>100+ avatars</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    <span>720p quality</span>
                  </div>
                </div>

                <Button variant="gradient" className="w-full">
                  Upgrade to Pro
                </Button>
              </div>

              {/* Usage Stats */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Usage This Month</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Credits Used</span>
                      <span className="text-2xl font-bold text-gray-900">0 / 10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-violet-600 h-2 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Videos Created</span>
                      <span className="text-2xl font-bold text-gray-900">0 / 2</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-violet-600 h-2 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-4">
                    No payment method on file
                  </p>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Security Settings
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Manage your password and security preferences
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <Input type="password" placeholder="Enter current password" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <Input type="password" placeholder="Enter new password" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>

                <Button variant="default">Update Password</Button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Danger Zone</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-semibold text-red-900 mb-2">Delete Account</h4>
                  <p className="text-sm text-red-700 mb-4">
                    Once you delete your account, there is no going back. Please be
                    certain.
                  </p>
                  <Button variant="destructive">Delete My Account</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button (shown for account, preferences, notifications) */}
      {(activeTab === "account" ||
        activeTab === "preferences" ||
        activeTab === "notifications") && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
          {saved && (
            <div className="flex items-center text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Settings saved successfully</span>
            </div>
          )}
          <div className={saved ? "ml-auto" : "w-full flex justify-end"}>
            <Button variant="gradient" onClick={handleSave} className="px-8">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
