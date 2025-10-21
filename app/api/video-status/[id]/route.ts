import { NextRequest, NextResponse } from "next/server";
import { getVideoProvider } from "@/lib/video-generation";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: jobId } = await params;
  try {
    if (!jobId) {
      return NextResponse.json(
        { success: false, error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Get video provider (Sora or Mock based on VIDEO_PROVIDER env var)
    const provider = getVideoProvider();
    console.log(`[API] Checking status with provider: ${provider.name}`);

    try {
      const status = await provider.checkStatus(jobId);

      // If completed, also get the video details
      if (status.status === "completed") {
        const video = await provider.getVideo(jobId);
        return NextResponse.json({
          success: true,
          data: {
            ...status,
            video_url: video.video_url,
            thumbnail_url: video.thumbnail_url,
            duration: video.duration,
            metadata: video.metadata,
          },
        });
      }

      return NextResponse.json({
        success: true,
        data: status,
      });
    } catch (error) {
      // Job not found
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Job not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error checking video status:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to check video status",
      },
      { status: 500 }
    );
  }
}
