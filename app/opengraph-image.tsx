import { ImageResponse } from "next/og"

export const alt = "TurboData Analytics: Find the profit hidden inside your business."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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
          padding: "72px 80px",
          background: "#0b1d33",
          color: "#f7f6f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>TurboData Analytics</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 900 }}>
            Find the profit hidden inside your business.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#b9c3d3", maxWidth: 950 }}>
            Business analytics and operations improvement for Ontario SMEs
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#8fb8ff" }}>
          <div style={{ width: 48, height: 6, background: "#0056d2", borderRadius: 3 }} />
          Sarnia-Lambton, Ontario · turbodata.co
        </div>
      </div>
    ),
    size,
  )
}
