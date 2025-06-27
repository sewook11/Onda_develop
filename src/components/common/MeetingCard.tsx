import React from "react";
import { Calendar, MapPin, MessageSquareIcon } from "lucide-react";
import Image from "next/image";
import DefaultGatheringImage from "../common/DefaultMeetingImage";

//import { INTEREST_CATEGORY_MAP } from "@/constants/interestCategory";
import { MeetingCardProps } from "@/types/meetings";
import MeetingStatusButtons from "../../app/_components/MeetingStatusButton";
import api from "@/apis/app";
import { useRouter, usePathname } from "next/navigation";
import { END_POINT } from "@/constants/route";
import Link from "next/link";
import { useModalStore } from "@/stores/useModalStore";
import { joinGroupChat } from "@/apis/chat";

export const MeetingCard = ({
  item,
  isApplied = false,
  context,
}: MeetingCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMyPage = pathname?.startsWith("/mypage");

  const { openModal } = useModalStore();

  const { title, date, time, area, file, status, id } = item;
  //console.log(id)
  //console.log(file);
  const handleApply = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      await api.post(END_POINT.MEETINGS_APPLY(id));
      alert("모임 신청이 완료되었습니다!");
      router.refresh();
    } catch (error) {
      console.error("모임 신청 실패:", error);
      alert("모임 신청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleOpenChat = async () => {
    if (typeof id !== "number") {
      console.error("잘못된 모임 ID입니다.");
      return;
    }

    try {
      const roomId = await joinGroupChat(id);
      openModal("chat", { roomId, title });
    } catch (error) {
      console.error("채팅방 입장 실패:", error);
      alert("채팅방 입장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-lg mb-2 transition-all bg-white">
      {/*  */}
      <div className="flex gap-4 text-sm text-orange-400 font-semibold items-center mb-4">
        {status}
      </div>
      <div className="w-full h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
        {/* 이미지 없으면 기본 이미지로  */}
        {file && file.thumbnail ? (
          <div className="w-full relative rounded-md overflow-hidden h-40">
            <Image
              src={file.thumbnail}
              alt={title}
              className="object-cover"
              sizes="100%"
              fill
            />
          </div>
        ) : (
          <div className="mb-4">
            <DefaultGatheringImage width="w-full" height="h-40" />
          </div>
        )}
      </div>
      {/* 모임 정보 */}
      <div className="font-bold text-sm mb-2">{title}</div>
      <div className="text-gray-600 text-xs flex items-center mb-1">
        <Calendar size={16} className="mr-1" />
        {date} (
        {new Date(date).toLocaleDateString("ko-KR", { weekday: "short" })}){" "}
        {time}
      </div>
      <div className="text-gray-600 text-xs flex items-center mb-1">
        <MapPin size={16} className="mr-1" />
        {area}
      </div>
      {isApplied ? (
        <div className="flex gap-2 items-center mb-1 break-all">
          <button
            className="flex-1 flex justify-center items-center gap-2 text-white p-2 rounded-md bg-accent-purple"
            onClick={handleOpenChat}
          >
            <MessageSquareIcon size={16} fill="white" />
            모임 그룹 채팅
          </button>
          <Link href={`/meet/${id}`}>
            <button className="flex-1 border border-orange-500 text-orange-500 p-2 rounded-md hover:bg-orange-50 transition">
              상세 보기
            </button>
          </Link>
        </div>
      ) : (
        <MeetingStatusButtons
          status={status}
          mode={context === "past" ? "past" : "default"}
          id={id}
          onClickDetail={() => {
            console.log("디테일 버튼 클릭", id);
            openModal(`finishedMeetDetail-${id}`, { meetId: id });
          }}
          onClickReview={() => {
            console.log("후기 버튼 클릭", id);
            openModal(`reviewWrite-${id}`, { meetId: id });
          }}
          onClickApply={isMyPage ? undefined : handleApply}
        />
      )}
    </div>
  );
};
