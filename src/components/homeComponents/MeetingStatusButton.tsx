import React from "react";

interface MeeringStatusButtonsProps {
  status: "모집중" | "모집 마감"; // 모집 마감 여부
  onClickDetail?: () => void;
  onClickApply?: () => void;
}

export default function MeeringStatusButtons({
  status,
  onClickDetail,
  onClickApply,
}: MeeringStatusButtonsProps) {
  return (
    <div className="flex gap-2">
      {status === "모집중" ? (
        <button
          className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          onClick={onClickApply}
        >
          신청하기
        </button>
      ) : (
        <button
          className="flex-1 bg-gray-300 text-white py-2 rounded-md cursor-not-allowed"
          disabled
        >
          모집 마감
        </button>
      )}

      <button
        className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition"
        onClick={onClickDetail}
      >
        상세 보기
      </button>
    </div>
  );
}
