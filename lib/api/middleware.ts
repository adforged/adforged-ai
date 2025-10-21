/**
 * API Middleware
 * Centralized middleware for rate limiting, auth, validation, and error handling
 */

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// Rate limiting store (in-memory for now, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

/**
 * Rate Limiting Middleware
 * Prevents API abuse by limiting requests per IP/user
 */
export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig = { maxRequests: 100, windowMs: 60000 }
): Promise<NextResponse | null> {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const key = `rate-limit:${ip}`;

  let record = rateLimitStore.get(key);

  // Clean up expired records
  if (record && now > record.resetAt) {
    rateLimitStore.delete(key);
    record = undefined;
  }

  if (!record) {
    record = { count: 0, resetAt: now + config.windowMs };
    rateLimitStore.set(key, record);
  }

  record.count++;

  if (record.count > config.maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please try again later.",
        retryAfter,
      },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
          "X-RateLimit-Limit": config.maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": record.resetAt.toString(),
        },
      }
    );
  }

  // Add rate limit headers to response
  req.headers.set("X-RateLimit-Limit", config.maxRequests.toString());
  req.headers.set("X-RateLimit-Remaining", (config.maxRequests - record.count).toString());
  req.headers.set("X-RateLimit-Reset", record.resetAt.toString());

  return null; // Continue to next middleware
}

/**
 * Authentication Middleware
 * Ensures user is authenticated via Supabase
 */
export async function requireAuth(req: NextRequest): Promise<{ user: any; error?: NextResponse }> {
  const supabase = createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 }
      ),
    };
  }

  return { user };
}

/**
 * Request Validation Middleware
 * Validates request body against schema
 */
export function validateRequest<T>(
  body: any,
  requiredFields: string[],
  schema?: (body: any) => { valid: boolean; errors: string[] }
): { valid: boolean; error?: NextResponse; data?: T } {
  // Check required fields
  for (const field of requiredFields) {
    if (body[field] === undefined || body[field] === null) {
      return {
        valid: false,
        error: NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        ),
      };
    }
  }

  // Custom schema validation
  if (schema) {
    const validation = schema(body);
    if (!validation.valid) {
      return {
        valid: false,
        error: NextResponse.json(
          { success: false, error: "Validation failed", details: validation.errors },
          { status: 400 }
        ),
      };
    }
  }

  return { valid: true, data: body as T };
}

/**
 * Error Handler Middleware
 * Standardizes error responses
 */
export function handleError(error: unknown): NextResponse {
  console.error("[API Error]:", error);

  // OpenAI specific errors
  if (error instanceof Error && error.message.includes("OpenAI")) {
    return NextResponse.json(
      {
        success: false,
        error: "AI service temporarily unavailable. Please try again.",
        code: "AI_SERVICE_ERROR",
      },
      { status: 503 }
    );
  }

  // Database errors
  if (error instanceof Error && (error.message.includes("Supabase") || error.message.includes("database"))) {
    return NextResponse.json(
      {
        success: false,
        error: "Database error. Please try again.",
        code: "DATABASE_ERROR",
      },
      { status: 500 }
    );
  }

  // Network errors
  if (error instanceof Error && (error.message.includes("fetch") || error.message.includes("network"))) {
    return NextResponse.json(
      {
        success: false,
        error: "Network error. Please check your connection.",
        code: "NETWORK_ERROR",
      },
      { status: 503 }
    );
  }

  // Generic error
  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
      code: "INTERNAL_ERROR",
    },
    { status: 500 }
  );
}

/**
 * API Logger
 * Logs API requests for monitoring
 */
export function logRequest(req: NextRequest, duration?: number, status?: number) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  console.log(
    `[${timestamp}] ${method} ${url} - IP: ${ip}${duration ? ` - ${duration}ms` : ""}${status ? ` - ${status}` : ""}`
  );
}

/**
 * Response Cache Helper
 * Caches GET responses to reduce API calls
 */
const responseCache = new Map<string, { data: any; expiresAt: number }>();

export function getCachedResponse(key: string): any | null {
  const cached = responseCache.get(key);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }
  responseCache.delete(key);
  return null;
}

export function setCachedResponse(key: string, data: any, ttlMs: number = 300000) {
  responseCache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

/**
 * Combined Middleware Wrapper
 * Applies multiple middleware in sequence
 */
export async function withMiddleware(
  req: NextRequest,
  handler: (req: NextRequest, user: any, body?: any) => Promise<NextResponse>,
  options: {
    requireAuth?: boolean;
    rateLimit?: RateLimitConfig;
    validateBody?: { requiredFields: string[]; schema?: (body: any) => { valid: boolean; errors: string[] } };
    cache?: { enabled: boolean; ttl?: number };
  } = {}
) {
  const startTime = Date.now();

  try {
    // Rate limiting
    if (options.rateLimit) {
      const rateLimitResult = await rateLimit(req, options.rateLimit);
      if (rateLimitResult) return rateLimitResult;
    }

    // Authentication
    let user = null;
    if (options.requireAuth) {
      const authResult = await requireAuth(req);
      if (authResult.error) return authResult.error;
      user = authResult.user;
    }

    // Request validation - parse body once
    let parsedBody = null;
    if (options.validateBody && req.method !== "GET") {
      parsedBody = await req.json();
      const validation = validateRequest(parsedBody, options.validateBody.requiredFields, options.validateBody.schema);
      if (!validation.valid && validation.error) return validation.error;
    }

    // Check cache for GET requests
    if (options.cache?.enabled && req.method === "GET") {
      const cacheKey = `cache:${req.url}`;
      const cached = getCachedResponse(cacheKey);
      if (cached) {
        logRequest(req, Date.now() - startTime, 200);
        return NextResponse.json(cached);
      }
    }

    // Execute handler - pass parsed body if available
    const response = await handler(req, user, parsedBody);

    // Cache successful GET responses
    if (options.cache?.enabled && req.method === "GET" && response.status === 200) {
      const cacheKey = `cache:${req.url}`;
      const data = await response.clone().json();
      setCachedResponse(cacheKey, data, options.cache.ttl);
    }

    const duration = Date.now() - startTime;
    logRequest(req, duration, response.status);

    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    logRequest(req, duration, 500);
    return handleError(error);
  }
}
