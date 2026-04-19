import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "gloood";
  const eyebrow = searchParams.get("eyebrow") ?? "";
  const subtitle = searchParams.get("subtitle") ?? "Websites that convert. Ads that compound.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0A0D1F",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 32, letterSpacing: 2, color: "#D6B585", fontWeight: 600 }}>
          {eyebrow || "gloood"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ fontSize: 32, color: "#AAA396", maxWidth: 900 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28, color: "#AAA396" }}>
          <div style={{ display: "flex", fontWeight: 700, color: "#ffffff", letterSpacing: 4 }}>gloood.in</div>
          <div style={{ display: "flex" }}>websites · ads</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
