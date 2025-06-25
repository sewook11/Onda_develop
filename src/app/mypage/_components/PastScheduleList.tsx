'use client';

import React, { useState, useEffect } from 'react';
import { MeetingCard } from '@/components/common/MeetingCard';
import { useModalStore } from '@/stores/useModalStore';
import ReviewWriteModal from '@/app/meet/review/_components/ReviewWriteModal';
import { useRouter } from 'next/navigation';
import api from '@/apis/app';
import { Meeting } from '@/types/meetings';

export default function PastScheduleList() {
  const [pastScheduleList, setPastScheduleList] = useState<Meeting[]>([]);
  const { modals, closeModal } = useModalStore();
  const router = useRouter();

  useEffect(() => {
    const fetchAppliedMeetings = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          router.push('/login');
          return;
        }
        const response = await api.get(`/meets?status=false`);
        setPastScheduleList(response.data.results);
        console.log(pastScheduleList);
        router.refresh();
      } catch (error) {
        console.error('지난 모임 조회 실패:', error);
        alert('지난 모임 조회에 실패했습니다. 다시 시도해주세요.');
      }
    };
    fetchAppliedMeetings();
  }, [pastScheduleList, router]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  return (
    <section className="px-4 py-6">
      <div className="md:grid-cols-3 md:grid flex flex-col gap-4">
        {pastScheduleList.map(
          (meeting) => (
            // isMobile ? (
            //   <MeetingCardHorizontal
            //     key={meeting.meet_id}
            //     item={meeting}
            //     isApplied={false}
            //   />
            // ) : (
            <MeetingCard key={meeting.meet_id} item={meeting} context="past" />
          )
          // )
        )}
        {modals['reviewWrite'] && (
          <ReviewWriteModal
            modalKey="reviewWrite"
            onClose={() => closeModal('reviewWrite')}
            onSubmit={(rating, content) => {
              console.log('후기 제출', rating, content);
            }}
            meetId={2}
          />
        )}
      </div>
    </section>
  );
}
