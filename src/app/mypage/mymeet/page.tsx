'use client'

import { useLeaderMeetingsById } from "@/hooks/useLeader";
import LeaderMeetingCardList from "../_components/LeaderMeetingCardList";
import { useAuthStore } from "@/stores/useAuth";
import { useState } from "react";

const MyMeetingPage = () => {
  const { profile } = useAuthStore();
  const [page, setPage] = useState(1);
  const size = 10;
  const { data: meetingData } = useLeaderMeetingsById({
    id: profile?.id,
    page,
    size,
  });

  console.log(meetingData);

  return (
    <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
      <LeaderMeetingCardList meetings={meetingData?.data || []} 
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        perPage={size}
        showPagination={true}
        totalCount={meetingData?.totalCount || 0} />
    </main>
  );
};

export default MyMeetingPage;
