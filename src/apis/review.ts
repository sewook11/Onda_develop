import { Review, ReviewResponse } from '@/types/meetings';
import axiosInstance from "./axiosInstance";
import api from './app';

export const postReview = async (
  meetId: number,
  data: { rating: number; content: string }
) => {
  const response = await axiosInstance.post(
    `/meetings/${meetId}/reviews`, 
    data
  );
  return response.data;
};

// 리뷰 목록 조회
export async function getReviewsByMeetId( meetId: number, size: number, page?: number): Promise<{ data: Review[]; totalCount: number }> {
  const res = await api.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: ReviewResponse;
  }>(`/meets/${meetId}/reviews`, {
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