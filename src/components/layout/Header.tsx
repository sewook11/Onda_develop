"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuth";
import { useSignupStore } from "@/stores/useSignUpStore";
import { useRouter } from "next/navigation";

export default function Header() {
  const { currentUser, logout } = useAuthStore();
  const { isKakaoUserSignedUp, setKakaoUserSignedUp } = useSignupStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    setKakaoUserSignedUp(false);
    router.push("/");
  };

  return (
    <div className="w-full h-[110px] flex items-center justify-between px-12">
      {/* 로고 부분*/}
      <div className="flex items-center">
        <Link href="/">
          <Image src="assets/logo/logo.svg" alt="onda" width={43} height={38} />
        </Link>
      </div>

      {/* 중앙 */}
      <nav className="flex gap-10 text-black font-medium text-base">
        <Link href={"/"}>홈으로</Link>
        <Link href={"/meet/search"}>모임찾기</Link>
        <Link href={"#"}>리더신청</Link>
        <Link href={"#"}>소통하기</Link>
        <Link href={"/about"}>온:다 소개</Link>
      </nav>

      {/* 우측 */}
      <div className="flex gap-6 text-black font-medium text-base">
        {currentUser || isKakaoUserSignedUp ? (
          <>
            <button onClick={handleLogout} className="hover:underline">
              로그아웃
            </button>
            <Link href={"/mypage"}>마이페이지</Link>
          </>
        ) : (
          <>
            <Link href={"/login"}>로그인</Link>
            <Link href={"/signup"}>회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
}
