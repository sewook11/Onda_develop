'use client'

import { useLeaderMeetingsReviews } from "@/hooks/useLeader";
import ReviewList from "../../_components/ReviewList";

const MyMeetingReviewPage = () => {
  const { data: reviewData } = useLeaderMeetingsReviews({ page: 1, size: 10 });

  return (
    <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
      <ReviewList reviews={reviewData?.data || []} />
    </main>
  );
};

export default MyMeetingReviewPage;
