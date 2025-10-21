import { NextRequest, NextResponse } from "next/server";

/**
 * Shopify OAuth Connection Flow
 *
 * Step 1: Redirect user to Shopify OAuth page
 * Step 2: Shopify redirects back to callback with code
 * Step 3: Exchange code for access token
 * Step 4: Store credentials in database
 */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shopDomain = searchParams.get("shop");

    if (!shopDomain) {
      return NextResponse.json(
        { success: false, error: "Shop domain required" },
        { status: 400 }
      );
    }

    // Shopify OAuth Configuration
    const shopifyClientId = process.env.SHOPIFY_API_KEY;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/shopify/callback`;
    const scopes = [
      "read_products",
      "read_orders",
      "read_analytics",
      "read_customers",
    ].join(",");

    // Generate random state for security
    const state = Math.random().toString(36).substring(7);

    // Build Shopify OAuth URL
    const shopifyOAuthUrl = `https://${shopDomain}/admin/oauth/authorize?` +
      `client_id=${shopifyClientId}` +
      `&scope=${scopes}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${state}`;

    // Store state in session/cookie for validation in callback
    const response = NextResponse.redirect(shopifyOAuthUrl);
    response.cookies.set("shopify_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 600, // 10 minutes
    });

    return response;
  } catch (error) {
    console.error("Shopify connect error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to connect to Shopify",
      },
      { status: 500 }
    );
  }
}
