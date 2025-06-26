"use client";

import React, { useState, useEffect } from "react";
import { MeetingCard } from "@/components/common/MeetingCard";
import { useRouter } from "next/navigation";
import api from "@/apis/app";
import { FileData } from "@/types/file";

interface Meeting {
  id: number;
  user_id: number;
  title: string;
  description: string;
  area: string;
  digitalLevel: number;
  interest: number;
  date: string;
  time: string;
  contact?: string;
  max_people: number;
  current_people: number;
  status: string;
  file?: FileData;
  application_deadline: string;
  created_at: string;
  updated_at: string;
}

export default function AppliedScheduleList() {
  const [applySchedule, setApplySchedule] = useState<Meeting[]>([]);
  console.log(applySchedule);
  const router = useRouter();

  useEffect(() => {
    const fetchAppliedMeetings = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/login");
          return;
        }
        const response = await api.get(`/meets/users`);
        setApplySchedule(response.data.results);
      } catch (error) {
        console.error("신청한 모임 조회 실패:", error);
        alert("신청한 모임 조회에 실패했습니다. 다시 시도해주세요.");
      }
    };
  
    fetchAppliedMeetings();
  }, [router]);

  if (applySchedule.length === 0) {
    return (
      <section className="px-4 py-6">
        <h2 className="text-lg font-bold mb-4">신청한 모임</h2>
        <p className="text-gray-500 text-center py-8">
          신청한 모임이 없습니다.
        </p>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4">신청한 모임</h2>
      <div className="md:grid-cols-3 md:grid flex flex-col gap-7">
        {applySchedule.map(
          (meeting) => (
            // isMobile ? (
            //   <MeetingCardHorizontal
            //     key={meeting.meet_id}
            //     item={meeting}
            //     isApplied
            //   />
            // ) : (
            <MeetingCard key={meeting.id} item={meeting} isApplied />
          )
          // )
        )}
      </div>
    </section>
  );
}
