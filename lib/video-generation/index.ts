import { VideoProvider } from "./abstract-provider";
import { MockVideoProvider } from "./mock-provider";
import { SoraProvider } from "./sora-provider";

/**
 * Get the video generation provider based on environment configuration
 */
export function getVideoProvider(): VideoProvider {
  const provider = process.env.VIDEO_PROVIDER || "mock";

  console.log(`[VideoProvider] Using provider: ${provider}`);

  switch (provider.toLowerCase()) {
    case "sora":
      return new SoraProvider();
    case "mock":
      return new MockVideoProvider();
    default:
      console.warn(`[VideoProvider] Unknown provider "${provider}", falling back to mock`);
      return new MockVideoProvider();
  }
}

/**
 * Export provider classes for direct instantiation if needed
 */
export { MockVideoProvider, SoraProvider };
export type { VideoProvider };
