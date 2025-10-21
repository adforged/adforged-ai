import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * Get Analytics Overview
 * Returns aggregated metrics across all platforms
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get("timeRange") || "7d";

    const supabase = createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Calculate date range
    const now = new Date();
    const daysAgo = {
      "24h": 1,
      "7d": 7,
      "30d": 30,
      "90d": 90,
    }[timeRange] || 7;

    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - daysAgo);

    // Get all campaigns for user
    const { data: campaigns, error: campaignsError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", user.id);

    if (campaignsError) {
      throw campaignsError;
    }

    // Calculate aggregate metrics
    const totalSpend = campaigns?.reduce((sum, c) => sum + (Number(c.spend) || 0), 0) || 0;
    const totalRevenue = campaigns?.reduce((sum, c) => sum + (Number(c.revenue) || 0), 0) || 0;
    const totalConversions = campaigns?.reduce((sum, c) => sum + (c.conversions || 0), 0) || 0;
    const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

    // Get campaign performance history for trends
    const { data: performance, error: perfError } = await supabase
      .from("campaign_performance")
      .select("*")
      .in("campaign_id", campaigns?.map(c => c.id) || [])
      .gte("date", startDate.toISOString().split("T")[0])
      .order("date", { ascending: true });

    if (perfError) {
      console.error("Performance query error:", perfError);
    }

    // Calculate trends (compare to previous period)
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(prevStartDate.getDate() - daysAgo);

    const { data: prevPerformance } = await supabase
      .from("campaign_performance")
      .select("*")
      .in("campaign_id", campaigns?.map(c => c.id) || [])
      .gte("date", prevStartDate.toISOString().split("T")[0])
      .lt("date", startDate.toISOString().split("T")[0]);

    const prevSpend = prevPerformance?.reduce((sum, p) => sum + (Number(p.spend) || 0), 0) || 0;
    const prevRevenue = prevPerformance?.reduce((sum, p) => sum + (Number(p.revenue) || 0), 0) || 0;
    const prevConversions = prevPerformance?.reduce((sum, p) => sum + (p.conversions || 0), 0) || 0;

    const spendChange = prevSpend > 0 ? ((totalSpend - prevSpend) / prevSpend) * 100 : 0;
    const revenueChange = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;
    const conversionsChange = prevConversions > 0 ? ((totalConversions - prevConversions) / prevConversions) * 100 : 0;

    // Get platform integrations status
    const { data: integrations } = await supabase
      .from("platform_integrations")
      .select("platform, status, last_synced_at")
      .eq("user_id", user.id);

    // Get Shopify products count
    const { count: productsCount } = await supabase
      .from("shopify_products")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          totalSpend: totalSpend.toFixed(2),
          totalRevenue: totalRevenue.toFixed(2),
          roas: roas.toFixed(2),
          conversions: totalConversions,
          spendChange: spendChange.toFixed(1),
          revenueChange: revenueChange.toFixed(1),
          conversionsChange: conversionsChange.toFixed(1),
        },
        integrations: integrations?.map(i => ({
          platform: i.platform,
          connected: i.status === "active",
          lastSynced: i.last_synced_at,
        })) || [],
        campaigns: campaigns?.length || 0,
        products: productsCount || 0,
        performanceHistory: performance || [],
      },
    });
  } catch (error) {
    console.error("Analytics overview error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch analytics",
      },
      { status: 500 }
    );
  }
}
