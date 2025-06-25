import { Review, ReviewResponse } from '@/types/meetings';
import api from './app';
import { END_POINT } from '@/constants/route';

// 리뷰 목록 조회
export async function getReviewsByMeetId( meetId: number, size: number, page?: number): Promise<{ data: Review[]; totalCount: number }> {
  const res = await api.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: ReviewResponse;
  }>(END_POINT.REVIEWS(meetId), {
    params: {
      ...(page !== undefined ? { page } : {}),
      size,
    },
  });

  console.log(res.data);

  return {
    data: res.data.results.reviews,
    totalCount: res.data.count,
  };
}


// 리뷰 작성
export async function createReview(meetId: number, payload: { content: string; rating: number }): Promise<Review> {
  const { data } = await api.post<Review>(END_POINT.REVIEWS(meetId), payload);
  return data;
}

// 리뷰 요약 조회
export async function getReviewSummary(meetId: number): Promise<Review> {
  const { data } = await api.get<Review>(END_POINT.REVIEWS_SUMMARY(meetId));
  return data;
}

// 리뷰 상세 조회
export async function getReviewDetail(reviewId: number): Promise<Review> {
  const { data } = await api.get<Review>(END_POINT.REVIEW_DETAIL(reviewId));
  return data;
}

// 리뷰 수정
export async function updateReview(reviewId: number, payload: { content?: string; rating?: number }): Promise<Review> {
  const { data } = await api.patch<Review>(END_POINT.REVIEW_DETAIL(reviewId), payload);
  return data;
}

// 리뷰 삭제
export async function deleteReview(reviewId: number): Promise<void> {
  await api.delete(END_POINT.REVIEW_DETAIL(reviewId));
}
