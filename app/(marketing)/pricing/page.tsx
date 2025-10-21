"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg"></div>
              <span className="text-2xl font-bold gradient-text">AdForge AI</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="gradient">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-12 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl p-8 border-2 ${
                  plan.is_popular
                    ? "border-violet-600 shadow-xl scale-105"
                    : "border-gray-200"
                } relative`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price_monthly}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  {plan.price_yearly > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      or ${plan.price_yearly}/year (save 17%)
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check
                        className={`w-5 h-5 mr-3 flex-shrink-0 ${
                          feature.included ? "text-green-600" : "text-gray-300"
                        }`}
                      />
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up">
                  <Button
                    variant={plan.is_popular ? "gradient" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.id === "free" ? "Start Free" : "Get Started"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of marketers creating high-converting video ads
          </p>
          <Link href="/sign-up">
            <Button variant="gradient" size="lg">
              Get Started Free - 10 Credits
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const faqs = [
  {
    question: "What are credits and how do they work?",
    answer:
      "Credits are used to generate videos. Each video typically costs 5-10 credits depending on length, quality, and features. Credits reset monthly with your subscription.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "What happens if I run out of credits?",
    answer:
      "You can purchase additional credit packs or upgrade to a higher plan. Your unused credits will roll over to the next month.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 14-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "Can I use the videos commercially?",
    answer:
      "Yes! All videos you create with AdForge AI can be used for commercial purposes without any additional licensing fees.",
  },
];
