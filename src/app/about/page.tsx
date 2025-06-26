import Image from "next/image";
import aboutImage from "@/assets/images/about_main.png";
import { CheckSquare, MessagesSquare, Search, Smile } from "lucide-react";
import Link from "next/link";
import Button from "@/components/common/Button";
import KakaoIcon from "@/assets/images/Icon/Kakao.svg";
import PhoneIcon from "@/assets/images/Icon/phone.png";

export default function AboutUsPage() {
  return (
    <main className="relative flex flex-col items-center gap-20">
      {/* 헤더 배경 */}
      <div className="bg-primary w-full h-[300px] md:h-[500px] md:mb-[240px] lg:mb-[300px]" />

      {/* 대표 이미지 */}
      <div className="relative -mt-[250px] mb-10 md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:mt-20 z-10 w-full max-w-[1024px] px-4">
        <Image
          src={aboutImage}
          alt="온다 소개 이미지"
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* 본문 콘텐츠 */}
      <section className="relative z-20 w-full">
        {/* 로고 & 문구 */}
        <div className="w-full max-w-[1440px] px-4 md:px-[160px] mx-auto mb-20">
          <div className="flex gap-6 items-center w-full mb-20">
            <div className="relative w-20 h-20">
              <Image
                src="/assets/logo/logo.svg"
                alt="logo"
                fill
                className="object-contain"
                sizes="100%"
              />
            </div>
            <h2 className="text-xl font-semibold">
              공간, 경험, 지식 그리고 사람을 잇다
            </h2>
          </div>
          <p className="text-md leading-normal">
            온:다는 배우고 나누고, <br /> 연결되는 삶을 위해 존재합니다.
            <br />
            <br />
            65세 이상 2명 중 1명 (약 40%)이 &apos;사회적 고립감&apos;을 느끼고
            있으며
            <br />
            디지털 소외는 그 고립을 더 깊게 만듭니다.
            <br />
            <br />
            온:다는{" "}
            <span className="font-semibold">
              &quot;어떻게 하면 누구라도 손쉽게
              <br />
              IT기술을 통해 연결될 수 있을까?&quot;
            </span>
            라는 고민에서 시작하였습니다.
          </p>
        </div>
      </section>

      <section className="relative z-20 w-full">
        <div className="w-full max-w-[1440px] px-4 md:px-[160px] mx-auto mb-20">
          <h2 className="text-primary text-xl font-semibold mb-20">
            배우고, 나누고, 연결되는 온:다 이용법
          </h2>
          <div className="flex gap-8 items-center my-10 text-md">
            <span className="text-lg w-20 text-center">하나,</span>
            <Search size={40} />
            <span className="max-w-[500px] leading-normal">
              관심사, 지역, 디지털 친숙도 등에 따라
              <br />
              <Link
                className="border-b hover:text-primary-deep hover:border-primary-light"
                href={"/meet/search"}
              >
                나에게 맞는 모임을 검색해요.
              </Link>
            </span>
          </div>

          <div className="flex gap-8 items-center my-10 text-md">
            <span className="text-lg w-20 text-center">둘,</span>
            <CheckSquare size={40} />
            <span className="max-w-[500px] leading-normal">
              모임 주제 & 소개글, 모임 날짜/시간,
              <br />
              장소를 확인하고 모임을 신청해요!
            </span>
          </div>

          <div className="flex gap-8 items-center my-10 text-md">
            <span className="text-lg w-20 text-center">셋,</span>
            <Smile size={40} />
            <span className="max-w-[500px] leading-normal">
              혼자보다 함께라서 더 쉽고 풍성한
              <br />
              배움 활동과 관심사 모임을 즐기세요.
            </span>
          </div>

          <div className="flex gap-8 items-center my-10 text-md">
            <span className="text-lg w-20 text-center font-semibold text-accent-main">
              꿀팁!
            </span>
            <MessagesSquare size={40} />
            <span className="max-w-[500px] leading-normal">
              참석할 모임이 확정되면, 곧 만나게 될 <br />
              <span className="text-accent-main font-semibold">
                모임 동료들과의 채팅을 시작
              </span>
              하세요.
            </span>
          </div>
        </div>
      </section>

      <section className="relative z-20 w-full">
        <div className="w-full max-w-[1440px] px-4 md:px-[160px] mx-auto mb-20">
          <h2 className="text-primary text-xl font-semibold mb-20 w-full">
            나도 리더가 될 수 있을까? 물론입니다!
          </h2>
          <p className="text-md mb-20 leading-normal">
            &quot;이 나이에 내가 뭘?&quot; 보단
            <br />
            <span className="font-semibold">
              &quot;이 나이라서 내가 할 수 있는 것&quot;, &quot;내가 좋아하는
              것&quot;을 시작하세요!
              <br />
            </span>
            <br />
            디지털 초보, 스마트폰 사진반, 걷기, 자서전 쓰기, 지역사회 봉사 등
            <br />
            당신의 경험이 모임원 분들께{" "}
            <span className="text-accent-main font-medium">
              새로운 변화의 시작
            </span>
            이 됩니다.
            <br />
            <br />
            온:다는 &quot;시나어층이 IT 기술을 통해 어떻게 연결될 수
            있을까?&quot;라는 고민에서 시작하였습니다.
          </p>
          <Link href={"/leader"}>
            <Button width="w-auto">모임 리더 신청하기</Button>
          </Link>
        </div>
      </section>
      {/* 연락처 */}
      <section className="bg-gray-100 w-full py-20">
        <div>
          <h2 className="text-primary text-xl text-center font-semibold mb-10">
            언제든 온:다에 문의하세요
          </h2>
          <div className="flex flex-col gap-6 justify-center items-center">
            <a
              href="https://pf.kakao.com/_your_channel_id/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center justify-center text-md rounded-lg bg-[#FEE500] p-4 hover:bg-[#f9e15a] active:bg-[#fed74a]"
            >
              <Image
                src={KakaoIcon}
                width={24}
                height={24}
                alt="kakao 아이콘"
              />
              카카오톡에 문의하기
            </a>
            <button className="flex gap-4 items-center text-md rounded-lg border border-gray-300 p-4 hover:bg-gray-200 active:bg-gray-300">
              <Image
                src={PhoneIcon}
                width={24}
                height={24}
                alt="전화기 아이콘"
              />
              010-7265-6778 <br />
              <span className="text-gray-600">(평일 9시 ~ 6시)</span>
            </button>
          </div>
        </div>
      </section>
      {/* 인용구 */}
      <section>
        <h2 className="text-xl font-semibold mb-20 text-center">
          &#34;경험이 연결되고, <br className="lg:hidden block" />
          연결이 배움이 됩니다.&#34;
        </h2>
      </section>
    </main>
  );
}
