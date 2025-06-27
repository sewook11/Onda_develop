"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuth";
import { useModalStore } from "@/stores/useModalStore";
import api from "@/apis/app";
import Button from "@/components/common/Button";
import { Star } from "lucide-react";
import Image from "next/image";
import ReviewEditModal from "@/app/meet/review/_components/ReviewEditModal";

interface Review {
  id: number;
  user_id: number;
  user_name: string;
  rating: number;
  content: string;
  created_at: string;
}
interface ReviewListProps {
  meetId: number;
}
export default function ReviewList({ meetId }: ReviewListProps) {
  const { user } = useAuthStore();
  const { modals, modalData, openModal, closeModal } = useModalStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const fetchReviews = async () => {
    try {
      const res = await api.get(`/meets/${meetId}/reviews`);
      // console.log('res', res);
      setReviews(res.data.reviews);
      setAverageRating(res.data.average_rating);
    } catch (err) {
      console.error("리뷰 불러오기 실패:", err);
    }
  };
  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };
  useEffect(() => {
    if (meetId) fetchReviews();
  }, [meetId]);
  return (
    <div>
      {/* 평균 별점 */}
      {averageRating !== null && (
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <span>평균 별점 {averageRating.toFixed(1)}</span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-primary"
              fill="currentColor"
            />
          ))}
        </div>
      )}

      {/* 리뷰 리스트 */}
      <div className="space-y-3">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border p-4 bg-gray-100 space-y-1"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src="/default-profile.png"
                    alt="profile"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-medium">{review.user_name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {review.created_at.split("T")[0]}
                </span>
              </div>

              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                  />
                ))}
              </div>

              <p>{review.content}</p>

              {/* 조건부 버튼 노출 */}
              {(user?.role === "admin" || user?.user_id === review.user_id) && (
                <div className="flex gap-2 mt-1">
                  <Button
                    color="gray"
                    variant="outline"
                    className="text-xs px-2"
                    onClick={() =>
                      openModal("reviewEdit", {
                        id: review.id,
                        rating: review.rating,
                        content: review.content,
                      })
                    }
                  >
                    수정
                  </Button>
                  <Button
                    color="red"
                    variant="outline"
                    className="text-xs px-2"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    삭제
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* 수정 모달 */}
      {modals.reviewEdit && (
        <ReviewEditModal
          review={
            modalData.reviewEdit as {
              id: number;
              rating: number;
              content: string;
            }
          }
          onClose={() => closeModal("reviewEdit")}
          onSuccess={fetchReviews}
        />
      )}
    </div>
  );
}
