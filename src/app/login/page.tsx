"use client";

import Button from "@/components/common/Button";
import LoginForm from "@/app/login/_components/Loginform";
import { useAuthStore } from "@/stores/useAuth";
import { useSignupStore } from "@/stores/useSignUpStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (authObj: KakaoAuthResponse) => void;
          fail: (err: KakaoAuthError) => void;
        }) => void;
      };
      API: {
        request: (options: { url: string }) => Promise<KakaoUserResponse>;
      };
    };
  }

  interface KakaoAuthResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    refresh_token_expires_in: number;
  }

  interface KakaoAuthError {
    error: string;
    error_description: string;
  }

  interface KakaoUserResponse {
    id: number;
    kakao_account: {
      email?: string;
      profile: {
        nickname: string;
        profile_image_url?: string;
        thumbnail_image_url?: string;
      };
    };
  }
  interface User {
    email: string;
    password: string;
    name: string;
    nickname: string;
  }
}

export default function LoginPage() {
  const router = useRouter();

  const {
    email,
    password,
    setEmail,
    setPassword,
    reset,
    login,
    setCurrentUser,
  } = useAuthStore();
  const { setKakaoUserSignedUp, isKakaoUserSignedUp } = useSignupStore();

  // 카카오 회원인 경우(회원 가입이 돼있음)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("ab35181e1003ea27d7d99b97f365e290");
        console.log("✅ Kakao SDK Initialized:", window.Kakao.isInitialized());
      }
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (isKakaoUserSignedUp) {
      router.push("/");
    }
  }, [isKakaoUserSignedUp, router]);

  const handleKakaoLogin = () => {
    if (!window.Kakao) return;

    window.Kakao.Auth.login({
      success: async () => {
        try {
          const res = await window.Kakao.API.request({
            url: "/v2/user/me",
          });

          const kakaoEmail = res.kakao_account.email ?? "";
          const nickname = res.kakao_account.profile.nickname ?? "";

          const users = JSON.parse(localStorage.getItem("users") || "[]");
          const existingUser = users.find(
            (user: User) => user.email === kakaoEmail
          );

          if (existingUser) {
            setCurrentUser(existingUser);
            setKakaoUserSignedUp(true);
            router.push("/");
          } else {
            const { setIsKakaoUser, setValue } = useSignupStore.getState();
            setIsKakaoUser(true);
            setValue("email", kakaoEmail);
            setValue("nickname", nickname);
            router.push("/signup");
          }
        } catch (apiError) {
          console.error(apiError);
        }
      },
      fail: (err: KakaoAuthError) => {
        console.error("로그인 실패", err);
      },
    });
  };

  // 일반 로그인
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const success = await login(email, password);
    if (success) {
      alert("로그인 성공!");
      reset();
      router.push("/");
    } else {
      alert("로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <main className="max-w-md mx-auto px-6 py-28">
      <div className="w-full max-w-md px-4">
        <h1 className="text-sm font-bold text-center mb-10">빠른 로그인하기</h1>
        <Button
          variant="fill"
          width="w-full"
          height="h-[69px]"
          className="bg-[#FEE500] text-black font-bold rounded-md"
          onClick={handleKakaoLogin}
        >
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/assets/icon/Kakao.svg"
              alt="kakao"
              width={25}
              height={25}
            />
            <span className=" text-black font-bold text-sm">카카오 로그인</span>
          </div>
        </Button>
        <div className="mt-20 text-sm font-bold text-black text-center">
          가입했던 이메일로 로그인할래요
        </div>
        <div className="mt-6 space-y-4">
          <LoginForm
            email={email}
            password={password}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
            onSubmit={handleLogin}
          />
        </div>
        <div
          className="text-xs text-end mt-6 text-black cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          회원가입
        </div>
      </div>
    </main>
  );
}
