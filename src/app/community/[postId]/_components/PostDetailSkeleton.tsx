import Skeleton from "@/components/common/Skeleton";
import React from "react";

export default function PostDetailSkeleton() {
  return (
    <div className="flex flex-col items-center w-full my-10 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      {/* 메타데이터 + 제목 + 작성자 */}
      <div className="space-y-2 w-full py-10 border-b-2 border-gray-400">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-10 h-6" />
          </div>
        </div>
        <Skeleton className="w-40 h-10" /> {/* 제목 */}
        <div className="flex gap-4 text-sm text-gray-600">
          <Skeleton className="w-20 h-6" /> {/* 닉네임 */}
          <Skeleton className="w-24 h-6" /> {/* 날짜 */}
        </div>
      </div>

      {/* 게시글 본문 */}
      <Skeleton className="w-full h-[400px] my-10" />
    </div>
  );
}
