import Skeleton from "@/components/common/Skeleton";
import React from "react";

export default function MeetingCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-lg mb-2 transition-all bg-white">
      <div className="flex gap-4 items-center mb-4">
        <Skeleton width="w-20" height="h-6" />
      </div>
      <div className="w-full h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
        <Skeleton width="w-full" height="h-full" />
      </div>
      <div>
        <Skeleton width="w-20" height="8"/>
        <Skeleton width="w-full" height="6" />
        <div className="flex gap-2 flex-nowrap">
            <Skeleton height="h-[42px]" width="w-full"/>
            <Skeleton height="h-[42px]" width="w-full"/>
        </div>
      </div>
    </div>
  );
}
