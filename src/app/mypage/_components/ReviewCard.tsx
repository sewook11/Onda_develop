'use client';

import MoreLinkButton from '@/components/common/Buttons/MoreLinkButton';
import StarRating from '@/components/StarRating';
import { useModalStore } from '@/stores/useModalStore';
import { Review } from '@/types/meetings';

export type ReviewCardProps = Review;

const ReviewCard = ({
  nickname,
  rating,
  content,
  meet_title,
  meet_date,
  meet_location
}: ReviewCardProps) => {

  const openModal = useModalStore((s) => s.openModal);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3 text-sm w-full">
      {/* 상단: 참가자 + 별점 + 상세보기 */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 font-semibold">
          <span className='text-sm mr-2'>{nickname}님</span>
          <StarRating rating={rating} size={20}/>
        </div>
        <MoreLinkButton onClick={() => openModal('reviewDetail', {nickname, rating, content, meet_title, meet_date, meet_location})}>
            상세 보기
        </MoreLinkButton>
      </div>

      {/* 메타 정보 */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-base">
        <div><span className='font-medium text-gray-700'>모임명</span> {meet_title}</div>
        <div><span className='font-medium text-gray-700'>활동 일시</span> {meet_date}</div>
        <div><span className='font-medium text-gray-700'>장소</span>  {meet_location}</div>
        {/* <div><span className='font-medium text-gray-700'>모임 횟수</span>  {count}회</div> */}
      </div>

      {/* 후기 본문 */}
      <p className="text-xs text-gray-800 leading-relaxed">{content}</p>
    </div>
  );
};

export default ReviewCard;