"use client";

import React from "react";
import { MeetingCard } from "@/components/common/MeetingCard";
import { dummyMeetings } from "@/datas/meetings";

export default function AppliedScheduleList() {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4">신청한 모임</h2>
      <div className="grid-cols-3 grid gap-4">
        {dummyMeetings.map((metting) => (
          <MeetingCard key={metting.meet_id} item={metting} isApplied={true} />
        ))}
      </div>
    </section>
  );
}
