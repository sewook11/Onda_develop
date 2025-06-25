"use client";

import React, { useState, useEffect } from "react";
import { MeetingCard } from "@/components/common/MeetingCard";
import MeetingCardHorizontal from "@/components/common/MeetingCardHorizontal";
import { dummyMeetings } from "@/datas/meetings";

export default function AppliedScheduleList() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4">신청한 모임</h2>
      <div className="md:grid-cols-3 md:grid flex flex-col gap-4">
        {dummyMeetings.map((meeting) =>
          isMobile ? (
            <MeetingCardHorizontal
              key={meeting.meet_id}
              item={meeting}
              isApplied
            />
          ) : (
            <MeetingCard key={meeting.meet_id} item={meeting} isApplied />
          )
        )}
      </div>
    </section>
  );
}
