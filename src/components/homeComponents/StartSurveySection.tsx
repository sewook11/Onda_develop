"use client";
import React from "react";
import Button from "../common/Button";

export default function StartSurveySection() {
  return (
    <section className="py-20 w-full flex flex-col justify-center items-center text-center bg-primary bg-opacity-20">
      <h3 className="mb-10 text-xl font-medium leading-relaxed">
        1분 답변지를 작성해주시면
        <br />
        배움과 교류 유형을 파악해 드려요.
      </h3>
      <Button>시작하기</Button>
    </section>
  );
}