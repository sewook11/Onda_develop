"use client";

// import { sampleUser } from "@/datas/sampleUser";
import { ArrowLeftRight, Camera, SquarePen, UserRound } from "lucide-react";
import Image from "next/image";
import { useViewModeStore } from "@/stores/useViewModeStore";
import { useAuthStore } from "@/stores/useAuth";
import { useEffect, useState } from "react";
import api from "@/apis/app";
import { END_POINT } from "@/constants/route";

interface Profile {
  email: string;
  name: string;
  nickname: string;
  phone_number?: string;
  date_of_birth?: string;
  digital_level?: {
    display: string;
  };
  interests?: {
    interest_name: string;
  }[];
  file?: string;
}

const UserProfile = () => {
  const { viewMode, toggleViewMode } = useViewModeStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((s) => s.user?.role);
  const isAdmin = role === "admin";
  const isLeader = role === "leader";

  console.log(accessToken);
  console.log("profile: ", profile);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(END_POINT.USERS_PROFILE, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("res", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [accessToken]);

  return (
    <div className="space-y-4">
      {/* 상단 이름 + 수정 버튼 */}
      <div className="flex items-center">
        <h3 className="text-lg font-semibold">{profile?.name}님</h3>
        <button className="text-gray-500 hover:text-black ml-3">
          <SquarePen />
        </button>
      </div>

      {/* 프로필 영역 */}
      <div className="flex items-center space-x-6">
        <div className="relative w-52 h-52">
          <div className="w-52 h-52 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
            {profile?.file ? (
              <Image
                src={profile?.file}
                alt="프로필 이미지"
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
            ) : (
              <UserRound className="text-gray-400 w-20 h-20" />
            )}
            <button className="absolute bottom-2 right-2 w-10 h-10 flex justify-center items-center bg-white border rounded-full p-1 shadow-sm hover:bg-gray-100">
              <Camera size={20} />
            </button>
          </div>
        </div>

        {/* 유저 정보 */}
        <div className="flex flex-col space-y-3 text-sm text-gray-800">
          <p>
            <span className="font-semibold mr-2">이메일</span>
            {profile?.email}
          </p>
          <p>
            <span className="font-semibold mr-2">전화번호</span>
            {profile?.phone_number ?? "-"}
          </p>
          <p>
            <span className="font-semibold mr-2">생년월일</span>
            {profile?.date_of_birth
              ? new Date(profile.date_of_birth).toLocaleDateString("ko-KR")
              : "-"}
          </p>
          {isAdmin || isLeader ? (
            <p>
              <span className="font-semibold mr-2">디지털난이도</span>
              {profile?.digital_level?.display ?? "-"}
            </p>
          ) : (
            <p>
              <span className="font-semibold mr-2">관심 분야</span>
              {profile?.interests?.map((i) => i.interest_name).join(", ")}
            </p>
          )}
        </div>

        {/* 사용자 변경 버튼 */}
        {isLeader && (
          <button
            onClick={toggleViewMode}
            className="flex items-center ml-auto px-3 py-1 border rounded-full text-xs text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeftRight size={16} className="mr-1" />
            {viewMode === "leader" ? "일반 유저로 전환" : "리더 유저로 전환"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
