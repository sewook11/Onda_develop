import React from 'react';
import { Calendar, MapPin, MessageSquareIcon } from 'lucide-react';
import Image from 'next/image';
import DefaultGatheringImage from '../common/DefaultMeetingImage';
import { MeetingCardProps } from '@/types/meetings';
import MeetingStatusButtons from '../../app/_components/MeetingStatusButton';
import api from '@/apis/app';
import { useRouter, usePathname } from 'next/navigation';
import { END_POINT } from '@/constants/route';
// import FinishedMeetDetailModal from '@/app/meet/detail/_components/FinishedMeetDetailModal';
// import ReviewWriteModal from '@/app/meet/review/_components/ReviewWriteModal';
import { useModalStore } from '@/stores/useModalStore';

export const MeetingCard = ({ item, isApplied = false, context }: MeetingCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMyPage = pathname?.startsWith('/mypage');
  const { title, date, time, area, file, contact, status, id } = item;
  const { openModal } = useModalStore();

  console.log(file);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
        return;
      }

      await api.post(END_POINT.MEETINGS_APPLY(id));
      alert('모임 신청이 완료되었습니다!');
      router.refresh();
    } catch (error) {
      console.error('모임 신청 실패:', error);
      alert('모임 신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-lg mb-2 transition-all bg-white">
      <div className="flex gap-4 text-sm text-orange-400 font-semibold items-center mb-4">{status}</div>
      <div className="w-full h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
        {file && file.thumbnail ? (
          <div className="w-full relative rounded-md overflow-hidden h-40">
            <Image src={file.thumbnail} alt={title} className="object-cover" sizes="100%" fill />
          </div>
        ) : (
          <div className="mb-4">
            <DefaultGatheringImage width="w-full" height="h-40" />
          </div>
        )}
      </div>

      <div className="font-bold text-sm mb-2">{title}</div>
      <div className="text-gray-600 text-xs flex items-center mb-1">
        <Calendar size={16} className="mr-1" />
        {date} ({new Date(date).toLocaleDateString('ko-KR', { weekday: 'short' })}) {time}
      </div>
      <div className="text-gray-600 text-xs flex items-center mb-1">
        <MapPin size={16} className="mr-1" />
        {area}
      </div>

      {isApplied && contact && (
        <div className="text-gray-600 text-xs flex items-center mb-1 break-all">
          <MessageSquareIcon size={20} className="mr-1" />
          <a
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline hover:text-orange-500 hover:font-bold cursor-pointer transition"
          >
            오픈채팅
          </a>
        </div>
      )}

      <MeetingStatusButtons
        status={status}
        mode={context === 'past' ? 'past' : 'default'}
        id={id}
        onClickDetail={() => {
          console.log('디테일 버튼 클릭', id);
          openModal(`finishedMeetDetail-${id}`, { meetId: id });
        }}
        onClickReview={() => {
          console.log('후기 버튼 클릭', id);
          openModal(`reviewWrite-${id}`, { meetId: id });
        }}
        onClickApply={isMyPage ? undefined : handleApply}
      />

      {/* 후기 모달
      {isReviewModalOpen && (
        <ReviewWriteModal
          modalKey={`reviewWrite-${id}`}
          onClose={() => closeModal(`reviewWrite-${id}`)}
          onSubmit={(rating, content) => {
            console.log('후기 제출', rating, content);
            setIsReviewModalOpen(false);
          }}
          meetId={id ?? 0}
        />
      )}

      {/* 상세 모달 */}
      {/* {isDetailModalOpen && <FinishedMeetDetailModal modalKey={`finishedMeetDetail-${id}`} meetId={id ?? 0} />} */}
    </div>
  );
};
