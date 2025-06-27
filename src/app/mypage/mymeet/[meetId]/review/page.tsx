'use client'

import { useReviewsByMeetingId } from "@/hooks/useLeader";
import { useState } from "react";
import { useParams } from "next/navigation";
import MyReviewList from "@/app/mypage/_components/MyReviewList";

const MyMeetingReviewPage = () => {
  const { meetId } = useParams(); // URL의 [meetId] 값 가져오기
  const id = Number(meetId);

  const [page, setPage] = useState(1);
  const size = 10;

  const { data: reviewData } = useReviewsByMeetingId({
    meetId: id,
    page,
    size,
  });

  console.log("review:",reviewData)

  return (
    <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
      <MyReviewList
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