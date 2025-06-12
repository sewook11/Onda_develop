"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

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
    meet_id,
    title,
    interest,
    date,
    //time,
    location,
    //image,
    //status,
  } = item;

  return (
    <div className="min-w-[320px] rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-lg mb-2 transition-all bg-white">
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-sm text-orange-400 font-semibold">카테고리 {interest}</span>
        <h3 className="font-bold text-md">{title}</h3>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
        <Calendar size={16} />
        <span>{date}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <MapPin size={16} />
        <span>{location}</span>
      </div>

    
      <Link href={`/meet/${meet_id}`} className="block">
        <button className="w-full h-[40px] border border-orange-500 text-orange-500 rounded-md text-sm">
          상세 보기
        </button>
      </Link>
    </div>
  );
}
