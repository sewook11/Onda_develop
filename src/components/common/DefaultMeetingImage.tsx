import { ImageIcon } from "lucide-react";

export default function DefaultMeeringImage() {
  return (
    <div className="w-full h-40 bg-gray-100 flex flex-col items-center justify-center text-gray-400 rounded-md">
      <ImageIcon size={32} className="mb-1" />
      <span className="text-sm">모임 이미지 없음</span>
    </div>
  );
}
