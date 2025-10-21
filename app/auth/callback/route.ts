import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient();

    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to dashboard after successful login
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
