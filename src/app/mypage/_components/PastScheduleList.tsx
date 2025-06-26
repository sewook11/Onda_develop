"use client";

import React, { useState, useEffect } from "react";
import { MeetingCard } from "@/components/common/MeetingCard";
import { useModalStore } from "@/stores/useModalStore";
import ReviewWriteModal from "@/app/meet/review/_components/ReviewWriteModal";
import { useRouter } from "next/navigation";
import api from "@/apis/app";
import { Meeting } from "@/types/meetings";
import { useAuthStore } from "@/stores/useAuth";

interface Review {
  id: number;
  nickname: string;
  rating: number;
  content: string;
  created_at: string;
  meet_title: string;
  meet_date: string;
  meet_location: string;
}

export default function PastScheduleList() {
  const [pastScheduleList, setPastScheduleList] = useState<Meeting[]>([]);
  const { modals, closeModal } = useModalStore();
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchAppliedMeetings = async () => {
      try {
        if (!accessToken) {
          router.push("/login");
          return;
        }

        const [appliedRes, pastRes, reviewRes] = await Promise.all([
          api.get("/meets/users", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          api.get("/meets?status=false"),
          api.get("/users/reviews", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        const appliedMeetings: Meeting[] = appliedRes?.data?.results;
        const pastMeetings: Meeting[] = pastRes?.data?.results;
        const reviews: Review[] = reviewRes?.data?.results;

        const appliedIds = new Set(appliedMeetings.map((m) => m?.id));
        const reviewsSet = new Set(
          reviews?.map((r) => `${r?.meet_title}_${r?.meet_date}`)
        );

        const filtered = pastMeetings?.filter(
          (m) =>
            appliedIds.has(m?.id) && !reviewsSet.has(`${m?.title}_${m?.date}`)
        );

        setPastScheduleList(filtered);
      } catch (error) {
        console.error("지난 모임 조회 실패:", error);
        alert("지난 모임 조회에 실패했습니다. 다시 시도해주세요.");
      }
    };

    fetchAppliedMeetings();
  }, [router, accessToken]);
  return (
    <section className="px-4 py-6">
      <div className="md:grid-cols-3 md:grid flex flex-col gap-4">
        {pastScheduleList.map((meeting) => (
          <MeetingCard key={meeting.id} item={meeting} context="past" />
        ))}
        {modals["reviewWrite"] && (
          <ReviewWriteModal
            modalKey="reviewWrite"
            onClose={() => closeModal("reviewWrite")}
            // onSubmit={(rating, content) => {
            //   console.log("후기 제출", rating, content);
            // }}
            meetId={2}
          />
        )}
      </div>
    </section>
  );
}
