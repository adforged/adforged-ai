/**
 * Test endpoint to verify Supabase connection
 * Visit: http://localhost:3001/api/test-supabase
 */

import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerClient();

    // Test connection by querying Supabase
    const { data, error } = await supabase.from("users").select("count");

    if (error) {
      // If error is "relation does not exist", tables aren't created yet
      if (error.message.includes("relation") || error.message.includes("does not exist")) {
        return NextResponse.json({
          success: true,
          message: "✅ Supabase connected! But database tables not created yet.",
          hint: "Run the SQL schema in Supabase SQL Editor",
          connection: "working",
          tables: "not_created",
        });
      }

      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "✅ Supabase fully configured and tables exist!",
      connection: "working",
      tables: "created",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "❌ Supabase connection failed",
      error: error.message,
      hint: "Check your .env.local file and Supabase credentials",
    }, { status: 500 });
  }
}
