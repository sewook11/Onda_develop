'use client';

import { ArrowLeftRight, Camera, SquarePen, UserRound } from 'lucide-react';
import Image from 'next/image';
import ProfileImageModal from './ProfileImageModal';
import { useViewModeStore } from '@/stores/useViewModeStore';
import { useAuthStore } from '@/stores/useAuth';
import { useEffect, useState, useRef } from 'react';
import api from '@/apis/app';
import { END_POINT } from '@/constants/route';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export interface Profile {
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
  file?:
    | string
    | {
        file: string;
        id: number;
        thumbnail: string;
      };
}

const UserProfile = () => {
  const route = useRouter();
  const { viewMode, toggleViewMode } = useViewModeStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((s) => s.user?.role);
  const isLeader = role === 'leader';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(END_POINT.USERS_PROFILE, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [accessToken]);

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !accessToken) return;

    const formData = new FormData();
    formData.append('category', 'profile');
    formData.append('file', file);

    try {
      const uploadRes = await api.post(END_POINT.FILES_UPLOAD, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('uploadRes:', uploadRes.data);

      const uploadId = uploadRes.data.ids?.[0];
      if (!uploadId) {
        console.error('업로드된 파일 ID가 없습니다.');
        return;
      }

      await api.patch(
        END_POINT.USERS_PROFILE,
        { file: uploadId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 프로필 업데이트
      const profileRes = await api.get(END_POINT.USERS_PROFILE, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfile(profileRes.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('응답 상태:', err.response?.status);
        console.error('응답 메시지:', err.response?.data); // 여기가 핵심!
      } else {
        console.error('기타 에러:', err);
      }
    }
  };
  // 파일 삭제
  const handleDeleteImage = async () => {
    if (!accessToken || !profile?.file || typeof profile.file !== 'object') return;

    try {
      await api.delete(END_POINT.FILES_DELETE, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          ids: [profile.file.id], // 삭제 파일 ID
        },
      });
      const res = await api.get(END_POINT.USERS_PROFILE, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfile(res.data);
      setShowOptions(false);
    } catch (err) {
      console.error('이미지 삭제 실패:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* 상단 이름 + 수정 버튼 */}
      <div className="flex items-center">
        <h3 className="text-lg font-semibold">{profile?.name}님</h3>
        <button
          className="text-gray-500 hover:text-black ml-3"
          onClick={() => route.push('/mypage/edit_profile')}
          aria-label="프로필 수정"
        >
          <SquarePen />
        </button>
      </div>

      {showOptions && (
        <ProfileImageModal
          onClose={() => setShowOptions(false)}
          onChange={() => {
            fileInputRef.current?.click();
            setShowOptions(false);
          }}
          onDelete={async () => {
            await handleDeleteImage();
            setShowOptions(false);
          }}
        />
      )}

      {/* 프로필 영역 */}
      <div className="flex items-center space-x-6">
        {/* 이미지 */}
        <div className="relative w-52 h-52">
          {/* 프로필 이미지 */}
          <div className="w-52 h-52 rounded-full overflow-hidden border bg-gray-100 relative">
            {profile?.file && typeof profile.file === 'object' && profile.file.file ? (
              <Image
                src={profile.file.file}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
                width={208}
                height={208}
              />
            ) : (
              <UserRound className="text-gray-400 w-20 h-20 absolute inset-0 m-auto" />
            )}
          </div>

          {/* 업로드 버튼 */}
          <button
            className="absolute bottom-2 right-2 z-50 w-10 h-10 bg-white border rounded-full p-1 shadow-md flex items-center justify-center hover:bg-gray-100"
            onClick={() => {
              if (profile?.file && typeof profile.file === 'object') {
                setShowOptions(true);
              } else {
                fileInputRef.current?.click();
              }
            }}
          >
            <Camera size={20} />
          </button>

          {/* 숨겨진 파일 input */}
          <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
        </div>

        {/* 정보 */}
        <div className="flex flex-col space-y-3 text-sm text-gray-800">
          <p>
            <span className="font-semibold mr-2">이메일</span>
            {profile?.email}
          </p>
          <p>
            <span className="font-semibold mr-2">전화번호</span>
            {profile?.phone_number ?? '-'}
          </p>
          <p>
            <span className="font-semibold mr-2">생년월일</span>
            {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString('ko-KR') : '-'}
          </p>
          <p>
            <span className="font-semibold mr-2">디지털난이도</span>
            {profile?.digital_level?.display ?? '-'}
          </p>

          <p>
            <span className="font-semibold mr-2">관심 분야</span>
            {profile?.interests?.map((i) => i.interest_name).join(', ')}
          </p>
        </div>

        {/* 보기 모드 전환 버튼 */}
        {isLeader && (
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
