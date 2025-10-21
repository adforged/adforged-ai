"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  Video,
  Zap,
  Users,
  Globe,
  TrendingUp,
  Check,
  ArrowRight,
  Play,
  LayoutDashboard,
  Star,
  Clock,
  DollarSign,
  Rocket,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function LandingPage() {
  const [demoUrl, setDemoUrl] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                AdForge AI
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-violet-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-violet-600 transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-violet-600 transition-colors">
                Reviews
              </a>
              <a href="#faq" className="text-gray-600 hover:text-violet-600 transition-colors">
                FAQ
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg border border-violet-100">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-gray-700">
                🎉 Join 50,000+ marketers creating AI video ads
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Turn Any Product URL
              <br />
              Into{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Winning Video Ads
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Paste a link. Get <span className="font-bold text-violet-600">12 ready-to-run video ads</span> in minutes.
              <br />
              1000+ AI avatars • 140+ voices • Zero production costs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Free - No Credit Card
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-violet-300 hover:bg-violet-50"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo (2 min)
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-medium">10 free credits</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>

            {/* Demo Input */}
            <div className="pt-12 max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-2xl border border-violet-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  ⚡ Try it now - Paste any product URL:
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://amazon.com/product/..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none transition-colors"
                  />
                  <Link href={demoUrl ? `/sign-up?redirect=/dashboard/new-project?url=${encodeURIComponent(demoUrl)}` : '/sign-up'}>
                    <Button
                      size="lg"
                      disabled={!demoUrl}
                      className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 whitespace-nowrap"
                    >
                      Generate Ads
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  ✅ Supported: Amazon, Shopify, Etsy, eBay, Walmart, and 100+ platforms
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                2M+
              </div>
              <div className="text-gray-600 font-medium">Videos Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                1000+
              </div>
              <div className="text-gray-600 font-medium">AI Avatars</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-gray-600 font-medium">G2 Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale Video Ads
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From URL to viral video in 3 clicks. No editing skills required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">3 simple steps to viral video ads</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-violet-300 to-purple-300"></div>

            {steps.map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg relative z-10">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-lg px-8"
              >
                Start Creating Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free. Scale as you grow. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular
                    ? "border-4 border-violet-600 transform scale-105"
                    : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-32">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold py-1 px-4 rounded-full text-center shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    {plan.price > 0 && <span className="text-gray-600 ml-2">/month</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by 50,000+ Marketers
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-2xl border border-violet-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author[0]}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about AdForge AI
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-violet-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to 10X Your Video Ad Production?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-violet-100">
            Join 50,000+ marketers creating high-converting video ads with AI
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-white text-violet-600 hover:bg-gray-100 text-xl px-12 py-6 shadow-2xl transform hover:scale-105 transition-all"
            >
              <Rocket className="w-6 h-6 mr-2" />
              Get Started Free - 10 Credits
            </Button>
          </Link>
          <p className="text-sm text-violet-200 mt-6">
            No credit card required • Cancel anytime • SOC 2 compliant
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold text-white">AdForge AI</span>
              </div>
              <p className="text-sm text-gray-400 mb-4 max-w-sm">
                AI-powered video ad generation platform for modern marketers. Turn any product URL into winning video ads in minutes.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">SOC 2 Type II Certified</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="hover:text-violet-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-violet-400 transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-violet-400 transition-colors">Reviews</a></li>
                <li><Link href="/dashboard" className="hover:text-violet-400 transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 AdForge AI. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ for marketers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: "URL to Video in 60 Seconds",
    description:
      "Paste any product link and get 12 video ads instantly. Our AI scrapes product data, generates scripts, and creates videos automatically.",
  },
  {
    icon: Users,
    title: "1000+ Diverse AI Avatars",
    description:
      "Choose from realistic AI avatars covering every demographic, style, and personality. Find the perfect face for your brand.",
  },
  {
    icon: Sparkles,
    title: "AI Script Generation",
    description:
      "Get 12 strategically different script variations per product. Proven templates optimized for TikTok, Instagram, YouTube, and Facebook.",
  },
  {
    icon: Video,
    title: "Platform-Optimized Templates",
    description:
      "Pre-built templates for every platform. Export in any aspect ratio (9:16, 16:9, 1:1, 4:5) with one click.",
  },
  {
    icon: Globe,
    title: "140+ Natural Voices",
    description:
      "Professional voice-overs in 29 languages. Perfect lip-sync, emotional delivery, and natural intonation.",
  },
  {
    icon: TrendingUp,
    title: "Batch Processing Mode",
    description:
      "Generate hundreds of variations simultaneously. Test different hooks, avatars, and styles to find your winner.",
  },
  {
    icon: Clock,
    title: "Lightning Fast Generation",
    description:
      "Most videos ready in under 2 minutes. No rendering queues. No waiting. Just instant, production-ready ads.",
  },
  {
    icon: DollarSign,
    title: "10X Cost Savings",
    description:
      "Replace $5,000 video production costs with $19/month. Same quality, fraction of the price, 100X faster.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 Type II certified. Your data is encrypted and secure. GDPR compliant. Trusted by Fortune 500 companies.",
  },
];

const steps = [
  {
    title: "Paste Your Product URL",
    description:
      "Simply paste any product link from Amazon, Shopify, Etsy, eBay, Walmart, or your own store. Our AI extracts title, description, features, and images automatically.",
  },
  {
    title: "AI Generates 12 Script Variations",
    description:
      "Choose from strategically different scripts optimized for each platform. Select your favorite avatar, voice, and template. Edit or write custom scripts if needed.",
  },
  {
    title: "Export & Publish Ads",
    description:
      "Download your video ads in any format and aspect ratio. Upload directly to TikTok, Instagram, Facebook, YouTube, or use our API for automation.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for trying out",
    features: [
      "10 video credits",
      "100+ avatars",
      "20 voices",
      "720p quality",
      "Watermarked videos",
      "Email support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Creator",
    price: 19,
    description: "For content creators",
    features: [
      "100 videos/month",
      "1000+ avatars",
      "100+ voices",
      "1080p quality",
      "No watermark",
      "Priority support",
      "Custom scripts",
      "Platform templates",
    ],
    cta: "Start Creating",
    popular: false,
  },
  {
    name: "Pro",
    price: 49,
    description: "For growing businesses",
    features: [
      "200 videos/month",
      "All avatars & voices",
      "1080p quality",
      "No watermark",
      "Priority support",
      "Batch processing",
      "API access (basic)",
      "Analytics dashboard",
      "A/B testing tools",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Agency",
    price: 149,
    description: "For agencies & teams",
    features: [
      "600 videos/month",
      "All avatars & voices",
      "4K quality",
      "White-label option",
      "Dedicated support",
      "Full API access",
      "5 team seats",
      "Custom integrations",
      "Advanced analytics",
      "Volume discounts",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const testimonials = [
  {
    quote:
      "AdForge AI cut our video production costs by 90% and increased our output 10X. We're now testing 50+ variations per product instead of just 2-3.",
    author: "Sarah Chen",
    role: "Head of Growth @ TrendyTech",
  },
  {
    quote:
      "The AI script generation is incredible. It understands our products better than our copywriters. We've seen a 3X increase in conversion rates.",
    author: "Marcus Johnson",
    role: "Marketing Director @ ShopStyle",
  },
  {
    quote:
      "We went from spending $5,000 per video to $0.50. The quality is indistinguishable from our previous agency work. Absolute game-changer.",
    author: "Emily Rodriguez",
    role: "Founder @ BeautyBox",
  },
];

const faqs = [
  {
    question: "How does the URL to video process work?",
    answer:
      "Simply paste any product URL from Amazon, Shopify, Etsy, or your own store. Our AI scrapes the product page, extracts details (title, description, features, images), generates 12 script variations, and creates video ads automatically. The entire process takes under 2 minutes.",
  },
  {
    question: "Can I edit the AI-generated scripts?",
    answer:
      "Yes! You can edit any AI-generated script or write completely custom scripts from scratch. Our script editor provides real-time feedback on word count, duration, readability, and includes writing tips for maximum engagement.",
  },
  {
    question: "What video formats and aspect ratios are supported?",
    answer:
      "We support all major formats and aspect ratios: 9:16 (TikTok/Instagram Reels), 16:9 (YouTube), 1:1 (Instagram Feed), and 4:5 (Facebook Feed). Export in MP4, MOV, or WebM format with quality options from 720p to 4K.",
  },
  {
    question: "How many videos can I create?",
    answer:
      "Free plan includes 10 videos. Creator plan: 100 videos/month. Pro plan: 200 videos/month. Agency plan: 600 videos/month. Each plan includes credits that renew monthly. Need more? Contact us for custom enterprise plans.",
  },
  {
    question: "Do I own the rights to generated videos?",
    answer:
      "Yes! You own full commercial rights to all videos created with AdForge AI. Use them for ads, social media, websites, or any other purpose without attribution or additional licensing fees.",
  },
  {
    question: "What languages are supported?",
    answer:
      "We support 29 languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, and more. Each language has 4-10 natural-sounding voice options.",
  },
  {
    question: "Can I integrate AdForge AI with my existing tools?",
    answer:
      "Yes! Pro and Agency plans include API access. Integrate with your CMS, e-commerce platform, marketing automation tools, or custom workflows. We also offer Zapier integration for no-code automation.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes! We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied for any reason, contact us within 14 days for a full refund. No questions asked.",
  },
];
