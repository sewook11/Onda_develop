'use client';

import {  useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Star } from 'lucide-react';
import api from '@/apis/app';

interface ReviewEditModalProps {
  review: {
    id: number;
    rating: number;
    content: string;
  };
  onClose: () => void;
  onSuccess?: () => void; 
}

export default function ReviewEditModal({ review, onClose, onSuccess }: ReviewEditModalProps) {
  const [rating, setRating] = useState<number>(review.rating);
  const [content, setContent] = useState<string>(review.content);

  const handleSubmit = async () => {
    if (rating === 0 || content.trim() === '') {
      alert('별점과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await api.patch(`/reviews/${review.id}`, {
        rating,
        content,
      });

      alert('리뷰가 수정되었습니다.');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('리뷰 수정 실패:', err);
      alert('리뷰 수정에 실패했습니다.');
    }
  };

  return (
    <Modal modalKey="reviewEdit" className="w-full sm:max-w-md rounded-2xl p-6">
      <h2 className="text-lg font-bold text-main mb-4">후기 수정하기</h2>

      {/* 별점 선택 */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-primary' : 'text-gray-300'}`}
            fill={star <= rating ? 'currentColor' : 'none'}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {/* 내용 입력 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-28 border rounded-md p-2 text-sm resize-none"
        placeholder="후기 내용을 입력해주세요"
      />

      {/* 버튼 */}
      <div className="flex justify-end gap-2 mt-4">
        <Button color="gray" variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </Modal>
  );
}
