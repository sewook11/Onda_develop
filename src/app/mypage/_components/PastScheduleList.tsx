"use client";

import React, { useState, useEffect } from 'react';
import { MeetingCard } from '@/components/common/MeetingCard';
import { useRouter } from 'next/navigation';
import api from '@/apis/app';
import { Meeting } from '@/types/meetings';
import { useModalStore } from '@/stores/useModalStore';
import FinishedMeetDetailModal from '@/app/meet/detail/_components/FinishedMeetDetailModal';
import ReviewWriteModal from '@/app/meet/review/_components/ReviewWriteModal';

export default function PastScheduleList() {
  const [pastScheduleList, setPastScheduleList] = useState<Meeting[]>([]);
  const router = useRouter();
  const { modals, closeModal, modalData } = useModalStore();

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

        const appliedMeetings: Meeting[] = appliedRes.data.results;
        const pastMeetings: Meeting[] = pastRes.data.results;
        const reviews: Review[] = reviewRes.data.results;

        const appliedIds = new Set(appliedMeetings.map((m) => m.meet_id));
        const reviewsSet = new Set(
          reviews.map((r) => `${r.meet_title}_${r.meet_date}`)
        );

        const filtered = pastMeetings.filter(
          (m) =>
            appliedIds.has(m.meet_id) && !reviewsSet.has(`${m.title}_${m.date}`)
        );

        console.log("✅ 신청한 모임 ID:", [...appliedIds]);
        console.log("✅ 지난 모임 응답:", pastMeetings);
        console.log("✅ 필터링 결과:", filtered);

        setPastScheduleList(filtered);
      } catch (error) {
        console.error("지난 모임 조회 실패:", error);
        alert("지난 모임 조회에 실패했습니다. 다시 시도해주세요.");
      }
    };

    fetchAppliedMeetings();
  }, []);

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4">지난 모임</h2>
      <div className="md:grid-cols-3 md:grid flex flex-col gap-4">
        {pastScheduleList.map((meeting, idx) => (
          <MeetingCard key={meeting.meet_id ?? `fallback-${idx}`} item={meeting} context="past" />
        ))}
      </div>

      {/* 모달 렌더링 */}
      {Object.keys(modals).map((modalKey) => {
        if (modalKey.startsWith('finishedMeetDetail-') && modals[modalKey]) {
          const meetId = modalData[modalKey]?.meetId;
          return <FinishedMeetDetailModal key={modalKey} modalKey={modalKey} meetId={meetId ?? 0} />;
        }
        if (modalKey.startsWith('reviewWrite-') && modals[modalKey]) {
          const meetId = modalData[modalKey]?.meetId;
          return (
            <ReviewWriteModal
              key={modalKey}
              modalKey={modalKey}
              onClose={() => closeModal(modalKey)}
              onSubmit={(rating, content) => {
                console.log('후기 제출', rating, content);
                closeModal(modalKey);
              }}
              meetId={meetId ?? 0}
            />
          );
        }
        return null;
      })}
    </section>
  );
}
