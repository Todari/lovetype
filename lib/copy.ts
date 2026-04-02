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
// 4개 축(LF, CA, RP, OE)을 균등하게 반영하여 궁합을 판단합니다.
// 각 축의 보완성:
//   - LF: 주도적 + 유연함 = 결정과 실행의 균형
//   - CA: 애정 표현 + 안정적 = 따뜻함과 신뢰의 균형
//   - RP: 현실적 + 열정적 = 계획과 즉흥의 균형
//   - OE: 낙관적 + 진지함 = 가벼움과 깊이의 균형
// 최고 궁합(best): 2개 축이 보완적인 조합 (4가지 축 쌍을 균등하게 커버)
// 좋은 궁합(good): 1개 축만 보완적인 조합 (각 축별 1개씩)
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

  // 최고 궁합: 2개 축이 보완적인 조합 (4가지 축 쌍을 균등하게 커버)
  const best1 = `${oppositeL}${oppositeC}${r}${o}`; // LF+CA 반대
  const best2 = `${oppositeL}${c}${oppositeR}${o}`; // LF+RP 반대
  const best3 = `${l}${oppositeC}${r}${oppositeO}`; // CA+OE 반대
  const best4 = `${l}${c}${oppositeR}${oppositeO}`; // RP+OE 반대

  // 좋은 궁합: 1개 축만 보완적인 조합 (각 축별 1개씩)
  const good1 = `${oppositeL}${c}${r}${o}`; // LF만 반대
  const good2 = `${l}${oppositeC}${r}${o}`; // CA만 반대
  const good3 = `${l}${c}${oppositeR}${o}`; // RP만 반대
  const good4 = `${l}${c}${r}${oppositeO}`; // OE만 반대

  const best = [best1, best2, best3, best4].filter((c) => c !== code);
  const good = [good1, good2, good3, good4].filter(
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

  const description = `관계에서 궁합은 서로 다른 특성이 보완될 때 시너지를 만듭니다. ${axisDescriptions[l].complementary} ${axisDescriptions[c].complementary} ${axisDescriptions[r].complementary} ${axisDescriptions[o].complementary}`;

  return { best: best.slice(0, 3), good: good.slice(0, 4), description };
}

