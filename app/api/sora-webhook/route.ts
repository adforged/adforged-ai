import { NextRequest, NextResponse } from "next/server";

/**
 * Sora Webhook - Receives video URL from Cypress automation
 *
 * This endpoint is called by Cypress when Sora video is ready
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoUrl, projectId, status, timestamp } = body;

    console.log('📹 Sora video webhook received:', {
      videoUrl,
      projectId,
      status,
      timestamp,
    });

    // TODO: Update your database with the video URL
    // Example:
    // await supabase
    //   .from('projects')
    //   .update({
    //     video_url: videoUrl,
    //     status: 'completed',
    //     completed_at: timestamp
    //   })
    //   .eq('id', projectId);

    // For now, just log it
    console.log('✅ Sora video URL stored:', videoUrl);

    return NextResponse.json({
      success: true,
      message: 'Sora video received',
      data: { videoUrl },
    });
  } catch (error) {
    console.error('Error processing Sora webhook:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process webhook',
      },
      { status: 500 }
    );
  }
}
