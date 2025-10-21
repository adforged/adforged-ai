import type { VideoProvider } from "./abstract-provider";
import type { VideoConfig, VideoJob, VideoStatus, VideoResult } from "@/types";

/**
 * Mock Video Provider for Development and Testing
 *
 * This provider simulates video generation without calling external APIs.
 * Perfect for:
 * - Development and testing
 * - Demo purposes
 * - Avoiding API costs during development
 *
 * It creates realistic delays and status updates to simulate real video generation.
 */
export class MockVideoProvider implements VideoProvider {
  readonly name = "Mock Provider";

  // In-memory storage for job status (in production, use database)
  private jobs: Map<string, any> = new Map();

  /**
   * Generates a mock video job
   */
  async generateVideo(config: VideoConfig): Promise<VideoJob> {
    // Generate a unique job ID
    const jobId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Calculate estimated duration based on script length
    const scriptLength = config.script.length;
    const estimatedSeconds = Math.ceil(scriptLength / 15); // ~15 chars per second of speech
    const estimatedDuration = Math.min(Math.max(estimatedSeconds, 15), 120); // 15-120 seconds

    // Create initial job data
    const jobData = {
      id: jobId,
      config,
      status: "queued" as const,
      progress: 0,
      created_at: new Date().toISOString(),
      estimated_completion: new Date(Date.now() + 60000).toISOString(), // 60 seconds from now
      estimated_duration: estimatedDuration,
      current_stage: "Queued",
      stages: [
        { name: "Queued", status: "in_progress" as const, progress: 0 },
        { name: "Analyzing script", status: "pending" as const, progress: 0 },
        { name: "Rendering avatar", status: "pending" as const, progress: 0 },
        { name: "Generating voiceover", status: "pending" as const, progress: 0 },
        { name: "Adding effects", status: "pending" as const, progress: 0 },
        { name: "Finalizing video", status: "pending" as const, progress: 0 },
      ],
    };

    // Store job
    this.jobs.set(jobId, jobData);

    // Simulate async processing
    this.simulateProcessing(jobId);

    return {
      job_id: jobId,
      status: "queued",
      progress: 0,
      current_stage: "Initializing",
      estimated_time: 60,
      created_at: jobData.created_at,
    };
  }

  /**
   * Checks the status of a video generation job
   */
  async checkStatus(jobId: string): Promise<VideoStatus> {
    const job = this.jobs.get(jobId);

    if (!job) {
      throw new Error(`Job ${jobId} not found`);
    }

    return {
      job_id: jobId,
      status: job.status,
      progress: job.progress,
      current_stage: job.current_stage,
      stages: job.stages,
      error: job.error,
    };
  }

  /**
   * Retrieves the completed video
   */
  async getVideo(jobId: string): Promise<VideoResult> {
    const job = this.jobs.get(jobId);

    if (!job) {
      throw new Error(`Job ${jobId} not found`);
    }

    if (job.status !== "completed") {
      throw new Error(`Job ${jobId} is not completed yet. Current status: ${job.status}`);
    }

    return {
      job_id: jobId,
      video_url: job.video_url,
      thumbnail_url: job.thumbnail_url,
      duration: job.duration,
      file_size: 15936102, // 15.2 MB in bytes
      format: "mp4",
      metadata: {
        width: job.config.aspect_ratio === "16:9" ? 1920 : job.config.aspect_ratio === "1:1" ? 1080 : 1080,
        height: job.config.aspect_ratio === "16:9" ? 1080 : job.config.aspect_ratio === "1:1" ? 1080 : 1920,
        fps: 30,
        bitrate: 5000000,
        codec: "h264",
      },
    };
  }

  /**
   * Simulates the video generation process with realistic stages and delays
   */
  private async simulateProcessing(jobId: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    const stages = [
      { name: "Analyzing script", duration: 5000, progress: 15 },
      { name: "Rendering avatar", duration: 15000, progress: 40 },
      { name: "Generating voiceover", duration: 10000, progress: 65 },
      { name: "Adding effects", duration: 8000, progress: 85 },
      { name: "Finalizing video", duration: 7000, progress: 100 },
    ];

    // Update to processing
    job.status = "processing";
    job.progress = 5;
    job.stages[0].status = "completed";
    job.stages[1].status = "in_progress";

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];

      // Update current stage
      job.current_stage = stage.name;
      job.stages[i + 1].status = "in_progress";

      // Wait for stage duration
      await new Promise((resolve) => setTimeout(resolve, stage.duration));

      // Update progress
      job.progress = stage.progress;
      job.stages[i + 1].status = "completed";
      job.stages[i + 1].progress = 100;

      // Mark next stage as in progress (if not last)
      if (i < stages.length - 1) {
        job.stages[i + 2].status = "in_progress";
      }
    }

    // Complete the job
    job.status = "completed";
    job.progress = 100;
    job.current_stage = "Completed";
    job.completed_at = new Date().toISOString();

    // Generate mock video URL (placeholder)
    const { aspect_ratio } = job.config;
    const width = aspect_ratio === "16:9" ? 1920 : aspect_ratio === "1:1" ? 1080 : 1080;
    const height = aspect_ratio === "16:9" ? 1080 : aspect_ratio === "1:1" ? 1080 : 1920;

    job.video_url = `https://placehold.co/${width}x${height}/8B5CF6/white/mp4?text=Video+Generated&font=roboto`;
    job.thumbnail_url = `https://placehold.co/${width}x${height}/8B5CF6/white?text=Video+Thumbnail`;
    job.duration = job.estimated_duration;
  }

  /**
   * Clear all jobs (useful for testing)
   */
  clearJobs() {
    this.jobs.clear();
  }
}

// Singleton instance
export const mockVideoProvider = new MockVideoProvider();
