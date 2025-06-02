import {
  MapIcon,
  HeartPulseIcon,
  PaletteIcon,
  UtensilsIcon,
  BrainIcon,
  HandHeartIcon,
  LaptopIcon,
  UsersIcon,
  CircleEllipsisIcon,
  Sprout
} from "lucide-react"; // 또는 원하는 아이콘 라이브러리
import { JSX } from "react";

// 관심사 ID ↔ 텍스트 + 아이콘
export const INTEREST_CATEGORY_MAP: Record<
  number,
  { label: string; icon: JSX.Element }
> = {
  1: { label: "여행(지역탐방)", icon: <MapIcon size={28} /> },
  2: { label: "건강관리/운동", icon: <HeartPulseIcon size={28} /> },
  3: { label: "문화예술/창작", icon: <PaletteIcon size={28} /> },
  4: { label: "요리/음식", icon: <UtensilsIcon size={28} /> },
  5: { label: "자기계발", icon: <BrainIcon size={28} /> },
  6: { label: "봉사/재능기부", icon: <HandHeartIcon size={28} /> },
  7: { label: "명상(마음챙김)", icon: <Sprout size={28} /> },
  8: { label: "디지털학습", icon: <LaptopIcon size={28} /> },
  9: { label: "사교/친목도모", icon: <UsersIcon size={28} /> },
  10: { label: "기타", icon: <CircleEllipsisIcon size={28} /> }
};
