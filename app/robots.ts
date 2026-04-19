import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "YouBot",
          "Amazonbot",
          "DuckAssistBot",
          "Bytespider",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://gloood.in/sitemap.xml",
  };
}
