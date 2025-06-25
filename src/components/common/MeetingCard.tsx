import React from "react";
import { Calendar, MapPin, MessageSquareIcon } from "lucide-react";
import Image from "next/image";
import DefaultGatheringImage from "../common/DefaultMeetingImage";
import { INTEREST_CATEGORY_MAP } from "@/constants/interestCategory";
import { MeetingCardProps } from "@/types/meetings";
import MeeringStatusButtons from "../../app/_components/MeetingStatusButton";

export const MeetingCard = ({
  item,
  isApplied = false,
  context,
}: MeetingCardProps) => {
  const {
    title,
    interest,
    date,
    time,
    location,
    image,
    contact,
    status: rawStatus,
  } = item;

  const { label: interestLabel, icon: interestIcon } = INTEREST_CATEGORY_MAP[
    interest
  ] ?? {
    label: "알 수 없음",
    icon: null,
  };
  const status: "모집중" | "모집 마감" =
    rawStatus === "모집 마감" ? "모집 마감" : "모집중";

  return (
    <div className="min-w-[320px] max-w-[420px] rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-lg mb-2 transition-all bg-white">
      {/*  */}
      <div className="flex gap-4 text-sm text-orange-400 font-semibold items-center mb-4">
        {interestIcon}
        {interestLabel}
      </div>
      <div className="w-full h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
        {/* 이미지 없으면 기본 이미지로  */}
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
          <div className="mb-4">
            <DefaultGatheringImage width="w-full" height="h-40" />
          </div>
        )}
      </div>
      {/* 모임 정보 */}
      <div className="font-bold text-md mb-2">{title}</div>
      <div className="text-gray-600 text-xs flex items-center mb-1">
        <Calendar size={16} className="mr-1" />
        {date} (
        {new Date(date).toLocaleDateString("ko-KR", { weekday: "short" })}){" "}
        {time}
      </div>
      <div className="text-gray-600 text-xs flex items-center mb-1">
        <MapPin size={16} className="mr-1" />
        {location}
      </div>
      {isApplied && contact && (
        <div className="text-gray-600 text-xs flex items-center mb-1 break-all">
          <MessageSquareIcon size={20} className="mr-1" />
          <a
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline hover:text-orange-500 hover:font-bold cursor-pointer transition"
          >
            {/* {contact} */}
            오픈채팅
          </a>
        </div>
      )}

      <MeeringStatusButtons
        status={status}
        mode={context === "past" ? "past" : "default"}
        meet_id={item.meet_id}
      />
    </div>
  );
};
