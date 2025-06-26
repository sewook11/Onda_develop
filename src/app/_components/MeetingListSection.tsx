"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { MeetingCard } from "../../components/common/MeetingCard";
import { useFetchMeetings } from "@/hooks/useMeeting";
import { DEFAULT_MEETING_FILTER } from "@/constants/meeting";
import MeetingCardSkeleton from "../meet/_components/MeetingCardSkeleton";

export default function MeetingListSection() {
  const {
    data: meetings,
    isLoading,
    isError,
  } = useFetchMeetings({
    searchQuery: "",
    filters: DEFAULT_MEETING_FILTER,
  });

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        데이터를 불러오지 못했어요.
      </div>
    );
  }

  if (!isLoading && (!meetings || meetings.results.length === 0)) {
    return (
      <div className="text-center py-10 text-gray-500">
        최근 개설된 모임이 없어요.
      </div>
    );
  }

  return (
    <section className="py-16 w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[1440px] px-[160px]">
        <h2 className="text-2xl font-bold mb-10">최근 개설된 모임</h2>
      </div>
      <div className="w-full md:px-0 px-10">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.5}
          spaceBetween={32}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3.5, spaceBetween: 32 },
            1440: { slidesPerView: 5.5, spaceBetween: 32 },
          }}
        >
          {(isLoading || !meetings)
            ? Array.from({ length: 5 }).map((_, idx) => (
                <SwiperSlide key={`skeleton-${idx}`}>
                  <MeetingCardSkeleton />
                </SwiperSlide>
              ))
            : meetings.results.map((item) => (
                <SwiperSlide key={item.meet_id}>
                  <MeetingCard item={item} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}
