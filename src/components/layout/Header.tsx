"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuth";
import { useSignupStore } from "@/stores/useSignUpStore";
import { useRouter } from "next/navigation";

export default function Header() {
  const { currentUser, logout } = useAuthStore();
  const { isKakaoUserSignedUp, setKakaoUserSignedUp } = useSignupStore();
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
  const handleLogout = () => {
    logout();
    setKakaoUserSignedUp(false);
    router.push("/");
  };

  const toggleMenu = () => setIsMobile((prev) => !prev);

  return (
    <div className="w-full h-[110px] flex items-center justify-between md:px-12 px-6 relative z-50">
      {/* 로고 부분*/}
      <div className="flex items-center">
        <Link href="/">
          <Image src="assets/logo/logo.svg" alt="onda" width={43} height={38} />
        </Link>
      </div>

      {/* 중앙 */}
      <nav className="hidden md:flex gap-10 text-black font-medium text-base">
        <Link href={"/"}>홈으로</Link>
        <Link href={"/meet/search"}>모임찾기</Link>
        <Link href={"#"}>리더신청</Link>
        <Link href={"/community"}>소통하기</Link>
        <Link href={"/about"}>온:다 소개</Link>
      </nav>

      {/* 우측 */}
      <div className="hidden md:flex gap-6 text-black font-medium text-base">
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

      {/* 햄버거 버튼 - 모바일 */}
      <button onClick={toggleMenu} className="md:hidden">
        <svg className="w-8 h-8" fill="none" stroke="black" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMobile ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      {isMobile && (
        <div className="absolute top-[110px] left-0 w-full shadow-md px-6 py-4 flex flex-col gap-4 md:hidden bg-white text-black text-base">
          <Link href={"/"}>홈으로</Link>
          <Link href={"/meet/search"}>모임찾기</Link>
          <Link href={"#"}>리더신청</Link>
          <Link href={"/community"}>소통하기</Link>
          <Link href={"/about"}>온:다 소개</Link>
          {currentUser || isKakaoUserSignedUp ? (
            <div className="flex justify-end gap-4 mt-6 text-black text-base font-medium">
              <Link href="/mypage" onClick={toggleMenu}>
                마이페이지
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-4 text-base text-black font-medium">
              <Link href="/login" onClick={toggleMenu}>
                로그인
              </Link>
              <Link href="/signup" onClick={toggleMenu}>
                회원가입
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
