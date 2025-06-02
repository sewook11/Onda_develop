"use client";

import React from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";

interface MeetSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

export default function MeetSearchBar({
  value,
  onChange,
  onSearch,
}: MeetSearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="찾고 싶은 모임을 입력하세요"
        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Button  type="submit"
               width="w-[80px]"
               height="h-auto"
               className="flex justify-center items-center text-sm">
        조회
      </Button>
    </form>
  );
}