import { ImageResponse } from "next/og";
import { site } from "@content/site";

/** Social preview card (PRD §6.2). Rendered once at build time. */
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default function OpengraphImage() {
  const dot = (fill: string) => (
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "22px",
        background: fill,
        border: "5px solid #11468f",
      }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fffbf3",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", gap: "18px" }}>
          {dot("#a666f5")}
          {dot("#febc0d")}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "88px", color: "#11468f", lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ marginTop: "24px", fontSize: "34px", color: "#4b587a" }}>
            {`A visual cue deck for children, and the adults who want to understand them`}
          </div>
          <div style={{ marginTop: "20px", fontSize: "28px", color: "#c0187f" }}>
            {`By ${site.founder.name}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
