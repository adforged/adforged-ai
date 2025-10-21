"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ShopifyConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopifyConnectModal({ isOpen, onClose }: ShopifyConnectModalProps) {
  const [shopDomain, setShopDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = () => {
    setError("");

    // Validate shop domain
    if (!shopDomain) {
      setError("Please enter your shop domain");
      return;
    }

    // Clean up domain input
    let cleanDomain = shopDomain.trim().toLowerCase();

    // Remove https:// or http://
    cleanDomain = cleanDomain.replace(/^https?:\/\//, "");

    // Remove trailing slashes
    cleanDomain = cleanDomain.replace(/\/$/, "");

    // If they didn't include .myshopify.com, add it
    if (!cleanDomain.includes(".myshopify.com")) {
      cleanDomain = `${cleanDomain}.myshopify.com`;
    }

    setLoading(true);

    // Redirect to Shopify OAuth
    window.location.href = `/api/integrations/shopify/connect?shop=${cleanDomain}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={loading}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Shopify Store
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your Shopify store domain to connect your products and track performance
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Domain
            </label>
            <input
              type="text"
              value={shopDomain}
              onChange={(e) => setShopDomain(e.target.value)}
              placeholder="your-store.myshopify.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none"
              disabled={loading}
              onKeyPress={(e) => e.key === "Enter" && handleConnect()}
            />
            <p className="text-xs text-gray-500 mt-2">
              Example: your-store or your-store.myshopify.com
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 text-sm mb-2">
              What you'll be able to do:
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ Import all your products automatically</li>
              <li>✓ Track sales and revenue in one dashboard</li>
              <li>✓ Create video ads for any product</li>
              <li>✓ See which products perform best</li>
            </ul>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConnect}
              disabled={loading || !shopDomain}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            >
              {loading ? "Connecting..." : "Connect Shopify"}
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center">
          We'll never access your store without permission. You can disconnect anytime.
        </p>
      </div>
    </div>
  );
}
