import Modal from "@/components/common/Modal";
import { Star } from "lucide-react";
import Button from "@/components/common/Button";
import DefaultMeetingImage from "@/components/common/DefaultMeetingImage";

interface FinishedMeetDetailModalProps {
  data: {
    title: string;
    date: string;
    location: string;
    descrlption: string;
    image?: string | null;
    leaderName?: string;
    leaderImage?: string | null;
  };
  onClose: () => void;
}

const FinishedMeetDetailModal = ({ data, onClose }: FinishedMeetDetailModalProps) => {
  return (
    <Modal modalKey="finishedMeetDetail" className="w-1/2 max-w-md rounded-2xl bg-white p-6 shadow-md font-sans max-h-[90vh] overflow-y-auto">
      {/* 날짜 + 모집상태 */}
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <span>{data.date}</span>
        <span className="ml-2 text-xs rounded-full bg-primary-light px-2 py-0.5 text-white">종료</span>
      </div>

      {/* 제목 */}
      <h2 className="text-lg font-bold text-main mb-3">{data.title}</h2>

      {/* 리더 정보 */}
      <div className="flex items-center gap-3 mb-3">
        <img
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
          <img
            src={data.image}
            alt="대표 이미지"
            className="w-full min-h-[500px] h-full rounded-xl border border-gray-300 object-cover"
          />
        ) : (
          <DefaultMeetingImage width="w-full" height="min-h-[500px]" />
        )}
      </div>

      {/* 설명 */}
      <p className="text-sm text-gray-700 whitespace-pre-line mb-4">{data.descrlption}</p>

      {/* 평균 별점 + 후기 작성 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span>평균 별점 4.2</span>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-primary" fill="currentColor" />
          ))}
        </div>
        <Button
          color="accent"
          variant="fill"
          width="w-auto"
          height="h-8"
          className="text-xs px-2 py-1"
        >
          후기 작성하러 가기
        </Button>
      </div>

      {/* 후기 카드 목업 */}
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-gray-300 p-4 text-sm space-y-1 bg-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/default-profile.png" className="w-6 h-6 rounded-full" />
                <span className="font-medium">참가자</span>
              </div>
              <span className="text-xs text-gray-500">2025-05-26 14:00</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <Star key={i} className="w-4 h-4 text-primary" fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-800">너무 불친절해요.</p>
            <div className="flex gap-2 mt-1">
              <Button
                color="gray"
                variant="outline"
                width="w-auto"
                height="h-7"
                className="text-xs px-2"
              >
                수정
              </Button>
              <Button
                color="red"
                variant="outline"
                width="w-auto"
                height="h-7"
                className="text-xs px-2"
              >
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default FinishedMeetDetailModal;
