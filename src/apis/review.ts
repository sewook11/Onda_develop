import axiosInstance from "./axiosInstance";

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