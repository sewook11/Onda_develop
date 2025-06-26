"use client";

import React, { useState, useEffect } from "react";
import { MeetingCard } from "@/components/common/MeetingCard";
import { useRouter } from "next/navigation";
import api from "@/apis/app";
import { FileData } from "@/types/file";
import { useAuthStore } from "@/stores/useAuth";

interface Meeting {
  meet_id: number;
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
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const fetchAppliedMeetings = async () => {
      try {
        console.log("accessToken:", accessToken);
        if (!accessToken) {
          router.push("/login");
          return;
        }
        const response = await api.get(`/meets/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("응답 데이터:", response.data);
        setApplySchedule(response.data.results);
      } catch (error) {
        console.error("신청한 모임 조회 실패:", error);
        alert("신청한 모임 조회에 실패했습니다. 다시 시도해주세요.");
      }
    };

    fetchAppliedMeetings();
  }, [router, accessToken]);

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
            <MeetingCard key={meeting.meet_id} item={meeting} isApplied />
          )
        )}
      </div>
    </section>
  );
}
