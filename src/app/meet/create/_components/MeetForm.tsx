"use client";

import React, { useState } from "react";
import MeetFormFields from "./MeetFormFields";
import MeetImageUploader from "./MeetImageUploader";
import Button from "@/components/common/Button";

export default function MeetForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [method,setMethod]=useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [digitalLevel, setDigitalLevel] = useState("");
  const [deadline, setDeadline] = useState("");
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      date,
      time,
      location,
      maxPeople,
      digitalLevel,
      deadline,
    };

    console.log("폼 제출됨:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
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
        <Button type="submit" color="primary" variant="fill" width="w-full">
          모임 생성하기
        </Button>
      </div>
    </form>
  );
}
