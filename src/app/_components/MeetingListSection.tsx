"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { dummyMeetings } from "@/datas/meetings";
import { MeetingCard } from "../../components/common/MeetingCard";

export default function MeetingListSection() {
  return (
    <section className="py-16 w-full flex flex-col items-center">
      <div>
        <h2 className="text-2xl font-bold mb-10 mx-4 md:mx-[160px]">
          최근 개설된 모임
        </h2>
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 overflow-auto max-w-[1440px]">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.2}
            spaceBetween={32}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 32,
              },
            }}
          >
            {dummyMeetings.map((item) => (
              <SwiperSlide key={item.id}>
                <MeetingCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
