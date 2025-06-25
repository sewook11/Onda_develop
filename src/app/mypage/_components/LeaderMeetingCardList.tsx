"use client"

import Pagination from "@/components/Pagination";
import LeaderMeetingCard from "./LeaderMeetingCard";
import { useState, useMemo } from "react";
import Button from "@/components/common/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Meeting } from "@/types/meetings";

type LeaderMeetingListProps = {
  meetings: Meeting[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  perPage?: number;
  showPagination?: boolean;
};

const LeaderMeetingCardList = ({
  meetings,
  currentPage = 1,
  onPageChange,
  perPage = 10,
  showPagination = false,
}: LeaderMeetingListProps) => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");

  const filteredMeetings = useMemo(() => {
    if (!filteredStatus) return meetings;
    return meetings.filter((m) => m.status === filteredStatus);
  }, [meetings, filteredStatus]);

  const totalPages = Math.ceil(filteredMeetings.length / perPage);
  const paginated = showPagination
    ? filteredMeetings.slice((currentPage - 1) * perPage, currentPage * perPage)
    : filteredMeetings.slice(0, 3);

  return (
    <div className="space-y-6 mb-5">
      <h2 className="text-lg font-semibold">내 모임</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 text-xs rounded-md px-3 h-10"
          >
            <option value="">전체 상태</option>
            <option value="모집중">모집중</option>
            <option value="마감">마감</option>
          </select>
          <button
            onClick={() => setFilteredStatus(status)}
            className="w-16 h-10 text-xs p-0 rounded-md bg-primary text-white"
          >
            조회
          </button>
        </div>
        <Button
          onClick={() => router.push("/meet/create")}
          className="text-white flex text-xs gap-1 font-semibold"
          color="accent"
          width="w-auto"
          height="h-10"
        >
          <Plus size={20} strokeWidth={3} />
          모임 생성하기
        </Button>
      </div>

      <div className="space-y-4">
        {paginated.length === 0 ? (
          <p className="text-sm text-gray-500">해당 상태의 모임이 없습니다.</p>
        ) : (
          paginated.map((meeting) => (
            <LeaderMeetingCard key={meeting.id} {...meeting} />
          ))
        )}
      </div>

      {showPagination && onPageChange && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default LeaderMeetingCardList;
