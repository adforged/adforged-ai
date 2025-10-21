"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading: authLoading, signUpWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [authLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUpWithEmail(email, password, fullName);
      toast.success("Account created! Check your email to verify.");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 gradient-primary rounded-lg"></div>
          <span className="text-3xl font-bold gradient-text">AdForge AI</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">Start creating video ads in minutes</p>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 mb-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-violet-700 font-semibold">
              <Sparkles className="w-5 h-5" />
              <span>Get 10 free credits to start</span>
            </div>
          </div>

          <Button variant="outline" size="lg" className="w-full mb-4" onClick={handleGoogleSignIn}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="pl-10" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="pl-10" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" required minLength={8} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? <Link href="/sign-in" className="text-violet-600 hover:text-violet-700 font-semibold">Sign In</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By signing up, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
