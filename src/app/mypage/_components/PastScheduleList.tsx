'use client';

import React, { useState, useEffect } from 'react';
import { MeetingCard } from '@/components/common/MeetingCard';
import { dummyMeetings } from '@/datas/meetings';
import MeetingCardHorizontal from '@/components/common/MeetingCardHorizontal';
import { useModalStore } from '@/stores/useModalStore';
import ReviewWriteModal from '@/app/meet/review/_components/ReviewWriteModal';

export default function PastScheduleList() {
  const [isMobile, setIsMobile] = useState(false);
  const { modals, modalData, closeModal } = useModalStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section className="px-4 py-6">
      <div className="md:grid-cols-3 md:grid flex flex-col gap-4">
        {dummyMeetings.map((meeting) =>
          isMobile ? (
            <MeetingCardHorizontal key={meeting.meet_id} item={meeting} isApplied={false} />
          ) : (
            <MeetingCard key={meeting.meet_id} item={meeting} context="past" />
          )
        )}
      </div>
      
      {modals["reviewWrite"] && modalData["reviewWrite"] && (
  <ReviewWriteModal
    modalKey="reviewWrite"
    meetId={(modalData["reviewWrite"] as any).meet_id}
    onClose={() => closeModal("reviewWrite")}
    onSubmit={(rating, content) => {
      console.log("후기 제출됨:", rating, content);
    }}
  />
)}
    </section>
  );
}
