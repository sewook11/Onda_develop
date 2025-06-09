"use client";

import React from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import DefaultGatheringImage from "@/components/common/DefaultMeetingImage";
import { INTEREST_CATEGORY_MAP } from "@/constants/interestCategory";
import MeeringStatusButtons from "@/app/_components/MeetingStatusButton";

interface MeetCardProps {
  item: {
    meet_id: number;
    title: string;
    interest: number;
    date: string;
    time: string;
    location: string;
    image?: string;
    status: string;
  };
}

export default function MeetCard({ item }: MeetCardProps) {
  const {
    title,
    interest,
    date,
    time,
    location,
    image,
    status: rawStatus,
  } = item;

  const { label: interestLabel, icon: interestIcon } =
    INTEREST_CATEGORY_MAP[interest] ?? {
      label: "알 수 없음",
      icon: null,
    };

  const status: "모집중" | "모집 마감" =
    rawStatus === "모집 마감" ? "모집 마감" : "모집중";

  return (
    <div className="min-w-[320px] rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-lg mb-2 transition-all bg-white">
      <div className="flex gap-4 text-sm text-orange-400 font-semibold items-center mb-4">
        {interestIcon}
        {interestLabel}
      </div>

      <div className="w-full h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
        {image ? (
          <div className="w-full relative rounded-md overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100%"
            />
          </div>
        ) : (
          <DefaultGatheringImage width='w-[136px]' height='h-[136px]'  />
        )}
      </div>

      <div className="font-bold text-md mb-2">{title}</div>
      <div className="text-gray-600 text-xs flex items-center mb-1">
        <Calendar size={16} className="mr-1" />
        {date} (
        {new Date(date).toLocaleDateString("ko-KR", { weekday: "short" })}) {time}
      </div>
      <div className="text-gray-600 text-xs flex items-center mb-4">
        <MapPin size={16} className="mr-1" />
        {location}
      </div>

      <MeeringStatusButtons status={status} />
    </div>
  );
}
