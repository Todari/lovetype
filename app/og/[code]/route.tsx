import { ImageResponse } from "next/og";
import { TYPE_NAMES } from "@/lib/typeNames";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const typeInfo = TYPE_NAMES.find((type) => type.code === code);
  const typeName = typeInfo?.name || `${code} 유형`;
  const summary = typeInfo?.summary || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          backgroundImage: "linear-gradient(to bottom, #ffffff, #f9fafb)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            maxWidth: "1200px",
          }}
        >
          {/* Type Code */}
          <div
            style={{
              fontSize: "120px",
              fontWeight: "bold",
              color: "#f43f5e",
              marginBottom: "20px",
            }}
          >
            {code}
          </div>

          {/* Type Name */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            {typeName}
          </div>

          {/* Summary */}
          <div
            style={{
              fontSize: "32px",
              color: "#4b5563",
              textAlign: "center",
              lineHeight: "1.6",
              maxWidth: "1000px",
            }}
          >
            {summary.substring(0, 100)}
            {summary.length > 100 ? "..." : ""}
          </div>

          {/* LVTI Brand */}
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#f43f5e",
              marginTop: "60px",
            }}
          >
            LVTI
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

