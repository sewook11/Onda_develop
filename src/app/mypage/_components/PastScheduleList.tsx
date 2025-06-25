"use client";

import React, { useState, useEffect } from "react";
import { MeetingCard } from "@/components/common/MeetingCard";
import { dummyMeetings } from "@/datas/meetings";
import MeetingCardHorizontal from "@/components/common/MeetingCardHorizontal";

export default function PastScheduleList() {
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
      <div className="md:grid-cols-3 md:grid flex flex-col gap-4">
        {dummyMeetings.map((meeting) =>
          isMobile ? (
            <MeetingCardHorizontal
              key={meeting.meet_id}
              item={meeting}
              isApplied={false}
            />
          ) : (
            <MeetingCard key={meeting.meet_id} item={meeting} context="past" />
          )
        )}
      </div>
    </section>
  );
}
