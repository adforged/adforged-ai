/**
 * AdForge AI - Supabase Server
 * Server-side Supabase instance for App Router
 */

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  });
};

// Helper to get current user from server
export const getCurrentUser = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token");

  if (!accessToken) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken.value);

  return user;
};
