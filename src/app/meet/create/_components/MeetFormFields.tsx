import React, { useState } from "react";
import TextInput from "@/components/common/TextInput";
import Textarea from "@/components/common/Textarea";
import SelectBox from "@/components/common/SelectBox";
import ToggleButtonGroup from "@/components/common/ToggleButtonGroup";
import AreaSelector from "@/components/common/AreaSelector";

interface MeetFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  method: string;
  setMethod: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  maxPeople: string;
  setMaxPeople: (value: string) => void;
  digitalLevel: string;
  setDigitalLevel: (value: string) => void;
  deadline: string;
  setDeadline: (value: string) => void;
  meetCount: string;
  setMeetCount: (value: string) => void;
}

export default function MeetFormFields({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  method,
  setMethod,
  date,
  setDate,
  time,
  setTime,
  endTime,
  setEndTime,
  location,
  setLocation,
  maxPeople,
  setMaxPeople,
  digitalLevel,
  setDigitalLevel,
  deadline,
  setDeadline,
  meetCount,
  setMeetCount,
}: MeetFormFieldsProps) {
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="개설할 모임 이름"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="모임 제목을 입력해주세요"
          required
        />

        <SelectBox
          label="카테고리"
          placeholder="카테고리"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { label: "디지털 기초", value: "디지털 기초" },
            { label: "디지털 심화", value: "디지털 심화" },
            { label: "커뮤니케이션", value: "커뮤니케이션" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="일정"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <TextInput
          label="모집 마감일"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="시작 시간"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <TextInput
          label="종료 시간"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="모집 인원(최대)"
          type="number"
          value={maxPeople}
          onChange={(e) => setMaxPeople(e.target.value)}
          placeholder="숫자만 입력"
          required
        />
        <TextInput
          label="횟수(최대4회)"
          type="number"
          value={meetCount}
          onChange={(e) => setMeetCount(e.target.value)}
          required
        />
      </div>
      <ToggleButtonGroup
        label="방법"
        value={method}
        onChange={setMethod}
        options={[
          { label: "온라인", value: "온라인" },
          { label: "오프라인", value: "오프라인" },
          { label: "온/오프라인", value: "온/오프라인" },
        ]}
      />
      <SelectBox
        placeholder="디지털 난이도"
        value={digitalLevel}
        onChange={(e) => setDigitalLevel(e.target.value)}
        options={[
          { label: "상 (Zoom 사용)", value: "상" },
          { label: "중 (앱 사용)", value: "중" },
          { label: "하 (전화만 가능)", value: "하" },
        ]}
      />
      <div className="relative w-full text-sm">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          지역
        </label>
        <button
          type="button"
          className="w-full border px-4 py-2 rounded flex justify-between items-center"
          onClick={() => setIsAreaOpen((prev) => !prev)}
        >
          {selectedSido && selectedDistrict
            ? `${selectedSido} ${selectedDistrict}`
            : "지역 선택"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isAreaOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded shadow">
            <AreaSelector
              onSelect={(sido, district) => {
                setSelectedSido(sido);
                setSelectedDistrict(district);
                setIsAreaOpen(false);
              }}
            />
          </div>
        )}
      </div>
      <TextInput
        label="상세 모임 위치(주소) 및 장소"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="예: 서울 강남구"
        required
      />
      <Textarea
        label="모임 소개"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="모임을 소개해주세요"
        required
      />
    </div>
  );
}
