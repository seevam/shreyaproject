import { ImageResponse } from "next/og";
import { site } from "@content/site";

/** Social preview card (PRD §6.2). Rendered once at build time. */
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf7f0",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", gap: "18px" }}>
          <div
            style={{
              width: "96px",
              height: "132px",
              borderRadius: "12px",
              background: "#f7e7e1",
              border: "4px solid #c9503a",
              transform: "rotate(-8deg)",
            }}
          />
          <div
            style={{
              width: "96px",
              height: "132px",
              borderRadius: "12px",
              background: "#ffffff",
              border: "4px solid #a33c28",
              transform: "rotate(6deg)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "72px", color: "#1e1a15", lineHeight: 1.1 }}>
            {site.name}
          </div>
          <div style={{ marginTop: "24px", fontSize: "32px", color: "#5a5148" }}>
            {`An independent initiative by ${site.founder.name}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
