import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Sync Shopify Products and Analytics
 * This endpoint fetches products from Shopify and stores them in our database
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get Shopify integration
    const { data: integration, error: integrationError } = await supabase
      .from("platform_integrations")
      .select("*")
      .eq("user_id", user.id)
      .eq("platform", "shopify")
      .single();

    if (integrationError || !integration) {
      return NextResponse.json(
        { success: false, error: "Shopify not connected" },
        { status: 400 }
      );
    }

    const { access_token, shop_domain } = integration;

    // Fetch products from Shopify
    const productsResponse = await fetch(
      `https://${shop_domain}/admin/api/2024-01/products.json?limit=250`,
      {
        headers: {
          "X-Shopify-Access-Token": access_token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!productsResponse.ok) {
      throw new Error("Failed to fetch products from Shopify");
    }

    const { products } = await productsResponse.json();

    // Store products in database
    const productsToInsert = products.map((product: any) => ({
      user_id: user.id,
      shopify_product_id: product.id.toString(),
      title: product.title,
      handle: product.handle,
      description: product.body_html,
      vendor: product.vendor,
      product_type: product.product_type,
      price: product.variants?.[0]?.price || 0,
      currency: product.variants?.[0]?.currency_code || "USD",
      image_url: product.image?.src || null,
      images: product.images || [],
      status: product.status,
      published_at: product.published_at,
      tags: product.tags?.split(",").map((t: string) => t.trim()) || [],
      variants: product.variants || [],
      options: product.options || [],
      last_synced_at: new Date().toISOString(),
    }));

    const { error: upsertError } = await supabase
      .from("shopify_products")
      .upsert(productsToInsert, {
        onConflict: "user_id,shopify_product_id",
      });

    if (upsertError) {
      console.error("Failed to store products:", upsertError);
      return NextResponse.json(
        { success: false, error: "Failed to store products" },
        { status: 500 }
      );
    }

    // Update integration last_synced_at
    await supabase
      .from("platform_integrations")
      .update({ last_synced_at: new Date().toISOString() })
      .eq("id", integration.id);

    return NextResponse.json({
      success: true,
      products_synced: products.length,
      synced_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Shopify sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Sync failed",
      },
      { status: 500 }
    );
  }
}
