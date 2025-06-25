'use client';

import { useModalStore } from '@/stores/useModalStore';
import Modal from '@/components/common/Modal';
import StarRating from '@/components/StarRating';

const ReviewDetailModal = () => {
  const isOpen = useModalStore((s) => s.modals['reviewDetail']);
  const data = useModalStore((s) => s.modalData['reviewDetail']) as {
    nickname: string;
    rating: number;
    content: string;
    meet_title: string;
    meet_date: string;
    meet_location: string;
  };

  if (!isOpen || !data) return null;

  return (
    <Modal modalKey="reviewDetail" className="w-1/2 p-8">
      <h3 className="text-lg font-bold text-gray-800 mb-6">
        {data.nickname}님의 후기
      </h3>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-3">
            <StarRating rating={data.rating} size={30} />
            <span className="text-sm font-medium text-gray-700">
                {data.rating}
            </span>
        </div>
        <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-line">
            {data.content}
        </p>
      </div>

        {/* 모임정보 */}
      <div className="space-y-2 p-4 text-xs text-gray-700 bg-gray-200 mt-6">
        <p>
          <span className="font-semibold text-gray-800">모임명:</span>{' '}
          {data.meet_title}
        </p>
        <p>
          <span className="font-semibold text-gray-800">활동 일시:</span>{' '}
          {data.meet_date}
        </p>
        <p>
          <span className="font-semibold text-gray-800">장소:</span>{' '}
          {data.meet_location}
        </p>
      </div>

    </Modal>
  );
};

export default ReviewDetailModal;
