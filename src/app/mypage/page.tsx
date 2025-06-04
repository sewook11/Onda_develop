"use client";

import Profile from "./_components/Profile";
import AppliedScheduleList from "./_components/AppliedScheduleList";
import PastScheduleList from "./_components/PastScheduleList";
import { useAuthStore } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";
import FinishedMeetDetailModal from "../meet/detail/_components/FinishedMeetDetailModal";

export default function Mypage() {
  const { modals, closeModal } = useModalStore();

  
  const { currentUser } = useAuthStore();
  console.log(currentUser?.name);
  const router = useRouter();

  const handleBtn = () => {
    router.push("/meet/search");
  };
  return (
    <main className="px-10 py-12 max-w-5xl mx-auto">
      <Profile />
      {currentUser && (
        <div className="w-full flex justify-center mb-6">
          <p className="font-bold text-lg text-center">
            {currentUser?.nickname}님의 신청 모임, 일정들을 확인하세요.
          </p>
        </div>
      )}
      <AppliedScheduleList />
      <div className="w-full flex justify-between items-center mt-16 mb-4">
        <h2 className="text-lg font-bold">지난 모임은 어떠셨나요?</h2>
        <button
          onClick={handleBtn}
          className="text-sm text-orange-500 border border-orange-400 px-3 py-1 rounded hover:bg-orange-50 transition"
        >
          모임활동 더보기
        </button>
      </div>
      <PastScheduleList />
    </main>
  );
}
