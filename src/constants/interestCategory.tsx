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
} from "lucide-react";
import { JSX } from "react";

// 관심사 ID ↔ 텍스트 + 아이콘
export const INTEREST_CATEGORY_MAP: Record<
  number,
  { label: string; icon: JSX.Element }
> = {
  1: { label: "여행(지역탐방)", icon: <MapIcon /> },
  2: { label: "건강관리/운동", icon: <HeartPulseIcon /> },
  3: { label: "문화예술/창작", icon: <PaletteIcon /> },
  4: { label: "요리/음식", icon: <UtensilsIcon /> },
  5: { label: "자기계발", icon: <BrainIcon /> },
  6: { label: "봉사/재능기부", icon: <HandHeartIcon /> },
  7: { label: "명상(마음챙김)", icon: <Sprout /> },
  8: { label: "디지털학습", icon: <LaptopIcon /> },
  9: { label: "사교/친목도모", icon: <UsersIcon /> },
  10: { label: "기타", icon: <CircleEllipsisIcon /> }
};
