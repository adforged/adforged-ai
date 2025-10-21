import type { VideoConfig, VideoJob, VideoStatus, VideoResult } from "@/types";

/**
 * Abstract interface for video generation providers
 * This allows us to easily swap between different providers (Mock, HeyGen, Sora 2, etc.)
 */
export interface VideoProvider {
  /**
   * Initiates video generation
   * @param config - Video configuration including script, avatar, voice, etc.
   * @returns VideoJob with job ID and initial status
   */
  generateVideo(config: VideoConfig): Promise<VideoJob>;

  /**
   * Checks the status of a video generation job
   * @param jobId - The unique job identifier
   * @returns Current status of the video generation
   */
  checkStatus(jobId: string): Promise<VideoStatus>;

  /**
   * Retrieves the completed video
   * @param jobId - The unique job identifier
   * @returns Video result with URL and metadata
   */
  getVideo(jobId: string): Promise<VideoResult>;

  /**
   * Provider name for logging/debugging
   */
  readonly name: string;
}
