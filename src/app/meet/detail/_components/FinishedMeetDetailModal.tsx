"use client";

import Modal from "@/components/common/Modal";
import DefaultMeetingImage from "@/components/common/DefaultMeetingImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReviewList from "@/app/meet/review/_components/ReviewList";
import { getMeetDetail } from "@/apis/meetingApi";
import { MeetDetail } from "@/types/meetings";

interface FinishedMeetDetailModalProps {
  onClose?: () => void;
  modalKey: string;
  meetId: number | string;
  onSubmit?: (rating: number, content: string) => void;
}

const FinishedMeetDetailModal = ({
  modalKey,
  meetId,
}: FinishedMeetDetailModalProps) => {
  const [meetDetail, setMeetDetail] = useState<MeetDetail | null>(null);

  useEffect(() => {
    //모달 데터 불러오기
    if (meetId) {
      async function fetchMeetDetail() {
        const response = await getMeetDetail(Number(meetId));
        setMeetDetail(response);
        console.log("모달 출력", meetId, response);
      }
      fetchMeetDetail();
    }
  }, [meetId]);

  return (
    <Modal
      modalKey={modalKey}
      className="md:w-1/2 w-full max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl px-4 py-6 rounded-2xl"
    >
      {meetDetail ? (
        <>
          {/* 날짜 + 상태 */}
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <span>{meetDetail.schedule[0]}</span>
            <span className="ml-2 text-xs rounded-full bg-primary-light px-2 py-0.5 text-white">
              종료
            </span>
          </div>

          {/* 제목 */}
          <h2 className="text-lg font-bold text-main mb-3">
            {meetDetail.title}
          </h2>

          {/* 리더 정보 */}
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={meetDetail.leader.file?.file || "/default-profile.png"}
              alt="리더"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-semibold text-sm text-main">
                {meetDetail.leader.nickname || "리더 이름"}
              </p>
              <p className="text-xs text-gray-600">{meetDetail.location}</p>
            </div>
          </div>

          {/* 대표 이미지 */}
          <div className="mb-3">
            {meetDetail?.file?.file ? (
              <Image
                src={meetDetail?.file.file}
                alt="대표 이미지"
                width={500}
                height={500}
                className="w-full min-h-[500px] h-full rounded-xl border border-gray-300 object-cover"
              />
            ) : (
              <DefaultMeetingImage width="w-full" height="min-h-[500px]" />
            )}
          </div>

          {/* 설명 */}
          <p className="text-sm text-gray-700 whitespace-pre-line mb-4">
            {meetDetail.description}
          </p>

          {/* 리뷰 리스트 컴포넌트 */}
          <ReviewList meetId={meetDetail.id} />
        </>
      ) : (
        <p className="text-center text-gray-500">
          모임 정보를 불러오는 중입니다...
        </p>
      )}
    </Modal>
  );
};

export default FinishedMeetDetailModal;
