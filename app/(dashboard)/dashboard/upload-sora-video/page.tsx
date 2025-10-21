"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, AlertCircle, QrCode } from "lucide-react";
import QRCode from "qrcode";

export default function UploadSoraVideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project_id");

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [showQR, setShowQR] = useState(false);

  // Generate QR code for mobile access
  useEffect(() => {
    const generateQR = async () => {
      try {
        const currentUrl = window.location.href;
        const qr = await QRCode.toDataURL(currentUrl, {
          width: 300,
          margin: 2,
          color: {
            dark: "#8B5CF6",
            light: "#FFFFFF",
          },
        });
        setQrCodeUrl(qr);
      } catch (err) {
        console.error("Failed to generate QR code:", err);
      }
    };
    generateQR();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      setError("Please upload a video file");
      return;
    }

    // Validate file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      setError("File size must be less than 500MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("project_id", projectId || "temp");

      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setVideoUrl(data.url);

        // Redirect back to project after 2 seconds
        setTimeout(() => {
          if (projectId) {
            router.push(`/dashboard/projects/${projectId}`);
          } else {
            router.push("/dashboard");
          }
        }, 2000);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Failed to upload video. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Upload Sora Video</h1>
        <p className="text-muted-foreground">
          Generate your video in the Sora mobile app, then upload it here
        </p>
      </div>

      {/* Instructions Card */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">📱 How to use:</h2>
        <ol className="space-y-2 text-sm">
          <li>1. Open the <strong>Sora mobile app</strong> on your phone</li>
          <li>2. Generate your video using the script from AdForge AI</li>
          <li>3. <strong>Save/download</strong> the video to your phone</li>
          <li>4. Use this page to <strong>upload</strong> the video</li>
          <li>5. Your video will be added to your AdForge project!</li>
        </ol>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-violet-500 transition-colors">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          disabled={uploading || success}
          className="hidden"
          id="video-upload"
        />
        <label
          htmlFor="video-upload"
          className={`cursor-pointer ${uploading || success ? "opacity-50" : ""}`}
        >
          {!success && !uploading && (
            <div className="space-y-4">
              <Upload className="w-16 h-16 mx-auto text-violet-500" />
              <div>
                <p className="text-lg font-semibold">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-muted-foreground">
                  MP4, MOV, or WebM (Max 500MB)
                </p>
              </div>
            </div>
          )}

          {uploading && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-500 mx-auto"></div>
              <p className="text-lg font-semibold">Uploading video...</p>
            </div>
          )}

          {success && (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <div>
                <p className="text-lg font-semibold text-green-600">
                  Upload successful!
                </p>
                <p className="text-sm text-muted-foreground">
                  Redirecting to your project...
                </p>
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Upload Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message with Preview */}
      {success && videoUrl && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="font-semibold text-green-900 mb-2">
            ✅ Video uploaded successfully!
          </p>
          <video
            src={videoUrl}
            controls
            className="w-full rounded-lg mt-4"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={uploading}
        >
          Cancel
        </Button>
        {projectId && (
          <Button
            onClick={() => router.push(`/dashboard/projects/${projectId}`)}
            disabled={uploading}
          >
            Back to Project
          </Button>
        )}
      </div>

      {/* QR Code for Mobile Access */}
      <div className="mt-12 border-2 border-violet-200 rounded-lg p-6 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <QrCode className="w-5 h-5 text-violet-600" />
              Access from Mobile
            </h3>
            <p className="text-sm text-muted-foreground">
              Scan this QR code with your phone to open this upload page
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQR(!showQR)}
          >
            {showQR ? "Hide" : "Show"} QR Code
          </Button>
        </div>

        {showQR && qrCodeUrl && (
          <div className="flex flex-col items-center space-y-3 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-md">
              📱 Open your phone's camera app and point it at this QR code. Make
              sure your phone is on the same WiFi network as this computer.
            </p>
          </div>
        )}
      </div>

      {/* Mobile Access Instructions */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>💡 Alternative:</strong> You can also manually enter this URL
          on your phone's browser (make sure you're on the same WiFi):{" "}
          <code className="bg-blue-100 px-2 py-1 rounded text-xs break-all">
            http://YOUR-COMPUTER-IP:3001/dashboard/upload-sora-video
          </code>
        </p>
      </div>
    </div>
  );
}
