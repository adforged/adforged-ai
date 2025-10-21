import { defineConfig } from "cypress";
import * as fs from "fs";
import * as path from "path";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001", // Updated to match current server
    setupNodeEvents(on, config) {
      // Task: Find latest downloaded file
      on("task", {
        findLatestDownload({ extension }: { extension: string }) {
          const downloadsPath = path.join(__dirname, "cypress", "downloads");

          if (!fs.existsSync(downloadsPath)) {
            return null;
          }

          const files = fs
            .readdirSync(downloadsPath)
            .filter((file) => file.endsWith(`.${extension}`))
            .map((file) => ({
              name: file,
              time: fs.statSync(path.join(downloadsPath, file)).mtime.getTime(),
            }))
            .sort((a, b) => b.time - a.time);

          return files.length > 0 ? files[0].name : null;
        },

        // Task: Delete all downloads (cleanup)
        clearDownloads() {
          const downloadsPath = path.join(__dirname, "cypress", "downloads");

          if (fs.existsSync(downloadsPath)) {
            fs.readdirSync(downloadsPath).forEach((file) => {
              fs.unlinkSync(path.join(downloadsPath, file));
            });
          }

          return null;
        },

        // Task: Log message (for debugging)
        log(message: string) {
          console.log(`[Cypress Task] ${message}`);
          return null;
        },
      });
    },
    // Sora generation can take a long time
    defaultCommandTimeout: 1800000, // 30 minutes
    pageLoadTimeout: 120000, // 2 minutes
    requestTimeout: 120000, // 2 minutes
  },

  // Environment variables for Sora credentials
  env: {
    SORA_EMAIL: process.env.SORA_EMAIL,
    SORA_PASSWORD: process.env.SORA_PASSWORD,
  },

  // Video recording settings
  video: true,
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",

  // Downloads folder for Sora videos
  downloadsFolder: "cypress/downloads",
});
