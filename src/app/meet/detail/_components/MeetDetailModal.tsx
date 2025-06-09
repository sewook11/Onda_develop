import Modal from "@/components/common/Modal";
// import { Star } from "lucide-react";
import Button from "@/components/common/Button";
import DefaultMeetingImage from "@/components/common/DefaultMeetingImage";
import Image from "next/image";

interface MeetDetailModalProps {
  data: {
    title: string;
    date: string;
    location: string;
    descrlption: string;
    image?: string | null;
    leaderName?: string;
    leaderImage?: string | null;
  };
  isApplied: boolean;
  onApply: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const MeetDetailModal = ({ data, isApplied, onApply, onCancel}: MeetDetailModalProps) => {
  return (
    <Modal modalKey="meetDetail" className="md:w-1/2 w-full max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl px-4 py-6 rounded-2xl">

      {/* 날짜 + 모집상태 */}
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <span>{data.date}</span>
        <span className="ml-2 text-xs rounded-full bg-primary-light px-2 py-0.5 text-white">모집중</span>
      </div>

      {/* 제목 */}
      <h2 className="text-lg font-bold text-main mb-3">{data.title}</h2>

      {/* 리더 정보 */}
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={data.leaderImage || "/default-profile.png"}
          alt="리더"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <div>
          <p className="font-semibold text-sm text-main">{data.leaderName || "리더 이름"}</p>
          <p className="text-xs text-gray-600">{data.location}</p>
        </div>
      </div>

      {/* 이미지 */}
      <div className="mb-3">
        {data.image ? (
          <Image
            src={data.image}
            alt="대표 이미지"
            className="w-full h-auto rounded-xl border border-gray-300 object-cover"
          />
        ) : (
          <DefaultMeetingImage width="w-full" height="min-h-[500px]" />
        )}
      </div>

      {/* 설명 */}
      <p className="text-sm text-gray-700 whitespace-pre-line mb-4">{data.descrlption}</p>

      {/* 하단 버튼 */}
      <div className="flex justify-end">
        {isApplied ? (
          <Button
            color="red"
            variant="fill"
            width="w-full"
            height="h-10"
            className="text-sm"
            onClick={onCancel}
          >
            신청 취소하기
          </Button>
        ) : (
          <Button
            color="primary"
            variant="fill"
            width="w-full"
            height="h-10"
            className="text-sm"
            onClick={onApply}
          >
            신청하기
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default MeetDetailModal;
