'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FinishedMeetDetailModalProps } from '../meet/detail/_components/FinishedMeetDetailModal';
import { useModalStore } from '@/stores/useModalStore';
import FinishedMeetDetailModal from '../meet/detail/_components/FinishedMeetDetailModal';
import ReviewWriteModal from '../meet/review/_components/ReviewWriteModal';

interface MeetingStatusButtonProps {
  status: string;
  onClickApply?: () => void;
  mode?: 'default' | 'past';
  id?: number | string;
  onClickDetail?: () => void;
  onClickReview?: () => void;
}

export default function MeetingStatusButton({
  status,
  onClickApply,
  mode = 'default',
  id,
}: MeetingStatusButtonProps) {
  const { openModal, closeModal, modals, modalData  } = useModalStore();
  const pathname = usePathname();
  const isMyPage = pathname?.startsWith('/mypage');

  const modalKey = mode === 'past' ? 'finishedMeetDetail' : 'meetDetail';

  const openhandler = () => {
    if (!id) {
      console.warn('meet_id 누락');
      return;
    }

    openModal(modalKey, { meet_id: id });
  };

  const closehandler = () => closeModal(modalKey);

  return (
    <>
      <div className="flex gap-2">
        {mode === 'past' ? (
          <>
            {/* 후기 작성 버튼 */}
            <button
              className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
              onClick={openhandler}
            >
              후기작성
            </button>

            {/* 상세보기 버튼 */}
            <button
              className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition"
              onClick={openhandler}
            >
              상세보기
            </button>
          </>
        ) : (
          <>
            {status === '모집중' && !isMyPage && (
              <button
                className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                onClick={onClickApply}
              >
                신청하기
              </button>
            )}
            {status === '마감' && !isMyPage && (
              <button className="flex-1 bg-gray-300 text-white py-2 rounded-md cursor-not-allowed" disabled>
                모집 마감
              </button>
            )}

            {/* 기본 상세보기는 링크 이동 */}
            <Link href={`/meet/${id}`}>
              <button className="flex-1 border border-orange-500 text-orange-500 p-2 rounded-md hover:bg-orange-50 transition">
                상세 보기
              </button>
            </Link>
          </>
        )}
      </div>

      {/* 과거 모임용 상세 모달 */}
      {mode === 'past' && modals['finishedMeetDetail'] && (
      <FinishedMeetDetailModal
  data={modalData.finishedMeetDetail as FinishedMeetDetailModalProps['data']}
  onClose={closehandler}
/>
      )}

      {/* 후기 작성 모달 */}
      {modals['reviewWrite'] && (
        <ReviewWriteModal
          modalKey="reviewWrite"
          onClose={() => closeModal('reviewWrite')}
          onSubmit={(rating, content) => {
            console.log('후기 제출', rating, content);
          }}
          meetId={Number(id)}
        />
      )}
    </>
  );
}
