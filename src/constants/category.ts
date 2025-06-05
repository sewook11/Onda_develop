import { INTEREST_CATEGORY_MAP } from "./interestCategory";

/**
 * 게시글 카테고리 ID와 카테고리명을 매핑한 객체
 *
 * @type {Object<number, string>}
 * @property {number} 1 - 정보 공유
 * @property {number} 2 - 소통
 */
export const POST_CATEGORY_MAP: Record<number, string> = {
  1: "정보",
  2: "소통",
};

export const categoryOptions = [
  { label: "전체", value: 0 },
  { label: "정보", value: 1 },
  { label: "소통", value: 2 },
];

export const interestOptions = Object.entries(INTEREST_CATEGORY_MAP).map(([key, { label }]) => ({
    label,
    value: key,
  }));

export const digitalLevelOptions = [
    { label: "전체", value: 0 },
    { label: "상 (Zoom 사용)", value: 1 },
    { label: "중 (앱 사용)", value: 2 },
    { label: "하 (전화만 가능)", value: 3 },
  ];