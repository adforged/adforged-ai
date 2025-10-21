import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdForge AI - Turn URLs into Winning Video Ads",
  description:
    "Paste a product link. Get 10 ready-to-run video ads in minutes. 1000+ AI avatars. Zero production costs.",
  keywords: [
    "AI video ads",
    "video ad generation",
    "AI avatars",
    "product video ads",
    "TikTok ads",
    "Instagram Reels",
    "video marketing",
  ],
  authors: [{ name: "AdForge AI" }],
  openGraph: {
    title: "AdForge AI - Turn URLs into Winning Video Ads",
    description:
      "Create stunning video ads from product URLs in minutes with AI avatars",
    type: "website",
    url: "https://adforged.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdForge AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdForge AI - Turn URLs into Winning Video Ads",
    description:
      "Create stunning video ads from product URLs in minutes with AI avatars",
    images: ["/twitter-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#8B5CF6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
