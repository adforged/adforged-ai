/**
 * Optimized OpenAI Client
 * Includes retry logic, error handling, and request optimization
 */

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
};

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Calculate exponential backoff delay
 */
function calculateBackoff(attempt: number, config: RetryConfig): number {
  const delay = config.initialDelay * Math.pow(config.backoffMultiplier, attempt);
  return Math.min(delay, config.maxDelay);
}

/**
 * Determine if error is retryable
 */
function isRetryableError(error: any): boolean {
  // Rate limit errors
  if (error.status === 429) return true;

  // Server errors
  if (error.status >= 500) return true;

  // Timeout errors
  if (error.code === "ETIMEDOUT" || error.code === "ECONNRESET") return true;

  // OpenAI specific errors
  if (error.type === "server_error" || error.type === "timeout") return true;

  return false;
}

/**
 * OpenAI Chat Completion with Retry Logic
 */
export async function createChatCompletion(
  params: OpenAI.Chat.ChatCompletionCreateParams,
  retryConfig: Partial<RetryConfig> = {}
): Promise<OpenAI.Chat.ChatCompletion> {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  let lastError: any;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const startTime = Date.now();

      const completion = await openai.chat.completions.create({ ...params, stream: false });

      const duration = Date.now() - startTime;
      const tokens = completion.usage?.total_tokens || 0;
      console.log(`[OpenAI] Success - ${duration}ms - Tokens: ${tokens}`);

      return completion;
    } catch (error: any) {
      lastError = error;

      console.error(`[OpenAI] Attempt ${attempt + 1}/${config.maxRetries + 1} failed:`, {
        status: error.status,
        type: error.type,
        message: error.message,
      });

      // Don't retry if it's not a retryable error
      if (!isRetryableError(error)) {
        throw error;
      }

      // Don't retry if we've exhausted attempts
      if (attempt === config.maxRetries) {
        throw error;
      }

      // Calculate and apply backoff delay
      const delay = calculateBackoff(attempt, config);
      console.log(`[OpenAI] Retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }

  throw lastError;
}

/**
 * Optimized Script Generation
 * Uses streaming and caching where possible
 */
export async function generateScriptsOptimized(
  prompt: string,
  systemPrompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  } = {}
): Promise<string> {
  const {
    temperature = 0.8,
    maxTokens = 4000,
    model = "gpt-4o-mini"
  } = options;

  try {
    const completion = await createChatCompletion({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
    }, {
      maxRetries: 3,
      initialDelay: 1000,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    return content;
  } catch (error) {
    console.error("[OpenAI] Script generation failed:", error);
    throw new Error("Failed to generate scripts. Please try again.");
  }
}

/**
 * Token Counter Utility
 * Estimates token count to prevent exceeding limits
 */
export function estimateTokenCount(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

/**
 * Validate Token Limits
 */
export function validateTokenLimits(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number,
  model: string = "gpt-4o-mini"
): { valid: boolean; error?: string } {
  const modelLimits: Record<string, number> = {
    "gpt-4o-mini": 128000,
    "gpt-4o": 128000,
    "gpt-4": 8192,
    "gpt-3.5-turbo": 16385,
  };

  const modelLimit = modelLimits[model] || 8192;
  const estimatedInputTokens = estimateTokenCount(systemPrompt) + estimateTokenCount(userPrompt);
  const totalEstimatedTokens = estimatedInputTokens + maxTokens;

  if (totalEstimatedTokens > modelLimit) {
    return {
      valid: false,
      error: `Token limit exceeded. Estimated: ${totalEstimatedTokens}, Limit: ${modelLimit}`,
    };
  }

  return { valid: true };
}

/**
 * Batch Request Handler
 * Handles multiple OpenAI requests efficiently
 */
export async function batchChatCompletions(
  requests: OpenAI.Chat.ChatCompletionCreateParams[],
  options: { concurrency?: number; retryConfig?: Partial<RetryConfig> } = {}
): Promise<OpenAI.Chat.ChatCompletion[]> {
  const { concurrency = 3, retryConfig } = options;

  const results: OpenAI.Chat.ChatCompletion[] = [];

  // Process requests in batches
  for (let i = 0; i < requests.length; i += concurrency) {
    const batch = requests.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(req => createChatCompletion(req, retryConfig))
    );
    results.push(...batchResults);
  }

  return results;
}

/**
 * Cost Calculator
 * Estimates API costs based on token usage
 */
export function calculateCost(tokens: number, model: string = "gpt-4o-mini"): number {
  const pricing: Record<string, { input: number; output: number }> = {
    "gpt-4o-mini": { input: 0.15 / 1_000_000, output: 0.60 / 1_000_000 },
    "gpt-4o": { input: 2.50 / 1_000_000, output: 10.00 / 1_000_000 },
    "gpt-4": { input: 30.00 / 1_000_000, output: 60.00 / 1_000_000 },
    "gpt-3.5-turbo": { input: 0.50 / 1_000_000, output: 1.50 / 1_000_000 },
  };

  const modelPricing = pricing[model] || pricing["gpt-4o-mini"];

  // Assume 50/50 split between input and output for estimation
  const inputCost = (tokens / 2) * modelPricing.input;
  const outputCost = (tokens / 2) * modelPricing.output;

  return inputCost + outputCost;
}

export { openai };
