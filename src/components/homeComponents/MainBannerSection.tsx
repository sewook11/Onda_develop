"use client";
import React from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BannerImage from "@/assets/images/homeBanner.png";

export default function MainBannerSection() {
  const router = useRouter();
  return (
    <section className="flex flex-row md:flex-nowrap flex-wrap gap-20 justify-center items-center max-w-[1440px] mx-10 md:mx-[160px] py-20">
      <div className="flex flex-col gap-10 md:items-start md:text-left items-center text-center">
        <h2 className="text-2xl font-semibold">온:다 소개</h2>
        <p className="text-gray-700 text-xs">
          온:다는 배우고 나누고, <br />
          연결되는 삶을 위해 존재합니다.
        </p>
        <h3 className="font-semibold text-primary-deep text-md">
          &#34;혼자가 아닌 함께, 연결되는 삶을 위해&#34;
        </h3>
        <div className="flex flex-col gap-8 text-xs font-medium">
          <p>
            65세 이상 시니어층의 40&#37;이상이 &#39;사회적 고립감&#39;을 느끼고
            있으며 
            디지털 소외는 그 고립을 더 깊게 만듭니다.
          </p>
          <p>
            온다는 &#34;시니어층이 기술을 통해 어떻게 연결될 수 있을까?&#34;
            <br />
            라는 질문에서 시작되었습니다.
          </p>
          <p>
            우리 동네에서 참여하고 싶은 모임을 찾고
            디지털 수준에 맞는 콘텐츠를 경험하며 
            그 경험을 나누는 &#39;리더&#39;가 되는 곳입니다.
          </p>
        </div>
        <Button width="w-[200px]" onClick={() => router.push("/#")}>
          더 알아보기
        </Button>
      </div>
      <div className="w-full md:max-w-[660px]">
        <Image
          src={BannerImage}
          alt="배너 이미지"
          width={600}
          height={600}
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}
