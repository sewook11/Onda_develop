"use client";

import React from "react";
import heroImage from "@/assets/images/hero.png";
import Image from "next/image";
import Button from "../../components/common/Button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="relative w-full h-[670px] bg-gradient-to-t from-[#FDE8E0] to-transparent">
      {/* 콘텐츠 */}
      <div className="relative z-20 h-full flex items-center justify-center gap-20 px-4">
        <div className="relative flex flex-col items-center md:text-left md:items-center space-y-6 z-10">
          <h1 className="text-2xl sm:text-3xl font-bold  text-center mb-10 leading-relaxed">
            공간, 경험, 지식 <br />
            그리고 사람을 잇다
          </h1>
          <div className="flex gap-4">
            <Button onClick={() => router.push("/#")}>시작하기</Button>
            <Button color="gray" variant="outline" onClick={() => router.push("/#")}>
              리더 신청
            </Button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFDEAD] rounded-t-full z-[-1] hidden md:block" />
        </div>

        {/* 오른쪽 이미지 */}
        <div className="hidden md:block z-30">
          <Image
            className="relative bottom-[-30px] max-w-[650px]"
            src={heroImage}
            alt="hero"
            width={450}
            height={650}
          />
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[120px] bg-white z-10" />
    </div>
  );
}
