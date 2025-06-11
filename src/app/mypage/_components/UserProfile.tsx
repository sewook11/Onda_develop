'use client';

import { sampleUser } from '@/datas/sampleUser';
import { ArrowLeftRight, Camera, SquarePen, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useViewModeStore } from '@/stores/useViewModeStore';

const UserProfile = () => {
  const user = sampleUser;
  const { viewMode, toggleViewMode } = useViewModeStore();

  return (
    <div className="space-y-4">
      {/* 상단 이름 + 수정 버튼 */}
      <div className="flex items-center">
        <h3 className="text-lg font-semibold">{user.name}님</h3>
        <button className="text-gray-500 hover:text-black ml-3">
          <SquarePen />
        </button>
      </div>

      {/* 프로필 영역 */}
      <div className="flex items-center space-x-6">
        <div className="relative w-52 h-52">
          <div className="w-52 h-52 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
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
            {user.email}
          </p>
          <p>
            <span className="font-semibold mr-2">전화번호</span>
            {user.phone}
          </p>
          <p>
            <span className="font-semibold mr-2">생년월일</span>
            {user.birth.toLocaleDateString('ko-KR')}
          </p>
          {user.isAdmin || user.isLeader ? (
            <p>
              <span className="font-semibold mr-2">디지털난이도</span>
              {user.digitalLevel}
            </p>
          ) : (
            <p>
              <span className="font-semibold mr-2">관심 분야</span>
              {user.interest.join(', ')}
            </p>
          )}
        </div>

        {/* 사용자 변경 버튼 */}
        {user.isLeader && (
          <button
            onClick={toggleViewMode}
            className="flex items-center ml-auto px-3 py-1 border rounded-full text-xs text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeftRight size={16} className="mr-1" />
            {viewMode === 'leader' ? '일반 유저로 전환' : '리더 유저로 전환'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
