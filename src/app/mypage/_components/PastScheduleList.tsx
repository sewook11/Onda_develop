"use client";

import React from "react";
import { MeetingCard } from "@/components/common/MeetingCard";
import { dummyMeetings } from "@/datas/meetings";

export default function PastScheduleList() {
  return (
    <section className="px-4 py-6">
      <div className="grid-cols-3 grid gap-4">
        {dummyMeetings.map((metting) => (
          <MeetingCard key={metting.meet_id} item={metting} context="past" />
        ))}
      </div>
    </section>
  );
}
