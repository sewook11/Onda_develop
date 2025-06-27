"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MeetingStatusButtonProps {
  status: string;
  onClickApply?: () => void;
  mode?: "default" | "past";
  id?: number | string;
  onClickDetail?: () => void;
  onClickReview?: () => void;
}

export default function MeetingStatusButton({
  status,
  onClickApply,
  mode = "default",
  id,
  onClickDetail,
  onClickReview,
}: MeetingStatusButtonProps) {
  const pathname = usePathname();
  const isMyPage = pathname?.startsWith("/mypage");

  return (
    <>
      <div className="flex gap-2">
        {mode === "past" ? (
          <>
            {/* 후기 작성 버튼 */}
            <button
              className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
              onClick={onClickReview}
            >
              후기작성
            </button>

            {/* 상세보기 버튼 */}
            <button
              className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition"
              onClick={onClickDetail}
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
            {/* 기본 상세보기는 링크 이동 */}
            <Link href={`/meet/${id}`}>
              <button className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition">
                상세 보기
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
