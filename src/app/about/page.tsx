import Image from "next/image";
import aboutImage from "@/assets/images/about_main.png";

const aboutSections = [
  {
    title: "누구나 쉽게 사용할 수 있습니다.",
    content: `온:다는 배우고, 나누고 연결되는 삶을 위해 존재합니다.
65세 이상 시니어층의 40% 이상이 '사회적 고립감'을 느끼고 있으며 디지털 소외는 그 고립을 더 깊게 만듭니다.
온다는 "시니어층이 IT기술을 통해 어떻게 연결될 수 있을까?" 라는 고민에서 시작하였습니다.`,
  },
  {
    title: "누구나 쉽게 사용할 수 있습니다.",
    content: `온:다는 배우고, 나누고 연결되는 삶을 위해 존재합니다.
65세 이상 시니어층의 40% 이상이 '사회적 고립감'을 느끼고 있으며 디지털 소외는 그 고립을 더 깊게 만듭니다.
온다는 "시니어층이 IT기술을 통해 어떻게 연결될 수 있을까?" 라는 고민에서 시작하였습니다.`,
  },
    {
    title: "누구나 쉽게 사용할 수 있습니다.",
    content: `온:다는 배우고, 나누고 연결되는 삶을 위해 존재합니다.
65세 이상 시니어층의 40% 이상이 '사회적 고립감'을 느끼고 있으며 디지털 소외는 그 고립을 더 깊게 만듭니다.
온다는 "시니어층이 IT기술을 통해 어떻게 연결될 수 있을까?" 라는 고민에서 시작하였습니다.`,
  },
];

export default function AboutUsPage() {
  return (
    <section className="relative">
      {/* 헤더 배경 */}
      <div className="md:bg-primary w-full h-[500px]" />

      {/* 대표 이미지 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-20 z-10 w-full max-w-[1024px] px-4">
        <Image
          src={aboutImage}
          alt="온다 소개 이미지"
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* 본문 콘텐츠 */}
      <div className="relative z-20 pt-[100px] md:pt-[320px] flex flex-col items-center mx-6 md:mx-[160px] leading-relaxed">
        {/* 로고 & 문구 */}
        <div className="flex gap-6 items-end justify-start w-full mb-10">
          <div className="relative w-20 h-20">
            <Image
              src="/assets/logo/logo.svg"
              alt="logo"
              fill
              className="object-contain"
              sizes="100%"
            />
          </div>
          <h2 className="text-lg font-semibold">
            공간, 경험, 지식 그리고 사람을 잇다
          </h2>
        </div>

        {/* 본문 텍스트 반복 */}
        {aboutSections.map((section, idx) => (
          <div key={idx} className="w-full mb-12 text-sm font-medium">
            <h3 className="text-md font-semibold my-6 text-accent-main">
              {section.title}
            </h3>
            <p className="whitespace-pre-line">{section.content}</p>
          </div>
        ))}

        {/* 인용구 */}
        <h2 className="text-xl font-semibold my-20 text-center">
          &#34;경험이 연결되고, <br className="lg:hidden block" />
          연결이 배움이 됩니다.&#34;
        </h2>
      </div>
    </section>
  );
}
