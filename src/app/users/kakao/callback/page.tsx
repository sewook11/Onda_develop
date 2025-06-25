'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DecodedToken, useAuthStore } from '@/stores/useAuth';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useSignupSubmit } from '@/hooks/useSignupSubmit';
import { END_POINT } from '@/constants/route';
import api from '@/apis/app';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const auth = useAuthStore.getState();
  const { setSignupData } = useSignupSubmit();

  useEffect(() => {
    if (!code || !state) return;

    (async () => {
      try {
        const res = await axios.post(
          'https://api.ondamoim.com/api/users/kakao/callback',
          { code, state },
          { withCredentials: true }
        );
        const { access_token, csrf_token } = res.data;
        const decoded: DecodedToken = jwtDecode(access_token);

        // const isValidUser = !!decoded?.email && !!decoded.nickname;
        // set auth data
        auth.setAccessToken(access_token);
        auth.setCsrfToken(csrf_token);
        auth.setUser({
          email: decoded.email,
          name: decoded.name,
          nickname: decoded.nickname,
          role: decoded.role,
          user_id: decoded.user_id,
          isAdmin: true,
        });

        const profile = await api.get(END_POINT.USERS_PROFILE, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        console.log('👀 profile data:', profile.data);
        const { area, interests, digital_level } = profile.data;
        const isNewUser = !area || !interests?.length || !digital_level;
        // redirect
        if (isNewUser) {
          // 회원가입 폼에 미리 email, nickname 채워놓기
          setSignupData((prev) => ({
            ...prev,
            isKakaoUser: true,
            email: decoded.email,
            nickname: decoded.nickname,
          }));
          router.push('/signup?kakao=1');
        } else {
          useAuthStore.getState().setKakaoUserSignedUp(true);
          router.push('/');
        }
      } catch (err) {
        useAuthStore.getState().setKakaoUserSignedUp(true);
        console.error(err);
        router.push('/login'); // 실패할 경우 로그인 페이지로
      }
    })();
  }, [auth, code, router, setSignupData, state]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg">카카오 로그인 처리 중...</p>
    </div>
  );
}
