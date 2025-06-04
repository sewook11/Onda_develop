import { ImageIcon } from "lucide-react";

interface DefaultMeetingImage { width: string;
  height: string;}

export default function DefaultMeeringImage({width,height}:DefaultMeetingImage) { 
  return (

    <div className={`bg-gray-100 flex flex-col items-center justify-center text-gray-400 rounded-md ${width} ${height}`}>
      <ImageIcon size={32} className="mb-1" />
      <span className="text-sm">모임 이미지 없음</span>
    </div>
  );
}
