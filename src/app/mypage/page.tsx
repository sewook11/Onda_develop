"use client";
import AppliedScheduleList from "./_components/AppliedScheduleList";
import PastScheduleList from "./_components/PastScheduleList";
import { useAuthStore } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import UserProfile from "./_components/UserProfile";
import ReviewList from "./_components/ReviewList";
import { sampleReviews } from "@/datas/sampleReivew";
import MoreLinkButton from "@/components/common/Buttons/MoreLinkButton";
import LeaderMeetingList from "./_components/LeaderMeetingCardList";
import { sampleLeaderMeetings } from "@/datas/sampleMeeting";
import ApplicantTable from "../leader/_components/ApplicantTable";
import { useViewModeStore } from "@/stores/useViewModeStore";

export default function Mypage() {
  const { user } = useAuthStore();
  const { viewMode } = useViewModeStore();

  const router = useRouter();

  const displayNickname = user?.nickname;

  const handleBtn = () => {
    router.push("/meet/search");
  };
  return (
    <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
      <UserProfile />
      {/* 관리자 */}
      
      {user?.isAdmin && <ApplicantTable />}
      {/* 관리자 외 유저/리더 */}
      {!user?.isAdmin && (
        <>
          {/* 리더 */}
          {viewMode === "leader" && (
            <>
              <div>
                <LeaderMeetingList meetings={sampleLeaderMeetings} />
                <MoreLinkButton href="/mypage/reviews">전체 보기</MoreLinkButton>
              </div>
              <div>
                <ReviewList reviews={sampleReviews} />
                <MoreLinkButton href="/mypage/reviews">전체 보기</MoreLinkButton>
              </div>
            </>
          )}

          {/* 일반 유저 */}
          {viewMode === "user" && (
            <>
              {displayNickname && (
                <div className="w-full flex justify-center mb-6">
                  <p className="font-bold text-lg text-center">
                    {displayNickname}님의 신청 모임, 일정들을 확인하세요.
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
            </>
          )}
        </>
      )}
    </main>
  );
}
