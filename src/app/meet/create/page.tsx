"use client";

import React, { useState } from "react";
// import MeetForm from "./_components/MeetForm";
import MeetImageUploader from "./_components/MeetImageUploader";
import MeetFormFields from "./_components/MeetFormFields";
import Button from "@/components/common/Button";

export default function MeetCreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [digitalLevel, setDigitalLevel] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      category,
      method,
      date,
      time,
      location,
      maxPeople,
      digitalLevel,
      deadline,
    };
    console.log("폼 제출됨:", payload);
    // 나중에 여기 api 따로 연동
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold text-main mb-4">모임 생성</h1>

      <MeetImageUploader />
      <MeetFormFields
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        method={method}
        setMethod={setMethod}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        location={location}
        setLocation={setLocation}
        maxPeople={maxPeople}
        setMaxPeople={setMaxPeople}
        digitalLevel={digitalLevel}
        setDigitalLevel={setDigitalLevel}
        deadline={deadline}
        setDeadline={setDeadline}
      />

      <div className="text-center pt-4">
        <Button type="submit" width="w-full" height="h-[44px]">
          모임 생성하기
        </Button>
      </div>
    </form>
  );
}
