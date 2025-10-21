"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Video,
  Plus,
  Users,
  Mic,
  Layout,
  Settings,
  CreditCard,
  Home,
  Sparkles,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Check,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [loading, user, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold gradient-text">AdForge AI</span>
            </Link>
          </div>

          {/* Credits Badge */}
          <div className="p-4">
            <div className="gradient-bg rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-2xl font-bold text-gray-900">10</span>
              </div>
              <p className="text-xs text-gray-600">Credits Remaining</p>
              <Link href="/dashboard/settings/billing">
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <CreditCard className="w-4 h-4 mr-1" />
                  Upgrade
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <NavLink
              href="/dashboard"
              icon={Home}
              label="Dashboard"
              active={pathname === "/dashboard"}
            />
            <NavLink
              href="/dashboard/new-project"
              icon={Plus}
              label="New Project"
              active={pathname === "/dashboard/new-project"}
              highlight
            />
            <NavLink
              href="/dashboard/projects"
              icon={Video}
              label="Projects"
              active={pathname?.startsWith("/dashboard/projects")}
            />
            <NavLink
              href="/dashboard/analytics"
              icon={BarChart3}
              label="Analytics"
              active={pathname?.startsWith("/dashboard/analytics")}
            />
            <div className="my-4 border-t border-gray-200"></div>
            <NavLink
              href="/dashboard/avatars"
              icon={Users}
              label="Avatars"
              active={pathname === "/dashboard/avatars"}
            />
            <NavLink
              href="/dashboard/voices"
              icon={Mic}
              label="Voices"
              active={pathname === "/dashboard/voices"}
            />
            <NavLink
              href="/dashboard/templates"
              icon={Layout}
              label="Templates"
              active={pathname === "/dashboard/templates"}
            />
            <div className="my-4 border-t border-gray-200"></div>
            <NavLink
              href="/dashboard/settings"
              icon={Settings}
              label="Settings"
              active={pathname?.startsWith("/dashboard/settings")}
            />
          </nav>

          {/* Upgrade CTA */}
          <div className="p-4 border-t border-gray-200">
            <div className="gradient-primary rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-2">Upgrade to Pro</h4>
              <p className="text-xs mb-3 opacity-90">
                Get 200 credits/month and unlock all features
              </p>
              <Link href="/pricing">
                <Button variant="outline" size="sm" className="w-full bg-white text-violet-600 hover:bg-gray-50">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setNotificationsOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <button className="text-xs text-violet-600 hover:text-violet-700">
                            Mark all read
                          </button>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {/* Sample notifications */}
                        <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                Video generation complete!
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Your video "iPhone 15 Pro Ad" is ready to download
                              </p>
                              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Sparkles className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                New AI features available
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Try our new script editor with real-time feedback
                              </p>
                              <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <CreditCard className="w-5 h-5 text-violet-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                Credits renewed
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Your monthly credits have been renewed
                              </p>
                              <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-t border-gray-200 text-center">
                        <button className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                >
                  <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.email?.[0].toUpperCase() || "U"}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.email?.split("@")[0] || "User"}
                    </p>
                    <p className="text-xs text-gray-500">Free Plan</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    ></div>
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Free Plan</p>
                      </div>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                      </Link>
                      <Link
                        href="/dashboard/settings/billing"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <CreditCard className="w-4 h-4" />
                          <span>Billing</span>
                        </button>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSignOut();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

function NavLink({
  href,
  icon: Icon,
  label,
  active,
  highlight,
}: {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
          active
            ? highlight
              ? "gradient-primary text-white"
              : "bg-violet-50 text-violet-700"
            : "text-gray-700 hover:bg-gray-100",
          highlight && !active && "border-2 border-violet-200"
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}
