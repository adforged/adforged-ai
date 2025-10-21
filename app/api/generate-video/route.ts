import { NextRequest, NextResponse } from "next/server";
import { getVideoProvider } from "@/lib/video-generation";
import type { VideoConfig } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const { script, avatar_id, voice_id, template_id, aspect_ratio, quality } = body;

    if (!script) {
      return NextResponse.json(
        { success: false, error: "Script is required" },
        { status: 400 }
      );
    }

    if (!avatar_id) {
      return NextResponse.json(
        { success: false, error: "Avatar ID is required" },
        { status: 400 }
      );
    }

    if (!voice_id) {
      return NextResponse.json(
        { success: false, error: "Voice ID is required" },
        { status: 400 }
      );
    }

    // Create video config
    const videoConfig: VideoConfig = {
      project_id: body.project_id || "test-project",
      script,
      avatar_id,
      voice_id,
      template_id: template_id || "modern-showcase",
      aspect_ratio: aspect_ratio || "9:16",
      quality: quality || "1080p",
      duration: body.duration || 10,
      background_music: body.background_music,
      captions: body.captions,
      caption_style: body.caption_style,
    };

    // Get video provider (Sora or Mock based on VIDEO_PROVIDER env var)
    const provider = getVideoProvider();
    console.log(`[API] Using video provider: ${provider.name}`);

    const job = await provider.generateVideo(videoConfig);

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate video",
      },
      { status: 500 }
    );
  }
}
