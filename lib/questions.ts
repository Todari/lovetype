export type Axis = "L" | "F" | "C" | "A" | "R" | "P" | "O" | "E";

export type AxisPair = "LF" | "CA" | "RP" | "OE";

export type Item = {
  id: number;
  text: string;
  axisPair: AxisPair;
  pole: "L" | "F" | "C" | "A" | "R" | "P" | "O" | "E";
  reverse?: boolean;
};

export const ITEMS: Item[] = [
  // Lead vs Follow
  {
    id: 1,
    text: "데이트나 여행에서 전체 일정을 내가 잡는 편이다.",
    axisPair: "LF",
    pole: "L",
  },
  {
    id: 2,
    text: "상대가 선택하면 그 흐름을 따라가는 게 편하다.",
    axisPair: "LF",
    pole: "F",
    reverse: true,
  },
  {
    id: 3,
    text: "갈팡질팡할 때 내가 결정을 내리면 마음이 놓인다.",
    axisPair: "LF",
    pole: "L",
  },
  {
    id: 4,
    text: "함께 결정하는 과정이 결과보다 더 중요하다.",
    axisPair: "LF",
    pole: "F",
    reverse: true,
  },
  {
    id: 5,
    text: "관계에서 주도권을 쥐는 게 어색하지 않다.",
    axisPair: "LF",
    pole: "L",
  },
  {
    id: 6,
    text: "나는 보통 상대 의견을 먼저 듣고 맞춘다.",
    axisPair: "LF",
    pole: "F",
    reverse: true,
  },
  {
    id: 7,
    text: "내가 직접 계획하고 실행하는 게 편하다.",
    axisPair: "LF",
    pole: "L",
  },
  {
    id: 8,
    text: "선택지가 많을수록 상대에게 먼저 묻는다.",
    axisPair: "LF",
    pole: "F",
    reverse: true,
  },

  // Cuddly vs Accept
  {
    id: 9,
    text: "좋아하면 스킨십/애정표현을 자주 한다.",
    axisPair: "CA",
    pole: "C",
  },
  {
    id: 10,
    text: "감정 표현은 적당히 하는 게 편하다.",
    axisPair: "CA",
    pole: "A",
    reverse: true,
  },
  {
    id: 11,
    text: "하루에도 몇 번 포옹/터치가 필요하다.",
    axisPair: "CA",
    pole: "C",
  },
  {
    id: 12,
    text: "말없이 함께 있음으로 충분히 애정을 느낀다.",
    axisPair: "CA",
    pole: "A",
    reverse: true,
  },
  { id: 13, text: "문자로도 달달한 표현을 즐긴다.", axisPair: "CA", pole: "C" },
  {
    id: 14,
    text: "과한 애칭/드라마틱한 표현은 불편하다.",
    axisPair: "CA",
    pole: "A",
    reverse: true,
  },
  {
    id: 15,
    text: "애정표현이 줄면 관계가 식었다고 느낀다.",
    axisPair: "CA",
    pole: "C",
  },
  {
    id: 16,
    text: "사랑은 행동/시간으로 보여주는 게 더 중요하다.",
    axisPair: "CA",
    pole: "A",
    reverse: true,
  },

  // Realistic vs Passionate
  {
    id: 17,
    text: "현실 제약(시간·돈)을 먼저 계산한다.",
    axisPair: "RP",
    pole: "R",
  },
  {
    id: 18,
    text: "감정이 이끄는 즉흥 계획도 가치 있다.",
    axisPair: "RP",
    pole: "P",
    reverse: true,
  },
  {
    id: 19,
    text: "선물/이벤트는 실용성이 최우선이다.",
    axisPair: "RP",
    pole: "R",
  },
  {
    id: 20,
    text: "로맨틱한 순간을 만들려고 애쓴다.",
    axisPair: "RP",
    pole: "P",
    reverse: true,
  },
  {
    id: 21,
    text: "다툼 땐 팩트/해결책을 먼저 찾는다.",
    axisPair: "RP",
    pole: "R",
  },
  {
    id: 22,
    text: "다툼 땐 감정 공감이 먼저다.",
    axisPair: "RP",
    pole: "P",
    reverse: true,
  },
  {
    id: 23,
    text: "큰 약속 전엔 리스크부터 확인한다.",
    axisPair: "RP",
    pole: "R",
  },
  {
    id: 24,
    text: "때론 계획을 벗어나도 감정에 따라 움직이고 싶다.",
    axisPair: "RP",
    pole: "P",
    reverse: true,
  },

  // Optimistic vs Earnest
  {
    id: 25,
    text: "문제 생기면 농담/가벼운 말로 풀어낸다.",
    axisPair: "OE",
    pole: "O",
  },
  {
    id: 26,
    text: "문제는 차분히 정면 돌파해야 한다.",
    axisPair: "OE",
    pole: "E",
    reverse: true,
  },
  {
    id: 27,
    text: "계획이 틀어져도 금방 분위기 전환한다.",
    axisPair: "OE",
    pole: "O",
  },
  {
    id: 28,
    text: "약속/규칙은 반드시 지켜야 마음이 편하다.",
    axisPair: "OE",
    pole: "E",
    reverse: true,
  },
  {
    id: 29,
    text: "연애도 유연하고 가볍게 즐겨야 한다.",
    axisPair: "OE",
    pole: "O",
  },
  {
    id: 30,
    text: "일관성과 책임감이 사랑을 지킨다.",
    axisPair: "OE",
    pole: "E",
    reverse: true,
  },
  {
    id: 31,
    text: "힘든 날엔 긍정 모드로 재해석한다.",
    axisPair: "OE",
    pole: "O",
  },
  {
    id: 32,
    text: "진지한 대화가 자주 필요하다.",
    axisPair: "OE",
    pole: "E",
    reverse: true,
  },
];
