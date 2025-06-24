"use client";

import { useModalStore } from "@/stores/useModalStore";
import FinishedMeetDetailModal from "../meet/detail/_components/FinishedMeetDetailModal";
import ReviewWriteModal from "../meet/review/_components/ReviewWriteModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MeeringStatusButtonsProps {
  status: "모집중" | "모집 마감";
  onClickApply?: () => void;
  mode?: "default" | "past";
  meet_id?: number;
}

export default function MeeringStatusButtons({
  status,
  onClickApply,
  mode = "default",
  meet_id,
}: MeeringStatusButtonsProps) {
  const { openModal, closeModal, modals } = useModalStore();
  const pathname = usePathname();
  const isMyPage = pathname?.startsWith("/mypage");

  const dummyData = {
    title: "걷기 & 대화 모임",
    date: "2025-06-04",
    location: "서울특별시 어쩌구 저쩌구",
    descrlption: "가볍게 함께 걸으며\n건강도 챙기고 이웃과 마음을 나눠요",
    image: null,
    leaderName: "리더 이름",
    leaderImage: null,
  };

  const modalKey = mode === "past" ? "finishedMeetDetail" : "meetDetail";

  const openhandler = () => openModal(modalKey);
  const closehandler = () => closeModal(modalKey);

  return (
    <>
      <div className="flex gap-2">
        {mode === "past" ? (
          <>
            <button
              className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
              onClick={() => openModal("reviewWrite")}
            >
              후기작성
            </button>
            <button
              className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition"
              onClick={openhandler}
            >
              상세보기
            </button>
          </>
        ) : (
          <>
            {status === "모집중" && !isMyPage && (
              <button
                className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                onClick={onClickApply}
              >
                신청하기
              </button>
            )}
            {status === "모집 마감" && !isMyPage && (
              <button
                className="flex-1 bg-gray-300 text-white py-2 rounded-md cursor-not-allowed"
                disabled
              >
                모집 마감
              </button>
            )}

            <Link href={`/meet/${meet_id}`}>
              <button className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition">
                상세 보기
              </button>
            </Link>
          </>
        )}
      </div>

      {/* 과거 모임용 모달 */}
      {mode === "past" && modals["finishedMeetDetail"] && (
        <FinishedMeetDetailModal data={dummyData} onClose={closehandler} />
      )}

      {/* 후기 작성 모달 */}
      {modals["reviewWrite"] && (
        <ReviewWriteModal
          modalKey="reviewWrite"
          onClose={() => closeModal("reviewWrite")}
          onSubmit={(rating, content) => {
            console.log("후기 제출", rating, content);
          }}
          meetId={2}
        />
      )}
    </>
  );
}
