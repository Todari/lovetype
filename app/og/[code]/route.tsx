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
  const { searchParams } = new URL(request.url);
  const isShare = searchParams.get("format") === "share";

  const typeInfo = TYPE_NAMES.find((type) => type.code === code);
  const typeName = typeInfo?.name || `${code} 유형`;
  const catchphrase = typeInfo?.catchphrase || "";
  const summary = typeInfo?.summary || "";
  const keywords = TYPE_KEYWORDS[code] || [];

  const fontData = await loadFont();
  const fontFamily = fontData ? "NotoSansKR" : "sans-serif";

  // 3:4 세로 이미지 (다운로드/공유용)
  if (isShare) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff1f2",
            backgroundImage:
              "linear-gradient(180deg, #ffffff 0%, #fff1f2 40%, #fce7f3 100%)",
            fontFamily,
            padding: "80px 60px",
          }}
        >
          {/* 상단: LVTI 브랜드 */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#f43f5e",
              fontFamily,
            }}
          >
            LVTI
          </div>

          {/* 중앙: 핵심 콘텐츠 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              maxWidth: "900px",
            }}
          >
            {/* 유형 이름 */}
            <div
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                color: "#111827",
                textAlign: "center",
                marginBottom: "20px",
                lineHeight: "1.2",
                fontFamily,
              }}
            >
              {typeName}
            </div>

            {/* 코드 뱃지 */}
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#f43f5e",
                backgroundColor: "#fff1f2",
                padding: "8px 28px",
                borderRadius: "9999px",
                border: "2px solid #fda4af",
                marginBottom: "40px",
                fontFamily,
              }}
            >
              {code}
            </div>

            {/* 캐치프레이즈 */}
            {catchphrase && (
              <div
                style={{
                  fontSize: "36px",
                  color: "#6b7280",
                  textAlign: "center",
                  marginBottom: "48px",
                  lineHeight: "1.5",
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
                  marginBottom: "48px",
                }}
              >
                {keywords.map((kw) => (
                  <div
                    key={kw}
                    style={{
                      fontSize: "24px",
                      backgroundColor: "#ffe4e6",
                      color: "#be123c",
                      padding: "10px 20px",
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

            {/* 요약 */}
            {summary && (
              <div
                style={{
                  fontSize: "24px",
                  color: "#9ca3af",
                  textAlign: "center",
                  lineHeight: "1.7",
                  fontFamily,
                }}
              >
                {summary}
              </div>
            )}
          </div>

          {/* 하단: 안내 */}
          <div
            style={{
              fontSize: "22px",
              color: "#d1d5db",
              fontFamily,
            }}
          >
            lvti.vercel.app
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1440,
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

  // 기본: OG 이미지 (1200x630, 소셜 카드용)
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
