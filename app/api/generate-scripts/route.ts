import { NextRequest, NextResponse } from "next/server";
import { generateScripts } from "@/lib/ai/script-generator";
import { withMiddleware, validateRequest } from "@/lib/api/middleware";
import type { ProductData } from "@/types";

export interface ScriptGenerationOptions {
  tone?: 'professional' | 'casual' | 'energetic' | 'educational' | 'humorous';
  length?: 'short' | 'medium' | 'long';
  platform?: 'tiktok' | 'instagram' | 'youtube' | 'facebook' | 'all';
  count?: number;
}

interface GenerateScriptsRequest {
  productData: ProductData;
  tone?: ScriptGenerationOptions['tone'];
  length?: ScriptGenerationOptions['length'];
  platform?: ScriptGenerationOptions['platform'];
  count?: number;
}

// Validation schema
function validateScriptRequest(body: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate productData
  if (!body.productData || typeof body.productData !== "object") {
    errors.push("productData must be an object");
  } else {
    if (!body.productData.title || typeof body.productData.title !== "string") {
      errors.push("productData.title is required and must be a string");
    }
    if (!body.productData.description || typeof body.productData.description !== "string") {
      errors.push("productData.description is required and must be a string");
    }
  }

  // Validate tone
  if (body.tone) {
    const validTones = ['professional', 'casual', 'energetic', 'educational', 'humorous'];
    if (!validTones.includes(body.tone)) {
      errors.push(`tone must be one of: ${validTones.join(', ')}`);
    }
  }

  // Validate length
  if (body.length) {
    const validLengths = ['short', 'medium', 'long'];
    if (!validLengths.includes(body.length)) {
      errors.push(`length must be one of: ${validLengths.join(', ')}`);
    }
  }

  // Validate platform
  if (body.platform) {
    const validPlatforms = ['tiktok', 'instagram', 'youtube', 'facebook', 'all'];
    if (!validPlatforms.includes(body.platform)) {
      errors.push(`platform must be one of: ${validPlatforms.join(', ')}`);
    }
  }

  // Validate count
  if (body.count !== undefined) {
    if (typeof body.count !== 'number' || body.count < 1 || body.count > 20) {
      errors.push("count must be a number between 1 and 20");
    }
  }

  return { valid: errors.length === 0, errors };
}

export async function POST(req: NextRequest) {
  return withMiddleware(
    req,
    async (req, user) => {
      const body: GenerateScriptsRequest = await req.json();

      // Validate request
      const validation = validateRequest<GenerateScriptsRequest>(
        body,
        ['productData'],
        validateScriptRequest
      );

      if (!validation.valid && validation.error) {
        return validation.error;
      }

      const {
        productData,
        tone = 'casual',
        length = 'medium',
        platform = 'all',
        count = 12
      } = body;

      // Generate scripts using OpenAI with options
      const scripts = await generateScripts(
        productData as ProductData,
        { tone, length, platform, count }
      );

      return NextResponse.json({
        success: true,
        data: scripts,
        meta: {
          count: scripts.length,
          options: { tone, length, platform },
        }
      });
    },
    {
      requireAuth: false, // Set to true when auth is implemented
      rateLimit: { maxRequests: 50, windowMs: 60000 }, // 50 requests per minute
      validateBody: {
        requiredFields: ['productData'],
        schema: validateScriptRequest
      }
    }
  );
}
