import { NextRequest, NextResponse } from "next/server";
import { scrapeProductURL } from "@/lib/url-scraper/scraper";
import { withMiddleware, getCachedResponse, setCachedResponse } from "@/lib/api/middleware";

// Validation schema for URL
function validateURL(url: string): { valid: boolean; error?: string } {
  try {
    const parsed = new URL(url);

    // Check if protocol is HTTP or HTTPS
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { valid: false, error: "URL must use HTTP or HTTPS protocol" };
    }

    // Check if URL has a valid hostname
    if (!parsed.hostname || parsed.hostname.length < 3) {
      return { valid: false, error: "Invalid URL hostname" };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}

export async function POST(req: NextRequest) {
  return withMiddleware(
    req,
    async (req, user, body) => {
      const { url } = body || {};

      if (!url || typeof url !== 'string') {
        return NextResponse.json(
          { success: false, error: "URL is required and must be a string" },
          { status: 400 }
        );
      }

      // Validate URL
      const validation = validateURL(url);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        );
      }

      // Check cache first (5 minute TTL)
      const cacheKey = `scrape:${url}`;
      const cached = getCachedResponse(cacheKey);
      if (cached) {
        console.log("[Scraper] Cache hit for:", url);
        return NextResponse.json({
          success: true,
          data: cached,
          cached: true
        });
      }

      // Scrape the product data
      const productData = await scrapeProductURL(url);

      // Cache the result
      setCachedResponse(cacheKey, productData, 300000); // 5 minutes

      return NextResponse.json({
        success: true,
        data: productData,
      });
    },
    {
      requireAuth: false, // Set to true when auth is implemented
      rateLimit: { maxRequests: 30, windowMs: 60000 }, // 30 requests per minute
      validateBody: {
        requiredFields: ['url']
      }
    }
  );
}
