'use client';

import MoreLinkButton from '@/components/common/Buttons/MoreLinkButton';
import StarRating from '@/components/StarRating';

export type ReviewCardProps = {
  userName: string;
  rating: number; // 1 ~ 5
  meetingName: string;
  date: string;
  location: string;
  count: number;
  content: string;
};

const ReviewCard = ({
  userName,
  rating,
  meetingName,
  date,
  location,
  count,
  content,
}: ReviewCardProps) => {

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3 text-sm w-full">
      {/* 상단: 참가자 + 별점 + 상세보기 */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 font-semibold">
          <span className='text-sm mr-2'>{userName}님</span>
          <StarRating rating={rating} size={20}/>
        </div>
        <MoreLinkButton onClick={() => console.log('상세보기')}>
            상세 보기
        </MoreLinkButton>
      </div>

      {/* 메타 정보 */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-base">
        <div><span className='font-medium text-gray-700'>모임명</span> {meetingName}</div>
        <div><span className='font-medium text-gray-700'>활동 일시</span>  {date}</div>
        <div><span className='font-medium text-gray-700'>장소</span>  {location}</div>
        <div><span className='font-medium text-gray-700'>모임 횟수</span>  {count}회</div>
      </div>

      {/* 후기 본문 */}
      <p className="text-xs text-gray-800 leading-relaxed">{content}</p>
    </div>
  );
};

export default ReviewCard;
