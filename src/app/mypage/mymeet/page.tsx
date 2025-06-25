'use client'

import { useLeaderMeetingsById } from "@/hooks/useLeader";
import LeaderMeetingCardList from "../_components/LeaderMeetingCardList";
import { useAuthStore } from "@/stores/useAuth";

const MyMeetingPage = () => {
  const { profile } = useAuthStore();
  const { data: meetingData } = useLeaderMeetingsById({id: profile?.id, page: 1, size: 10});

  return (
    <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
      <LeaderMeetingCardList meetings={meetingData?.data || []} />
    </main>
  );
};

export default MyMeetingPage;
