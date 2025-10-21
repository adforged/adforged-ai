import type {
  VideoConfig,
  VideoJob,
  VideoStatus,
  VideoResult,
} from "@/types";
import { VideoProvider } from "./abstract-provider";

/**
 * Sora Video Generation Provider
 * Uses OpenAI's Sora API for AI video generation
 */
export class SoraProvider implements VideoProvider {
  readonly name = "Sora";
  private apiKey: string;
  private baseUrl = "https://api.openai.com/v1";

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("OPENAI_API_KEY is required for Sora provider");
    }
  }

  /**
   * Generate a video using Sora
   */
  async generateVideo(config: VideoConfig): Promise<VideoJob> {
    try {
      console.log("[Sora] Generating video with config:", {
        project_id: config.project_id,
        script_length: config.script.length,
        duration: config.duration,
        aspect_ratio: config.aspect_ratio,
      });

      // Build the prompt for Sora
      const prompt = this.buildPrompt(config);
      console.log("[Sora] Generated prompt:", prompt);

      // Call Sora API to generate video
      const response = await fetch(`${this.baseUrl}/video/generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "sora-1.0-turbo",
          prompt: prompt,
          size: this.getVideoSize(config.aspect_ratio),
          duration: Math.min(config.duration, 20), // Sora max is 20 seconds
          quality: config.quality === "4k" ? "high" : "standard",
        }),
      });

      if (!response.ok) {
        let errorMessage = `Sora API error: ${response.status} ${response.statusText}`;
        try {
          const error = await response.json();
          errorMessage = `Sora API error: ${JSON.stringify(error)}`;
        } catch (parseError) {
          // If response is not JSON (e.g., HTML error page), use the text
          const text = await response.text();
          errorMessage = `Sora API error: ${response.status} - ${text.substring(0, 200)}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("[Sora] Video generation started:", data);

      return {
        job_id: data.id,
        status: "processing",
        progress: 0,
        current_stage: "Generating video with Sora AI",
        estimated_time: config.duration * 3, // Rough estimate: 3x video duration
        created_at: new Date().toISOString(),
      };
    } catch (error) {
      console.error("[Sora] Error generating video:", error);
      throw error;
    }
  }

  /**
   * Check the status of a Sora video generation
   */
  async checkStatus(jobId: string): Promise<VideoStatus> {
    try {
      console.log("[Sora] Checking status for job:", jobId);

      const response = await fetch(`${this.baseUrl}/video/generations/${jobId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to check Sora job status: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("[Sora] Job status:", data);

      // Map Sora status to our status format
      const status = this.mapSoraStatus(data.status);
      const progress = this.calculateProgress(data.status);

      return {
        job_id: jobId,
        status: status,
        progress: progress,
        current_stage: this.getStageName(data.status),
        stages: [
          {
            name: "Analyzing prompt",
            status: progress > 0 ? "completed" : "processing",
            progress: progress > 0 ? 100 : 0,
          },
          {
            name: "Generating video frames",
            status: progress > 50 ? "completed" : progress > 0 ? "processing" : "pending",
            progress: Math.max(0, (progress - 0) * 2),
          },
          {
            name: "Rendering final video",
            status: progress === 100 ? "completed" : progress > 50 ? "processing" : "pending",
            progress: Math.max(0, (progress - 50) * 2),
          },
        ],
        error: data.error?.message,
      };
    } catch (error) {
      console.error("[Sora] Error checking status:", error);
      throw error;
    }
  }

  /**
   * Get the completed video
   */
  async getVideo(jobId: string): Promise<VideoResult> {
    try {
      console.log("[Sora] Fetching video for job:", jobId);

      const response = await fetch(`${this.baseUrl}/video/generations/${jobId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Sora video: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status !== "succeeded") {
        throw new Error(`Video generation not completed. Status: ${data.status}`);
      }

      console.log("[Sora] Video ready:", data);

      return {
        job_id: jobId,
        video_url: data.url,
        thumbnail_url: data.thumbnail_url || data.url,
        duration: data.duration || 10,
        file_size: data.file_size || 0,
        format: "mp4",
        metadata: {
          width: data.width || 1920,
          height: data.height || 1080,
          fps: 24,
          bitrate: 5000,
          codec: "h264",
        },
      };
    } catch (error) {
      console.error("[Sora] Error fetching video:", error);
      throw error;
    }
  }

  /**
   * Build a detailed prompt for Sora based on the video config
   */
  private buildPrompt(config: VideoConfig): string {
    // For now, we'll use the script as the main prompt
    // In production, you'd enhance this with avatar descriptions, style, etc.
    let prompt = config.script;

    // Add visual style instructions
    prompt += "\n\nStyle: Professional product advertisement, high quality, well-lit, modern aesthetic.";

    // Add aspect ratio hint
    if (config.aspect_ratio === "9:16") {
      prompt += " Vertical format optimized for mobile viewing.";
    } else if (config.aspect_ratio === "16:9") {
      prompt += " Landscape format for YouTube and web.";
    }

    return prompt;
  }

  /**
   * Get video size based on aspect ratio
   */
  private getVideoSize(aspectRatio: string): string {
    const sizeMap: Record<string, string> = {
      "16:9": "1920x1080", // landscape
      "9:16": "1080x1920", // portrait (TikTok/Reels)
      "1:1": "1080x1080",  // square
      "4:5": "1080x1350",  // Instagram portrait
    };
    return sizeMap[aspectRatio] || "1920x1080";
  }

  /**
   * Map Sora API status to our status format
   */
  private mapSoraStatus(
    soraStatus: string
  ): "queued" | "processing" | "completed" | "failed" {
    switch (soraStatus) {
      case "queued":
      case "pending":
        return "queued";
      case "processing":
      case "in_progress":
        return "processing";
      case "succeeded":
      case "completed":
        return "completed";
      case "failed":
      case "error":
        return "failed";
      default:
        return "processing";
    }
  }

  /**
   * Calculate progress percentage from Sora status
   */
  private calculateProgress(soraStatus: string): number {
    switch (soraStatus) {
      case "queued":
      case "pending":
        return 0;
      case "processing":
      case "in_progress":
        return 50; // Rough estimate
      case "succeeded":
      case "completed":
        return 100;
      case "failed":
      case "error":
        return 0;
      default:
        return 0;
    }
  }

  /**
   * Get human-readable stage name
   */
  private getStageName(soraStatus: string): string {
    switch (soraStatus) {
      case "queued":
      case "pending":
        return "Video queued for processing";
      case "processing":
      case "in_progress":
        return "Generating video with Sora AI";
      case "succeeded":
      case "completed":
        return "Video generation complete";
      case "failed":
      case "error":
        return "Video generation failed";
      default:
        return "Processing";
    }
  }
}
