import Skeleton from "@/components/common/Skeleton";
import { MoreVertical } from "lucide-react";
import React from "react";

export default function PostCardSkeleton() {
  return (
    <div className="p-8 border border-gray-400 rounded-md flex flex-col gap-4 relative">
      {/* 상단 메타데이터 */}
      <div className="flex justify-between relative text-gray-600 text-sm">
        <div className="flex gap-4">
          <Skeleton width="w-5" />
          <Skeleton width="w-10" />
        </div>
        <div className="relative text-gray-600 pr-4">
          <MoreVertical />
        </div>
      </div>
      {/* 하단 텍스트 + 이미지 */}
      <div className="flex justify-between items-center gap-6">
        {/* 왼쪽 : 텍스트 내용 */}
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton width="w-40" height="h-10"/>
          <Skeleton width="w-full" height="h-8"/>
          <Skeleton width="w-full" height="h-8"/>
          <div className="flex gap-4 text-sm text-gray-600">
            <Skeleton width="w-10" height="h-6" />
            <Skeleton width="w-20" height="h-6"/>
          </div>
        </div>
        {/* 오른쪽 : 이미지 */}
        <div className="w-[150px] h-[150px] relative shrink-0 rounded-md overflow-hidden">
          <Skeleton width="w-full" height="h-full" />
        </div>
      </div>
    </div>
  );
}
