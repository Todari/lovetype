export type Pole = "L" | "F" | "C" | "A" | "R" | "P" | "O" | "E";

export const POLE_DESCRIPTIONS: Record<Pole, string> = {
  L: "주도적으로 이끌고 방향을 제시하는 스타일입니다.",
  F: "합의를 중시하고 유연하게 맞춰가는 스타일입니다.",
  C: "따뜻하고 표현이 풍부하며 스킨십을 즐기는 스타일입니다.",
  A: "안정적이며 공간을 존중하고, 함께함으로 애정을 보여주는 스타일입니다.",
  R: "실용적이고 계획적으로 관계를 바닥에 두는 스타일입니다.",
  P: "로맨틱한 감정을 중시하며 감성적인 순간을 소중히 여기는 스타일입니다.",
  O: "가볍고 긍정적으로 재해석하며 빠르게 회복하는 스타일입니다.",
  E: "신뢰할 수 있고 일관성 있으며 깊이 있게 헌신하는 스타일입니다.",
};

// 상세한 유형 설명
export const DETAILED_DESCRIPTIONS: Record<string, string> = {
  L: "당신은 관계에서 자연스럽게 주도권을 잡고, 명확한 방향을 제시하는 스타일입니다. 결정이 필요할 때 주저하지 않고 나서며, 상대방이 망설일 때 확신을 주는 역할을 합니다. 이런 특성은 안정감을 주지만, 때로는 상대방의 의견을 먼저 들어보는 것도 중요합니다.",
  F: "당신은 상대방의 의견을 존중하고, 함께 결정하는 과정을 소중히 여기는 스타일입니다. 유연하게 맞춰가며 협력적인 관계를 만들어갑니다. 이런 특성은 조화로운 관계를 만들지만, 자신의 의견도 적극적으로 표현하는 것이 필요합니다.",
  C: "당신은 애정 표현이 풍부하고, 스킨십과 따뜻한 터치를 통해 사랑을 전달하는 스타일입니다. 상대방에게 많은 관심과 애정을 보여주며, 관계에 활력을 불어넣습니다. 다만 상대방의 공간과 속도를 존중하는 것도 잊지 마세요.",
  A: "당신은 말보다 행동으로, 함께하는 시간으로 사랑을 표현하는 스타일입니다. 안정적이고 신뢰할 수 있는 존재감으로 관계의 기반을 만들어갑니다. 때로는 말로도 애정을 표현하는 것이 관계를 더 깊게 만들 수 있습니다.",
  R: "당신은 현실적이고 실용적인 판단을 통해 관계를 안정적으로 이끌어가는 스타일입니다. 계획적이고 신중한 접근으로 실질적인 문제를 해결합니다. 가끔은 계획을 벗어난 즉흥적인 순간도 관계에 신선함을 줄 수 있습니다.",
  P: "당신은 감정과 로맨스를 중시하며, 감성적인 순간을 소중히 여기는 스타일입니다. 즉흥적이고 열정적인 사랑으로 관계에 색을 더합니다. 현실적인 계획도 함께 고려한다면 더욱 완벽한 관계가 될 것입니다.",
  O: "당신은 긍정적이고 유연한 태도로 관계의 어려움을 가볍게 넘어가는 스타일입니다. 빠르게 분위기를 전환하고, 문제를 긍정적으로 재해석하는 능력이 있습니다. 중요한 문제는 진지하게 다루는 것도 필요합니다.",
  E: "당신은 일관성 있고 신뢰할 수 있는 모습으로 깊이 있는 관계를 만들어가는 스타일입니다. 약속을 지키고 책임감 있게 행동하며, 상대방에게 안정감을 줍니다. 때로는 가볍게 즐기는 시간도 관계에 활력을 줄 수 있습니다.",
};

export function getResultDescription(code: string): string {
  const poles = code.split("") as Pole[];
  return poles.map((pole) => POLE_DESCRIPTIONS[pole]).join(" ");
}

export function getDetailedDescription(code: string): string {
  const poles = code.split("") as Pole[];
  return poles.map((pole) => DETAILED_DESCRIPTIONS[pole]).join(" ");
}

// 궁합 정보 생성 함수
// 논리적 근거:
// 1. 보완적 궁합: 서로 다른 특성이 보완되어 조화를 이루는 경우 (역할 분담 명확)
//    - LF: 주도적 + 유연함 = 결정과 실행의 균형
//    - CA: 애정 표현 + 안정적 = 따뜻함과 신뢰의 균형
//    - RP: 현실적 + 열정적 = 계획과 즉흥의 균형
//    - OE: 낙관적 + 진지함 = 가벼움과 깊이의 균형
// 2. 유사한 궁합: 비슷한 특성으로 이해가 쉬운 경우 (빠른 공감대 형성)
// 3. 균형적 궁합: 일부는 비슷하고 일부는 보완적인 경우 (다양한 시너지)
export function getCompatibility(code: string): {
  best: string[];
  good: string[];
  description: string;
} {
  const [l, c, r, o] = code.split("") as Pole[];

  // 반대 극 찾기
  const oppositeL = l === "L" ? "F" : "L";
  const oppositeC = c === "C" ? "A" : "C";
  const oppositeR = r === "R" ? "P" : "R";
  const oppositeO = o === "O" ? "E" : "O";

  // 최고 궁합: 핵심 축(LF, CA)이 보완적이고, 나머지는 유사하거나 보완적
  // LF와 CA는 관계의 기본 구조이므로 보완적일 때 가장 조화로움
  const best1 = `${oppositeL}${oppositeC}${r}${o}`; // 핵심 2개 보완
  const best2 = `${oppositeL}${oppositeC}${oppositeR}${o}`; // 핵심 2개 + RP 보완
  const best3 = `${oppositeL}${oppositeC}${r}${oppositeO}`; // 핵심 2개 + OE 보완
  const best4 = `${oppositeL}${c}${oppositeR}${oppositeO}`; // LF + RP+OE 보완

  // 좋은 궁합: 1-2개 축이 보완적이거나, 핵심 축 중 하나가 보완적
  const good1 = `${oppositeL}${c}${r}${o}`; // LF만 보완
  const good2 = `${l}${oppositeC}${r}${o}`; // CA만 보완
  const good3 = `${l}${c}${oppositeR}${o}`; // RP만 보완
  const good4 = `${l}${c}${r}${oppositeO}`; // OE만 보완
  const good5 = `${oppositeL}${c}${oppositeR}${o}`; // LF+RP 보완
  const good6 = `${l}${oppositeC}${oppositeR}${oppositeO}`; // CA+RP+OE 보완

  const best = [best1, best2, best3, best4].filter((c) => c !== code);
  const good = [good1, good2, good3, good4, good5, good6].filter(
    (c) => c !== code && !best.includes(c)
  );

  // 각 축별 궁합 설명
  const axisDescriptions: Record<
    string,
    { complementary: string; similar: string }
  > = {
    L: {
      complementary:
        "주도적인 당신은 유연하게 맞춰주는 상대와 역할 분담이 명확해집니다.",
      similar:
        "주도적인 당신은 같은 성향의 상대와 빠른 결정을 내릴 수 있지만, 갈등 시 양보가 필요합니다.",
    },
    F: {
      complementary:
        "유연한 당신은 주도적으로 이끌어주는 상대와 안정적인 관계를 만듭니다.",
      similar:
        "유연한 당신은 같은 성향의 상대와 조화롭지만, 결정이 느려질 수 있습니다.",
    },
    C: {
      complementary:
        "애정 표현이 풍부한 당신은 안정적인 애정을 선호하는 상대와 균형잡힌 관계를 만듭니다.",
      similar:
        "애정 표현이 풍부한 당신은 같은 성향의 상대와 따뜻한 관계를 만들지만, 공간이 필요할 때를 이해해야 합니다.",
    },
    A: {
      complementary:
        "안정적인 당신은 따뜻한 애정 표현을 하는 상대와 신뢰와 따뜻함의 균형을 이룹니다.",
      similar:
        "안정적인 당신은 같은 성향의 상대와 깊은 신뢰를 쌓지만, 애정 표현을 늘리는 노력이 필요합니다.",
    },
    R: {
      complementary:
        "현실적인 당신은 열정적인 상대와 계획과 즉흥의 균형을 이룹니다.",
      similar:
        "현실적인 당신은 같은 성향의 상대와 안정적이지만, 가끔은 로맨틱한 순간이 필요합니다.",
    },
    P: {
      complementary:
        "열정적인 당신은 현실적인 판단을 도와주는 상대와 감성과 실용의 균형을 이룹니다.",
      similar:
        "열정적인 당신은 같은 성향의 상대와 뜨거운 관계를 만들지만, 현실적인 계획도 함께 세워야 합니다.",
    },
    O: {
      complementary:
        "낙관적인 당신은 진지한 태도를 가진 상대와 가벼움과 깊이의 균형을 이룹니다.",
      similar:
        "낙관적인 당신은 같은 성향의 상대와 즐거운 관계를 만들지만, 중요한 문제는 진지하게 다뤄야 합니다.",
    },
    E: {
      complementary:
        "진지한 당신은 가볍게 즐길 수 있는 상대와 깊이와 유연성의 균형을 이룹니다.",
      similar:
        "진지한 당신은 같은 성향의 상대와 깊은 관계를 만들지만, 가끔은 가볍게 즐기는 시간이 필요합니다.",
    },
  };

  const description = `관계에서 궁합은 크게 두 가지 방식으로 작동합니다. 첫째, 보완적 관계는 서로 다른 특성이 조화를 이루어 역할 분담이 명확해집니다. ${axisDescriptions[l].complementary} ${axisDescriptions[c].complementary} 둘째, 유사한 관계는 비슷한 특성으로 빠른 이해와 공감대를 형성합니다. ${axisDescriptions[r].similar} ${axisDescriptions[o].similar} 최고의 궁합은 핵심 축(LF, CA)이 보완적일 때이며, 이는 관계의 기본 구조를 안정적으로 만듭니다.`;

  return { best: best.slice(0, 3), good: good.slice(0, 4), description };
}

export function getStrengths(code: string): string[] {
  const strengths: Record<string, string[]> = {
    L: ["명확한 의사결정", "책임감 있는 리더십"],
    F: ["협력적 태도", "유연한 적응력"],
    C: ["따뜻한 애정 표현", "긍정적인 에너지"],
    A: ["안정적인 신뢰", "존중하는 마음"],
    R: ["현실적인 판단", "계획적인 접근"],
    P: ["로맨틱한 감성", "즉흥적인 즐거움"],
    O: ["긍정적인 태도", "빠른 회복력"],
    E: ["일관성 있는 행동", "깊은 헌신"],
  };

  const poles = code.split("") as Pole[];
  return poles.flatMap((pole) => strengths[pole] || []);
}

export function getWatchOuts(code: string): string[] {
  const watchOuts: Record<string, string[]> = {
    L: ["상대의 의견을 놓칠 수 있음", "일방적인 결정을 주의"],
    F: ["자기 의견 표현이 부족할 수 있음", "갈등 회피 경향"],
    C: ["과도한 표현으로 부담을 줄 수 있음", "공간 필요성 이해"],
    A: ["애정 표현이 부족해 보일 수 있음", "감정 소통 강화 필요"],
    R: ["로맨스가 부족해 보일 수 있음", "즉흥성 부족"],
    P: ["현실성 부족", "계획성 강화 필요"],
    O: ["진지함 부족으로 보일 수 있음", "심각한 문제 경시 주의"],
    E: ["유연성 부족", "너무 진지해 보일 수 있음"],
  };

  const poles = code.split("") as Pole[];
  return poles.flatMap((pole) => watchOuts[pole] || []);
}

export function getTips(code: string): string[] {
  const tips: Record<string, string[]> = {
    L: ["상대의 의견을 먼저 들어보세요", "함께 결정하는 시간을 만들어보세요"],
    F: ["자신의 의견을 적극적으로 표현해보세요", "주도적으로 제안해보세요"],
    C: ["상대의 공간과 속도를 존중하세요", "표현의 강도를 조절해보세요"],
    A: ["애정 표현을 조금 더 늘려보세요", "말로도 사랑을 표현해보세요"],
    R: [
      "가끔은 계획 없이 즉흥적으로 즐겨보세요",
      "로맨틱한 순간을 만들어보세요",
    ],
    P: ["현실적인 계획도 함께 세워보세요", "실용적인 면도 고려해보세요"],
    O: ["중요한 문제는 진지하게 다뤄보세요", "상대의 진지함을 이해해보세요"],
    E: ["가볍게 즐기는 시간도 가져보세요", "유연성을 키워보세요"],
  };

  const poles = code.split("") as Pole[];
  return poles.flatMap((pole) => tips[pole] || []);
}
