'use client'

import { useLeaderMeetingsById } from "@/hooks/useLeader";
import { useAuthStore } from "@/stores/useAuth";
import LeaderMeetingList from "../_components/LeaderMeetingList";
import { useState } from "react";

const MyMeetingPage = () => {
  const { profile } = useAuthStore();
  const [page, setPage] = useState(1);
  const size = 10;

  const { data: meetingData } = useLeaderMeetingsById({
    user_id: profile?.id,
    page,
    size,
  });

  return (
    <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
      <LeaderMeetingList 
        meetings={meetingData?.data || []}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        perPage={size}
        showPagination={true}
        totalCount={meetingData?.totalCount || 0}
       />
    </main>
  );
};

export default MyMeetingPage;