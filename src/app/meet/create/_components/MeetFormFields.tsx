import React from "react";
import TextInput from "@/components/common/TextInput";
import Textarea from "@/components/common/Textarea";
import SelectBox from "@/components/common/SelectBox";
import ToggleButtonGroup from "@/components/common/ToggleButtonGroup";

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
  location: string;
  setLocation: (value: string) => void;
  maxPeople: string;
  setMaxPeople: (value: string) => void;
  digitalLevel: string;
  setDigitalLevel: (value: string) => void;
  deadline: string;
  setDeadline: (value: string) => void;
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
  location,
  setLocation,
  maxPeople,
  setMaxPeople,
  digitalLevel,
  setDigitalLevel,
  deadline,
  setDeadline,
}: MeetFormFieldsProps) {
  return (
    <div className="space-y-6">
      <TextInput
        label="모임 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="모임 제목을 입력해주세요"
        required
      />
      <Textarea
        label="모임 소개"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="모임을 소개해주세요"
        required
      />
      <SelectBox
        placeholder="카테고리"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={[
          { label: "디지털 기초", value: "디지털 기초" },
          { label: "디지털 심화", value: "디지털 심화" },
          { label: "커뮤니케이션", value: "커뮤니케이션" },
        ]}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="날짜"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <TextInput
          label="시간"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <TextInput
        label="장소"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="예: 서울 강남구"
        required
      />
      <TextInput
        label="모집 인원"
        type="number"
        value={maxPeople}
        onChange={(e) => setMaxPeople(e.target.value)}
        placeholder="숫자만 입력"
        required
      />
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
      <TextInput
        label="모집 마감일"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
    </div>
  );
}
