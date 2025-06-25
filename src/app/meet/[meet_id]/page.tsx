"use client";

import React, { useEffect, useState } from "react";
//import { Calendar, MapPin } from "lucide-react";

interface MeetDetail {
  id: number;
  title: string;
  category: string;
  leaderName: string;
  leaderInterest: string;
  date: string;
  time: string;
  totalSessions: number;
  deadline: string;
  currentPeople: number;
  maxPeople: number;
  location: string;
  description: string;
  method: string;
  digitalLevel: string;
}

export default function MeetDetailPage({ params }: { params: { meet_id: string } }) {
  const meetId = params.meet_id;

  const [meetDetail, setMeetDetail] = useState<MeetDetail | null>(null);

  useEffect(() => {
    const dummyData: MeetDetail = {
      id: Number(meetId),
      title: "디지털의 기초, 실생활에서 100% 활용하기",
      category: "디지털 학습",
      leaderName: "공학도님",
      leaderInterest: "명상, 등산",
      date: "25.6.14(토)",
      time: "오전 11:00 ~ 오후 13:00",
      totalSessions: 4,
      deadline: "2025-06-10",
      currentPeople: 8,
      maxPeople: 10,
      location: "서울특별시 어쩌구 저쩌구",
      description:
        "스마트폰이 어렵게만 느껴졌던 분들께 딱 맞는 디지털 입문 강의! 카카오톡 사용법부터 사진 찍기, 유튜브 보기, 은행 앱 사용까지 차근차근 알려드립니다. 혼자서도 일상을 편리하게 누릴 수 있는 실전 중심 수업으로 디지털 세상을 즐기는 시니어로 성장해보세요.",
      method: "온라인",
      digitalLevel: "하",
    };

    setMeetDetail(dummyData);
  }, [meetId]);

  if (!meetDetail) return <div className="text-center py-20">로딩 중...</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-main">
      {/* 상단 상태 + 제목 */}
      <div className="flex flex-col gap-2">
        <div className="text-xs bg-primary-light text-primary-deep font-semibold inline-block px-2 py-1 rounded-md w-fit">
          모집중
        </div>
        <h1 className="text-2xl font-bold">{meetDetail.title}</h1>
      </div>

      {/* 이미지 + 리더정보 */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-gray-100 h-[300px] rounded-xl flex items-center justify-center text-sm text-gray-400">
          모임 이미지 영역
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              {/* 리더 이미지 */}
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-blue-600 font-semibold">인기 리더</div>
              <div className="text-lg font-bold">{meetDetail.leaderName}</div>
              <div className="text-sm text-gray-500"># 관심분야 : {meetDetail.leaderInterest}</div>
            </div>
          </div>

         <div className="flex items-center gap-2 text-sm text-gray-600">
            {/* <Calendar size={16} /> */}
            <span>{meetDetail.date}</span>
          </div>

          <div className="text-sm text-gray-600">{meetDetail.time}</div>

          <div className="border border-gray-300 rounded-md p-2 text-center text-sm font-semibold">
            총 {meetDetail.totalSessions} 회
          </div>
        </div>
      </div>

      {/* 모집 정보 */}
      <div className="text-red-500 font-semibold">자세한 정보를 알려드릴게요</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-600 mb-1">모집 마감일</label>
          <input type="text" className="w-full border rounded-md p-2" value={meetDetail.deadline} readOnly />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">신청 인원 / 모집 인원</label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            value={`${meetDetail.currentPeople} / ${meetDetail.maxPeople}`}
            readOnly
          />
        </div>

        <div>
          <button className="w-full h-[44px] bg-primary text-white rounded-md">나도 이 모임 참여하기!</button>
        </div>
      </div>

      {/* 상세 위치 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">상세 모임 위치(주소) 및 장소</label>
        <input type="text" className="w-full border rounded-md p-2" value={meetDetail.location} readOnly />
      </div>

      {/* 모임 소개 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">모임 소개</label>
        <textarea rows={5} className="w-full border rounded-md p-2" value={meetDetail.description} readOnly />
      </div>

      {/* 진행 방법 / 난이도 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">진행 방법</label>
          <div className="border border-primary text-primary rounded-md py-2 text-center">{meetDetail.method}</div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">디지털 난이도</label>
          <div className="border border-primary text-primary rounded-md py-2 text-center">{meetDetail.digitalLevel}</div>
        </div>
      </div>
    </main>
  );
}