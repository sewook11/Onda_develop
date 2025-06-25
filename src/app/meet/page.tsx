import React from "react";
import MeetForm from "./create/_components/MeetForm";

export default function MeetPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold text-main mb-6">모임 생성</h1>
      <MeetForm />
    </main>
  );
}