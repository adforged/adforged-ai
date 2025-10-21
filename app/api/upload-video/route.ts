import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

/**
 * API Route: Upload Sora-generated video
 *
 * Receives video file from Cypress automation and stores it
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const video = formData.get("video") as File;
    const projectId = formData.get("project_id") as string;

    if (!video) {
      return NextResponse.json(
        { success: false, error: "No video file provided" },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await video.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create filename with timestamp
    const timestamp = Date.now();
    const filename = `sora-video-${projectId}-${timestamp}.mp4`;

    // Save to public directory (for development)
    // In production, you'd upload to Supabase Storage or S3
    const publicPath = path.join(process.cwd(), "public", "videos", filename);
    await writeFile(publicPath, buffer);

    // Generate public URL
    const videoUrl = `/videos/${filename}`;

    console.log(`✅ Video uploaded: ${videoUrl}`);

    return NextResponse.json({
      success: true,
      url: videoUrl,
      filename,
      size: video.size,
      projectId,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to upload video",
      },
      { status: 500 }
    );
  }
}
