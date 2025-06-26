import React from "react";
import SurveyCard from "./SurveyCard";
import survey1 from "@/assets/images/survey1.png";
import survey2 from "@/assets/images/survey2.png";
import survey3 from "@/assets/images/survey3.png";

export default function BannerSection() {
  return (
    <section className="w-full py-20 bg-gray-200 flex justify-center">
      <div className="mx-10 md:mx-[160px]">
        <h2 className="text-2xl font-bold mb-10">교류와 연결</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 place-items-center h-auto">
          <SurveyCard
            image={survey1}
            link="https://workspace.google.com/products/forms/"
            title="고립지수 확인"
            description="나의 사회적 연결 상태를 확인해보세요."
          />
          <SurveyCard
            image={survey2}
            link="https://workspace.google.com/products/forms/"
            title="모임 추천"
            description="관심사, 지역 등을 대로 모임을 추천받으세요."
          />
          <SurveyCard
            image={survey3}
            link="https://workspace.google.com/products/forms/"
            title="디지털 수준 평가"
            description="스마트폰, 키오스크, 줌까지 나의 활용 능력을 알아보세요."
          />
        </div>
      </div>
    </section>
  );
}
