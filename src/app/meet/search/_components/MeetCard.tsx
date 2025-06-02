"use client";

import React from "react";
import { Calendar, MapPin } from "lucide-react";
import Button from "../../../../components/common/Button";

interface MeetCardProps {
  category: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export default function MeetCard({
  category,
  title,
  date,
  time,
  location,
}: MeetCardProps) {
  return (
    <div className="rounded-2xl shadow-md p-4 bg-white flex flex-col justify-between gap-3 w-full">
      <span className="text-sm text-accent-main font-semibold">{category}</span>
      <h3 className="text-md font-bold text-main">{title}</h3>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar size={16} />
        <span>{date} {time}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin size={16} />
        <span>{location}</span>
      </div>
      <Button width="w-full" height="h-[40px]">신청하기</Button>
    </div>
  );
}