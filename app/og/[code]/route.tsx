import { ImageResponse } from "next/og";
import { TYPE_NAMES } from "@/lib/typeNames";
import { TYPE_KEYWORDS } from "@/lib/typeKeywords";

export const runtime = "edge";

const FONT_URL =
  "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.woff";

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(FONT_URL);
    if (!response.ok) return null;
    return await response.arrayBuffer();
  } catch {
    return null;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const typeInfo = TYPE_NAMES.find((type) => type.code === code);
  const typeName = typeInfo?.name || `${code} 유형`;
  const catchphrase = typeInfo?.catchphrase || "";
  const keywords = TYPE_KEYWORDS[code] || [];

  const fontData = await loadFont();
  const fontFamily = fontData ? "NotoSansKR" : "sans-serif";

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
          backgroundColor: "#fff1f2",
          backgroundImage:
            "linear-gradient(135deg, #fff1f2 0%, #ffffff 50%, #fce7f3 100%)",
          fontFamily,
          position: "relative",
        }}
      >
        {/* LVTI 브랜드 (좌상단) */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            fontSize: "28px",
            fontWeight: "bold",
            color: "#f43f5e",
            fontFamily,
          }}
        >
          LVTI
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            maxWidth: "1200px",
          }}
        >
          {/* 유형 이름 (가장 큼) */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "#111827",
              textAlign: "center",
              marginBottom: "16px",
              fontFamily,
            }}
          >
            {typeName}
          </div>

          {/* 코드 뱃지 */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#f43f5e",
              backgroundColor: "#fff1f2",
              padding: "6px 20px",
              borderRadius: "9999px",
              border: "2px solid #fda4af",
              marginBottom: "32px",
              fontFamily,
            }}
          >
            {code}
          </div>

          {/* 캐치프레이즈 */}
          {catchphrase && (
            <div
              style={{
                fontSize: "32px",
                color: "#6b7280",
                textAlign: "center",
                marginBottom: "40px",
                fontFamily,
              }}
            >
              {`\u201C${catchphrase}\u201D`}
            </div>
          )}

          {/* 키워드 칩 */}
          {keywords.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {keywords.map((kw) => (
                <div
                  key={kw}
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#ffe4e6",
                    color: "#be123c",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    margin: "6px",
                    fontFamily,
                  }}
                >
                  {kw}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(fontData && {
        fonts: [
          {
            name: "NotoSansKR",
            data: fontData,
            style: "normal" as const,
            weight: 700,
          },
        ],
      }),
    }
  );
}
