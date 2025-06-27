"use client";

import { useLeaderMeetingsReviews } from "@/hooks/useLeader";
import ReviewList from "../../../meet/review/_components/ReviewList";
import { useState } from "react";

const MyMeetingReviewPage = () => {
  const [page, setPage] = useState(1);
  const size = 10;

  const { data: reviewData } = useLeaderMeetingsReviews({
    page,
    size,
  });

  return (
    <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
      <ReviewList
        reviews={reviewData?.data || []}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        perPage={size}
        showPagination={true}
        totalCount={reviewData?.totalCount || 0}
      />
    </main>
  );
};

export default MyMeetingReviewPage;
