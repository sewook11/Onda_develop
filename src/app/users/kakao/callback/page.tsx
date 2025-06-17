"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  nickname: string;
  name: string;
  role: "user" | "admin" | "leader";
}
export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const auth = useAuthStore.getState();

  useEffect(() => {
    if (!code || !state) return;

    (async () => {
      try {
        const res = await axios.post(
          "https://api.ondamoim.com/api/users/kakao/callback",
          { code, state },
          { withCredentials: true }
        );
        const { access_token, csrf_token } = res.data;
        const decoded: DecodedToken = jwtDecode(access_token);

        const isValidUser = !!decoded?.email && !!decoded.nickname;
        // set auth data
        auth.setAccessToken(access_token);
        auth.setCsrfToken(csrf_token);
        auth.setUser({
          email: decoded.email,
          name: decoded.name,
          nickname: decoded.nickname,
          role: decoded.role,
          isAdmin:
            decoded.role === "admin" ||
            decoded.role === "leader" ||
            decoded.role === "user",
        });

        // redirect
        if (isValidUser) {
          router.push("/"); // 기존 가입 회원 → 홈으로
        } else {
          router.push("/signup"); // 신규 회원 → 가입 폼으로
        }
      } catch (err) {
        console.error(err);
        router.push("/login"); // 실패할 경우 로그인 페이지로
      }
    })();
  }, [code, state]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg">카카오 로그인 처리 중...</p>
    </div>
  );
}
