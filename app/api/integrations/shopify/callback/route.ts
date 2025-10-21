import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const shop = searchParams.get("shop");
    const state = searchParams.get("state");

    // Validate state to prevent CSRF
    const storedState = req.cookies.get("shopify_oauth_state")?.value;
    if (!state || state !== storedState) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/analytics?error=invalid_state`
      );
    }

    if (!code || !shop) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/analytics?error=missing_params`
      );
    }

    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const { access_token } = await tokenResponse.json();

    // Get current user
    const supabase = createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/sign-in?redirect=/dashboard/analytics`
      );
    }

    // Store integration in database
    const { error: dbError } = await supabase
      .from("platform_integrations")
      .upsert({
        user_id: user.id,
        platform: "shopify",
        access_token,
        shop_domain: shop,
        status: "active",
        last_synced_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,platform",
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/analytics?error=database_error`
      );
    }

    // Trigger initial data sync
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/shopify/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    // Redirect back to analytics page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/analytics?success=shopify_connected`
    );
  } catch (error) {
    console.error("Shopify callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/analytics?error=connection_failed`
    );
  }
}
